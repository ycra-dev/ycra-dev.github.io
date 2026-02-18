---
title: "Register Allocation"
description: "레지스터 할당(Register Allocation)은 프로그램의 변수를 프로세서의 물리적 레지스터에 매핑하는 컴파일러 최적화 과정으로, 메모리 접근을 최소화하여 성능을 향상시킨다"
tags: ['Compiler Optimization', 'Graph Coloring', 'Live Range', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/register-allocation
sidebar:
  order: 14
---

## 핵심 개념

현대 로드-스토어 아키텍처에서 가장 중요한 최적화이다. 로드나 스토어를 제거하면 명령어 하나를 절약할 수 있고, 다른 최적화(공통 부분식 제거 등)의 효과도 향상된다. 현대의 글로벌 레지스터 할당은 영역 기반(region-based) 접근법을 사용하며, 영역(또는 라이브 레인지)은 특정 변수가 레지스터에 할당될 수 있는 코드 구간을 나타낸다. 영역 간의 간섭은 간섭 그래프(interference graph)로 표현되며, 레지스터 할당 문제는 유명한 그래프 컬러링(graph coloring) 문제와 동등하다. 그래프를 사용 가능한 레지스터 수만큼의 색으로 칠할 수 없으면, 우선순위 함수에 기반하여 레지스터를 스필(spill)해야 한다.

## 예시

```
# while 루프의 레지스터 할당 예시
# 최적화 전 (가상 레지스터 사용):
LW R100, save    # 메모리에서 로드
LW R101, i       # 메모리에서 로드
SLL R102, R101, 2
ADD R103, R100, R102
LW R104, 0(R103)

# 레지스터 할당 후 (MIPS 레지스터):
# save → $s6, i → $t2, k → $s5
# 내부 루프 명령어 수: 10 → 4로 감소
```

## 관련 개념

- [Compiler](/knowledge/language/compiler/)
- [Procedure Inlining](/knowledge/language/procedure-inlining/)
- [Common Subexpression Elimination](/knowledge/language/common-subexpression-elimination/)
- [Loop Unrolling](/knowledge/language/loop-unrolling/)
