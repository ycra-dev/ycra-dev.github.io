---
title: "사이드카 컨테이너 (Sidecar Container)"
description: "Sidecar Container는 Pod 내에서 주 컨테이너(primary container)의 기능을 보완하는 보조 컨테이너로, 오토바이의 사이드카처럼 주 프로세스와 함께 동작하면서 추가적인 기능을 제공한다"
tags: ['Kubernetes', 'Pod', 'Sidecar', 'Container Pattern', 'Design Pattern']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/sidecar-container
sidebar:
  order: 2
---

## 핵심 개념

Sidecar Container 패턴은 애플리케이션의 주요 로직을 변경하지 않고도 기능을 확장할 수 있는 강력한 디자인 패턴이다. 하나의 Pod에 여러 컨테이너를 배치하는 것은 주 프로세스와 이를 보완하는 프로세스가 있을 때에만 적절하다.

대표적인 사이드카 활용 사례:
- **리버스 프록시**: HTTPS 트래픽을 HTTP로 변환하여 주 컨테이너에 전달 (예: Envoy proxy)
- **콘텐츠 동기화**: 외부 소스에서 주기적으로 콘텐츠를 다운로드하여 웹 서버에 제공
- **로그 수집/회전**: 로그 파일을 수집하고 관리
- **데이터 처리**: 주 컨테이너의 데이터를 변환하거나 처리
- **통신 어댑터**: 프로토콜 변환이나 네트워크 관련 기능 제공

사이드카 컨테이너를 사용하면 기존 애플리케이션의 코드를 수정할 필요 없이 추가 프로세스로 기능을 확장할 수 있어, 레거시 애플리케이션에 특히 유용하다. 단, 추가 컨테이너가 Pod의 리소스 요구량을 증가시키는 점은 고려해야 한다.

## 예시

Envoy 프록시를 사이드카로 사용하여 HTTPS를 지원하는 Pod 매니페스트:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kiada-ssl
spec:
  containers:
  - name: kiada                    # 주 컨테이너
    image: luksa/kiada:0.2
    ports:
    - name: http
      containerPort: 8080
  - name: envoy                    # 사이드카 컨테이너
    image: luksa/kiada-ssl-proxy:0.1
    ports:
    - name: https
      containerPort: 8443
    - name: admin
      containerPort: 9901
```

여러 포트 포워딩으로 접근:

```bash
kubectl port-forward kiada-ssl 8080 8443 9901

# HTTP 접근
curl localhost:8080

# HTTPS 접근
curl https://localhost:8443 --insecure
```

멀티 컨테이너 Pod의 로그 확인:

```bash
# 특정 컨테이너의 로그 보기
kubectl logs kiada-ssl -c kiada
kubectl logs kiada-ssl -c envoy

# 모든 컨테이너의 로그 보기
kubectl logs kiada-ssl --all-containers
```

## 관련 개념

- [파드 (Pod)](/knowledge/kubernetes/pod/) - 사이드카 컨테이너가 배치되는 기본 단위
- [컨테이너 (Container)](/knowledge/kubernetes/container/) - 사이드카 패턴의 구성 요소
- [서비스 (Service)](/knowledge/kubernetes/service/) - Pod의 여러 포트를 외부에 노출하는 방법
- [초기화 컨테이너 (Init Container)](/knowledge/kubernetes/init-container/) - Pod 시작 시 실행되는 또 다른 보조 컨테이너 유형
