---
title: "우선순위 역전 (Priority Inversion)"
description: "높은 우선순위 프로세스가 낮은 우선순위 프로세스의 자원 대기 중 중간 우선순위에 의해 간접 블록되는 현상"
tags: ["OS", "Synchronization", "Scheduling"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/priority-inversion
sidebar:
  order: 18
---

## 핵심 개념

우선순위 역전(Priority Inversion)은 높은 우선순위 프로세스(H)가 낮은 우선순위 프로세스(L)가 보유한 자원을 기다리는 동안, **중간 우선순위 프로세스(M)에 의해 간접적으로 블록**되는 현상이다. 실시간 시스템에서 치명적이며, 높은 우선순위 작업의 데드라인을 놓칠 수 있다.

비유하면, 사장(H)이 인턴(L)에게 자료를 요청했는데, 과장(M)이 인턴에게 다른 일을 시켜 사장이 과장보다 늦게 일을 처리하게 되는 상황이다.

## 동작 원리

### 문제 시나리오

```
우선순위: L < M < H,  Semaphore S (공유 자원)

L:  ████[S 획득]████████████████████[S 해제]███
M:            ██████████████████████
H:       [S 요청]▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓[S 획득]██

████ = 실행 중, ▓▓▓▓ = 대기 중 (블록)
```

1. L이 자원 S를 획득하고 실행
2. H가 도착, S를 요청 → L이 해제할 때까지 대기
3. M이 도착, L을 선점 (M은 S가 필요 없으므로 바로 실행)
4. **H는 L을 기다리지만, L은 M에게 선점당함**
5. M 완료 → L 실행 → S 해제 → 드디어 H 실행

### 해결책: Priority Inheritance Protocol

```
우선순위 상속 적용 시:

L:  ████[S획득, H요청 시 우선순위 상승]████[S해제, 원래 우선순위]
M:                                    ██████████████████
H:       [S요청]▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓[S획득]██████████
```

1. L이 자원 S를 점유
2. H가 S 요청 → L이 **H의 우선순위를 상속** (L의 우선순위 = H)
3. M은 L(현재 H 우선순위)을 **선점할 수 없음**
4. L이 S 해제 → L은 원래 우선순위로 복귀
5. H가 S를 획득하여 실행

## 예시

### Mars Pathfinder (1997)

화성 탐사선에서 priority inversion으로 시스템 리셋이 반복 발생했다. Priority inheritance를 활성화하여 문제를 해결한 대표적 실제 사례이다.

## 관련 개념

- [교착 상태 (Deadlock)](/knowledge/os/deadlock/) - 순환 대기로 인한 완전 정지
- [라이브락 (Livelock)](/knowledge/os/livelock/) - 활성 상태이지만 진전 없는 현상
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 자원 보호 동기화 도구
- [실시간 스케줄링](/knowledge/os/realtime-scheduling/) - 데드라인 보장 스케줄링
