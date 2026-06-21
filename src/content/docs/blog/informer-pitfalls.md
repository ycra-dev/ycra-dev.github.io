---
title: "Kubernetes Informer를 쓸 때 유의할 점"
description: "Informer는 편리한 추상화지만 잘못 쓰면 조용히 망가진다. 순서·유실, 캐시 정합성, 핸들러 설계, resync 오해, 메모리까지 실수하기 쉬운 지점을 정리한다."
tags: ["Kubernetes", "Informer", "client-go", "Controller"]
date: 2026-06-21
excerpt: "Informer는 'List+Watch+캐시'를 대신 해주지만, 그 대가로 몇 가지 가정을 강요한다. 캐시를 직접 고치지 말 것, 모든 이벤트를 본다고 믿지 말 것 — 틀리기 쉬운 지점들을 모았다."
created: 2026-06-21
updated: 2026-06-21
draft: true
slug: blog/informer-pitfalls
---

[앞 글](/blog/kubernetes-informer/)에서는 Informer가 List+Watch와 로컬 캐시로 어떻게 API 서버·etcd 부하를 줄이는지 봤다. 그런데 이 편리함에는 대가가 있다. Informer는 **"이렇게 써야만 안전하다"는 몇 가지 가정**을 조용히 강요한다. 그 가정을 모르면 코드는 평소엔 잘 돌다가, 연결이 한 번 끊기거나 부하가 몰리는 순간에 **소리 없이 어긋난다.**

이 글은 Informer 기반 컨트롤러를 짤 때 틀리기 쉬운 지점들을 모은 체크리스트다.

## 1. 모든 이벤트를 본다고 믿지 마라 (순서·유실)

가장 먼저, 그리고 가장 중요한 것. **Informer는 "발생한 모든 변화 이벤트"를 보장하지 않는다.**

### 순서는 누가 보장하나

watch 스트림의 순서는 Informer가 만드는 게 아니라 **API 서버(궁극적으로 etcd)** 가 보장한다. etcd는 단일 일관 로그라 모든 변경에 단조 증가하는 revision이 붙고, 이게 `resourceVersion`으로 노출된다. API 서버의 watch cache가 이 순서를 보존해 여러 watcher에게 똑같은 순서로 흘려준다. Reflector는 **받은 순서 그대로** DeltaFIFO에 넣을 뿐이다.

단, 여기서 "순서"는 **단일 watch 스트림 안에서 `resourceVersion`이 단조 증가**한다는 뜻이다. `resourceVersion`은 불투명(opaque) 토큰이라 `RV2 - RV1` 같은 산술은 의미가 없고, **대소 비교(누가 더 최신인가)만** 보장된다. 서로 다른 리소스 종류(Pod와 Node 등) 사이의 이벤트 순서는 아무것도 보장되지 않는다.

### 끊긴 사이의 이벤트는 유실된다

API 서버의 watch cache는 **고정 크기 링 버퍼**다. watcher가 느리거나 연결이 끊겨서 재개 시 요청한 `resourceVersion`이 버퍼의 가장 오래된 항목보다 더 옛날이면, API 서버는 `410 Gone`("too old resource version")을 돌려준다. 그러면 Reflector는 **전체를 다시 List(relist)** 해서 최신 스냅샷 + 새 `resourceVersion`을 확보한 뒤 watch를 재개한다.

```plantuml
participant "API Server" as API
participant "Reflector" as R
participant "DeltaFIFO" as F
participant "Indexer" as I

R -> API : Watch(rv=100)
note right of API
  연결이 끊긴 사이
  Pod B가 생성됐다가 삭제됨
  (rv=120 → 121)
end note
API -->x R : 연결 종료
R -> API : Watch(rv=100) 재개 시도
API --> R : 410 Gone (너무 오래된 rv)
R -> API : List (relist)
API --> R : 현재 객체 전체 + rv=130
R -> F : Replace([A, C], 130)
F -> I : set-difference로 B 삭제 감지
```

결과적으로 로컬 캐시의 **정합성은 회복**되지만, **두 List 사이의 개별 transition은 못 본다.** 위 그림처럼 끊긴 사이에 Pod B가 생겼다 사라지면, B의 **존재 자체를 통째로 놓친다.**

### 그래서 컨트롤러는 level-triggered여야 한다

이 때문에 Informer 기반 컨트롤러의 제1원칙은 **"모든 이벤트를 본다고 가정하지 마라"** 다. 이벤트마다 반응하는 edge-triggered가 아니라, **관측된 현재 상태에서 desired 상태로 수렴(idempotent reconcile)** 하는 level-triggered로 짜야 한다. 핸들러는 "무엇이 바뀌었나"가 아니라 "지금 상태가 어떤가"를 기준으로 동작해야 한다.

