---
title: "인그레스클래스 (IngressClass)"
description: "IngressClass는 Ingress 오브젝트가 어떤 Ingress Controller에 의해 처리되어야 하는지를 지정하는 Kubernetes API 오브젝트로, 클러스터에 여러 Ingress Controller가 설치된 경우 라우팅을 분류하는 데 사용된다"
tags: ['Kubernetes', 'Ingressclass', 'Ingress Controller', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/ingressclass
sidebar:
  order: 14
---

## 핵심 개념

하나의 Kubernetes 클러스터에 여러 Ingress Controller(Nginx, Traefik, AWS ALB 등)가 동시에 설치될 수 있다. 이때 각 Ingress 오브젝트가 어떤 Controller에 의해 처리되어야 하는지를 IngressClass로 지정한다.

IngressClass 오브젝트에는 두 가지 핵심 정보가 있다:
1. `spec.controller`: 이 클래스를 처리하는 Controller의 이름 (예: `k8s.io/ingress-nginx`)
2. `spec.parameters`: Controller에 전달할 추가 설정을 담은 커스텀 오브젝트 참조 (선택)

Ingress 오브젝트에서 `spec.ingressClassName` 필드로 IngressClass를 지정한다. 지정하지 않으면 `ingressclass.kubernetes.io/is-default-class: "true"` 어노테이션이 있는 기본 IngressClass가 사용된다.

이전에는 `kubernetes.io/ingress.class` 어노테이션이 사용되었지만 현재는 폐지되었으며, `ingressClassName` 필드가 권장된다.

IngressClass의 `parameters`를 통해 같은 Controller라도 다른 설정(flavor)을 적용할 수 있다. 예를 들어 AWS의 `IngressClassParams` 오브젝트로 로드 밸런서의 scheme이나 IP 주소 타입을 설정할 수 있다.

## 예시

IngressClass 조회:

```bash
$ kubectl get ingressclasses
NAME    CONTROLLER             PARAMETERS   AGE
nginx   k8s.io/ingress-nginx   <none>       10h
```

IngressClass YAML:

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: nginx
spec:
  controller: k8s.io/ingress-nginx
```

Ingress에서 IngressClass 지정:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kiada
spec:
  ingressClassName: nginx
  rules:
  ...
```

파라미터 참조가 있는 IngressClass (AWS):

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: custom-ingress-class
spec:
  controller: ingress.k8s.aws/alb
  parameters:
    apiGroup: elbv2.k8s.aws
    kind: IngressClassParams
    name: custom-ingress-params
```

## 관련 개념

- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - IngressClass를 참조하는 오브젝트
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - IngressClass가 지정하는 대상
- [어노테이션 (Annotation)](/knowledge/kubernetes/annotation/) - 폐지된 이전 방식의 Controller 지정 방법
