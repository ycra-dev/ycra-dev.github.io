---
title: "RAM 모델 (RAM Model)"
description: "RAM(Random-Access Machine) 모델은 알고리즘 분석에 사용되는 단일 프로세서 계산 모델로, 명령어가 순차적으로 실행되며 각 명령어와 데이터 접근이 상수 시간에 수행된다고 가정한다"
tags: ['RAM Model', 'Computation Model', 'Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/ram-model
sidebar:
  order: 5
---

## 핵심 개념

RAM 모델의 주요 가정:
- **순차 실행**: 명령어가 하나씩 순서대로 실행되며, 동시 연산이 없다
- **상수 시간 연산**: 각 명령어(산술, 데이터 이동, 제어)와 데이터 접근(변수 읽기/쓰기, 배열 인덱싱)이 상수 시간 소요
- **기본 명령어**: 산술(덧셈, 뺄셈, 곱셈, 나눗셈, 나머지, 바닥/천장), 데이터 이동(적재, 저장, 복사), 제어(분기, 서브루틴 호출/반환)
- **워드 크기 제한**: 입력 크기 n에 대해 정수는 c·log₂n 비트(c ≥ 1)로 표현

RAM 모델은 현대 컴퓨터의 메모리 계층(캐시, 가상 메모리)을 고려하지 않지만, 실제 머신의 성능을 훌륭하게 예측하는 분석 결과를 제공한다.

## 예시

```
RAM 모델에서의 연산 비용:
  x = A[i]        → 상수 시간 (배열 인덱싱)
  y = x + z       → 상수 시간 (산술)
  if x > y        → 상수 시간 (비교 및 분기)

주의: RAM 모델의 회색 영역
  - 지수 연산 x^n: 일반적으로 상수 시간이 아님 (O(lg n))
  - 비트 시프트: 2^n 계산은 워드 크기 내에서 상수 시간
  - 정렬 명령어: 비현실적이므로 포함하지 않음
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
- [최악의 경우 분석 (Worst-Case Analysis)](/knowledge/algorithms/worst-case-analysis/)
