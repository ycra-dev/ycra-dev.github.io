---
title: "Presubmit Checks"
description: "리뷰를 요청하거나 변경을 커밋할 때 자동으로 실행되는 사전 커밋 훅으로, 코드 품질과 프로젝트 규칙을 자동으로 검증"
tags: ["Software Engineering", "Code Review", "CI/CD", "Automation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/presubmit-checks
sidebar:
  order: 312
---

## 핵심 개념

Presubmit check(프리서밋 검사)는 리뷰를 요청하거나 변경을 커밋할 때 자동으로 실행되는 사전 커밋 훅이다. 코드 품질과 프로젝트 규칙을 자동으로 검증하며, trunk에 불안정한 코드가 커밋되는 것을 방지하는 최종 관문 역할을 한다.

## 동작 원리

Critique에서 리뷰어에게 변경을 할당하면 presubmit이 트리거된다. 실행 시점:
1. 개발자가 리뷰를 위해 변경을 발송할 때
2. 커밋 과정 중
3. 그 사이 임의 시점에서 임의로 트리거 가능

가장 일반적인 훅:
1. **이메일 리스트 자동 추가**: 변경에 대한 인식과 투명성 제고
2. **자동 테스트 스위트 실행**: 프로젝트의 테스트 자동 실행
3. **프로젝트별 불변량 강제**: 코드(로컬 코드 스타일 규칙)와 변경 설명(릴리스 노트 생성을 위한 형식) 모두

테스트 실행은 리소스 집약적이므로 모든 스냅샷이 아닌 리뷰 요청과 커밋 시점에만 실행된다. 실패한 presubmit 결과는 분석기 결과와 유사하게 표시되지만, 실패가 리뷰 전송이나 커밋을 차단한다는 추가 표시가 있다.

## 예시

팀별 맞춤 presubmit 예시: 새로운 프로젝트에 레거시 코드보다 높은 베스트 프랙티스 기준을 적용한다. 단, LSC(Large-Scale Change) 프로세스를 어렵게 만들 수 있어 변경 설명에 "CLEANUP="이 포함된 변경에는 일부 건너뛴다.

긴급한 경우 작성자는 강제 커밋하고 사후 리뷰(post-commit review)를 받을 수 있지만, 이는 예외적인 경우에만 허용된다.

## 관련 개념

- [Critique](/knowledge/software-engineering/quality-and-configuration/critique/)
- [Tricorder](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [Presubmit Check (Static Analysis)](/knowledge/software-engineering/quality-and-configuration/presubmit-check/)
- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
