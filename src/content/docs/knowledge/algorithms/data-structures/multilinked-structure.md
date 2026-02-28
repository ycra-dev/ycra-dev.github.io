---
title: "Multilinked Structure"
description: "각 노드가 여러 방향의 링크를 가져 복수의 선형 리스트나 트리에 동시에 속할 수 있는 복합 자료구조"
tags: ["Data Structures", "Linked List", "Algorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/multilinked-structure
sidebar:
  order: 27
---

## 핵심 개념

다중 연결 구조(Multilinked Structure)는 각 노드가 여러 개의 링크 필드를 가져 동시에 복수의 연결 리스트나 트리에 속할 수 있는 자료구조다.

TAOCP Vol.1, Section 2.2.6에서 Knuth는 다중 연결 구조를 "자료를 여러 관점에서 동시에 접근해야 할 때" 사용하는 핵심 기법으로 소개한다. 희소 행렬(sparse matrix)이 대표적인 응용이다.

## 동작 원리

**기본 아이디어**: 하나의 노드가 여러 선형 순서에 동시에 참여:
```
노드 구조 예시 (희소 행렬):
[행번호 | 열번호 | 값 | 행 RLINK | 열 DOWN LINK]
```

**희소 행렬의 다중 연결 구조** (Knuth의 방식):
- 각 행이 독자적인 이중 원형 연결 리스트를 형성
- 각 열이 독자적인 이중 원형 연결 리스트를 형성
- 비영(nonzero) 원소 노드가 두 리스트 모두에 동시에 속함

```
행 헤더: [H1] ↔ [원소(1,2,5)] ↔ [원소(1,4,3)] ↔ [H1]
열 헤더: [H2] ↔ [원소(1,2,5)] ↔ [원소(3,2,7)] ↔ [H2]
```

**Dancing Links의 기반**: Knuth가 2000년 제안한 Exact Cover 풀이 알고리즘은 이중 원형 연결 리스트의 다중 연결 구조를 사용한다. 삭제 후 복원이 O(1)인 성질을 활용.

**기타 응용**:
- **항공편 예약 시스템**: 동일한 항공편 데이터가 날짜별, 목적지별, 좌석 등급별 리스트에 동시에 연결
- **도서 데이터베이스**: 같은 책이 저자별, 제목별, 분류별 색인에 동시에 속함
- **게임 엔진**: 물리 엔진과 렌더링 엔진이 동일한 객체를 각자의 리스트로 관리

## 예시

희소 행렬의 다중 연결 구조 구현:

```python
class MatrixNode:
    """희소 행렬의 다중 연결 노드"""
    def __init__(self, row, col, val):
        self.row = row
        self.col = col
        self.val = val
        self.row_prev = self.row_next = self  # 행 리스트 링크
        self.col_prev = self.col_next = self  # 열 리스트 링크

def insert_into_row(header, node):
    """노드를 행 헤더의 이중 원형 리스트에 삽입"""
    node.row_prev = header.row_prev
    node.row_next = header
    header.row_prev.row_next = node
    header.row_prev = node

def insert_into_col(header, node):
    """노드를 열 헤더의 이중 원형 리스트에 삽입"""
    node.col_prev = header.col_prev
    node.col_next = header
    header.col_prev.col_next = node
    header.col_prev = node

class SparseMatrixMultilinked:
    def __init__(self, n_rows, n_cols):
        # 행과 열 헤더 (sentinel) 노드 생성
        self.row_headers = [MatrixNode(i, -1, None) for i in range(n_rows)]
        self.col_headers = [MatrixNode(-1, j, None) for j in range(n_cols)]

    def insert(self, row, col, val):
        """비영 원소 삽입: 행 리스트와 열 리스트 모두에 연결"""
        node = MatrixNode(row, col, val)
        insert_into_row(self.row_headers[row], node)
        insert_into_col(self.col_headers[col], node)
        return node

    def row_traverse(self, row):
        """특정 행의 모든 비영 원소 순회"""
        result = []
        curr = self.row_headers[row].row_next
        while curr != self.row_headers[row]:
            result.append((curr.col, curr.val))
            curr = curr.row_next
        return result

    def col_traverse(self, col):
        """특정 열의 모든 비영 원소 순회"""
        result = []
        curr = self.col_headers[col].col_next
        while curr != self.col_headers[col]:
            result.append((curr.row, curr.val))
            curr = curr.col_next
        return result

# 3×4 희소 행렬 예시
# [[5, 0, 0, 3],
#  [0, 0, 7, 0],
#  [0, 2, 0, 0]]
m = SparseMatrixMultilinked(3, 4)
m.insert(0, 0, 5); m.insert(0, 3, 3)
m.insert(1, 2, 7)
m.insert(2, 1, 2)

print("행 0:", m.row_traverse(0))  # [(0, 5), (3, 3)]
print("열 2:", m.col_traverse(2))  # [(1, 7)]
```

## 관련 개념

- [Linked List](/knowledge/algorithms/data-structures/linked-list/)
- [Doubly Linked List](/knowledge/algorithms/data-structures/doubly-linked-list/)
- [Sparse Matrix](/knowledge/algorithms/data-structures/sparse-matrix/)
- [Exact Cover Problem](/knowledge/discrete-mathematics/combinatorics/exact-cover-problem/)
