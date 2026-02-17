---
title: "Superscalar"
description: "슈퍼스칼라(Superscalar)는 실행 중 동적으로 명령어를 선택하여 한 클록 사이클에 하나 이상의 명령어를 실행할 수 있게 하는 고급 파이프라이닝 기법이다"
tags: ['Multiple Issue', 'Dynamic Scheduling', 'Out Of Order', 'Processor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/superscalar
sidebar:
  order: 30
---

## 핵심 개념

슈퍼스칼라 프로세서는 동적 다중 발행의 대표적 구현으로, 하드웨어가 런타임에 발행할 명령어 수와 종류를 결정한다. 가장 단순한 형태에서는 명령어가 순서대로 발행되지만, 더 발전된 형태에서는 동적 파이프라인 스케줄링을 사용하여 해저드를 회피하면서 비순차 실행(out-of-order execution)을 수행한다. 컴파일러의 스케줄링에 비해 슈퍼스칼라는 코드 호환성을 유지하면서도 캐시 미스 등 예측 불가능한 지연을 숨길 수 있다는 장점이 있다. 현대 고성능 프로세서는 3~6개 명령어를 매 사이클 발행하려 시도한다.

## 예시

```
슈퍼스칼라 파이프라인 구조:
1. Instruction Fetch & Issue Unit
   - 명령어 인출 및 디코딩
   - 레지스터 리네이밍
   - 리오더 버퍼 할당

2. Functional Units (다수)
   - ALU, FPU, Load/Store Unit 등
   - 각각 예약 스테이션(reservation station) 보유

3. Commit Unit
   - 결과를 프로그램 순서대로 커밋
   - 리오더 버퍼에서 레지스터 파일로 기록
```

## 관련 개념

- [Multiple Issue](/knowledge/computer-architecture/multiple-issue/)
- [Dynamic Pipeline Scheduling](/knowledge/computer-architecture/dynamic-pipeline-scheduling/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Reservation Station](/knowledge/computer-architecture/reservation-station/)
- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
