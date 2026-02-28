---
title: "Code Is a Liability, Not an Asset"
description: "코드 자체는 자산이 아니라 부채이며, 진정한 가치는 코드가 아닌 코드가 제공하는 기능에 있다"
tags: ["Software Engineering", "Foundations", "Technical Debt", "Philosophy"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/code-is-liability
sidebar:
  order: 23
---

## 핵심 개념

코드 자체는 자산이 아니라 부채이며, 진정한 가치는 코드가 아닌 코드가 제공하는 기능(functionality)에 있다는 소프트웨어 엔지니어링 원칙이다.

## 동작 원리

코드는 생성 과정뿐 아니라 수명 전체에 걸쳐 비용을 발생시킨다:
- 운영 리소스 비용
- 주변 생태계 변화에 따른 지속적 업데이트 비용
- 전문 지식 유지 비용

동일한 기능을 한 줄의 유지보수 가능한 코드로 얻을 수 있다면 10,000줄의 복잡한 코드보다 전자가 낫다.

따라서 코드 생산량이나 코드베이스 크기에 집중하는 대신, **코드 단위당 기능(functionality per unit of code)을 극대화**해야 한다. 가장 쉬운 방법 중 하나는 더 많은 코드를 작성하는 것이 아니라, 더 이상 필요 없는 초과 코드와 시스템을 제거하는 것이다.

이 원칙은 deprecation 정책과 절차의 근본적 정당성을 제공한다.

## 예시

시스템이 오래되었다고 해서 반드시 deprecation 대상이 되는 것은 아니다. LaTeX 조판 시스템처럼 수십 년간 개선되어 온 시스템도 있다. Deprecation의 대상은 **입증된 구식(demonstrably obsolete) 시스템**이면서 비교 가능한 기능을 제공하는 대체재가 존재하는 경우다.

기존 시스템을 완전히 교체하는 것보다 제자리에서 점진적으로 발전시키는(in-place refactoring) 것이 일반적으로 비용이 적게 든다.

## 관련 개념

- [Deprecation](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [Software Engineering vs Programming](/knowledge/software-engineering/foundations/software-engineering-vs-programming/)
- [Sustainability](/knowledge/software-engineering/foundations/sustainability/)
