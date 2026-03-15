---
title: "진동 정렬 (Oscillating Sort)"
description: "진동 정렬(Oscillating Sort)은 테이프를 순방향과 역방향으로 번갈아 읽으면서 외부 정렬을 수행하는 방법으로, 되감기를 최소화하여 효율을 높인다"
tags: ["Oscillating Sort", "External Sorting", "Tape Sorting", "Read-Backward", "TAOCP", "Merge Patterns"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/oscillating-sort
sidebar:
  order: 47
---

## 핵심 개념

진동 정렬(Oscillating Sort)은 테이프를 순방향과 역방향으로 번갈아 읽으면서 외부 정렬을 수행하는 방법이다. 초기 런 생성과 병합을 교대로 수행하며, 되감기를 최소화하여 효율을 높인다.

## 동작 원리

**기본 아이디어**:
- 내부 메모리를 채워 하나의 초기 런을 생성하고 테이프에 기록
- 이 런과 다른 테이프의 기존 런들을 병합
- 병합 결과를 빈 테이프에 기록하면서 다음 초기 런 생성
- **순방향/역방향 읽기를 교대로 사용하여 되감기 필요 없음**

**Algorithm B** (Oscillating Sort):
- T개 테이프 중 T-1개를 입력, 1개를 출력으로 사용
- 각 단계: (T-1)개 테이프에서 읽어 1개 테이프에 씀
- 쓰기 완료 후 그 테이프를 역방향으로 읽어 다음 단계 입력으로 사용

**특징**:
- **단방향 초기 런**: 역방향 읽기로 인해 대체 선택(Replacement Selection) 사용 불가. 내부 메모리 크기의 고정 런만 생성.
- 런 수 증가: 대체 선택을 못 써서 초기 런이 더 많아짐 (평균 2P 대신 P)

**역방향 읽기의 이점**:
- 되감기 시간 완전 제거
- 특히 되감기가 느린 테이프 장치에서 큰 장점
- 순방향-역방향 전환 시간: 32ms 추가 지연

**Chart A 실험 결과**:
- 역방향 진동: 초기 런 85개임에도 불구하고 빠른 처리
- 역방향 폴리페이즈가 가장 빠르지만 진동 정렬도 경쟁력 있음

## 예시

```
T=4 테이프, 진동 정렬:

단계 1: 내부 정렬로 런 R₁ 생성 → 테이프1에 기록
단계 2: 내부 정렬로 런 R₂, R₃, R₄ 생성 → 각각 테이프2,3,4에 기록
단계 3: 테이프1,2,3,4의 런을 3-way 병합하면서
        동시에 새 런 R₅ 생성
        → 더 긴 런이 테이프1에 역방향으로 기록됨
단계 4: 역방향으로 읽어 테이프2,3,4의 새 런들과 병합
...

결과: 되감기 없이 정렬 완료
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [캐스케이드 병합 정렬 (Cascade Merge Sort)](/knowledge/algorithms/sorting-selection/cascade-merge-sort/)
- [다단계 병합 정렬 (Polyphase Merge Sort)](/knowledge/algorithms/sorting-selection/polyphase-merge-sort/)
- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
