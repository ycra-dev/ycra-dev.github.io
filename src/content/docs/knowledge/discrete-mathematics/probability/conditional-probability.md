---
title: "Conditional Probability"
description: "조건부 확률(conditional probability)은 사건 F가 발생했다는 조건 하에서 사건 E가 발생할 확률로, p(F) > 0일 때 p(E|F) = p(E ∩ F) / p(F)로 정의된다"
tags: ['Conditional Probability', 'Probability', 'Bayes Theorem', 'Independence']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/conditional-probability
sidebar:
  order: 3
---

## 핵심 개념

조건부 확률의 핵심 아이디어는 추가 정보가 주어졌을 때 확률 공간이 축소되는 것이다. 사건 F가 발생했음을 알면, 새로운 표본공간은 F가 되고, E가 발생하려면 E ∩ F에 속하는 결과가 나와야 한다.

**직관적 이해:**
- F를 새로운 "축소된" 표본공간으로 봄
- E가 이 축소된 공간에서 발생할 비율이 조건부 확률

**조건부 확률의 주요 성질:**
1. p(E|F) = p(E ∩ F) / p(F) (정의)
2. p(E ∩ F) = p(E|F) · p(F) (곱의 법칙)
3. p(E) = p(E|F)p(F) + p(E|F̅)p(F̅) (전확률 법칙)

조건부 확률은 베이즈 정리의 기초가 되며, 기계학습, 의료 진단, 스팸 필터링 등 다양한 분야에서 핵심적으로 사용된다.

## 예시

**4비트 문자열 예시:**
```
E = "연속된 0이 2개 이상 존재"
F = "첫 번째 비트가 0"

E ∩ F = {0000, 0001, 0010, 0011, 0100}
p(E ∩ F) = 5/16

F의 원소: 첫 비트가 0인 8개 문자열
p(F) = 8/16 = 1/2

p(E|F) = (5/16) / (1/2) = 5/8
```

**두 자녀 가정 문제:**
```
E = "두 아이 모두 남자"  → {BB}
F = "적어도 한 명은 남자" → {BB, BG, GB}
E ∩ F = {BB}

p(E|F) = p(E ∩ F)/p(F) = (1/4)/(3/4) = 1/3
```
주의: 직관적으로 1/2로 생각하기 쉽지만, 실제로는 1/3이다.

**Python으로 조건부 확률 계산:**
```python
# 두 주사위를 굴릴 때, 합이 7일 확률 (적어도 하나가 6인 조건)
total = 0
event_and_condition = 0
condition = 0

for i in range(1, 7):
    for j in range(1, 7):
        total += 1
        has_six = (i == 6 or j == 6)
        sum_seven = (i + j == 7)
        if has_six:
            condition += 1
            if sum_seven:
                event_and_condition += 1

p_E_given_F = event_and_condition / condition
print(f"p(합=7 | 적어도 하나가 6) = {event_and_condition}/{condition} = {p_E_given_F:.4f}")
# 결과: 2/11 ≈ 0.1818
```

## 관련 개념

- [Sample Space](/knowledge/mathematics/sample-space/) - 조건부 확률은 표본공간을 축소하는 것
- [Bayes' Theorem](/knowledge/mathematics/bayes-theorem/) - 조건부 확률을 역으로 계산하는 정리
- [Independence](/knowledge/mathematics/independence/) - p(E|F) = p(E)일 때 독립
- [Probability Distribution](/knowledge/mathematics/probability-distribution/) - 조건부 확률도 확률분포의 성질을 만족
