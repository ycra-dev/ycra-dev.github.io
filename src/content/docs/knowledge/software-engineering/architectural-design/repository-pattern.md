---
title: "Repository Pattern"
description: "저장소 패턴은 시스템의 모든 컴포넌트가 중앙 데이터 저장소(repository)를 통해 데이터를 공유하고 교환하는 아키텍처 패턴이다"
tags: ['Repository Pattern', 'Data Sharing', 'Centralized Data', 'Architecture', 'Data Management']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/repository-pattern
sidebar:
  order: 8
---

## 핵심 개념

저장소 패턴에서 모든 데이터는 중앙 데이터베이스에 저장되며, 각 서브시스템은 이 저장소에 접근하여 데이터를 읽고 쓴다. 이 패턴은 대량의 데이터를 장기간 보관하고 여러 컴포넌트가 공유해야 하는 시스템에 적합하다. IDE(통합 개발 환경), CASE 도구, 명령어 및 제어 시스템 등에서 사용된다. 장점은 데이터 일관성 유지와 독립적 컴포넌트 개발이 가능하다는 것이며, 단점은 저장소가 단일 장애점(single point of failure)이 될 수 있다는 것이다.

## 예시

IDE의 저장소 패턴: 코드 에디터, 컴파일러, 디버거, 코드 분석기 등의 컴포넌트가 모두 중앙 프로젝트 저장소(소스 코드, AST, 심볼 테이블 등)에 접근하여 데이터를 공유한다.

## 관련 개념

- [Architectural Patterns](/knowledge/software-engineering/architectural-patterns/)
- [Software Architecture](/knowledge/software-engineering/software-architecture/)
- [Client-Server Architecture](/knowledge/software-engineering/client-server-architecture/)
