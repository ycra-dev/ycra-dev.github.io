---
title: "서비스 디스커버리 (Service Discovery)"
description: "서비스 디스커버리(Service Discovery)는 분산 컨테이너 환경에서 단명(ephemeral)하고 동적으로 포트가 할당되는 컨테이너에 영속적이고 친숙한 서비스 이름을 매핑하는 메커니즘이다"
tags: ['Service Discovery', 'Container', 'Microservices', 'DNS', 'Networking']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/service-discovery
sidebar:
  order: 16
---

## 핵심 개념

컨테이너 환경에서 서비스 디스커버리가 특히 어려운 이유:
- 컨테이너는 본질적으로 일시적(ephemeral)이며 언제든 생성/삭제될 수 있음
- 동적 포트 할당으로 인해 주소가 자주 변경됨
- 노드 장애 시 컨테이너가 다른 노드에서 재생성되면서 IP가 변경됨
- 같은 서비스의 여러 인스턴스가 다른 노드에서 실행될 수 있음

**해결 방안 (오케스트레이션 시스템별):**
- **Kubernetes**: 서비스(Service) 객체로 변경되지 않는 주소 제공. 내장 DNS 서버로 서비스 이름 해석
- **Docker Swarm**: 내장 로드 밸런서가 컨테이너 추가/제거에 따라 자동 조정
- **Mesos/Marathon**: Marathon-lb 또는 HashiCorp Consul + HAProxy 조합
- **AWS ECS**: Application Load Balancer 서비스와 통합

서비스 디스커버리는 컨테이너 관리 시스템의 핵심 과제 중 하나이며, 마이크로서비스 아키텍처에서 더욱 중요해진다. 각 서비스가 독립적으로 배포되고 스케일링되므로, 서비스 간 통신을 위한 안정적인 엔드포인트 해석이 필수적이다.

## 예시

```bash
# Kubernetes에서 서비스 디스커버리
kubectl expose deployment web --port=80 --type=ClusterIP
# 클러스터 내부에서 "web" 서비스명으로 접근 가능
# 예: curl http://web.default.svc.cluster.local

# Docker Swarm에서 서비스 생성 (자동 디스커버리)
docker service create --name web --replicas 3 -p 80:80 nginx

# Consul을 이용한 서비스 등록/조회
curl http://localhost:8500/v1/catalog/service/web
```

## 관련 개념

- [컨테이너 오케스트레이션 (Container Orchestration)](/knowledge/linux/container-orchestration/)
- [Kubernetes (쿠버네티스)](/knowledge/linux/kubernetes/)
- [도커 (Docker)](/knowledge/linux/docker/)
- [컨테이너 (Container)](/knowledge/linux/container/)
