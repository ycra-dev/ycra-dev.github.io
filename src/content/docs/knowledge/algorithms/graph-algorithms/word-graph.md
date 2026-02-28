---
title: "Word Graph"
description: "영어 단어들을 정점으로 하고 Hamming 거리 1인 단어 쌍을 간선으로 연결하는 그래프 — Lewis Carroll의 Doublets 게임이 기원이며 Stanford GraphBase의 핵심 데이터셋"
tags: ["Graph Theory", "Stanford GraphBase", "Hamming Distance", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/graph-algorithms/word-graph
sidebar:
  order: 35
---

## 핵심 개념

단어 그래프(Word Graph)는 영어 단어들을 정점으로 하고, Hamming 거리 1(즉, 정확히 한 글자만 다른 단어들)을 간선으로 하는 그래프다. Lewis Carroll이 1877년 "Doublets" 게임으로 처음 소개했다.

## 동작 원리

**Stanford GraphBase (SGB):**
Knuth가 조합론적 알고리즘 실험을 위해 구성한 프로그램과 데이터의 모음.
- 5757개의 5글자 영어 단어 (WORDS 컬렉션)
- 그래프 생성기 30+ 종류

**SGB 단어 그래프의 특성 (words(5757, 0, 0, 0)):**
- 5757개 정점
- 671개의 고립 정점 (이웃이 없는 단어)
- 4493개 정점의 거대 연결 성분
- d(`tears`, `smile`) = 6: 6단계 변환 가능
- d(`world`, `happy`) = ∞: 연결 안 됨

**Lewis Carroll의 게임:**
한 단어를 한 번에 한 글자씩 바꿔 다른 단어로 변환하는 최단 경로 찾기.
예: `head` → `heal` → `teal` → `tell` → `tall` → `tail`

**다양한 그래프 정의:**
- Hamming 거리 1 (기본 Carroll 규칙)
- 길이 4 부분 단어 공유 (더 풍부한 그래프)
- 유클리드 거리 기반

## 예시

```python
def build_word_graph(words):
    """단어 목록에서 Hamming 거리 1인 쌍을 연결하는 그래프 생성"""
    n = len(words)
    adj = [[] for _ in range(n)]
    word_to_idx = {w: i for i, w in enumerate(words)}

    for i, word in enumerate(words):
        # 각 위치에서 다른 글자로 변경
        for pos in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                if c != word[pos]:
                    neighbor = word[:pos] + c + word[pos+1:]
                    if neighbor in word_to_idx:
                        j = word_to_idx[neighbor]
                        if j > i:  # 중복 방지
                            adj[i].append(j)
                            adj[j].append(i)
    return adj

def word_ladder(words, start, end):
    """Lewis Carroll의 단어 사다리: start → end 최단 경로"""
    from collections import deque
    adj = build_word_graph(words)
    word_to_idx = {w: i for i, w in enumerate(words)}

    if start not in word_to_idx or end not in word_to_idx:
        return None

    s, t = word_to_idx[start], word_to_idx[end]
    dist = [-1] * len(words)
    prev = [-1] * len(words)
    dist[s] = 0
    q = deque([s])

    while q:
        u = q.popleft()
        if u == t:
            break
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                prev[v] = u
                q.append(v)

    if dist[t] == -1:
        return None  # 연결되지 않음

    # 경로 복원
    path = []
    v = t
    while v != -1:
        path.append(words[v])
        v = prev[v]
    return list(reversed(path))

# 예시:
# word_ladder(words, 'head', 'tail') → ['head', 'heal', 'teal', 'tell', 'tall', 'tail']
```

## 관련 개념

- [Graph Theory Basics](/knowledge/algorithms/graph-algorithms/graph-theory-basics/)
- [Hamiltonian Path](/knowledge/algorithms/graph-algorithms/hamiltonian-path/)
- [Breadth First Search](/knowledge/algorithms/graph-algorithms/breadth-first-search/)
- [Combinatorial Searching](/knowledge/algorithms/foundations/combinatorial-searching/)
