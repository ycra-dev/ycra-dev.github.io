---
title: "Loop Invariant"
description: "루프 불변식(Loop Invariant)은 루프의 각 반복 시작 시 항상 참인 성질로, 알고리즘의 정확성을 증명하는 데 사용되는 형식적 도구이다"
tags: ['Loop Invariant', 'Correctness', 'Proof', 'Mathematical Induction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/loop-invariant
sidebar:
  order: 4
---

## 핵심 개념

루프 불변식을 사용하여 알고리즘의 정확성을 증명하려면 세 가지 속성을 보여야 한다:

1. **초기화(Initialization)**: 루프의 첫 번째 반복 이전에 불변식이 참이다. (귀납법의 기저 사례에 해당)
2. **유지(Maintenance)**: 루프의 어떤 반복 이전에 불변식이 참이면, 다음 반복 이전에도 참이다. (귀납법의 귀납 단계에 해당)
3. **종료(Termination)**: 루프가 종료되며, 종료 시 불변식이 알고리즘의 정확성을 보여주는 유용한 속성을 제공한다.

루프 불변식 증명은 수학적 귀납법의 한 형태이지만, 귀납법이 무한히 적용되는 것과 달리 루프가 종료될 때 "귀납"이 멈춘다는 점이 다르다. 세 번째 속성(종료)이 가장 중요한데, 이것이 실제로 알고리즘의 정확성을 확인하는 데 사용되기 때문이다.

## 예시

```
삽입 정렬의 루프 불변식:

불변식: "for 루프의 각 반복 시작 시, 부분 배열 A[1:i-1]은
        원래 A[1:i-1]에 있던 원소들로 구성되며, 정렬된 상태이다."

초기화: i=2일 때, A[1:1]은 원소 하나이므로 당연히 정렬됨
유지:   A[i]를 A[1:i-1]에 올바른 위치에 삽입하면
        A[1:i]가 정렬됨 → i를 증가시키면 불변식 유지
종료:   i = n+1일 때 종료, 불변식에 의해 A[1:n]이 정렬됨
        → 알고리즘이 올바름
```

## 관련 개념

- [Correctness](/knowledge/algorithms/correctness/)
- [Insertion Sort](/knowledge/algorithms/insertion-sort/)
