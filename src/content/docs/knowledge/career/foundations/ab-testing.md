---
title: "A/B Testing (A/B 테스트)"
description: "무작위 사용자 집단에게 다른 변형을 보여주고 통계적으로 변경의 인과적 효과를 측정하는 실험 방법"
tags: ["Career", "Foundations", "Experimentation", "Data-Driven"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/ab-testing
sidebar:
  order: 226
---

## 핵심 개념

A/B 테스트는 무작위 사용자 집단에게 서로 다른 변형(A와 B)을 보여주고, 통제 그룹과 비교하여 변경의 인과적 효과를 과학적으로 측정하는 실험 방법이다.

A/B 테스트가 강력한 이유는 상관관계가 아닌 **인과관계**를 증명하기 때문이다. 두 집단이 동시에 같은 트래픽 변동에 노출되므로, 통계적으로 유의한 차이는 오직 변경의 효과만을 반영한다.

## 동작 원리

**A/B 테스트의 원리:**
- 사용자를 브라우저 쿠키, 사용자 ID, 또는 난수로 버킷에 배정
- 대조군(A)과 실험군(B)에 각각 다른 경험 제공
- 지정된 메트릭으로 두 그룹의 결과 비교

**A/B 테스트로 알 수 있는 것 3가지:**
1. **어떤 변형이 나은지** 결정
2. **얼마나 나은지** 정량화 (추가 투자 판단 근거)
3. **반복적 제품 개발**이 가능해짐

**실제 사례:**
- **Obama 2012 캠페인**: 이메일 제목 17개 변형 테스트. 최적 제목이 다른 제목보다 6배 높은 기부금 유치. 단일 이메일로 $2.6M 모금. 20개월간 400개 이상 이메일, 10,000개 변형 테스트 → 온라인 기부 $690M의 대부분.
- **Etsy**: 8개월간 반복적 데이터 기반 리디자인 → "단일 최고 성과 프로젝트". 유사 상품 이미지 추가로 이탈률 10% 감소.

## 예시

```python
# A/B 테스트 개념적 구조
def assign_bucket(user_id, num_buckets=2):
    return hash(user_id) % num_buckets

def run_ab_test(users, variant_a, variant_b, metric_fn):
    results = {"control": [], "experiment": []}
    for user in users:
        bucket = assign_bucket(user.id)
        if bucket == 0:
            show(user, variant_a)
            results["control"].append(metric_fn(user))
        else:
            show(user, variant_b)
            results["experiment"].append(metric_fn(user))

    return statistical_significance_test(
        results["control"],
        results["experiment"]
    )
```

주의: 충분한 트래픽이 필요하다. 소규모 서비스에서는 실질적으로 의미 있는 차이에 집중해야 한다. Google은 41개 파란색 톤을 테스트할 규모가 있지만(+$200M/년), 대부분의 회사는 불가능하다.

## 관련 개념

- [Actionable Metrics](/knowledge/career/foundations/actionable-metrics/) - A/B 테스트의 결과를 측정하는 메트릭
- [Minimum Viable Product](/knowledge/career/foundations/minimum-viable-product/) - MVP는 가장 단순한 A/B 테스트의 일종
- [Feedback Loops](/knowledge/career/foundations/feedback-loops/) - A/B 테스트는 제품 피드백 루프의 핵심 도구
- [Iteration Speed](/knowledge/career/productivity/iteration-speed/) - 빠른 반복 속도가 A/B 테스트의 효과를 높인다
