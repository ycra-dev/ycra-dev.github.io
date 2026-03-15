---
title: "예약 스테이션 (Reservation Station)"
description: "예약 스테이션(Reservation Station)은 동적 스케줄링 프로세서에서 기능 유닛 내의 버퍼로, 피연산자와 연산을 보유하고 있다가 모든 피연산자가 준비되면 실행을 시작한다"
tags: ['Dynamic Scheduling', 'Out Of Order', 'Functional Unit', 'Pipeline', 'Buffer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/reservation-station
sidebar:
  order: 36
---

## 핵심 개념

예약 스테이션은 비순차 실행의 핵심 구성요소이다. 명령어가 발행되면 해당 기능 유닛의 예약 스테이션에 복사된다. 레지스터 파일이나 리오더 버퍼에 피연산자가 있으면 즉시 예약 스테이션에 복사되고, 아직 생산되지 않은 피연산자는 해당 결과를 생성할 기능 유닛의 이름을 추적한다. 기능 유닛이 결과를 생성하면 대기 중인 모든 예약 스테이션에 직접 전달된다(레지스터를 거치지 않음). 이 메커니즘은 리오더 버퍼와 함께 하드웨어 레지스터 리네이밍을 구현한다. Intel Core i7은 6개 기능 유닛이 공유하는 중앙 집중식 예약 스테이션을 사용하며, 매 클록 사이클마다 최대 6개의 마이크로 연산을 기능 유닛에 디스패치할 수 있다.

## 예시

```
예약 스테이션 동작:

1. 명령어 발행: add $t0, $t1, $t2
   → ALU 예약 스테이션에 복사
   → $t1 값 = 레지스터 파일에서 복사 (사용 가능)
   → $t2 값 = "FU3에서 생산 예정" (아직 미완료)

2. FU3가 $t2 결과 생산
   → 결과가 대기 중인 예약 스테이션에 직접 전달
   → 이제 모든 피연산자 준비됨

3. ALU가 사용 가능해지면 실행 시작
   → 결과를 리오더 버퍼 + 다른 대기 예약 스테이션에 전달
```

## 관련 개념

- [비순차 실행 (Out-of-Order Execution)](/knowledge/computer-architecture/out-of-order-execution/)
- [리오더 버퍼 (Reorder Buffer)](/knowledge/computer-architecture/reorder-buffer/)
- [동적 파이프라인 스케줄링 (Dynamic Pipeline Scheduling)](/knowledge/computer-architecture/dynamic-pipeline-scheduling/)
- [포워딩 (Forwarding)](/knowledge/computer-architecture/forwarding/)
- [슈퍼스칼라 (Superscalar)](/knowledge/computer-architecture/superscalar/)
