---
title: "Game Tree"
description: "게임 트리(game tree)는 두 플레이어가 번갈아 수를 두는 게임의 진행 상태를 모델링하는 루트 트리이다"
tags: ['Game Tree', 'Minmax Strategy', 'Combinatorial Game Theory', 'Tree', 'Nim', 'Decision Making']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/game-tree
sidebar:
  order: 5
---

## 핵심 개념

**게임 트리의 구조**:
- 루트: 게임의 시작 위치
- 짝수 레벨 정점(사각형): 첫 번째 플레이어의 차례
- 홀수 레벨 정점(원): 두 번째 플레이어의 차례
- 잎: 게임의 최종 위치 (승/패/무승부에 따라 값 부여)

**정점의 값 (재귀적 정의)**:
1. 잎의 값 = 첫 번째 플레이어의 보수(payoff)
2. 짝수 레벨 내부 정점의 값 = 자식들 값의 **최댓값** (첫 번째 플레이어가 최선의 수를 선택)
3. 홀수 레벨 내부 정점의 값 = 자식들 값의 **최솟값** (두 번째 플레이어가 상대에게 불리한 수를 선택)

**민맥스 전략(Minmax Strategy)**:
- 첫 번째 플레이어: 최대 값의 자식으로 이동
- 두 번째 플레이어: 최소 값의 자식으로 이동
- 루트의 값 = 양쪽 모두 최적 전략을 따를 때의 게임 결과 (정리 3)

**실용적 한계와 기법**:
- 체스의 게임 트리는 약 10^100개의 정점으로 완전 탐색 불가능
- **알파-베타 가지치기(Alpha-Beta Pruning)**: 조상 정점의 값에 영향을 줄 수 없는 부분을 제거
- **평가 함수(Evaluation Function)**: 내부 정점의 값을 추정하여 근사적 해법 제공

## 예시

```
Nim 게임: 초기 위치 (2, 2, 1) - 세 더미의 돌

게임 트리 일부:
          (2,2,1)         ← 첫 번째 플레이어 [max]
        /    |    \
   (1,1,2) (2,2) (2,1)   ← 두 번째 플레이어 [min]
     ...    ...   ...

잎의 값: 첫 번째 플레이어 승리 = +1, 패배 = -1

민맥스 계산 (루트에서):
- 자식들의 값: +1, -1, -1
- 루트 값 = max(+1, -1, -1) = +1
→ 첫 번째 플레이어가 최적 전략을 따르면 승리

틱택토 평가 함수 예:
(O가 없는 줄 수) - (X가 없는 줄 수)
→ 양수이면 첫 번째 플레이어에게 유리
```

## 관련 개념

- [Decision Tree](/knowledge/mathematics/decision-tree/) - 게임 트리는 결정 트리의 일종
- [Rooted Tree](/knowledge/mathematics/rooted-tree/) - 게임 트리의 기반 구조
- [Recursive Algorithm](/knowledge/mathematics/recursive-algorithm/) - 민맥스 전략의 재귀적 계산
- [Algorithm](/knowledge/algorithms/algorithm/) - 알파-베타 가지치기 등 게임 트리 알고리즘
