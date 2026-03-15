---
title: "대체 선택 (Replacement Selection)"
description: "대체 선택(Replacement Selection)은 외부 정렬의 초기 런 생성 단계에서 내부 메모리 크기 P보다 더 긴 런을 생성하는 기법으로, 눈덮개(snowplow) 분석으로 평균 런 길이 ≈ 2P를 증명한다"
tags: ["Replacement Selection", "External Sorting", "Run Generation", "Selection Tree", "TAOCP", "Snowplow"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/replacement-selection
sidebar:
  order: 49
---

## 핵심 개념

대체 선택(Replacement Selection)은 외부 정렬의 초기 런 생성 단계에서 내부 메모리 크기 P보다 더 긴 런을 생성하는 기법이다. P개의 선택 트리를 유지하면서, 출력된 원소 자리에 새 원소를 삽입하여 현재 런이 가능한 한 길게 이어지도록 한다. Harold H. Seward(MIT, 1954)가 최초 기술.

## 동작 원리

**기본 동작**:
1. P개의 레코드를 내부 메모리에 로드하고 선택 트리 구성
2. 최솟값을 출력
3. 다음 입력 레코드 읽기:
   - 새 키 ≥ 방금 출력한 키: 현재 런의 일부로 트리에 삽입
   - 새 키 < 방금 출력한 키: 다음 런에 속함, "대기" 상태로 표시
4. 대기 원소가 P개에 달하면 새 런 시작

**눈덮개 분석 (Snowplow Analogy)** - E. F. Moore 비유:
원형 도로를 운행하는 제설차 모델:
- 눈(레코드)이 균일하게 떨어지고 제설차가 제거
- 한 바퀴에 제거하는 눈의 양 = 도로 위 총 눈의 2배
- 즉, **평균 런 길이 ≈ 2P** (랜덤 데이터)

**런 길이 분석 (Theorem K, Gassner)**:
```
k번째 런:
  k=1: ≈ (e-1)P ≈ 1.718P
  k=2: ≈ 1.952P
  k≥3: ≈ 2P (수렴)
  표준 편차: ≈ √P × (1-way 표준편차)
```

**비정렬 데이터의 이점**: 이미 부분 정렬된 데이터에서는 2P보다 훨씬 긴 런 생성 가능.

## 예시

```
P=4, 입력 데이터: 503 087 512 061 908 170 897 275 653

초기 선택 트리: {503, 087, 512, 061}
챔피언: 061, LASTKEY=0

단계 1: 출력 061, 입력 908 (908 ≥ 061) → 런1에 추가
단계 2: 출력 087, 입력 170 (170 ≥ 087) → 런1에 추가
단계 3: 출력 170, 입력 897 (897 ≥ 170) → 런1에 추가
단계 4: 출력 503, 입력 275 (275 < 503) → 다음 런용 표시
단계 5: 출력 512, 단계 6: 출력 897, 단계 7: 출력 908 → 런1 종료

런1: 061 087 170 503 512 897 908 (7개, P=4보다 큼 ✓)
```

## 관련 개념

- [외부 정렬 개요 (External Sorting Overview)](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [다방향 병합과 선택 트리 (Multiway Merging and Selection Tree)](/knowledge/algorithms/sorting-selection/multiway-merging-selection-tree/)
- [Natural Selection Run Generation](/knowledge/algorithms/sorting-selection/natural-selection-run-generation/)
- [오름차순 런 (Ascending Runs)](/knowledge/algorithms/sorting-selection/ascending-runs/)
