---
title: "Single Point of Failure in Teams"
description: "특정 한 사람이 없으면 프로젝트나 팀이 기능하지 못하는 상태 — 리더 자신이 SPOF가 되는 것은 특히 위험한 안티패턴"
tags: ["Software Engineering", "Project Management", "Risk Management", "Leadership"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/single-point-of-failure-in-teams
sidebar:
  order: 17
---

## 핵심 개념

팀의 단일 실패 지점(SPOF)은 특정 한 사람이 없으면 프로젝트나 팀이 기능하지 못하는 상태를 의미한다. 버스 팩터(Bus Factor)와 직결되는 개념으로, 리더 자신이 SPOF가 되는 것은 특히 위험한 안티패턴이다.

## 동작 원리

SPOF를 확인하는 간단한 테스트: "마지막으로 일주일 이상 휴가를 갔을 때, 업무 이메일을 확인했는가?" 확인했다면, 그리고 확인하지 않으면 일이 무너질 것 같다면, 당신은 SPOF이다.

SPOF를 해소하기 위한 방법:
- 의사결정 권한을 하위 리더에게 분산
- 핵심 지식을 문서화하고 여러 사람에게 공유
- 리더가 아닌 사람도 핵심 프로세스를 운영할 수 있도록 훈련
- 의도적으로 "부재" 테스트를 실시 (예: 리더가 일주일간 모든 결정에서 빠지기)

조직적 차원에서도 특정 엔지니어만 이해하는 시스템이 있다면 이는 SPOF이다. 이를 해결하기 위해 코드 리뷰, 문서화, 지식 공유 세션 등을 활용한다.

## 예시

Google의 한 팀에서 시니어 엔지니어 한 명만이 핵심 인프라 시스템의 아키텍처를 완전히 이해하고 있었다. 그가 다른 팀으로 이동했을 때, 해당 시스템에 장애가 발생하면 아무도 효과적으로 대응하지 못했다. 이 경험을 통해 팀은 "한 명만 아는 시스템은 없어야 한다"는 원칙을 세우고, 모든 핵심 시스템에 최소 2명의 전문가를 두는 정책을 수립했다.

## 관련 개념

- [Bus Factor](/knowledge/software-engineering/agile-methods/bus-factor/)
- [Always Be Leaving](/knowledge/software-engineering/project-management/always-be-leaving/)
- [Servant Leadership](/knowledge/software-engineering/agile-methods/servant-leadership/)
