---
title: "코드 리뷰 (Code Review)"
description: "코드가 코드베이스에 도입되기 전에 작성자가 아닌 다른 사람이 검토하는 프로세스 — 구글에서는 사실상 모든 변경이 커밋 전에 리뷰된다"
tags: ["Software Engineering", "Quality", "Code Review", "Collaboration", "Process"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-review
sidebar:
  order: 46
---

## 핵심 개념

코드 리뷰(Code Review)는 코드가 코드베이스에 도입되기 전에 작성자가 아닌 다른 사람이 검토하는 프로세스이다. 구글에서는 사실상 모든 변경이 커밋 전에 리뷰되며, 모든 엔지니어가 리뷰 시작과 리뷰 수행 양쪽 모두를 담당한다.

## 동작 원리

구글의 코드 리뷰는 세 가지 유형의 승인이 필요하다:

1. **정확성과 이해(Correctness and Comprehension)**: 다른 엔지니어(보통 팀원)가 코드가 올바르고 이해 가능한지 확인. LGTM(Looks Good To Me)를 부여한다.
2. **코드 소유자 승인(Code Owner Approval)**: 영향받는 코드 영역의 소유자가 변경이 해당 코드베이스에 적합한지 확인한다.
3. **가독성 승인(Readability Approval)**: 해당 언어의 가독성(readability)을 보유한 사람이 코드가 스타일 가이드와 모범 사례를 따르는지 확인한다.

구글 코드 리뷰의 핵심 원칙:
- **변경은 작게**: 작은 변경이 빠르게 리뷰되고, 문제를 조기에 발견할 수 있다
- **변경 설명은 명확하게**: 첫 줄은 변경의 종류를 요약하고, 본문은 "왜" 이 변경이 필요한지 설명한다
- **리뷰어 수 최소화**: 구글 변경의 대부분은 1명의 리뷰어만 필요하다
- **빠른 턴어라운드**: 24시간 이내 리뷰가 목표, 대부분 수 시간 이내

코드 리뷰는 버그 검출 이상의 가치를 가진다. 지식 공유, 코드 품질 향상, 팀 문화 형성, 심리적 안전감 구축 등의 부수적 효과가 더 크다.

## 예시

구글에서 신규 엔지니어가 첫 코드 변경을 제출하면, 숙련된 리뷰어가 코드뿐만 아니라 코드베이스의 관례, 모범 사례, 관련 라이브러리 등을 안내한다. 이 과정은 공식적인 교육보다 효과적인 온보딩 메커니즘이 된다. 리뷰 코멘트에서 "여기서는 보통 X 패턴을 사용합니다. Y 문서를 참고해 주세요"라는 식의 가이드가 자연스럽게 이루어진다.

## 관련 개념

- [코드 리뷰의 이점 (Code Review Benefits)](/knowledge/software-engineering/quality-and-configuration/code-review-benefits/)
- [코드 리뷰 모범 사례 (Code Review Best Practices)](/knowledge/software-engineering/quality-and-configuration/code-review-best-practices/)
- [LGTM과 승인 유형 (LGTM and Approval Types)](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval-types/)
- [가독성 프로세스 (Readability Process)](/knowledge/software-engineering/quality-and-configuration/readability-process/)
- [스타일 가이드와 규칙 (Style Guides and Rules)](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
