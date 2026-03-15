---
title: "kubectl port-forward"
description: "`kubectl port-forward`는 로컬 컴퓨터의 네트워크 포트를 특정 Pod의 포트로 프록시 연결하여, 개발 및 디버깅 시 Pod 내 애플리케이션과 직접 통신할 수 있게 해주는 명령어이다"
tags: ['Kubernetes', 'Kubectl', 'Networking', 'Debugging', 'Development']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/kubectl-port-forward
sidebar:
  order: 11
---

## 핵심 개념

개발 중에 Pod 내 애플리케이션과 통신하는 가장 간편한 방법이다. Pod의 IP 주소를 조회할 필요 없이 Pod 이름과 포트만으로 통신 경로를 설정할 수 있다.

통신 경로는 다음과 같이 구성된다:
`curl` -> `kubectl proxy` -> `API Server` -> `Kubelet (노드)` -> `Container (Pod의 loopback device)`

이 경로가 상당히 길기 때문에 경로의 어떤 구성 요소라도 문제가 있으면 Pod와 통신할 수 없다. 따라서 port-forward가 실패한다고 해서 반드시 Pod 자체에 문제가 있는 것은 아니다.

주의 사항:
- 컨테이너 내 애플리케이션이 loopback device(localhost)에 바인딩되어 있어야 Kubelet이 접근 가능
- Pod의 eth0 네트워크 인터페이스에만 리스닝하면 port-forward로 접근 불가
- Service에 대해서도 port-forward 사용 가능

## 예시

기본 사용법:

```bash
# 로컬 포트 8080을 Pod의 포트 8080으로 포워딩
kubectl port-forward kiada 8080

# 다른 터미널에서 접근
curl localhost:8080
```

로컬 포트와 Pod 포트가 다른 경우:

```bash
# 로컬 포트 8888을 Pod의 포트 8080으로 포워딩
kubectl port-forward kiada-stdin 8888:8080
```

여러 포트 동시 포워딩:

```bash
# 세 개의 포트를 동시에 포워딩
kubectl port-forward kiada-ssl 8080 8443 9901
```

권한 문제 해결 (포트 1023 이하):

```bash
# 낮은 포트를 사용해야 할 경우 높은 로컬 포트 번호 사용
kubectl port-forward quote-poststart 1080:80
```

## 관련 개념

- [kubectl](/knowledge/kubernetes/kubectl/) - port-forward가 속한 CLI 도구
- [파드 (Pod)](/knowledge/kubernetes/pod/) - 포트 포워딩의 대상이 되는 리소스
- [서비스 (Service)](/knowledge/kubernetes/service/) - 프로덕션 환경에서의 Pod 접근 방법
- [쿠버네티스 API 서버 (Kubernetes API Server)](/knowledge/kubernetes/api-server/) - 포트 포워딩 통신 경로의 중간 구성 요소
- [Kubelet](/knowledge/kubernetes/kubelet/) - 노드에서 Pod로의 연결을 중계하는 에이전트
- [파드 네트워킹 (Pod Networking)](/knowledge/kubernetes/pod-networking/) - Pod의 네트워크 통신 구조
