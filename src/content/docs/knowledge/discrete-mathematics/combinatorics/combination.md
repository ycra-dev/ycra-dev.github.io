---
title: "Combination"
description: "조합(Combination)이란 집합에서 순서를 고려하지 않고 r개의 원소를 선택하는 것이다"
tags: ['Combination', 'R Combination', 'Counting', 'Subset', 'Unordered Selection']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/combination
sidebar:
  order: 5
---

## 핵심 개념

r-조합의 수는 r-순열의 수에서 각 조합 내 원소들의 순서(r!가지)를 제거하여 유도한다:

**C(n, r) = P(n, r) / P(r, r) = n! / (r! * (n-r)!)**

이는 나눗셈 규칙(Division Rule)의 적용이기도 하다. 순서가 있는 배열(순열)을 순서가 없는 선택(조합)으로 변환할 때, 같은 조합에 해당하는 r!개의 순열을 하나로 묶는다.

**중요한 항등식:** C(n, r) = C(n, n-r)

이는 r개를 선택하는 것이 (n-r)개를 제외하는 것과 같기 때문이다. 이 항등식은 대수적 증명뿐 아니라 **조합적 증명(combinatorial proof)**으로도 보일 수 있다. 조합적 증명에는 두 가지 유형이 있다:
1. **이중 계수 증명(double counting proof):** 같은 대상을 두 가지 방법으로 셈
2. **전사 증명(bijective proof):** 두 집합 사이의 전단사 함수를 구성

**반복 허용 조합:** n가지 종류의 원소에서 반복을 허용하여 r개를 선택하는 방법의 수는:
```
C(n + r - 1, r) = C(n + r - 1, n - 1)
```
이는 **별과 막대(Stars and Bars)** 기법으로 증명한다.

## 예시

**포커 핸드:**
52장의 카드에서 5장을 선택하는 방법의 수:
```
C(52, 5) = 52! / (5! * 47!)
         = (52 * 51 * 50 * 49 * 48) / (5 * 4 * 3 * 2 * 1)
         = 2,598,960
```

**비트 문자열:**
길이 n인 비트 문자열 중 정확히 r개의 1을 포함하는 것의 수:
```
C(n, r)  (1의 위치 r개를 n개의 위치에서 선택)
```

**위원회 구성:**
수학과 교수 9명에서 3명, CS 교수 11명에서 4명을 뽑아 위원회를 구성하는 방법:
```
C(9, 3) * C(11, 4) = 84 * 330 = 27,720
```

**항등식 검증:**
```
C(52, 5) = C(52, 47) = 2,598,960
5장 선택 = 47장 제외 선택
```

## 관련 개념

- [Permutation](/knowledge/mathematics/permutation/) - 순서를 고려하는 배열 (조합 x r!가지 순서 = 순열)
- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - C(n, r)은 이항계수로도 불림
- [Binomial Theorem](/knowledge/mathematics/binomial-theorem/) - 이항계수가 이항 전개의 계수로 등장
- [Set](/knowledge/mathematics/set/) - r-조합은 크기 r인 부분집합
- [Bijection](/knowledge/mathematics/injection-surjection-bijection/) - 전사 증명에 사용
