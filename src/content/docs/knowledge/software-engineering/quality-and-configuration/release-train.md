---
title: "릴리스 트레인 (Release Train)"
description: "정해진 일정에 따라 주기적으로 릴리스를 내보내는 방식으로, 마감 이후에는 원칙적으로 추가 기능을 포함하지 않는 열차가 시간에 맞춰 떠나는 모델"
tags: ["Software Engineering", "CI/CD", "Deployment"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/release-train
sidebar:
  order: 327
---

## 핵심 개념

릴리스 트레인(Release Train)은 정해진 일정에 따라 주기적으로 릴리스를 내보내는 방식이다. 마감 이후에는 원칙적으로 추가 기능을 포함하지 않는 "열차가 시간에 맞춰 떠나는" 모델이다. 릴리스 비용을 줄이고 팀의 work-life balance를 개선한다.

## 동작 원리

릴리스 트레인의 두 가지 핵심 원칙:

1. **완벽한 바이너리는 없다(No Binary Is Perfect)**: 수십~수백 명의 개발자가 독립적으로 개발한 기능을 통합하면 모든 버그를 고칠 수 없다. 명확한 임계값이 있는 KPI 메트릭으로 트레이드오프를 결정한다.

2. **릴리스 마감을 지켜라(Meet Your Release Deadline)**: 릴리스 열차에 늦으면 열차가 떠난다. 정기적 릴리스는 개발자가 다음 열차를 며칠이 아닌 몇 시간 후에 탈 수 있음을 의미하여 패닉을 줄인다.

릴리스 비용이 높으면 릴리스 주기를 늦추려는 본능이 생기지만, 이는 단기적 안정성만 제공하고 장기적으로 속도를 늦추고 팀과 사용자를 좌절시킨다. **답은 비용 절감, 규율 강화, 리스크의 점진적 분산**이다.

## 예시

Google Search의 릴리스 트레인 도입 사례:
- 이전: 주 1회 릴리스도 달성이 어려웠고 행운에 의존, 각 릴리스 주기에 엔지니어 그룹이 며칠 소요
- 이후: 전담 엔지니어 그룹이 수년에 걸쳐 지속적 릴리스 프로세스 구현, 가능한 것을 자동화하고, 기능 제출 마감을 설정하고, 플러그인/데이터 통합을 단순화
- 결과: 이틀마다 새 Search 바이너리를 일관되게 프로덕션에 릴리스

## 관련 개념

- [단계적 롤아웃 (Staged Rollout)](/knowledge/software-engineering/quality-and-configuration/staged-rollout/)
- [A/B 테스팅 배포 (A/B Testing Deployments)](/knowledge/software-engineering/quality-and-configuration/a-b-testing-deployments/)
- [빠를수록 안전하다 (Faster Is Safer)](/knowledge/software-engineering/quality-and-configuration/faster-is-safer/)
- [릴리스 후보 (Release Candidate)](/knowledge/software-engineering/quality-and-configuration/release-candidate/)
