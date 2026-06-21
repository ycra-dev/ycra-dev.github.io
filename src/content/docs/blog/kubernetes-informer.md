---
title: "Kubernetes Informer는 어떻게 동작하는가"
description: "client-go Informer가 API 서버 부하 없이 리소스 변화를 감지하는 원리를 Reflector, DeltaFIFO, Indexer, Local Store를 순으로 정리한다."
tags: ["Kubernetes", "Informer", "client-go", "Controller"]
date: 2026-06-21
excerpt: "컨트롤러는 어떻게 매번 API 서버를 조회하지 않고도 리소스 변화를 알아챌까? client-go Informer의 내부 구조를 Reflector·DeltaFIFO·Indexer 흐름으로 정리한다."
created: 2026-06-21
updated: 2026-06-21
draft: false
slug: blog/kubernetes-informer
---

## watch를 직접 걸 때 마주치는 것들

Kubernetes 위에서 동작하는 컨트롤러를 만들 때, 가장 먼저 부딪히는 문제는 **"리소스 변화를 어떻게 감지할 것인가"** 다. 가장 단순한 답은 API 서버에 직접 `watch`를 거는 것이다. Java의 fabric8 클라이언트를 사용한다면 이렇게 watch를 걸 수 있다.

```java
// API 서버에 직접 watch 연결 — 이벤트 스트림을 그대로 받는다
client.pods().inNamespace("default").watch(new Watcher<Pod>() {
    @Override
    public void eventReceived(Action action, Pod pod) {
        // ADDED / MODIFIED / DELETED 이벤트가 올 때마다 호출
        reconcile(pod);
    }
    @Override
    public void onClose(WatcherException e) {
        // 연결이 끊기면 직접 재연결 로직을 구현해야 한다
    }
});
```

직접 watch를 걸면 event를 수신할 수는 있지만 여러가지 복잡한 문제를 겪게 된다.

- **연결이 끊기면 직접 복구해야 한다.** watch는 장시간 유지되는 HTTP 스트림이라 네트워크·재시작 등으로 끊긴다. 끊기면 마지막 `resourceVersion`부터 다시 watch를 걸어야 하고, 그 버전이 너무 오래돼 `410 Gone`이 오면 **전체를 다시 List**한 뒤 watch를 재개해야 한다.
- **로컬 상태가 없다.** "지금 이 네임스페이스의 Pod 전체"가 필요하면 또 API 서버에 List를 날려야 한다. 캐시가 없으니 읽을 때마다 API 서버에 부담이 간다.
- **컴포넌트마다 watch가 늘어난다.** 컨트롤러 A, B, C가 각자 Pod를 본다면 watch 연결도 3개다. 같은 데이터를 세 번 받는다.

```plantuml
left to right direction
skinparam componentStyle rectangle

component "Controller A" as A
component "Controller B" as B
component "Controller C" as C
node "API Server" as API

A --> API : watch (연결 1)
B --> API : watch (연결 2)
C --> API : watch (연결 3)

note bottom of API
  같은 Pod 데이터를
  세 번 스트리밍
end note
```

Informer는 바로 이 반복되는 문제들 — **재연결, 재동기화, 로컬 캐시, 연결 공유** — 를 한 번에 정리해 주는 패턴이다. fabric8에도 client-go를 본떠 만든 `SharedIndexInformer`가 있다.

```java
SharedInformerFactory factory = client.informers();
SharedIndexInformer<Pod> informer =
    factory.sharedIndexInformerFor(Pod.class, 30_000L); // resync 주기 30s

informer.addEventHandler(new ResourceEventHandler<Pod>() {
    public void onAdd(Pod pod) { reconcile(pod); }
    public void onUpdate(Pod oldPod, Pod newPod) { reconcile(newPod); }
    public void onDelete(Pod pod, boolean finalStateUnknown) { cleanup(pod); }
});

factory.startAllRegisteredInformers();

// 읽기는 API 서버가 아니라 로컬 캐시에서
Lister<Pod> lister = new Lister<>(informer.getIndexer(), "default");
List<Pod> pods = lister.list();
```

겉보기엔 "이벤트 핸들러 등록"이 전부지만, 그 아래에서는 꽤 정교한 매커니즘이 돌아간다. 이제 그 내부를 파헤쳐 보자. (이하 구조는 client-go 기준이며, fabric8 informer도 동일한 모델을 따른다.)

## Informer는 어떻게 동작하는가

Informer의 핵심은 **"한 번 전체를 받아오고(List), 그 뒤로는 변화만 따라간다(Watch)"**, 그리고 **그 결과를 로컬 캐시에 항상 최신으로 유지한다**는 것이다. 내부는 크게 네 개의 컴포넌트로 구성된다.

