---
title: "스래싱 (Thrashing)"
description: "프로세스가 실제 작업보다 페이징에 더 많은 시간을 소비하는 현상"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/thrashing
sidebar:
  order: 7
---

## 핵심 개념

스래싱(Thrashing)은 프로세스가 실제 작업보다 페이징에 더 많은 시간을 소비하는 현상입니다. 멀티프로그래밍 수준을 높이면 CPU 활용률이 증가하지만, 어느 시점을 넘으면 급격히 감소합니다.

## 동작 원리

### 스래싱 발생 메커니즘

1. CPU 활용률 낮음 → OS가 멀티프로그래밍 수준 증가
2. 새 프로세스가 기존 프로세스의 프레임 빼앗음 (Global replacement)
3. 프레임 부족한 프로세스들이 페이지 폴트 발생
4. 폴트 처리를 위해 다른 프로세스 프레임 빼앗음 → 연쇄 반응
5. 모든 프로세스가 paging device 큐에서 대기
6. Ready queue 비어감 → CPU 활용률 더 감소 → **악순환**

```
CPU utilization
      │
      │         ╭──── 최적점
      │        ╱  ╲
      │       ╱    ╲
      │      ╱      ╲ thrashing
      │     ╱        ╲
      │    ╱          ╲
      └───────────────────────→
        degree of multiprogramming
```

### Locality (지역성) 모델

프로세스는 locality에서 locality로 이동하며 실행됩니다. 현재 locality를 담을 프레임이 충분하면 페이지 폴트가 거의 발생하지 않습니다.

```
page numbers
     │    ┌───┐        ┌───┐
  34 │    │   │        │   │
  30 │    │   │        │   │
  26 │    │   │        │   │
  22 │ ───┘   │        │   │
  18 │        └────────┘   └───
     └──────────────────────────→ execution time
         locality A    locality B
```

### 스래싱 방지 전략

**1. Working-Set Model**: Δ(델타) 윈도우 내 참조된 페이지 집합 = Working Set. 각 프로세스에 Working Set 크기만큼 프레임을 할당하고, 총 요구가 가용 프레임을 초과하면 프로세스를 suspend합니다.

**2. Page-Fault Frequency (PFF)**: 페이지 폴트 빈도를 직접 모니터링하여, 상한선 초과 시 프레임 추가 할당, 하한선 미달 시 프레임 회수합니다.

```
page-fault rate
      │
      │  increase frames
      │  ─────────────── upper bound
      │
      │  ─────────────── lower bound
      │  decrease frames
      └──────────────────────→
              number of frames
```

**3. Local Replacement**: 한 프로세스의 스래싱이 다른 프로세스에 직접 전파되지 않도록 합니다.

### 해결책 비교

| 해결책 | 장점 | 단점 |
|--------|------|------|
| Local replacement | 스래싱 격리 | 메모리 활용도 감소 |
| Working-set | 이론적으로 우수 | 구현 복잡, 오버헤드 |
| PFF | 직접적 제어 | 반응 시간 지연 가능 |
| 메모리 추가 | 근본적 해결 | 비용 |

## 예시

충분한 물리 메모리 확보가 최선의 방법입니다. 스마트폰부터 서버까지, working set을 메모리에 유지할 수 있도록 설계하는 것이 중요합니다.

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/)
- [스와핑 (Swapping)](/knowledge/os/swapping/)
