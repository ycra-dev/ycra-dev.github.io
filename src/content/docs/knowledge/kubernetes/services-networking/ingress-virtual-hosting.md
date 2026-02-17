---
title: "Ingress Virtual Hosting"
description: "Ingress Virtual Hosting은 HTTP 요청의 `Host` 헤더를 기반으로 단일 IP 주소에서 여러 도메인의 트래픽을 서로 다른 백엔드 서비스로 라우팅하는 Ingress의 핵심 기능이다"
tags: ['Kubernetes', 'Ingress', 'Virtual Hosting', 'Host Routing', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-virtual-hosting
sidebar:
  order: 16
---

## 핵심 개념

Virtual Hosting은 웹 서버에서 오래전부터 사용해온 기술로, 하나의 서버(IP)에서 여러 도메인을 호스팅하는 방식이다. Ingress는 이 원리를 활용하여 단일 공개 IP로 여러 서비스를 외부에 노출한다.

Ingress의 `rules` 배열에서 각 규칙의 `host` 필드가 가상 호스트를 정의한다. 프록시는 HTTP 요청의 `Host` 헤더 값과 규칙의 `host`를 비교하여 적절한 백엔드로 라우팅한다.

`host` 필드는 와일드카드를 지원한다. `*.example.com`은 `kiada.example.com`, `api.example.com` 등에 매칭되지만, `example.com`이나 `foo.kiada.example.com`에는 매칭되지 않는다(단일 DNS 요소만 커버). 정확한 호스트 매칭이 와일드카드보다 우선한다.

`host` 필드를 생략하면 모든 호스트에 매칭되는 규칙이 된다. 여러 Ingress 오브젝트의 규칙을 하나로 통합하면 공개 IP를 절약할 수 있다.

접근을 위해서는 DNS 서버에 도메인을 Ingress IP로 매핑하는 레코드를 추가하거나, 개발 환경에서는 `/etc/hosts` 파일을 수정하거나, `curl --resolve`를 사용해야 한다.

## 예시

여러 호스트를 하나의 Ingress에 정의:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
spec:
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
```

와일드카드 호스트 사용:

```yaml
rules:
- host: "*.example.com"
  http:
    paths:
    - path: /
      pathType: Prefix
      backend:
        service:
          name: default-app
          port:
            number: 80
```

DNS 설정 대신 /etc/hosts 사용:

```
11.22.33.44    kiada.example.com api.example.com
```

curl --resolve 사용:

```bash
curl --resolve kiada.example.com:80:11.22.33.44 http://kiada.example.com
curl --resolve api.example.com:80:11.22.33.44 http://api.example.com/quote
```

## 관련 개념

- [Ingress](/knowledge/kubernetes/ingress/) - Virtual Hosting이 구현되는 오브젝트
- [Ingress Path Routing](/knowledge/kubernetes/ingress-path-routing/) - 호스트 내에서의 경로 기반 라우팅
- [Ingress TLS](/knowledge/kubernetes/ingress-tls/) - 호스트별 TLS 인증서 설정
- [Service](/knowledge/kubernetes/service/) - 가상 호스트가 라우팅하는 대상
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - 서비스당 별도 IP가 필요한 대안
