---
title: "릴리스 테스팅 (Release Testing)"
description: "릴리즈 테스트는 개발 팀 외부에서 사용될 시스템 릴리즈에 대해 수행하는 테스트 과정으로, 시스템이 요구사항을 충족하고 사용하기에 충분한지 확인하는 검증(validation) 테스트이다"
tags: ['Release Testing', 'System Testing', 'Black Box Testing', 'Performance Testing', 'Stress Testing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/release-testing
sidebar:
  order: 6
---

## 핵심 개념

릴리즈 테스트는 개발 팀이 아닌 별도의 테스트 팀이 수행해야 하며, 블랙박스 테스트(기능 테스트)가 주된 접근법이다. 릴리즈 테스트에는 요구사항 기반 테스트(각 요구사항에 대한 테스트 케이스 설계), 시나리오 테스트(사실적인 사용 시나리오 기반 테스트), 성능 테스트(부하 테스트 및 스트레스 테스트)가 포함된다. 스트레스 테스트는 시스템의 설계 한계를 초과하는 부하를 가하여 장애 동작을 확인하는 테스트이다.

## 예시

스트레스 테스트 예시: 초당 300건의 트랜잭션 처리가 설계 목표인 시스템에 대해 100건 → 200건 → 300건 → 400건 → 500건으로 점진적으로 부하를 증가시키며 시스템의 응답 시간과 장애 동작을 관찰한다.

## 관련 개념

- [검증과 확인 (Verification and Validation)](/knowledge/software-engineering/verification-and-validation/)
- [인수 테스팅 (Acceptance Testing)](/knowledge/software-engineering/acceptance-testing/)
