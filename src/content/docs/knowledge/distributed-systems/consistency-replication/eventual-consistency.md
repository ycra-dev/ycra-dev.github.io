---
title: "Eventual Consistency"
description: "최종 일관성(Eventual Consistency)은 업데이트가 없는 상태가 충분히 지속되면, 모든 복제본이 결국 동일한 값으로 수렴하는 약한 일관성 모델이다"
tags: ['Eventual Consistency', 'Weak Consistency', 'Convergence', 'Replication']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/eventual-consistency
sidebar:
  order: 3
---

## 핵심 개념

**적용 조건**: 쓰기-쓰기 충돌이 거의 없고, 대부분의 연산이 읽기인 경우에 적합. 대표적 예: DNS(단일 권한이 도메인 관리), 웹 캐시(단일 웹마스터가 페이지 관리), CDN(콘텐츠의 느린 전파 허용).

**특성**: 업데이트가 모든 복제본에 전파되는 것만 보장. 충돌 발생 시 일반적으로 하나의 쓰기가 "승자"로 선언되어 다른 쓰기의 효과를 덮어씀.

**한계**: 클라이언트가 항상 같은 복제본에 접근하면 문제없지만, 모바일 사용자가 다른 복제본에 접근하면 이전 업데이트가 보이지 않을 수 있음 → 클라이언트 중심 일관성 모델로 해결.

**강한 최종 일관성(Strong Eventual Consistency)**: 충돌 업데이트가 있더라도 관련 복제본이 동일한 상태를 유지하도록 보장. CRDT(Conflict-Free Replicated Data Type)로 구현. 추가 조정 없이 동시 업데이트 가능.

**프로그램 일관성(Program Consistency)**: 프로그램이 이상 현상(race condition 등)에도 불구하고 예상 결과를 생성하는지에 초점. 핵심 개념: **단조성(monotonicity)** - 문제 P가 단조적이면, 불완전한 정보로 부분 솔루션을 시작하고 누락된 정보가 도착해도 롤백 불필요. 예: 장바구니 채우기.

## 예시

```
# 최종 일관성 예시: 공유 캘린더
# Alice가 회의 M1 제안: WA(M1)[T1, {A}]
# Bob이 참석 확인: WB(M1)[T1, {A,B}]
# Bob이 새 회의 제안: WB(M2)[T2, {B}]

# 동시에 Chuck이 다른 시간 제안:
# WC(M1)[T3, {C}]  ||  WB(M1)[T1, {A,B}]

# 최종 일관성: 결국 M2 = [T2, {B}]로 수렴
# M1은 충돌 해결이 필요: [T1,{A,B}] 또는 [T3,{C}] 중 하나 승리

# 인과 일관성 + 최종 일관성:
# M2 = [T2,{B}]를 읽은 후 M1을 읽으면,
# [T1,{A}]은 불가 (WB(M1) → WB(M2) 인과 체인에 의해)
# [T1,{A,B}] 또는 [T3,{C}]만 가능
```

## 관련 개념

- [CRDT](/knowledge/distributed-systems/crdt/)
- [Causal Consistency](/knowledge/distributed-systems/causal-consistency/)
- [Client Centric Consistency](/knowledge/distributed-systems/client-centric-consistency/)
- [Sequential Consistency](/knowledge/distributed-systems/sequential-consistency/)
