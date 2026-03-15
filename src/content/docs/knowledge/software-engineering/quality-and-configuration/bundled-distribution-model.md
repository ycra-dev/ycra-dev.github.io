---
title: "번들 배포 모델 (Bundled Distribution Model)"
description: "조직이 의존성 컬렉션을 모아 상호 호환 가능한 세트를 찾아 단일 단위로 배포하는 의존성 관리 방식"
tags: ["Software Engineering", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/bundled-distribution-model
sidebar:
  order: 323
---

## 핵심 개념

번들 배포 모델(Bundled Distribution Model)은 조직이 의존성 컬렉션을 모아 상호 호환 가능한 세트를 찾아 단일 단위로 배포하는 의존성 관리 방식이다. Linux 배포판이 대표적인 예이다. 새로운 행위자인 **배포자(distributors)**를 도입한다.

## 동작 원리

이 모델은 "더 큰 상자로 감싸서 그 컬렉션을 릴리스"하는 방식으로 동작한다. 개별 의존성의 유지관리자들은 서로에 대해 거의 알지 못하지만, 상위 수준의 배포자들이 호환 가능한 버전 세트를 찾고, 테스트하고, 이슈를 해결하는 과정에 관여한다.

외부 사용자 입장에서는 하나의 번들 배포에만 의존할 수 있다면 잘 작동한다. "이 72개 라이브러리의 이 버전들에 의존한다"가 아니라 "RedHat 버전 N에 의존한다"로 단순화된다.

하위 수준 의존성이 상위 수준보다 약간 오래된 경향이 있는데, 통합에 시간이 걸리기 때문이다.

장단점:
- **장점**: 사용자는 호환성을 직접 관리할 필요 없음
- **단점**: 배포판에 포함되지 않은 의존성을 추가하면 호환성 문제 발생 가능

## 예시

- **Linux 배포판** (RedHat, Ubuntu 등): 패키지 관리자가 호환 가능한 버전 세트를 찾아 배포. 각 배포판의 릴리스 주기에 맞춰 통합 및 테스트를 수행
- **NPM**: 특정 시점 T의 그래프에 있는 조각들에 의존

Linux 배포판은 사용자가 "yum install python"만 실행하면 모든 의존성이 자동으로 호환되도록 설치된다. 배포판 관리자가 이미 호환성 검증을 완료했기 때문이다.

## 관련 개념

- [의존성 관리 (Dependency Management)](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [다이아몬드 의존성 문제 (Diamond Dependency Problem)](/knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem/)
- [최신 버전 사용 (Live at Head)](/knowledge/software-engineering/quality-and-configuration/live-at-head/)
