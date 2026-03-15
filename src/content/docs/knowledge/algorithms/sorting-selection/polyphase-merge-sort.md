---
title: "다단계 병합 정렬 (Polyphase Merge Sort)"
description: "폴리페이즈 병합 정렬은 T-1개의 입력 테이프에서 동시에 읽어 1개의 출력 테이프로 병합하는 과정을 반복하여, 균형 병합보다 적은 패스로 정렬하는 외부 정렬 방법이다"
tags: ["Polyphase Merge Sort", "External Sorting", "Tape Sorting", "Fibonacci", "TAOCP", "Merge Patterns"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/polyphase-merge-sort
sidebar:
  order: 45
---

## 핵심 개념

폴리페이즈 병합 정렬(Polyphase Merge Sort)은 T개의 테이프를 사용하여 외부 정렬할 때, **T-1개의 입력 테이프에서 동시에 읽어 1개의 출력 테이프로 병합**하는 과정을 반복하는 방법이다. 균형 병합보다 적은 패스로 정렬 가능하다.

## 동작 원리

**기본 아이디어**: 균형 병합처럼 테이프를 두 뱅크로 나누지 않고, 항상 (T-1)-way 병합을 수행. 각 단계(phase)마다 가장 런이 많은 테이프를 출력 테이프로 사용.

**T=3 테이프 폴리페이즈** (Fibonacci 수와 연관):
- 최적 초기 분배: 피보나치 수열 F(n), F(n-1)개 런
- 각 단계: 2-way 병합으로 테이프 1개가 소진됨

**런 수와 패스 수**:
- S개 초기 런에서 균형 2-way 병합: ⌈log₂ S⌉ 패스
- 폴리페이즈 (T=3): ≈ log_φ S 패스 (φ ≈ 1.618, Fibonacci 비율)
- 폴리페이즈 (T=6): 훨씬 적은 패스

**더미 런(Dummy Run)**: 완벽한 피보나치 분배가 되지 않을 때, 빈 런을 추가하여 균형을 맞춤. 더미 런은 실제로 처리하지 않음.

**초기 분배 알고리즘 D**: 런을 어느 테이프에 쓸지 결정하는 Algorithm D가 핵심. 항상 현재 가장 런이 적은 테이프에 씀.

## 예시

```
T=3 테이프 폴리페이즈:
초기 런 수 = 13 (F(7) = 13에 해당)

초기 분배:
  테이프1: 8개 런 (F(6))
  테이프2: 5개 런 (F(5))
  테이프3: 0개 런 (출력용)

단계 1: 테이프1+2 → 테이프3 (5 2-way 병합)
  테이프1: 3개 런, 테이프2: 0개 런, 테이프3: 5개 런

단계 2: 테이프1+3 → 테이프2 (3 2-way 병합)
  테이프1: 0개 런, 테이프2: 3개 런, 테이프3: 2개 런

단계 3: 테이프2+3 → 테이프1 (2 2-way 병합)
  테이프1: 2개 런, 테이프2: 1개 런, 테이프3: 0개 런

단계 4: 테이프1+2 → 테이프3 (1 2-way 병합)
  테이프1: 1개 런, 테이프2: 0개 런, 테이프3: 1개 런

단계 5: 테이프1+3 → 테이프2 (1 2-way 병합)
  테이프2: 1개 런 = 정렬된 파일 ✓
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [캐스케이드 병합 정렬 (Cascade Merge Sort)](/knowledge/algorithms/sorting-selection/cascade-merge-sort/)
- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
