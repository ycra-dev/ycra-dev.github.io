---
title: "Radix Search"
description: "기수 탐색(Radix Search)은 키의 숫자(digit) 또는 비트를 기준으로 탐색 공간을 분할하는 디지털 탐색 방법의 총칭으로, 비교 기반 탐색과 달리 키의 내부 구조를 직접 활용한다"
tags: ["Radix Search", "Searching", "Digital Searching", "Radix", "Bit Manipulation", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/radix-search
sidebar:
  order: 38
---

## 핵심 개념

기수 탐색(Radix Search)은 키의 숫자(digit) 또는 비트를 기준으로 탐색 공간을 분할하는 디지털 탐색 방법의 총칭이다. 비교 기반 탐색과 달리 키의 내부 구조(비트 패턴)를 직접 활용한다.

**핵심 개념:**
- 기수(Radix, Base) M: 탐색 트리의 분기 수 (이진=2, 십진=10 등)
- 각 단계에서 키의 한 디지트(또는 비트 그룹)를 기준으로 M방향 분기
- 키의 길이가 b비트라면 최대 b/log₂M 단계로 완료

## 동작 원리

**M진 디지털 탐색 트리:**
- 각 노드는 M개의 자식 포인터를 보유
- 레벨 k에서 키의 k번째 디지트에 따라 분기
- M=2이면 표준 이진 디지털 탐색 트리
- M=256(바이트)이면 바이트 단위 분기

**성능 분석 (N개 랜덤 이진 키):**
- M=2 (이진): 평균 ≈ log₂ N 비트 검사
- M이 클수록: 트리 높이 감소, 노드당 포인터 증가
- 공간-시간 트레이드오프

**멀티-웨이 기수 탐색:**
- M=2^k: k비트씩 처리하여 트리 높이를 1/k로 줄임
- 캐시 미스 감소 vs 메모리 사용 증가의 트레이드오프
- 실용적으로 M=256(1바이트)이 자주 사용됨

**비교 기반 탐색과의 근본적 차이:**
- 비교 기반: Ω(N log N)의 정보 이론적 하한 존재
- 기수 탐색: 키의 비트 구조를 이용하므로 O(b * N) 가능 (b = 키 비트 수)
- 키가 짧고 고정 길이면 기수 탐색이 압도적으로 유리

## 예시

```
이진 기수 탐색 트리 (4비트 키)
키 집합: {3=0011, 5=0101, 7=0111, 9=1001, 12=1100}

레벨 1 (비트 3 = MSB):
  비트3=0 → 3, 5, 7
  비트3=1 → 9, 12

레벨 2 (비트 2):
  {3,5,7}: 비트2=0 → 3; 비트2=1 → 5, 7
  {9,12}: 비트2=0 → 9; 비트2=1 → 12

레벨 3 (비트 1):
  {5,7}: 비트1=0 → 5; 비트1=1 → 7

결과 트리:
              [MSB=0/1]
             /         \
        [비트2=0/1]    [비트2=0/1]
        /      \        /       \
       3    [비트1]    9        12
            /     \
           5       7

탐색 5=0101:
비트3=0→왼쪽, 비트2=1→오른쪽, 비트1=0→왼쪽 → 키 5 발견
```

## 관련 개념

- [Trie](/knowledge/algorithms/data-structures/trie/)
- [Digital Search Tree](/knowledge/algorithms/data-structures/digital-search-tree/)
- [Patricia Tree](/knowledge/algorithms/data-structures/patricia-tree/)
- [Hash Table](/knowledge/algorithms/hash-table/)
