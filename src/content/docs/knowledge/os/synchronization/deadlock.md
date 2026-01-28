---
title: "교착 상태 (Deadlock)"
description: "집합 내 모든 스레드가 같은 집합 내 다른 스레드만이 발생시킬 수 있는 이벤트를 무한히 기다리는 상태"
tags: ["OS", "Deadlock", "Concurrency"]
created: 2026-01-23
updated: 2026-01-27
slug: knowledge/os/deadlock
sidebar:
  order: 19
---

## 핵심 개념

교착 상태(Deadlock)는 집합 내 모든 스레드가 같은 집합 내 다른 스레드만이 발생시킬 수 있는 이벤트를 무한히 기다리는 상태입니다. 멀티프로그래밍 환경에서 여러 스레드가 유한한 자원을 경쟁하면, 자원을 보유한 채 대기하는 스레드들이 서로를 무한 대기시킬 수 있습니다.

## 동작 원리

자원은 유한하며, 스레드는 자원을 **요청(Request) → 사용(Use) → 해제(Release)** 순서로 사용합니다.

1. 스레드가 자원 요청 시, 가용하지 않으면 대기 상태 진입
2. 대기 중인 스레드가 보유한 자원을 다른 대기 스레드가 요청
3. 이 관계가 순환(cycle)을 이루면 교착 상태 발생

```
스레드 T1: lock(A) → 대기(B)
스레드 T2: lock(B) → 대기(A)
```

T1은 B를 기다리고, T2는 A를 기다림 → 교착 상태

### 세마포어 교착 상태 예시

```c
// Semaphore S = 1, Q = 1

// P0                    // P1
wait(S);                 wait(Q);
wait(Q);  // 대기!       wait(S);  // 대기!
...                      ...
signal(S);               signal(Q);
signal(Q);               signal(S);
```

실행 순서:

1. P0: `wait(S)` → S 획득
2. P1: `wait(Q)` → Q 획득
3. P0: `wait(Q)` → Q를 P1이 보유 중 → 대기
4. P1: `wait(S)` → S를 P0이 보유 중 → 대기
5. 누구도 `signal()` 호출 불가 → **교착 상태**

자원 할당 그래프에서 순환이 존재하면 교착 상태가 발생합니다:

```
P0 ──점유──→ S       P1 ──점유──→ Q
 │                    │
 └──요청──→ Q         └──요청──→ S
        ↑                    ↑
        P1 점유              P0 점유
→ 순환(cycle) 존재 = Deadlock
```

### 해결 전략 비교

| 전략 | 설명 | 특징 |
|------|------|------|
| **Prevention** | 필요조건 중 하나를 제거 | 자원 활용률 저하 |
| **Avoidance** | 안전 상태만 유지 (은행원 알고리즘) | 오버헤드 |
| **Detection & Recovery** | 발생 후 탐지하여 복구 | 복구 비용 |
| **Ignore** | 무시 (UNIX, Windows 채택) | 실용적 |

### Deadlock vs 다른 Liveness 문제

| 문제 | 설명 |
|------|------|
| **Deadlock** | 순환 대기로 모두 블록 |
| **Livelock** | 계속 상태 변화하지만 진행 없음 |
| **Starvation** | 특정 프로세스가 계속 자원 못 받음 |

## 예시

**캔자스 법률 비유**: "두 기차가 교차로에서 만나면 둘 다 정지하고, 상대가 지나갈 때까지 출발하지 말 것" → 아무도 출발 못함

**철학자들의 식사 문제**: 모든 철학자가 동시에 배고파져서 왼쪽 젓가락을 집으면, 오른쪽 젓가락을 영원히 기다림

## 관련 개념

- [교착 상태 필요조건 (Necessary Conditions)](/knowledge/os/deadlock-conditions/)
- [자원 할당 그래프 (Resource-Allocation Graph)](/knowledge/os/resource-allocation-graph/)
- [안전 상태 (Safe State)](/knowledge/os/safe-state/)
- [라이브락 (Livelock)](/knowledge/os/livelock/)
- [식사하는 철학자 문제 (Dining-Philosophers Problem)](/knowledge/os/dining-philosophers/)
