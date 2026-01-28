---
title: "서비스 거부 공격 (Denial of Service)"
description: "시스템이나 네트워크의 정당한 사용을 방해하여 서비스를 이용 불가능하게 만드는 공격"
tags: ["OS", "Security", "Network"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/denial-of-service
sidebar:
  order: 10
---

## 핵심 개념

서비스 거부 공격(Denial of Service, DoS)은 시스템이나 네트워크의 정당한 사용을 방해하여 서비스를 이용 불가능하게 만드는 공격입니다. 침투 없이도 서비스를 마비시킬 수 있으며, 정상 트래픽과 공격 트래픽의 구분이 모호하여 방어가 특히 어렵습니다.

## 동작 원리

### DoS 공격의 두 가지 범주

| 범주 | 설명 | 예시 |
|------|------|------|
| **자원 고갈** | 시스템 자원(CPU, 메모리)을 소진 | 무한 팝업 창, Java applet 악용 |
| **네트워크 방해** | 네트워크 대역폭/연결 고갈 | SYN Flood, Amplification 공격 |

### DDoS (Distributed DoS)

여러 곳에서 동시에 단일 목표를 공격합니다.

```
        Attacker
            │
    ┌───────┼───────┐
    ▼       ▼       ▼
  Zombie  Zombie  Zombie
    │       │       │
    └───────┼───────┘
            ▼
         Target
```

- **Zombie**: 해커가 장악한 시스템으로, 공격의 중계지 역할
- 공격자 추적을 어렵게 하며 (원본 출처 은폐), 대역폭 확보 목적으로 "사소한" 시스템도 활용
- 때로 협박과 연계 (공격 중단 대가로 금전 요구)

### DoS 판단의 어려움

정상적인 트래픽 급증과 공격을 구분하기 어렵습니다. 예를 들어 성공적 광고 캠페인으로 인한 트래픽 폭증이 DDoS처럼 보일 수 있습니다.

### 의도치 않은 DoS

- 인증 알고리즘의 계정 잠금 기능 악용: 의도적 오류 시도 → 모든 계정 잠금
- 학생들의 무한 `fork()` 버그 → 시스템 리소스 고갈

## 예시

식당에 수천 명이 동시에 전화해서 예약만 하고 오지 않는 상황에 비유할 수 있습니다. 정상 손님이 이용할 수 없게 됩니다.

### 관련 공격: Port Scanning

DoS 공격 전 정찰 단계에 해당합니다:
- **목적**: 시스템 취약점 탐지
- **Fingerprinting**: OS 종류, 서비스 버전 파악 (HTTP 헤더 분석, 프로토콜 핸들러 동작 분석)

### 장단점 (방어자 관점)

- **완화 가능**: 업스트림 필터링, 자원 확충으로 일부 완화
- **완전 방지 불가**: 정상 트래픽과 구분 어려움

## 관련 개념

- [공격 유형 (Attack Types)](/knowledge/os/attack-types/)
- [방화벽 (Firewall)](/knowledge/os/firewall/)
- [인증 (Authentication)](/knowledge/os/authentication/)
