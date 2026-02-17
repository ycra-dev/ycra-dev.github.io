---
title: "Failure Model"
description: "장애 모델(Failure Model)은 분산 시스템에서 발생할 수 있는 장애 유형을 분류하는 체계로, 충돌 장애부터 임의(비잔틴) 장애까지 심각도에 따라 구분한다"
tags: ['Failure Model', 'Crash Failure', 'Omission Failure', 'Byzantine Failure', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/failure-model
sidebar:
  order: 1
---

## 핵심 개념

**장애 유형 분류** (Cristian, 1991; Hadzilacos and Toueg, 1993):

| 장애 유형 | 설명 |
|-----------|------|
| 충돌 장애(Crash failure) | 정상 동작 중 갑자기 멈춤. 이후 응답 없음 |
| 누락 장애(Omission failure) | 요청에 응답하지 못함 (수신 누락 / 송신 누락) |
| 타이밍 장애(Timing failure) | 응답이 지정된 시간 범위를 벗어남 |
| 응답 장애(Response failure) | 잘못된 응답 (값 장애 / 상태전이 장애) |
| 임의 장애(Arbitrary/Byzantine failure) | 임의의 시점에 임의의 응답 생성 가능 |

**정지 장애의 세분류** (감지 가능성에 따라):
- **Fail-stop**: 충돌을 신뢰성 있게 감지 가능. 비결함 통신 링크와 최악 지연 시간 가정.
- **Fail-noisy**: 최종적으로 올바른 결론에 도달. 초기에 잘못된 감지 가능.
- **Fail-silent**: 충돌 장애와 누락 장애를 구분 불가.
- **Fail-safe**: 임의 장애이나 무해함.
- **Fail-arbitrary**: 가장 심각. 관찰 불가능하고 유해한 장애.

**시스템 동기성과 장애 감지**:
- **동기 시스템**: 프로세스 속도와 메시지 전달 시간에 상한 존재. 타임아웃으로 충돌 확정 가능.
- **비동기 시스템**: 상한 없음. 느린 프로세스와 충돌된 프로세스를 구분 불가.
- **부분 동기 시스템(실제)**: 대부분 동기적이나, 비동기 행동의 상한 없음. 타임아웃으로 충돌을 추정하되, 잘못된 감지 허용.

**누락 vs 위임 장애**: 누락 장애(omission failure)는 해야 할 행동을 하지 않는 것, 위임 장애(commission failure)는 하지 말아야 할 행동을 하는 것. 이 구분은 의존성과 보안의 경계가 모호할 수 있음을 보여줌.

## 예시

```python
# 장애 모델 분류와 필요한 복제본 수
failure_models = {
    "crash": {
        "description": "프로세스가 멈추고 더 이상 응답하지 않음",
        "replicas_for_k_tolerance": "k + 1",
        "example": "운영체제 크래시, 전원 장애"
    },
    "omission": {
        "description": "메시지 수신/송신 실패",
        "replicas_for_k_tolerance": "k + 1 (침묵 장애와 동일 취급)",
        "example": "버퍼 오버플로우로 응답 미전송"
    },
    "byzantine": {
        "description": "임의의 잘못된 행동",
        "replicas_for_k_tolerance": "3k + 1",
        "example": "다른 프로세스에 다른 값 전송"
    }
}

# 부분 동기 시스템에서의 장애 감지
class FailureDetector:
    def __init__(self, initial_timeout):
        self.timeout = initial_timeout
        self.suspected = set()

    def probe(self, process_id):
        response = send_probe(process_id, self.timeout)
        if response is None:
            self.suspected.add(process_id)  # 의심
        elif process_id in self.suspected:
            self.suspected.remove(process_id)  # 의심 해제
            self.timeout *= 2  # 타임아웃 증가 (잘못된 의심이었으므로)
```

## 관련 개념

- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
- [Byzantine Fault Tolerance](/knowledge/distributed-systems/byzantine-fault-tolerance/)
- [Process Group](/knowledge/distributed-systems/process-group/)
- [Raft Consensus](/knowledge/distributed-systems/raft-consensus/)
- [Paxos](/knowledge/distributed-systems/paxos/)
