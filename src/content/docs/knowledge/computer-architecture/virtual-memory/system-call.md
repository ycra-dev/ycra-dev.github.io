---
title: "System Call"
description: "시스템 콜은 사용자 모드에서 슈퍼바이저 코드 공간의 전용 위치로 제어를 전달하는 특수 명령어로, 이 과정에서 예외 메커니즘을 호출한다"
tags: ['Operating System', 'Supervisor Mode', 'Exception', 'Protection', 'User Mode']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/system-call
sidebar:
  order: 12
---

## 핵심 개념

시스템 콜은 사용자 프로그램이 운영체제의 서비스(파일 I/O, 메모리 할당, 프로세스 관리 등)를 안전하게 요청하는 유일한 메커니즘이다. MIPS에서는 `syscall` 명령어를 사용한다.

시스템 콜이 실행되면: (1) 현재 프로그램 카운터가 EPC(Exception Program Counter)에 저장되고, (2) 프로세서가 슈퍼바이저 모드로 전환되며, (3) 슈퍼바이저 코드 공간의 전용 위치로 제어가 이동한다.

시스템 콜은 일반 예외와 동일한 메커니즘을 사용하지만, 의도적으로 프로그래머에 의해 트리거된다는 점에서 다르다. OS가 서비스를 완료한 후 ERET 명령어로 사용자 모드로 복귀한다.

## 예시

```
# MIPS에서 시스템 콜 사용 예시
# 프로그램이 OS 서비스 요청
li $v0, 4          # 서비스 번호 4 (문자열 출력)
la $a0, string     # 인자: 문자열 주소
syscall            # 시스템 콜 실행
  # -> 트랩 발생
  # -> EPC <- PC
  # -> 슈퍼바이저 모드 전환
  # -> OS 핸들러로 점프
  # -> OS가 서비스 수행
  # -> eret으로 사용자 프로그램 복귀
```

## 관련 개념

- [Supervisor Mode](/knowledge/computer-architecture/supervisor-mode/)
- [Context Switch](/knowledge/computer-architecture/context-switch/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Fault](/knowledge/computer-architecture/page-fault/)
