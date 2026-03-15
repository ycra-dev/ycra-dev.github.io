---
title: "재시작 가능 명령어 (Restartable Instruction)"
description: "재시작 가능 명령어는 예외가 해결된 후 예외의 영향 없이 실행을 재개할 수 있는 명령어이다"
tags: ['Exception', 'Page Fault', 'Pipeline', 'Virtual Memory', 'Instruction Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/restartable-instruction
sidebar:
  order: 10
---

## 핵심 개념

페이지 폴트 처리에서 명령어의 재시작 가능성은 매우 중요하다. 페이지 폴트는 명령어 실행 도중(특히 데이터 접근 시)에 발생할 수 있으며, 명령어가 완료되기 전에 예외를 처리한 후 아무 일도 없었던 것처럼 명령어를 다시 시작해야 한다.

MIPS와 같은 아키텍처에서는 각 명령어가 하나의 데이터 항목만 쓰고, 이 쓰기가 명령어 사이클 끝에서 발생하므로 재시작이 비교적 쉽다. 명령어 완료를 방지(쓰기 안 함)하고 처음부터 다시 시작하면 된다.

반면 x86과 같은 복잡한 명령어를 가진 프로세서에서는 재시작이 훨씬 어렵다. 예를 들어 x86의 블록 이동 명령어는 수천 개의 데이터 워드를 접근할 수 있어, 명령어 실행 중간에 여러 페이지 폴트가 발생할 수 있다. 이 경우 명령어를 처음부터 다시 시작할 수 없으며, 실행 중간에서 재개해야 한다.

## 예시

```
# MIPS에서의 재시작 가능 명령어
lw $1, 0($1)   # 이 명령어에서 페이지 폴트 발생 시:
# 주의: $1이 덮어쓰기 전에 페이지 폴트가 감지되어야 함
# -> 쓰기 파이프라인 단계를 방지하여 $1 보존
# -> 예외 처리 후 명령어를 처음부터 재실행

# x86에서의 복잡한 경우
REP MOVSB      # 블록 이동: 수천 바이트 복사
# -> 복사 중간에 페이지 폴트 발생 가능
# -> 명령어를 처음부터 재시작할 수 없음
# -> 특수 상태를 저장하여 중간에서 재개해야 함
```

## 관련 개념

- [페이지 폴트 (Page Fault)](/knowledge/computer-architecture/page-fault/)
- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
- [TLB (변환 색인 버퍼)](/knowledge/computer-architecture/translation-lookaside-buffer/)
