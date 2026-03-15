---
title: "릴리스 후보 (Release Candidate)"
description: "자동화된 프로세스에 의해 조립된 응집력 있고 배포 가능한 단위로, Continuous Build를 통과한 코드와 구성을 포함"
tags: ["Software Engineering", "CI/CD", "Deployment"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/release-candidate
sidebar:
  order: 326
---

## 핵심 개념

릴리스 후보(Release Candidate, RC)는 자동화된 프로세스에 의해 조립된 응집력 있고 배포 가능한 단위이다. Continuous Build를 통과한 코드, 구성 및 기타 의존성을 포함한다. CD의 첫 단계인 릴리스 자동화가 head의 최신 코드와 구성을 지속적으로 RC로 조립한다.

## 동작 원리

대부분의 Google 팀은 true head가 아닌 green head에서 RC를 잘라낸다. 정적 구성도 RC에 포함되어 해당 코드와 함께 테스트를 거치는 것이 중요하다 — 프로덕션 버그의 상당 비율이 "단순한" 구성 문제에서 발생한다.

RC에 대한 포괄적 테스트 실행의 이유:
1. **건전성 검사**: 코드가 RC로 잘려 재컴파일될 때 이상 없는지 확인
2. **감사 가능성**: RC의 테스트 결과를 쉽게 찾을 수 있도록
3. **체리픽 허용**: 체리픽 수정 시 소스 코드가 CB 최신과 달라짐
4. **긴급 푸시**: true head에서 잘라내고 최소 테스트만 실행

프로덕션 테스팅: RC와 동일한 테스트 스위트를 프로덕션(probers)에서도 실행하여 (1) 프로덕션의 작동 상태와 (2) 테스트의 관련성을 검증한다.

## 예시

RC 프로모션 경로: 샌드박스 환경 → 공유 테스트 환경(dev, staging) → 수동 QA → 프로덕션.

Docker 컨테이너를 사용하면 RC가 환경 간 일관성을 유지할 수 있다. Kubernetes(또는 Google의 Borg)로 배포 간 일관성을 강제한다.

Version skew(다중 비호환 버전이 동시 배포된 상태)는 RC 프로모션 과정에서 자주 발견된다.

## 관련 개념

- [지속적 빌드 (Continuous Build)](/knowledge/software-engineering/quality-and-configuration/continuous-build/)
- [단계적 롤아웃 (Staged Rollout)](/knowledge/software-engineering/quality-and-configuration/staged-rollout/)
- [릴리스 트레인 (Release Train)](/knowledge/software-engineering/quality-and-configuration/release-train/)
