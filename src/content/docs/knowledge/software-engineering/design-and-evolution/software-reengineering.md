---
title: "Software Reengineering"
description: "소프트웨어 리엔지니어링은 기존 레거시 시스템의 구조와 이해도를 개선하여 유지보수성을 향상시키는 프로세스로, 기능을 변경하지 않고 시스템을 재구성한다"
tags: ['Software Reengineering', 'Reverse Engineering', 'Restructuring', 'Migration', 'Legacy Modernization']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-reengineering
sidebar:
  order: 8
---

## 핵심 개념

리엔지니어링의 주요 활동에는 소스 코드 번역(현대 언어로 변환), 역공학(reverse engineering, 프로그램 분석 및 문서화), 프로그램 구조 개선, 프로그램 모듈화, 데이터 리엔지니어링이 포함된다. 리엔지니어링은 완전한 시스템 교체에 비해 위험이 낮고 비용이 적다는 장점이 있다(한 사례에서 재구현 비용 $50M 대비 리엔지니어링 비용 $12M). 그러나 리엔지니어링에는 한계가 있어, 기능적 접근법의 시스템을 객체지향으로 변환하거나 아키텍처를 근본적으로 변경하는 것은 어렵다.

## 예시

리엔지니어링 접근법의 비용 스펙트럼(낮은 비용 → 높은 비용): 소스 코드 번역(COBOL→Java) → 역공학(문서 생성) → 프로그램 구조 개선(스파게티 코드 정리) → 프로그램 모듈화(관련 기능 그룹핑) → 아키텍처 마이그레이션(모놀리식→마이크로서비스).

## 관련 개념

- [Software Maintenance](/knowledge/software-engineering/software-maintenance/)
- [Legacy Systems](/knowledge/software-engineering/legacy-systems/)
- [Refactoring](/knowledge/software-engineering/refactoring/)
