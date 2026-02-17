---
title: "Application System Reuse"
description: "애플리케이션 시스템 재사용은 소스 코드를 변경하지 않고 고객의 요구에 맞게 적응할 수 있는 대규모 기성(off-the-shelf) 소프트웨어 제품을 재사용하는 것이다"
tags: ['Application System Reuse', 'Software Reuse', 'Cots', 'Off The Shelf', 'System Integration', 'Adaptor']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/application-system-reuse
sidebar:
  order: 4
---

## 핵심 개념

애플리케이션 시스템 재사용에는 단일 시스템 구성과 여러 시스템의 통합 두 가지 접근 방식이 있다. 구성 가능한 애플리케이션 시스템(ERP 등)은 내장된 구성 메커니즘을 통해 특정 고객 요구에 맞게 기능을 조정한다. 통합 방식은 서로 다른 벤더의 애플리케이션 시스템을 결합하여 새로운 시스템을 만든다. 이 방식은 빠른 배포, 기존 경험 활용, 개발 위험 감소 등의 장점이 있으나, 요구사항 적응 필요, 시스템 가정의 변경 불가, 벤더 의존성 등의 단점도 있다. 어댑터(adaptor) 소프트웨어를 사용하여 서로 다른 형식의 데이터를 변환하는 것이 통합의 핵심 과제이다.

## 예시

대규모 기업의 조달 시스템을 구축할 때, 레거시 주문 시스템과 웹 기반 전자상거래 플랫폼, 이메일 시스템을 통합하여 9개월 만에 배포할 수 있었다. Java로 처음부터 개발했다면 3년이 소요될 것으로 예상되었다.

## 관련 개념

- [Software Reuse](/knowledge/software-engineering/software-reuse/)
- [Enterprise Resource Planning](/knowledge/software-engineering/enterprise-resource-planning/)
- [Software Product Line](/knowledge/software-engineering/software-product-line/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
