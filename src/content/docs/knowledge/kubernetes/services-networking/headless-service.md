---
title: "Headless Service"
description: "Headless Service는 `clusterIP: None`으로 설정하여 클러스터 IP를 할당받지 않고, DNS 조회 시 서비스 IP 대신 백엔드 파드들의 개별 IP를 직접 반환하는 특수한 서비스 타입이다"
tags: ['Kubernetes', 'Service', 'Headless', 'DNS', 'Direct Connection']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/headless-service
sidebar:
  order: 7
---

## 핵심 개념

일반 서비스에서는 DNS 조회 시 서비스의 클러스터 IP 하나만 반환되고, 이 IP로의 연결이 무작위 파드로 전달된다. 하지만 클라이언트가 직접 특정 파드에 연결하거나, 모든 파드의 IP를 알아야 하거나, 클라이언트 측에서 로드 밸런싱을 수행하고 싶은 경우에는 Headless Service가 필요하다.

Headless Service를 DNS로 조회하면 서비스에 매칭되는 모든 파드의 A(또는 AAAA) 레코드가 반환된다. 클라이언트는 이 IP 목록에서 원하는 파드에 직접 연결할 수 있다. DNS 서버가 반환하는 IP 목록의 순서를 매번 회전시키므로, `curl`처럼 DNS 결과의 첫 번째 IP에 연결하는 단순한 클라이언트도 자연스럽게 로드 밸런싱 효과를 얻는다.

Headless Service는 StatefulSet과 함께 많이 사용된다. StatefulSet의 각 파드가 고유한 네트워크 ID를 가져야 할 때, Headless Service를 통해 개별 파드에 대한 DNS 레코드를 생성할 수 있다.

레이블 셀렉터 없이 수동으로 엔드포인트를 관리하는 서비스도 headless로 만들 수 있다.

## 예시

Headless Service 매니페스트:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: quote-headless
spec:
  clusterIP: None
  selector:
    app: quote
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
```

클러스터 IP 없음 확인:

```bash
$ kubectl get svc quote-headless -o wide
NAME             TYPE        CLUSTER-IP   PORT(S)
quote-headless   ClusterIP   None         80/TCP
```

DNS 조회 시 파드 IP 직접 반환:

```bash
/ # nslookup quote-headless
Name:   quote-headless.kiada.svc.cluster.local
Address: 10.244.2.9
Name:   quote-headless.kiada.svc.cluster.local
Address: 10.244.2.8
Name:   quote-headless.kiada.svc.cluster.local
Address: 10.244.2.10
Name:   quote-headless.kiada.svc.cluster.local
Address: 10.244.1.10
```

직접 파드 IP로 연결되는 것 확인:

```bash
/ # curl --verbose http://quote-headless
*   Trying 10.244.1.10:80...     # 파드 IP에 직접 연결
```

## 관련 개념

- [ClusterIP Service](/knowledge/kubernetes/clusterip-service/) - Headless의 반대 개념 (클러스터 IP 할당)
- [Service DNS Discovery](/knowledge/kubernetes/service-dns-discovery/) - Headless에서 DNS 동작이 다름
- [StatefulSet](/knowledge/kubernetes/statefulset/) - Headless Service와 함께 사용되는 대표적 워크로드
- [Endpoints Object](/knowledge/kubernetes/endpoints-object/) - Headless Service에서도 관리되는 엔드포인트
