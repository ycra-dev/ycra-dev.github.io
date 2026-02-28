---
title: "Sequential Search"
description: "순차 탐색(Sequential Search)은 테이블의 레코드를 처음부터 끝까지 순서대로 탐색하여 키와 일치하는 레코드를 찾는 가장 기본적인 탐색 알고리즘이다"
tags: ["Sequential Search", "Linear Search", "Searching", "Sentinel", "Self-Organizing", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/sequential-search
sidebar:
  order: 28
---

## 핵심 개념

순차 탐색(Sequential Search)은 테이블의 레코드를 처음부터 끝까지 순서대로 탐색하여 주어진 키(argument) K와 일치하는 레코드를 찾는 가장 기본적인 탐색 알고리즘이다. Knuth의 Algorithm S로 정의된다.

**시간 복잡도:**
- 성공적 탐색 평균: (N+1)/2 번의 비교 (균등 확률 가정)
- 실패 탐색: N번의 비교

## 동작 원리

**Algorithm S (Sequential Search):**
1. i를 1로 초기화
2. K = K[i]이면 탐색 성공으로 종료
3. i를 증가시켜 N에 도달하면 탐색 실패로 종료

**최적화 기법 (Algorithm Q - Quick Sequential Search):**
테이블 끝에 센티넬(sentinel)로 검색 키 K를 추가하면, 루프 내의 종료 조건 검사를 제거할 수 있어 약 20% 속도 향상이 가능하다.

**자기 조직화(Self-organizing) 탐색:**
- **전치법(Move-to-Front)**: 탐색 성공 시 해당 레코드를 테이블 앞으로 이동
- **전위교환법(Transpose)**: 탐색 성공 시 바로 앞 레코드와 교환

자주 검색되는 항목이 앞에 배치되어 평균 탐색 시간이 줄어들며, Zipf의 법칙(80-20 법칙)이 적용되는 실제 데이터에 특히 효과적이다.

## 예시

```
Algorithm S (Sequential Search):
  S1. i ← 1
  S2. if K = K[i] then FOUND (success)
  S3. i ← i + 1
  S4. if i ≤ N goto S2; else NOT_FOUND (fail)

센티넬을 이용한 최적화 (Algorithm Q):
  K[N+1] ← K  # 센티넬 삽입
  i ← 1
  while K[i] != K: i ← i + 1
  if i ≤ N then FOUND else NOT_FOUND
```

N=10인 경우, 균등 확률 하 평균 5.5회 비교로 탐색 성공.

## 관련 개념

- [Binary Search](/knowledge/algorithms/data-structures/binary-search/)
- [Hash Table](/knowledge/algorithms/hash-table/)
- [Fibonacci Search](/knowledge/algorithms/data-structures/fibonacci-search/)