### relist가 놓친 삭제를 메우는 법: tombstone

위 그림의 "set-difference로 B 삭제 감지"가 핵심이다. `DeltaFIFO.Replace()`는 새 List를 단순 upsert만 하지 않는다.

1. 새 List의 key 집합을 만든다.
2. **현재 store에는 있는데 새 List엔 없는 key**(= 끊긴 사이 삭제된 것)를 찾는다.
3. 그 key에 대해 `Deleted` delta를 합성하되, 삭제된 객체의 최종 상태를 모르므로 **마지막으로 알던 상태를 `DeletedFinalStateUnknown`(통칭 tombstone)으로 감싸서** 큐에 넣는다.

그래서 **삭제 핸들러에 들어오는 객체는 진짜 타입이 아니라 tombstone일 수 있다.** 이걸 처리 안 하면 타입 단언에서 panic하거나 삭제를 통째로 흘린다.

```go
func onDelete(obj interface{}) {
    pod, ok := obj.(*v1.Pod)
    if !ok {
        tombstone, ok := obj.(cache.DeletedFinalStateUnknown)
        if !ok {
            return // 알 수 없는 타입
        }
        pod, ok = tombstone.Obj.(*v1.Pod) // 마지막으로 알던 상태
        if !ok {
            return
        }
    }
    // pod의 key 정도만 신뢰 (최신 상태는 아닐 수 있음)
}
```

fabric8의 `onDelete(Pod pod, boolean finalStateUnknown)`에서 두 번째 인자 `finalStateUnknown`이 바로 이 tombstone 여부다. `true`면 "watch가 놓친 삭제를 relist로 추론한 것"이라는 신호다.

## 2. 캐시를 직접 수정하지 마라

Lister·Indexer가 돌려주는 객체는 **캐시 안의 객체를 그대로(포인터로)** 준 것이다. 복사본이 아니다.

```go
pod, _ := lister.Pods("default").Get("my-pod")
pod.Status.Phase = "Running" // 절대 금지: 공유 캐시를 오염시킨다
```

이렇게 하면 **다른 모든 핸들러·컨트롤러가 보는 캐시를 함께 바꿔버리고**, 동시에 읽는 쪽과 data race가 난다. 수정이 필요하면 반드시 먼저 복사한다.

```go
pod := original.DeepCopy()
pod.Status.Phase = "Running" // 복사본을 수정
client.CoreV1().Pods("default").UpdateStatus(ctx, pod, ...)
```

Informer 버그의 상당수가 여기서 나온다. **"읽은 객체는 내 것이 아니다"** 를 항상 기억하자.

## 3. 캐시는 항상 조금 늦다 (read-after-write)

Lister는 로컬 캐시를 읽는다. 그리고 캐시는 watch를 통해 채워지므로 **etcd보다 항상 조금 뒤처져 있다.** 방금 내가 `Create()`한 객체가 Lister에는 아직 안 보일 수 있다는 뜻이다.

```plantuml
participant "Controller" as C
participant "API Server" as API
participant "Informer Cache" as CACHE

C -> API : Create(Pod X)
API --> C : 201 Created
note right of C
  곧바로 다시 reconcile이 돌아
  "Pod X 있나?" 확인
end note
C -> CACHE : list()
CACHE --> C : (아직 X 없음 — watch가 안 따라옴)
note right of C
  "없네?" → Pod X를 또 생성 (중복!)
end note
```

이 read-after-write 불일치를 모르면 **같은 리소스를 중복 생성**하는 사고가 난다. Kubernetes 본체의 ReplicaSet 컨트롤러는 이를 **expectations 패턴**(내가 방금 만든/지운 개수를 따로 기억해 두고, 캐시가 그만큼 따라올 때까지 추가 동작을 보류)으로 보정한다. 직접 짤 때도 "캐시가 내 쓰기를 아직 못 봤을 수 있다"를 전제로 멱등하게 설계해야 한다.

## 4. 시작 전에 `WaitForCacheSync` 하라

초기 List가 캐시를 다 채우기 전에 reconcile을 시작하면, Lister가 **빈 결과**를 준다. 그러면 멀쩡히 존재하는 리소스를 "없음"으로 오판해서, 다시 만들거나 심지어 지우는 사고로 이어진다.

```go
go informer.Run(stopCh)
if !cache.WaitForCacheSync(stopCh, informer.HasSynced) {
    return // 동기화 실패
}
// 이제부터 워커 시작
```

한 가지 함정: `HasSynced`는 **최초 1회 동기화 완료**를 알리는 게이트일 뿐이다. "지금도 최신"을 보장하지 않는다. 이후 watch가 끊겼다 relist해도 `HasSynced`는 계속 `true`다.

