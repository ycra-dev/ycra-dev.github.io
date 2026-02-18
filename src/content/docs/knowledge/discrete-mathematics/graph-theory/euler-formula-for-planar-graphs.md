---
title: "Euler's Formula for Planar Graphs"
description: "오일러 공식(Euler's formula)은 연결 평면 단순 그래프의 정점 수 v, 간선 수 e, 영역 수 r 사이의 관계를 나타내는 공식이다: r = e - v + 2"
tags: ['Euler Formula', 'Planar Graph', 'Regions', 'Graph Theory', 'Combinatorics']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/euler-formula-for-planar-graphs
sidebar:
  order: 11
---

## 핵심 개념

오일러 공식은 평면 그래프 이론에서 가장 기본적이고 강력한 도구이다. 이 공식의 핵심은 연결 평면 그래프의 모든 평면 표현이 동일한 수의 영역을 만든다는 것이다.

**증명의 핵심 아이디어**: 그래프를 하나의 간선에서 시작하여 간선을 하나씩 추가하면서 구성한다:
- 초기 상태: e=1, v=2, r=1이므로 r = 1 = 1 - 2 + 2 성립
- 간선 추가 시 두 경우:
  - 두 끝점이 이미 존재: 영역이 하나 분할됨 (r+1, e+1, v는 동일)
  - 한 끝점만 존재: 새 정점 추가, 영역 변화 없음 (r 동일, e+1, v+1)
- 두 경우 모두 r = e - v + 2 관계가 유지됨

**영역의 차수(Degree of Region)**: 영역의 경계에 있는 간선의 수. 한 간선이 같은 영역의 경계에 두 번 나타나면 2를 기여한다.

**핵심 성질**: 모든 영역의 차수의 합 = 2e (각 간선은 정확히 두 영역의 경계에 나타남)

**주요 따름정리들**:

**따름정리 1** (e <= 3v - 6): 단순 그래프에서 루프와 다중 간선이 없으므로 각 영역의 차수가 3 이상. 따라서 2e = sum of deg(R) >= 3r. 오일러 공식과 결합하면 e <= 3v - 6.

**따름정리 2** (차수 5 이하 정점 존재): e <= 3v - 6에서 2e <= 6v - 12. 모든 정점의 차수가 6 이상이면 2e >= 6v인데, 이는 2e <= 6v - 12에 모순.

**따름정리 3** (삼각형 없으면 e <= 2v - 4): 길이 3인 순환이 없으면 각 영역의 차수가 4 이상. 따라서 2e >= 4r. 오일러 공식과 결합하면 e <= 2v - 4.

## 예시

```python
# 오일러 공식 검증
def verify_euler_formula(v, e, r):
    """r = e - v + 2 검증"""
    expected_r = e - v + 2
    return r == expected_r

# 예시 1: 사각형 (정사각형 그래프 C_4)
# v=4, e=4, r=2 (내부 1 + 외부 1)
print(verify_euler_formula(4, 4, 2))  # True: 2 = 4 - 4 + 2

# 예시 2: 차수 3인 정점 8개를 가진 연결 평면 그래프
# 핸드셰이킹 정리: 2e = 3*8 = 24, e = 12
# 오일러 공식: r = 12 - 8 + 2 = 6
print(f"영역 수: {12 - 8 + 2}")  # 6

# 예시 3: K_4의 평면 표현
# v=4, e=6, r = 6 - 4 + 2 = 4
# 영역: 3개의 삼각형 내부 + 1개의 무한 영역

# 따름정리를 이용한 비평면성 판별
def is_possibly_planar(v, e, has_triangle=True):
    if v < 3:
        return True
    if has_triangle:
        return e <= 3 * v - 6
    else:
        return e <= 2 * v - 4

# K_5: v=5, e=10
print(f"K_5 평면 가능? {is_possibly_planar(5, 10)}")
# False (10 > 9)

# K_{3,3}: v=6, e=9 (삼각형 없음)
print(f"K_3,3 평면 가능? {is_possibly_planar(6, 9, False)}")
# False (9 > 8)

# Q_3: v=8, e=12 (삼각형 없음)
print(f"Q_3 평면 가능? {is_possibly_planar(8, 12, False)}")
# True (12 <= 12) -> 실제로 Q_3는 평면 그래프임
```

영역의 차수 예시:
```
# 삼각형 2개가 한 변을 공유하는 그래프
# 정점: a, b, c, d, 간선: {a,b}, {b,c}, {c,a}, {b,d}, {c,d}
# v=4, e=5
# 영역 수: r = 5 - 4 + 2 = 3
# 영역들: 삼각형 abc 내부 (차수 3), 삼각형 bcd 내부 (차수 3), 무한 영역 (차수 4)
# 차수의 합: 3 + 3 + 4 = 10 = 2 * 5 = 2e ✓
```

## 관련 개념

- [Planar Graph](/knowledge/mathematics/planar-graph/) - 오일러 공식이 적용되는 그래프
- [Graph](/knowledge/mathematics/graph/) - 정점, 간선, 영역의 관계
