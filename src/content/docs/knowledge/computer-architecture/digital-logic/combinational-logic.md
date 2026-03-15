---
title: "조합 논리 (Combinational Logic)"
description: "조합 논리(Combinational Logic)는 메모리를 포함하지 않는 논리 블록으로, 출력이 현재 입력 값에만 의존하며, 동일한 입력에 대해 항상 동일한 출력을 생성한다"
tags: ['Logic Design', 'Decoder', 'Multiplexor', 'Pla', 'Boolean Algebra']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/combinational-logic
sidebar:
  order: 2
---

## 핵심 개념

조합 논리는 순차 논리(sequential logic)와 대비되는 개념으로, 상태를 저장하지 않는다. 주요 조합 논리 블록에는 디코더(n비트 입력을 2^n개 출력 중 하나로 변환), 멀티플렉서(제어 신호에 따라 여러 입력 중 하나를 선택하여 출력), 인코더(디코더의 역함수) 등이 있다. 모든 논리 함수는 AND, OR, NOT 게이트만으로 구현할 수 있으며, 2단계 논리(곱의 합 또는 합의 곱)로 표현할 수 있다. 곱의 합 표현은 PLA(Programmable Logic Array)로 직접 구현된다. Don't care 조건을 활용하면 필요한 논리 게이트 수를 줄여 구현을 최적화할 수 있다. 현대 논리 합성 시스템은 진리표나 행동 기술로부터 자동으로 최적화된 게이트 수준 구현을 생성한다.

## 예시

```
3-to-8 디코더:
  입력(3비트)    출력(8비트 중 1개 활성)
  000          → Out0 = 1
  001          → Out1 = 1
  ...
  111          → Out7 = 1

2-to-1 멀티플렉서:
  C = (A · S') + (B · S)
  S=0이면 C=A, S=1이면 C=B

PLA 구조:
  [입력] → [AND 평면 (곱항 생성)] → [OR 평면 (합 생성)] → [출력]
```

## 관련 개념

- [불 대수 (Boolean Algebra)](/knowledge/computer-architecture/boolean-algebra/)
- [디코더 (Decoder)](/knowledge/computer-architecture/decoder/)
- [멀티플렉서 (Multiplexor)](/knowledge/computer-architecture/multiplexor/)
- [PLA (프로그래머블 논리 배열)](/knowledge/computer-architecture/programmable-logic-array/)
- [순차 논리 (Sequential Logic)](/knowledge/computer-architecture/sequential-logic/)
