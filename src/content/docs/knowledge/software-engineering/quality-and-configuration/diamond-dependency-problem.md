---
title: "다이아몬드 의존성 문제 (Diamond Dependency Problem)"
description: "두 개의 중간 의존성이 동일한 하위 의존성의 서로 다른 호환되지 않는 버전을 요구할 때 발생하는 충돌 상황"
tags: ["Software Engineering", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem
sidebar:
  order: 319
---

## 핵심 개념

다이아몬드 의존성 문제(Diamond Dependency Problem)는 두 개의 중간 의존성이 동일한 하위 의존성의 서로 다른 호환되지 않는 버전을 요구할 때 발생하는 충돌 상황이다. "dependency hell"의 핵심 원인이다.

## 동작 원리

의존성 구조가 다이아몬드 모양이 될 때 문제가 발생한다:

```
MyApp
├── liba → libbase 1.x
└── libb → libbase 2.x
```

`libbase`가 major 버전을 올렸을 때, `libb`는 새 버전으로 업그레이드했지만 `liba`는 아직 업그레이드하지 않은 경우, 두 라이브러리를 동시에 사용하는 상위 프로젝트는 `libbase`의 어떤 버전도 단독으로 선택할 수 없게 된다.

시간이 지남에 따라 모든 소프트웨어에 보안 버그가 발견되므로, 의존성의 일부는 장기적으로 반드시 업데이트해야 한다. 이것이 다이아몬드 문제를 단순히 무시할 수 없는 이유이다.

이 문제의 해결책:
1. **SemVer SAT-solver**: 호환 가능한 버전을 수학적으로 계산
2. **Bundled Distribution**: Linux 배포판처럼 호환 가능한 세트를 미리 검증하여 배포
3. **Live at Head**: 항상 최신 버전을 사용하고, 의존성 제공자가 모든 소비자에 대해 변경을 검증

## 예시

프로젝트 구조: `MyApp -> liba -> libbase 1.x`, `MyApp -> libb -> libbase 2.x`

`liba`는 `libbase` 1.x를 요구하고 `libb`는 `libbase` 2.x를 요구하면, MyApp은 두 버전을 동시에 포함할 수 없어 빌드가 실패한다. 이를 다이아몬드 모양의 의존성 그래프에서 유래하여 "다이아몬드 의존성 문제"라고 부른다.

## 관련 개념

- [의존성 관리 (Dependency Management)](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [최신 버전 사용 (Live at Head)](/knowledge/software-engineering/quality-and-configuration/live-at-head/)
- [번들 배포 모델 (Bundled Distribution Model)](/knowledge/software-engineering/quality-and-configuration/bundled-distribution-model/)
- [최소 버전 선택 (Minimum Version Selection)](/knowledge/software-engineering/quality-and-configuration/minimum-version-selection/)
