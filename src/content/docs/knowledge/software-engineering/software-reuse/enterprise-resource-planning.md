---
title: "Enterprise Resource Planning"
description: "ERP 시스템은 주문, 재고 관리, 제조 스케줄링 등의 비즈니스 관행을 지원하도록 설계된 대규모 통합 시스템으로, SAP과 Oracle 등이 대표적이다"
tags: ['Erp', 'Enterprise Resource Planning', 'Sap', 'Oracle', 'Business System', 'Configuration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/enterprise-resource-planning
sidebar:
  order: 5
---

## 핵심 개념

ERP 시스템은 여러 모듈로 구성되며 각 모듈은 구매, 공급망 관리, 물류, CRM 등 특정 비즈니스 기능을 지원한다. 구성 과정에서는 포함할 모듈 선택, 데이터 모델 수립, 비즈니스 규칙 정의, 외부 시스템과의 상호작용 정의, 입출력 양식 설계, 비즈니스 프로세스 설계, 플랫폼 파라미터 설정 등이 이루어진다. 고객 비즈니스 모델과 ERP 시스템 모델 간의 불일치가 심각한 경우 시스템이 실제 요구를 충족하지 못할 확률이 높아진다. 테스트 자동화의 어려움과 비즈니스 프로세스에 특화된 미묘한 오류가 주요 과제이다. 거의 모든 대기업이 일부 또는 전체 기능에 ERP 시스템을 사용하고 있다.

## 예시

한 대학에 판매된 ERP 시스템에서 '고객(customer)' 개념이 핵심이었으나, 대학은 학생, 연구 기금 기관, 교육 자선단체 등 다양한 관계를 가지고 있어 이 개념을 적용하는 데 수개월이 소요되었으며 최종 해결책도 요구를 부분적으로만 충족하였다.

## 관련 개념

- [Application System Reuse](/knowledge/software-engineering/application-system-reuse/)
- [Software Product Line](/knowledge/software-engineering/software-product-line/)
- [Software Reuse](/knowledge/software-engineering/software-reuse/)
- [System Procurement](/knowledge/software-engineering/system-procurement/)