## 5. 핸들러에서 무거운 일을 하지 마라 (workqueue 패턴)

이벤트 핸들러는 **key만 큐에 넣고 즉시 리턴**해야 한다. 실제 작업(API 호출, 재시도, 외부 시스템 연동)은 별도 워커 goroutine에서 한다.

```plantuml
skinparam componentStyle rectangle

component "Event Handler" as H
queue "WorkQueue\n(rate-limited)" as Q
component "Worker 1" as W1
component "Worker 2" as W2
node "API Server" as API

H -> Q : enqueue(key)  // 가볍고 빠름
Q -> W1 : key
Q -> W2 : key
W1 -> API : reconcile (무거운 일)
W2 -> API : reconcile (무거운 일)
```

핸들러 안에서 동기적으로 무거운 작업을 하면, **자기 리스너 버퍼가 무한정 커지고** 전체 이벤트 처리가 밀린다. workqueue를 거치면 (1) 재시도·rate-limit·backoff를 큐가 대신 해주고, (2) **같은 key의 중복 처리를 자동으로 합쳐주며**(dedup), (3) 워커 수로 처리량을 조절할 수 있다. controller-runtime이 강제하는 구조가 바로 이것이다.

## 6. resync는 API 서버 재조회가 아니다

가장 흔한 오해. `resyncPeriod`를 짧게 잡으면 최신 데이터를 더 자주 받아온다고 생각하는데, **틀렸다.**

resync는 **로컬 캐시에 이미 있는 객체들을 핸들러에 다시 흘려보낼 뿐**, 네트워크 호출이 0이다. `old == new`인 Update 이벤트가 다시 도는 것뿐이다. 목적은 "혹시 놓친 reconcile이 있으면 현재 상태 기준으로 한 번 더 맞춰라"는 안전장치다.

| | relist | resync |
|---|---|---|
| 트리거 | watch 끊김 / `410 Gone` | `resyncPeriod` 주기 |
| 데이터 출처 | **API 서버 재조회** | **로컬 캐시** |
| 네트워크 비용 | 있음 | 없음 |
| 목적 | watch 갭 복구 | 주기적 재조정 |

그래서 resync를 짧게 잡으면 데이터가 신선해지는 게 아니라 **그냥 CPU만 더 탄다.** 보통 0(off)이거나 수십 분 단위로 둔다.

## 7. 메모리를 의식하라

Informer는 대상 타입의 **객체를 전부 메모리에 캐싱**한다. Pod·Secret·ConfigMap을 클러스터 전역으로 watch하면 캐시가 수 GB까지 커질 수 있다. 대응 수단:

- **범위를 좁혀라** — 네임스페이스 스코프 informer, label/field selector로 캐시 대상 자체를 줄인다.
- **`TransformFunc`로 잘라내라** — 저장 전에 `managedFields`처럼 안 쓰는 큰 필드를 떼어내 메모리를 줄인다.
- **초기 List 스파이크** — informer가 뜰 때 전체를 한 번에 받으면 메모리가 출렁인다. 최신 client-go의 streaming list(WatchList)는 이 초기 스파이크를 완화한다.

여러 컴포넌트가 같은 타입을 본다면 **`SharedInformerFactory`로 informer를 공유**해 캐시 중복을 막는다. 단, **selector를 건 필터드 informer는 별도 캐시**라 전체를 못 본다. "왜 내 Lister엔 이 객체가 없지?"의 단골 원인이 바로 어딘가에서 좁은 selector로 informer를 만든 경우다.

## 정리: Informer는 "공짜 캐시"가 아니다

Informer는 List+Watch+재연결+캐시를 대신 해주는 강력한 추상화지만, 그 대가로 몇 가지 규칙을 지킬 것을 요구한다.

- **이벤트를 세지 마라.** 끊김·relist로 중간 이벤트는 유실된다 → level-triggered로 수렴하게 짜라.
- **읽은 객체는 내 것이 아니다.** 수정 전 `DeepCopy`.
- **캐시는 조금 늦다.** read-after-write를 가정하지 말고 멱등하게.
- **시작 전 `WaitForCacheSync`.** 빈 캐시로 오판 금지.
- **핸들러는 가볍게, 일은 workqueue에서.**
- **resync ≠ 재조회.** 짧게 잡아도 신선해지지 않는다.
- **캐시는 메모리를 먹는다.** 범위·transform·공유로 관리하라.

이 규칙들은 결국 하나로 모인다. **Informer가 보여주는 건 "진실의 약간 늦은 사본"이지, 진실 그 자체가 아니다.** 그 사본을 어떻게 다뤄야 하는지를 아는 것이 Informer를 제대로 쓰는 일의 전부다.
