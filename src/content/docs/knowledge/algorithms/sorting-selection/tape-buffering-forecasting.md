---
title: "테이프 버퍼링과 예측 (Tape Buffering and Forecasting)"
description: "예보 기법(Forecasting)은 다중 웨이 테이프 병합에서 어떤 입력 버퍼가 먼저 소진될지 미리 예측하여 미리 읽기(prefetch)를 수행함으로써 I/O와 계산을 겹쳐 처리하는 기법이다"
tags: ["Tape Buffering", "Forecasting", "External Sorting", "I/O Overlap", "TAOCP", "Prefetch"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/tape-buffering-forecasting
sidebar:
  order: 51
---

## 핵심 개념

예보 기법(Forecasting)은 다중 웨이 테이프 병합에서 입출력 연산과 계산을 최대한 겹쳐 수행하기 위해 어떤 입력 버퍼가 먼저 소진될지 미리 예측하여 미리 읽기(prefetch)를 수행하는 기법이다. F. E. Holberton이 1953년 최초 발견.

## 동작 원리

**핵심 관찰**: 각 블록의 마지막 레코드 키를 보면 어느 버퍼가 먼저 소진될지 알 수 있다. **마지막 레코드 키가 가장 작은 버퍼가 가장 먼저 소진된다.**

**Algorithm F** (예보와 부동 버퍼):
- **버퍼 구성**: 2P개 입력 버퍼 + 2개 출력 버퍼
- **알고리즘 흐름**:
  1. 초기화: 각 파일의 첫 블록 읽기 → L[i] 값 결정
  2. 가장 작은 L[m]을 가진 파일 m 선택 (다음에 비울 파일)
  3. 파일 m에서 다음 블록 미리 읽기 시작
  4. 병합 수행 (I/O와 계산 겹쳐서)
  5. 이전 I/O 완료 시 버퍼 포인터 갱신
  6. 다음 예보 수행, 반복

**부동 버퍼(Floating Buffer)의 장점**:
- 기존 방법(Friend, 1956): 파일당 3개 버퍼 = 3P개 총 필요
- Algorithm F: **2P개로 충분**하면서 테이프를 계속 구동 가능
- 하나의 파일이 최대 P+1개 버퍼를 일시적으로 사용 가능

**버퍼 크기와 블록 크기 선택**:
P-way 병합 시 최적 블록 크기 B:
```
M = (2P 입력 버퍼 + 2 출력 버퍼) × B
즉 B = M / (2P + 2)
```

## 예시

```
P=2, 블록당 2 레코드인 경우:

초기화:
  I[1]: [03, 07] (파일1), L[1]=07
  I[2]: [05, 09] (파일2), L[2]=09
  m=1 (L[1]=07 < L[2]=09), 파일1에서 다음 블록 미리 읽기 시작

병합 단계 1:
  03과 05 비교 → 03 출력
  I[1] 반쯤 소진 → 계속 I[1]에서 읽기

병합 단계 2:
  05와 07 비교 → 05 출력
  출력 버퍼 가득 → 테이프에 출력 시작, m=2 예보, I[2] 미리 읽기 시작

결과: 출력 테이프는 끊김 없이 계속 기록됨 ✓
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [다방향 병합과 선택 트리 (Multiway Merging and Selection Tree)](/knowledge/algorithms/sorting-selection/multiway-merging-selection-tree/)
- [다단계 병합 정렬 (Polyphase Merge Sort)](/knowledge/algorithms/sorting-selection/polyphase-merge-sort/)
