---
title: "Internal Sorting Methods Summary"
description: "내부 정렬(Internal Sorting) 알고리즘들의 특성을 비교하고 사용 지침을 제공하는 TAOCP의 종합 정리로, Knuth는 범용으로 퀵정렬을 권장한다"
tags: ["Internal Sorting", "Summary", "Algorithm Selection", "TAOCP", "Comparison", "Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/internal-sorting-summary
sidebar:
  order: 54
---

## 핵심 개념

내부 정렬(Internal Sorting)은 모든 레코드가 컴퓨터의 고속 내부 메모리에 들어갈 때 사용하는 정렬 방법이다. TAOCP Section 5.5는 다양한 내부 정렬 방법들의 특성을 비교 정리한다.

## 동작 원리

**주요 내부 정렬 알고리즘 비교 (Table 1)**:

| 방법 | 평균 시간 | 최악 시간 | 추가 공간 | 특징 |
|------|-----------|-----------|-----------|------|
| 직선 삽입 | N²/4 | N²/2 | O(1) | 소규모(N≤25), 거의 정렬 시 최적 |
| 버블 정렬 | 5.75N²/2 | 7.5N²/2 | O(1) | 실용적 이점 없음 |
| 셸 정렬 | N^(5/4) ~ N log²N | - | O(1) | 중규모(N≤1000), 단순 구현 |
| 분배 계수 | O(N+범위) | O(N+범위) | O(N+범위) | 키 범위 작을 때 최적, 안정적 |
| 주소 계산 | O(N) 평균 | O(N²) | O(N) | 균등 분포 키에 적합 |
| 병합 교환(Batcher) | N log²N | N log²N | O(1) | 병렬 하드웨어에 최적 |
| **퀵정렬** | 1.386N log N | N²/2 | O(log N) | **범용 최선**, 빠른 구현 |
| 힙 정렬 | 2N log N | 2N log N | O(1) | 최악 보장, 최소 공간 |
| 리스트 병합 | N log N | N log N | O(N) | 안정적, 최악 보장 |
| 기수 정렬 | O(N) | O(N) | O(N) | 짧은 키 또는 특수 순서 시 |
| 병합 삽입 | N log N | N log N | O(1) | n≤11 최소 비교 |

**알고리즘 선택 지침 (Knuth의 권장 사항)**:
1. **소규모 N (≤ 25)**: 직선 삽입 (가장 단순, 적은 오버헤드)
2. **중규모 N (≤ 1000)**: 셸 정렬 (단순, 최소 메모리)
3. **대규모 N (일반)**: **퀵정렬** (평균 최선)
4. **최악의 경우 보장 필요**: 힙 정렬 (또는 Introsort)
5. **병렬 하드웨어**: Batcher의 병합 교환
6. **균등 분포 키**: 주소 계산 정렬
7. **안정성 필요**: 리스트 병합 정렬

**퀵정렬이 실용적으로 최선인 이유**:
- 내부 루프가 단순 (피벗과 비교만)
- 피벗을 레지스터에 유지 가능
- 평균 데이터 이동 최소
- 스택 깊이 O(log N)
- 중앙값-3 피벗으로 최악의 경우 매우 드물게 만들 수 있음

**현대적 관점**:
- 캐시 효율 고려 시 퀵정렬이 더 유리
- Introsort (퀵 + 힙 + 삽입 혼합)이 실용적 최선
- Timsort (Python, Java)는 안정적 + 거의 정렬 데이터 최적화

## 예시

```
N=1000 랜덤 데이터 (MIX, 단위 u):
직선 삽입:  ~2,500,000u
퀵정렬:    ~70,000u  (약 36배 빠름)
힙 정렬:   ~110,000u
셸 정렬:   ~100,000u
```

## 관련 개념

- [Quicksort](/knowledge/algorithms/quicksort/)
- [Heapsort](/knowledge/algorithms/heapsort/)
- [Shell's Method](/knowledge/algorithms/sorting-selection/shells-method/)
- [Sorting Algorithm History](/knowledge/algorithms/sorting-selection/sorting-algorithm-history/)
- [Sorting Algorithm](/knowledge/algorithms/sorting-algorithm/)
