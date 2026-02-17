---
title: "Pair Programming"
description: "페어 프로그래밍은 두 명의 프로그래머가 하나의 컴퓨터에서 함께 코드를 작성하는 XP의 실천법으로, 한 명은 코드를 타이핑하고(driver) 다른 한 명은 실시간으로 검토하고 조언한다(navigator)"
tags: ['Pair Programming', 'Xp', 'Code Review', 'Collaborative Development', 'Agile']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/pair-programming
sidebar:
  order: 4
---

## 핵심 개념

페어 프로그래밍은 비공식적인 코드 리뷰 과정으로 작동하여 결함을 조기에 발견할 수 있다. 두 프로그래머의 역할은 수시로 교대하며, 코드의 공동 소유권(collective ownership) 개념을 촉진한다. 이 접근법은 지식 공유를 장려하여 팀 구성원 간 역량 편차를 줄인다. 생산성 측면에서 개별 프로그래밍 대비 약간의 시간 손실이 있지만, 코드 품질 향상과 결함 감소로 전체적인 비용 절감 효과가 있는 것으로 보고되고 있다.

## 예시

페어 프로그래밍 과정: Developer A(driver)가 로그인 기능을 코딩하는 동안, Developer B(navigator)는 코드를 실시간으로 검토하며 "비밀번호가 틀릴 때의 예외 처리가 빠졌습니다"와 같은 피드백을 제공한다. 30분 후 역할을 교대한다.

## 관련 개념

- [Extreme Programming](/knowledge/software-engineering/extreme-programming/)
- [Agile Software Development](/knowledge/software-engineering/agile-software-development/)
- [Refactoring](/knowledge/software-engineering/refactoring/)
