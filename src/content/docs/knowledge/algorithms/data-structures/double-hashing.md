---
title: "Double Hashing"
description: "이중 해싱(Double Hashing)은 개방 주소법에서 두 개의 독립적인 해시 함수를 사용하여 탐사 시퀀스를 결정하는 충돌 해결 방법으로, 선형 탐사의 군집화 문제를 해결한다"
tags: ["Double Hashing", "Hashing", "Collision Resolution", "Open Addressing", "Clustering Avoidance", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/double-hashing
sidebar:
  order: 42
---

## 핵심 개념

이중 해싱(Double Hashing)은 개방 주소법에서 두 개의 독립적인 해시 함수를 사용하여 탐사 시퀀스를 결정하는 충돌 해결 방법이다. 선형 탐사의 군집화 문제를 해결하면서 개방 주소법의 메모리 효율을 유지한다.

**탐사 시퀀스:**
hᵢ(K) = (h₁(K) + i * h₂(K)) mod M  (i = 0, 1, 2, ...)

**핵심 조건:**
h₂(K)와 M이 서로소(coprime)여야 전체 탐사가 M개의 슬롯 모두를 방문한다.

실용적 선택:
- M이 소수일 때: h₂(K) = 1 + (K mod (M-1))
- M이 2의 거듭제곱일 때: h₂(K)를 항상 홀수로 설정

## 동작 원리

**성능 분석 (균등 탐사 근사):**
적재율 α = N/M일 때:
- **성공 탐색 평균**: (1/α) * ln(1/(1-α)) ≈ 1/(1-α)
- **실패 탐색 평균**: 1/(1-α)

**적재율별 성능 비교:**

| α   | 이중해싱 성공 | 이중해싱 실패 | 선형탐사 성공 | 선형탐사 실패 |
|-----|------------|------------|------------|------------|
| 0.5 | 1.39       | 2.00       | 1.50       | 2.50       |
| 0.7 | 1.65       | 3.33       | 2.17       | 6.06       |
| 0.9 | 2.56       | 10.0       | 5.50       | 50.50      |

이중 해싱이 실패 탐색에서 선형 탐사보다 크게 우수하다.

**군집화 해결:**
이중 해싱은 두 번째 해시값이 키마다 다르므로, 같은 초기 위치에서 충돌해도 서로 다른 탐사 시퀀스를 따른다. 이를 통해 1차 군집화(선형 탐사)와 2차 군집화(이차 탐사)를 모두 방지한다.

**균등 탐사(Uniform Probing)와의 관계:**
이중 해싱은 각 키가 독립적인 랜덤 탐사 시퀀스를 따른다는 균등 탐사 가정에 가장 근접한 실용적 방법이다. Knuth의 이론적 분석도 균등 탐사 가정 하에 도출됨.

**Brent의 최적화:**
삽입 시 탐사 중인 슬롯의 기존 키를 재배치하여 평균 탐사 길이를 줄이는 방법.

## 예시

```python
class DoubleHashingTable:
    def __init__(self, M):
        # M은 소수여야 최적 성능
        self.M = M
        self.table = [None] * M
        self.N = 0

    def h1(self, key):
        return key % self.M

    def h2(self, key):
        # 두 번째 해시 함수 (M과 서로소)
        return 1 + (key % (self.M - 1))

    def _probe(self, key):
        h = self.h1(key)
        step = self.h2(key)
        for _ in range(self.M):
            yield h
            h = (h + step) % self.M

    def insert(self, key, value):
        for slot in self._probe(key):
            if self.table[slot] is None:
                self.table[slot] = (key, value)
                self.N += 1
                return
            if self.table[slot][0] == key:
                self.table[slot] = (key, value)  # 갱신
                return
        raise Exception("Table is full")

# 예시: M=97 (소수), α≈0.72
# 이론적 성공 탐색 평균 ≈ 1/(0.72) * ln(1/0.28) ≈ 1.75 probes
```

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Open Addressing](/knowledge/algorithms/open-addressing/)
- [Linear Probing](/knowledge/algorithms/data-structures/linear-probing/)
- [Load Factor](/knowledge/algorithms/data-structures/load-factor/)
- [Hash Function](/knowledge/algorithms/hash-function/)
