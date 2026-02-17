---
title: "Recursion Tree"
description: "재귀 트리(Recursion Tree)는 점화식의 비용을 트리 구조로 시각화한 것으로, 각 노드는 재귀 호출의 특정 부분 문제 비용을 나타내며, 각 레벨의 비용을 합산한 후 전체 레벨의 비용을 더하여 점화식의 총 비용을 구하는 분석 방법이다"
tags: ['Recursion Tree', 'Recurrence', 'Algorithm Analysis', 'Divide And Conquer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/recursion-tree
sidebar:
  order: 11
---

## 핵심 개념

재귀 트리는 점화식의 해에 대한 직관을 얻고, 치환법에서 사용할 좋은 추측을 생성하는 데 주로 사용된다. 정밀하게 구성하면 직접적인 증명으로도 사용할 수 있다.

**재귀 트리의 구성 요소**:
- **루트**: 원래 문제의 분할/결합 비용 f(n)
- **내부 노드**: 각 깊이 j에서 a^j개의 노드가 있고, 각 노드의 비용은 f(n/b^j)
- **리프(잎)**: 기저 사례의 비용 Theta(1)
- **트리 높이**: log_b(n)

**T(n) = aT(n/b) + f(n) 형태의 분석**:
- 깊이 j에서의 총 비용: a^j * f(n/b^j)
- 리프의 수: a^(log_b n) = n^(log_b a) (분수함수, watershed function)
- 전체 비용 = 리프 비용 + 내부 노드 비용의 합

**비용 분배의 세 가지 패턴**:
1. 비용이 루트에서 리프로 갈수록 기하급수적으로 **증가** -> 리프가 지배 (마스터 정리 사례 1)
2. 각 레벨의 비용이 대략 **동일** -> Theta(lg n) 레벨의 합 (마스터 정리 사례 2)
3. 비용이 루트에서 리프로 갈수록 기하급수적으로 **감소** -> 루트가 지배 (마스터 정리 사례 3)

**비균형 재귀 트리**: T(n) = T(n/3) + T(2n/3) + cn과 같은 점화식에서는 트리가 비균형이다. 최장 경로(우측)의 높이는 log_(3/2)(n)이고, 최단 경로(좌측)의 높이는 log_3(n)이다. 리프의 수를 정확히 분석하면 L(n) = O(n)이지만, 완전 이진 트리로 근사하면 지나치게 느슨한 상한을 얻게 된다.

## 예시

T(n) = 3T(n/4) + cn^2 의 재귀 트리 분석:

```
깊이 0: cn^2                           = cn^2
깊이 1: 3 * c(n/4)^2                    = (3/16)cn^2
깊이 2: 9 * c(n/16)^2                   = (3/16)^2 * cn^2
...
깊이 j: 3^j * c(n/4^j)^2               = (3/16)^j * cn^2
...
깊이 log_4(n): 리프 (n^(log_4 3)개)      = Theta(n^(log_4 3))
```

내부 노드 총 비용:
```
Sum_{j=0}^{log_4(n)-1} (3/16)^j * cn^2
< cn^2 * Sum_{j=0}^{infinity} (3/16)^j
= cn^2 * (16/13)
= O(n^2)
```

비율 3/16 < 1 이므로 감소하는 기하급수 -> 루트가 지배 -> T(n) = O(n^2)

비균형 트리 예시 T(n) = T(n/3) + T(2n/3) + cn:
```
각 레벨의 합 <= cn
트리 높이 = Theta(lg n) (최장 경로 기준)
=> T(n) = O(n lg n)
리프 수 L(n) = L(n/3) + L(2n/3) = O(n)
```

## 관련 개념

- [Recurrence](/knowledge/algorithms/recurrence/) - 재귀 트리로 시각화하여 풀이하는 대상
- [Substitution Method](/knowledge/algorithms/substitution-method/) - 재귀 트리로 얻은 추측을 검증하는 방법
- [Master Theorem](/knowledge/algorithms/master-theorem/) - 재귀 트리의 세 가지 비용 패턴에 대응하는 정리
- [Divide and Conquer](/knowledge/algorithms/divide-and-conquer/) - 재귀 트리가 분석하는 알고리즘 패러다임
- [Merge Sort](/knowledge/algorithms/merge-sort/) - 재귀 트리 분석의 기본 예시
