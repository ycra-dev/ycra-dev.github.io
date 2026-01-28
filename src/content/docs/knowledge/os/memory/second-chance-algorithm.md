---
title: "세컨드 찬스 알고리즘 (Second-Chance / Clock Algorithm)"
description: "FIFO 기반으로 참조 비트를 활용하여 최근 사용된 페이지에 두 번째 기회를 주는 LRU 근사 알고리즘"
tags: ["OS", "Memory"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/second-chance-algorithm
sidebar:
  order: 25
---

## 핵심 개념

세컨드 찬스(Second-Chance) 알고리즘은 FIFO를 기반으로 하되, **참조 비트(reference bit)**를 사용하여 최근 사용된 페이지에게 두 번째 기회를 주는 **LRU 근사 알고리즘**이다. 순수 LRU는 하드웨어 지원 없이 구현 비용이 높으므로, 대부분의 하드웨어가 제공하는 reference bit만으로 LRU를 근사한다.

비유하면, 회전문 앞에 서있는 사람 중 "최근 활동함" 표시가 있으면 다시 줄 맨 뒤로 보내고, 표시가 없으면 퇴장시키는 것이다.

## 동작 원리

1. 페이지가 참조되면 하드웨어가 reference bit = 1로 설정
2. FIFO 순서대로 victim 후보 선택
3. 후보의 reference bit 확인:
   - **1이면**: bit를 0으로 초기화하고, 도착 시간을 현재로 재설정 → 다음 후보로 이동 (두 번째 기회 부여)
   - **0이면**: 이 페이지를 victim으로 선택
4. 자주 사용되는 페이지는 계속 reference bit = 1 유지 → 교체되지 않음

### Clock Algorithm (원형 큐 구현)

```
         ┌─────┐
    ┌────│  A  │←─── 포인터(시계 바늘)
    │    │ r=1 │
    │    └─────┘
    │         ↓
┌─────┐   ┌─────┐
│  D  │   │  B  │
│ r=0 │   │ r=0 │ ← ref=0이면 victim
└─────┘   └─────┘
    ↑         ↓
    │    ┌─────┐
    └────│  C  │
         │ r=1 │
         └─────┘
```

- 시계 바늘이 한 바퀴 도는 동안 ref=0인 페이지를 찾음
- 최악의 경우: 모든 페이지 ref=1 → 한 바퀴 돌며 모두 0으로 → 다음 바퀴에서 첫 페이지 선택 (FIFO와 동일)

### Enhanced Second-Chance Algorithm

reference bit + modify bit 조합으로 4가지 클래스 분류:

| (ref, modify) | 의미 | 교체 우선순위 |
|---------------|------|--------------|
| (0, 0) | 최근 사용 X, 수정 X | **최우선** (쓰기 불필요) |
| (0, 1) | 최근 사용 X, 수정 O | 2순위 (쓰기 필요) |
| (1, 0) | 최근 사용 O, 수정 X | 3순위 |
| (1, 1) | 최근 사용 O, 수정 O | 최후순위 |

여러 바퀴 순회하며 낮은 클래스의 페이지부터 victim 선택. 수정 안 된 페이지를 우선 교체하여 **I/O 횟수 감소** 효과.

### 실제 OS 적용

- **Linux**: active_list와 inactive_list 구조로 유사 개념 구현
- **Windows**: LRU approximation + working-set trimming
- **Solaris**: two-handed clock (front hand: clear, back hand: check)

## 예시

```
[초기 상태] - 원형 큐, 포인터 → A
A(1) → B(0) → C(1) → D(0)

교체 필요:
1. A 확인: ref=1 → 0으로 바꾸고 넘어감
2. B 확인: ref=0 → B를 victim으로 선택!

[결과]
A(0) → [새 페이지] → C(1) → D(0)
         ↑ 포인터
```

## 관련 개념

- [FIFO 페이지 교체](/knowledge/os/fifo-page-replacement/) - 세컨드 찬스의 기반이 되는 단순 교체 알고리즘
- [LRU 페이지 교체](/knowledge/os/lru-page-replacement/) - 정확하지만 구현 비용이 높은 교체 알고리즘
- [페이지 교체 (Page Replacement)](/knowledge/os/page-replacement/) - 교체 알고리즘의 일반 개념
- [Optimal 페이지 교체 (OPT)](/knowledge/os/optimal-page-replacement/) - 이론적 최적 알고리즘 (비교 기준)