```plantuml
skinparam componentStyle rectangle

node "API Server" as API
component "Reflector" as R
queue "DeltaFIFO" as F
database "Indexer\n(Local Store)" as I
component "Event Handlers\n(sharedProcessor)" as H
component "Lister" as L

API --> R : List + Watch
R --> F : delta 추가
F --> I : Pop → 캐시 갱신
I --> H : OnAdd / OnUpdate / OnDelete
I <-- L : 읽기 (API 호출 없음)
```

### List + Watch: 한 번 받아오고, 변화만 따라간다

가장 안쪽에는 **Reflector**가 있다. Reflector가 하는 일은 두 단계다.

1. **List** — 대상 리소스 전체를 한 번 조회하고, 응답에 담긴 `resourceVersion`(그 시점의 스냅샷 버전)을 기억한다.
2. **Watch** — 그 `resourceVersion`부터 watch를 걸어, 이후 발생하는 변화 이벤트만 스트림으로 받는다.

연결이 끊기거나 `410 Gone`이 오면 Reflector가 알아서 다시 List → Watch를 수행한다. 앞서 직접 짜야 했던 재연결·재동기화 로직이 여기 들어 있는 것이다.

```plantuml
participant "API Server" as API
participant "Reflector" as R
participant "DeltaFIFO" as F

== 초기 동기화 ==
R -> API : List
API --> R : 전체 객체 + resourceVersion
R -> F : Replace(전체 객체)

== 변화 추적 ==
R -> API : Watch(resourceVersion)
API --> R : ADDED / MODIFIED / DELETED (스트림)
R -> F : Add / Update / Delete delta

== 연결 끊김 ==
API -->x R : 410 Gone / 연결 종료
R -> API : 다시 List → Watch
```

### Reflector → DeltaFIFO → Indexer

Reflector가 받은 변화는 곧장 핸들러로 가지 않고 **DeltaFIFO**라는 큐를 거친다. DeltaFIFO는 객체(key)별로 변화(delta)를 **순서대로** 쌓아두는 큐다. 같은 객체에 여러 변화가 빠르게 일어나도 순서가 보장되고, 짧은 시간의 중복 이벤트를 합쳐 처리할 수 있다.

큐에 쌓인 delta는 Informer의 컨트롤러 루프가 하나씩 꺼내(Pop) 두 가지 일을 한다.

1. **Indexer(로컬 캐시)를 갱신** — Added/Updated면 저장, Deleted면 제거.
2. **이벤트 핸들러 호출** — 등록된 `ResourceEventHandler`(OnAdd/OnUpdate/OnDelete)에 변화를 전달.

여기서 중요한 순서가 있다. **캐시를 먼저 갱신한 뒤 핸들러를 부른다.** 그래서 핸들러 안에서 Lister로 캐시를 읽으면, 방금 들어온 변화가 이미 반영된 상태를 볼 수 있다.

### Indexer와 Lister: 읽기는 캐시에서

**Indexer**는 단순한 key-value 저장소(ThreadSafeStore)에 **인덱스**를 더한 것이다. 네임스페이스별, 레이블별처럼 자주 쓰는 기준으로 객체를 빠르게 찾도록 색인을 만들어 둔다.

컨트롤러가 "현재 상태"를 읽을 때 쓰는 **Lister**는 이 Indexer를 감싼 읽기 전용 뷰다. 즉 `lister.list()`나 `lister.get(name)`은 **API 서버가 아니라 메모리에서** 응답한다. 직접 watch를 쓸 때 "전체가 필요하면 또 List를 날려야 했던" 문제를 해결한다.

또 Informer는 주기적으로 **resync**를 수행하는데, 이때도 API 서버를 부르지 않는다. 로컬 캐시에 있는 객체들에 대해 Sync delta를 다시 흘려보내 핸들러를 한 번씩 더 호출할 뿐이다. "혹시 놓친 reconcile이 있으면 다시 맞춰라"는 안전장치이고, 비용은 전부 로컬에서 치른다.

### SharedInformer: 하나의 watch를 나눠 쓴다

마지막 조각이 **SharedInformer**다. 같은 리소스(예: Pod)를 여러 컨트롤러가 본다면, informer를 각자 만들 필요 없이 **하나의 informer(= 하나의 List+Watch, 하나의 캐시)를 공유**하고, 이벤트만 각 리스너에게 나눠준다.

```plantuml
skinparam componentStyle rectangle

node "API Server" as API
component "SharedInformer\n(Reflector + Indexer)" as S
component "Controller A" as A
component "Controller B" as B
component "Controller C" as C

API --> S : watch (연결 1개)
S --> A : 이벤트 분배
S --> B : 이벤트 분배
S --> C : 이벤트 분배

note bottom of S
  watch 1개 + 캐시 1개를
  세 컨트롤러가 공유
end note
```

