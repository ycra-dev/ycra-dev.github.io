---
title: "허프만 코딩 (Huffman Coding)"
description: "허프만 코딩(Huffman coding)은 심볼들의 빈도(frequency)를 입력으로 받아, 가능한 모든 이진 접두사 코드(binary prefix code) 중에서 가장 적은 비트를 사용하는 최적의 접두사 코드를 생성하는 탐욕 알고리즘이다"
tags: ['Huffman Coding', 'Prefix Code', 'Data Compression', 'Greedy Algorithm', 'Binary Tree', 'Encoding']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/huffman-coding
sidebar:
  order: 6
---

## 핵심 개념

**접두사 코드(Prefix Code)**:
- 어떤 문자의 코드도 다른 문자 코드의 접두사가 되지 않는 코드
- 예: e=0, a=10, t=11은 접두사 코드 (모호함 없이 디코딩 가능)
- 접두사 코드는 이진 트리로 표현 가능: 왼쪽 간선=0, 오른쪽 간선=1, 잎=문자

**허프만 코딩 알고리즘**:
1. 각 심볼을 하나의 정점으로 하는 포레스트 생성 (가중치 = 빈도)
2. 가장 작은 가중치를 가진 두 트리를 선택
3. 새로운 루트를 만들어 두 트리를 왼쪽/오른쪽 서브트리로 결합
4. 새 트리의 가중치 = 두 서브트리 가중치의 합
5. 트리가 하나 남을 때까지 2-4 반복

**핵심 특성**:
- 빈도가 높은 심볼 → 짧은 코드 (루트에 가까운 잎)
- 빈도가 낮은 심볼 → 긴 코드 (루트에서 먼 잎)
- 탐욕 알고리즘이지만 최적해를 보장 (증명 가능)
- JPEG 이미지 코딩, 데이터 압축에 광범위하게 사용

**변형**:
- 블록 단위 부호화: 단일 심볼 대신 심볼 블록을 인코딩하여 효율 향상
- 적응형 허프만 코딩: 심볼 빈도를 사전에 알지 못할 때 실시간으로 코딩

## 예시

```
심볼과 빈도: A:0.08, B:0.10, C:0.12, D:0.15, E:0.20, F:0.35

구축 과정:
Step 1: A(0.08) + B(0.10) → AB(0.18)
Step 2: C(0.12) + D(0.15) → CD(0.27)
Step 3: AB(0.18) + E(0.20) → ABE(0.38)
Step 4: CD(0.27) + F(0.35) → CDF(0.62)
Step 5: ABE(0.38) + CDF(0.62) → 전체 트리(1.00)

결과 코드:
        (1.00)
       /      \
    (0.38)   (0.62)
    /   \    /    \
  E    (0.18) F   (0.27)
  0.20  / \  0.35  / \
       A   B      C   D

A: 111, B: 110, C: 011, D: 010, E: 10, F: 00

평균 비트 수:
3*0.08 + 3*0.10 + 3*0.12 + 3*0.15 + 2*0.20 + 2*0.35
= 0.24 + 0.30 + 0.36 + 0.45 + 0.40 + 0.70
= 2.45 bits/symbol

(고정 길이 코딩이면 3 bits/symbol → 약 18% 절감)
```

## 관련 개념

- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/) - 허프만 코딩은 탐욕 알고리즘의 대표적 응용
- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - 허프만 트리는 이진 루트 트리
- [Decision Tree](/knowledge/mathematics/decision-tree/) - 코드 생성을 위한 트리 기반 결정 과정
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 허프만 코딩 알고리즘의 절차적 구조
