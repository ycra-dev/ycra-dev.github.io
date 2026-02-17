---
title: "Precise Interrupt"
description: "정밀 인터럽트(Precise Interrupt)는 파이프라인 컴퓨터에서 예외가 항상 올바른 명령어와 연관되어 처리되는 방식이다"
tags: ['Exception', 'Pipeline', 'Interrupt', 'State Preservation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/precise-interrupt
sidebar:
  order: 28
---

## 핵심 개념

정밀 예외에서는 예외를 발생시킨 명령어 이전의 모든 명령어가 완전히 실행을 마치고, 그 이후의 명령어는 어떤 상태도 변경하지 않는 것이 보장된다. 이는 가상 메모리 지원에 필수적이다. MIPS를 포함한 대부분의 현대 프로세서가 정밀 예외를 지원한다. 반면, 비정밀 인터럽트(imprecise interrupt)는 예외와 정확한 명령어의 연관이 보장되지 않아 운영체제가 문제 명령어를 파악하기 어렵다. 동적 스케줄링 프로세서에서는 인오더 커밋(in-order commit)을 통해 정밀 예외를 구현한다.

## 예시

```
정밀 예외 보장:
명령어 1: sub $11, $2, $4   -> 완료됨
명령어 2: and $12, $2, $5   -> 완료됨
명령어 3: or  $13, $2, $6   -> 완료됨
명령어 4: add $1, $2, $1    -> 오버플로우 예외! (이 명령어 효과 취소)
명령어 5: slt $15, $6, $7   -> 플러시 (실행되지 않은 것처럼 처리)

EPC = 명령어 4의 주소 + 4
```

## 관련 개념

- [Exception](/knowledge/computer-architecture/exception/)
- [In-Order Commit](/knowledge/computer-architecture/in-order-commit/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
