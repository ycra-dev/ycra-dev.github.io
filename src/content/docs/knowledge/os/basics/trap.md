---
title: "트랩 (Trap)"
description: "오류 또는 시스템 콜에 의해 발생하는 소프트웨어 생성 인터럽트"
tags: ["OS", "Trap", "Interrupt", "Exception"]
created: 2026-01-25
updated: 2026-01-25
draft: false
slug: knowledge/os/trap
sidebar:
  order: 8
---

## 핵심 개념

트랩은 오류(예: 0으로 나누기, 잘못된 메모리 접근) 또는 운영체제 서비스 수행을 위한 사용자 프로그램의 특정 요청(시스템 콜)에 의해 발생하는 **소프트웨어 생성 인터럽트**이다.

> 트랩은 예외(exception)라고도 불린다.

## 트랩 발생 원인

| 원인 | 예시 |
|------|------|
| **오류 발생** | 0으로 나누기, 잘못된 메모리 접근 |
| **시스템 콜** | 사용자 프로그램이 운영체제 서비스 요청 |

## 트랩과 모드 전환

트랩이나 인터럽트 발생 시마다 하드웨어가 **user mode에서 kernel mode로 전환**한다.

1. 하드웨어가 mode bit의 상태를 0으로 변경 (kernel mode)
2. 시스템이 운영체제의 제어를 얻음
3. 커널 모드에서 처리 수행

## 시스템 콜과 트랩

시스템 콜은 보통 **인터럽트 벡터의 특정 위치로의 트랩** 형태를 취한다.

- 일반 trap 명령어로 실행 가능
- 일부 시스템은 시스템 콜 호출을 위한 특정 `syscall` 명령어를 가짐
- 시스템 콜 실행 시, 하드웨어에 의해 소프트웨어 인터럽트로 취급됨

## 오류 처리

하드웨어 보호가 모드를 위반하는 오류를 감지하면:

1. 하드웨어가 운영체제로 트랩
2. 인터럽트 벡터를 통해 운영체제로 제어 전달
3. 운영체제가 프로그램을 비정상적으로 종료
4. 적절한 오류 메시지 제공
5. (선택적) 프로그램의 메모리 덤프가 파일에 기록

## 트레이드오프

| 장점 | 단점 |
|------|------|
| 소프트웨어 이벤트에 대한 체계적 처리 | 모드 전환 오버헤드 |
| 사용자-커널 모드 전환 메커니즘 제공 | |

## 관련 개념

- [인터럽트 (Interrupt)](/knowledge/os/interrupt/) - 하드웨어가 CPU에게 이벤트 발생을 알리는 메커니즘으로, 트랩은 소프트웨어 생성 인터럽트
- [인터럽트 벡터 (Interrupt Vector)](/knowledge/os/interrupt-vector/) - 트랩 발생 시 핸들러 주소를 찾는 데 사용되는 주소 배열
- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/) - 트랩 발생 시 사용자 모드에서 커널 모드로 전환되는 메커니즘
- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 트랩을 통해 운영체제 서비스에 접근하는 방법
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/) - 사용자 모드에서 실행 시도 시 트랩이 발생하는 명령어

## 출처

- Operating System Concepts, 10th Edition, Chapter 1, p.22, 25-26
