---
title: "쿠버네티스 스케줄러 (Kubernetes Scheduler)"
description: "Kubernetes Scheduler는 새로 생성된 Pod를 어떤 워커 노드에서 실행할지 결정하는 Control Plane의 특수한 컨트롤러이다"
tags: ['Kubernetes', 'Scheduler', 'Control Plane', 'Pod Scheduling']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/scheduler
sidebar:
  order: 7
---

## 핵심 개념

Scheduler는 Control Plane 내에서 실행되는 특수한 유형의 컨트롤러로, 유일한 임무는 애플리케이션 인스턴스를 워커 노드에 스케줄링하는 것이다.

동작 방식:
1. API Server를 통해 새로 생성된 Pod 객체를 감지
2. 각 Pod에 가장 적합한 워커 노드를 선택
3. API를 통해 Pod 객체를 수정하여 해당 노드에 할당

스케줄링이라는 용어는 "미래의 어느 시점에 실행되도록 예약"하는 것이 아니다. OS의 CPU 스케줄러가 프로세스를 CPU에 할당하는 것처럼, Kubernetes Scheduler는 Pod를 노드에 할당하며 Pod는 즉시 실행된다.

중요한 특징:
- Pod가 한 번 노드에 할당되면, 해당 인스턴스는 다른 노드로 이동되지 않음 (CPU 프로세스와 다름)
- 노드 장애 시 기존 Pod가 이동하는 것이 아니라 새로운 Pod 인스턴스가 다른 노드에 생성됨
- 여러 요인(리소스 요구사항, 노드 가용 리소스, 제약조건 등)을 고려하여 최적의 배치를 결정
- 대규모 클러스터에서 최적 조합을 찾는 것은 인간보다 훨씬 빠르고 효율적으로 수행됨

## 예시

```
스케줄링 흐름:

1. Deployment 생성 -> Controller가 Pod 객체 생성
2. Scheduler가 미할당 Pod 감지
3. 각 노드의 가용 리소스 평가:
   - Worker Node 1: CPU 80% 사용중 -> 부적합
   - Worker Node 2: CPU 30% 사용중 -> 적합
   - Worker Node 3: CPU 50% 사용중 -> 적합
4. Worker Node 2를 선택하여 Pod에 할당
5. Worker Node 2의 Kubelet이 Pod 실행
```

```bash
# Pod가 어떤 노드에 스케줄링되었는지 확인
$ kubectl get pods -o wide
NAME                    ...  IP          NODE
kiada-9d785b578-58vhc   ...  10.244.1.5  kind-worker
kiada-9d785b578-jmnj8   ...  10.244.2.4  kind-worker2
```

## 관련 개념

- [컨트롤 플레인 (Control Plane)](/knowledge/kubernetes/control-plane/) - Scheduler가 속한 제어 영역
- [파드 (Pod)](/knowledge/kubernetes/pod/) - Scheduler가 노드에 할당하는 기본 배포 단위
- [Kubelet](/knowledge/kubernetes/kubelet/) - 노드에서 스케줄된 Pod를 실행하는 에이전트
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - Pod 생성을 유발하는 상위 객체
