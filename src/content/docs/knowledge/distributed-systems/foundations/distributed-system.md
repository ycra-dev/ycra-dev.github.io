---
title: "분산 시스템 (Distributed System)"
description: "분산 시스템(Distributed System)은 프로세스와 자원이 여러 컴퓨터에 걸쳐 충분히(sufficiently) 분산되어 있는 네트워크 컴퓨터 시스템이다"
tags: ['Distributed Systems', 'Networked Systems', 'Decentralization']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/distributed-system
sidebar:
  order: 1
---

## 핵심 개념

분산 시스템의 핵심 철학은 "충분한 분산(sufficient spreading)"에 있다. 프로세스와 자원을 여러 컴퓨터에 분산시키는 것 자체가 목표가 되어서는 안 되며, 성능, 확장성, 신뢰성, 효율성 등의 개선을 위해 필요한 만큼만 분산해야 한다. 중앙 집중식 솔루션이 일반적으로 훨씬 단순하고 관리가 용이하기 때문에, 분산을 결정하기 전에 신중한 고려가 필요하다.

분산 시스템과 탈중앙화 시스템의 구분은 중요하다. 탈중앙화 시스템의 예로는 연합 학습(federated learning), 블록체인(blockchain), 지리적으로 분산된 모니터링 시스템 등이 있으며, 이들은 행정적 정책, 신뢰 부족, 공간적 이유 등으로 인해 반드시 분산이 필요한 경우이다.

분산 시스템의 대표적인 예로는 Google Mail(확장성과 내결함성을 위해 많은 컴퓨터에 분산), CDN(Content Delivery Network, 성능을 위해 콘텐츠를 여러 서버에 복제), NAS(Network-Attached Storage, 파일 공유를 위한 소규모 분산 시스템) 등이 있다.

## 예시

분산 시스템의 대표적인 분류:
- **고성능 분산 컴퓨팅**: 클러스터 컴퓨팅, 그리드 컴퓨팅
- **분산 정보 시스템**: 트랜잭션 처리 시스템, 엔터프라이즈 애플리케이션 통합
- **퍼베이시브 시스템**: 유비쿼터스 컴퓨팅, 모바일 컴퓨팅, 센서 네트워크

```
# 분산 시스템의 핵심 특성 (의사코드)
class DistributedSystem:
    processes = spread_across(multiple_computers)  # 충분히 분산
    goal = provide(scalability, fault_tolerance, transparency)

    # 사용자에게는 단일 시스템으로 보임
    def access(user, resource):
        server = find_nearest(resource)  # 투명하게 리다이렉션
        return server.handle(request)
```

## 관련 개념

- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
