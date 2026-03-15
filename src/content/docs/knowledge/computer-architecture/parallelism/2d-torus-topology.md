---
title: "2D 토러스 토폴로지 (2D Torus Topology)"
description: "2D 토러스 토폴로지는 각 노드가 상하좌우 4개의 이웃과 연결되고, 격자의 가장자리가 반대편 가장자리와 연결되어 도넛 형태를 이루는 네트워크 인터커넥트 구조이다"
tags: ['Interconnect', 'Network Topology', 'Supercomputer', 'All Reduce']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/2d-torus-topology
sidebar:
  order: 27
---

## 핵심 개념

DNN 훈련에서 대부분의 통신 트래픽은 모든 노드로부터 가중치 갱신 값을 수집하는 all-reduce 연산이다. All-reduce는 2D 토러스 토폴로지 위에서 효율적으로 매핑될 수 있어, TPUv3 슈퍼컴퓨터는 이 토폴로지를 채택했다. TPUv3 칩에는 4개의 ICI 링크(각 방향 656 Gbps)가 있어 칩 간 직접 연결이 가능하다. 32x32 2D 토러스(1024 칩)는 64 링크 x 656 Gbps = 42.3 Tbps의 이등분 대역폭을 제공한다. 이는 별도의 InfiniBand 스위치(64 포트, 100 Gbps 링크, 최대 6.4 Tbps 이등분 대역폭) 대비 6.6배 높은 대역폭이며, 네트워크 카드와 스위치 비용, CPU 호스트를 경유하는 통신 지연을 절감한다.

## 예시

```
TPUv3 32x32 2D 토러스:

    ↕         ↕         ↕
← [칩] → ← [칩] → ← [칩] →  (가장자리가 반대편에 연결)
    ↕         ↕         ↕
← [칩] → ← [칩] → ← [칩] →
    ↕         ↕         ↕
← [칩] → ← [칩] → ← [칩] →

총 1024 칩, 각 칩 4개 ICI 링크 (656 Gbps/방향)
이등분 대역폭: 64 × 656 Gbps = 42.3 Tbps
```

## 관련 개념

- [TPUv3 슈퍼컴퓨터 (TPUv3 Supercomputer)](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [이등분 대역폭 (Bisection Bandwidth)](/knowledge/computer-architecture/bisection-bandwidth/)
