---
title: "Confidentiality, Integrity, and Availability"
description: "보안 공학에서 고려해야 하는 세 가지 핵심 보안 차원으로, 기밀성은 정보의 무단 접근 방지, 무결성은 데이터 손상 방지, 가용성은 서비스 접근 보장을 의미한다"
tags: ['Cia Triad', 'Confidentiality', 'Integrity', 'Availability', 'Security', 'Information Security']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/confidentiality-integrity-availability
sidebar:
  order: 2
---

## 핵심 개념

기밀성(Confidentiality)은 시스템 내 정보가 권한 없는 사람이나 프로그램에 공개되지 않도록 보장하는 것으로, 예를 들어 신용카드 데이터 도난이 기밀성 문제이다. 무결성(Integrity)은 시스템 내 정보가 손상되거나 변조되지 않도록 보장하는 것으로, 데이터를 삭제하는 웜이 무결성 문제의 예이다. 가용성(Availability)은 시스템이나 데이터에 정상적으로 접근할 수 있도록 보장하는 것으로, 서비스 거부 공격이 가용성을 훼손하는 예이다. 이 세 차원은 밀접하게 관련되어 있어, 한 차원의 공격이 다른 차원에 영향을 미칠 수 있다. 이를 CIA 삼각형이라고도 한다.

## 예시

Mentcare 시스템에서: 기밀성 위반 - 권한 없는 사용자가 환자 기록에 접근, 무결성 위반 - 공격자가 환자 기록을 변경하거나 파괴, 가용성 위반 - 데이터베이스 서버에 대한 서비스 거부 공격으로 시스템 접근 불가.

## 관련 개념

- [Vulnerability](/knowledge/software-engineering/vulnerability/)
- [Security Risk Assessment](/knowledge/software-engineering/security-risk-assessment/)
- [Defense in Depth](/knowledge/software-engineering/defense-in-depth/)
- [Secure Systems Design](/knowledge/software-engineering/secure-systems-design/)
- [Availability](/knowledge/software-engineering/availability/)
- [Resilience](/knowledge/software-engineering/resilience/)
- [Cybersecurity](/knowledge/software-engineering/cybersecurity/)
