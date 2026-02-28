---
title: "알고리즘 (Algorithm) - 기초 개념"
description: "문제를 해결하기 위한 정확하고 모호하지 않은 단계적 절차로 유한한 시간 내에 반드시 결과를 산출한다"
tags: ["Algorithm", "Problem-Solving", "Computation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/algorithm-basics
sidebar:
  order: 38
---

## 핵심 개념

알고리즘은 문제를 해결하기 위한 **정확하고 모호하지 않은 단계적 절차**로, 유한한 시간 내에 반드시 결과를 산출한다. 기본적인 연산들의 조합으로 구성되며, 입력 데이터를 받아 처리한 뒤 출력 결과를 생성한다.

## 동작 원리

알고리즘의 핵심 특성:
1. **명확성(Unambiguous)**: 각 단계가 정확히 하나의 의미만 가진다.
2. **유한성(Finite)**: 반드시 유한한 단계 후에 종료된다.
3. **입력과 출력**: 입력 데이터를 받아 처리하여 출력 결과를 만든다.
4. **기본 연산으로 구성**: 컴퓨터가 수행할 수 있는 기초적인 연산들의 조합이다.

"세금 양식(tax form)"이 요리법(recipe)보다 알고리즘에 더 적절한 비유이다. 요리법은 "소금을 약간 넣으세요"처럼 모호한 표현을 허용하지만, 세금 양식은 "3번 줄의 값이 4번 줄보다 크면 5번 줄로 가시오"처럼 각 단계가 완전히 명확하다.

동일한 문제를 해결하는 알고리즘이라도 효율성이 크게 다를 수 있다. 데이터를 탐색할 때 선형 탐색은 N번 비교해야 하지만 이진 탐색은 log N번만 비교하면 된다.

## 예시

선형 탐색 vs 이진 탐색 비교 (의사코드):

```
// 선형 탐색: 처음부터 끝까지 하나씩 확인
function linear_search(list, target):
    for each item in list:
        if item == target:
            return found
    return not found

// 이진 탐색: 정렬된 리스트에서 반씩 제거
function binary_search(sorted_list, target):
    low = 0, high = length - 1
    while low <= high:
        mid = (low + high) / 2
        if sorted_list[mid] == target: return found
        if sorted_list[mid] < target: low = mid + 1
        else: high = mid - 1
    return not found
```

세금 양식 비유:

```
1. 총 소득을 1번 줄에 기입하시오.
2. 공제액을 2번 줄에 기입하시오.
3. 1번 줄에서 2번 줄을 빼서 3번 줄에 기입하시오.
4. 3번 줄이 0보다 크면 → 5번 줄로 가시오.
5. 3번 줄이 0 이하이면 → "세금 없음"을 기입하시오.
```

## 관련 개념

- [이진 탐색 (Binary Search)](/knowledge/algorithms/binary-search-basics/) - 알고리즘 효율성을 보여주는 대표적 예시
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm-basics/) - 데이터 정렬을 위한 알고리즘들
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity-basics/) - 알고리즘의 효율성을 측정하는 방법
- [NP-완전 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - 효율적 알고리즘이 알려지지 않은 문제 클래스

## 출처

- Understanding the Digital World, Chapter 4
- The Practice of Programming, Chapter 2
