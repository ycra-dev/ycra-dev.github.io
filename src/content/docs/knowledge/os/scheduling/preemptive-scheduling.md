---
title: "선점형 vs 비선점형 스케줄링"
description: "실행 중인 프로세스로부터 CPU를 강제로 빼앗을 수 있는지에 따른 스케줄링 방식 분류"
tags: ["OS", "Scheduling"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/preemptive-scheduling
sidebar:
  order: 3
---

## 핵심 개념

선점형 vs 비선점형 스케줄링은 실행 중인 프로세스로부터 CPU를 강제로 빼앗을 수 있는지 여부에 따른 분류입니다. 비선점형에서는 하나의 프로세스가 CPU를 독점할 수 있어, 대화형 시스템에서 응답성 보장과 공정한 배분을 위해 선점 개념이 필요합니다.

## 동작 원리

### CPU 스케줄링 결정 시점 4가지

1. **Running → Waiting**: I/O 요청, wait() 호출
2. **Running → Ready**: 인터럽트 발생 시
3. **Waiting → Ready**: I/O 완료 시
4. **프로세스 종료(Terminate)**

### 비선점형 (Nonpreemptive/Cooperative)

- **1, 4번 상황에서만** 스케줄링 결정
- 프로세스가 자발적으로 CPU를 반납할 때까지 대기
- 예: 초기 Windows 3.x

### 선점형 (Preemptive)

- **1, 2, 3, 4번 모든 상황**에서 스케줄링 결정
- OS가 강제로 CPU 회수 가능
- 현대 OS 대부분 사용 (Windows, macOS, Linux)

```
비선점형:
P1 ─────────────────────────▶│ P2 ──────────▶│ P3 ───▶
                    자발적 반납        자발적 반납

선점형:
P1 ────▶│ P2(높은 우선순위) ───▶│ P1 재개 ───▶│ P3 ───▶
     강제 선점              타임 퀀텀 만료
```

### 비교

| 구분 | 선점형 | 비선점형 |
|------|--------|----------|
| 응답성 | 좋음 | 나쁨 |
| 구현 복잡도 | 높음 | 낮음 |
| 오버헤드 | 문맥 교환 빈번 | 최소 |
| 데이터 일관성 | Race Condition 주의 | 안전 |
| 실시간 지원 | 적합 | 부적합 |

### 선점형의 주의점

- **Race Condition**: 공유 데이터 갱신 중 선점되면 데이터 불일치 발생 가능
- **커널 설계**: 커널 데이터 구조 수정 중 선점 시 문제 → mutex lock 필요
- 현대 OS는 대부분 **완전 선점형 커널(Fully Preemptive Kernel)** 사용

## 예시

- 비선점형: 회의실을 예약한 사람이 끝날 때까지 사용 (중간에 뺏을 수 없음)
- 선점형: 긴급 회의가 생기면 현재 사용자에게 양보 요청 가능

## 관련 개념

- [스케줄링 평가 기준](/knowledge/os/scheduling-criteria/)
- [다단계 피드백 큐 스케줄링](/knowledge/os/multilevel-feedback-queue/)
- [실시간 스케줄링](/knowledge/os/realtime-scheduling/)
