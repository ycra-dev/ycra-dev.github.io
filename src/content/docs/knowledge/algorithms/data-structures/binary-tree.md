---
title: "이진 트리 (Binary Tree)"
description: "각 노드가 최대 두 개의 자식(왼쪽, 오른쪽)을 가질 수 있는 트리 자료구조"
tags: ["Data Structures", "Trees", "Algorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/binary-tree
sidebar:
  order: 22
---

## 핵심 개념

이진 트리(Binary Tree)는 각 노드가 최대 두 개의 자식 노드(왼쪽 자식, 오른쪽 자식)를 가질 수 있는 트리 자료구조다. 빈 트리도 이진 트리이며, 왼쪽 자식 트리와 오른쪽 자식 트리를 구분한다.

TAOCP에서 Knuth는 이진 트리를 연결 리스트의 자연스러운 확장으로 설명하며, 각 노드가 두 개의 링크 필드(LLINK, RLINK)를 가진다.

## 동작 원리

**노드 구조**:
```
[INFO | LLINK | RLINK]
```
- INFO: 노드의 데이터
- LLINK: 왼쪽 자식 노드의 포인터 (없으면 Λ)
- RLINK: 오른쪽 자식 노드의 포인터 (없으면 Λ)

**주요 개념**:
- **높이(Height)**: 루트에서 가장 깊은 잎까지의 경로 길이
- **완전 이진 트리(Complete Binary Tree)**: 마지막 레벨을 제외하고 모든 레벨이 완전히 채워진 트리
- **포화 이진 트리(Full Binary Tree)**: 모든 노드가 0개 또는 2개의 자식을 가짐
- **균형 이진 트리**: 모든 노드의 두 서브트리 높이 차이가 1 이하

**n개 노드를 가진 이진 트리의 성질**:
- 잎 노드 수 = 내부 노드 수 + 1 (포화 이진 트리의 경우)
- 높이 h인 완전 이진 트리의 노드 수: 2^h ≤ n ≤ 2^{h+1} - 1
- Λ 링크 수 = 노드 수 + 1 (n개 노드 → n+1개의 빈 링크)

**스레드 이진 트리(Threaded Binary Tree)**: Λ 링크를 중위 순회의 전/후 노드 포인터로 대체. 재귀나 스택 없이 순회 가능.

**이진 트리의 순회**:
- **전위(Preorder)**: 루트 → 왼쪽 → 오른쪽
- **중위(Inorder)**: 왼쪽 → 루트 → 오른쪽
- **후위(Postorder)**: 왼쪽 → 오른쪽 → 루트
- **레벨 순서(Level Order)**: BFS 방식, 레벨별

## 예시

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree():
    """
         1
        / \
       2   3
      / \
     4   5
    """
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    return root

def inorder(root):
    """중위 순회: 4, 2, 5, 1, 3"""
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def height(root):
    """트리 높이 계산"""
    if not root:
        return -1  # Knuth 관례: 빈 트리 높이 = -1
    return 1 + max(height(root.left), height(root.right))

root = build_tree()
print(inorder(root))    # [4, 2, 5, 1, 3]
print(height(root))     # 2

# 스레드 이진 트리 (스택 없이 중위 순회)
def threaded_inorder(root):
    """스레드 트리로 중위 순회 (O(n) 시간, O(1) 추가 공간)"""
    # Morris Traversal 알고리즘
    result = []
    curr = root
    while curr:
        if not curr.left:
            result.append(curr.val)
            curr = curr.right
        else:
            # 중위 전임자 찾기
            prev = curr.left
            while prev.right and prev.right != curr:
                prev = prev.right
            if not prev.right:
                prev.right = curr  # 스레드 설정
                curr = curr.left
            else:
                prev.right = None  # 스레드 제거
                result.append(curr.val)
                curr = curr.right
    return result
```

## 관련 개념

- [Tree Traversal](/knowledge/algorithms/data-structures/inorder-traversal/)
- [이진 탐색 트리 (Binary Search Tree)](/knowledge/algorithms/data-structures/binary-search-tree/)
- [루트 트리 (Rooted Tree)](/knowledge/algorithms/data-structures/rooted-tree/)
- [연결 리스트 (Linked List)](/knowledge/algorithms/data-structures/linked-list/)
