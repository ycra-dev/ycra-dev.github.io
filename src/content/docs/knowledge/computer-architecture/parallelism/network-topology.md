---
title: "Network Topology"
description: "네트워크 토폴로지는 멀티프로세서 시스템에서 코어 또는 서버 노드를 연결하는 상호 연결 네트워크의 구성 방식이다"
tags: ['Interconnection Network', 'Bisection Bandwidth', 'Ring', 'Crossbar', 'Multiprocessor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/network-topology
sidebar:
  order: 25
---

## 핵심 개념

네트워크 성능 평가를 위한 두 가지 주요 지표:
1. **총 네트워크 대역폭(Total Network Bandwidth):** 각 링크의 대역폭 x 링크 수. 최상 경우의 성능을 나타낸다.
2. **이등분 대역폭(Bisection Bandwidth):** 머신을 두 반으로 나눌 때 경계를 넘는 링크의 대역폭 합. 최악 경우의 성능을 나타낸다.

주요 토폴로지:
- **링(Ring):** P개 노드 연결. 총 대역폭 = P x 링크 대역폭, 이등분 대역폭 = 2 x 링크 대역폭
- **완전 연결(Fully Connected):** 모든 노드 쌍에 링크. 총 대역폭 = P(P-1)/2, 이등분 = (P/2)^2. 비용이 매우 높음
- **크로스바(Crossbar):** 모든 노드가 한 번의 네트워크 통과로 통신 가능. n^2 스위치 필요
- **오메가 네트워크:** 크로스바보다 적은 스위치(2n log2 n)로 구성하지만 경쟁이 발생할 수 있음
- **n-큐브(Boolean n-cube):** 2^n 노드, 각 스위치에 n개 링크

실제 구현에서는 링크 길이, 2D 칩 매핑 제약, 에너지 소비 등의 실질적 고려사항이 토폴로지 선택에 영향을 미친다.

## 예시

```
# 토폴로지별 비용-성능 비교 (P=8 노드)

링:
  총 대역폭: 8 x B
  이등분 대역폭: 2 x B
  링크 수: 8

완전 연결:
  총 대역폭: 28 x B
  이등분 대역폭: 16 x B
  링크 수: 28

크로스바 (8x8):
  스위치 수: 64
  모든 조합의 동시 통신 지원

오메가 네트워크:
  스위치 수: 48 (= 2 x 8 x log2(8))
  일부 통신 패턴에서 경쟁 발생
  예: P0->P6과 P1->P4 동시 불가

# 이등분 대역폭 계산
링 (P=8): 가장 비관적 분할 -> 2개 링크 통과
  이등분 대역폭 = 2B
```

## 관련 개념

- [Cluster](/knowledge/computer-architecture/cluster/)
- [Shared Memory Multiprocessor](/knowledge/computer-architecture/shared-memory-multiprocessor/)
- [Multiprocessor](/knowledge/computer-architecture/multiprocessor/)
- [Bisection Bandwidth](/knowledge/computer-architecture/bisection-bandwidth/)
