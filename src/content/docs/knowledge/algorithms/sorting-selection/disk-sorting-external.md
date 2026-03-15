---
title: "디스크 정렬 (Disk Sorting)"
description: "디스크 정렬(Disk Sorting)은 자기 디스크나 드럼 같은 랜덤 접근 외부 저장 장치를 사용한 외부 정렬 기법으로, 탐색(seek) 시간 최소화가 핵심이다"
tags: ["Disk Sorting", "External Sorting", "Random Access", "Striping", "Seek Time", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/disk-sorting-external
sidebar:
  order: 52
---

## 핵심 개념

디스크 정렬(Disk Sorting)은 자기 디스크나 드럼 같은 랜덤 접근 외부 저장 장치를 사용한 외부 정렬 기법이다. 테이프와 달리 임의 위치에 직접 접근할 수 있어 다른 알고리즘 전략이 가능하다.

## 동작 원리

**디스크 vs 테이프**:
- 테이프: 순차 접근만 가능, 되감기 필요
- 디스크: 임의 접근 가능, **탐색(seek) 시간이 핵심 비용**
- 1980년대 이후 디스크가 테이프를 거의 대체

**디스크 비용 모델**:
- 탐색 시간(seek time): 헤드 이동 시간
- 회전 지연(rotational latency): 원하는 섹터가 헤드 아래로 올 때까지 대기
- 전송 시간: 실제 데이터 읽기/쓰기 시간
- **최적화 목표**: 탐색 시간 최소화

**디스크 정렬 전략**:

1. **스트라이핑(Striping)**: D개 디스크에 데이터를 라운드 로빈으로 분배
   - 병렬 입출력으로 전송 대역폭 D배 향상
   - 랜덤 스트라이핑: 더 균등한 부하 분산

2. **최적 병합 트리**: 디스크에서 읽기 비용이 비균일할 때 가중치 있는 최적 트리 사용 (Huffman 트리 유사)

3. **직교 배치 (Orthogonal Allocation)**: 각 런의 k번째 블록을 k번 실린더에 배치 → 병합 시 헤드 이동 최소화

**Randomized Striping** (현대적 방법):
각 런의 블록을 랜덤하게 D개 디스크에 분배. 탐색 패턴이 랜덤하므로 평균 탐색 시간 분석 가능.

**실용적 성능 벤치마크**:
- 1996년: IBM RS/6000으로 100만 레코드(100자) 정렬에 5.1초
- 1997년: 32 UltraSPARC 워크스테이션으로 2.41초
- 테라바이트 정렬: 559개 디스크 시스템으로 2.5시간 (1997년)

## 예시

```
D=4 디스크, P=8 런 병합, 스트라이핑:

런 배치:
  런1 블록: D1, D2, D3, D4, D1, D2, ...
  런2 블록: D2, D3, D4, D1, D2, D3, ...
  ...

병합 시 순서대로 읽으면:
  시간 t1: D1에서 런1의 첫 블록, D2에서 런2의 첫 블록, ...
  (4개 디스크 동시 읽기)

병목: 가장 많이 요청받는 디스크가 결정
랜덤 스트라이핑으로 균등 분산 달성
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [다단계 병합 정렬 (Polyphase Merge Sort)](/knowledge/algorithms/sorting-selection/polyphase-merge-sort/)
- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
