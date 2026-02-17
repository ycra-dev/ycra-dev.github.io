---
title: "NodePort"
description: "NodePort는 Kubernetes Service의 한 유형이자 메커니즘으로, 클러스터의 모든 워커 노드에서 특정 포트를 열어 외부 트래픽이 Service에 접근할 수 있게 한다"
tags: ['Kubernetes', 'Service', 'Networking', 'Node Port', 'External Access']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/node-port
sidebar:
  order: 5
---

## 핵심 개념

LoadBalancer 서비스를 생성하면 자동으로 NodePort도 할당된다. NodePort는 외부 트래픽이 클러스터 내부의 Service로 들어오는 진입점 역할을 한다.

NodePort의 동작 방식:
1. Service 생성 시 Kubernetes가 자동으로 높은 범위의 포트 번호 할당 (기본: 30000-32767)
2. 모든 워커 노드에서 해당 포트가 열림
3. 어떤 노드로 들어온 트래픽이든 Service에 의해 적절한 Pod로 라우팅

NodePort의 사용 시나리오:
- **로드 밸런서가 없는 환경**: Minikube처럼 외부 로드 밸런서를 프로비저닝할 수 없을 때 직접 NodePort로 접근
- **로드 밸런서의 내부 경로**: LoadBalancer Service에서 외부 로드 밸런서가 트래픽을 노드로 보낼 때 NodePort를 통해 전달
- **방화벽 규칙**: 노드 포트에 대한 방화벽 규칙이 허용되어야 외부 접근 가능

접근 방법:
- `<노드IP>:<NodePort>`로 접근 (어떤 워커 노드의 IP든 사용 가능)
- 모든 워커 노드에서 동일한 NodePort를 통해 접근 가능
- Docker Desktop의 경우 VM의 IP에 직접 접근이 안 될 수 있음

## 예시

```bash
# Service 정보에서 NodePort 확인
$ kubectl get svc kiada
NAME   TYPE          CLUSTER-IP    EXTERNAL-IP  PORT(S)         AGE
kiada  LoadBalancer  10.19.243.17  <pending>    8080:30838/TCP  82s
#                                               ^^^^^ ^^^^^
#                                               서비스포트:노드포트

# Minikube에서 NodePort로 접근
$ minikube service kiada --url
http://192.168.99.102:30838

$ curl http://192.168.99.102:30838
Kiada version 0.1. Request processed by "kiada-9d785b578-p449x"

# 워커 노드 IP를 알고 있다면 직접 접근
$ curl http://<worker-node-ip>:30838
```

```
NodePort를 통한 트래픽 흐름:

외부 클라이언트
    |
    v
워커 노드 (192.168.99.102:30838)
    |
    v
Service (kiada)  --> 로드 밸런싱
    |
    +---+---+
    v   v   v
  Pod1 Pod2 Pod3
```

## 관련 개념

- [Service](/knowledge/kubernetes/service/) - NodePort는 Service의 한 유형/메커니즘
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - NodePort를 내부적으로 사용하는 상위 Service 유형
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - NodePort에서 Pod로의 트래픽 라우팅을 담당
- [Pod](/knowledge/kubernetes/pod/) - NodePort를 통해 접근되는 최종 대상
