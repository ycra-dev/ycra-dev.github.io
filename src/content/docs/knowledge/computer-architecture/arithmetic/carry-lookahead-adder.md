---
title: "자리올림 예측 가산기 (Carry Lookahead Adder)"
description: "캐리 예측 덧셈기(Carry Lookahead Adder)는 생성(generate)과 전파(propagate) 신호를 사용하여 모든 캐리를 병렬로 계산함으로써, 리플 캐리 덧셈기보다 훨씬 빠르게 덧셈을 수행하는 고속 덧셈기이다"
tags: ['Adder', 'Propagate', 'Generate', 'Fast Addition', 'Alu']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/carry-lookahead-adder
sidebar:
  order: 4
---

## 핵심 개념

리플 캐리 덧셈기에서 각 비트의 캐리 출력은 이전 비트에 의존하여 순차적으로 전파되므로 지연이 비트 수에 비례한다. 캐리 예측 덧셈기는 두 가지 핵심 신호를 사용한다: 생성 신호(g_i = a_i AND b_i)는 캐리 입력과 무관하게 캐리를 생성하고, 전파 신호(p_i = a_i OR b_i)는 캐리 입력을 출력으로 전달한다. 이 두 신호를 사용하면 c_{i+1} = g_i + p_i * c_i로 표현되며, 이를 전개하면 모든 캐리를 2단계 논리로 계산할 수 있다. 실용적으로는 4비트 단위의 "슈퍼" 생성(G_i)과 전파(P_i) 신호를 사용하는 2단계 추상화를 적용하여 16비트 덧셈기를 구성한다. 16비트 리플 캐리의 32 게이트 지연 대비 캐리 예측은 5 게이트 지연으로 약 6배 빠르다.

## 예시

```
4비트 캐리 예측 공식:
  g_i = a_i · b_i        (생성: 두 입력 모두 1이면 캐리 생성)
  p_i = a_i + b_i        (전파: 하나라도 1이면 캐리 전달)

  c1 = g0 + (p0 · c0)
  c2 = g1 + (p1 · g0) + (p1 · p0 · c0)
  c3 = g2 + (p2 · g1) + (p2 · p1 · g0) + (p2 · p1 · p0 · c0)
  c4 = g3 + (p3 · g2) + (p3 · p2 · g1) + ... + (p3 · p2 · p1 · p0 · c0)

2단계 추상화 (16비트 = 4 × 4비트):
  P0 = p3 · p2 · p1 · p0    (슈퍼 전파)
  G0 = g3 + (p3·g2) + (p3·p2·g1) + (p3·p2·p1·g0)  (슈퍼 생성)

속도 비교 (16비트):
  리플 캐리: 16 × 2 = 32 게이트 지연
  캐리 예측: 2 + 2 + 1 = 5 게이트 지연 (6.4배 빠름)
```

## 관련 개념

- [산술논리장치 (ALU)](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [조합 논리 (Combinational Logic)](/knowledge/computer-architecture/combinational-logic/)
