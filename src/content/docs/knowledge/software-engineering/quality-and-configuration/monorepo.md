---
title: "Monorepo"
description: "조직의 거의 모든 소스 코드를 하나의 저장소에서 관리하는 버전 관리 전략으로, Google에서는 약 50,000명의 엔지니어가 하나의 저장소를 공유한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/monorepo
sidebar:
  order: 202
---

## 핵심 개념

Monorepo(단일 저장소)는 조직의 거의 모든 소스 코드를 하나의 저장소에서 관리하는 버전 관리 전략이다. Monorepo의 핵심 이점은 One Version 준수가 자연스럽다는 것이다 - 위반하기가 올바르게 하기보다 더 어렵다.

## 동작 원리

Monorepo의 추가 이점:
- 어떤 버전이 공식인지 결정할 프로세스가 불필요하다
- 중요한 저장소를 발견할 필요가 없다
- 빌드 상태를 이해하는 도구 구축이 단순화된다
- 새로운 도구와 최적화의 영향이 일관되게 확산된다
- 엔지니어들이 다른 사람의 작업을 쉽게 볼 수 있다

그러나 Google은 monorepo가 "유일한 정답"이라고 주장하지 않는다. 조직의 보안, 법률, 프라이버시 요구사항이 동일하지 않다면 진정한 monorepo는 적절하지 않을 수 있다. Virtual Monorepo(VMR) 방식으로 여러 세밀한 저장소를 하나의 일관된 "head/trunk" 개념으로 엮을 수도 있다.

## 예시

Google은 Piper라는 자체 개발 중앙집중형 VCS를 사용하며, 80TB 이상의 콘텐츠와 메타데이터를 저장한다. 근무일 기준 60,000~70,000건의 커밋이 처리된다. 새 클라이언트 생성, 파일 추가, 커밋까지 약 15초면 완료된다. 파일 계층의 모든 수준에 OWNERS 파일이 있어 세분화된 소유권 관리가 가능하다.

Microsoft, Facebook, Netflix, Uber도 monorepo 접근법을 공개적으로 언급한 바 있다.

## 관련 개념

- [One Version Rule](/knowledge/software-engineering/quality-and-configuration/one-version-rule/)
- [Source of Truth](/knowledge/software-engineering/quality-and-configuration/source-of-truth/)
- [Piper](/knowledge/software-engineering/quality-and-configuration/piper/)
- [Code Search](/knowledge/software-engineering/quality-and-configuration/code-search/)
