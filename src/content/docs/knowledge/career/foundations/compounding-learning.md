---
title: "Compounding Learning (복리 학습)"
description: "지식이 복리 이자처럼 기하급수적으로 성장하는 현상으로, 기존 지식이 새로운 지식 습득을 가속화하는 선순환 구조"
tags: ["Career", "Foundations", "Learning", "Career-Growth"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/compounding-learning
sidebar:
  order: 223
---

## 핵심 개념

복리 학습은 지식이 **금융의 복리 이자처럼 기하급수적으로 성장**하는 현상이다. 기존 지식이 새로운 지식 습득을 가속화하는 선순환 구조를 만든다.

예: 재귀(recursion) 이해 → 트리/그래프 탐색 이해 → 컴파일러/네트워크 토폴로지 이해로 확장

## 동작 원리

**금융 복리와 동일한 세 가지 특성:**

1. **기하급수적 성장 곡선**: 초기에는 느리지만 임계점을 넘으면 급격히 성장
2. **조기 시작의 이점**: 일찍 학습을 최적화할수록 복리 효과를 오래 누림
3. **작은 차이의 장기 영향**: 학습률의 미세한 차이가 장기적으로 엄청난 격차를 만듦

**수학적 효과:**

```python
def compound_growth(daily_rate, days):
    return (1 + daily_rate) ** days

# 매일 1% 성장
yearly_growth = compound_growth(0.01, 365)  # 37.8x

# 매일 0.5% 성장
yearly_growth_half = compound_growth(0.005, 365)  # 6.2x

# 작은 차이(0.5%)가 6x vs 38x의 격차를 만듦
```

Palantir 공동창업자 Stephen Cohen: "도전 없는 편안한 직장은 사실상 더 낮은 지적 성장률을 받아들이는 대가로 급여를 받는 것. 복리로 계산하면 그 비용은 막대하다."

## 예시

**커리어에서의 복리 학습:**
- 좋은 첫 직장 → 더 나은 두 번째 직장 → 미래 커리어 기회 확대

**실천 전략:**
- 자신의 20% 시간을 확보하여 기술 개발에 투자 ([Twenty Percent Time](/knowledge/career/productivity/twenty-percent-time/))
- 직장 내 학습 환경 평가: 성장 속도, 교육, 개방성, 속도, 동료, 자율성

## 관련 개념

- [Growth Mindset](/knowledge/career/foundations/growth-mindset/) - 성장할 수 있다는 믿음이 복리 학습의 기반
- [Learning Muscles](/knowledge/career/foundations/learning-muscles/) - 매일 학습으로 단련되는 학습 능력
- [Leverage](/knowledge/career/foundations/leverage/) - 학습도 레버리지 관점으로 접근
- [Twenty Percent Time](/knowledge/career/productivity/twenty-percent-time/) - 정기적 학습 시간 확보
