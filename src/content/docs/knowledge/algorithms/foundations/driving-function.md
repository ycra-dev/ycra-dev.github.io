---
title: "Driving Function"
description: "구동 함수(Driving Function)는 마스터 점화식 T(n) = aT(n/b) + f(n)에서 f(n) 부분을 가리키며, 분할 정복 알고리즘에서 문제를 분할하고 부분 문제의 해를 결합하는 데 소요되는 비용을 나타낸다"
tags: ['Driving Function', 'Master Theorem', 'Recurrence', 'Divide And Conquer', 'Watershed Function']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/driving-function
sidebar:
  order: 14
---

## 핵심 개념

마스터 정리에서 점화식의 해를 결정하는 핵심은 구동 함수 f(n)과 분수 함수 n^(log_b a)의 성장률 비교이다.

**분수 함수 (Watershed Function)**: n^(log_b a)
- 재귀 트리의 리프 수와 점근적으로 같다
- a개의 부분 문제를 각각 1/b 크기로 나눌 때 결정되는 "임계" 함수
- "watershed"라는 이름은 이 함수가 해의 특성이 바뀌는 분기점 역할을 하기 때문

**구동 함수와 분수 함수의 비교에 따른 해**:
1. f(n)이 분수 함수보다 **다항식적으로 작으면** -> 리프가 지배 -> T(n) = Theta(n^(log_b a))
2. f(n)과 분수 함수가 **거의 같은 속도**로 성장하면 -> 각 레벨 비용이 비슷 -> 추가 lg n 인자 부여
3. f(n)이 분수 함수보다 **다항식적으로 크면** -> 루트가 지배 -> T(n) = Theta(f(n))

**"다항식적" 비교의 중요성**: 두 함수 사이에 n^epsilon (epsilon > 0) 이상의 차이가 있어야 사례 1 또는 3이 적용된다. 로그적 차이(예: f(n) = n/lg n vs n^(log_b a) = n)는 "갭"에 해당하여 마스터 정리가 적용되지 않는다.

**정규성 조건 (Regularity Condition)**: 사례 3에서는 af(n/b) <= cf(n) (c < 1)이라는 추가 조건이 필요하다. 이는 구동 함수가 국소적으로 느리게 성장하지 않음을 보장한다. 대부분의 실제 함수에서 만족되지만, 진동하는 특수한 함수에서는 실패할 수 있다.

## 예시

다양한 구동 함수와 분수 함수의 비교:

```
1. T(n) = 9T(n/3) + n
   분수 함수: n^(log_3 9) = n^2
   구동 함수: f(n) = n
   비교: n = O(n^(2-1)) -> 다항식적으로 작음 (epsilon=1)
   결과: 사례 1, T(n) = Theta(n^2)

2. T(n) = 2T(n/2) + n
   분수 함수: n^(log_2 2) = n
   구동 함수: f(n) = n
   비교: n = Theta(n * lg^0 n) -> 같은 속도
   결과: 사례 2 (k=0), T(n) = Theta(n lg n)

3. T(n) = 2T(n/2) + n/lg n
   분수 함수: n
   구동 함수: f(n) = n/lg n
   비교: n/lg n은 n보다 느리지만, 다항식적으로 느리지 않음
   결과: 갭! 마스터 정리 적용 불가 (실제 해: Theta(n lg lg n))

4. T(n) = 4T(n/2) + n^1.99
   분수 함수: n^2
   구동 함수: n^1.99
   비교: n^1.99 = O(n^(2-0.01)) -> 다항식적으로 작음
   결과: 사례 1, T(n) = Theta(n^2)
```

## 관련 개념

- [Master Theorem](/knowledge/algorithms/master-theorem/) - 구동 함수를 사용하는 핵심 정리
- [Recurrence](/knowledge/algorithms/recurrence/) - 구동 함수가 포함된 점화식
- [Recursion Tree](/knowledge/algorithms/recursion-tree/) - 구동 함수가 내부 노드 비용에 해당
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/) - 구동 함수는 분할/결합 비용을 나타냄
- [Akra-Bazzi](/knowledge/algorithms/akra-bazzi/) - 구동 함수가 다항식 성장 조건을 만족해야 하는 일반화된 방법
- [Asymptotic Notation](/knowledge/algorithms/asymptotic-notation/) - 함수 간 성장률 비교에 사용되는 표기법
