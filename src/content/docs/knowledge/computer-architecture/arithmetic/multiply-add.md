---
title: "곱셈-덧셈 (MAD)"
description: "MAD(Multiply-Add)는 곱셈 후 덧셈을 수행하는 복합 부동소수점 명령어로, 하나의 발행 사이클에서 두 개의 부동소수점 연산을 제공한다"
tags: ['Mad', 'Floating Point', 'GPU', 'Arithmetic']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multiply-add
sidebar:
  order: 18
---

## 핵심 개념

MAD는 GPU의 처리량을 높이기 위한 핵심 명령어이다. 하나의 명령어로 곱셈과 덧셈을 수행하므로, 스케줄러가 두 개의 별도 명령어를 디스패치할 필요가 없다.

**MAD vs FMA(Fused Multiply-Add)**:
- **MAD**: 곱셈 시 절삭(truncation), 덧셈 시 round-to-nearest-even. 곱셈 결과가 덧셈 전에 잘려나감 → 정밀도 손실 가능
- **FMA**: 곱셈과 덧셈을 하나의 반올림으로 수행. 중간 결과의 전체 정확도 유지 → 더 정확

MAD는 초기 GPU의 단정밀도 연산에서 주로 사용되며, 비용과 처리량의 균형을 제공한다. 더 높은 정확도가 필요한 배정밀도 연산에서는 FMA가 사용된다.

GPU는 일반적으로 비정규화(denormal) 입력 피연산자를 부호 보존 0으로 플러시하고, 목표 지수 범위를 언더플로하는 결과도 반올림 후 부호 보존 0으로 플러시한다.

## 예시

```
MAD 연산: d = a × b + c

MAD 실행 과정:
1. 곱셈: temp = a × b (truncation으로 반올림)
2. 덧셈: d = temp + c (round-to-nearest-even)

FMA 실행 과정 (비교):
1. 곱셈: temp = a × b (전체 정밀도 유지, 반올림 없음)
2. 덧셈+반올림: d = round(temp + c) (단일 반올림)

정밀도 차이 예시:
a = 1.00000001, b = 1.00000001, c = -1.0

MAD: 1.00000001 × 1.00000001 → truncate → + (-1.0)
     → 정밀도 손실 가능

FMA: 1.00000001 × 1.00000001 + (-1.0)
     → 단일 반올림으로 더 정확한 결과

처리량: MAD는 클럭당 8 연산 (SM의 8 SP에서)
```

## 관련 개념

- [융합 곱셈-덧셈 (FMA)](/knowledge/computer-architecture/fused-multiply-add/)
- [SP (스트리밍 프로세서)](/knowledge/computer-architecture/streaming-processor/)
- [반정밀도 (Half Precision)](/knowledge/computer-architecture/half-precision/)
