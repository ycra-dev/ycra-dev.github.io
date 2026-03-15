---
title: "인그레스 (Ingress)"
description: "Ingress는 클러스터 외부에서 내부 서비스로의 HTTP/HTTPS 트래픽을 관리하는 Kubernetes API 오브젝트로, 호스트 이름과 URL 경로 기반의 라우팅 규칙을 정의하여 단일 IP로 여러 서비스를 노출할 수 있다"
tags: ['Kubernetes', 'Ingress', 'Networking', 'L7 Routing', 'Reverse Proxy']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress
sidebar:
  order: 12
---

## 핵심 개념

Ingress는 세 가지 구성 요소로 이루어진다:
1. **Ingress API 오브젝트**: 라우팅 규칙을 정의하는 선언적 설정
2. **Ingress Controller**: Kubernetes API를 감시하고 프록시를 설정/관리하는 컨트롤러
3. **L7 로드 밸런서/리버스 프록시**: 실제 트래픽을 처리하는 프록시(Nginx, HAProxy, Envoy 등)

LoadBalancer 서비스가 각 서비스마다 별도의 공개 IP가 필요한 것과 달리, Ingress는 단일 IP로 여러 서비스를 노출할 수 있다. 또한 L7(애플리케이션 계층)에서 동작하므로 HTTP 인증, 쿠키 기반 세션 어피니티, URL 재작성, TLS 종료 등 L4 서비스에서 제공할 수 없는 기능을 지원한다.

프록시는 일반적으로 서비스 IP가 아닌 파드 IP로 직접 트래픽을 전달한다. Ingress, Service, EndpointSlice 오브젝트의 정보를 조합하여 파드를 결정한다.

Ingress는 `rules` 배열에 호스트와 경로 기반의 라우팅 규칙을 정의한다. 규칙에 매칭되지 않는 요청은 `defaultBackend`으로 전달된다.

## 예시

기본 Ingress 매니페스트:

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
              number: 80
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

Ingress 조회 및 IP 확인:

```bash
$ kubectl get ingresses
NAME    CLASS   HOSTS               ADDRESS       PORTS   AGE
kiada   nginx   kiada.example.com   11.22.33.44   80      30s
```

curl로 접근 (--resolve로 DNS 우회):

```bash
curl --resolve kiada.example.com:80:11.22.33.44 http://kiada.example.com
```

## 관련 개념

- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - Ingress 오브젝트를 실현하는 컨트롤러
- [인그레스 TLS (Ingress TLS)](/knowledge/kubernetes/ingress-tls/) - HTTPS 지원 설정
- [인그레스클래스 (IngressClass)](/knowledge/kubernetes/ingressclass/) - 어떤 컨트롤러가 처리할지 지정
- [로드밸런서 서비스 (LoadBalancer Service)](/knowledge/kubernetes/loadbalancer-service/) - L4 수준의 외부 노출 대안
- [서비스 (Service)](/knowledge/kubernetes/service/) - Ingress가 라우팅하는 대상
- [어노테이션 (Annotation)](/knowledge/kubernetes/annotation/) - 컨트롤러별 추가 설정 전달 방법
