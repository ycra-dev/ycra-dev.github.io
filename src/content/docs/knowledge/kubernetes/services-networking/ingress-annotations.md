---
title: "Ingress Annotations Configuration"
description: "Ingress Annotations Configuration은 Ingress 오브젝트의 표준 스펙으로 표현할 수 없는 컨트롤러별 고급 설정(세션 어피니티, URL 재작성, CORS, HTTP 인증 등)을 어노테이션을 통해 전달하는 방법이다"
tags: ['Kubernetes', 'Ingress', 'Annotations', 'Nginx', 'Configuration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-annotations
sidebar:
  order: 19
---

## 핵심 개념

Ingress 오브젝트의 `spec`에는 `defaultBackend`, `rules`, `tls`, `ingressClassName` 필드만 존재한다. 다양한 Ingress Controller 구현체의 모든 설정을 표준 스펙에 포함하는 것은 불가능하므로, 추가 설정은 어노테이션이나 커스텀 오브젝트를 통해 전달된다.

각 Ingress Controller마다 고유한 어노테이션 세트를 지원한다. 어노테이션 키에는 컨트롤러 접두사가 포함되어 다른 구현체와 충돌하지 않는다.

Nginx Ingress Controller가 지원하는 대표적 어노테이션:
- `nginx.ingress.kubernetes.io/affinity`: 세션 어피니티 (cookie)
- `nginx.ingress.kubernetes.io/session-cookie-name`: 쿠키 이름
- `nginx.ingress.kubernetes.io/ssl-passthrough`: TLS 패스스루
- URL 재작성, 리다이렉트, CORS 등 다양한 설정

GKE 같은 클라우드 환경에서는 어노테이션 대신 커스텀 오브젝트(예: `BackendConfig`)를 사용하여 설정하기도 한다. Service 오브젝트에서 `cloud.google.com/backend-config` 어노테이션으로 커스텀 오브젝트를 참조한다.

## 예시

Nginx에서 쿠키 기반 세션 어피니티 설정:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
  annotations:
    nginx.ingress.kubernetes.io/affinity: cookie
    nginx.ingress.kubernetes.io/session-cookie-name: SESSION_COOKIE
spec:
  rules:
  ...
```

쿠키 어피니티 테스트:

```bash
# 쿠키 받기
$ curl -I http://kiada.example.com --resolve kiada.example.com:80:11.22.33.44
Set-Cookie: SESSION_COOKIE=1638781091; Path=/; HttpOnly

# 쿠키로 요청 (항상 같은 파드로 전달)
$ curl -H "Cookie: SESSION_COOKIE=1638781091" http://kiada.example.com
```

GKE BackendConfig로 세션 어피니티:

```yaml
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: kiada-backend-config
spec:
  sessionAffinity:
    affinityType: GENERATED_COOKIE
```

Service에서 BackendConfig 참조:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kiada
  annotations:
    cloud.google.com/backend-config: '{"default": "kiada-backend-config"}'
```

## 관련 개념

- [Ingress](/knowledge/kubernetes/ingress/) - 어노테이션이 부착되는 오브젝트
- [Ingress Controller](/knowledge/kubernetes/ingress-controller/) - 어노테이션을 해석하고 적용하는 주체
- [Annotation](/knowledge/kubernetes/annotation/) - Kubernetes의 일반적인 어노테이션 메커니즘
- [Session Affinity](/knowledge/kubernetes/session-affinity/) - 어노테이션으로 설정하는 대표적 기능
- [IngressClass](/knowledge/kubernetes/ingressclass/) - 커스텀 파라미터를 통한 또 다른 설정 방법
