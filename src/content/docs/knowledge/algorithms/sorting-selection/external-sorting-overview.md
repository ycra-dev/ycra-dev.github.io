---
title: "외부 정렬 개요 (External Sorting Overview)"
description: "외부 정렬(External Sorting)은 정렬할 레코드가 내부 메모리에 모두 들어가지 않을 때, 자기 테이프·디스크 등 외부 저장 장치의 순차 접근 특성을 고려하여 설계된 정렬 기법이다"
tags: ["External Sorting", "Tape Sorting", "Merge Sort", "Runs", "TAOCP", "Sequential Access"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/external-sorting-overview
sidebar:
  order: 44
---

## 핵심 개념

외부 정렬(External Sorting)은 정렬할 레코드가 컴퓨터의 내부 고속 메모리에 모두 들어가지 않을 때 사용하는 정렬 기법이다. 자기 테이프, 디스크 등 외부 저장 장치의 순차 접근 특성을 고려하여 설계된다.

외부 정렬의 비용 기준: 비교 횟수보다 **입출력(I/O) 시간이 지배적**. 테이프 읽기/쓰기/되감기 횟수 최소화가 목표.

## 동작 원리

**외부 정렬의 기본 전략**: 내부 정렬 → 외부 병합

1. **초기 런(run) 생성**: 내부 메모리에 들어오는 서브파일들을 내부 정렬로 정렬하여 순차적 런으로 만들어 테이프에 기록
2. **다중 병합**: 여러 런을 반복적으로 병합하여 점점 더 긴 런 생성

**용어 정의**:
- **런(Run)**: 정렬된 레코드의 연속 구간
- **균형 병합(Balanced Merge)**: P개와 T-P개 테이프를 두 뱅크로 나눠 번갈아 병합

**균형 2-way 병합 (Balanced Two-way Merge)**:
- 4개 테이프 사용: 테이프 1,2에서 읽어 테이프 3,4로 씀, 반복
- S개 초기 런이면 **⌈log₂ S⌉ 병합 패스** 필요
- 예: 5,000,000 레코드, 내부 메모리 1,000,000 → S=5 런, 3 패스

**P-way 균형 병합 (T개 테이프)**:
- P = ⌊T/2⌋ 선택이 일반적으로 최적
- S개 런에 대해 약 log_P(S) 패스

## 예시

```
5,000,000 레코드, 4-tape 균형 2-way 병합:

초기 분배:
  테이프1: R1..R1M, R3M1..R4M
  테이프2: R1M1..R2M, R4M1..R5M
  (M = 1,000,000)

병합 패스 1 (테이프1+2 → 테이프3+4):
  테이프3: R1..R2M (2M 길이)
  테이프4: R2M1..R4M (2M 길이) + dummy run

병합 패스 2:
  테이프1: R1..R4M (4M)
  테이프2: R4M1..R5M (1M, copy)

병합 패스 3:
  테이프3: R1..R5M (정렬 완료)

총 3 패스 (= ⌈log₂ 5⌉ = 3)
```

## 관련 개념

- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
- [다단계 병합 정렬 (Polyphase Merge Sort)](/knowledge/algorithms/sorting-selection/polyphase-merge-sort/)
- [캐스케이드 병합 정렬 (Cascade Merge Sort)](/knowledge/algorithms/sorting-selection/cascade-merge-sort/)
- [다방향 병합과 선택 트리 (Multiway Merging and Selection Tree)](/knowledge/algorithms/sorting-selection/multiway-merging-selection-tree/)
