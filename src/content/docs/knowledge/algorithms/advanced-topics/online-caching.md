---
title: "온라인 캐싱 (Online Caching)"
description: "온라인 캐싱(Online Caching)은 미래의 메모리 접근 패턴을 모른 채 크기 k인 캐시에서 어떤 블록을 교체(evict)할지 결정해야 하는 온라인 문제이다"
tags: ['Online Caching', 'Cache', 'Lru', 'Competitive Analysis', 'Randomized Algorithm']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/online-caching
sidebar:
  order: 14
---

## 핵심 개념

캐시 미스 발생 시 교체 정책(eviction policy)에 따라 알고리즘이 분류된다:

**결정론적 정책과 경쟁비:**
- FIFO (First-In, First-Out): Θ(k)
- LIFO (Last-In, First-Out): Θ(n/k) — unbounded, 매우 나쁨
- LRU (Least Recently Used): Θ(k) — epoch 분석으로 증명
- LFU (Least Frequently Used): unbounded

**하한 정리 (Theorem 27.4)**: 모든 결정론적 온라인 캐싱 알고리즘은 경쟁비 Ω(k)이다. 적대자가 알고리즘이 교체한 블록을 다음에 요청하는 방식으로 최악의 입력을 구성할 수 있기 때문이다.

**무작위화 알고리즘 RANDOMIZED-MARKING:**
- MARKING 알고리즘의 무작위 버전
- 각 블록에 1비트 mark 유지
- 교체 시 unmarked 블록 중 하나를 무작위로 선택
- 경쟁비: O(lg k) — 결정론적 하한 Ω(k)보다 훨씬 우수

**적대자 모델:**
- Oblivious adversary: 무작위 선택 결과를 모름 → O(lg k) 가능
- Nonoblivious adversary: 무작위 선택 결과를 알음 → 결정론적과 동일

최적 오프라인 알고리즘은 Furthest-in-Future (Bélády's algorithm)이다.

## 예시

LRU epoch 분석 (Theorem 27.3):
```
요청 시퀀스를 epoch로 분할 (k=3):
  epoch 1: 1, 2, 5, 2     (k개의 서로 다른 블록 후 끊음)
  epoch 2: 4, 1, 2, 4, 4
  epoch 3: 3, 5, ...

각 epoch에서:
  - LRU: 최대 k번 미스 (각 블록 첫 접근만 미스 가능)
  - 최적: 최소 1번 미스 (epoch 시작 시 반드시 미스)
  경쟁비 ≤ k/1 = k
```

결정론적 하한 구성:
```
캐시 크기 k, 블록 {1, 2, ..., k+1}
초기: 블록 1~k로 캐시 채움
이후: 적대자가 항상 캐시에 없는 블록 요청
  → 온라인: 매번 미스 (n번)
  → 최적: k번 미스 후 매 k번마다 1번 미스
  경쟁비 ≥ n/(k + n/k) = Ω(k)
```

## 관련 개념

- [온라인 알고리즘 (Online Algorithm)](/knowledge/algorithms/online-algorithm/) - 캐싱은 대표적 온라인 문제
- [경쟁 분석 (Competitive Analysis)](/knowledge/algorithms/competitive-analysis/) - 경쟁비 분석 기법 적용
- [전방 이동 (Move-to-Front)](/knowledge/algorithms/move-to-front/) - 유사한 자기 조직화 온라인 알고리즘
- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/) - 탐욕적 교체 정책
