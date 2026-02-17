---
title: "In-Order Commit"
description: "인오더 커밋(In-Order Commit)은 파이프라인 실행의 결과가 명령어 인출 순서와 동일한 순서로 프로그래머 가시(visible) 상태에 기록되는 커밋 방식이다"
tags: ['Out Of Order', 'Reorder Buffer', 'Precise Interrupt', 'Pipeline', 'Commit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/in-order-commit
sidebar:
  order: 39
---

## 핵심 개념

비순차 실행 프로세서에서 기능 유닛은 데이터가 준비되는 대로 비순차로 실행하지만, 프로그램이 단순한 인오더 파이프라인에서 실행되는 것처럼 동작하려면 결과의 커밋은 반드시 프로그램 순서대로 이루어져야 한다. 인오더 커밋은 리오더 버퍼를 통해 구현되며, 리오더 버퍼 헤드의 명령어가 완료되어야만 레지스터 파일이나 메모리에 결과를 기록한다. 이 방식은 정밀 예외(precise exception) 구현에 필수적이다: 예외 발생 시 해당 명령어 이전의 모든 명령어가 완료되고, 이후의 명령어는 상태를 변경하지 않음이 보장된다. 투기적 실행에서도 투기 결과가 커밋 전에 검증되므로, 틀린 투기의 결과는 절대 프로그래머 가시 상태에 반영되지 않는다. 현재 모든 동적 스케줄링 파이프라인이 인오더 커밋을 사용한다.

## 예시

```
인오더 커밋 동작:

리오더 버퍼:
[1] add $t0, $s1, $s2  → 완료 → 커밋 (레지스터에 기록)
[2] lw $t1, 0($s0)     → 완료 → 커밋
[3] mul $t2, $t3, $t4  → 실행 중 → 대기 (커밋 불가)
[4] sub $t5, $t6, $t7  → 완료 → 대기 (3번이 먼저 커밋되어야 함)

→ 항목 3이 완료될 때까지 항목 4는 커밋되지 않음
→ 예외 발생 시 마지막 커밋된 명령어까지만 상태 변경 보장
```

## 관련 개념

- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Precise Interrupt](/knowledge/computer-architecture/precise-interrupt/)
- [Speculation](/knowledge/computer-architecture/speculation/)
- [Commit Unit](/knowledge/computer-architecture/commit-unit/)
