---
title: "Birthday Paradox"
description: "생일 패러독스(Birthday Paradox)는 방 안에 23명만 있으면 두 사람이 같은 생일일 확률이 50%를 넘는다는 직관에 반하는 확률론적 결과로, 해싱에서의 충돌 확률, 암호학적 공격 등 컴퓨터 과학의 다양한 영역에서 응용되는 핵심 개념이다"
tags: ['Birthday Paradox', 'Probability', 'Indicator Random Variable', 'Hashing', 'Combinatorics']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/birthday-paradox
sidebar:
  order: 23
---

## 핵심 개념

생일 패러독스가 "패러독스"인 이유는 365일 중 같은 날을 공유하려면 수십 명 이상이 필요할 것 같지만, 실제로는 23명이면 충분하기 때문이다. 이는 가능한 **쌍의 수**가 사람 수보다 훨씬 빠르게 증가하기 때문이다.

**정확한 확률 분석**:
- n = 365일, k명의 사람
- 모든 생일이 다를 확률: Pr{B_k} = (1)(1-1/n)(1-2/n)...(1-(k-1)/n)
- 1+x <= e^x 부등식을 적용하면: Pr{B_k} <= e^(-k(k-1)/(2n))
- Pr{B_k} <= 1/2가 되려면: k(k-1) >= 2n*ln(2)
- n=365일 때: k >= 23명

**지시자 확률 변수를 이용한 근사 분석**:
- X_ij = I{i와 j가 같은 생일} (1 <= i < j <= k)
- E[X_ij] = 1/n = 1/365
- 총 일치 쌍의 기대 수: E[X] = C(k,2) * (1/n) = k(k-1)/(2n)
- 기대 일치 쌍 >= 1이 되려면: k(k-1) >= 2n, 즉 k >= sqrt(2n)
- n=365일 때: k >= 28명

두 분석의 결과(23명 vs 28명)는 정확히 같지는 않지만, 점근적으로 동일하다: Theta(sqrt(n)).

**일반화**: n개의 가능한 값에서 무작위로 선택할 때, Theta(sqrt(n))개의 선택만으로 충돌(같은 값)이 발생할 확률이 높아진다. 이 원리는:
- **해싱**: n개의 슬롯에 Theta(sqrt(n))개의 키를 삽입하면 충돌 기대
- **암호학**: 생일 공격(birthday attack)으로 2^(n/2)번 시도로 n비트 해시 충돌 발견
- **난수 품질 검증**: 반복 값 출현 시점으로 난수 생성기 품질 평가

## 예시

정확한 확률 계산 (k=23, n=365):
```
Pr{모두 다른 생일} = 365/365 * 364/365 * 363/365 * ... * 343/365
                   = 365! / (342! * 365^23)
                   ~= 0.4927

Pr{최소 한 쌍 같은 생일} = 1 - 0.4927 = 0.5073 > 50%
```

지시자 확률 변수를 이용한 분석:
```
k=28명일 때:
  일치 쌍의 기대 수 = C(28,2) / 365
                    = 28*27 / (2*365)
                    = 756 / 730
                    ~= 1.036

즉, 28명이면 평균적으로 1쌍 이상의 생일 일치가 기대된다.
```

화성 (669일)에서의 생일 패러독스:
```
확률 >= 50%가 되려면: k >= sqrt(2 * 669 * ln 2) ~= 31명
기대 일치 쌍 >= 1이 되려면: k >= sqrt(2 * 669) ~= 38명
```

Python으로 시뮬레이션:
```python
import random

def birthday_simulation(k, n=365, trials=100000):
    matches = 0
    for _ in range(trials):
        birthdays = [random.randint(1, n) for _ in range(k)]
        if len(birthdays) != len(set(birthdays)):
            matches += 1
    return matches / trials

# k=23 -> 약 0.507 (50.7%)
# k=50 -> 약 0.970 (97.0%)
# k=70 -> 약 0.999 (99.9%)
```

## 관련 개념

- [Indicator Random Variable](/knowledge/algorithms/indicator-random-variable/) - 생일 패러독스의 근사 분석에 사용
- [Expected Value](/knowledge/algorithms/expected-value/) - 기대 일치 쌍 수 계산
- [Probabilistic Analysis](/knowledge/algorithms/probabilistic-analysis/) - 생일 패러독스는 확률적 분석의 대표 예시
- [Data Structure](/knowledge/algorithms/data-structure/) - 해시 테이블에서의 충돌 확률 분석에 응용
