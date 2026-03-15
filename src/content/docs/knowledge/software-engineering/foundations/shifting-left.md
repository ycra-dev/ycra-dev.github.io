---
title: "시프트 레프트 (Shifting Left)"
description: "문제 발견, 테스트, 보안 고려를 개발 워크플로의 가능한 한 이른 단계로 옮겨 수정 비용을 줄이는 DevOps 철학"
tags: ["Software Engineering", "Foundations", "DevOps", "Quality"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/shifting-left
sidebar:
  order: 17
---

## 핵심 개념

"Shifting Left"란 개발자 워크플로에서 문제 발견, 테스트, 보안 고려를 가능한 한 이른 단계(왼쪽)로 옮기는 DevOps 철학이다. 문제를 더 일찍 발견할수록 수정 비용이 저렴하다.

## 동작 원리

개발 프로세스의 타임라인에서 왼쪽은 초기 단계(설계, 코딩)이고 오른쪽은 후기 단계(통합, 테스트, 프로덕션)를 의미한다. Google의 연구에 따르면, 프로덕션에서 발견되는 버그는 정적 분석이나 코드 리뷰 단계에서 발견되는 버그보다 수정 비용이 훨씬 높다.

이 원칙은 방어 심층(defense-in-depth) 접근법과 결합된다. 단일 프로세스나 도구가 완벽할 필요는 없으며, 가능한 한 그래프의 왼쪽에서 많은 결함을 잡는 것이 목표이다.

Google의 개발자 워크플로 타임라인:

```
아이디어 → 설계 문서/리뷰 → 코드 작성 → 커밋 전 리뷰 → 통합/커밋 → 카나리 릴리스 → 프로덕션
(← 왼쪽: 저비용)                                                    (→ 오른쪽: 고비용)
```

## 예시

정적 분석 도구(Tricorder 등)가 코드 리뷰 단계에서 문제를 잡아내면, 프로덕션에서 발견했을 때보다 수정 비용이 크게 절약된다. Google의 인프라 팀들은 개발 프로세스 초기에 품질, 신뢰성, 보안을 강조하는 도구와 실천을 제공하는 것을 공통 목표로 삼고 있다.

## 관련 개념

- [비욘세 규칙 (Beyonce Rule)](/knowledge/software-engineering/foundations/beyonce-rule/)
- [트레이드오프와 비용 (Trade-offs and Costs)](/knowledge/software-engineering/foundations/trade-offs-and-costs/)
- [하이럼의 법칙 (Hyrum's Law)](/knowledge/software-engineering/foundations/hyrums-law/)
