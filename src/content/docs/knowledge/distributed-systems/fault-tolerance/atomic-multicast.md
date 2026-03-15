---
title: "원자적 멀티캐스트 (Atomic Multicast)"
description: "원자적 멀티캐스트(Atomic Multicast)는 메시지가 그룹의 모든 비결함 프로세스에 전달되거나 어느 프로세스에도 전달되지 않는 것을 보장하면서, 동시에 모든 그룹 멤버에게 완전히 동일한 순서로 메시지가 전달되는(totally ordered) 신뢰성 있는 그..."
tags: ['Atomic Multicast', 'Virtual Synchrony', 'Reliable Multicast', 'Group Communication', 'Fault Tolerance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/atomic-multicast
sidebar:
  order: 3
---

## 핵심 개념

**신뢰성 있는 멀티캐스트의 기본**: 수신(receive)과 전달(deliver)을 분리. 메시지 처리 컴포넌트가 메시지를 수신하고, 적절한 시점에 애플리케이션에 전달. 신뢰성은 "비결함 프로세스 모두에게 전달되거나 아무에게도 전달되지 않음"을 의미.

**가상 동기성(Virtual Synchrony)** (Birman and Joseph, 1987):
- 멀티캐스트 메시지 m은 발송자가 메시지를 보낸 시점의 그룹 뷰(view)와 연결.
- 모든 멀티캐스트는 뷰 변경(view change) 사이에서 발생. 뷰 변경은 멀티캐스트가 통과할 수 없는 장벽.
- 발송자 P가 뷰 G에서 m을 보내는 도중 충돌하면: G의 모든 비결함 프로세스가 P를 그룹에서 제거하기 전에 m을 전달하거나, 아무도 m을 전달하지 않음.

**메시지 순서 보장 수준**:
1. **비순서(Unordered)**: 가상 동기성만 보장, 전달 순서 제약 없음.
2. **FIFO 순서**: 같은 발송자의 메시지는 보낸 순서대로 전달.
3. **인과 순서(Causal)**: 인과 관계가 있는 메시지의 전달 순서 보장. 벡터 타임스탬프로 구현.
4. **전체 순서(Total)**: 모든 멤버가 동일한 순서로 메시지 전달.

이 세 순서와 전체 순서의 조합으로 6가지 형태:
| 기본 순서 | 전체 순서 여부 |
|-----------|---------------|
| 비순서 | 신뢰성 멀티캐스트 / 원자적 멀티캐스트 |
| FIFO | FIFO 멀티캐스트 / FIFO 원자적 멀티캐스트 |
| 인과 | 인과 멀티캐스트 / 인과 원자적 멀티캐스트 |

**확장 가능한 신뢰성 멀티캐스트**: 대규모 수신자에서 ACK 폭주(feedback implosion) 문제 발생. 해결책:
- NACK 기반: 누락 시에만 재전송 요청. 피드백 억제(SRM 프로토콜) - 수신자가 랜덤 지연 후 NACK 전송, 다른 수신자의 NACK를 보면 자신의 NACK 억제.
- 계층적 멀티캐스트: 수신자를 서브그룹으로 분할, 트리 구조로 조직. 로컬 코디네이터가 서브그룹 내 재전송 담당.
- 가십 기반: push-pull anti-entropy로 고유한 강건성. 통신 실패 시 다른 노드 선택.

**Isis 시스템의 가상 동기성 구현**: TCP 기반 점대점 통신 위에 구축. 안정적(stable) 메시지만 전달(모든 멤버가 수신 확인). 뷰 변경 시: (1) 불안정 메시지 전달, (2) flush 메시지 멀티캐스트, (3) 모든 flush 수신 후 새 뷰 설치.

## 예시

```
# 가상 동기성 예시
# 그룹 G = {S1, S2, S3, S4}

# 정상 동작:
S1 → G: m1 멀티캐스트
S2 → G: m2 멀티캐스트
# 모든 프로세스가 m1, m2 수신 및 전달

# S3 충돌 시나리오:
S3: m3을 S2와 S4에 전송 후 충돌 (S1에는 미전송)
# 가상 동기성 규칙:
# m3은 S2, S4에서도 전달되지 않음
# (S1이 m3을 받지 못했으므로 전원 미전달로 통일)
# 뷰 변경: G → {S1, S2, S4}

# 뷰 변경 프로토콜 (Isis):
# 1. S1이 S3 충돌 감지 → view_change(G') 전송
# 2. S2: 불안정 메시지(m3) 전달 + flush 전송
# 3. S4: 불안정 메시지(m3) 전달 + flush 전송
# 4. S1: flush 미수신 (m3이 없으므로) + flush 전송
# 5. 모든 flush 수신 → 새 뷰 G' = {S1, S2, S4} 설치

# 원자적 멀티캐스트 = 가상 동기성 + 전체 순서
# S1: m1, m2 순서로 전달
# S2: m1, m2 순서로 전달 (반드시 같은 순서)
# S4: m1, m2 순서로 전달 (반드시 같은 순서)
```

## 관련 개념

- [전순서 멀티캐스트 (Totally Ordered Multicast)](/knowledge/distributed-systems/totally-ordered-multicast/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [프로세스 그룹 (Process Group)](/knowledge/distributed-systems/process-group/)
- [2단계 커밋 (Two Phase Commit)](/knowledge/distributed-systems/two-phase-commit/)
- [인과적 일관성 (Causal Consistency)](/knowledge/distributed-systems/causal-consistency/)
- [가십 프로토콜 (Gossip Protocol)](/knowledge/distributed-systems/gossip-protocol/)
