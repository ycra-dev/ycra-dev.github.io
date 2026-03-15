---
title: "팍소스 (Paxos)"
description: "Paxos는 Leslie Lamport(1989)가 설계한 합의 프로토콜로, 부분 동기 시스템에서 충돌 장애를 허용하며, 복제된 서버 그룹이 동일한 연산을 동일한 순서로 실행하도록 보장한다"
tags: ['Paxos', 'Consensus', 'Proposer', 'Acceptor', 'Learner', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/paxos
sidebar:
  order: 5
---

## 핵심 개념

**약한 가정 하에서 동작**:
- 부분 동기(심지어 비동기) 시스템
- 메시지 손실, 중복, 순서 바뀜 가능
- 손상된 메시지는 감지 가능 (무시)
- 모든 연산은 결정론적
- 충돌 장애만 (임의 장애나 공모 없음)

**세 가지 논리적 역할** (하나의 물리적 프로세스에 공존):
- **제안자(Proposer)**: 클라이언트 요청을 수락하여 제안. 하나의 리딩 제안자가 프로토콜을 주도.
- **수락자(Acceptor)**: 제안을 수락하거나 거부. 과반수의 수락이 "선택(chosen)"을 의미.
- **학습자(Learner)**: 선택된 제안을 실행.

**핵심 보장**: 제안 p가 선택되면, ts(p)보다 높은 타임스탬프를 가진 모든 제안 p'에 대해 oper(p') = oper(p). 즉, 한번 선택된 연산은 변경되지 않음.

**4단계 프로토콜**:

1. **Phase 1a (Prepare)**: 리딩 제안자 P가 제안 타임스탬프 t = (m, i)를 선택하여 모든 수락자에게 prepare(t) 전송. 수락자에게 (1) t보다 낮은 타임스탬프의 제안 무시를 약속하고, (2) 이미 수락한 최고 타임스탬프 제안을 알려달라고 요청.

2. **Phase 1b (Promise)**: 수락자 A가 prepare(t) 수신 시:
   - t가 지금까지 받은 최고 타임스탬프이면 → promise(t) 반환
   - 이미 수락한 제안 (t', o')가 있으면 → (t', o')도 함께 반환
   - 더 높은 타임스탬프의 제안이 처리 중이면 → 무시

3. **Phase 2a (Accept)**: 리딩 제안자가 과반수 응답 수집 후:
   - 수락자로부터 이전에 수락된 연산이 없으면 → 자신의 연산 o로 accept(t, o) 전송
   - 이전에 수락된 연산 o'가 있으면 → 해당 연산을 **채택**하여 accept(t, o') 전송

4. **Phase 2b (Learn)**: 수락자가 accept(t, o')를 수신하고, 더 높은 타임스탬프의 약속을 한 적 없으면 → o' 수락 후 모든 학습자에게 learn(o') 전송. 학습자가 과반수 수락자로부터 learn(o')를 수신하면 실행.

**안전성(Safety)**: 제안된 연산만 학습되고, 한 번에 하나의 연산만 학습됨.
**조건부 활성(Conditional Liveness)**: 충분한 프로세스가 동작하면 제안된 연산이 최종적으로 학습됨.

**리더십 인계(Liveness 보장)**: 리더가 충돌하면 다음 서버가 propose(Si) 메시지를 브로드캐스트. 각 서버가 promise(oj, tj)로 최근 실행 연산을 반환. 새 리더가 과반수의 가장 최근 연산을 채택하여 미완성 작업을 완료.

## 예시

```
# Paxos 프로토콜 동작 예시 (3서버: S1 리더, S2, S3)

# 정상 동작:
C1 → S1: 연산 o1 요청
S1(proposer): prepare(t=(1, 1)) → S2, S3
S2(acceptor): promise(t=(1,1)) → S1
S3(acceptor): promise(t=(1,1)) → S1
S1: 과반수 promise 수신, 이전 수락 연산 없음
S1: accept(t=(1,1), o1) → S2, S3
S2: learn(o1) → 모든 학습자
S3: learn(o1) → 모든 학습자
S1(learner): 과반수 learn 수신 → o1 실행

# 리더 장애 후 새 리더 인계:
# S1이 accept(o1, 1) 전송 후 충돌
# S2는 o1을 수신했지만, S3는 메시지 손실로 미수신
# S2가 새 리더로 선출

S2: propose(S2) → S3
S3: promise(없음, 0) → S2  # S3는 아직 o1을 모름
S2: accept(S2, o1, 1) → S3  # S2가 o1 전파
S3: learn(o1) → S2
# S3가 o1을 학습하여 과반수(S2+S3) 달성

# 거짓 장애 감지 문제:
# S2가 S1의 충돌을 잘못 감지하고 리더십 인수
# S2: accept(S2, o2, 1) 전송
# S3: 이미 S1의 accept(S1, o1, 1) 수신
# → 같은 타임스탬프, 다른 리더 → 리더 ID로 구분!
# S3: S2가 현재 리더임을 알고, S1의 제안 거부
```

## 관련 개념

- [래프트 합의 (Raft Consensus)](/knowledge/distributed-systems/raft-consensus/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [프로세스 그룹 (Process Group)](/knowledge/distributed-systems/process-group/)
- [장애 모델 (Failure Model)](/knowledge/distributed-systems/failure-model/)
- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
- [비잔틴 장애 허용 (Byzantine Fault Tolerance)](/knowledge/distributed-systems/byzantine-fault-tolerance/)
