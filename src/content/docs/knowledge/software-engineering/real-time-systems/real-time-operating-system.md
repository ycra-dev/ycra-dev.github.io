---
title: "실시간 운영체제 (Real-Time Operating System)"
description: "실시간 운영 체제(RTOS)는 실시간 시스템을 위한 효율적인 운영 체제로, 프로세스와 자원 할당을 관리하며 자극의 적시 처리를 위한 프로세스 시작/중지를 담당한다"
tags: ['Rtos', 'Real Time OS', 'Scheduler', 'Interrupt Handler', 'Dispatcher', 'Preemptive', 'Priority']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/real-time-operating-system
sidebar:
  order: 2
---

## 핵심 개념

RTOS의 주요 컴포넌트에는 실시간 클록(주기적 프로세스 스케줄링 정보 제공), 인터럽트 핸들러(비주기적 서비스 요청 관리), 스케줄러(실행할 프로세스 선택), 자원 관리자(메모리와 프로세서 자원 할당), 디스패처(프로세스 실행 시작)가 포함된다. 프로세스 우선순위에는 클록 레벨(주기적 프로세스), 인터럽트 레벨(매우 빠른 응답 필요 프로세스), 배경 레벨(실시간 마감 시한 불필요 프로세스)이 있다. 스케줄링 전략에는 비선점형(nonpreemptive, 프로세스가 완료까지 실행)과 선점형(preemptive, 높은 우선순위 프로세스가 낮은 우선순위를 중단)이 있다. 스케줄링 알고리즘에는 라운드 로빈, 속도 단조(rate monotonic), 최단 마감 시한 우선(shortest deadline first) 등이 있다.

## 예시

VxWorks, Windows Embedded Compact, RTLinux가 대표적인 RTOS이다. 방범 경보 시스템에서 전압 모니터 프로세스는 전원 장애 감지와 배터리 전환이 중요하므로 센서 점검 프로세스보다 높은 우선순위를 부여받아야 한다. 일반 Linux/Windows는 프로세스 관리의 세밀한 제어가 부족하고 공간을 많이 차지하며 프로그램 실행을 느리게 하므로 실시간 시스템 플랫폼으로 적합하지 않다.

## 관련 개념

- [임베디드 실시간 시스템 (Embedded Real-Time System)](/knowledge/software-engineering/embedded-real-time-system/)
- [시간 분석 (Timing Analysis)](/knowledge/software-engineering/timing-analysis/)
- [자극-응답 모델 (Stimulus-Response Model)](/knowledge/software-engineering/stimulus-response-model/)
- [실시간 소프트웨어 아키텍처 패턴 (Architectural Patterns for Real-Time Software)](/knowledge/software-engineering/architectural-patterns-for-real-time-software/)
