---
title: Operating System
description: 운영체제 관련 개념 정리 (MOC)
tags: ["OS", "MOC"]
created: 2026-01-24
updated: 2026-01-25
draft: false
slug: knowledge/os
sidebar:
  order: 0
---

## 기본 개념

- [운영체제 (Operating System)](/knowledge/os/operating-system/) - 하드웨어 관리와 응용 프로그램 실행 기반 제공
- [커널 (Kernel)](/knowledge/os/kernel/) - 컴퓨터에서 항상 실행되는 OS의 핵심 프로그램
- [부트스트랩 프로그램 (Bootstrap Program)](/knowledge/os/bootstrap-program/) - 컴퓨터 전원이 켜질 때 운영체제를 로드하는 초기 프로그램
- [폰 노이만 아키텍처 (Von Neumann Architecture)](/knowledge/os/von-neumann-architecture/) - 메모리에서 명령어를 가져와 실행하는 명령어 실행 사이클
- [인터럽트 (Interrupt)](/knowledge/os/interrupt/) - 하드웨어가 CPU에게 이벤트 발생을 알리는 메커니즘
- [인터럽트 벡터 (Interrupt Vector)](/knowledge/os/interrupt-vector/) - 인터럽트 서비스 루틴 주소를 저장하는 배열
- [트랩 (Trap)](/knowledge/os/trap/) - 오류 또는 시스템 콜에 의해 발생하는 소프트웨어 생성 인터럽트
- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 프로세스가 운영체제에게 동작을 요청하는 방법
- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/) - 운영체제와 사용자 코드 실행을 구분하는 하드웨어 메커니즘
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/) - 커널 모드에서만 실행 가능한 명령어
- [타이머 (Timer)](/knowledge/os/timer/) - 운영체제가 CPU 제어를 유지하도록 보장하는 장치

## 프로세스

- [프로세스 (Process)](/knowledge/os/process/) - 실행 중인 프로그램
- [멀티프로그래밍 (Multiprogramming)](/knowledge/os/multiprogramming/) - CPU가 항상 실행할 작업을 갖도록 여러 프로그램을 조직
- [멀티태스킹 (Multitasking)](/knowledge/os/multitasking/) - CPU가 여러 프로세스 간에 빠르게 전환하여 빠른 응답 제공

## I/O와 저장장치

- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/) - 속도와 용량에 따른 저장 시스템 계층 구조
- [DMA (Direct Memory Access)](/knowledge/os/dma/) - CPU 개입 없이 장치와 메모리 간 직접 데이터 전송
- [캐시 (Cache)](/knowledge/os/cache/) - 자주 사용되는 정보를 빠른 저장 장치에 임시로 복사
- [캐시 일관성 (Cache Coherency)](/knowledge/os/cache-coherency/) - 멀티프로세서 환경에서 캐시 간 데이터 일관성 보장

## 컴퓨터 시스템 구조

- [멀티프로세서 시스템 (Multiprocessor System)](/knowledge/os/multiprocessor-system/) - 두 개 이상의 프로세서가 자원을 공유하는 시스템
- [가상화 (Virtualization)](/knowledge/os/virtualization/) - 하드웨어를 여러 실행 환경으로 추상화하는 기술

## 운영체제 서비스

- [운영체제 서비스 (OS Services)](/knowledge/os/os-services/) - 프로그램과 사용자에게 제공하는 서비스
- [사용자 인터페이스 (User Interface)](/knowledge/os/user-interface/) - 사용자가 운영체제와 상호작용하는 방법
- [명령 인터프리터 (Command Interpreter)](/knowledge/os/command-interpreter/) - 사용자가 명령을 직접 입력하는 CLI
- [GUI (Graphical User Interface)](/knowledge/os/gui/) - 마우스 기반 그래픽 인터페이스
- [터치스크린 인터페이스 (Touch-Screen Interface)](/knowledge/os/touch-screen-interface/) - 제스처 기반 모바일 인터페이스
- [API (Application Programming Interface)](/knowledge/os/api/) - 프로그래머에게 제공되는 함수 집합
- [시스템 콜 인터페이스 (System-call Interface)](/knowledge/os/system-call-interface/) - API와 시스템 콜을 연결하는 인터페이스
- [시스템 프로그램 (System Programs)](/knowledge/os/system-programs/) - 프로그램 개발과 실행을 위한 유틸리티
