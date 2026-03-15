---
title: "캐스케이드 병합 정렬 (Cascade Merge Sort)"
description: "캐스케이드 병합 정렬은 외부 정렬에서 다중 웨이 병합을 단계적으로 줄여가며 수행하며, 테이프 되감기 오버랩을 활용하여 폴리페이즈보다 효율적일 수 있는 방법이다"
tags: ["Cascade Merge Sort", "External Sorting", "Tape Sorting", "TAOCP", "Merge Patterns", "Tape Efficiency"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/cascade-merge-sort
sidebar:
  order: 46
---

## 핵심 개념

캐스케이드 병합 정렬(Cascade Merge Sort)은 외부 정렬에서 다중 웨이 병합을 단계적으로 줄여가며 수행하는 방법이다. 첫 단계에서는 (T-1)-way 병합, 다음 단계에서는 (T-2)-way 병합, ..., 마지막에는 2-way 병합을 수행하는 것이 특징이다.

## 동작 원리

**기본 구조 (T=6 테이프 예시)**:
- 각 "계단(cascade)" 단계에서 웨이 수를 점차 줄임
- 5-way → 4-way → 3-way → 2-way 병합으로 진행
- 폴리페이즈와 달리 테이프 되감기를 더 잘 활용 가능

**캐스케이드의 장점**:
- 되감기 오버랩 가능: 한 테이프를 읽는 동안 다른 테이프 되감기
- "캐스케이드 + 되감기 오버랩" 조합이 실용적으로 매우 효율적

**Chart A 실험 결과 (100,000 레코드)**:
- 역방향 캐스케이드: 매우 빠른 수준
- 되감기 오버랩 캐스케이드: 폴리페이즈와 비슷한 속도로 두 번째로 빠른 방법

**폴리페이즈와의 비교**:
- 캐스케이드가 구현이 더 단순 (Algorithm C)
- 되감기 오버랩을 쉽게 활용 가능
- 특정 상황에서는 폴리페이즈보다 효율적

**캐스케이드 런 수열**: 캐스케이드에 최적인 초기 런 수는 특정 수열에 해당. 폴리페이즈의 피보나치 수열과 유사한 역할.

## 예시

```
T=5, 캐스케이드 병합:
초기 런 분배: (테이프1: m₁, 테이프2: m₂, 테이프3: m₃, 테이프4: m₄)

단계 1: 4-way 병합 → 테이프5
  (m₄개 런을 4-way 병합하여 테이프5에 기록)

단계 2: 3-way 병합 → (비어진 테이프4)
  테이프1,2,3에서 3-way 병합

단계 3: 2-way 병합 → (비어진 테이프3)
  테이프1,2에서 2-way 병합

... 반복하여 최종적으로 하나의 런이 남음

되감기 오버랩:
단계 N에서 결과를 쓰는 동안 단계 N+1에 필요한 테이프 미리 되감기
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [다단계 병합 정렬 (Polyphase Merge Sort)](/knowledge/algorithms/sorting-selection/polyphase-merge-sort/)
- [진동 정렬 (Oscillating Sort)](/knowledge/algorithms/sorting-selection/oscillating-sort/)
- [테이프 버퍼링과 예측 (Tape Buffering and Forecasting)](/knowledge/algorithms/sorting-selection/tape-buffering-forecasting/)
