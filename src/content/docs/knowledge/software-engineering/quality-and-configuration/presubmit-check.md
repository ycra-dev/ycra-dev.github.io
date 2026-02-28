---
title: "Presubmit Check (Static Analysis)"
description: "코드 변경이 커밋되기 전에 자동으로 실행되는 검사로, 코드 변경이 저장소에 반영되는 것을 차단할 수 있는 게이트 역할"
tags: ["Software Engineering", "Static Analysis", "CI/CD"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/presubmit-check
sidebar:
  order: 315
---

## 핵심 개념

정적 분석 관점의 Presubmit Check는 코드 변경이 커밋되기 전에 자동으로 실행되는 검사로, 코드 변경이 저장소에 반영되는 것을 차단할 수 있는 게이트 역할을 한다. 코드 리뷰에 표시된 경고를 개발자가 무시할 수 있는 것과 달리, presubmit은 커밋 자체를 차단한다.

## 동작 원리

Google에서 presubmit check는 코드 리뷰 외에 정적 분석을 워크플로에 통합하는 추가 지점이다. 개발자가 코드 리뷰에 표시된 정적 분석 경고를 무시할 수 있기 때문에, 커밋을 차단하는 분석을 추가로 운영한다.

Presubmit에는 두 종류가 있다:
- **간단한 내장 검사**: 커밋 메시지에 "DO NOT SUBMIT" 포함 여부, 테스트 파일 포함 여부, 코드 포맷팅 등
- **팀별 맞춤 검사**: 프로젝트별 불변량, 스타일 규칙 등

컴파일러 통합은 presubmit보다 더 이른 단계의 검사이다. Google은 컴파일러 경고를 표시하지 않는 정책을 취한다. 검사를 에러로 활성화하거나(빌드를 깨뜨리거나) 아예 표시하지 않는다.

LSC(Large-Scale Change) 프로세스를 어렵게 만들 수 있어, 변경 설명에 "CLEANUP="이 포함된 변경에는 일부 presubmit을 건너뛴다.

## 예시

Google의 presubmit 실행 시점:
1. 개발자가 리뷰를 위해 변경을 발송할 때
2. 커밋 과정 중
3. 그 사이 임의 시점에서 임의로 트리거 가능

팀별 맞춤 presubmit 예시: 새로운 프로젝트에 레거시 코드보다 높은 베스트 프랙티스 기준 적용.

## 관련 개념

- [Tricorder](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [Error Prone](/knowledge/software-engineering/quality-and-configuration/error-prone/)
- [Presubmit Checks](/knowledge/software-engineering/quality-and-configuration/presubmit-checks/)
- [Large-Scale Changes](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
