---
title: "Replica Management"
description: "복제본 관리(Replica Management)는 복제 서버의 배치, 콘텐츠의 복제 및 분배, 그리고 복제본 간의 일관성 유지를 다루는 분산 시스템의 핵심 영역이다"
tags: ['Replica Management', 'Replication', 'Content Distribution', 'Consistency Protocol']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/replica-management
sidebar:
  order: 6
---

## 핵심 개념

**복제의 이유**: (1) 신뢰성 향상 - 하나의 복제본 장애 시 다른 복제본으로 전환, (2) 성능 향상 - 데이터를 사용자 근처에 배치하여 접근 시간 감소.

**복제의 비용**: 모든 복제본을 일관되게 유지하는 것이 확장성 문제를 야기. 강한 일관성(동기 복제)은 글로벌 동기화가 필요하여 성능 저하. 해결: 일관성 제약을 완화.

**업데이트 전파 방식**:
- **상태 전파(State propagation)**: 수정된 데이터 자체를 전송. 읽기/쓰기 비율이 높을 때 유리.
- **연산 전파(Operation propagation)**: 수행할 연산을 전송. 활성 복제에 적합. 네트워크 대역폭 절약.
- **무효화(Invalidation)**: 변경 사실만 알림. 읽기/쓰기 비율이 낮을 때 유리.

**일관성 프로토콜**:
- **주 기반(Primary-based)**: 원격 쓰기 - 모든 쓰기를 고정 주 서버에 전달; 로컬 쓰기 - 주 서버 역할이 데이터와 함께 이동
- **복제 쓰기(Replicated-write)**: 활성 복제 - 모든 복제본에 연산 전달; 쿼럼 기반 - NR + NW > N 및 NW > N/2 조건 하에 읽기/쓰기 쿼럼 사용
- **캐시 일관성**: 푸시(서버 주도) vs 풀(클라이언트 주도), 임대(lease) 기반 하이브리드

**쿼럼 프로토콜(Gifford, 1979)**: N개 복제본에서 읽기 쿼럼 NR, 쓰기 쿼럼 NW를 설정. NR + NW > N으로 읽기와 쓰기 쿼럼이 겹치게 하여 최신 값 읽기를 보장.

## 예시

```
# 쿼럼 기반 프로토콜 예시
# N=5 복제본, NR=3 (읽기 쿼럼), NW=3 (쓰기 쿼럼)
# NR + NW = 6 > 5 ✓  (읽기/쓰기 쿼럼 겹침)
# NW > N/2 = 2.5 ✓    (쓰기 간 겹침)

# 쓰기: 3개 복제본에 새 값과 버전 번호 기록
# 읽기: 3개 복제본에서 읽고, 가장 높은 버전 번호의 값 선택

# 읽기 최적화 설정: NR=1, NW=5
# → 읽기 빠르지만 쓰기 느림 (모든 복제본에 써야 함)

# 쓰기 최적화 설정: NR=5, NW=1
# → 쓰기 빠르지만 읽기 느림 (모든 복제본에서 읽어야 함)

# 푸시 vs 풀 업데이트:
# 푸시: 서버가 변경 시 클라이언트에 알림 → 높은 일관성, 서버 부하
# 풀: 클라이언트가 주기적으로 확인 → 낮은 일관성, 클라이언트 부하
# 임대(Lease): 일정 기간 푸시 보장, 만료 후 풀로 전환
```

## 관련 개념

- [Sequential Consistency](/knowledge/distributed-systems/sequential-consistency/)
- [Eventual Consistency](/knowledge/distributed-systems/eventual-consistency/)
- [Primary Backup Protocol](/knowledge/distributed-systems/primary-backup-protocol/)
- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
