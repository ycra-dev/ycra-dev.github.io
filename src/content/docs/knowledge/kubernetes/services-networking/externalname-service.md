---
title: "ExternalName Service"
description: "ExternalName Service는 DNS CNAME 레코드를 생성하여, 클러스터 내부의 서비스 이름을 외부 도메인 이름으로 매핑하는 서비스 타입으로, 클러스터 IP 없이 DNS 수준에서만 동작한다"
tags: ['Kubernetes', 'Service', 'Externalname', 'DNS', 'Cname']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/externalname-service
sidebar:
  order: 8
---

## 핵심 개념

ExternalName 서비스는 `type: ExternalName`으로 설정하며, `externalName` 필드에 외부 서비스의 DNS 이름을 지정한다. 이 서비스를 DNS로 조회하면 CNAME 레코드가 반환되어 외부 도메인으로 리다이렉트된다. Endpoints나 EndpointSlice 오브젝트가 필요 없다.

주요 사용 사례:
- 외부 서비스(예: `worldtimeapi.org`)를 클러스터 내부에서 짧은 이름(`time-api`)으로 접근
- 외부 서비스를 클러스터 내부로 마이그레이션할 때 전환 단계로 활용
- 애플리케이션의 Kubernetes 의존성 제거 (실제 외부 URL 대신 서비스 이름 사용)

Headless Service와 마찬가지로 ExternalName Service에는 클러스터 IP가 할당되지 않는다. 클라이언트는 DNS를 통해 외부 서비스에 직접 연결한다.

## 예시

ExternalName Service 매니페스트:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: time-api
spec:
  type: ExternalName
  externalName: worldtimeapi.org
```

파드에서 서비스 이름으로 외부 API 접근:

```bash
kubectl exec -it kiada-001 -c kiada -- curl http://time-api/api/timezone/CET
```

DNS 조회 결과:

```bash
/ # nslookup time-api
time-api.kiada.svc.cluster.local  canonical name = worldtimeapi.org.
Name:   worldtimeapi.org
Address: 213.188.196.246
```

서비스 확인 (클러스터 IP 없음):

```bash
$ kubectl get svc time-api
NAME       TYPE           CLUSTER-IP   EXTERNAL-IP        PORT(S)
time-api   ExternalName   <none>       worldtimeapi.org   80/TCP
```

## 관련 개념

- [Service DNS Discovery](/knowledge/kubernetes/service-dns-discovery/) - ExternalName이 CNAME 레코드로 동작
- [Headless Service](/knowledge/kubernetes/headless-service/) - 클러스터 IP가 없는 또 다른 서비스 타입
- [ClusterIP Service](/knowledge/kubernetes/clusterip-service/) - 일반적인 내부 서비스 타입
- [Service](/knowledge/kubernetes/service/) - 서비스의 상위 개념
