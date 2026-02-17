---
title: "Reviews and Inspections"
description: "리뷰와 인스펙션은 소프트웨어, 문서화, 프로세스 기록을 검토하여 오류, 누락, 표준 위반을 발견하는 품질 보증 활동이다"
tags: ['Code Review', 'Inspection', 'Peer Review', 'Quality Assurance', 'Defect Detection']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/reviews-and-inspections
sidebar:
  order: 4
---

## 핵심 개념

리뷰 프로세스는 사전 리뷰 활동(review planning, preparation), 리뷰 미팅(walk-through, 최대 2시간), 사후 리뷰 활동(문제 수정, 후속 확인)의 3단계로 구성된다. 프로그램 인스펙션은 팀원들이 소스 코드를 한 줄씩 면밀히 검토하는 동료 리뷰(peer review)로, 결함과 문제를 식별한다. 인스펙션에서는 데이터 결함, 제어 결함, 입출력 결함, 인터페이스 결함, 저장소 관리 결함, 예외 관리 결함 등의 체크리스트를 사용한다. Fagan의 연구에 따르면 비공식 프로그램 인스펙션으로 60% 이상의 오류를 탐지할 수 있으며, 이는 단위 테스트의 25% 결함 탐지율보다 높다. 리뷰와 인스펙션의 목적은 소프트웨어 품질 개선이지 개인의 성과 평가가 아니다.

## 예시

인스펙션 체크리스트 항목 예시: "모든 프로그램 변수가 값이 사용되기 전에 초기화되었는가?", "각 조건문의 조건이 올바른가?", "각 루프가 반드시 종료되는가?", "모든 함수 및 메서드 호출이 올바른 수의 매개변수를 가지는가?", "링크드 구조가 수정될 때 모든 링크가 올바르게 재할당되었는가?"

## 관련 개념

- [Software Quality Management](/knowledge/software-engineering/software-quality-management/)
- [Software Standards](/knowledge/software-engineering/software-standards/)
- [Software Measurement](/knowledge/software-engineering/software-measurement/)
