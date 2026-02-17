---
title: "External Traffic Policy"
description: "External Traffic Policy는 NodePort나 LoadBalancer 서비스에서 외부 트래픽이 도착했을 때 해당 노드의 로컬 파드로만 전달할지(Local), 클러스터 전체의 파드로 전달할지(Cluster)를 결정하는 서비스 설정이다"
tags: ['Kubernetes', 'Service', 'Traffic Policy', 'Networking', 'Source IP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/external-traffic-policy
sidebar:
  order: 10
---

## 핵심 개념

기본값은 `Cluster`로, 모든 노드가 수신한 트래픽을 클러스터 전체의 파드에 고르게 분배한다. 하지만 이 경우 두 가지 문제가 있다:

1. **추가 네트워크 홉**: 연결을 받은 노드에 해당 파드가 없으면 다른 노드로 전달해야 하므로 지연이 증가한다.
2. **소스 IP 변환**: 다른 노드로 전달할 때 반환 패킷이 원래 노드로 돌아오도록 소스 IP를 노드 IP로 변경(SNAT)한다. 따라서 애플리케이션은 실제 클라이언트 IP를 볼 수 없다.

`externalTrafficPolicy: Local`로 설정하면 노드는 로컬 파드로만 트래픽을 전달하여 두 문제를 해결한다. 그러나 단점도 있다:

- 로컬 파드가 없는 노드로의 연결은 실패한다 (`healthCheckNodePort`로 로드 밸런서가 파드 있는 노드만 사용하도록 설정 가능)
- 트래픽 분배가 불균등해진다 (파드 1개인 노드와 2개인 노드가 동일한 트래픽을 받으면, 1개인 노드의 파드가 2배의 트래픽 처리)

어떤 정책을 선택할지는 클라이언트 IP 보존, 지연 시간, 트래픽 균등 분배 중 무엇이 더 중요한지에 따라 결정된다.

## 예시

Cluster 정책 (기본): 노드 A가 트래픽을 받아도 노드 B의 파드로 전달 가능

```yaml
spec:
  type: LoadBalancer
  externalTrafficPolicy: Cluster  # 기본값
```

Local 정책: 노드 A가 받은 트래픽은 노드 A의 파드로만 전달

```yaml
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
```

비교:
- Cluster: 트래픽 균등 분배, 추가 홉 발생, 소스 IP 변경
- Local: 불균등 분배 가능, 추가 홉 없음, 소스 IP 보존

## 관련 개념

- [NodePort Service](/knowledge/kubernetes/nodeport-service/) - External Traffic Policy가 적용되는 서비스 타입
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - External Traffic Policy가 적용되는 서비스 타입
- [Service](/knowledge/kubernetes/service/) - 서비스의 상위 개념
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 트래픽 정책을 실제로 적용하는 컴포넌트
