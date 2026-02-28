---
title: "Staged Rollout"
description: "변경을 전체 사용자에게 한 번에 배포하지 않고 점진적으로 증가하는 비율의 사용자에게 배포하여 문제를 빠르게 수정할 수 있도록 하는 배포 전략"
tags: ["Software Engineering", "CI/CD", "Deployment"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/staged-rollout
sidebar:
  order: 328
---

## 핵심 개념

단계적 롤아웃(Staged Rollout)은 변경을 전체 사용자에게 한 번에 배포하지 않고, 점진적으로 증가하는 비율의 사용자에게 배포하여 문제를 빠르게 수정할 수 있도록 하는 배포 전략이다. 포괄적 테스트 대신 **대표적 테스트**를 목표로 한다.

## 동작 원리

디바이스 다양성과 사용자 기반의 폭을 포괄적 테스트로 다루는 것은 실질적으로 불가능하다. 단계적 롤아웃의 핵심:

1. 점진적으로 증가하는 사용자 비율에 배포하여 빠른 수정 가능
2. 자동화된 A/B 릴리스로 인간이 대시보드를 보고 판단할 필요 없이 통계적으로 유의미한 결과 확보
3. 대규모 사용자 기반에서는 수일~수시간 내에 통계적 유의성 확보 가능

Google의 대규모 앱은 배포 자체를 A/B 테스트한다: 원하는 업데이트와 플라시보(기존 버전 재배포)를 동시에 배포하여 새 버전이 실제로 이전보다 개선되었는지 비교한다.

충분한 사용자 기반이 없는 경우: **변경-중립 릴리스(change-neutral releases)** 권장 - 모든 새 기능을 플래그로 가드하여 배포 자체의 안정성만 테스트한다.

## 예시

Android 클라이언트 배포 시 Google 앱의 전략:
- 특수 테스팅 트랙과 점진적으로 증가하는 사용자 트래픽 비율에 단계적 롤아웃
- Play Store의 무제한 테스팅 트랙을 활용하여 출시 예정 국가마다 QA 팀 설정
- 글로벌 야간 턴어라운드로 핵심 기능 테스트

자동화된 메트릭 파이프라인: guardrail 메트릭이 영향받지 않는다는 충분한 데이터가 모이면 즉시 릴리스를 더 많은 트래픽으로 푸시하여 가장 빠른 릴리스 가능.

## 관련 개념

- [A/B Testing Deployments](/knowledge/software-engineering/quality-and-configuration/a-b-testing-deployments/)
- [Release Train](/knowledge/software-engineering/quality-and-configuration/release-train/)
- [Faster Is Safer](/knowledge/software-engineering/quality-and-configuration/faster-is-safer/)
