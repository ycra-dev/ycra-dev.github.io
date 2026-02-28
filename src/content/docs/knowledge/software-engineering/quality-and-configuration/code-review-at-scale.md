---
title: "Code Review at Scale"
description: "수만 명의 엔지니어와 수십억 줄의 코드를 가진 조직에서 코드 리뷰 프로세스가 병목이 되지 않도록 설계하는 방법론 — 속도, 자동화, 최소 리뷰어 원칙이 핵심이다"
tags: ["Software Engineering", "Quality", "Code Review", "Scalability", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-review-at-scale
sidebar:
  order: 53
---

## 핵심 개념

대규모 코드 리뷰(Code Review at Scale)는 수만 명의 엔지니어와 수십억 줄의 코드를 가진 조직에서 코드 리뷰 프로세스가 병목이 되지 않도록 설계하는 방법론이다. 속도, 자동화, 최소 리뷰어 원칙이 핵심이다.

## 동작 원리

구글 규모에서 코드 리뷰가 작동하기 위한 핵심 원칙:

**1. 속도 우선**: 코드 리뷰가 느리면 개발 전체가 느려진다. 구글은 대부분의 리뷰가 수 시간 내에 완료되도록 문화를 형성했다. 24시간 내 응답이 최소 기준이다.

**2. 최소 리뷰어**: 많은 리뷰어가 더 나은 리뷰를 보장하지 않는다. 오히려 방관 효과(bystander effect)가 발생하여 아무도 깊이 리뷰하지 않는다. 구글 변경의 대다수는 1명의 리뷰어로 충분하다.

**3. 자동화 최대화**: 포매팅, 린팅, 정적 분석, 테스트 실행을 자동화하여 인간 리뷰어가 고수준 설계와 로직에 집중할 수 있게 한다.

**4. 작은 변경 문화**: 큰 변경은 리뷰가 오래 걸리고 품질도 낮아진다. 변경을 작게 유지하면 리뷰 속도와 품질 모두 향상된다.

**5. 신뢰 기반 프로세스**: LGTM을 받은 후 작성자가 사소한 수정을 추가하고 제출할 수 있다(리뷰어의 재검토 없이). 이는 리뷰 왕복(round-trip)을 줄인다.

구글의 도구(Critique)는 이런 원칙을 기술적으로 지원한다. 자동 분석 결과가 리뷰 인터페이스에 통합되고, 적절한 리뷰어를 자동으로 추천하며, 리뷰 진행 상태를 추적한다.

## 예시

구글에서 하루에 수만 건의 코드 변경이 리뷰된다. 이것이 가능한 이유는:
- 평균 변경 크기가 작다 (수십~수백 줄)
- 자동 도구가 스타일, 포매팅, 기본적 오류를 미리 걸러낸다
- 대부분의 변경이 1명의 리뷰어만으로 승인된다
- 리뷰어가 리뷰를 높은 우선순위로 다루는 문화가 형성되어 있다

## 관련 개념

- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [Code Review Best Practices](/knowledge/software-engineering/quality-and-configuration/code-review-best-practices/)
- [Automated Tooling for Style](/knowledge/software-engineering/quality-and-configuration/automated-tooling-for-style/)
- [Critique](/knowledge/software-engineering/quality-and-configuration/critique/)
