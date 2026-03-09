---
title: "Quine-McCluskey Method"
description: "Quine-McCluskey 방법은 불리언 함수의 곱의 합 전개를 체계적으로 최소화하는 알고리즘적 절차이다"
tags: ['Quine Mccluskey', 'Circuit Minimization', 'Prime Implicant', 'Boolean Simplification', 'Algorithm', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/quine-mccluskey-method
sidebar:
  order: 8
---

## 핵심 개념

1950년대에 W. V. Quine과 E. J. McCluskey, Jr.가 개발한 이 방법은 두 부분으로 구성된다:
1. **주요 함의항 찾기**: 최소항들을 반복적으로 결합하여 후보 항을 생성
2. **최소 커버 선택**: 모든 최소항을 포함하는 최소 집합을 결정

**1단계: 최소항의 비트 문자열 표현과 그룹화**

각 최소항을 비트 문자열로 표현한다. 변수 xᵢ가 나타나면 i번째 비트 = 1, x̄ᵢ가 나타나면 = 0. 비트 문자열을 1의 개수에 따라 그룹으로 분류한다.

**2단계: 반복적 결합**

1의 개수가 1만큼 다른 그룹 간에 정확히 한 위치만 다른 비트 문자열 쌍을 찾아 결합한다. 결합 시 다른 위치에 대시(–)를 넣는다. 이 과정을 더 이상 결합할 수 없을 때까지 반복한다.

결합 규칙:
- 두 항은 대시가 같은 위치에 있어야 한다
- 대시가 아닌 위치에서 정확히 하나만 달라야 한다
- 결합 시 다른 위치를 대시로 교체

**3단계: 커버 테이블 작성**

결합에 사용되지 않은 항(주요 함의항)으로 행을, 원래 최소항으로 열을 만든다. 주요 함의항이 최소항을 포함하면 X를 표시한다.

**4단계: 필수 주요 함의항 선택**

어떤 열에 X가 하나뿐이면, 해당 행의 주요 함의항은 필수(essential)이며 반드시 포함해야 한다. 필수 주요 함의항이 커버하는 최소항의 열을 제거하고, 다른 주요 함의항의 부분집합인 행도 제거한다. 이 과정을 반복한 후, 남은 최소항을 최소한의 추가 주요 함의항으로 커버한다.

**복잡도**: 이 방법은 지수적 복잡도를 가지며, 실용적으로 10개 이하의 리터럴에서만 사용 가능하다. 불리언 함수 최소화는 NP-완전 문제로 알려져 있다.

## 예시

**예시 1: xyz + xȳz + x̄yz + x̄ȳz + x̄ȳz̄ 의 최소화**

1단계: 비트 문자열과 그룹화

| 최소항 | 비트 문자열 | 1의 개수 |
|--------|-------------|----------|
| xyz    | 111         | 3        |
| xȳz   | 101         | 2        |
| x̄yz   | 011         | 2        |
| x̄ȳz   | 001         | 1        |
| x̄ȳz̄   | 000         | 0        |

2단계: 결합

Step 1 (n-1 변수 항):
```
(1,2): xyz + xȳz → xz     (1-1)
(1,3): xyz + x̄yz → yz     (-11)
(2,4): xȳz + x̄ȳz → ȳz    (-01)
(3,4): x̄yz + x̄ȳz → x̄z    (0-1)
(4,5): x̄ȳz + x̄ȳz̄ → x̄ȳ   (00-)
```

Step 2 (n-2 변수 항):
```
(1,2,3,4): xz + x̄z → z    (--1)
또는: yz + ȳz → z          (--1)
```

결합에 사용되지 않은 항: **z** 와 **x̄ȳ**

3단계: 커버 테이블

|        | xyz | xȳz | x̄yz | x̄ȳz | x̄ȳz̄ |
|--------|-----|------|------|------|------|
| z      | X   | X    | X    | X    |      |
| x̄ȳ    |     |      |      | X    | X    |

4단계: z는 필수 (xyz를 유일하게 커버), x̄ȳ도 필수 (x̄ȳz̄를 유일하게 커버)

**결과: z + x̄ȳ**

**예시 2: 4변수 함수의 최소화 (간략)**

wxyz + wxȳz + w̄xyz + wxyz̄ + wxȳz̄ + w̄x̄yz + w̄x̄ȳz 에 대해:

그룹화 → 결합 → 커버 테이블을 통해:
- 주요 함의항: w̄z, wyz, wxy, xyz
- 필수: w̄z (w̄x̄ȳz 유일 커버), wyz (wxyz̄ 유일 커버)
- 나머지 중 wxy 또는 xyz 하나 선택

결과: w̄z + wyz + wxy 또는 w̄z + wyz + xyz

## 관련 개념

- [Karnaugh Map](/knowledge/mathematics/karnaugh-map/) - Quine-McCluskey의 시각적 대안 (소규모에 적합)
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - 최소화의 출발점이 되는 표현
- [Minterm](/knowledge/mathematics/minterm/) - 비트 문자열로 표현되어 알고리즘에 입력
- [Algorithm](/knowledge/algorithms/algorithm/) - 체계적이고 기계화 가능한 절차
- [Boolean Function](/knowledge/mathematics/boolean-function/) - 최소화하려는 대상 함수
- [Logic Gate](/knowledge/mathematics/logic-gate/) - 최소화된 표현으로 효율적인 회로 구현
