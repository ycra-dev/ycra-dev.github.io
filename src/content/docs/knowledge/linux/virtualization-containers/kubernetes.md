---
title: "Kubernetes (쿠버네티스)"
description: "Kubernetes(k8s)는 Google에서 시작되어 오픈소스로 공개된 컨테이너 관리 시스템으로, 컨테이너화된 워크로드의 배포, 스케일링, 운영을 자동화하며, 컨테이너 관리 분야의 리더로 자리잡았다"
tags: ['Kubernetes', 'K8s', 'Container Orchestration', 'Google', 'Pod', 'Cluster']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/kubernetes
sidebar:
  order: 15
---

## 핵심 개념

Kubernetes는 Google의 내부 클러스터 매니저 Borg와 동일한 개발자들이 시작했으며, 2014년 오픈소스로 공개되었다. 1,000명 이상의 활성 기여자를 보유하고 있다.

**핵심 구성 요소:**
- **API 서버**: 운영자 요청 처리
- **스케줄러**: 작업 배치
- **컨트롤러 매니저**: 클러스터 상태 추적
- **Kubelet**: 모든 클러스터 노드에서 실행되는 에이전트
- **cAdvisor**: 컨테이너 메트릭 모니터링
- **프록시**: 수신 요청을 적절한 컨테이너로 라우팅

**핵심 개념:**
- **Pod**: 하나 이상의 컨테이너 그룹. 같은 노드에 함께 배치 보장. 클러스터 전체에서 유일한 IP 할당
- **Service**: 관련 Pod의 컬렉션. 변경되지 않는 주소 보장. Pod가 죽으면 자동으로 로테이션에서 제거
- **Label**: Pod 식별 및 배치용 태그

**고급 기능:**
- 통합 서비스 디스커버리와 DNS
- 시크릿 관리
- 배포 자동화와 Pod 오토스케일링
- 플러그형 네트워크 오버레이
- 상태 보존(stateful) 애플리케이션 지원 (볼륨 마이그레이션)

Kubernetes는 가장 진보된 기능을 제공하지만 **높은 학습 곡선**을 동반하며, 프로덕션 배포에는 상당한 관리/운영 부담이 따른다.

## 예시

```bash
# kubectl 기본 명령
kubectl get pods              # Pod 목록
kubectl get services          # 서비스 목록
kubectl get deployments       # 디플로이먼트 목록

# 디플로이먼트 생성
kubectl create deployment web --image=nginx --replicas=3

# 서비스 노출
kubectl expose deployment web --port=80 --type=LoadBalancer

# Pod 스케일링
kubectl scale deployment web --replicas=5

# Pod 로그 확인
kubectl logs pod-name

# Pod에 셸 접속
kubectl exec -it pod-name -- /bin/bash
```

## 관련 개념

- [컨테이너 오케스트레이션 (Container Orchestration)](/knowledge/linux/container-orchestration/)
- [컨테이너 (Container)](/knowledge/linux/container/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [서비스 디스커버리 (Service Discovery)](/knowledge/linux/service-discovery/)
