---
title: "TAP 트레인 (TAP Train)"
description: "Google의 Test Automation Platform에서 LSC를 효율적으로 테스트하기 위한 전략으로, 여러 변경을 하나의 열차로 묶어 공통 테스트를 실행하는 방식"
tags: ["Software Engineering", "CI/CD", "Testing", "Google Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/tap-train
sidebar:
  order: 302
---

## 핵심 개념

TAP Train은 Google의 Test Automation Platform(TAP)에서 LSC를 효율적으로 테스트하기 위한 전략으로, 여러 변경을 하나의 "열차"로 묶어 공통 테스트를 실행하고 실패 원인을 개별적으로 추적하는 방식이다.

## 동작 원리

핵심 통찰: LSC의 개별 변경들은 서로 거의 상호작용하지 않으며, 대부분의 영향받는 테스트는 대부분의 LSC에 대해 통과한다. 따라서 한 번에 하나 이상의 변경을 테스트하여 전체 테스트 실행 횟수를 줄일 수 있다.

TAP Train의 5단계 (3시간마다 새로 시작):
1. 각 변경에 대해 무작위 1,000개 테스트 샘플 실행
2. 1,000개 테스트를 통과한 변경들을 하나의 uber-change("열차")로 결합
3. 그룹 변경에 직접 영향받는 모든 테스트의 합집합 실행 (6시간 이상 소요 가능)
4. 실패한 비-flaky 테스트를 각 변경에 대해 개별 재실행하여 원인 파악
5. 각 변경에 대한 보고서 생성 (LSC 제출 안전성 증거)

LSC는 대부분 순수 리팩토링이어서 범위가 좁고, 개별 변경은 단순하고 면밀히 검토되어 정확할 가능성이 높다. 이것이 이 방식이 효과적인 이유이다.

## 예시

대규모 LSC의 경우 Google 저장소의 거의 모든 테스트를 실행해야 할 수 있다. Train 모델을 사용하면 추가 변경을 배치에 포함하는 것은 거의 무료이다(이미 전체 테스트를 실행하므로). 실패한 테스트만 개별 변경에 대해 재실행하면 되므로 전체 비용이 크게 줄어든다.

## 관련 개념

- [대규모 코드 변경 (Large-Scale Changes)](/knowledge/software-engineering/design-and-evolution/large-scale-changes/)
- [로지 (Rosie)](/knowledge/software-engineering/design-and-evolution/rosie/)
- [테스트 자동화 플랫폼 (Test Automation Platform)](/knowledge/software-engineering/testing/test-automation-platform/)
