---
title: "External Sort-Merge"
description: "외부 정렬-병합(External Sort-Merge)은 메모리에 담을 수 없는 대규모 릴레이션을 정렬하기 위한 알고리즘으로, 데이터를 정렬된 부분 파일(run)로 나눈 후 이들을 병합하여 전체를 정렬하는 방식이다"
tags: ['Sorting', 'External Sort', 'Merge Sort', 'Query Processing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/external-sort-merge
sidebar:
  order: 4
---

## 핵심 개념

외부 정렬-병합은 두 단계로 수행된다. M을 사용 가능한 메모리 버퍼의 블록 수라 하자.

**1단계: 런 생성(Run Creation)**
릴레이션에서 M개의 블록씩 읽어 메모리에서 정렬한 후, 정렬된 런 파일로 디스크에 기록한다. 이 과정을 릴레이션의 끝까지 반복하면 초기 런의 수는 ⌈b_r/M⌉개가 된다.

**2단계: 병합(Merge)**
런의 수 N이 M보다 작으면, 각 런에 하나의 입력 버퍼 블록을 할당하고 하나의 출력 버퍼를 사용하여 N-way 병합을 수행한다. 각 버퍼 블록에서 정렬 순서에 따라 가장 작은 튜플을 선택하여 출력에 기록한다.

런의 수가 M 이상이면, 다중 패스 병합이 필요하다. 각 패스에서 M-1개의 런을 병합하여 하나의 런으로 만들므로, 매 패스마다 런의 수가 M-1배로 감소한다. 탐색 횟수를 줄이기 위해 각 런에 b_b 블록을 할당하면 ⌊M/b_b⌋-1개의 런을 한 번에 병합할 수 있다.

**비용 분석:**
- 블록 전송 수: `b_r * (2⌈log_{⌊M/b_b⌋-1}(b_r/M)⌉ + 1)`
- 디스크 탐색 수: `2⌈b_r/M⌉ + ⌈b_r/b_b⌉ * (2⌈log_{⌊M/b_b⌋-1}(b_r/M)⌉ - 1)`

정렬은 데이터베이스 시스템에서 매우 중요한데, SQL의 ORDER BY 구현, 중복 제거, 조인 연산(특히 병합 조인) 등 다양한 곳에서 사용되기 때문이다.

## 예시

12개 블록으로 구성된 릴레이션을 메모리 크기 M=3으로 정렬하는 경우:

```
초기 릴레이션: 12블록
  → 런 생성: 3블록씩 읽어 정렬 → 4개의 런 생성 (각 3블록)
  → 병합 패스 1: 2개씩 병합 → 2개의 런 (각 6블록)
  → 병합 패스 2: 2개 병합 → 1개의 정렬된 릴레이션 (12블록)

블록 전송 수: 12 * (2*2 + 1) = 60 블록 전송
```

b_b=1로 설정한 경우 디스크 탐색 수는:
```
2⌈12/3⌉ + ⌈12/1⌉ * (2*2 - 1) = 8 + 12*3 = 44 탐색
```

## 관련 개념

- [Query Processing](/knowledge/database/query-processing/)
- [Merge Join](/knowledge/database/merge-join/)
- [Query Cost](/knowledge/database/query-cost/)
- [Pipelining](/knowledge/database/pipelining/)
