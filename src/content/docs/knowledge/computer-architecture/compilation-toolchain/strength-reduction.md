---
title: "Strength Reduction"
description: "강도 감소(Strength Reduction)는 복잡한 연산을 더 단순한 동등한 연산으로 대체하는 컴파일러 최적화 기법으로, 대표적으로 곱셈을 시프트로 대체한다"
tags: ['Compiler Optimization', 'Performance', 'Shift', 'Multiply']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/strength-reduction
sidebar:
  order: 17
---

## 핵심 개념

가장 흔한 강도 감소의 예는 2의 거듭제곱에 의한 곱셈을 왼쪽 시프트로 대체하는 것이다. 이진수에서 왼쪽으로 1비트 시프트하면 2를 곱한 것과 같다. 거의 모든 컴파일러가 이 최적화를 수행한다. 배열 인덱싱 루프에서의 강도 감소는 귀납 변수 제거(induction variable elimination)와 관련된다 -- 루프 내에서 배열 주소 계산(곱셈과 덧셈)을 포인터 증가(단순 덧셈)로 대체할 수 있다. 포인터 버전의 코드가 배열 인덱스 버전보다 반복당 명령어 수가 6에서 4로 줄어드는 효과를 보여준다.

## 예시

```c
// 강도 감소 전: 곱셈 사용
for (i = 0; i < n; i++)
    array[i] = 0;  // 주소: base + i * 4 (매번 곱셈)

// 강도 감소 후: 포인터 증가로 대체
for (p = array; p < array + n; p++)
    *p = 0;  // 주소: p += 4 (단순 덧셈)
```

```assembly
# MIPS 강도 감소 예시
# 곱셈 대신 시프트:
# mult $t0, $s0, 4    →  sll $t0, $s0, 2
```

## 관련 개념

- [Common Subexpression Elimination](/knowledge/computer-architecture/common-subexpression-elimination/)
- [Compiler](/knowledge/computer-architecture/compiler/)
- [Loop Unrolling](/knowledge/computer-architecture/loop-unrolling/)
