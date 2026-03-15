---
title: "파이퍼 (Piper)"
description: "Google이 자체 개발한 중앙집중형 버전 관리 시스템으로, 분산 마이크로서비스로 프로덕션 환경에서 실행되며 Google의 monorepo를 관리한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/piper
sidebar:
  order: 205
---

## 핵심 개념

Piper는 Google이 자체 개발한 중앙집중형 버전 관리 시스템으로, 분산 마이크로서비스로 프로덕션 환경에서 실행되며 Google의 monorepo를 관리한다. 자체 제품이므로 원하는 소스 관리 정책을 커스터마이즈하고 강제할 수 있다.

## 동작 원리

Piper의 주요 특성:
- 80TB 이상의 콘텐츠와 메타데이터 저장
- 매일 수천 명의 엔지니어가 동시에 편집하고 커밋
- 근무일 기준 60,000~70,000건의 커밋 처리
- 새 클라이언트 생성부터 커밋까지 약 15초
- 바이너리 아티팩트도 허용 (전체 저장소가 전송되지 않으므로)

**세분화된 소유권 시스템**:
- 파일 계층의 모든 수준에 OWNERS 파일이 있어 해당 서브트리 내 커밋을 승인할 수 있는 엔지니어를 명시한다
- 소유권은 단순한 텍스트 파일이므로 팀 이전이나 조직 구조조정 시 쉽게 업데이트할 수 있다
- 소유권과 승인 개념을 VCS가 커밋 시점에 직접 강제한다

## 예시

Piper의 OWNERS 파일 시스템은 별도의 저장소와 파일시스템 권한으로 커밋 접근을 제어하는 것보다 훨씬 유연하다. Git의 경우 "commit hook"으로 별도의 권한 검사를 해야 하지만, Piper는 소유권과 승인 개념을 VCS가 커밋 시점에 직접 강제한다. 물리적 저장소 분리에 얽매이지 않으므로, 코드 소유권이 조직 변화에 맞춰 자연스럽게 진화할 수 있다.

## 관련 개념

- [모노레포 (Monorepo)](/knowledge/software-engineering/quality-and-configuration/monorepo/)
- [하나의 버전 규칙 (One Version Rule)](/knowledge/software-engineering/quality-and-configuration/one-version-rule/)
- [코드 검색 (Code Search)](/knowledge/software-engineering/quality-and-configuration/code-search/)
