---
title: "Kube Proxy"
description: "Kube Proxy(Kubernetes Service Proxy)는 각 워커 노드에서 실행되는 컴포넌트로, 애플리케이션 인스턴스 간의 네트워크 트래픽을 로드 밸런싱하는 역할을 담당한다"
tags: ['Kubernetes', 'Kube Proxy', 'Networking', 'Load Balancing', 'Service']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kube-proxy
sidebar:
  order: 10
---

## 핵심 개념

Kube Proxy는 Kubernetes Service 객체가 제대로 동작할 수 있도록 네트워크 규칙을 설정하는 역할을 한다.

주요 역할:
- 애플리케이션 인스턴스가 클라이언트의 연결을 수락할 준비가 되었음을 감지
- Service에 대한 로드 밸런서 설정
- 외부 및 내부 트래픽이 적절한 Pod로 라우팅되도록 네트워크 규칙 구성

이름은 "Proxy"이지만, 현재 버전에서는 트래픽이 실제로 Kube Proxy를 통과하지는 않는다. 초기에는 실제로 프록시 역할을 했지만, 이후 iptables나 IPVS와 같은 커널 레벨의 네트워크 규칙을 설정하는 방식으로 변경되었다.

Service의 로드 밸런싱 동작:
1. Kube Proxy가 Pod가 준비되었음을 감지
2. 해당 Service에 대한 네트워크 규칙(iptables/IPVS) 설정
3. 클라이언트 요청이 Service IP로 들어오면 규칙에 따라 적절한 Pod로 분산

## 예시

```
트래픽 흐름:

외부 요청 --> Load Balancer --> Node Port (30838)
                                    |
                                Kube Proxy가 설정한 규칙
                                    |
                        +-----+-----+-----+
                        |           |           |
                     Pod A       Pod B       Pod C
```

```bash
# Service를 통한 로드 밸런싱 확인
$ curl 35.246.179.22:8080
Kiada version 0.1. Request processed by "kiada-9d785b578-58vhc"
$ curl 35.246.179.22:8080
Kiada version 0.1. Request processed by "kiada-9d785b578-p449x"
$ curl 35.246.179.22:8080
Kiada version 0.1. Request processed by "kiada-9d785b578-jmnj8"
# 매 요청마다 다른 Pod가 응답 - Kube Proxy에 의한 로드 밸런싱
```

## 관련 개념

- [워크로드 플레인 (Workload Plane)](/knowledge/kubernetes/workload-plane/) - Kube Proxy가 실행되는 워커 노드 영역
- [서비스 (Service)](/knowledge/kubernetes/service/) - Kube Proxy가 로드 밸런싱을 설정하는 대상 객체
- [로드밸런서 서비스 (LoadBalancer Service)](/knowledge/kubernetes/loadbalancer-service/) - 외부 로드 밸런서를 프로비저닝하는 서비스 타입
- [노드포트 서비스 (NodePort Service)](/knowledge/kubernetes/nodeport-service/) - 외부 트래픽이 노드로 들어오는 포트
- [Kubelet](/knowledge/kubernetes/kubelet/) - 같은 워커 노드에서 함께 실행되는 에이전트
