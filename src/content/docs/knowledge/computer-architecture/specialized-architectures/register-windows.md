---
title: "Register Windows"
description: "레지스터 윈도우(Register Windows)는 프로시저 호출 시 레지스터 트래픽을 줄이기 위한 최적화 기법으로, 여러 뱅크의 레지스터를 사용하여 각 프로시저 호출 시 새로운 뱅크를 할당하고, 순환 버퍼로 운영한다"
tags: ['Register Windows', 'Sparc', 'Procedure Call', 'Register File']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/register-windows
sidebar:
  order: 5
---

## 핵심 개념

SPARC 아키텍처의 가장 독특한 특징인 레지스터 윈도우는 프로시저 호출/복귀 시 레지스터 저장/복원 오버헤드를 제거한다.

**구조**:
- 2~32개의 윈도우 (일반적으로 8개 사용)
- 각 윈도우: 8개 글로벌 + 8개 로컬 + 8개 인입 매개변수 + 8개 송출 매개변수
- 인접 윈도우의 송출 매개변수와 인입 매개변수가 겹침 (overlap)
- 물리 레지스터: 최소 40개 ~ 최대 520개 (대부분 128~136개)

**SAVE/RESTORE 명령어**:
- **SAVE**: 다음 윈도우로 전환 + 덧셈 연산 수행. 소스는 호출자 윈도우, 목적지는 피호출자 윈도우
- **RESTORE**: 이전 윈도우로 복귀 + 덧셈 연산. 소스는 피호출자, 목적지는 호출자

윈도우 오버플로/언더플로 시 트랩이 발생하여 레지스터를 메모리에 저장/복원한다. SPARC의 Berkeley RISC 설계에서 유래했으며, 현재는 SPARC와 Tensilica만 사용한다. RISC-V에는 포함되지 않았다.

## 예시

```
레지스터 윈도우 구조 (SPARC, 8개 윈도우):

        글로벌  인입    로컬    송출
Window 0: [g0-g7] [i0-i7] [l0-l7] [o0-o7]
Window 1: [g0-g7] [i0-i7] [l0-l7] [o0-o7]
  ...                              ↕ (겹침)
Window 7: [g0-g7] [i0-i7] [l0-l7] [o0-o7]

겹침 관계:
Window N의 o0-o7 == Window (N+1)의 i0-i7

프로시저 호출/복귀:
func_a() {
    // Window 0 활성
    // o0-o7에 매개변수 설정
    SAVE sp, -frame_size, sp  // Window 1로 전환
    // Window 1 활성
    // i0-i7에서 매개변수 접근 (Window 0의 o0-o7과 동일)

    // ... 함수 본문 ...

    RESTORE                    // Window 0으로 복귀
    // Window 0 활성
}

순환 버퍼:
호출 깊이가 윈도우 수 초과 시:
→ 가장 오래된 윈도우를 스택에 저장 (trap)
→ 새 윈도우 할당
→ 복귀 시 스택에서 복원 (trap)
```

## 관련 개념

- [RISC Architecture](/knowledge/computer-architecture/risc-architecture/)
- [Register File](/knowledge/computer-architecture/register-file/)
- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
