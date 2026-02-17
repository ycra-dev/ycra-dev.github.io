---
title: "Endpoints Object"
description: "Endpoints 오브젝트는 서비스의 백엔드 파드 IP와 포트 목록을 저장하는 Kubernetes API 오브젝트로, 서비스와 동일한 이름을 가지며 레이블 셀렉터에 매칭되는 파드가 변경될 때 자동으로 업데이트된다"
tags: ['Kubernetes', 'Endpoints', 'Endpointslice', 'Service', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/endpoints-object
sidebar:
  order: 9
---

## 핵심 개념

Service 오브젝트 자체에는 백엔드 파드의 목록이 포함되어 있지 않다. 대신 Kubernetes는 서비스와 같은 이름의 Endpoints 오브젝트를 자동으로 생성하고 관리한다. 이 오브젝트에는 서비스의 레이블 셀렉터에 매칭되는 파드들의 IP 주소와 포트가 `subsets` 배열에 기록된다.

파드가 생성되거나 삭제되면 Kubernetes가 Endpoints 오브젝트를 자동으로 업데이트한다. 파드의 레디니스 프로브가 실패하면 `addresses`가 아닌 `notReadyAddresses`에 기록되어 트래픽을 받지 않는다.

대규모 서비스의 경우 Endpoints 오브젝트가 너무 커질 수 있어, **EndpointSlice** 오브젝트가 도입되었다. EndpointSlice는 엔드포인트를 여러 슬라이스로 분할하며(기본 100개, 최대 1000개), 변경 시 전체가 아닌 해당 슬라이스만 전파하여 성능을 개선한다.

서비스에 레이블 셀렉터가 없으면 Endpoints 오브젝트가 자동 생성되지 않으며, 사용자가 직접 생성하여 외부 엔드포인트를 서비스로 노출할 수 있다.

## 예시

Endpoints 오브젝트 조회:

```bash
$ kubectl get endpoints
NAME    ENDPOINTS                                                     AGE
kiada   10.244.1.7:8443,10.244.1.8:8443,10.244.1.9:8443 + 5 more...   25m
quiz    10.244.1.11:8080                                              66m
quote   10.244.1.10:80,10.244.2.10:80,10.244.2.8:80 + 1 more...       66m
```

수동 Endpoints 오브젝트 생성 (외부 서비스):

```yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: external-service
subsets:
- addresses:
  - ip: 1.1.1.1
  - ip: 2.2.2.2
  ports:
  - name: http
    port: 88
```

EndpointSlice 조회:

```bash
$ kubectl get endpointslices -l kubernetes.io/service-name=kiada
NAME          ADDRESSTYPE   PORTS       ENDPOINTS
kiada-m24zq   IPv4          8080,8443   10.244.1.7,10.244.1.8,...
```

## 관련 개념

- [Service](/knowledge/kubernetes/service/) - Endpoints 오브젝트가 연결되는 서비스
- [Readiness Probe](/knowledge/kubernetes/readiness-probe/) - 프로브 결과에 따라 엔드포인트 포함 여부 결정
- [Label Selector](/knowledge/kubernetes/label-selector/) - 서비스의 셀렉터가 엔드포인트를 결정
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - Endpoints 변경을 감지하여 네트워크 규칙 업데이트
