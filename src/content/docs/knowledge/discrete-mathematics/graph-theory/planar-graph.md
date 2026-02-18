---
title: "Planar Graph"
description: "평면 그래프(planar graph)는 평면 위에 간선의 교차 없이 그릴 수 있는 그래프이다"
tags: ['Planar Graph', 'Euler Formula', 'Circuit Design', 'Kuratowski', 'Graph Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/planar-graph
sidebar:
  order: 10
---

## 핵심 개념

그래프가 보통 교차하게 그려진다고 해서 비평면 그래프인 것은 아니다. 다른 방식으로 교차 없이 그릴 수 있으면 평면 그래프이다. 예를 들어 K_4와 Q_3는 평면 그래프이다.

**비평면 그래프의 대표적 예**:
- K_5: 5개의 정점이 모두 서로 연결된 완전 그래프
- K_{3,3}: 3개씩 두 그룹의 정점이 모두 연결된 완전 이분 그래프 (유틸리티-주택 문제)

**오일러 공식(Euler's Formula)**: 연결 평면 단순 그래프에서 e = 간선 수, v = 정점 수, r = 영역 수일 때:
- r = e - v + 2

**따름정리 1**: v >= 3인 연결 평면 단순 그래프에서 e <= 3v - 6. 이를 이용하여 K_5가 비평면임을 증명(10 > 3*5-6 = 9).

**따름정리 2**: 연결 평면 단순 그래프에는 차수 5 이하인 정점이 반드시 존재한다.

**따름정리 3**: 길이 3인 순환이 없는 연결 평면 단순 그래프에서 e <= 2v - 4. 이를 이용하여 K_{3,3}이 비평면임을 증명(9 > 2*6-4 = 8).

**쿠라토프스키의 정리(Kuratowski's Theorem)**: 그래프가 비평면일 필요충분조건은 K_{3,3} 또는 K_5에 동형(homeomorphic)인 부분그래프를 포함하는 것이다. 여기서 두 그래프가 동형이라 함은 같은 그래프에서 기본 세분(elementary subdivision)을 통해 얻을 수 있다는 것이다.

**응용**: 전자 회로 설계에서 단층 회로판에 교차 없이 인쇄 가능한지, 도로 네트워크에서 입체 교차 없이 건설 가능한지를 판별하는 데 사용된다.

## 예시

```python
# 오일러 공식 검증
# K_4: v=4, e=6
# 평면 표현의 영역 수: r = e - v + 2 = 6 - 4 + 2 = 4

# 모든 정점의 차수가 3인 연결 평면 단순 그래프 (v=20)
# 핸드셰이킹 정리: 2e = 3 * 20 = 60, e = 30
# 오일러 공식: r = 30 - 20 + 2 = 12

# 비평면 판별
def check_planarity_bound(v, e, has_triangle=True):
    """오일러 공식의 따름정리로 비평면 여부 판별"""
    if v < 3:
        return "평면 가능"
    if has_triangle:
        if e > 3 * v - 6:
            return "비평면 (e > 3v - 6)"
    else:
        if e > 2 * v - 4:
            return "비평면 (e > 2v - 4)"
    return "이 조건만으로는 판별 불가"

# K_5: v=5, e=10, 삼각형 있음
print(check_planarity_bound(5, 10, True))
# "비평면 (e > 3v - 6)" 왜냐하면 10 > 9

# K_{3,3}: v=6, e=9, 삼각형 없음 (이분 그래프)
print(check_planarity_bound(6, 9, False))
# "비평면 (e > 2v - 4)" 왜냐하면 9 > 8

# K_{3,3}: e <= 3v - 6 검사
print(check_planarity_bound(6, 9, True))
# "이 조건만으로는 판별 불가" (9 <= 12이므로)
```

쿠라토프스키의 정리 적용 (Petersen 그래프):
```
# Petersen 그래프: 10개 정점, 15개 간선
# 정점 b와 그에 연결된 3개의 간선을 제거하면
# K_{3,3}에 동형인 부분그래프가 나타남
# -> Petersen 그래프는 비평면

# 기본 세분(Elementary Subdivision):
# 간선 {u, v}를 제거하고, 새 정점 w와 간선 {u, w}, {w, v}를 추가
# 원래 그래프와 세분된 그래프는 같은 평면성을 가짐
```

## 관련 개념

- [Graph](/knowledge/mathematics/graph/) - 평면 그래프는 그래프의 특수한 성질
- [Bipartite Graph](/knowledge/mathematics/bipartite-graph/) - K_{3,3}은 비평면 이분 그래프
