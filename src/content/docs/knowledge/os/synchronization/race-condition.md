---
title: "경쟁 조건 (Race Condition)"
description: "여러 프로세스가 공유 데이터에 동시 접근할 때 실행 순서에 따라 결과가 달라지는 상황"
tags: ["OS", "Synchronization"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/race-condition
sidebar:
  order: 2
---

## 핵심 개념

경쟁 조건(Race Condition)은 여러 프로세스가 공유 데이터에 **동시 접근**할 때, **실행 순서에 따라 결과가 달라지는** 상황이다. 고수준 연산(예: `count++`)이 여러 기계어 명령으로 분해되어 인터리빙(interleaving)이 발생하면, 예상과 다른 결과가 나온다.

비유하면, 두 사람이 동시에 같은 은행 계좌에서 출금하는 상황이다. 잔액 확인과 출금 사이에 다른 사람이 끼어들면 잔액이 꼬인다.

## 동작 원리

`count++`는 실제로 3단계로 분해된다: **load → increment → store**. 두 프로세스가 동시에 실행하면 명령어가 인터리빙된다.

```
Producer                    Consumer
───────────────────────────────────────
register1 = count   (5)
register1 = reg1+1  (6)
                            register2 = count   (5)
                            register2 = reg2-1  (4)
count = register1   (6)
                            count = register2   (4)
───────────────────────────────────────
결과: count = 4 (잘못된 값, 기대값은 5)
```

- 초기 `count = 5`
- Producer: `count++`, Consumer: `count--`
- 예상 결과: `count = 5`
- **실제 가능한 결과**: 4, 5, 6 (인터리빙에 따라 다름)

### 특성

- 결과가 **비결정적(non-deterministic)** → 디버깅 매우 어려움
- **간헐적으로 발생**하여 재현이 힘듦
- 데이터 무결성 훼손

## 예시

- 멀티스레드 프로그램에서 공유 카운터 증감
- 커널 내에서 프로세스 리스트를 동시에 수정하는 경우
- 파일 시스템에서 동일 파일을 동시에 수정하는 경우

## 관련 개념

- [임계구역 문제 (Critical Section)](/knowledge/os/critical-section/) - Race Condition을 방지하는 프로토콜 설계
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - 상호배제 동기화 도구
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/) - Race Condition을 방지하는 lock-free 연산
- [하드웨어 동기화 명령어](/knowledge/os/hardware-instructions/) - 원자적 명령어 기반 해결
