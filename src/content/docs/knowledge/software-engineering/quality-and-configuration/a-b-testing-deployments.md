---
title: "A/B Testing Deployments"
description: "기능뿐 아니라 배포 자체를 A/B 테스트하는 방식으로, 원하는 업데이트와 기존 버전을 동시에 배포하여 새 버전이 실제로 개선되었는지 통계적으로 검증"
tags: ["Software Engineering", "CI/CD", "Deployment"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/a-b-testing-deployments
sidebar:
  order: 329
---

## 핵심 개념

배포 A/B 테스트(A/B Testing Deployments)는 기능뿐 아니라 배포 자체를 A/B 테스트하는 방식이다. 원하는 업데이트와 기존 버전(플라시보)을 동시에 배포하여 새 버전이 실제로 개선되었는지 통계적으로 검증한다.

## 동작 원리

기능의 A/B 테스트는 잘 알려져 있지만, Google의 대규모 앱은 **배포 자체도 A/B 테스트**한다. 그 이유는: 아무 변경 없이 업데이트만 푸시해도 디바이스와 사용자 행동에 예측하기 어려운 통계적 변화가 발생할 수 있기 때문이다. 따라서 카나리(소규모 배포)는 크래시나 안정성 문제는 알려주지만, 새 버전이 이전보다 나은지는 알려주지 않는다.

배포 A/B 테스트 방식:
1. 두 버전 배포: 원하는 업데이트 + 플라시보(기존 버전 재배포)
2. 충분히 큰 유사 사용자 기반에 동시 롤아웃
3. 두 릴리스를 비교하여 최신 버전이 실제 개선인지 확인
4. 충분한 사용자 기반이 있으면 수일~수시간 내 통계적 유의성 확보

이 방법이 적용 불가한 경우(소규모 사용자 기반): 변경-중립 릴리스로 배포 안정성만 테스트하고, 모든 새 기능은 피처 플래그로 가드한다.

## 예시

Google 앱의 배포 A/B 테스트 파이프라인:
- Guardrail 메트릭(크래시율, 지연 등)이 영향받지 않는다는 데이터가 충분히 모이면 자동으로 더 많은 트래픽에 릴리스 푸시
- 인간이 대시보드를 보고 판단할 필요 없이 자동화된 파이프라인으로 최속 릴리스 달성

"Shift Left" 원칙의 적용: CI와 CD를 통해 모든 변경에 대해 더 빠르고 데이터 기반의 의사결정을 일찍 활성화한다.

## 관련 개념

- [Staged Rollout](/knowledge/software-engineering/quality-and-configuration/staged-rollout/)
- [Release Train](/knowledge/software-engineering/quality-and-configuration/release-train/)
- [Faster Is Safer](/knowledge/software-engineering/quality-and-configuration/faster-is-safer/)
