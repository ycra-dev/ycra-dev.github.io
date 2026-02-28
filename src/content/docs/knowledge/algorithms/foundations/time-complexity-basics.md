---
title: "시간 복잡도 (Time Complexity) - 기초 개념"
description: "알고리즘이 입력 크기 N에 따라 수행하는 연산 횟수의 증가율을 나타내는 척도"
tags: ["Algorithm", "Time-Complexity", "Big-O", "Efficiency"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/time-complexity-basics
sidebar:
  order: 41
---

## 핵심 개념

시간 복잡도는 알고리즘이 입력 크기 N에 따라 수행하는 연산 횟수의 **증가율**을 나타내는 척도이다. 정확한 실행 시간이 아니라 입력이 커질 때 연산량이 어떤 비율로 증가하는지를 표현한다.

## 동작 원리

시간 복잡도는 빅오(Big-O) 표기법으로 표현하며, 알고리즘의 효율성을 하드웨어와 무관하게 비교할 수 있게 해 준다.

주요 복잡도 클래스 (느린 증가 → 빠른 증가 순):

1. **O(log N)** - 로그 시간: 이진 탐색. 데이터가 두 배가 되어도 1단계만 추가.
2. **O(N)** - 선형 시간: 리스트에서 하나씩 확인. 데이터에 비례하여 증가.
3. **O(N log N)** - 선형 로그 시간: 퀵소트 등 효율적 정렬. 실용적 상한선.
4. **O(N²)** - 이차 시간: 선택 정렬, 이중 반복문. 데이터가 커지면 급격히 느려짐.
5. **O(2^N)** - 지수 시간: 부분집합 나열. 입력이 조금만 커져도 사실상 계산 불가능.

핵심 통찰: 하드웨어의 속도 향상(무어의 법칙)으로는 나쁜 알고리즘을 보상할 수 없다. 컴퓨터가 100배 빨라져도 O(2^N) 알고리즘은 입력이 약 7개 더 늘어나는 것만 감당할 수 있다.

## 예시

N = 1,000,000 (백만)일 때 각 복잡도의 연산 횟수:

```
O(log N)     =          20  (이진 탐색)
O(N)         =   1,000,000  (선형 탐색)
O(N log N)   =  20,000,000  (퀵소트)
O(N²)        = 1,000,000,000,000  (선택 정렬)
O(2^N)       = 우주의 나이보다 오래 걸림
```

1초에 1억 번 연산하는 컴퓨터에서:
- O(N log N)으로 백만 개 정렬: 약 0.2초
- O(N²)으로 백만 개 정렬: 약 2.8시간

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm-basics/) - 시간 복잡도가 측정하는 대상
- [이진 탐색 (Binary Search)](/knowledge/algorithms/binary-search-basics/) - O(log N) 복잡도의 대표적 예시
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm-basics/) - O(N²)과 O(N log N)의 차이를 보여주는 예시
- [NP-완전 (NP-Completeness)](/knowledge/algorithms/np-completeness/) - 다항 시간 내 해결이 불가능할 수 있는 문제들

## 출처

- Understanding the Digital World, Chapter 4
