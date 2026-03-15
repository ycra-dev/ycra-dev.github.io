---
title: "장애 허용 (Fault Tolerance)"
description: "소프트웨어 또는 하드웨어 결함이 발생하여 시스템 상태가 오류 상태가 된 후에도 시스템이 계속 작동할 수 있도록 하는 런타임 접근법이다"
tags: ['Fault Tolerance', 'Reliability', 'Runtime', 'Error Handling', 'System Resilience']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/fault-tolerance
sidebar:
  order: 7
---

## 핵심 개념

결함 허용은 결함이나 예기치 않은 동작이 실행 중에 감지되고, 시스템 장애가 발생하지 않도록 관리되는 방식으로 설계하는 것이다. 결함 허용은 안전 또는 보안에 중요한 시스템에서 오류 감지 시 안전한 상태로 전환할 수 없는 경우에 필수적이다. 결함 허용 아키텍처에는 보호 시스템(protection systems), 자기 모니터링 아키텍처(self-monitoring architectures), N-버전 프로그래밍(N-version programming) 등이 있다. 가장 간단한 구현 형태는 이중화 서버로, 두 개 이상의 서버가 동일한 작업을 수행하고 주 서버 장애 시 백업 서버가 자동으로 활성화된다. 결함 허용을 제공하려면 시스템 아키텍처에 이중화되고 다양한 하드웨어와 소프트웨어가 포함되어야 한다.

## 예시

Airbus 340 비행 제어 시스템은 5개의 자기 점검 컴퓨터를 사용하는 결함 허용 아키텍처를 채택했다. 각 컴퓨터는 병렬로 계산을 수행하고, 하드웨어 필터가 결함을 감지하면 해당 컴퓨터의 출력을 차단하고 대체 시스템에서 출력을 가져온다. 15년 이상의 운영에서 비행 제어 시스템의 완전한 장애로 항공기 제어가 상실된 사례는 보고되지 않았다.

## 관련 개념

- [중복성과 다양성 (Redundancy and Diversity)](/knowledge/software-engineering/redundancy-and-diversity/)
- [N-버전 프로그래밍 (N-Version Programming)](/knowledge/software-engineering/n-version-programming/)
- [보호 시스템 (Protection System)](/knowledge/software-engineering/protection-system/)
- [자가 모니터링 아키텍처 (Self-Monitoring Architecture)](/knowledge/software-engineering/self-monitoring-architecture/)
- [신뢰성 (Reliability)](/knowledge/software-engineering/reliability/)
- [신뢰성 (Dependability)](/knowledge/software-engineering/dependability/)
