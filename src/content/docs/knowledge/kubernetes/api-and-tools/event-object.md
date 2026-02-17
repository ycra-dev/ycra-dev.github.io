---
title: "Event Object"
description: "Event Object는 Kubernetes 클러스터에서 발생하는 사건을 기록하는 API 객체이다"
tags: ['Kubernetes', 'Event', 'Monitoring', 'Debugging', 'API Object']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/event-object
sidebar:
  order: 5
---

## 핵심 개념

Event는 Kubernetes에서 "무슨 일이 일어나고 있는지"를 파악하는 데 핵심적인 역할을 한다. 다른 객체들과 마찬가지로 Kubernetes API를 통해 생성되고 조회된다.

**Event 객체의 특징:**
- **독립적 객체**: Event는 다른 객체(Node, Pod 등)의 일부가 아닌 독립적인 API 객체
- **자동 삭제**: etcd의 부담을 줄이기 위해 생성 후 약 1시간 뒤 자동 삭제 (설정 가능)
- **Spec/Status 없음**: 정적 데이터만 포함하며 대응하는 컨트롤러가 없음
- **필드 순서**: 알파벳 순으로 정렬되어 YAML 가독성이 떨어짐

**Event의 주요 속성:**

| 속성 | 설명 |
|------|------|
| Type | Normal 또는 Warning |
| Reason | 이벤트 발생 이유 (머신용) |
| Source | 이벤트를 보고한 컴포넌트 (보통 컨트롤러) |
| Object | 이벤트가 관련된 객체 (예: node/xyz) |
| Sub-object | 관련 하위 객체 (예: Pod의 특정 컨테이너) |
| Message | 이벤트 상세 설명 (사람용) |
| First seen | 이벤트 최초 발생 시간 |
| Last seen | 이벤트 최근 발생 시간 |
| Count | 동일 이벤트 발생 횟수 |

**Event 유형:**
- **Normal**: 정상적인 작업이 수행되었음을 알림 (예: Pod 시작, 이미지 pull)
- **Warning**: 문제가 발생했음을 알림. 디버깅에 특히 중요

## 예시

```bash
# 모든 이벤트 목록 조회
$ kubectl get events
LAST SEEN  TYPE    REASON                   OBJECT             MESSAGE
48s        Normal  Starting                 node/kind-worker2  Starting kubelet.
48s        Normal  NodeAllocatableEnforced  node/kind-worker2  Updated Node A...
48s        Normal  NodeHasSufficientMemory  node/kind-worker2  Node kind-work...
47s        Normal  Starting                 node/kind-worker2  Starting kube-...

# 단축 이름 사용
$ kubectl get ev

# Warning 이벤트만 필터링
$ kubectl get ev --field-selector type=Warning
No resources found in default namespace.

# 넓은 출력으로 상세 정보 확인
$ kubectl get ev -o wide

# 특정 객체의 이벤트 확인 (describe 사용)
$ kubectl describe node kind-worker2
Events:
  Type    Reason                   Age    From                      Message
  Normal  Starting                 3m50s  kubelet, kind-worker2     ...
  Normal  NodeAllocatableEnforced  3m50s  kubelet, kind-worker2     ...
```

```yaml
# Event 객체의 YAML 매니페스트 예시
apiVersion: v1
count: 1
eventTime: null
firstTimestamp: "2020-05-17T18:16:40Z"
involvedObject:            # 관련 객체
  kind: Node
  name: kind-worker2
  uid: kind-worker2
kind: Event
lastTimestamp: "2020-05-17T18:16:40Z"
message: Starting kubelet.
metadata:
  name: kind-worker2.160fe38fc0bc3703
  namespace: default
reason: Starting
source:
  component: kubelet       # 이벤트를 생성한 컴포넌트
  host: kind-worker2
type: Normal               # 이벤트 유형
```

## 관련 개념

- [Controller](/knowledge/kubernetes/controller/) - Event를 생성하는 주체
- [Kubernetes API](/knowledge/kubernetes/kubernetes-api/) - Event가 저장되고 조회되는 API
- [etcd](/knowledge/kubernetes/etcd/) - Event가 저장되는 데이터스토어 (1시간 후 자동 삭제)
- [kubectl](/knowledge/kubernetes/kubectl/) - Event를 조회하는 도구
- [Status Conditions](/knowledge/kubernetes/status-conditions/) - Event와 함께 객체 상태를 파악하는 수단
- [Field Selector](/knowledge/kubernetes/field-selector/) - Warning 이벤트만 필터링하는 방법
