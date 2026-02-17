---
title: "Ingress Controller"
description: "Ingress Controller는 Kubernetes API를 감시하여 Ingress, Service, Endpoints 오브젝트의 변경을 감지하고, 이를 기반으로 L7 로드 밸런서(리버스 프록시)를 프로비저닝하고 설정하는 클러스터 애드온 컴포넌트이다"
tags: ['Kubernetes', 'Ingress Controller', 'Nginx', 'Reverse Proxy', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingress-controller
sidebar:
  order: 13
---

## 핵심 개념

Kubernetes 클러스터에 Ingress 기능은 기본으로 제공되지 않는다. Ingress Controller를 별도로 설치해야 하며, 다양한 구현체가 있다: Nginx Ingress Controller, AWS Load Balancer Controller, GKE GLBC, Traefik, Ambassador, Contour 등.

Ingress Controller의 동작 방식:
1. Kubernetes API에 연결하여 Ingress, Service, Endpoints/EndpointSlice 오브젝트를 감시
2. Ingress 오브젝트 생성 시 리버스 프록시를 프로비저닝하고 설정
3. 가상 호스트와 엔드포인트 IP 목록을 프록시 설정에 반영
4. 프록시를 외부에서 접근 가능하게 함(보통 LoadBalancer 서비스 생성)
5. Ingress/Service 변경 시 프록시 설정 업데이트
6. Ingress 삭제 시 프록시 및 관련 리소스 정리

보통 컨트롤러와 프록시가 같은 파드에서 실행되지만, GKE처럼 클라우드 프로바이더의 로드 밸런서를 외부에서 관리하는 경우도 있다.

Nginx Ingress Controller는 두 가지 구현이 있다: Kubernetes 커뮤니티 버전(`k8s.io/ingress-nginx`)과 Nginx 공식 버전. 초보자에게는 전자가 권장된다.

## 예시

Nginx Ingress Controller 설치 (kind 클러스터):

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

Minikube에서 설치:

```bash
minikube addons enable ingress
```

컨트롤러가 Ingress를 처리하는 것을 이벤트로 확인:

```bash
$ kubectl describe ing kiada
Events:
  Type    Reason  Age   From                      Message
  Normal  Sync    5m    nginx-ingress-controller  Scheduled for sync
```

## 관련 개념

- [Ingress](/knowledge/kubernetes/ingress/) - Controller가 처리하는 API 오브젝트
- [IngressClass](/knowledge/kubernetes/ingressclass/) - 어떤 Controller가 Ingress를 처리할지 결정
- [Controller](/knowledge/kubernetes/controller/) - Kubernetes의 일반적인 컨트롤러 패턴
- [LoadBalancer Service](/knowledge/kubernetes/loadbalancer-service/) - 프록시를 외부에 노출하는 방법
- [Service](/knowledge/kubernetes/service/) - Controller가 참조하는 백엔드 정보
