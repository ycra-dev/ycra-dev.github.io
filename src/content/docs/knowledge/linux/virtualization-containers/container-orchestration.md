---
title: "Container Orchestration"
description: "컨테이너 오케스트레이션(Container Orchestration)은 분산 호스트 네트워크에서 대량의 컨테이너를 배포, 스케줄링, 관리하는 소프트웨어로, 서버 팜을 컴퓨트 용량의 풀로 추상화하여 컨테이너를 최적 노드에 배치한다"
tags: ['Container Orchestration', 'Scheduling', 'Cluster Management', 'Kubernetes', 'Swarm', 'Mesos']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/container-orchestration
sidebar:
  order: 14
---

## 핵심 개념

Docker 엔진은 개별 컨테이너만 관리하며, 여러 호스트에 걸친 분산 배포나 고가용성 구성을 답하지 않는다. 이를 위해 컨테이너 오케스트레이션 시스템이 필요하다.

**핵심 기능:**
- **스케줄링 알고리즘**: 작업의 요청 자원과 클러스터 활용도를 고려하여 최적 노드 선택
- **API**: 프로그램이 클러스터에 작업을 제출할 수 있는 공식 인터페이스
- **고가용성 배치**: 지리적으로 분산된 리전에 애플리케이션 배치
- **헬스 모니터링**: 비정상 작업 종료/재스케줄, 비정상 노드 회피
- **탄력적 용량 관리**: 노드 추가/제거로 용량 조절
- **로드 밸런서 통합**: 외부 클라이언트의 네트워크 트래픽 라우팅

**서비스 디스커버리(Service Discovery)**: 컨테이너는 단명(ephemeral)하고 동적 포트가 할당될 수 있어, 영속적인 서비스 이름을 다수의 컨테이너에 매핑하는 문제가 발생한다. 이것이 서비스 디스커버리 문제이며, 오케스트레이션 시스템마다 다른 해결 방안을 제공한다.

**주요 오케스트레이션 시스템:**
- **Kubernetes**: 가장 많은 기능과 활발한 커뮤니티, 높은 학습 곡선
- **Mesos/Marathon**: 범용 클러스터 매니저, 다중 프레임워크 지원
- **Docker Swarm**: Docker에 내장, 가장 쉬운 시작, TLS 기본 적용
- **AWS ECS**: AWS 관리형 서비스, 낮은 진입 장벽

## 예시

```bash
# Docker Swarm 초기화 및 서비스 배포
docker swarm init
docker service create --name web --replicas 3 -p 80:80 nginx

# Kubernetes Pod 배포 (kubectl)
kubectl run web --image=nginx --replicas=3
kubectl expose deployment web --port=80 --type=LoadBalancer
kubectl get pods
kubectl get services
```

## 관련 개념

- [Kubernetes](/knowledge/linux/kubernetes/)
- [Docker](/knowledge/linux/docker/)
- [Container](/knowledge/linux/container/)
- [Service Discovery](/knowledge/linux/service-discovery/)
