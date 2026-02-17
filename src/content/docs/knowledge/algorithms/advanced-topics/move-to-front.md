---
title: "Move-to-Front"
description: "Move-to-Front(MTF)는 연결 리스트에서 검색된 원소를 리스트의 맨 앞으로 이동시키는 자기 조직화(self-organizing) 온라인 알고리즘으로, 경쟁비 4를 달성한다"
tags: ['Move To Front', 'Linked List', 'Online Algorithm', 'Competitive Analysis', 'Self Organizing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/move-to-front
sidebar:
  order: 15
---

## 핵심 개념

리스트 유지 문제: n개의 원소가 있는 연결 리스트에서 일련의 검색 요청을 처리할 때, 검색 비용과 재배치 비용의 합을 최소화해야 한다.

- 위치 r에 있는 원소 검색 비용: r
- 인접 원소 교환(swap) 비용: 1
- MTF의 비용: 위치 r의 원소를 검색(비용 r) + 앞으로 이동(r-1번 교환) = 2r - 1

**Theorem 27.1**: Move-to-Front는 경쟁비 4를 달성한다.

증명의 핵심 도구:
1. **역전(Inversion)**: MTF 리스트와 최적 리스트 FORESEE 사이에서 원소 순서가 다른 쌍의 수
2. **포텐셜 함수**: Φ_i = 2 · I(L_M^i, L_F^i) (역전 수의 2배)
3. **상각 분석**: 각 MTF 연산의 상각 비용이 최적 연산 비용의 4배 이내임을 증명

핵심 아이디어: MTF는 미래를 모르지만, 검색된 원소가 곧 다시 검색될 가능성이 높다는 가정 하에서 효과적이다. FORESEE는 미래를 알고 최적으로 재배치하지만, MTF는 FORESEE의 비용의 최대 4배 이내에서 수행한다.

## 예시

```
리스트 L = ⟨5, 3, 12, 4, 8, 9, 22⟩에서 MOVE-TO-FRONT(L, 8) 호출:

검색: 위치 5에서 8 발견 (비용 5)
이동: 8을 앞으로 4번 교환 (비용 4)
결과: L = ⟨8, 5, 3, 12, 4, 9, 22⟩
총 비용: 2·5 - 1 = 9
```

MTF vs FORESEE 비교 (Figure 27.1):
```
초기: ⟨1, 2, 3, 4, 5⟩, 검색 순서: 5, 3, 4, 4
FORESEE 총 비용: 17 (미래를 알고 최적 재배치)
MTF 총 비용: 28 (4 × 17 = 68 이내)
```

## 관련 개념

- [Online Algorithm](/knowledge/algorithms/online-algorithm/) - MTF는 대표적 온라인 알고리즘
- [Competitive Analysis](/knowledge/algorithms/competitive-analysis/) - 4-competitive 증명
- [Online Caching](/knowledge/algorithms/online-caching/) - 유사한 온라인 문제
- [Dynamic Programming](/knowledge/algorithms/dynamic-programming/) - 상각 분석과의 연관
