---
title: "비난 없는 포스트모템 문화 (Blameless Postmortem Culture)"
description: "장애나 실패가 발생했을 때 개인을 비난하지 않고 시스템적 원인을 분석하여 재발을 방지하는 문서화된 프로세스 — 리더십 관점에서"
tags: ["Software Engineering", "Agile", "Leadership", "Incident Management", "Learning"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/blameless-postmortem-culture
sidebar:
  order: 39
---

## 핵심 개념

비난 없는 포스트모템(Blameless Postmortem)은 장애나 실패가 발생했을 때 개인을 비난하지 않고, 시스템적 원인을 분석하여 재발을 방지하는 문서화된 프로세스이다. "누가 잘못했나?"가 아닌 "무엇이 잘못되었고 어떻게 방지할 수 있나?"를 묻는다.

## 동작 원리

비난 없는 포스트모템의 핵심 원칙:

1. **개인이 아닌 시스템에 초점**: 사람이 실수한 것이 아니라, 실수를 허용한 시스템이 문제라고 본다. "왜 이 사람이 프로덕션 DB를 삭제할 수 있었는가?"가 올바른 질문이다.

2. **투명한 공유**: 포스트모템 문서는 조직 전체에 공유되어 다른 팀도 배울 수 있다.

3. **구체적인 액션 아이템**: 단순한 반성에 그치지 않고, 재발 방지를 위한 구체적인 기술적/프로세스적 변경 사항을 도출한다.

4. **후속 조치 추적**: 액션 아이템이 실제로 완료되었는지 추적한다.

이 문화의 장기적 효과: 엔지니어들이 실수를 숨기지 않고 보고하게 되므로, 조직은 더 빠르게 문제를 발견하고 수정할 수 있다. 이는 심리적 안전감과 직결된다.

## 예시

한 엔지니어가 실수로 잘못된 설정을 배포하여 서비스가 30분간 중단되었다. 비난 없는 포스트모템에서 팀은 다음을 발견했다:
- 설정 변경에 대한 자동 검증이 없었음
- 배포 롤백 절차가 문서화되어 있지 않았음
- canary 배포 단계가 건너뛰어졌음

결과적으로 자동 검증 추가, 롤백 절차 자동화, canary 배포 강제화가 액션 아이템으로 도출되었다. 실수한 엔지니어는 처벌 대신 이 개선 작업의 리더가 되었다.

## 관련 개념

- [심리적 안전감 - 리더십 (Psychological Safety in Leadership)](/knowledge/software-engineering/agile-methods/psychological-safety-leadership/)
- [서번트 리더십 (Servant Leadership)](/knowledge/software-engineering/agile-methods/servant-leadership/)
- [비난 없는 포스트모템 (Blameless Postmortem)](/knowledge/software-engineering/agile-methods/blameless-postmortem/)
