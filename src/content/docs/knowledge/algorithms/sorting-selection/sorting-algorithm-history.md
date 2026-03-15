---
title: "정렬 알고리즘의 역사 (Sorting Algorithm History)"
description: "정렬 알고리즘의 역사는 1890년 Hollerith의 천공 카드 정렬 기계에서 시작하여 von Neumann, Hoare, Williams 등 컴퓨터 과학의 핵심 인물들의 발견과 맞닿아 있다"
tags: ["Sorting Algorithm History", "History", "Hollerith", "Von Neumann", "TAOCP", "Computing History"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/sorting-algorithm-history
sidebar:
  order: 53
---

## 핵심 개념

정렬 알고리즘의 역사는 19세기 천공 카드 정렬 기계의 발명에서 시작하여 현대 컴퓨터의 초기 개발과 밀접하게 연결되어 있다. 정렬은 컴퓨터 과학의 "여러 최초들"과 함께 발전했다.

## 동작 원리

**주요 역사적 이정표**:

1. **1890년**: Herman Hollerith의 천공 카드 정렬 기계 (미국 인구조사용) → 기수 정렬의 원조

2. **1894년**: John K. Gore의 특허 - 10의 자리 먼저 정렬 제안
   - LSD(1의 자리 먼저) 정렬의 비자명성: 익명의 기계 조작원이 발견

3. **1945년**: John von Neumann이 EDVAC용 내부 병합 정렬 프로그램 작성 → 최초의 저장 프로그램 컴퓨터용 정렬 프로그램

4. **1946년**: John Mauchly의 "Sorting and Collating" 강의 - 최초 공개 출판. 이진 삽입이 O(N log N) 비교를 달성함을 관찰.

5. **1952년**: UNIVAC용 정렬 생성기(sort generator) - 최초의 자동 프로그래밍 소프트웨어

6. **1954-1960년**: 핵심 알고리즘들의 연이은 발견:
   - 1954: Seward - 분배 계수, 대체 선택
   - 1956: Friend - "Sorting on Electronic Computer Systems" 최초 체계적 논문
   - 1959: Shell - Shellsort
   - 1959: Ford-Johnson - 병합 삽입 (최소 비교)
   - 1962: Hoare - Quicksort
   - 1964: Williams - Heapsort
   - 1964: Batcher - 홀짝 병합(merge exchange)
   - 1983: AKS 네트워크 - O(n log n) 비교자로 이론적 최적 달성

## 예시

```
주요 정렬 알고리즘 발견 연표:
1890: 기수 정렬 (Hollerith 기계)
1945: 병합 정렬 (von Neumann)
1954: 대체 선택 (Seward)
1959: 셸 정렬 (Shell)
1959: 병합 삽입 (Ford-Johnson)
1960: 폴리페이즈 병합
1962: 퀵정렬 (Hoare)
1964: Heapsort (Williams)
1964: 병합 교환 (Batcher)
1983: AKS 네트워크
```

## 관련 개념

- [퀵 정렬 (Quicksort)](/knowledge/algorithms/quicksort/)
- [힙 정렬 (Heapsort)](/knowledge/algorithms/heapsort/)
- [기수 정렬 LSD (Radix Sorting LSD)](/knowledge/algorithms/sorting-selection/radix-sorting-lsd/)
- [대체 선택 (Replacement Selection)](/knowledge/algorithms/sorting-selection/replacement-selection/)
- [정렬 네트워크 (Sorting Networks)](/knowledge/algorithms/sorting-selection/sorting-networks/)
