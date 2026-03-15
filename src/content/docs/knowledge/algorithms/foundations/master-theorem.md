---
title: "마스터 정리 (Master Theorem)"
description: "마스터 정리(Master Theorem)는 T(n) = aT(n/b) + f(n) 형태의 분할 정복 점화식에 대해, 구동 함수(driving function) f(n)과 분수 함수(watershed function) n^(log_b a)의 비교를 통해 세 가지 경..."
tags: ['Master Theorem', 'Recurrence', 'Divide And Conquer', 'Algorithm Analysis', 'Asymptotic Notation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/master-theorem
sidebar:
  order: 12
---

## 핵심 개념

마스터 정리는 점화식을 풀기 위한 가장 간편한 "요리책(cookbook)" 방법이다. a > 0, b > 1인 상수에 대해 T(n) = aT(n/b) + f(n) 형태를 **마스터 점화식**이라 하며, f(n)을 **구동 함수**, n^(log_b a)를 **분수 함수(watershed function)**라 한다.

**세 가지 사례**:

1. **사례 1**: f(n) = O(n^(log_b a - epsilon)), epsilon > 0일 때 -> T(n) = Theta(n^(log_b a))
   - 구동 함수가 분수 함수보다 **다항식적으로 작을 때** 적용
   - 재귀 트리에서 비용이 리프로 갈수록 기하급수적으로 증가하여 리프가 지배

2. **사례 2**: f(n) = Theta(n^(log_b a) * lg^k(n)), k >= 0일 때 -> T(n) = Theta(n^(log_b a) * lg^(k+1)(n))
   - 구동 함수와 분수 함수의 성장률이 **거의 같을 때** 적용
   - k=0이 가장 흔한 경우로, T(n) = Theta(n^(log_b a) * lg n)
   - 각 레벨의 비용이 대략 동일하고, Theta(lg n)개의 레벨이 있음

3. **사례 3**: f(n) = Omega(n^(log_b a + epsilon)), epsilon > 0이고, 정규성 조건 af(n/b) <= cf(n) (c < 1)일 때 -> T(n) = Theta(f(n))
   - 구동 함수가 분수 함수보다 **다항식적으로 클 때** 적용
   - 정규성 조건: 대부분의 다항식적 함수에서 만족됨
   - 재귀 트리에서 루트 비용이 전체를 지배

**적용 불가능한 경우**:
- 사례 1과 2 사이의 갭: f(n)이 분수 함수보다 느리게 성장하지만 다항식적으로 느리지 않은 경우 (예: T(n) = 2T(n/2) + n/lg n)
- 사례 2와 3 사이의 갭: f(n)이 분수 함수보다 빠르게 성장하지만 다항식적으로 빠르지 않은 경우
- 바닥/천장 함수는 무시해도 점근적 해에 영향을 미치지 않음

## 예시

마스터 정리 적용 예시들:

```
1. T(n) = 9T(n/3) + n
   a=9, b=3 -> n^(log_3 9) = n^2
   f(n) = n = O(n^(2-epsilon)), epsilon=1
   사례 1 -> T(n) = Theta(n^2)

2. T(n) = T(2n/3) + 1
   a=1, b=3/2 -> n^(log_(3/2) 1) = n^0 = 1
   f(n) = 1 = Theta(n^0 * lg^0 n)
   사례 2 (k=0) -> T(n) = Theta(lg n)

3. T(n) = 3T(n/4) + n lg n
   a=3, b=4 -> n^(log_4 3) ~= n^0.793
   f(n) = n lg n = Omega(n^(0.793+epsilon))
   정규성 조건: 3(n/4)lg(n/4) <= (3/4)n lg n ✓
   사례 3 -> T(n) = Theta(n lg n)

4. 병합 정렬: T(n) = 2T(n/2) + Theta(n)
   a=2, b=2 -> n^(log_2 2) = n
   f(n) = Theta(n) = Theta(n^1 * lg^0 n)
   사례 2 (k=0) -> T(n) = Theta(n lg n)

5. 슈트라센: T(n) = 7T(n/2) + Theta(n^2)
   a=7, b=2 -> n^(log_2 7) ~= n^2.807
   f(n) = Theta(n^2) = O(n^(2.807-epsilon))
   사례 1 -> T(n) = Theta(n^(lg 7))
```

## 관련 개념

- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/) - 마스터 정리가 풀이하는 대상
- [분할 정복 (Divide and Conquer)](/knowledge/algorithms/divide-and-conquer/) - 마스터 점화식이 모델링하는 알고리즘 패러다임
- [재귀 트리 (Recursion Tree)](/knowledge/algorithms/recursion-tree/) - 마스터 정리의 세 사례에 대한 직관적 이해 제공
- [치환법 (Substitution Method)](/knowledge/algorithms/substitution-method/) - 마스터 정리가 적용되지 않을 때의 대안
- [Akra-Bazzi](/knowledge/algorithms/akra-bazzi/) - 마스터 정리를 일반화한 방법
- [점근 표기법 (Asymptotic Notation)](/knowledge/algorithms/asymptotic-notation/) - 세 사례의 해를 표현하는 표기법
- [병합 정렬 (Merge Sort)](/knowledge/algorithms/merge-sort/) - 사례 2의 대표적 예시
- [슈트라센 알고리즘 (Strassen Algorithm)](/knowledge/algorithms/strassen-algorithm/) - 사례 1의 대표적 예시
