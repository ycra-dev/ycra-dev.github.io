---
title: "Multiway Merging and Selection Tree"
description: "다중 웨이 병합(Multiway Merging)은 P개의 정렬된 런을 동시에 하나로 합치는 연산으로, 패자 트리(Loser Tree)를 사용하면 각 단계에서 O(log P)번의 비교만으로 최솟값을 찾을 수 있다"
tags: ["Multiway Merging", "Selection Tree", "Loser Tree", "Priority Queue", "External Sorting", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/multiway-merging-selection-tree
sidebar:
  order: 48
---

## 핵심 개념

다중 웨이 병합(Multiway Merging)은 P개의 정렬된 런을 동시에 하나의 정렬된 수열로 합치는 연산이다. **패자 트리(Loser Tree)**를 사용하면 각 단계에서 **O(log P)번의 비교**만으로 최솟값을 찾을 수 있다.

## 동작 원리

**단순 다중 웨이 병합**:
- P개 런의 현재 최솟값 P-1번 비교로 선택
- P가 작으면 적합하지만, P ≥ 8에서는 트리 방법이 유리

**선택 트리(Winner Tree)**:
- 완전 이진 트리 구조
- 내부 노드: 현재 승자(winner, 최솟값)
- 외부 노드: 각 런의 현재 원소
- 승자 교체 후 루트까지 경로만 갱신 (lg P번 비교)

**패자 트리(Loser Tree)** - TAOCP의 핵심 구조:
- 내부 노드에 패자(loser)를 저장
- 노드 0(루트 위): 현재 챔피언(최솟값)
- **장점**: 새 원소가 들어오면 그 경로의 패자들과만 비교하면 됨
- 각 키는 정확히 외부 노드 1번 + 내부 노드 1번에 등장

**패자 트리의 업데이트**:
1. 챔피언(Q)의 다음 원소를 읽어 Q의 외부 노드에 배치
2. Q의 부모 내부 노드에서 비교 시작
3. 새 원소와 현재 패자를 비교하여 승자를 위로 전파
4. 루트까지 반복 (lg P번)

## 예시

```
4-way 병합의 패자 트리:

선택 트리:
       [061]    ← 챔피언 (노드 0)
      /      \
  [087]     [154]  ← 패자들 (내부 노드)
  /    \   /    \
087   061 154   512  ← 외부 노드 (각 런의 현재 원소)

061이 출력되면 해당 런에서 다음 원소를 읽어와 트리 갱신.
루트까지 lg 4 = 2번의 비교만 필요.

# 패자 트리를 이용한 P-way 병합 의사코드
class LoserTree:
    def __init__(self, runs):
        P = len(runs)
        self.tree = [None] * P      # 내부 노드 (패자 저장)
        self.keys = [next(r) for r in runs]  # 외부 노드
        self.champion = 0           # 현재 챔피언의 인덱스
        self.build()

    def pop_min(self):
        result = self.keys[self.champion]
        self.keys[self.champion] = next(runs[self.champion])
        self.update(self.champion)
        return result
```

## 관련 개념

- [External Sorting Overview](/knowledge/algorithms/sorting-selection/external-sorting-overview/)
- [Replacement Selection](/knowledge/algorithms/sorting-selection/replacement-selection/)
- [Priority Queue](/knowledge/algorithms/priority-queue/)
- [Heapsort](/knowledge/algorithms/heapsort/)
