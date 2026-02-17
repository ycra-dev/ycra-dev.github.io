---
title: "Pod"
description: "Pod는 Kubernetes에서 배포의 가장 작은 단위로, 하나 이상의 밀접하게 관련된 컨테이너의 그룹이다"
tags: ['Kubernetes', 'Pod', 'Container', 'Deployment Unit', 'Workload', 'Container Orchestration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/pod
sidebar:
  order: 1
---

## 핵심 개념

Kubernetes에서 컨테이너를 직접 배포하지 않고 Pod를 통해 배포한다. "Pod of whales(고래 떼)" 또는 "pea pod(완두콩 꼬투리)"에서 유래된 이름이다.

Pod의 핵심 특성:
- **공유 네트워크**: 같은 Pod의 컨테이너는 동일한 네트워크 네임스페이스를 사용하여 같은 IP 주소와 포트 공간을 공유
- **공유 호스트명**: UTS 네임스페이스를 공유하여 동일한 시스템 호스트명을 인식
- **고유 IP**: 각 Pod는 자체 IP 주소를 가짐
- **논리적 호스트**: 각 Pod를 하나의 별도 논리적 컴퓨터로 생각할 수 있음

Pod의 수명 주기:
- **임시적(Ephemeral)**: Pod는 언제든 사라질 수 있음 (노드 장애, 의도적 삭제, 퇴거)
- **교체 가능**: 사라진 Pod는 완전히 새로운 Pod로 교체됨 (새 IP 주소 부여)
- **이동 불가**: Pod가 노드에 할당되면 해당 인스턴스는 다른 노드로 이동하지 않음
- Pod 객체가 존재하는 한 Kubernetes는 컨테이너를 계속 실행하려고 최선을 다함

Pod를 직접 생성하는 대신 Deployment를 사용하는 이유:
- 여러 복제본을 수동으로 생성하고 고유 이름을 부여해야 하는 번거로움 방지
- Pod가 사라지거나 노드 장애 시 자동 교체
- 원하는 복제본 수 유지를 자동화

Pod 내의 모든 컨테이너는 Network namespace(IP 주소, 포트 공간), UTS namespace(호스트명), IPC namespace를 공유한다. 각 컨테이너는 자체 Mount namespace를 가지므로 독립된 파일 시스템을 갖지만, Volume을 통해 파일 시스템의 일부를 공유할 수 있다. Pod는 수평 확장(horizontal scaling)의 기본 단위이기도 하며, Kubernetes는 Pod 내의 개별 컨테이너가 아닌 전체 Pod를 복제한다.

하나의 Pod에는 하나의 애플리케이션만 실행하는 것이 권장되며, 프론트엔드와 백엔드 같은 서로 다른 컴포넌트는 별도의 Pod로 분리하여 독립적으로 확장할 수 있도록 해야 한다.

## 예시

```bash
# Pod 목록 조회
$ kubectl get pods
NAME                     READY     STATUS    RESTARTS   AGE
kiada-9d785b578-p449x    1/1       Running   0          1m

# Pod 상세 정보 (노드 할당, IP 등)
$ kubectl get pods -o wide
NAME                   ...  IP          NODE
kiada-9d785b578-58vhc  ...  10.244.1.5  kind-worker
kiada-9d785b578-jmnj8  ...  10.244.2.4  kind-worker2

# Pod 상세 설명 (이벤트 포함)
$ kubectl describe pod kiada-9d785b578-p449x
Events:
  Normal  Scheduled  25s  default-scheduler  Successfully assigned...
  Normal  Pulling    23s  kubelet            Pulling image "luksa/kiada:0.1"
  Normal  Pulled     21s  kubelet            Successfully pulled image
  Normal  Created    21s  kubelet            Created container kiada
  Normal  Started    21s  kubelet            Started container kiada
```

```
Pod 구조:

+------ Pod (고유 IP: 10.244.1.5) ------+
|                                         |
|  [Container A]    [Container B]         |
|  (메인 앱)        (사이드카)            |
|                                         |
|  공유: 네트워크 네임스페이스             |
|        UTS 네임스페이스                 |
|  분리: 파일시스템 (Mount 네임스페이스)   |
+-----------------------------------------+
```

Pod 매니페스트 파일 예시:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada
spec:
  containers:
  - name: kiada
    image: luksa/kiada:0.1
    ports:
    - containerPort: 8080
```

Pod 생성 및 확인:

```bash
kubectl apply -f pod.kiada.yaml
kubectl get pod kiada
kubectl describe pod kiada
```

## 관련 개념

- [Deployment](/knowledge/kubernetes/deployment/) - Pod를 생성하고 관리하는 상위 객체
- [Service](/knowledge/kubernetes/service/) - Pod에 대한 안정적인 통신 진입점 제공
- [Container](/knowledge/kubernetes/container/) - Pod 내에서 실행되는 실제 프로세스
- [Linux Namespaces](/knowledge/kubernetes/linux-namespaces/) - Pod 내 컨테이너 간 공유되는 격리 메커니즘
- [Kubernetes Scheduler](/knowledge/kubernetes/kubernetes-scheduler/) - Pod를 워커 노드에 할당
- [Replica](/knowledge/kubernetes/replica/) - Pod의 복제본 개념
- [Sidecar Container](/knowledge/kubernetes/sidecar-container/) - Pod 내에서 주 컨테이너를 보완하는 보조 컨테이너
- [Init Container](/knowledge/kubernetes/init-container/) - Pod 시작 시 순차적으로 실행되는 초기화 컨테이너
- [Pod Networking](/knowledge/kubernetes/pod-networking/) - Pod 내부 및 Pod 간의 네트워크 통신 구조
- [Horizontal Scaling](/knowledge/kubernetes/horizontal-scaling/) - Pod 단위의 수평 확장
