---
title: "카르노 맵 (Karnaugh Map)"
description: "카르노 맵(Karnaugh map, K-map)은 불리언 함수의 곱의 합 전개를 최소화하기 위한 시각적 방법으로, 각 셀이 하나의 최소항을 나타내는 직사각형 격자이다"
tags: ['Karnaugh Map', 'K Map', 'Circuit Minimization', 'Prime Implicant', 'Boolean Simplification', 'Discrete Mathematics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/karnaugh-map
sidebar:
  order: 7
---

## 핵심 개념

1953년 Maurice Karnaugh가 고안한 K-맵은 6개 이하의 변수를 가진 불리언 함수의 최소화에 주로 사용된다.

**K-맵의 구조**:
- 2변수: 2×2 격자 (4셀)
- 3변수: 2×4 격자 (8셀) — 원통 위에 놓인 것으로 간주
- 4변수: 4×4 격자 (16셀) — 토러스 위에 놓인 것으로 간주
- n변수: 2^⌊n/2⌋ × 2^⌈n/2⌉ 격자

행과 열은 **그레이 코드(Gray code)** 순서로 배열하여 인접 셀이 정확히 하나의 변수만 다르게 한다. 4변수 K-맵의 행/열 순서는 00, 01, 11, 10이다.

**인접성(Adjacency)**: 첫 행과 마지막 행, 첫 열과 마지막 열은 인접한 것으로 간주한다 (원통/토러스 구조).

**핵심 용어**:
- **함의항(Implicant)**: K-맵에서 모두 1인 셀들의 블록에 대응하는 리터럴의 곱. 이 곱이 1이면 원래 함수도 반드시 1이다.
- **주요 함의항(Prime Implicant)**: 더 큰 블록에 포함되지 않는 함의항. 리터럴을 하나라도 제거하면 더 이상 함의항이 아닌 곱.
- **필수 주요 함의항(Essential Prime Implicant)**: 어떤 1-셀을 유일하게 포함하는 주요 함의항. 반드시 최소화 결과에 포함되어야 한다.

**최소화 절차**:
1. K-맵에 각 최소항에 해당하는 셀에 1을 표시
2. 모든 주요 함의항을 식별 (가장 큰 2^k 크기의 직사각형 블록)
3. 필수 주요 함의항을 먼저 선택
4. 나머지 1-셀을 덮기 위해 추가 주요 함의항 선택
5. 선택된 블록에 대응하는 곱의 합이 최소화된 표현

**블록과 리터럴의 관계**:
- 2^k개의 셀을 포함하는 블록은 n - k개의 리터럴의 곱에 대응
- 예: 3변수에서 2셀 블록 → 2개 리터럴, 4셀 블록 → 1개 리터럴, 8셀 블록 → 상수 1

## 예시

**예시 1: 3변수 K-맵 최소화**

F = xyz + xȳz̄ + x̄yz + x̄ȳz̄ + xȳz의 K-맵:

```
        yz   yz̄   ȳz̄   ȳz
   x  [  1 ][ 0 ][ 1 ][ 1 ]
   x̄  [  1 ][ 0 ][ 1 ][ 0 ]
```

블록 식별:
- {xyz, x̄yz} → yz (2셀, 세로 블록)
- {xȳz̄, x̄ȳz̄} → ȳz̄ (2셀, 세로 블록)
- {xȳz̄, xȳz} → xȳ (2셀, 가로 블록)

최소 표현: yz + ȳz̄ + xȳ 또는 다른 조합 가능

**예시 2: 4변수 K-맵 최소화**

F = wxyz + wxyz̄ + wx̄yz̄ + wx̄ȳz̄ + w̄xyz + w̄xȳz + ... 등의 경우:

4변수 K-맵 구조 (행: wx, 열: yz):
```
         yz   yz̄   ȳz̄   ȳz
   w̄x̄  [    ][    ][    ][    ]
   w̄x  [    ][    ][    ][    ]
   wx  [    ][    ][    ][    ]
   wx̄  [    ][    ][    ][    ]
```

4셀 블록(2×2 또는 4×1): 2개의 리터럴의 곱
8셀 블록: 1개의 리터럴
16셀 블록: 상수 1

**예시 3: Don't Care 조건 활용**

BCD(binary coded decimal)에서 5 이상인 자릿수를 감지하는 회로:
- 10~15에 해당하는 입력 조합은 발생하지 않으므로 don't care (d)
- d를 1로 처리하여 더 큰 블록을 형성 가능
- 최적화 결과: F(w,x,y,z) = w + xy + xz

don't care 없이: wx̄y + wxy + wxz (더 복잡)
don't care 활용: w + xy + xz (더 간단)

## 관련 개념

- [Minterm](/knowledge/mathematics/minterm/) - K-맵의 각 셀이 하나의 최소항을 나타냄
- [Sum-of-Products Expansion](/knowledge/mathematics/sum-of-products-expansion/) - K-맵으로 최소화하는 대상
- [Boolean Algebra](/knowledge/mathematics/boolean-algebra/) - 인접 셀 결합의 이론적 근거
- [Logic Gate](/knowledge/mathematics/logic-gate/) - 최소화된 식으로 더 효율적인 회로 구현
- [Quine-McCluskey Method](/knowledge/mathematics/quine-mccluskey-method/) - K-맵의 알고리즘적 대안
