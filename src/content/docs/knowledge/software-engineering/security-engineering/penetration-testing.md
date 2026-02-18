---
title: "Penetration Testing"
description: "개발 팀 외부의 전문 보안 팀이 시스템의 보안을 침해하려는 목표를 가지고 공격을 시뮬레이션하여 보안 취약점을 발견하는 경험 기반 테스팅의 한 형태이다"
tags: ['Penetration Testing', 'Security Testing', 'Ethical Hacking', 'Vulnerability Discovery', 'Simulation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/penetration-testing
sidebar:
  order: 9
---

## 핵심 개념

침투 테스팅은 경험 기반 테스팅의 한 형태로, 외부 전문가가 시스템의 보안을 침해하려는 시도를 통해 취약점을 발견한다. 테스팅 팀은 시스템에 대한 공격을 시뮬레이션하고 독창성을 발휘하여 시스템 보안을 훼손하는 새로운 방법을 발견한다. 보안 테스팅은 본질적으로 어려운데, 보안 요구사항이 "해서는 안 되는 것"을 정의하기 때문이며, 아무리 많은 테스팅을 해도 시스템에 보안 취약점이 남아있지 않다는 것을 증명할 수 없다. 공격자는 지능적이며, 정상적인 활동과 시스템 사용 범위를 벗어난 실험을 적극적으로 시도한다. 보안 테스팅에는 경험 기반 테스팅, 침투 테스팅, 도구 기반 분석, 형식적 검증의 조합이 사용될 수 있다.

## 예시

SQL 인젝션 공격에 대한 테스팅에서는 SQL 명령을 포함하는 입력을 사용하여 시스템이 이 공격에 취약한지 확인한다. 버퍼 오버플로우 테스팅에서는 모든 입력 버퍼를 검사하여 프로그램이 버퍼 요소에 대한 할당이 범위 내에 있는지 확인하는지 확인한다.

## 관련 개념

- [Vulnerability](/knowledge/software-engineering/vulnerability/)
- [Static Analysis](/knowledge/software-engineering/static-analysis/)
- [Secure Systems Design](/knowledge/software-engineering/secure-systems-design/)
- [Security Risk Assessment](/knowledge/software-engineering/security-risk-assessment/)
