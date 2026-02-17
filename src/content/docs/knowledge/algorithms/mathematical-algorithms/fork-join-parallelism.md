---
title: "Fork-Join Parallelism"
description: "Fork-join 병렬성은 태스크 병렬 프로그래밍 모델의 가장 기본적인 형태로, spawn(분기)과 sync(합류) 키워드를 사용하여 서브루틴을 병렬로 실행하고 결과를 동기화하는 계산 모델이다"
tags: ['Fork Join Parallelism', 'Parallel Computing', 'Task Parallelism', 'Multicore', 'Concurrency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/fork-join-parallelism
sidebar:
  order: 15
---

## 핵심 개념

Fork-join 모델에서는 세 가지 병렬 키워드를 사용한다:
- **spawn**: 자식 서브루틴을 분기하여 부모와 병렬로 실행 가능하게 한다
- **sync**: 분기된 모든 자식이 완료될 때까지 대기한다
- **parallel for**: 루프의 반복을 병렬로 실행한다

이 모델의 핵심 특징은 프로그래머가 어떤 태스크가 병렬로 실행 *가능*한지만 명시하고, 실제 스케줄링은 런타임 시스템이 담당한다는 것이다. 직렬 투영(serial projection)은 병렬 키워드를 제거하면 동일 문제를 해결하는 직렬 알고리즘이 된다.

실행은 DAG(방향 비순환 그래프)로 모델링되며, 각 정점은 strand(연속 명령어 체인)이고, 간선은 의존성을 나타낸다. 이상적 병렬 컴퓨터에서 순차적 일관성(sequential consistency)을 가정한다.

## 예시

피보나치 수열의 병렬 계산:

```
P-FIB(n)
1  if n <= 1
2      return n
3  else x = spawn P-FIB(n - 1)   // 분기
4      y = P-FIB(n - 2)           // 부모 계속 실행
5      sync                        // 동기화
6      return x + y
```

행렬-벡터 곱셈의 parallel for 사용:
```
P-MAT-VEC(A, x, y, n)
1  parallel for i = 1 to n
2      for j = 1 to n
3          y_i = y_i + a_ij * x_j
```

## 관련 개념

- [Work](/knowledge/algorithms/work/) - 병렬 계산의 총 작업량
- [Span](/knowledge/algorithms/span/) - 임계 경로의 길이
- [Speedup](/knowledge/algorithms/speedup/) - 병렬화로 인한 성능 향상 비율
- [Parallelism](/knowledge/algorithms/parallelism/) - 병렬성 정도
- [Parallel Merge Sort](/knowledge/algorithms/parallel-merge-sort/) - fork-join을 활용한 병합 정렬
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/) - 재귀적 spawn으로 자연스러운 병렬화
