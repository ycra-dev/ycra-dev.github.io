---
title: "Software Development Lifecycle"
description: "소프트웨어를 체계적으로 개발하기 위한 전체 프로세스 단계로, 계획부터 배포·유지보수까지 이어지는 일련의 활동 흐름이다."
tags: ["Software Engineering", "SDLC", "Process"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/software-development-lifecycle
sidebar:
  order: 23
---

## 핵심 개념

소프트웨어 개발 생명주기(SDLC)는 소프트웨어를 만드는 전 과정을 체계화한 프레임워크다. "계획 → 요구사항 분석 → 설계 → 구현 → 테스트 → 배포 → 유지보수" 순으로 이어지며, 어떤 방법론(폭포수, 애자일 등)을 쓰더라도 이 핵심 단계들은 반드시 존재한다.

## 동작 원리

주요 단계별 역할:

| 단계 | 목적 | 산출물 |
|------|------|--------|
| 계획 | 범위·일정·비용 확정 | 프로젝트 계획서 |
| 요구사항 | 무엇을 만들지 정의 | 요구사항 명세서 |
| 설계 | 어떻게 만들지 결정 | 아키텍처 문서 |
| 구현 | 실제 코드 작성 | 소스코드 |
| 테스트 | 결함 발견 및 검증 | 테스트 리포트 |
| 배포 | 사용자에게 전달 | 릴리즈 |
| 유지보수 | 버그 수정·개선 | 패치, 업데이트 |

폭포수 모델은 각 단계를 순차적으로 완료하고 다음 단계로 넘어가는 반면, 애자일은 짧은 이터레이션 안에서 여러 단계를 반복 수행한다.

## 예시

- 모바일 앱 개발: "로그인 기능 요구사항 확정 → API 설계 → 코드 작성 → QA 테스트 → 앱스토어 배포 → 버그 패치"
- 폭포수: 요구사항이 완전히 확정된 후에야 설계 시작
- 스크럼: 2주 스프린트 안에서 계획·구현·테스트를 매 반복마다 수행

## 관련 개념

- [소프트웨어 개발 방법론](/knowledge/software-engineering/agile-methods/agile-software-development/)
- [스크럼](/knowledge/software-engineering/agile-methods/scrum/)
- [지속적 통합](/knowledge/software-engineering/agile-methods/continuous-integration/)
