---
title: "선형 탐사 (Linear Probing)"
description: "선형 탐사(Linear Probing)는 개방 주소법에서 충돌 발생 시 다음 슬롯을 순서대로 탐사하는 가장 단순한 충돌 해결 방법으로, Knuth가 1963년에 정확한 성능 공식을 최초로 증명했다"
tags: ["Linear Probing", "Hashing", "Collision Resolution", "Clustering", "Open Addressing", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/linear-probing
sidebar:
  order: 41
---

## 핵심 개념

선형 탐사(Linear Probing)는 개방 주소법에서 충돌 발생 시 다음 슬롯(+1, +2, ...)을 순서대로 탐사하는 가장 단순한 충돌 해결 방법이다. 구현이 단순하고 캐시 친화적이지만, 1차 군집화(primary clustering) 문제가 있다.

**프로브 시퀀스:**
hᵢ(K) = (h(K) + i) mod M  (i = 0, 1, 2, ...)

## 동작 원리

**Knuth의 정확한 성능 분석 (가장 중요한 결과 중 하나):**

적재율 α = N/M일 때:
- **성공 탐색 평균 프로브 수**: C_n = (1/2) * (1 + 1/(1-α))
- **실패 탐색 평균 프로브 수**: C_n' = (1/2) * (1 + 1/(1-α)²)

이 결과는 Knuth가 1963년에 최초로 증명하였으며, 정보과학에서 가장 중요한 분석 결과 중 하나로 꼽힌다.

**적재율별 성능 비교:**

| α   | 성공 탐색 | 실패 탐색 |
|-----|---------|---------|
| 0.5 | 1.50    | 2.50    |
| 0.7 | 2.17    | 6.06    |
| 0.9 | 5.50    | 50.50   |
| 0.99| 50.5    | 5050.5  |

**1차 군집화(Primary Clustering) 문제:**
연속된 빈 슬롯들이 "클러스터"를 형성하며, 클러스터가 클수록 그 위치에 삽입될 확률이 높아져 클러스터가 더 커지는 양성 피드백 발생. 이는 선형 탐사의 고유한 약점이다.

**군집화 분석:**
- N개의 키가 삽입될 때 클러스터의 평균 크기 ≈ 1/(1-α)
- 최대 클러스터 길이 ≈ O(log N) (평균 경우)
- 최악의 경우 클러스터 길이 O(N)

**Robin Hood 해싱 (최적화):**
삽입 시, 현재 슬롯의 기존 키가 자신의 홈 위치로부터 더 가까이 있으면 새 키와 교체. 탐사 길이 분산을 줄이고 성능을 평준화할 수 있다.

**Knuth의 역사적 메모:**
1963년 Knuth가 화장실에서 이 공식을 처음 유도했다는 일화가 있다.

## 예시

```python
class LinearProbingHashTable:
    def __init__(self, M):
        self.M = M
        self.keys = [None] * M
        self.values = [None] * M
        self.deleted = [False] * M
        self.N = 0

    def hash(self, key):
        return hash(key) % self.M

    def insert(self, key, value):
        i = self.hash(key)
        while self.keys[i] is not None and not self.deleted[i]:
            if self.keys[i] == key:
                self.values[i] = value  # 갱신
                return
            i = (i + 1) % self.M
        self.keys[i] = key
        self.values[i] = value
        self.deleted[i] = False
        self.N += 1

    def search(self, key):
        i = self.hash(key)
        while self.keys[i] is not None:
            if not self.deleted[i] and self.keys[i] == key:
                return self.values[i]
            i = (i + 1) % self.M
        return None

# α=0.5, M=100인 경우:
# 이론적 성공 탐색 평균 = (1 + 1/(1-0.5))/2 = 1.5회
# 이론적 실패 탐색 평균 = (1 + 1/(1-0.5)²)/2 = 2.5회
```

## 관련 개념

- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
- [개방 주소법 (Open Addressing)](/knowledge/algorithms/open-addressing/)
- [이중 해싱 (Double Hashing)](/knowledge/algorithms/data-structures/double-hashing/)
- [적재율 (Load Factor)](/knowledge/algorithms/data-structures/load-factor/)
- [체이닝 (Chaining)](/knowledge/algorithms/chaining/)
