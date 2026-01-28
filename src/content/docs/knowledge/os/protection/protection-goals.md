---
title: "보호의 목표와 원칙 (Protection Goals)"
description: "프로세스와 사용자의 자원 접근을 제어하는 보호 메커니즘의 목표와 핵심 원칙"
tags: ["OS", "Protection", "Security"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/protection-goals
sidebar:
  order: 2
---

## 핵심 개념

보호(Protection)는 프로세스와 사용자가 컴퓨터 시스템의 자원에 접근하는 것을 제어하는 메커니즘입니다. 멀티프로그래밍 환경에서 여러 사용자와 프로세스가 자원을 공유하므로, 상호 간의 보호가 필수적입니다. 보호 시스템은 **정책(policy, "무엇을")** 과 **메커니즘(mechanism, "어떻게")**을 분리합니다.

## 동작 원리

### 최소 권한 원칙 (Principle of Least Privilege)

프로그램, 사용자, 시스템은 작업 수행에 필요한 **최소한의 권한만** 부여받아야 합니다. 권한이 제한되면 공격 피해를 완화할 수 있습니다.

### 격리 (Compartmentalization)

각 시스템 구성요소를 특정 권한과 접근 제한으로 보호합니다. 한 구성요소가 침해되어도 다른 구성요소는 방어됩니다. 예: 네트워크 DMZ, 가상화

### 심층 방어 (Defense in Depth)

여러 계층의 보호를 중첩 적용합니다. 단일 방어선에 의존하지 않습니다.

### 감사 추적 (Audit Trail)

접근 시도 기록을 유지하여 공격 조기 경고 및 피해 평가에 활용합니다.

## 예시

은행의 금고 시스템과 같습니다:
- **최소 권한**: 창구 직원은 금고 접근 불가
- **격리**: 각 금고는 독립된 잠금
- **심층 방어**: 건물 경비 + 금고실 잠금 + 개별 금고 잠금

root 권한으로 실행 중인 프로세스가 버퍼 오버플로우 공격을 당하면 시스템 전체가 위험합니다. 최소 권한 원칙을 적용하면 해당 프로세스의 제한된 권한 내에서만 피해가 발생합니다.

- 보호(Protection): 내부 자원 접근 제어
- 보안(Security): 외부 위협 방어

## 관련 개념

- [보호 도메인 (Protection Domain)](/knowledge/os/protection-domain/)
- [강제적 접근 제어 (MAC)](/knowledge/os/mac/)
- [샌드박싱 (Sandboxing)](/knowledge/os/sandboxing/)
