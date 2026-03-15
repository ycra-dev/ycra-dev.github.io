---
title: "최악의 경우 분석 (Worst-Case Analysis)"
description: "최악의 경우 분석(Worst-Case Analysis)은 크기 n인 모든 입력 중에서 가장 긴 수행 시간을 구하는 알고리즘 분석 방법으로, 알고리즘의 성능 상한(upper bound)을 제공한다"
tags: ['Worst Case', 'Analysis', 'Running Time', 'Upper Bound']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/worst-case-analysis
sidebar:
  order: 6
---

## 핵심 개념

최악의 경우 분석을 주로 사용하는 세 가지 이유:

1. **성능 보장**: 어떤 입력에 대해서도 알고리즘이 이보다 오래 걸리지 않는다는 보장을 제공한다. 실시간 컴퓨팅처럼 연산이 기한 내에 완료되어야 하는 경우 특히 중요하다.

2. **빈번한 발생**: 일부 알고리즘에서는 최악의 경우가 자주 발생한다. 예를 들어 데이터베이스에서 존재하지 않는 정보를 검색하는 경우가 흔하며, 이는 검색 알고리즘의 최악의 경우이다.

3. **평균과 유사**: 평균의 경우가 최악의 경우만큼 나쁜 경우가 많다. 삽입 정렬에서 평균적으로 A[i]를 부분 배열의 절반과 비교하므로, 평균 수행 시간도 Θ(n²)으로 최악의 경우와 동일한 차수이다.

이 외에도 **평균의 경우(average-case)** 분석과 **확률적 분석(probabilistic analysis)** 이 사용되기도 한다. 평균의 경우 분석은 "평균적 입력"이 무엇인지 명확하지 않을 수 있어 적용 범위가 제한된다.

## 예시

```
삽입 정렬의 경우 분석:

최선의 경우 (이미 정렬됨):
  각 원소가 제자리 → while 루프 즉시 종료
  T(n) = Θ(n)

최악의 경우 (역순 정렬):
  각 원소를 모든 이전 원소와 비교
  t_i = i (각 반복에서 비교 횟수)
  T(n) = Θ(n²)

평균의 경우 (랜덤 입력):
  평균적으로 부분 배열의 절반과 비교
  t_i ≈ i/2
  T(n) = Θ(n²)  ← 최악의 경우와 같은 차수
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
- [삽입 정렬 (Insertion Sort)](/knowledge/algorithms/insertion-sort/)
- [RAM 모델 (RAM Model)](/knowledge/algorithms/ram-model/)
