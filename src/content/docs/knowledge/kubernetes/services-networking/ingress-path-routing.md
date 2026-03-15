---
title: "인그레스 경로 라우팅 (Ingress Path Routing)"
description: "Ingress Path Routing은 HTTP 요청의 URL 경로를 기준으로 서로 다른 백엔드 서비스로 트래픽을 라우팅하는 Ingress 규칙으로, `Exact`, `Prefix`, `ImplementationSpecific` 세 가지 경로 매칭 타입을 지원한다"
tags: ['Kubernetes', 'Ingress', 'Routing', 'Path Matching', 'HTTP']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-path-routing
sidebar:
  order: 15
---

## 핵심 개념

Ingress 규칙의 `paths` 배열에 여러 경로를 정의하여 하나의 호스트에서 URL 경로에 따라 다른 서비스로 트래픽을 분배할 수 있다. 각 경로에는 `pathType` 필드로 매칭 방식을 지정한다.

**Exact**: 요청 경로가 규칙의 경로와 정확히 일치해야 한다. 대소문자 구분하며, `/foo`와 `/foo/`는 다른 경로로 취급된다.

**Prefix**: 경로 요소(element) 단위로 접두사 매칭한다. 중요한 점은 단순 문자열 접두사가 아니라 `/`로 분리된 요소 단위로 비교한다는 것이다. 규칙 경로 `/foo`는 요청 `/foo/bar`에 매칭되지만, `/foobar`에는 매칭되지 않는다. 후행 슬래시 유무는 영향을 미치지 않는다.

**ImplementationSpecific**: 매칭 방식이 Ingress Controller 구현에 따라 달라진다. GKE에서는 와일드카드(`/foo/*`) 사용이 가능하다.

여러 경로가 매칭되면 `Exact` 타입이 `Prefix`보다 우선한다. 기본적으로 URL 재작성(rewrite)은 수행되지 않지만, 일부 Ingress 구현에서 어노테이션으로 설정할 수 있다.

## 예시

경로 기반 라우팅:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-example-com
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /quote
        pathType: Exact
        backend:
          service:
            name: quote
            port:
              name: http
      - path: /questions
        pathType: Prefix
        backend:
          service:
            name: quiz
            port:
              name: http
```

Prefix 매칭 예시:
- 규칙 `/foo` --> `/foo` (매칭), `/foo/bar` (매칭), `/foobar` (불일치)
- 규칙 `/` --> 모든 경로에 매칭

접근:

```bash
curl --resolve api.example.com:80:11.22.33.44 api.example.com/quote
curl --resolve api.example.com:80:11.22.33.44 api.example.com/questions/random
```

## 관련 개념

- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - 경로 라우팅이 정의되는 오브젝트
- [서비스 (Service)](/knowledge/kubernetes/service/) - 라우팅의 대상 백엔드
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - 라우팅 규칙을 프록시에 적용
- [인그레스 TLS (Ingress TLS)](/knowledge/kubernetes/ingress-tls/) - HTTPS와 함께 사용되는 경로 라우팅
