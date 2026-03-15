---
title: "리오더 버퍼 (Reorder Buffer)"
description: "리오더 버퍼(Reorder Buffer)는 동적 스케줄링 프로세서에서 결과를 메모리나 레지스터에 안전하게 저장할 수 있을 때까지 버퍼링하는 장치이다"
tags: ['Out Of Order', 'Dynamic Scheduling', 'Commit', 'Speculation', 'Pipeline']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/reorder-buffer
sidebar:
  order: 35
---

## 핵심 개념

리오더 버퍼는 커밋 유닛의 핵심 구성요소로, 비순차 실행의 결과를 프로그램 순서대로 커밋하는 것을 가능하게 한다. 기능 유닛이 결과를 생산하면 리오더 버퍼의 해당 항목이 완료(complete)로 표시된다. 리오더 버퍼 헤드에 있는 하나 이상의 명령어가 완료되면 레지스터 파일이나 메모리에 결과를 기록하고 항목을 제거한다. 투기적 실행에서 투기가 틀린 것으로 판명되면 리오더 버퍼를 플러시하여 잘못된 결과를 폐기한다. 리오더 버퍼는 예약 스테이션과 함께 포워딩 로직의 역할도 수행하여 아직 커밋되지 않은 결과를 다른 명령어에 공급한다. 레지스터 리네이밍에서는 아키텍처 레지스터와 물리 레지스터 간의 매핑을 관리하는 데에도 사용된다. Intel Core i7은 리오더 버퍼에 항목을 할당하면서 최대 4개의 마이크로 연산을 매 클록에 처리한다.

## 예시

```
리오더 버퍼 동작:

항목 | 명령어            | 상태    | 결과
-----|-------------------|---------|------
1    | add $t0, $s1, $s2 | 완료    | 45    ← 헤드: 커밋 가능
2    | lw $t1, 0($s0)    | 완료    | 100   ← 커밋 가능
3    | beq $t0, $t1, L1  | 완료    | 분기 미수행
4    | sub $t2, $t3, $t4 | 실행 중 | -     ← 투기적 실행
5    | sw $t2, 8($s0)    | 대기 중 | -     ← 투기적 실행

투기 성공: 항목 4,5 결과를 커밋
투기 실패: 항목 4,5 폐기 (플러시)
```

## 관련 개념

- [비순차 실행 (Out-of-Order Execution)](/knowledge/computer-architecture/out-of-order-execution/)
- [순서 커밋 (In-Order Commit)](/knowledge/computer-architecture/in-order-commit/)
- [예약 스테이션 (Reservation Station)](/knowledge/computer-architecture/reservation-station/)
- [투기적 실행 (Speculation)](/knowledge/computer-architecture/speculation/)
- [레지스터 리네이밍 (Register Renaming)](/knowledge/computer-architecture/register-renaming/)
- [정확한 인터럽트 (Precise Interrupt)](/knowledge/computer-architecture/precise-interrupt/)
