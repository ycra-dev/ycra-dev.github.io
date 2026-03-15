---
title: "코드 소유권 (Code Ownership)"
description: "코드베이스의 특정 부분에 대한 책임과 권한을 정의하는 거버넌스 모델 — 구글에서는 디렉토리별 OWNERS 파일을 통해 소유자를 명시하며, 소유자만이 해당 코드에 대한 변경을 승인할 수 있다"
tags: ["Software Engineering", "Quality", "Code Ownership", "Governance", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-ownership
sidebar:
  order: 52
---

## 핵심 개념

코드 소유권(Code Ownership)은 코드베이스의 특정 부분에 대한 책임과 권한을 정의하는 거버넌스 모델이다. 구글에서는 디렉토리별 OWNERS 파일을 통해 소유자를 명시하며, 소유자만이 해당 코드에 대한 변경을 승인할 수 있다.

## 동작 원리

구글의 코드 소유권 모델의 특징:

**1. 집합적 소유(Collective Ownership)**: 코드는 개인이 아닌 팀이 소유한다. OWNERS 파일에는 여러 사람이 등록되어, 한 사람이 부재해도 변경이 차단되지 않는다.

**2. OWNERS 파일 시스템**: 디렉토리 계층 구조에 OWNERS 파일이 배치되고, 상위 디렉토리의 소유자는 하위 디렉토리의 변경도 승인할 수 있다. 이는 유연한 거버넌스를 가능하게 한다.

**3. 소유권의 의미**:
- 해당 코드의 품질과 건강에 대한 책임
- 변경을 승인할 권한
- 해당 영역의 기술적 방향을 설정할 역할
- 코드가 스타일 가이드와 팀 관례를 따르도록 보장

**4. 누구나 기여 가능**: 소유권은 "이 코드는 내 것이니 손대지 마"가 아니다. 구글에서 어떤 엔지니어든 어떤 코드든 변경을 제출할 수 있다. 다만 소유자의 승인이 필요하다. 이는 혁신과 거버넌스의 균형을 맞춘다.

코드 소유권은 Bus Factor와 직결된다. 소유자가 한 명뿐이면 SPOF가 된다. 여러 명의 소유자를 두고, 소유권을 점진적으로 새로운 멤버에게 확장하는 것이 건강한 관행이다.

## 예시

구글에서 한 인프라 라이브러리의 OWNERS 파일에 3명의 엔지니어가 등록되어 있었다. 두 명이 동시에 휴가를 갔을 때, 긴급한 보안 패치가 필요했지만 남은 한 명이 해당 영역에 익숙하지 않았다. 이 경험 이후 팀은 OWNERS를 5명으로 확장하고, 정기적으로 소유권을 순환(rotation)시키는 정책을 도입했다.

## 관련 개념

- [코드 리뷰 (Code Review)](/knowledge/software-engineering/quality-and-configuration/code-review/)
- [LGTM과 승인 유형 (LGTM and Approval Types)](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval-types/)
- [버스 팩터 (Bus Factor)](/knowledge/software-engineering/agile-methods/bus-factor/)
- [팀의 단일 장애점 (Single Point of Failure in Teams)](/knowledge/software-engineering/project-management/single-point-of-failure-in-teams/)
