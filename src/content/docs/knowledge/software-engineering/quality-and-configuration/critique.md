---
title: "Critique"
description: "Google의 내부 코드 리뷰 도구로, 코드 리뷰 프로세스를 지원하기 위해 설계된 웹 기반 시스템"
tags: ["Software Engineering", "Code Review", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/critique
sidebar:
  order: 306
---

## 핵심 개념

Critique는 Google의 내부 코드 리뷰 도구로, Google에서 가장 널리 사용되는 코드 리뷰 도구이다. 단순성, 신뢰, 워크플로 통합을 핵심 설계 원칙으로 삼는다. 코드 리뷰를 핵심 초점으로 유지하고, 올인원 도구가 되는 것을 의도적으로 거부한다.

## 동작 원리

Critique의 4가지 설계 원칙:

1. **단순성(Simplicity)**: 불필요한 선택 없이 코드 리뷰를 쉽게 수행. 빠른 UI 로딩, 쉬운 내비게이션, 핫키 지원, 리뷰 상태의 명확한 시각적 표시
2. **신뢰의 기반(Foundation of Trust)**: 코드 리뷰는 속도를 늦추는 것이 아니라 권한을 부여하는 것. 작성자가 사소한 코멘트를 처리했는지 재확인하는 추가 리뷰 단계를 요구하지 않음
3. **일반적 커뮤니케이션(Generic Communication)**: 복잡한 프로토콜 대신 범용적인 코멘트 방식을 우선
4. **워크플로 통합(Workflow Integration)**: Code Search, Cider(웹 IDE), 테스트 결과 등 다른 도구와 긴밀하게 통합

Critique의 코드 리뷰 플로우는 6단계로 구성된다:
1. 변경 생성
2. 리뷰 요청
3. 리뷰어 코멘트
4. 작성자 수정 및 응답
5. 변경 승인
6. 커밋

이 과정에서 Tricorder(정적 분석), 프리서밋 훅, 어텐션 셋 등이 자동으로 지원한다.

## 예시

Critique는 monorepo 및 내부 도구와의 긴밀한 상호 의존성 때문에 외부에서 사용할 수 없다. Google의 오픈소스 프로젝트(Chrome, Android 등)에서는 대신 Gerrit을 사용한다. 긴급한 경우 작성자가 강제로 커밋하고 사후 리뷰를 받을 수도 있지만, 이는 예외적인 경우에만 허용된다.

## 관련 개념

- [Attention Set](/knowledge/software-engineering/quality-and-configuration/attention-set/)
- [LGTM and Approval](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval/)
- [Code Review Diffing](/knowledge/software-engineering/quality-and-configuration/code-review-diffing/)
- [Gerrit](/knowledge/software-engineering/quality-and-configuration/gerrit/)
- [Presubmit Checks](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
