---
title: "List Insertion Sort"
description: "리스트 삽입 정렬(List Insertion Sort)은 직접 삽입 정렬의 자료 구조를 연결 리스트로 변경하여, 레코드를 물리적으로 이동하는 대신 링크 필드를 수정해 삽입 비용을 제거한 방법이다"
tags: ["List Insertion Sort", "Linked List", "Sorting", "TAOCP", "Internal Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/list-insertion-sort
sidebar:
  order: 30
---

## 핵심 개념

**리스트 삽입 정렬(List Insertion Sort)**은 직접 삽입 정렬의 자료 구조를 배열에서 **단방향 연결 리스트(one-way linked list)**로 변경한 방법이다. 레코드를 물리적으로 이동하는 대신 링크 필드를 수정하여 순서를 유지한다.

## 동작 원리

**동기**: 직접 삽입 정렬의 두 가지 기본 연산:
1. 정렬된 파일에서 삽입 위치 찾기 (순차 탐색)
2. 새 레코드를 파일에 삽입

배열 순차 할당: 탐색은 쉽지만 삽입 시 평균 N/2개 레코드 이동 필요.
연결 리스트: 탐색도 순차적으로 쉽고, 삽입 시 **링크 두 개만 변경**.

**Algorithm L (List Insertion)**:
- L0: 머리(head) 링크, L_N: 끝 표시(0)
- j = N-1부터 1까지:
  - p, q 포인터로 정렬된 리스트를 순차 탐색
  - K_j ≤ K_p인 위치(q와 p 사이)를 찾아 Lq←j, Lj←p 설정

**시간 복잡도** (Program L):
- 실행 시간: (7B + 14N - 3A - 6)u
- 직접 삽입 대비 약 **22% 빠름** (이동 비용 제거)
- 여전히 O(N²) - 비교 횟수가 B (역위 수)에 비례

**다중 리스트 삽입 (Algorithm M)**: M개의 리스트로 나누어 관리.
- 키 범위를 M개 구간으로 분할
- 평균 실행 시간: (7B/M + 31N + ...)u → M배 빨라짐
- M = N 설정 시 평균 O(N) (키가 균등 분포 가정)

## 예시

```
리스트 삽입 예 (N=5, 키: 3 1 4 1 5):
초기: L0=5, L5=0  (5→끝)

j=4: K4=1 삽입 → 리스트: 0→4→5
j=3: K3=4 삽입 → 리스트: 0→4→3→5
j=2: K2=1 삽입 → 리스트: 0→2→4→3→5 (안정 정렬)
j=1: K1=3 삽입 → 리스트: 0→2→4→1→3→5

최종 순서: R2(1), R4(1), R1(3), R3(4), R5(5)
```

## 관련 개념

- [Straight Insertion Sort](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [Address Calculation Sorting](/knowledge/algorithms/sorting-selection/address-calculation-sorting/)
- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
- [Linked List](/knowledge/algorithms/linked-list/)
