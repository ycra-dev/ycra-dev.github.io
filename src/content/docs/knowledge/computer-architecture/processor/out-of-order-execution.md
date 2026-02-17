---
title: "Out-of-Order Execution"
description: "비순차 실행(Out-of-Order Execution)은 파이프라인 실행에서 차단된 명령어가 후속 명령어의 실행을 대기시키지 않고, 준비된 명령어가 먼저 실행될 수 있는 상황이다"
tags: ['Dynamic Scheduling', 'Ilp', 'Superscalar', 'Pipeline', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/out-of-order-execution
sidebar:
  order: 32
---

## 핵심 개념

비순차 실행에서 프로세서는 프로그램의 데이터 흐름 구조를 분석하여 데이터 흐름 순서를 보존하면서 가능한 명령어를 먼저 실행한다. 파이프라인은 세 단위로 나뉜다: (1) 명령어 인출 및 발행 유닛(순서대로 발행), (2) 다수의 기능 유닛(비순차 실행), (3) 커밋 유닛(순서대로 커밋). 프로그램 순서를 유지하기 위해 발행은 인오더(in-order)로, 커밋도 인오더로 수행되지만, 기능 유닛은 데이터가 준비되는 대로 자유롭게 실행을 시작한다. 이는 캐시 미스 등 예측 불가능한 지연을 숨기는 데 효과적이다. 비순차 실행은 WAR, WAW 등 새로운 해저드를 도입하므로 레지스터 리네이밍을 통해 처리해야 한다. 하드웨어 투기와 결합하면 분기 예측 결과를 기다리지 않고 더 많은 명령어를 실행할 수 있다.

## 예시

```
비순차 실행 예시:
lw   $t0, 0($s0)    # 캐시 미스 → 수백 사이클 대기
addu $t1, $t0, $t2  # $t0에 의존 → 대기
sub  $t4, $t5, $t6  # 독립적 → 먼저 실행 가능!
and  $t7, $t8, $t9  # 독립적 → 먼저 실행 가능!

인오더 파이프라인: lw 완료까지 모든 명령어 대기
비순차 파이프라인: sub, and를 lw 대기 중에 실행
```

## 관련 개념

- [Dynamic Pipeline Scheduling](/knowledge/computer-architecture/dynamic-pipeline-scheduling/)
- [Reservation Station](/knowledge/computer-architecture/reservation-station/)
- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
- [In-Order Commit](/knowledge/computer-architecture/in-order-commit/)
- [Register Renaming](/knowledge/computer-architecture/register-renaming/)
- [Superscalar](/knowledge/computer-architecture/superscalar/)
