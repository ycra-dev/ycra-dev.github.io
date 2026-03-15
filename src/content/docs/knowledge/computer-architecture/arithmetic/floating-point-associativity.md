---
title: "부동소수점 결합법칙 (Floating Point Associativity)"
description: "부동소수점 덧셈의 비결합성(Non-Associativity)은 부동소수점 수의 제한된 정밀도로 인해 (a+b)+c != a+(b+c)가 될 수 있는 산술적 특성이다"
tags: ['Floating Point', 'Precision', 'Parallel Computing', 'Numerical Analysis', 'Pitfall']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/floating-point-associativity
sidebar:
  order: 20
---

## 핵심 개념

2의 보수 정수 덧셈은 오버플로우가 발생해도 결합법칙이 성립하지만, 부동소수점 덧셈은 그렇지 않다. 예: c=-1.5x10^38, a=1.5x10^38, b=1.0일 때, c+(a+b)=0.0이지만 (c+a)+b=1.0이다. 1.5x10^38이 1.0보다 너무 크므로 덧셈 결과가 변하지 않기 때문이다. 이는 병렬 프로그래밍에서 심각한 문제가 된다. 순차 코드에서 병렬로 변환할 때 프로세서 수에 따라 덧셈 순서가 바뀌어 매번 다른 결과가 나올 수 있다. 병렬 프로그래머는 수치 해석(numerical analysis) 분야의 지식이 필요하며, LAPACK/SCALAPACK 같은 검증된 수치 라이브러리의 사용이 권장된다.

## 예시

```
# 비결합성 예시:
c = -1.5 × 10^38
a =  1.5 × 10^38
b =  1.0

# 방법 1: c + (a + b)
# a + b = 1.5 × 10^38  (b=1.0은 너무 작아서 무시됨)
# c + (a + b) = -1.5×10^38 + 1.5×10^38 = 0.0

# 방법 2: (c + a) + b
# c + a = 0.0
# (c + a) + b = 0.0 + 1.0 = 1.0

# 0.0 != 1.0 → 결합법칙 불성립!
```

## 관련 개념

- [부동소수점 (Floating Point)](/knowledge/computer-architecture/floating-point/)
- [부동소수점 덧셈 (Floating Point Addition)](/knowledge/computer-architecture/floating-point-addition/)
- [서브워드 병렬성 (Subword Parallelism)](/knowledge/computer-architecture/subword-parallelism/)
