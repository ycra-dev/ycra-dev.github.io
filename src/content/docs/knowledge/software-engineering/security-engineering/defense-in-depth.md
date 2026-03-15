---
title: "심층 방어 (Defense in Depth)"
description: "단일 보안 메커니즘에 의존하지 않고 여러 가지 다른 기법을 사용하여 다중 방어 계층을 구축하는 보안 설계 원칙이다"
tags: ['Defense In Depth', 'Layered Security', 'Security', 'Multi Layer', 'Protection', 'Redundancy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/defense-in-depth
sidebar:
  order: 5
---

## 핵심 개념

심층 방어는 핵심 시스템에서 단일 장애점(single point of failure)을 피하는 좋은 설계 관행이다. 보안 측면에서 이는 단일 메커니즘에 의존하지 않고 여러 다른 기법을 사용하여 보안을 보장해야 함을 의미한다. 예를 들어, 다단계 인증은 사용자가 비밀번호를 입력한 후 추가로 사전 등록된 질문에 올바르게 답해야 접근을 허용한다. 보호 아키텍처에서는 플랫폼 수준 보호, 애플리케이션 수준 보호, 레코드 수준 보호 등 여러 계층을 통해 공격자가 모든 계층을 통과해야만 핵심 자산에 접근할 수 있도록 설계한다. 그러나 보안 계층이 많아질수록 시스템 성능이 저하되고 사용성이 떨어질 수 있어 적절한 균형이 필요하다.

## 예시

Mentcare 시스템의 다층 보호 아키텍처: (1) 플랫폼 수준 보호 - 컴퓨터 로그인 및 파일 무결성 유지, (2) 애플리케이션 수준 보호 - 사용자 인증 및 권한 부여, (3) 레코드 수준 보호 - 개별 레코드 접근 권한 확인 및 암호화.

## 관련 개념

- [중복성과 다양성 (Redundancy and Diversity)](/knowledge/software-engineering/redundancy-and-diversity/)
- [취약점 (Vulnerability)](/knowledge/software-engineering/vulnerability/)
- [보안 시스템 설계 (Secure Systems Design)](/knowledge/software-engineering/secure-systems-design/)
- [스위스 치즈 모델 (Swiss Cheese Model)](/knowledge/software-engineering/swiss-cheese-model/)
- [사이버 보안 (Cybersecurity)](/knowledge/software-engineering/cybersecurity/)
