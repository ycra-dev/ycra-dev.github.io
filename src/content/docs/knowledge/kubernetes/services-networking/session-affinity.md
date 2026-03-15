---
title: "세션 어피니티 (Session Affinity)"
description: "Session Affinity는 Kubernetes 서비스에서 동일한 클라이언트의 연속적인 연결을 동일한 백엔드 파드로 전달하는 메커니즘으로, 서비스 수준에서는 `ClientIP` 기반만 지원하고, Ingress 수준에서는 쿠키 기반도 지원한다"
tags: ['Kubernetes', 'Service', 'Session Affinity', 'Load Balancing', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/session-affinity
sidebar:
  order: 11
---

## 핵심 개념

기본적으로 Kubernetes 서비스는 각 연결을 무작위 파드로 전달한다(`sessionAffinity: None`). 하지만 특정 시나리오에서는 같은 클라이언트의 요청이 항상 같은 파드로 전달되어야 한다.

서비스의 `spec.sessionAffinity`를 `ClientIP`로 설정하면 동일한 클라이언트 IP에서 오는 모든 연결이 같은 파드로 전달된다. `spec.sessionAffinityConfig.clientIP.timeoutSeconds`로 세션 유지 시간을 설정할 수 있다(기본 3시간).

Kubernetes 서비스는 OSI 모델의 4계층(전송 계층: TCP/UDP)에서 동작하므로 HTTP 쿠키를 이해할 수 없다. 따라서 쿠키 기반 세션 어피니티는 서비스 수준에서 지원되지 않는다. 쿠키 기반 어피니티가 필요하면 7계층(애플리케이션 계층)에서 동작하는 Ingress를 사용해야 한다.

## 예시

클라이언트 IP 기반 세션 어피니티 설정:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kiada
spec:
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800  # 3시간
  selector:
    app: kiada
  ports:
  - port: 80
    targetPort: 8080
```

쿠키 기반 세션 어피니티 (Nginx Ingress 사용):

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
  annotations:
    nginx.ingress.kubernetes.io/affinity: cookie
    nginx.ingress.kubernetes.io/session-cookie-name: SESSION_COOKIE
```

## 관련 개념

- [서비스 (Service)](/knowledge/kubernetes/service/) - 세션 어피니티가 설정되는 오브젝트
- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - 기본 서비스에서의 어피니티 동작
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - 쿠키 기반 어피니티를 제공
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - 세션 어피니티를 실제로 적용하는 컴포넌트
