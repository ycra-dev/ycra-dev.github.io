---
title: "Address Calculation Sorting"
description: "주소 계산 정렬(Address Calculation Sorting)은 각 레코드의 키 값으로부터 최종 저장 위치를 직접 계산하여, 키가 균등 분포일 때 평균 O(N) 정렬을 달성하는 방법이다"
tags: ["Address Calculation Sorting", "Distribution Sort", "TAOCP", "Bucket Sort", "Internal Sorting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/address-calculation-sorting
sidebar:
  order: 31
---

## 핵심 개념

**주소 계산 정렬(Address Calculation Sorting)**은 각 레코드의 키 값으로부터 최종 저장 위치(또는 대략적 위치)를 직접 계산하여, 비교 횟수와 이동 횟수를 줄이는 정렬 방법이다. Isaac과 Singleton(1956)이 최초 제안했다.

**기본 아이디어**: 책을 알파벳 순으로 정리할 때, 각 책의 제목 첫 글자만으로 대략적 위치를 추정하고 그 위치에 배치하는 것과 유사하다.

## 동작 원리

**다중 리스트 삽입 (Algorithm M)**:
- 키 범위를 M개 구간으로 균등 분할
- 각 레코드를 키 값으로 해당 구간(리스트)을 결정
- 각 리스트 내에서 리스트 삽입 정렬 적용
- 최종적으로 M개 리스트를 하나로 합병

**평균 시간 복잡도** (키가 균등 분포 가정):
- 총 실행 시간: 7B + 31N - 3A + 4M + 2 단위
- B의 평균: 약 N²/(4M) (M개의 독립 리스트 효과)
- **M = N 설정 시: 약 34.36N 단위 → O(N) 정렬!**
- M = √N: 약 41.95N 단위
- M = N²: 약 52.74N 단위 (오버헤드 증가)

**제약 조건**: 키가 비교적 균등하게 분포되어야 함. 키가 편중되면 한 리스트에 집중되어 O(N²) 최악 케이스.

**Distribution Counting Sort**: 정수 키에 대해 각 키 값의 빈도를 세어 최종 위치를 직접 계산하는 특수 케이스. 추가 공간 O(M), 시간 O(N+M).

## 예시

```python
def address_calculation_sort(a, M=None):
    """다중 리스트 삽입 정렬"""
    n = len(a)
    if M is None:
        M = n  # M = N 설정

    buckets = [[] for _ in range(M)]
    min_val, max_val = min(a), max(a)
    for x in a:
        idx = int((x - min_val) / (max_val - min_val + 1) * M)
        idx = min(idx, M - 1)
        # 버킷 내 삽입 정렬
        pos = len(buckets[idx])
        while pos > 0 and buckets[idx][pos-1] > x:
            pos -= 1
        buckets[idx].insert(pos, x)

    return [x for bucket in buckets for x in bucket]

# 예: M=4, 16개 키 (0-999 균등 분포)
# 버킷 1 (0-249): 087, 061, 170, 154
# 버킷 2 (250-499): 275, 426
# 버킷 3 (500-749): 503, 512, 509, 612, 677, 653, 703
# 버킷 4 (750-999): 908, 897, 765
```

## 관련 개념

- [List Insertion Sort](/knowledge/algorithms/sorting-selection/list-insertion-sort/)
- [Straight Insertion Sort](/knowledge/algorithms/sorting-selection/straight-insertion-sort/)
- [Radix Sorting (LSD)](/knowledge/algorithms/sorting-selection/radix-sorting-lsd/)
- [Bucket Sort](/knowledge/algorithms/bucket-sort/)
