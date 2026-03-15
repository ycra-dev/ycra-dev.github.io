---
title: "인그레스 기본 백엔드 (Ingress Default Backend)"
description: "Ingress Default Backend은 Ingress의 어떤 규칙에도 매칭되지 않는 요청을 처리하는 폴백(fallback) 서비스로, `spec"
tags: ['Kubernetes', 'Ingress', 'Default Backend', 'Routing', 'Fallback']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-default-backend
sidebar:
  order: 18
---

## 핵심 개념

Ingress 오브젝트에 정의된 규칙에 매칭되지 않는 요청이 들어올 경우, 기본적으로 `404 Not Found` 응답을 반환한다. Default Backend을 설정하면 이러한 요청을 별도의 서비스로 전달할 수 있다.

Default Backend의 사용 사례:
- 커스텀 404 에러 페이지 제공
- 모든 트래픽을 기본 서비스로 전달하는 catch-all 규칙
- 규칙 없이 Default Backend만 설정하여 모든 트래픽을 단일 서비스로 전달 (LoadBalancer 서비스 대신 Ingress의 HTTP 기능을 활용하고 싶을 때)

Default Backend은 `rules`의 개별 백엔드와 동일한 구문으로 `service.name`과 `service.port`를 지정한다.

## 예시

Default Backend이 있는 Ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
spec:
  defaultBackend:
    service:
      name: fun404
      port:
        name: http
  rules:
  - host: kiada.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kiada
            port:
              name: http
```

커스텀 404 서비스 파드:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: fun404
  labels:
    app: fun404
spec:
  containers:
  - name: server
    image: luksa/static-http-server
    args:
    - --listen-port=8080
    - --response-code=404
    - --text=This isn't the URL you're looking for.
```

매칭되지 않는 요청 테스트:

```bash
$ curl api.example.com/unknown-path --resolve api.example.com:80:11.22.33.44
This isn't the URL you're looking for.
```

## 관련 개념

- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - Default Backend이 설정되는 오브젝트
- [인그레스 경로 라우팅 (Ingress Path Routing)](/knowledge/kubernetes/ingress-path-routing/) - 규칙에 매칭되지 않을 때 Default Backend 사용
- [서비스 (Service)](/knowledge/kubernetes/service/) - Default Backend의 대상
