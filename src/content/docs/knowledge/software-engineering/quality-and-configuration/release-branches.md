---
title: "Release Branches"
description: "제품 릴리스에 포함된 정확한 코드를 나타내는 브랜치로, 릴리스 후 발견된 심각한 결함에 대해 trunk에서 cherry-pick으로 수정을 적용한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/release-branches
sidebar:
  order: 204
---

## 핵심 개념

Release branch는 제품 릴리스에 포함된 정확한 코드를 나타내는 브랜치로, 릴리스 후 발견된 심각한 결함에 대해 trunk에서 cherry-pick으로 수정을 적용한다. Dev 브랜치와 달리 release 브랜치는 일반적으로 무해하다. 두 브랜치의 핵심 차이는 기대되는 최종 상태에 있다.

## 동작 원리

Dev 브랜치와 Release 브랜치의 차이:
- **Dev 브랜치**: trunk에 다시 머지될 것으로 예상되고 다른 팀이 추가 브랜치를 만들 수 있다
- **Release 브랜치**: 결국 폐기(abandoned)될 것으로 예상된다

DORA가 식별한 최고 성능 기술 조직에서는 release 브랜치가 사실상 존재하지 않는다. Continuous Deployment(CD)를 달성한 조직은 하루에 여러 번 trunk에서 릴리스할 수 있으므로, cherry-pick과 브랜치는 불필요한 오버헤드다.

**Release 브랜치 사용 원칙**:
- Cherry-pick을 최소화한다
- Trunk에 다시 머지할 계획을 세우지 말아야 한다
- 사용 가능한 정확한 코드 버전을 추적하는 목적으로만 사용한다

## 예시

월간 릴리스를 하면서 다음 릴리스를 계속 개발한다면 release 브랜치를 만드는 것이 합리적이다. 고객에게 디바이스를 출시하는 경우, "필드에 나가 있는" 정확한 버전을 아는 것이 가치 있다.

## 관련 개념

- [Dev Branches](/knowledge/software-engineering/quality-and-configuration/dev-branches/)
- [Source of Truth](/knowledge/software-engineering/quality-and-configuration/source-of-truth/)
