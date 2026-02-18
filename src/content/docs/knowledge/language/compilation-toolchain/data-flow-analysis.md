---
title: "Data Flow Analysis"
description: "데이터 흐름 분석(Data Flow Analysis)은 프로그램의 각 지점에서 변수의 정의(definition)와 사용(use) 관계를 분석하여 최적화 가능성을 판단하는 컴파일러 분석 기법이다"
tags: ['Compiler Optimization', 'Control Flow Graph', 'Use Definition', 'Global Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/data-flow-analysis
sidebar:
  order: 15
---

## 핵심 개념

글로벌 최적화를 수행하기 위해 필요한 정보를 제공한다. 두 가지 핵심 정보를 제공한다: use-definition 정보(각 피연산자가 어디에서 정의/변경되었는지)와 definition-use 정보(변경된 피연산자의 모든 사용처). 이 분석은 제어 흐름 그래프(control flow graph) 위에서 동작하며, 노드는 기본 블록을, 아크는 기본 블록 간의 제어 흐름을 나타낸다. 데이터 흐름 분석의 결과는 코드 이동(code motion), 귀납 변수 제거(induction variable elimination), 공통 부분식 제거 등의 최적화에 활용된다. 컴파일러는 반드시 보수적(conservative)이어야 하며, 100% 확실한 경우에만 최적화를 수행해야 한다.

## 예시

```
# 제어 흐름 그래프에서의 데이터 흐름 분석
# while (save[i] == k) i += 1;

# 코드 이동 후보 식별:
# li  R100, save  → 루프 내에서 save 주소 불변 → 루프 밖으로 이동 가능
# lw  R104, k     → 루프 내에서 k 불변 → 루프 밖으로 이동 가능
# lw  R101, i     → 루프 내에서 i 변경됨 → 이동 불가
```

## 관련 개념

- [Common Subexpression Elimination](/knowledge/language/common-subexpression-elimination/)
- [Register Allocation](/knowledge/language/register-allocation/)
- [Compiler](/knowledge/language/compiler/)
