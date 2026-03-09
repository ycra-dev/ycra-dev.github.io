---
title: "Load Factor"
description: "적재율(Load Factor) α는 해시 테이블에서 실제로 저장된 항목 수 N과 테이블 크기 M의 비율(α = N/M)로, 해시 테이블의 성능을 결정하는 가장 중요한 매개변수다"
tags: ["Load Factor", "Hashing", "Performance", "Space Time Tradeoff", "Rehashing", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/load-factor
sidebar:
  order: 43
---

## 핵심 개념

적재율(Load Factor) α는 해시 테이블에서 실제로 저장된 항목 수 N과 테이블 크기 M의 비율이다 (α = N/M). 해시 테이블의 성능을 결정하는 가장 중요한 매개변수로, α가 높을수록 충돌이 많아져 성능이 저하된다.

**정의:**
α = N / M
- N: 저장된 키의 개수
- M: 해시 테이블의 슬롯(버킷) 수

## 동작 원리

**적재율과 성능의 관계:**

방법별 성공 탐색 평균 프로브 수:

| α   | 선형 탐사 | 이중 해싱 | 체이닝 |
|-----|---------|---------|-------|
| 0.5 | 1.50    | 1.39    | 1.25  |
| 0.7 | 2.17    | 1.72    | 1.35  |
| 0.9 | 5.50    | 2.56    | 1.45  |
| 1.0 | ∞       | ∞       | 1.50  |

방법별 실패 탐색 평균 프로브 수:

| α   | 선형 탐사 | 이중 해싱 | 체이닝 |
|-----|---------|---------|-------|
| 0.5 | 2.50    | 2.00    | 0.50  |
| 0.7 | 6.06    | 3.33    | 0.70  |
| 0.9 | 50.50   | 10.0    | 0.90  |

**권장 적재율:**
- 개방 주소법: α ≤ 0.7 (이상적으로 0.5~0.7)
- 체이닝: α ≤ 1.5~2.0

**재해시(Rehashing):**
적재율이 임계값을 초과하면 더 큰 테이블을 새로 할당하고 모든 항목을 재삽입. 통상 α > 0.75일 때 2배 크기로 재해시.

재해시 비용:
- O(N) 시간: 전체 항목 재삽입
- 분할 상환(Amortized): 개별 삽입당 O(1) 기대 시간

**Knuth의 분석 (선형 탐사의 정확한 공식):**
C_N = (1/2)(1 + 1/(1-α))  [성공]
C_N' = (1/2)(1 + 1/(1-α)²)  [실패]

이 공식은 α → 1일 때 성능이 극적으로 나빠짐을 보여준다 (α=0.99면 실패 탐색 5050회!).

**공간-시간 트레이드오프:**
- α 낮음: 빠른 탐색, 메모리 낭비
- α 높음: 메모리 절약, 느린 탐색

## 예시

```python
def linear_probing_cost(alpha, success=True):
    """선형 탐사의 평균 프로브 수"""
    if success:
        return 0.5 * (1 + 1/(1 - alpha))
    else:
        return 0.5 * (1 + 1/(1 - alpha)**2)

def double_hashing_cost(alpha, success=True):
    """이중 해싱의 평균 프로브 수 (균등 탐사 근사)"""
    if success:
        return (1/alpha) * (-math.log(1-alpha)) if alpha > 0 else 1
    else:
        return 1 / (1 - alpha)

def chaining_cost(alpha, success=True):
    """체이닝의 평균 프로브 수"""
    if success:
        return 1 + alpha/2
    else:
        return alpha

# α=0.5 vs α=0.9 성능 차이
alpha_05 = linear_probing_cost(0.5, success=True)  # 1.5
alpha_09 = linear_probing_cost(0.9, success=True)  # 5.5
# 성능 차이: 약 3.7배
```

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Linear Probing](/knowledge/algorithms/data-structures/linear-probing/)
- [Double Hashing](/knowledge/algorithms/data-structures/double-hashing/)
- [Chaining](/knowledge/algorithms/chaining/)
- [Open Addressing](/knowledge/algorithms/open-addressing/)
