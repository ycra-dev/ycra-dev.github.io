---
title: "시계 동기화 (Clock Synchronization)"
description: "클럭 동기화(Clock Synchronization)는 분산 시스템에서 각 컴퓨터의 독립적인 하드웨어 클럭들이 서로 일정한 범위 내에서 일치하도록 조정하는 과정이다"
tags: ['Clock Synchronization', 'Physical Clocks', 'Ntp', 'Distributed Time']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/clock-synchronization
sidebar:
  order: 1
---

## 핵심 개념

분산 시스템의 각 컴퓨터는 수정 발진기(quartz crystal oscillator) 기반의 하드웨어 클럭을 가지며, 이들은 약간씩 다른 주파수로 동작한다. 이로 인해 시간이 지남에 따라 클럭 스큐(clock skew)가 발생한다. 일반적인 수정 기반 하드웨어 클럭의 드리프트 율은 약 10^-6초/초, 즉 연간 약 31.5초이다.

클럭 동기화 알고리즘의 목표는 두 가지이다:
1. **내부 동기화(Internal Synchronization)**: 시스템 내 모든 클럭 간의 편차를 정밀도 π 이내로 유지
2. **외부 동기화(External Synchronization)**: UTC 기준으로 정확도 α 이내로 유지

두 클럭이 반대 방향으로 드리프트할 경우, Δt 시간 후 최대 2ρ·Δt만큼 차이날 수 있으므로, 최소 π/(2ρ)초마다 재동기화가 필요하다.

주요 동기화 프로토콜:
- **NTP(Network Time Protocol)**: 서버 간 쌍방향 시간 교환을 통해 오프셋 θ = ((T2-T1)+(T3-T4))/2를 계산. 계층(stratum) 구조를 사용하며, 전세계적으로 1-50ms 정확도를 달성.
- **RBS(Reference Broadcast Synchronization)**: 무선 센서 네트워크용. 송신자가 참조 메시지를 브로드캐스트하면 수신자들이 서로의 수신 시간을 비교하여 동기화. 선형 회귀를 사용하여 드리프트를 보상.

Google의 TrueTime 서비스는 GPS 수신기와 원자 시계를 결합하여 6ms 이내의 보장된 시간 정확도를 제공하며, 이를 통해 전역 분산 데이터베이스(Spanner)에서 트랜잭션 타임스탬핑을 가능하게 한다.

## 예시

NTP 오프셋 계산 과정:

```
A (클라이언트)                    B (시간 서버)
    |--- T1: 요청 전송 -------->|
    |                           | T2: 요청 수신
    |                           | T3: 응답 전송
    |<---- T4: 응답 수신 -------|

오프셋: θ = ((T2 - T1) + (T3 - T4)) / 2
지연:   δ = ((T4 - T1) - (T3 - T2)) / 2

# 시간 역행 방지: 클럭을 즉시 되돌리지 않고 점진적으로 조정
# 예: 100 인터럽트/초에서, 느리게 하려면 인터럽트당 10ms 대신 9ms 추가
```

## 관련 개념

- [램포트 논리 시계 (Lamport Logical Clock)](/knowledge/distributed-systems/lamport-logical-clock/)
- [벡터 시계 (Vector Clock)](/knowledge/distributed-systems/vector-clock/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