앞의 "컨트롤러마다 watch 3개" 그림과 비교하면 차이가 분명하다. **연결도 1개, 캐시도 1개**이다.

## Informer가 API 서버 부하를 줄이는 원리

정리하면 Informer가 API 서버 부하를 줄이는 방식은 세 가지다.

- **폴링이 아니라 List 1회 + Watch 스트림.** 초기 한 번만 전체를 받고, 그 뒤로는 변화분만 흘러온다. "1초마다 전체 List"같은 폴링 트래픽이 사라진다.
- **읽기는 전부 로컬 캐시(Lister).** reconcile 도중 현재 상태를 아무리 자주 조회해도 API 호출은 0이다.
- **SharedInformer로 연결·캐시 공유.** 한 리소스를 N개 컨트롤러가 봐도 watch는 1개다. resync도 로컬이라 추가 호출이 없다.

```plantuml
participant "Controller" as C
participant "Informer\n(Local Cache)" as INF
participant "API Server" as API

== 직접 watch / 폴링 방식 ==
C -> API : List (반복)
C -> API : Get (읽을 때마다)
note right of API : 읽기마다 API 부하

== Informer 방식 ==
C -> INF : list() / get()
INF --> C : 캐시에서 즉시 응답
note right of INF : API 호출 없음
INF -[#green]> API : watch 1개만 유지
```

결과적으로 클러스터에 컨트롤러가 수십 개 떠 있어도, API 서버 입장에서는 **리소스 종류별 watch 몇 개**만 감당하면 된다.

## API 서버의 watch cache가 etcd 부하를 줄이는 원리

여기서 한 단계 더 내려가 보자. 컨트롤러들의 watch를 API 서버가 받아주는 건 알겠는데, **그 API 서버는 etcd를 어떻게 감당할까?**

만약 API 서버가 클라이언트 watch 하나하나를 그대로 etcd watch로 옮겼다면, 클라이언트가 1000개면 etcd watch도 1000개가 됐을 것이다. 실제로는 그렇지 않다. API 서버 내부에는 **watch cache(cacher)** 라는, Informer와 똑 닮은 구조가 들어 있기 때문이다.

- API 서버는 리소스 종류별로 **etcd에 watch를 단 하나** 건다(storage layer의 cacher).
- 그 이벤트를 메모리의 **watch cache(최근 이벤트 링 버퍼 + 현재 상태 저장소)** 에 쌓는다.
- 모든 클라이언트 watch는 etcd가 아니라 이 **watch cache가 직접 서빙**한다.
- 게다가 `resourceVersion=0` 같은 List 요청은 etcd 쿼럼 읽기 대신 **watch cache에서 응답**할 수 있어, 읽기 부하까지 줄인다.

즉 API 서버 안에도 "Reflector → 캐시 → 다수의 watcher에게 분배"라는 **Informer와 동일한 fan-in 패턴**이 한 겹 더 있는 것이다.

```plantuml
skinparam componentStyle rectangle

database "etcd" as ETCD
node "API Server" as API {
  component "Cacher\n(watch cache)" as C
}
component "SharedInformer A" as IA
component "SharedInformer B" as IB

ETCD --> C : watch 1개 (리소스별)
C --> IA : watch 서빙 (캐시)
C --> IB : watch 서빙 (캐시)

note right of C
  클라이언트 watch가 수천 개여도
  etcd watch는 리소스별 1개
end note
```

## 정리: 같은 패턴이 계층으로 쌓인다

처음의 질문 — "리소스 변화를 어떻게 감지할 것인가" — 에 대한 Kubernetes의 답은 결국 **계층적 캐싱**이다. 같은 List+Watch 패턴이 두 겹으로 포개져 있다.

```plantuml
skinparam componentStyle rectangle

database "etcd" as ETCD
node "API Server\n(watch cache)" as API
component "Informer 캐시\n(client-go / fabric8)" as INF
component "Controller A" as A
component "Controller B" as B

ETCD <-- API : watch 1개 (리소스별)
API <-- INF : watch 1개 (공유)
INF <-- A : 캐시 읽기 + 이벤트
INF <-- B : 캐시 읽기 + 이벤트
```

- **컨트롤러 ↔ Informer**: 수많은 reconcile의 읽기를 로컬 캐시가 받아내고, API 서버에는 watch 1개만 남긴다.
- **Informer ↔ API 서버 watch cache**: 수많은 클라이언트 watch를 watch cache가 받아내고, etcd에는 watch 1개만 남긴다.

각 계층이 위층의 watch를 **fan-in으로 합쳐** 아래층 부하를 줄인다. 직접 watch를 걸던 처음 코드에서 떠안아야 했던 재연결·캐시·연결 공유 문제는, 사실 Kubernetes가 클러스터 전체 규모에서 이미 풀어둔 문제였던 셈이다.
