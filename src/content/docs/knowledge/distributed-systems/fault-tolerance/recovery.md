---
title: "복구 (Recovery)"
description: "복구(Recovery)는 장애가 발생한 프로세스를 올바른 상태로 되돌리는 기법이다"
tags: ['Recovery', 'Checkpointing', 'Message Logging', 'Backward Recovery', 'Forward Recovery']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/recovery
sidebar:
  order: 9
---

## 핵심 개념

**후방 복구(Backward Recovery)**:
- 시스템 상태를 주기적으로 저장(체크포인트)하고, 장애 시 저장된 상태로 복원.
- **장점**: 특정 시스템/프로세스에 독립적인 일반 메커니즘. 미들웨어 계층에 범용 서비스로 통합 가능.
- **단점**: (1) 상태 복원이 성능 비용 큼, (2) 애플리케이션 독립적이므로 동일 장애 재발 가능, (3) 일부 상태는 되돌릴 수 없음(예: ATM에서 나온 현금).

**전방 복구(Forward Recovery)**:
- 오류 상태에서 새로운 올바른 상태로 이동.
- 어떤 오류가 발생할 수 있는지 사전에 알아야 함.
- 예: 소실 패킷을 다른 성공적으로 전달된 패킷으로부터 재구성하는 소거 정정(erasure correction).

**체크포인팅(Checkpointing)**:
- 분산 시스템에서는 **일관된 전역 스냅샷(consistent global snapshot)**을 기록해야 함.
- 일관성: 인과적으로 관련된 이벤트들이 올바른 순서로 포함.
- 독립 체크포인팅: 각 프로세스가 독립적으로 체크포인트 생성. 복구 시 호환 가능한 체크포인트 조합을 찾아야 함 → **도미노 효과(domino effect)** 위험: 호환 불가 시 연쇄적으로 이전 체크포인트로 롤백.
- 조정 체크포인팅: 모든 프로세스가 협력하여 동시에 일관된 체크포인트 생성. 도미노 효과 방지.

**메시지 로깅(Message Logging)**:
- 체크포인팅만으로는 비용이 높으므로, 체크포인트 이후 메시지를 로깅하여 보완.
- 복구 시: 가장 최근 체크포인트 복원 → 로깅된 메시지를 순서대로 재생(replay).
- **발신자 기반 로깅(Sender-based)**: 메시지 전송 전 로깅. 프로세스 충돌 시 발신자의 로그에서 재전송 가능.
- **수신자 기반 로깅(Receiver-based)**: 메시지 수신 시 전달 전 로깅. 수신 프로세스 충돌 시 자체 로그에서 재생.

**고아 연산(Orphan Computation)**: 클라이언트가 RPC 요청 후 충돌하면, 서버에서 실행 중인 연산이 고아가 됨. 해결책:
- 고아 소멸(Orphan extermination): 디스크 로그 기반으로 재부팅 시 고아 제거.
- 환생(Reincarnation): 에포크 번호 기반. 새 에포크 선언 시 이전 연산 제거.
- 만료(Expiration): RPC에 시간 제한 T 부여. 충돌 후 T 대기하면 모든 고아 소멸.

## 예시

```python
# 체크포인팅과 메시지 로깅 결합

class RecoverableProcess:
    def __init__(self):
        self.state = {}
        self.checkpoint = None
        self.message_log = []

    def take_checkpoint(self):
        """현재 상태를 영구 저장소에 저장"""
        self.checkpoint = deep_copy(self.state)
        self.message_log = []  # 새 체크포인트 이후 로그 초기화
        save_to_disk(self.checkpoint)

    def send_message(self, msg, destination):
        """발신자 기반 로깅: 전송 전 메시지 로깅"""
        self.message_log.append(('SEND', msg, destination))
        save_log_to_disk(self.message_log)
        network_send(msg, destination)

    def receive_message(self, msg):
        """수신자 기반 로깅: 전달 전 메시지 로깅"""
        self.message_log.append(('RECV', msg))
        save_log_to_disk(self.message_log)
        self.deliver(msg)

    def recover(self):
        """장애 복구: 체크포인트 복원 + 메시지 재생"""
        self.state = load_from_disk()  # 체크포인트 복원
        log = load_log_from_disk()
        for entry in log:
            if entry[0] == 'RECV':
                self.deliver(entry[1])  # 메시지 재생
            elif entry[0] == 'SEND':
                network_send(entry[1], entry[2])  # 재전송

# 도미노 효과 예시:
# P1: [CP1a]----msg1--→----[CP1b]----msg3--→----장애
# P2: ----[CP2a]←--msg1----[CP2b]←--msg3----
# CP1b와 CP2b가 호환 불가 → CP1a와 CP2a로 롤백
# CP1a와 CP2a도 호환 불가 → 초기 상태까지 롤백 (도미노!)
```

## 관련 개념

- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [2단계 커밋 (Two Phase Commit)](/knowledge/distributed-systems/two-phase-commit/)
- [장애 모델 (Failure Model)](/knowledge/distributed-systems/failure-model/)
- [복제 관리 (Replica Management)](/knowledge/distributed-systems/replica-management/)
