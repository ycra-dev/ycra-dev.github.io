---
title: "Sparse Matrix"
description: "대부분의 원소가 0인 행렬을 0이 아닌 원소만 저장하여 메모리와 연산을 효율화하는 자료구조"
tags: ["Data Structures", "Algorithms", "Linear Algebra", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/sparse-matrix
sidebar:
  order: 23
---

## 핵심 개념

희소 행렬(Sparse Matrix)은 대부분의 원소가 0인 행렬로, 0이 아닌 원소(nonzero elements)만 저장하여 메모리와 연산을 효율화한다. m×n 행렬에서 0이 아닌 원소의 수가 O(m+n) 또는 그보다 훨씬 적을 때 사용한다.

## 동작 원리

**표현 방식**:

**1. COO (Coordinate Format)**: 각 0이 아닌 원소를 `(행, 열, 값)` 삼중쌍으로 저장:
```
행 배열: [0, 1, 2, 0, 2]
열 배열: [0, 1, 2, 2, 3]
값 배열: [1, 5, 3, 7, 4]
```

**2. CSR (Compressed Sparse Row)**: 행 기반 압축 형식 (가장 일반적):
```
values:   0이 아닌 값들 (왼쪽→오른쪽, 위→아래 순서)
col_idx:  각 값의 열 인덱스
row_ptr:  각 행의 시작 위치 (크기 = m + 1)
```

**3. CSC (Compressed Sparse Column)**: 열 기반 압축 형식 (CSR의 전치)

**4. 연결 리스트 기반 (TAOCP)**: Knuth의 접근법 — 각 행과 각 열이 이중 원형 연결 리스트를 형성하는 다중 연결 구조:
```
각 원소 노드: [행번호 | 열번호 | 값 | 행링크 | 열링크]
각 행 헤더: 해당 행의 모든 비영 원소 연결
각 열 헤더: 해당 열의 모든 비영 원소 연결
```

**주요 연산 복잡도** (n×n, nnz = 비영 원소 수):
| 연산 | 밀집 행렬 | 희소 행렬 (CSR) |
|------|-----------|-----------------|
| 저장 공간 | O(n²) | O(nnz) |
| 행렬-벡터 곱 | O(n²) | O(nnz) |
| 원소 접근 | O(1) | O(log nnz) |
| 행렬-행렬 곱 | O(n³) | O(nnz × n) |

**응용 분야**: 그래프 알고리즘(인접 행렬), 유한 요소법(FEM), 선형 방정식계 풀기, 추천 시스템(사용자-아이템 행렬)

## 예시

```python
class SparseMatrixCSR:
    """압축 희소 행렬 (CSR 형식)"""
    def __init__(self, dense_matrix):
        self.n_rows = len(dense_matrix)
        self.n_cols = len(dense_matrix[0])
        self.values = []
        self.col_idx = []
        self.row_ptr = [0]

        for row in dense_matrix:
            for j, val in enumerate(row):
                if val != 0:
                    self.values.append(val)
                    self.col_idx.append(j)
            self.row_ptr.append(len(self.values))

    def matvec(self, x):
        """행렬-벡터 곱: O(nnz)"""
        result = [0.0] * self.n_rows
        for i in range(self.n_rows):
            for j_ptr in range(self.row_ptr[i], self.row_ptr[i+1]):
                result[i] += self.values[j_ptr] * x[self.col_idx[j_ptr]]
        return result

    @property
    def nnz(self):
        """비영 원소 수"""
        return len(self.values)

# 예시: 희소 행렬 생성
dense = [
    [1, 0, 0, 7],
    [0, 5, 0, 0],
    [0, 0, 3, 4],
]
sparse = SparseMatrixCSR(dense)
print(f"밀집 표현: {3*4} = 12 원소")
print(f"희소 표현: {sparse.nnz} 원소 (절약률: {1 - sparse.nnz/12:.0%})")

x = [1, 1, 1, 1]
print(f"Ax = {sparse.matvec(x)}")  # [8, 5, 7]
```

## 관련 개념

- [Multilinked Structure](/knowledge/algorithms/data-structures/multilinked-structure/)
- [Linked List](/knowledge/algorithms/data-structures/linked-list/)
- [Array](/knowledge/algorithms/data-structures/array/)
