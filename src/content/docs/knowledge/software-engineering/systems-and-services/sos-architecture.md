---
title: "SoS Architecture"
description: "SoS 아키텍처는 시스템 오브 시스템즈의 전체 구조를 설계하는 것으로, 포함할 시스템 선택, 상호운용 방식 평가, 상호작용 촉진 메커니즘 설계를 포함한다"
tags: ['Sos Architecture', 'Data Feed', 'Container', 'Transaction', 'Architectural Patterns', 'Interoperability', 'Togaf']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/sos-architecture
sidebar:
  order: 6
---

## 핵심 개념

SoS 아키텍처 설계의 핵심 원칙에는 불완전해도 가치를 전달하도록 설계, 제어 가능한 범위에 대한 현실적 판단, 시스템 인터페이스에 집중, 협력 인센티브 제공이 포함된다. 세 가지 주요 아키텍처 패턴이 있다: (1) 데이터 피드 시스템(주 시스템이 다른 시스템에 데이터를 쿼리), (2) 컨테이너 내 시스템(한 시스템이 인증/저장 등 공통 서비스를 제공하는 가상 컨테이너 역할), (3) 거래 시스템(단일 주 시스템 없이 구성 시스템 간 정보를 교환). TOGAF, MODAF 같은 아키텍처 프레임워크가 SoS 설계를 지원하지만, 초기 모델 개발의 시간 소요와 모델 일관성 유지의 어려움이 한계이다. 인터페이스 개발에서는 기존 시스템에 서비스 기반 인터페이스를 구현하고, 통합 사용자 인터페이스의 개발 여부를 판단해야 한다.

## 예시

영국 차량 등록 시스템은 "데이터 피드" 패턴의 예로, 차량 등록 시스템이 보험 회사들의 연합 시스템("insured vehicles")과 정부 면허 검사 기관의 MOT 인증서 시스템에 데이터를 쿼리한다. iLearn 디지털 학습 환경은 "컨테이너 내 시스템" 패턴의 예로, 인증/저장/구성의 공통 서비스를 제공하고 Office 365, Moodle 등을 통합한다.

## 관련 개념

- [Systems of Systems](/knowledge/software-engineering/systems-of-systems/)
- [Systems Engineering](/knowledge/software-engineering/systems-engineering/)
- [Service-Oriented Architecture](/knowledge/software-engineering/service-oriented-architecture/)
- [Emergent Properties](/knowledge/software-engineering/emergent-properties/)
