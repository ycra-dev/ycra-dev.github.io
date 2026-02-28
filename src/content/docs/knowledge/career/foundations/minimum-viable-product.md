---
title: "Minimum Viable Product (최소 기능 제품)"
description: "최소한의 노력으로 고객에 대한 최대한의 검증된 학습을 수집할 수 있는 제품 버전으로, 전체 개발 전에 아이디어를 검증하는 전략"
tags: ["Career", "Foundations", "Validation", "Product-Development"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/minimum-viable-product
sidebar:
  order: 225
---

## 핵심 개념

MVP(Minimum Viable Product, 최소 기능 제품)는 최소한의 노력으로 고객에 대한 최대한의 검증된 학습을 수집할 수 있는 제품 버전이다 (Eric Ries, *The Lean Startup*).

MVP의 정의는 [Leverage](/knowledge/career/foundations/leverage/)의 공식과 정확히 일치한다: 최소 노력으로 최대 가치(학습)를 생산.

## 동작 원리

검증 없이 대규모 투자의 위험:

- **Cuil 사례**: $33M 벤처 투자, 수십 인년의 엔지니어링. 출시 전 알파 테스터 없이 개발. 출시 후 "버그투성이", "느리고", "한심한" 평가. 검색 품질이 아닌 인덱스 크기에 과잉 투자.
- **교훈**: "Don't delay. Get feedback. Figure out what's working."

MVP의 핵심 질문: "전체 노력의 10%를 투자하여 나머지 90%가 낭비가 아님을 검증할 수 있는가?"

**창의적 MVP 구현 사례:**

- **Dropbox**: 4분짜리 데모 비디오가 MVP. 하룻밤에 베타 대기 목록 5K → 75K명으로 증가. 전체 제품 구축 없이 수요 검증.
- **42Floors**: 8개 Photoshop 목업을 HTML로 변환, Google AdWords로 트래픽 유도하여 전환율 측정. 실제 기능 구축의 극소수 비용으로 8가지 디자인 검증.
- **Asana**: 가짜 Google Signup 버튼으로 클릭률 측정 후 전체 플로우 구축 결정.

## 예시

```python
# MVP 검증 전략의 비용-효과 비교
strategies = {
    "full_build": {
        "effort": "months",
        "risk": "high (may build wrong thing)",
        "learning": "delayed until launch"
    },
    "prototype_mvp": {
        "effort": "10% of full build",
        "risk": "low (early course correction)",
        "learning": "immediate from real data"
    },
    "fake_feature": {
        "effort": "hours to days",
        "risk": "minimal",
        "learning": "click-through rates, user intent"
    }
}
```

BloomReach: Cuil의 교훈으로 4개월 만에 최소 기능 시스템 → 베타 고객 피드백 → 135명+ 직원, 대형 고객 확보.

## 관련 개념

- [Feedback Loops](/knowledge/career/foundations/feedback-loops/) - MVP는 빠른 피드백 루프의 구현체
- [Iteration Speed](/knowledge/career/productivity/iteration-speed/) - MVP로 반복 주기를 짧게 유지
- [A/B Testing](/knowledge/career/foundations/ab-testing/) - MVP 이후 세부 사항을 A/B 테스트로 검증
- [Leverage](/knowledge/career/foundations/leverage/) - MVP는 레버리지 극대화 전략
