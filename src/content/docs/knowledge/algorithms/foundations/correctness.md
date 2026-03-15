---
title: "정확성 (Correctness)"
description: "알고리즘이 올바르다(correct)는 것은 모든 문제 인스턴스에 대해 유한 시간 내에 정지(halt)하고 올바른 해를 출력하는 것을 의미한다"
tags: ['Correctness', 'Halting', 'Algorithm Verification']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/correctness
sidebar:
  order: 3
---

## 핵심 개념

부정확한(incorrect) 알고리즘은 두 가지 방식으로 실패할 수 있다:
1. 일부 입력에서 전혀 정지하지 않을 수 있다.
2. 정지하되 잘못된 답을 출력할 수 있다.

그러나 부정확한 알고리즘도 오류율(error rate)을 제어할 수 있다면 유용할 수 있다. 대표적 예로 큰 소수를 찾는 알고리즘(Chapter 31)이 있으며, 이러한 알고리즘은 제어 가능한 오류율을 가진다.

알고리즘의 정확성은 알고리즘 설계에서 가장 기본적인 요구사항이다. 컴퓨터가 무한히 빨라도 해법이 올바르게 종료되고 정확한 답을 내놓는지 확인할 필요가 있다.

## 예시

```
정렬 알고리즘의 정확성 검증:
  - 입력: 임의의 수열 ⟨a₁, a₂, ..., aₙ⟩
  - 출력 조건 1: 출력이 입력의 순열(permutation)이어야 한다
  - 출력 조건 2: a'₁ ≤ a'₂ ≤ ... ≤ a'ₙ 이어야 한다
  - 종료 조건: 유한 시간 내에 정지해야 한다

소수 판별 (확률적 알고리즘):
  - Miller-Rabin 테스트는 "아마도 소수"라고 답할 수 있음
  - 오류 확률을 반복 횟수로 제어 가능
  - 부정확하지만 실용적으로 유용한 알고리즘의 예
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
- [계산 문제 (Computational Problem)](/knowledge/algorithms/computational-problem/)
