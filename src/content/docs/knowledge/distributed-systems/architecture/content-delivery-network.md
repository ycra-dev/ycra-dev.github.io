---
title: "Content Delivery Network"
description: "콘텐츠 전송 네트워크(CDN, Content Delivery Network)는 웹사이트의 콘텐츠를 전 세계 여러 서버에 복제하여, 사용자를 가장 가까운 서버로 투명하게 리다이렉트함으로써 성능과 의존성을 향상시키는 분산 시스템이다"
tags: ['Cdn', 'Content Distribution', 'Caching', 'Replication', 'Performance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/content-delivery-network
sidebar:
  order: 9
---

## 핵심 개념

CDN의 대표적 예인 Akamai는 2022년 기준 전 세계 400,000대 이상의 서버를 보유하고 있다. CDN의 동작 원리:

1. 실제 웹사이트의 콘텐츠를 CDN의 여러 서버에 복제하여 분산
2. 사용자가 웹사이트를 방문하면 가까운 서버로 투명하게 리다이렉트
3. 서버 선택 기준: 지연 시간, 대역폭 보장, 스트리밍 콘텐츠 성능
4. CDN이 동적으로 선택된 서버에 필요한 콘텐츠를 준비하고, 불필요한 콘텐츠를 제거

핵심 특징:
- **분산 투명성**: 사용자는 배후에서 무엇이 일어나는지 알지 못함
- **충분한 분산**: 콘텐츠가 모든 서버에 복사되지 않고, 의미 있는 곳에만 충분히 분산
- **고의존성**: 성능뿐 아니라 높은 수준의 의존성을 위해서도 콘텐츠를 여러 서버에 복제

CDN은 서버 클러스터의 형태로 구현되며, 전송 계층 스위치나 애플리케이션 계층 스위치를 사용하여 클라이언트 요청을 적절한 서버로 분배한다.

## 예시

```
# CDN 동작 흐름
사용자 → www.example.com 접속 요청
    │
    ├── DNS 해석: CDN의 가장 가까운 에지 서버 IP 반환
    │
    ├── 에지 서버에 콘텐츠가 있으면 → 즉시 반환 (캐시 히트)
    │
    └── 에지 서버에 콘텐츠가 없으면 → 원본 서버에서 가져온 후
        로컬에 캐싱하고 사용자에게 반환 (캐시 미스)

# Akamai CDN 예:
# - 전 세계 400,000+ 서버
# - 사용자는 자신이 어떤 서버에 접속했는지 모름 (위치 투명성)
# - 콘텐츠는 수요에 따라 동적으로 배치/제거됨
```

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Server Cluster](/knowledge/distributed-systems/server-cluster/)
