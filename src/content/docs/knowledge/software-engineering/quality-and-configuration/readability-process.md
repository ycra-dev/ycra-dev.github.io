---
title: "Readability Process"
description: "구글에서 엔지니어가 특정 프로그래밍 언어의 관용적 사용법과 모범 사례에 대한 숙련도를 인증받는 과정 — Readability를 획득한 엔지니어만이 해당 언어의 가독성 승인을 부여할 수 있다"
tags: ["Software Engineering", "Quality", "Readability", "Mentoring", "Knowledge Sharing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/readability-process
sidebar:
  order: 50
---

## 핵심 개념

Readability 프로세스는 구글에서 엔지니어가 특정 프로그래밍 언어의 관용적 사용법과 모범 사례에 대한 숙련도를 인증받는 과정이다. Readability를 획득한 엔지니어만이 해당 언어의 코드 변경에 가독성 승인을 부여할 수 있다.

## 동작 원리

Readability 프로세스의 작동 방식:
1. 엔지니어가 코드 변경을 제출하면, readability 리뷰어가 스타일, 관용적 사용법, 모범 사례에 대한 상세한 피드백을 제공한다
2. 이 과정을 여러 번 반복하면서 엔지니어의 코드 품질이 향상된다
3. 충분한 숙련도를 보이면 해당 언어의 readability가 부여된다
4. Readability를 획득한 엔지니어는 다른 사람의 코드에 가독성 승인을 부여할 수 있다

Readability의 가치:
- **교육적 효과**: 구글의 코딩 관례를 실무를 통해 학습하는 가장 효과적인 방법
- **멘토링**: 경험 있는 엔지니어와 1:1 상호작용을 통한 실전 멘토링
- **일관성 보장**: 코드베이스 전체에 일관된 스타일과 관행을 유지하는 메커니즘
- **확산 효과**: 한 명의 readability 리뷰어가 수백 명의 엔지니어에게 모범 사례를 전파

비용과 논쟁:
- 수백 명의 엔지니어가 readability 리뷰에 시간을 투자해야 한다
- 일부는 이를 구시대적 "통과의례(hazing)"라고 비판한다
- 구글의 생산성 연구에서 이 프로세스가 비용 대비 가치 있다고 입증했다

## 예시

신규 입사한 시니어 엔지니어가 Java readability를 얻는 과정:
- 첫 몇 개의 CL에서 readability 리뷰어가 구글 특유의 Java 관례(예: `Optional` 사용법, 에러 처리 패턴, Guava 라이브러리 활용)에 대해 상세히 안내
- 약 5~10개의 CL을 거치면서 피드백이 점점 줄어듦
- 충분한 숙련도를 보이면 readability 인증 획득
- 이후 해당 엔지니어가 다른 신규 엔지니어의 readability 리뷰어가 됨

이 과정은 공식 교육보다 효과적인데, 실제 코드와 실제 컨텍스트에서 학습이 이루어지기 때문이다.

## 관련 개념

- [Code Review](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [LGTM and Approval Types](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval-types/)
- [Style Guides and Rules](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [Measuring Engineering Productivity](/knowledge/software-engineering/project-management/measuring-engineering-productivity/)
