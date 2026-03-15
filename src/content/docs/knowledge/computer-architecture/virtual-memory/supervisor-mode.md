---
title: "관리자 모드 (Supervisor Mode)"
description: "슈퍼바이저 모드(커널 모드)는 실행 중인 프로세스가 운영체제 프로세스임을 나타내는 프로세서 모드이다"
tags: ['Operating System', 'Protection', 'Virtual Memory', 'System Call', 'Privilege Level']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/supervisor-mode
sidebar:
  order: 11
---

## 핵심 개념

가상 메모리의 보호 메커니즘을 구현하기 위해 하드웨어는 최소 세 가지 기본 기능을 제공해야 한다:

1. 사용자 프로세스와 OS 프로세스를 구분하는 최소 두 가지 모드 지원
2. 사용자 프로세스가 읽을 수 있지만 쓸 수 없는 프로세서 상태 제공 (사용자/슈퍼바이저 모드 비트, 페이지 테이블 포인터, TLB 등)
3. 사용자 모드에서 슈퍼바이저 모드로, 그리고 그 반대로 전환하는 메커니즘 제공

사용자 모드에서 슈퍼바이저 모드로의 전환은 시스템 콜 예외(MIPS의 syscall 명령어)를 통해 이루어지며, 슈퍼바이저 코드 공간의 전용 위치로 제어를 전달한다. 반대 방향의 전환은 ERET(return from exception) 명령어를 통해 이루어진다.

이 메커니즘과 페이지 테이블을 OS 주소 공간에 저장함으로써, OS는 사용자 프로세스가 페이지 테이블을 변경하는 것을 방지하면서 자체적으로는 변경할 수 있다.

## 예시

```
# 사용자 모드 -> 슈퍼바이저 모드 전환
syscall                    # 시스템 콜 예외 발생
  -> PC를 EPC에 저장
  -> 슈퍼바이저 모드 비트 설정
  -> 제어가 OS의 전용 위치로 이동

# 슈퍼바이저 모드 -> 사용자 모드 복귀
eret                       # Return from Exception
  -> 사용자 모드로 재설정
  -> EPC의 주소로 점프

# 보호 메커니즘
사용자 모드에서 특권 명령어 실행 시도 -> 트랩 발생
예: 페이지 테이블 포인터 변경 시도 -> 예외 -> OS가 처리
```

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [시스템 호출 (System Call)](/knowledge/computer-architecture/system-call/)
- [가상 머신 모니터 (VMM)](/knowledge/computer-architecture/virtual-machine-monitor/)
- [문맥 교환 (Context Switch)](/knowledge/computer-architecture/context-switch/)
- [페이지 테이블 (Page Table)](/knowledge/computer-architecture/page-table/)
