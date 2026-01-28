---
title: "은행원 알고리즘 (Banker's Algorithm)"
description: "각 스레드의 최대 자원 요구량을 기반으로 자원 할당 시 안전 상태 유지 여부를 검사하는 교착 상태 회피 알고리즘"
tags: ["OS", "Deadlock", "Algorithm"]
created: 2026-01-23
updated: 2026-01-27
slug: knowledge/os/bankers-algorithm
sidebar:
  order: 23
---

## 핵심 개념

은행원 알고리즘은 Dijkstra가 제안한 교착 상태 회피 알고리즘입니다. 자원 타입당 인스턴스가 여러 개인 경우, 자원 할당 그래프만으로는 부족하기 때문에 각 스레드의 최대 자원 요구량을 기반으로 안전 상태 유지 여부를 검사합니다.

## 동작 원리

### 자료 구조 (n = 스레드 수, m = 자원 타입 수)

| 이름 | 크기 | 의미 |
|------|------|------|
| **Available** | m | 각 자원 타입의 가용 인스턴스 수 |
| **Max** | n × m | 각 스레드의 최대 자원 요구량 |
| **Allocation** | n × m | 각 스레드에 현재 할당된 자원 |
| **Need** | n × m | 각 스레드의 추가 필요량 (Max - Allocation) |

### 안전 알고리즘 (Safety Algorithm)

```
1. Work = Available, Finish[i] = false (모든 i)
2. Finish[i] == false && Need_i ≤ Work 인 i 탐색
   - 없으면 4단계로
3. Work = Work + Allocation_i
   Finish[i] = true → 2단계로
4. 모든 Finish[i] == true면 안전 상태
```

시간 복잡도: O(m × n²)

### 자원 요청 알고리즘 (Resource-Request Algorithm)

```
1. Request_i ≤ Need_i 검증 (초과 시 오류)
2. Request_i ≤ Available 검증 (불충분 시 대기)
3. 가할당 수행:
   Available -= Request_i
   Allocation_i += Request_i
   Need_i -= Request_i
4. 안전 알고리즘 실행
   - 안전 → 할당 확정
   - 불안전 → 롤백 후 대기
```

## 예시

```
5개 스레드, 3개 자원 타입 (A, B, C)
Available = (3, 3, 2)

T1이 (1, 0, 2) 요청
→ 가할당 후 Available = (2, 3, 0)
→ 안전 순서열 <T1, T3, T4, T0, T2> 존재
→ 요청 승인
```

은행원이 대출 요청 시 "이 대출을 승인해도 다른 모든 고객에게 약속한 한도를 지급할 수 있는가?" 확인하는 것과 같습니다.

## 관련 개념

- [[안전 상태 (Safe State)]]
- [[자원 할당 그래프 (Resource-Allocation Graph)]]
- [[교착 상태 필요조건 (Necessary Conditions)]]
