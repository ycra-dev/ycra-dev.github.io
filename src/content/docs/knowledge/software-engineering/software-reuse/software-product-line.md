---
title: "소프트웨어 프로덕트 라인 (Software Product Line)"
description: "소프트웨어 제품 라인은 공통 아키텍처와 공유 컴포넌트를 기반으로 하며, 각 애플리케이션이 특정 고객 요구사항에 맞게 전문화된 애플리케이션 집합이다"
tags: ['Software Product Line', 'Software Reuse', 'Product Family', 'Specialization', 'Configuration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/software-product-line
sidebar:
  order: 6
---

## 핵심 개념

소프트웨어 제품 라인은 기업이 유사하지만 동일하지 않은 여러 시스템을 지원해야 할 때 가장 효과적인 재사용 방식이다. 기본 애플리케이션(base application)은 핵심 컴포넌트, 구성 가능한 컴포넌트, 도메인 특화 컴포넌트로 구성된다. 제품 라인 전문화에는 플랫폼 전문화, 환경 전문화, 기능 전문화, 프로세스 전문화가 있다. 구성은 설계 시(design-time)와 배포 시(deployment-time)에 이루어질 수 있으며, 배포 시 구성에는 컴포넌트 선택, 워크플로우/규칙 정의, 파라미터 정의가 포함된다. 기존 애플리케이션에서 점진적으로 발전하여 공통 기능을 식별하고 기본 애플리케이션을 설계하는 과정을 거친다.

## 예시

프린터 제조사가 각 프린터 유형에 맞는 프린터 제어 소프트웨어를 개발할 때, 핵심 기능은 공통 제품 라인으로 두고 각 프린터별 특화 기능만 추가하는 방식으로 운영한다. 응급 서비스 차량 배치 시스템도 경찰, 소방, 구급 서비스별로 제품 라인을 전문화할 수 있다.

## 관련 개념

- [소프트웨어 재사용 (Software Reuse)](/knowledge/software-engineering/software-reuse/)
- [애플리케이션 프레임워크 (Application Framework)](/knowledge/software-engineering/application-framework/)
- [애플리케이션 시스템 재사용 (Application System Reuse)](/knowledge/software-engineering/application-system-reuse/)
- [컴포넌트 기반 소프트웨어 공학 (Component-Based Software Engineering)](/knowledge/software-engineering/component-based-software-engineering/)
