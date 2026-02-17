---
title: "Scalability"
description: "확장성(Scalability)은 시스템의 크기, 지리적 범위, 또는 관리 도메인이 증가하더라도 성능 저하 없이 시스템이 작동할 수 있는 능력을 의미하는 분산 시스템의 핵심 설계 목표이다"
tags: ['Scalability', 'Distributed Systems', 'Design Goals', 'Performance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/scalability
sidebar:
  order: 4
---

## 핵심 개념

확장성은 세 가지 차원에서 측정된다:

1. **크기 확장성(Size Scalability)**: 사용자와 자원을 추가해도 눈에 띄는 성능 저하가 없는 것. 중앙 집중식 서비스의 병목은 연산 용량(CPU), 저장 용량(I/O 전송률), 네트워크 대역폭의 세 가지에서 발생할 수 있다.

2. **지리적 확장성(Geographical Scalability)**: 사용자와 자원이 멀리 떨어져 있어도 통신 지연이 거의 느껴지지 않는 것. 광역 네트워크에서 동기식 통신은 수백 밀리초의 지연을 초래할 수 있어 문제가 된다.

3. **관리적 확장성(Administrative Scalability)**: 여러 독립적인 관리 조직에 걸쳐 있어도 쉽게 관리할 수 있는 것. 자원 사용 정책, 관리, 보안에 관한 충돌이 주요 과제이다.

확장 기법(Scaling Techniques)은 크게 세 가지가 있다:
- **통신 지연 숨기기**: 비동기 통신 사용, 클라이언트 측으로 계산 이동 (예: JavaScript로 폼 검증)
- **분할 및 분산(Partitioning)**: 컴포넌트를 작은 부분으로 나누어 시스템 전체에 분산 (예: DNS)
- **복제/캐싱(Replication/Caching)**: 자원의 복사본을 만들어 가용성과 성능 향상. 단, 일관성 문제 발생

큐잉 이론에 의하면, 서비스 이용률 U가 1에 가까워질수록 응답 시간은 R/S = 1/(1-U)로 급격히 증가한다.

## 예시

```python
# DNS의 분할 및 분산 예시
# DNS 이름 공간은 계층적으로 조직되어 비중첩 존(zone)으로 분할됨
# "flits.cs.vu.nl" 이름 해석 과정:
# 1. Zone Z1 서버에 질의 → Z2 서버 주소 반환
# 2. Zone Z2 서버에 질의 → Z3 서버 주소 반환
# 3. Zone Z3 서버에 질의 → 호스트 주소 반환

# 통신 지연 숨기기: 클라이언트 측 폼 검증
# 나쁜 방식: 각 필드마다 서버에 별도 메시지 전송하여 확인
# 좋은 방식: 폼 검증 코드를 클라이언트에 전달하여 완성된 폼만 서버로 전송
```

큐잉 모델: 서비스 이용률이 낮으면(U ≈ 0) 요청이 거의 즉시 처리되지만, U → 1이면 시스템이 거의 정지 상태에 이른다.

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
- [Replication](/knowledge/distributed-systems/replication/)
- [Content Delivery Network](/knowledge/distributed-systems/content-delivery-network/)
- [Cloud Computing](/knowledge/distributed-systems/cloud-computing/)
