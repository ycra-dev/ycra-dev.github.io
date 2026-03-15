---
title: "장애 허용 (Fault Tolerance)"
description: "내결함성(Fault Tolerance)은 시스템의 일부에 결함이 존재하더라도 서비스를 계속 제공할 수 있는 분산 시스템의 능력이다"
tags: ['Fault Tolerance', 'Dependability', 'Reliability', 'Availability', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/fault-tolerance
sidebar:
  order: 6
---

## 핵심 개념

의존성은 다음 네 가지 요구사항을 포함한다:

1. **가용성(Availability)**: 시스템이 임의의 시점에 정상 작동하고 사용 가능한 확률. 예: 매시간 1밀리초씩 다운되면 가용성 99.9999% 이상이지만 신뢰할 수 없음.
2. **신뢰성(Reliability)**: 시스템이 일정 기간 동안 중단 없이 연속 운영되는 능력. 시간 구간으로 정의됨.
3. **안전성(Safety)**: 시스템이 일시적으로 실패하더라도 재앙적 사건이 발생하지 않는 것. 원자력 발전소 제어 시스템 등에 필수.
4. **유지보수성(Maintainability)**: 실패한 시스템을 얼마나 쉽게 수리할 수 있는지.

전통적 측정 지표:
- **MTTF(Mean Time To Failure)**: 구성 요소가 실패하기까지의 평균 시간
- **MTTR(Mean Time To Repair)**: 수리에 필요한 평균 시간
- **MTBF(Mean Time Between Failures)**: MTTF + MTTR

결함(fault), 오류(error), 실패(failure)의 구분이 중요하다:
- **결함**: 오류의 원인 (예: 프로그래밍 버그, 불량 전송 매체)
- **오류**: 실패로 이어질 수 있는 시스템 상태의 일부 (예: 손상된 패킷)
- **실패**: 시스템이 약속한 서비스를 제공하지 못하는 것 (예: 프로그램 충돌)

결함의 분류: 일시적(transient), 간헐적(intermittent), 영구적(permanent).

**결함 마스킹과 중복성(Chapter 8)**: 결함을 숨기는 핵심 기법은 중복성(redundancy)이다.
- **정보 중복성**: 오류 정정 코드(예: 해밍 코드) 추가로 손상된 비트 복구.
- **시간 중복성**: 연산 재시도. 트랜잭션 재실행, 요청 재전송. 일시적/간헐적 결함에 효과적.
- **물리적 중복성**: 추가 장비/프로세스 투입. TMR(Triple Modular Redundancy)이 대표적 - 각 단계를 3중화하고 다수결 투표기(voter)로 결과 결정. 하나의 구성요소가 고장나도 나머지 둘이 올바른 결과 생성.

**프로세스 회복력(Process Resilience)**: 동일한 프로세스를 그룹으로 조직하여 장애 프로세스를 마스킹. k개의 프로세스 장애를 허용하려면: 충돌 장애 시 k+1개, 임의 장애(비잔틴) 시 2k+1개의 프로세스 필요.

**장애 탐지(Failure Detection)**: 프로브-타임아웃 메커니즘이 기본. 완벽한 장애 탐지기는 동기 시스템에서만 가능. 부분 동기 시스템에서는 "최종적으로 완벽한(eventually perfect)" 장애 탐지기 사용 - 잘못된 의심 시 타임아웃 값을 증가.

## 예시

```python
# 가용성 vs 신뢰성 예시
# 시스템 A: 매시간 1ms 다운
availability_A = (3600000 - 1) / 3600000  # ≈ 99.9999%
reliability_A = "낮음"  # 매시간 중단 발생

# 시스템 B: 8월에 2주간 다운
availability_B = (365 - 14) / 365  # ≈ 96%
reliability_B = "높음"  # 나머지 기간은 절대 크래시 안함

# 의존성 구축: 결함 제어의 네 가지 접근법
fault_control = {
    "prevention": "결함이 발생하지 않도록 방지",
    "tolerance": "결함이 있어도 서비스 계속 제공",
    "removal": "발견된 결함을 제거",
    "forecasting": "미래 결함 발생을 예측"
}

# TMR (Triple Modular Redundancy) 개념
def tmr_voter(input1, input2, input3):
    """세 입력 중 다수결로 출력 결정"""
    if input1 == input2 or input1 == input3:
        return input1
    elif input2 == input3:
        return input2
    else:
        return None  # 세 입력이 모두 다르면 정의 불가

# k-fault tolerance 요구사항
def required_processes(k, failure_type):
    if failure_type == "crash":
        return k + 1  # 침묵 장애: k+1개면 충분
    elif failure_type == "byzantine":
        return 2 * k + 1  # 임의 장애: 다수결 필요
    elif failure_type == "byzantine_agreement":
        return 3 * k + 1  # 비잔틴 합의: 3k+1개 필요
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [복제 관리 (Replica Management)](/knowledge/distributed-systems/replica-management/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
- [장애 모델 (Failure Model)](/knowledge/distributed-systems/failure-model/)
- [프로세스 그룹 (Process Group)](/knowledge/distributed-systems/process-group/)
- [래프트 합의 (Raft Consensus)](/knowledge/distributed-systems/raft-consensus/)
- [팍소스 (Paxos)](/knowledge/distributed-systems/paxos/)
- [비잔틴 장애 허용 (Byzantine Fault Tolerance)](/knowledge/distributed-systems/byzantine-fault-tolerance/)
- [2단계 커밋 (Two Phase Commit)](/knowledge/distributed-systems/two-phase-commit/)
