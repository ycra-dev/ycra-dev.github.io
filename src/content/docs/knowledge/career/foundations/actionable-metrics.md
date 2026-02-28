---
title: "Actionable Metrics (실행 가능한 메트릭)"
description: "행동과 인과관계를 명확히 하여 의사결정을 직접 유도하는 측정 지표로, 단순히 좋아 보이기만 하는 허영 메트릭과 대비된다"
tags: ["Career", "Foundations", "Measurement", "Data-Driven"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/actionable-metrics
sidebar:
  order: 224
---

## 핵심 개념

실행 가능한 메트릭은 팀의 행동이 그 수치에 직접 영향을 미치는 측정 지표다. 반면 허영 메트릭(Vanity Metrics)은 숫자가 계속 올라가지만 실제로 어떤 행동을 취해야 하는지 알려주지 않는다.

Lord Kelvin: "측정할 수 없으면 개선할 수 없다." 하지만 무엇을 측정하느냐가 더 중요하다. 잘못된 메트릭은 잘못된 행동을 유도한다.

## 동작 원리

**허영 메트릭 vs 실행 가능한 메트릭** (Eric Ries, *The Lean Startup*):

| 허영 메트릭 | 실행 가능한 메트릭 |
|-------------|-------------------|
| 총 가입자 수 (계속 증가하지만 의미 없음) | 주간 활성 사용자 성장률 |
| 총 페이지뷰 (봇 포함 가능) | 7일 유지율 |
| 총 다운로드 수 | 결제 전환율 |

**좋은 메트릭의 4가지 특성:**

1. **최대화/최소화 가능**: 팀이 방향성 있는 노력을 할 수 있음
2. **반응적(responsive)**: 변경 효과를 빠르게 반영
3. **강건한(robust)**: 조작이나 잡음에 저항
4. **인과적**: 측정과 팀 행동의 인과관계가 명확

Google Search Quality 팀은 "long click"(사용자가 검색 결과를 클릭한 후 오래 머무름)을 사용자 만족도의 프록시 메트릭으로 사용한다. 직접 측정이 어려운 것(사용자 행복)을 간접적으로 측정하는 방식이다.

## 예시

```python
# 좋은 메트릭 vs 나쁜 메트릭 비교
metrics = {
    "vanity": {
        "total_signups": 1000000,      # 항상 증가, 의미 불명확
        "page_views": 5000000,         # 봇 트래픽 포함 가능
        "total_downloads": 2000000     # 실제 사용과 무관
    },
    "actionable": {
        "weekly_active_users": 250000,  # 실제 참여 반영
        "signup_conversion_rate": 0.12, # 최적화 가능
        "7day_retention": 0.45,        # 제품 가치 반영
        "p95_latency_ms": 200          # 성능 직접 측정
    }
}
```

- Etsy: 실시간 대시보드로 코드 배포 후 몇 분 내 메트릭 변화를 감지하여 신속하게 대응
- 주간 활성 사용자를 극대화하면 스팸 알림으로 사용자를 괴롭힐 수 있음 → 메트릭 선택이 팀 행동을 결정

## 관련 개념

- [Leverage](/knowledge/career/foundations/leverage/) - 높은 레버리지 활동을 찾을 때 올바른 메트릭이 기준이 된다
- [A/B Testing](/knowledge/career/foundations/ab-testing/) - 메트릭으로 A/B 테스트 결과를 측정
- [Data-Driven Decisions](/knowledge/career/professional-development/data-driven-decisions/) - 데이터 기반 의사결정의 핵심 도구
