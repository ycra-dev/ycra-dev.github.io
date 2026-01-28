---
title: "워킹셋 모델 (Working-Set Model)"
description: "프로세스가 현재 활발히 사용 중인 페이지 집합을 파악하고 메모리에 유지하여 스래싱을 방지하는 모델"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/working-set
sidebar:
  order: 17
---

## 핵심 개념

워킹셋 모델은 **프로세스가 현재 자주 사용하는 페이지들의 집합(Working Set)**을 파악하여 메모리에 유지하는 전략이다. 마치 요리사가 현재 만들고 있는 요리에 필요한 재료만 조리대(메모리) 위에 올려두는 것과 같다. 필요한 재료가 조리대에 없으면 창고까지 다녀와야 하니 느려진다 (= page fault).

- **Working-Set Window (Delta)**: 가장 최근 Delta개의 페이지 참조를 관찰하는 창
- **WSS_i**: 프로세스 i의 Working Set 크기 (window 안에서 참조된 서로 다른 페이지 수)
- **D = Sigma WSS_i**: 시스템 전체가 필요로 하는 총 프레임 수
- **D > m (가용 프레임)이면 스래싱 발생** -> 일부 프로세스를 suspend해야 함

## 동작 원리

### 근사 구현: Fixed-interval Timer + Reference Bit

정확한 working set을 추적하려면 모든 메모리 참조를 기록해야 하므로 비용이 크다. 실제로는 **타이머 인터럽트**와 **참조 비트(reference bit)**를 사용한 근사 방식을 쓴다.

1. 매 R번의 참조(또는 일정 시간 간격)마다 타이머 인터럽트 발생
2. 각 페이지의 참조 비트를 확인
3. 참조 비트가 1이면 working set에 포함
4. 참조 비트를 0으로 초기화
5. 정확도는 Delta 단위가 아닌 R 단위로 근사됨

### Page-Fault Frequency (PFF) 대안

Working set 대신, **페이지 폴트율을 직접 모니터링**하는 방식이다.

```
페이지
폴트율
  │
  │         ────── upper bound (상한)
  │        /
  │       /  → 이 구간: 프레임 추가 할당
  │      /
  │─────/────────── 적정 범위
  │    /
  │   /   → 이 구간: 프레임 회수
  │  /
  │ /       ────── lower bound (하한)
  │/
  └───────────────────────── 할당된 프레임 수
```

| 상황 | 조치 |
|------|------|
| 폴트율 > upper bound | 프레임 추가 할당 (메모리 부족) |
| 폴트율 < lower bound | 프레임 회수 (메모리 과잉 배분) |
| lower <= 폴트율 <= upper | 현재 할당 유지 |

PFF는 working set보다 **구현이 단순**하고 **직접적인 피드백**을 제공한다.

## 예시

```
Working-Set Window Delta = 10

참조 스트링: ... 1, 2, 5, 1, 7, 6, 7, 1, 2, 5 ...
                 ←────── 최근 10개 참조 ──────→

Working Set = {1, 2, 5, 6, 7}
WSS = 5 (서로 다른 페이지 5개)

시스템 전체:
  P1: WSS = 5
  P2: WSS = 3
  P3: WSS = 4
  D = 5 + 3 + 4 = 12

  가용 프레임 m = 10이면?
  D(12) > m(10) → 스래싱 위험!
  → P3을 suspend하면 D = 8 < 10 → 안정
```

## 관련 개념

- [스래싱](/knowledge/os/thrashing/)
- [프레임 할당](/knowledge/os/frame-allocation/)
- [요구 페이징](/knowledge/os/demand-paging/)
