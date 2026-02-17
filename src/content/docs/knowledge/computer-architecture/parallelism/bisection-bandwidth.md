---
title: "Bisection Bandwidth"
description: "이등분 대역폭(bisection bandwidth)은 멀티프로세서를 두 개의 동일한 부분으로 나눌 때, 가상의 분할선을 넘는 링크들의 대역폭 합이다"
tags: ['Network Topology', 'Multiprocessor', 'Performance Metric', 'Interconnection Network', 'Worst Case']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/bisection-bandwidth
sidebar:
  order: 26
---

## 핵심 개념

이등분 대역폭은 네트워크의 최악 경우 통신 성능을 측정하는 데 사용된다. 일부 네트워크 토폴로지가 대칭적이지 않을 수 있으므로, 이등분 대역폭은 가장 비관적인 분할(가장 작은 이등분 대역폭을 산출하는 분할)을 기준으로 계산한다.

이 비관적 관점은 병렬 프로그램이 통신 체인의 가장 약한 고리에 의해 제한되는 경우가 많기 때문에 중요하다.

총 네트워크 대역폭은 최상 경우의 성능을 나타내므로, 총 대역폭과 이등분 대역폭을 함께 고려해야 네트워크의 실질적인 성능 범위를 이해할 수 있다.

## 예시

```
# 주요 토폴로지의 이등분 대역폭 (B = 링크 대역폭)

버스:           이등분 = 1B
링 (P 노드):    이등분 = 2B
2D 메쉬:        이등분 = √P x B
완전 연결:      이등분 = (P/2)² x B

# 총 대역폭 대 이등분 대역폭 비율 (링)
총 대역폭 / 이등분 대역폭 = PB / 2B = P/2

# 실용적 의미
P=64 노드 링:
  총 대역폭 = 64B (최상 경우)
  이등분 대역폭 = 2B (최악 경우)
  최상/최악 비율 = 32:1
  -> 통신 패턴에 따라 성능이 32배까지 차이날 수 있음
```

## 관련 개념

- [Network Topology](/knowledge/computer-architecture/network-topology/)
- [Cluster](/knowledge/computer-architecture/cluster/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
