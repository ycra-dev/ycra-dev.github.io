---
title: "Garbage Collection"
description: "더 이상 참조되지 않는 메모리를 자동으로 회수하는 메모리 관리 기법 — 연결 리스트의 동적 메모리 관리와 직결"
tags: ["Algorithms", "Memory Management", "Systems", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/garbage-collection
sidebar:
  order: 34
---

## 핵심 개념

가비지 컬렉션(Garbage Collection, GC)은 더 이상 사용하지 않는(참조되지 않는) 메모리를 자동으로 감지하고 회수하는 메모리 관리 기법이다. TAOCP Vol.1에서 Knuth는 연결 할당(linked allocation) 방식의 핵심 문제로 이를 다룬다.

**핵심 딜레마**: 연결 리스트에서 노드를 삭제할 때, 그 노드가 다른 곳에서도 참조되고 있을 수 있다. 섣불리 메모리를 해제하면 댕글링 포인터(dangling pointer)가 생긴다.

## 동작 원리

**주요 알고리즘**:

**1. 참조 카운팅 (Reference Counting)**:
각 노드가 자신을 가리키는 포인터 수(참조 수)를 유지:
- 참조 수가 0이 되면 즉시 해제
- 순환 참조(circular reference) 처리 불가 — 치명적 한계

**2. 마크-스윕 (Mark-and-Sweep)**:
가장 기본적인 GC 알고리즘:
```
Phase 1 (Mark):
- 루트 집합에서 시작하여 도달 가능한 모든 노드에 표시
Phase 2 (Sweep):
- 전체 힙을 스캔하여 표시되지 않은 노드를 자유 리스트에 추가
```
- 단점: STW(Stop-The-World) 일시 정지 발생

**3. 복사 GC (Copying GC)**:
힙을 두 반쪽(from-space, to-space)으로 나누어:
- 살아있는 객체만 to-space로 복사
- from-space 전체를 한 번에 해제
- 단편화 없음, 할당 O(1)이지만 메모리 2배 필요

**4. 세대별 GC (Generational GC)**:
"대부분의 객체는 젊은 나이에 죽는다"는 경험적 법칙(Generational Hypothesis) 활용:
- Young generation: 자주 수집 (Minor GC)
- Old generation: 드물게 수집 (Major/Full GC)
- Java, Python, C# 등 현대 언어가 사용

**TAOCP의 관점 (Algorithm C)**: 재귀적 마크 알고리즘으로 연결 리스트 구조에서 도달 가능한 노드를 표시한다. 비재귀 구현(포인터 역전 기법)도 소개한다.

## 예시

참조 카운팅 구현:

```python
class RCNode:
    """참조 카운팅 노드"""
    def __init__(self, value):
        self.value = value
        self.ref_count = 1
        self.next = None

    def add_ref(self):
        self.ref_count += 1

    def release(self):
        self.ref_count -= 1
        if self.ref_count == 0:
            self.destroy()

    def destroy(self):
        print(f"GC: {self.value} 해제")
        if self.next:
            self.next.release()
        self.next = None

# 사용 예
a = RCNode(1)  # ref_count: 1
b = RCNode(2)  # ref_count: 1
a.next = b     # b.ref_count: 2 (a.next → b)
a.release()    # a.ref_count: 0 → a 해제, b.ref_count: 1
b.release()    # b.ref_count: 0 → b 해제

# 순환 참조 문제 (참조 카운팅으로 해결 불가)
x = RCNode("x")
y = RCNode("y")
x.next = y  # y.ref_count: 2
y.next = x  # x.ref_count: 2
# x, y를 외부 참조 해제해도 ref_count가 1로 남아 누수 발생!
```

마크-스윕 간단 구현:

```python
class GCNode:
    all_nodes = []  # 전체 힙 추적

    def __init__(self, value):
        self.value = value
        self.marked = False
        self.children = []
        GCNode.all_nodes.append(self)

def mark(node):
    if node is None or node.marked:
        return
    node.marked = True
    for child in node.children:
        mark(child)

def sweep():
    alive = [n for n in GCNode.all_nodes if n.marked]
    dead = [n for n in GCNode.all_nodes if not n.marked]
    for n in dead:
        print(f"GC: {n.value} 수집")
    GCNode.all_nodes = alive
    for n in alive:
        n.marked = False
```

## 관련 개념

- [Linked List](/knowledge/algorithms/data-structures/linked-list/)
- [Stack](/knowledge/algorithms/data-structures/stack/)
- [Multilinked Structure](/knowledge/algorithms/data-structures/multilinked-structure/)
