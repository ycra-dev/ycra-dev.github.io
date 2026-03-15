---
title: "최소 버전 선택 (Minimum Version Selection)"
description: "의존성 업데이트 시 최신 버전이 아닌 요구사항을 만족하는 최소 버전을 선택하는 SemVer 의존성 관리 변형"
tags: ["Software Engineering", "Dependencies"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/minimum-version-selection
sidebar:
  order: 321
---

## 핵심 개념

최소 버전 선택(Minimum Version Selection, MVS)은 의존성 업데이트 시 최신 버전이 아닌 요구사항을 만족하는 최소 버전을 선택하는 SemVer 의존성 관리의 변형이다. Google의 Russ Cox가 Go 패키지 관리 시스템을 위해 제안했다.

## 동작 원리

기존 SemVer 제약 해결기는 하위 의존성의 가능한 최신 버전을 선택한다. MVS는 반대 선택을 한다: `liba`가 `libbase >= 1.7`을 요구하면, 1.8이 있더라도 1.7을 직접 사용한다.

핵심 통찰: `liba` 개발자가 `libbase` 1.7을 설치한 상태에서 개발했을 가능성이 높으므로, 해당 버전 조합에 대한 일화적 상호운용성 증거가 있다는 것이다.

이는 SemVer의 핵심 문제(소프트웨어 변경을 버전 번호로 압축할 때의 충실도 손실)를 인정하는 것이다. 더 작은 단계로 전진하는 것이 더 안전하다. 마치 1년치 작업을 한 번에 커밋하는 것보다 한 시간 작업을 커밋하는 것이 안전한 것처럼, 더 가까운 버전 간 점프가 더 안전하다.

## 예시

`liba`의 스펙이 `libbase >= 1.7`을 요구하는 경우:
- 기존 방식: `libbase` 1.8(최신)을 선택
- MVS 방식: `libbase` 1.7(요구 최소)을 선택

MVS의 장점: `liba` 개발자가 실제로 1.7에서 기본 테스트를 수행했을 가능성이 높으므로, 선택된 버전들이 함께 테스트된 적이 있는 버전에 가장 가깝다. MVS가 SemVer를 "충분히 좋게" 만드는지는 아직 검증 중이지만, 현재 방식에 비해 명백한 개선이다.

## 관련 개념

- [의존성 관리 (Dependency Management)](/knowledge/software-engineering/quality-and-configuration/dependency-management/)
- [다이아몬드 의존성 문제 (Diamond Dependency Problem)](/knowledge/software-engineering/quality-and-configuration/diamond-dependency-problem/)
- [최신 버전 사용 (Live at Head)](/knowledge/software-engineering/quality-and-configuration/live-at-head/)
