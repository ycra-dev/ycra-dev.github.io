---
title: "확률 변수 (Random Variable)"
description: "확률변수(random variable)는 실험의 표본공간에서 실수 집합으로의 함수로, 각 가능한 결과에 실수 값을 할당한다"
tags: ['Random Variable', 'Probability', 'Distribution', 'Sample Space', 'Function']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/random-variable
sidebar:
  order: 7
---

## 핵심 개념

**중요한 오해 방지:** 확률변수는 "변수"가 아니라 "함수"이고, "확률적(random)"이라기보다는 결정적 함수이다. 이름이 다소 오해를 줄 수 있지만, 이는 역사적 명명 관례이다. (이탈리아 수학자 F.P. Cantelli가 1916년 "variabile casuale"라는 이름을 도입했다.)

**확률변수의 구성 요소:**
- 정의역: 표본공간 S
- 공역: 실수 집합 R
- X: S → R, 각 결과 s를 실수 X(s)에 대응

**확률변수의 분포:**
분포란 X가 취할 수 있는 각 값 r과 그 확률 p(X = r)의 쌍들의 집합이다.
여기서 p(X = r) = Σ{p(s) : s ∈ S, X(s) = r}

**독립 확률변수:** 두 확률변수 X와 Y가 독립이란, 모든 실수 r₁, r₂에 대해:
$$p(X = r_1 \text{ and } Y = r_2) = p(X = r_1) \cdot p(Y = r_2)$$

**기하분포(geometric distribution):** p(X = k) = (1-p)^(k-1) · p (k = 1, 2, 3, ...) 는 첫 번째 성공까지의 시행 횟수를 나타내는 확률변수의 분포이다. 기대값은 E(X) = 1/p이다.

## 예시

**동전 3번 던지기 (앞면 수 세기):**
```
표본공간 S = {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}
확률변수 X = 앞면의 수

X(HHH) = 3
X(HHT) = X(HTH) = X(THH) = 2
X(HTT) = X(THT) = X(TTH) = 1
X(TTT) = 0

분포: {(3, 1/8), (2, 3/8), (1, 3/8), (0, 1/8)}
```

**주사위 두 개의 합:**
```
X((i,j)) = i + j

분포:
X = 2:  1/36    (1,1)
X = 3:  2/36    (1,2),(2,1)
X = 4:  3/36    ...
X = 5:  4/36
X = 6:  5/36
X = 7:  6/36    ← 최빈값
X = 8:  5/36
X = 9:  4/36
X = 10: 3/36
X = 11: 2/36
X = 12: 1/36
```

**기하분포 (공정한 동전의 뒷면이 나올 때까지):**
```python
# 기하분포 시뮬레이션
import random

def geometric_trial(p):
    """성공할 때까지의 시행 횟수를 반환"""
    count = 0
    while True:
        count += 1
        if random.random() < p:
            return count

# p = 1/2일 때 기대값은 1/p = 2
p = 0.5
trials = [geometric_trial(p) for _ in range(100000)]
avg = sum(trials) / len(trials)
print(f"E(X) 이론값 = {1/p}, 시뮬레이션 = {avg:.3f}")

# p = 1/6 (주사위에서 6이 나올 때까지)
p = 1/6
trials = [geometric_trial(p) for _ in range(100000)]
avg = sum(trials) / len(trials)
print(f"E(X) 이론값 = {1/p:.2f}, 시뮬레이션 = {avg:.3f}")
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 확률변수는 표본공간에서 실수로의 함수
- [Sample Space](/knowledge/mathematics/sample-space/) - 확률변수의 정의역
- [Probability Distribution](/knowledge/mathematics/probability-distribution/) - 확률변수의 분포
- [Expected Value](/knowledge/mathematics/expected-value/) - 확률변수의 기대값
- [Variance](/knowledge/mathematics/variance/) - 확률변수의 분산
