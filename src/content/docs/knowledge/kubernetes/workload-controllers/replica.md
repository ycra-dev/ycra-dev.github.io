---
title: "레플리카 (Replica)"
description: "Replica(복제본)는 동일한 Pod 템플릿에서 생성된 Pod의 각 인스턴스를 의미한다"
tags: ['Kubernetes', 'Replica', 'Scaling', 'Availability', 'Deployment']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/replica
sidebar:
  order: 3
---

## 핵심 개념

Replica는 Kubernetes에서 애플리케이션의 가용성과 확장성을 보장하는 핵심 메커니즘이다.

Replica의 동작 원리:
1. Deployment에서 원하는 복제본 수를 `replicas` 필드로 지정
2. Kubernetes Controller가 실제 Pod 수와 원하는 수를 비교
3. 부족하면 새 Pod를 생성하고, 초과하면 Pod를 제거
4. Pod가 사라지면 (노드 장애, 삭제 등) 자동으로 새 Pod를 생성하여 원하는 수 유지

중요한 개념:
- **선언적 접근**: "Pod 2개를 추가하라"가 아니라 "3개의 복제본이 있어야 한다"고 선언
- **각 복제본은 독립적 Pod**: 복제본들은 동일한 컨테이너 내에 있는 것이 아니라 각각 별도의 Pod
- **노드 분산**: Scheduler가 복제본을 여러 노드에 분산 배치 (가용성 향상)
- **동일한 환경**: 모든 복제본이 동일한 컨테이너 이미지에서 생성되므로 동일한 OS 환경

주의사항:
- 애플리케이션 자체가 수평 확장을 지원해야 함
- Kubernetes는 마법처럼 애플리케이션을 확장 가능하게 만들지 않고, 복제만 용이하게 해줌

## 예시

```bash
# 기본 1개 복제본
$ kubectl create deployment kiada --image=luksa/kiada:0.1

# 3개 복제본으로 확장
$ kubectl scale deployment kiada --replicas=3

# 복제본 확인
$ kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
kiada-9d785b578-58vhc   1/1     Running   0          17s   # 복제본 1
kiada-9d785b578-jmnj8   1/1     Running   0          17s   # 복제본 2
kiada-9d785b578-p449x   1/1     Running   0          18m   # 복제본 3 (원본)

# 복제본이 어느 노드에 분산되었는지 확인
$ kubectl get pods -o wide
NAME                   ...  NODE
kiada-9d785b578-58vhc  ...  kind-worker     # 노드 1
kiada-9d785b578-jmnj8  ...  kind-worker2    # 노드 2
kiada-9d785b578-p449x  ...  kind-worker2    # 노드 2

# 복제본 수 축소
$ kubectl scale deployment kiada --replicas=1
```

```
Replica 관리 흐름:

Deployment (replicas: 3)
    |
    v
Controller: 현재 Pod 1개 -> 원하는 Pod 3개 -> 2개 추가 생성
    |
    +---+---+
    v   v   v
  Pod1 Pod2 Pod3  (각각 독립적인 Pod)
```

## 관련 개념

- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - Replica 수를 관리하는 상위 객체
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 각 Replica가 나타내는 실행 단위
- [수평 확장 (Horizontal Scaling)](/knowledge/kubernetes/horizontal-scaling/) - Replica 수 조정을 통한 수평 확장
- [서비스 (Service)](/knowledge/kubernetes/service/) - 여러 Replica에 대한 로드 밸런싱 제공
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - Replica 수의 선언적 관리
