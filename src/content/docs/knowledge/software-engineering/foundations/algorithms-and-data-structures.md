---
title: "알고리즘과 자료구조"
description: "알고리즘은 문제를 해결하는 일반적인 방법이고, 자료구조는 데이터를 효율적으로 저장하고 조직하는 방식이다. 이 둘을 함께 알면 같은 문제를 며칠이 아닌 한 시간에 해결할 수 있다."
tags: ["Software Engineering", "Algorithms", "Data Structures", "Computer Science"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/algorithms-and-data-structures
sidebar:
  order: 36
---

## 핵심 개념

알고리즘과 자료구조를 아는 개발자와 모르는 개발자는 같은 문제를 푸는 데 걸리는 시간이 하루와 1시간만큼 차이 날 수 있다. 컴퓨터 과학 학위 프로그램의 핵심이자, 기술 면접(Microsoft, Google 등)에서 반드시 검증하는 영역이다.

모든 소프트웨어 개발자가 알아야 할 핵심 자료구조:
- **배열/벡터(Arrays/Vectors)**: 연속된 메모리에 저장되는 동일 타입 데이터 모음
- **연결 리스트(Linked Lists)**: 노드가 포인터로 연결된 데이터 구조
- **스택(Stacks)**: LIFO(Last In, First Out) 원칙의 데이터 구조
- **큐(Queues)**: FIFO(First In, First Out) 원칙의 데이터 구조
- **트리(Trees)**: 계층적 데이터 구조
- **해시맵(Hashes)**: 키-값 쌍으로 O(1) 검색을 제공하는 구조
- **집합(Sets)**: 중복을 허용하지 않는 데이터 모음

## 동작 원리

알고리즘의 핵심은 **시간 복잡도**다. 같은 문제를 O(n²)으로 풀 수도 있고 O(n)으로 풀 수도 있다. 자료구조를 제대로 선택하면 복잡도를 극적으로 줄일 수 있다.

코딩 챌린지(TopCoder, LeetCode)를 통해 알고리즘을 연습하면 문제 유형의 패턴을 인식하게 된다. 다른 사람의 풀이를 분석하면 자신이 상상하지 못한 방식으로 언어를 사용하는 것을 발견할 수 있다.

## 예시

```python
# 해시맵을 활용한 효율적 문제 해결
# 문제: 배열에서 합이 target인 두 수의 인덱스 찾기

# 비효율적 방법: O(n^2)
def two_sum_brute(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

# 해시맵 활용: O(n)
def two_sum_hash(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

## 관련 개념

- [객체지향 설계 (Object-Oriented Design)](/knowledge/software-engineering/design-and-evolution/object-oriented-design/)
- [Coding Challenges](/knowledge/career/professional-development/coding-challenges/)
- [Computer Science Degree](/knowledge/career/professional-development/computer-science-degree/)
