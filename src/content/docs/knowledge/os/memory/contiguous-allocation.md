---
title: "연속 메모리 할당 (Contiguous Memory Allocation)"
description: "각 프로세스를 메모리의 연속된 단일 영역에 배치하는 메모리 관리 기법"
tags: ["OS", "Memory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/contiguous-allocation
sidebar:
  order: 12
---

## 핵심 개념

연속 메모리 할당은 각 프로세스를 **메모리의 연속된 하나의 영역**에 통째로 배치하는 방식이다. 마치 주차장에서 차 한 대가 연속된 칸을 차지하는 것처럼, 프로세스가 필요한 만큼의 메모리를 한 덩어리로 받는다.

**가변 파티션(Variable Partition)** 방식에서는 프로세스 크기에 맞는 파티션을 동적으로 생성한다. 프로세스가 종료되면 그 영역은 **Hole**(사용 가능한 메모리 블록)이 되고, OS는 이 Hole들의 목록을 관리한다.

각 프로세스의 메모리 영역은 **base 레지스터**(시작 주소)와 **limit 레지스터**(크기)로 보호된다.

## 동작 원리

프로세스가 메모리를 요청하면, OS는 Hole 목록에서 적절한 공간을 찾아야 한다. 이때 사용하는 전략이 세 가지 있다.

| 전략 | 방식 | 탐색 범위 | 잔여 Hole 특성 |
|------|------|-----------|----------------|
| **First-fit** | 첫 번째 충분한 Hole에 할당 | 처음부터 탐색, 빠름 | 다양한 크기 |
| **Best-fit** | 가장 작은 충분한 Hole에 할당 | 전체 탐색 필요 | 아주 작은 잔여 Hole |
| **Worst-fit** | 가장 큰 Hole에 할당 | 전체 탐색 필요 | 큰 잔여 Hole |

**First-fit**과 **Best-fit**이 Worst-fit보다 속도와 메모리 활용 면에서 우수하다.

### 외부 단편화와 50% 규칙

프로세스들이 할당과 해제를 반복하면, 메모리 곳곳에 작은 Hole들이 흩어지는 **외부 단편화**가 발생한다. 통계적으로 **N개 블록이 할당되면 약 0.5N개 블록이 단편화로 낭비**된다 (50% 규칙).

## 예시

```
메모리 상태: [OS][  P1  ][  Hole  ][  P2  ][ Hole ][ P3 ]

P4(크기 5) 할당 요청 시:
- First-fit → 첫 번째 Hole(크기 10)에 할당 → [OS][P1][P4|Hole(5)][P2][Hole][P3]
- Best-fit  → 두 번째 Hole(크기 6)에 할당  → [OS][P1][Hole(10)][P2][P4|1][P3]
- Worst-fit → 첫 번째 Hole(크기 10)에 할당 → [OS][P1][P4|Hole(5)][P2][Hole][P3]
```

## 관련 개념

- [논리 주소와 물리 주소](/knowledge/os/logical-physical-address/)
- [메모리 단편화](/knowledge/os/fragmentation/)
- [페이징](/knowledge/os/paging/)
