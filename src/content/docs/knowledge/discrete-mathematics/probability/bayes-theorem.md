---
title: "Bayes' Theorem"
description: "베이즈 정리(Bayes' theorem)는 사건 E와 F에 대해 p(E) ≠ 0이고 p(F) ≠ 0일 때, p(F|E) = p(E|F)p(F) / [p(E|F)p(F) + p(E|F̅)p(F̅)]로 사후확률을 계산하는 정리이다"
tags: ['Bayes Theorem', 'Conditional Probability', 'Bayesian Inference', 'Spam Filter', 'Probability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/bayes-theorem
sidebar:
  order: 5
---

## 핵심 개념

베이즈 정리의 핵심은 **역방향 추론**이다. 원인(F)에서 결과(E)로의 조건부 확률 p(E|F)를 알 때, 결과(E)를 관찰한 후 원인(F)의 확률 p(F|E)를 계산할 수 있다.

**용어:**
- p(F): **사전확률(prior)** - 관찰 전의 가설의 확률
- p(F|E): **사후확률(posterior)** - 증거를 관찰한 후의 가설의 확률
- p(E|F): **우도(likelihood)** - 가설이 참일 때 증거가 나타날 확률

**증명의 핵심:**
1. p(F|E) = p(E ∩ F)/p(E) (조건부 확률의 정의)
2. p(E ∩ F) = p(E|F)p(F) (곱의 법칙)
3. p(E) = p(E|F)p(F) + p(E|F̅)p(F̅) (전확률 법칙)

**일반화된 베이즈 정리:** 상호 배타적 사건 F₁, F₂, ..., Fₙ이 S를 분할할 때:

$$p(F_j|E) = \frac{p(E|F_j)p(F_j)}{\sum_{i=1}^{n} p(E|F_i)p(F_i)}$$

## 예시

**의료 진단 (희귀 질병 검사):**
```
질병 유병률: p(F) = 1/100,000 = 0.00001
검사 민감도 (참양성): p(E|F) = 0.99
검사 특이도 (참음성): p(Ē|F̅) = 0.995
  → 위양성률: p(E|F̅) = 0.005

양성 판정 시 실제 질병 확률:
p(F|E) = (0.99)(0.00001) / [(0.99)(0.00001) + (0.005)(0.99999)]
        ≈ 0.002 (약 0.2%)
```
놀랍게도, 양성 판정을 받아도 실제 질병일 확률은 겨우 0.2%이다! 이는 질병이 극히 드물기 때문에 위양성의 수가 참양성보다 훨씬 많기 때문이다.

**베이지안 스팸 필터:**
```python
# 단어 w가 포함된 메시지의 스팸 확률 추정
def spam_probability(p_w, q_w):
    """
    p_w: 스팸 메시지에서 단어 w가 나타날 확률
    q_w: 정상 메시지에서 단어 w가 나타날 확률
    가정: p(S) = p(S̅) = 1/2 (사전확률 동일)
    """
    return p_w / (p_w + q_w)

# "Rolex" 단어 예시
p_rolex = 250 / 2000  # 0.125
q_rolex = 5 / 1000    # 0.005
r = spam_probability(p_rolex, q_rolex)
print(f"r(Rolex) = {r:.3f}")  # 0.962 > 0.9 → 스팸으로 분류

# 두 단어를 함께 사용 (독립 가정)
def spam_prob_two_words(p_w1, q_w1, p_w2, q_w2):
    numerator = p_w1 * p_w2
    denominator = p_w1 * p_w2 + q_w1 * q_w2
    return numerator / denominator

# "stock" + "undervalued"
r2 = spam_prob_two_words(0.2, 0.06, 0.1, 0.025)
print(f"r(stock, undervalued) = {r2:.3f}")  # ≈ 0.930
```

## 관련 개념

- [Conditional Probability](/knowledge/mathematics/conditional-probability/) - 베이즈 정리는 조건부 확률의 역전
- [Independence](/knowledge/mathematics/independence/) - 베이지안 스팸 필터에서 단어 독립성 가정
- [Probability Distribution](/knowledge/mathematics/probability-distribution/) - 사전/사후 확률분포의 갱신
