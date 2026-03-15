---
title: "LGTM과 승인 유형 (LGTM and Approval Types)"
description: "코드 리뷰에서 코드가 정확하고 이해 가능하다는 승인 — 구글에서는 정확성/이해도, 코드 소유자 승인, 가독성 승인의 세 가지 독립적인 승인 유형이 필요하다"
tags: ["Software Engineering", "Quality", "Code Review", "Approval", "Ownership"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/lgtm-and-approval-types
sidebar:
  order: 49
---

## 핵심 개념

LGTM(Looks Good To Me)은 코드 리뷰에서 코드가 정확하고 이해 가능하다는 승인이다. 구글에서는 세 가지 독립적인 승인 유형이 필요하며, 이들은 서로 다른 관점에서 코드를 검증한다.

## 동작 원리

구글의 코드 변경이 커밋되기 위해 필요한 세 가지 승인:

**1. LGTM (정확성/이해도)**:
- 리뷰어가 코드가 올바르고, 적절하게 설계되었으며, 의도가 명확하다고 판단
- 보통 같은 팀의 엔지니어가 부여
- "이 코드가 무엇을 하고, 왜 하는지 이해했고, 올바르게 동작한다고 생각한다"는 의미

**2. 코드 소유자 승인(Owner Approval)**:
- 영향받는 디렉토리/파일의 소유자가 해당 변경이 코드베이스에 적합한지 확인
- OWNERS 파일에 소유자가 명시됨
- "이 변경이 내가 관리하는 코드에 들어오는 것을 허가한다"는 의미

**3. 가독성 승인(Readability Approval)**:
- 해당 프로그래밍 언어의 "readability"를 보유한 사람이 스타일 가이드 준수를 확인
- 코드가 언어의 관용적(idiomatic) 사용법을 따르는지 확인
- "이 코드가 우리의 스타일 기준을 충족한다"는 의미

**효율성을 위한 최적화**: 실무에서는 한 사람이 여러 승인을 동시에 제공할 수 있다. 예를 들어, readability를 보유한 코드 소유자가 LGTM까지 줄 수 있으면 한 명의 리뷰어로 충분하다. 구글 변경의 대부분은 실제로 1명의 리뷰어만 있으면 된다.

## 예시

신규 엔지니어가 Python으로 변경을 제출하면:
1. 팀 동료가 로직을 확인하고 LGTM을 부여
2. 해당 디렉토리의 OWNERS 파일에 등록된 시니어 엔지니어가 소유자 승인
3. Python readability를 가진 엔지니어가 PEP 8 준수, 관용적 Python 사용 등을 확인하고 가독성 승인

만약 LGTM 부여자가 코드 소유자이면서 readability도 보유하고 있다면, 한 번의 리뷰로 세 가지 승인을 모두 받을 수 있다.

## 관련 개념

- [코드 리뷰 (Code Review)](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [코드 리뷰 모범 사례 (Code Review Best Practices)](/knowledge/software-engineering/quality-and-configuration/code-review-best-practices/)
- [가독성 프로세스 (Readability Process)](/knowledge/software-engineering/quality-and-configuration/readability-process/)
- [스타일 가이드와 규칙 (Style Guides and Rules)](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
