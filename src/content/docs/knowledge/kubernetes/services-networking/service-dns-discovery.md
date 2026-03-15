---
title: "서비스 DNS 디스커버리 (Service DNS Discovery)"
description: "Service DNS Discovery는 클러스터 내부 DNS(보통 CoreDNS)를 통해 서비스 이름을 IP 주소로 해석하는 메커니즘으로, 파드가 서비스의 클러스터 IP를 직접 알 필요 없이 이름만으로 접근할 수 있게 한다"
tags: ['Kubernetes', 'Service', 'DNS', 'Discovery', 'Coredns']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/service-dns-discovery
sidebar:
  order: 3
---

## 핵심 개념

Kubernetes 클러스터에는 일반적으로 CoreDNS(또는 kube-dns)가 내부 DNS 서버로 동작한다. 모든 파드의 `/etc/resolv.conf`에 이 DNS 서버가 nameserver로 설정되어 있다.

서비스는 다음 DNS 이름으로 해석할 수 있다:
1. `<service-name>` - 같은 네임스페이스 내에서
2. `<service-name>.<namespace>` - 다른 네임스페이스에서
3. `<service-name>.<namespace>.svc` - 보다 명시적인 형태
4. `<service-name>.<namespace>.svc.cluster.local` - FQDN

파드의 `resolv.conf`에 search 도메인이 설정되어 있어 짧은 이름으로도 서비스를 찾을 수 있다.

각 서비스는 A 레코드(IPv4) 또는 AAAA 레코드(IPv6)를 받으며, 노출하는 각 포트에 대해 SRV 레코드도 생성된다. SRV 레코드는 `_port-name._port-protocol.service-name.namespace.svc.cluster.local` 형식이다.

환경 변수를 통한 디스커버리도 가능하다. 파드가 시작될 때 같은 네임스페이스의 서비스 정보가 `<SERVICE_NAME>_SERVICE_HOST`, `<SERVICE_NAME>_SERVICE_PORT` 등의 환경 변수로 주입된다. 하지만 네임스페이스에 서비스가 너무 많으면 환경 변수 크기 제한으로 파드 시작이 실패할 수 있으므로, `enableServiceLinks: false`로 비활성화할 수 있다.

## 예시

DNS를 통한 서비스 접근:

```bash
/ # curl http://quiz                     # 같은 네임스페이스
/ # curl http://quiz.kiada               # 다른 네임스페이스에서
/ # curl http://quiz.kiada.svc.cluster.local  # FQDN
```

DNS 레코드 조회:

```bash
/ # nslookup quote
Name:   quote.kiada.svc.cluster.local
Address: 10.96.161.97

/ # nslookup -query=SRV kiada
kiada.kiada.svc.cluster.local  service = 0 50 80 kiada.kiada.svc.cluster.local.
kiada.kiada.svc.cluster.local  service = 0 50 443 kiada.kiada.svc.cluster.local.
```

파드의 resolv.conf:

```
search kiada.svc.cluster.local svc.cluster.local cluster.local localdomain
nameserver 10.96.0.10
options ndots:5
```

서비스 관련 환경 변수:

```bash
QUIZ_SERVICE_HOST=10.96.136.190
QUIZ_SERVICE_PORT=80
QUIZ_PORT=tcp://10.96.136.190:80
```

## 관련 개념

- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - DNS로 해석되는 서비스 타입
- [헤드리스 서비스 (Headless Service)](/knowledge/kubernetes/headless-service/) - 파드 IP를 직접 반환하는 특수 DNS 동작
- [서비스 (Service)](/knowledge/kubernetes/service/) - DNS 디스커버리의 기반 오브젝트
- [파드 (Pod)](/knowledge/kubernetes/pod/) - DNS를 사용하여 서비스를 찾는 주체
