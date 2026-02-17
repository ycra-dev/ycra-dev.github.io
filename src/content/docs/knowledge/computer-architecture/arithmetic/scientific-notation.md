---
title: "Scientific Notation"
description: "과학적 표기법(Scientific Notation)은 소수점 왼쪽에 하나의 숫자만 놓는 수 표현 방식으로, 정규화된(normalized) 형태에서는 선행 0이 없다"
tags: ['Floating Point', 'Normalized Number', 'Exponent', 'Significand']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/scientific-notation
sidebar:
  order: 8
---

## 핵심 개념

부동소수점 표현의 기초가 되는 표기법이다. 예를 들어 1.0 x 10^(-9)은 정규화된 과학적 표기법이지만, 0.1 x 10^(-8)이나 10.0 x 10^(-10)은 정규화되지 않은 형태이다. 이진수에서도 동일한 원리가 적용되어 1.xxxxxxx x 2^yyyy 형태로 표현한다. 정규화된 형태의 장점: (1) 데이터 교환 간소화, (2) 부동소수점 산술 알고리즘 단순화, (3) 불필요한 선행 0을 실제 유효숫자로 대체하여 정확도 향상. IEEE 754 표준에서 정규화된 이진 부동소수점의 선행 1은 암시적으로 처리되어 유효 비트를 하나 더 확보한다.

## 예시

```
# 십진수 과학적 표기법:
# 3,155,760,000 = 3.15576 × 10^9 (정규화됨)
# 0.000000001 = 1.0 × 10^(-9) (정규화됨)
# 0.1 × 10^(-8) → 정규화되지 않음

# 이진수 과학적 표기법:
# 0.5 = 1.0 × 2^(-1) (정규화됨)
# 12 = 1.1 × 2^3 (정규화됨)
# 0.0011 → 1.1 × 2^(-3) (정규화 후)
```

## 관련 개념

- [Floating Point](/knowledge/computer-architecture/floating-point/)
- [IEEE 754 Standard](/knowledge/computer-architecture/ieee-754-standard/)
- [Single Precision](/knowledge/computer-architecture/single-precision/)
- [Double Precision](/knowledge/computer-architecture/double-precision/)
