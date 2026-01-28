---
title: "프로세스 제어 블록 (Process Control Block)"
description: "프로세스에 관한 모든 정보를 저장하는 커널 자료구조"
tags: ["OS", "Process", "Kernel"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/pcb
sidebar:
  order: 3
---

## 핵심 개념

PCB(Process Control Block)는 **프로세스에 관한 모든 정보를 담는 커널 자료구조**이다. OS가 프로세스를 관리하기 위해 반드시 필요한 "신분증"이다.

비유하자면, 학교에서 학생을 관리할 때 **생활기록부**에 성적, 출석, 인적사항을 기록하는 것과 같다. OS(학교)는 프로세스(학생)마다 PCB(생활기록부)를 하나씩 만들어 관리한다.

## 동작 원리

### PCB에 저장되는 정보

| 필드 | 설명 | 예시 |
|------|------|------|
| **Process State** | 현재 상태 | New, Ready, Running, Waiting, Terminated |
| **Program Counter** | 다음에 실행할 명령어 주소 | 0x00401234 |
| **CPU Registers** | 레지스터 값들 | 범용 레지스터, 스택 포인터 등 |
| **CPU Scheduling Info** | 스케줄링 우선순위 | 우선순위, 스케줄링 큐 포인터 |
| **Memory Management Info** | 메모리 관련 정보 | 페이지 테이블, 세그먼트 테이블 |
| **Accounting Info** | 자원 사용 통계 | CPU 사용 시간, 시작 시간 |
| **I/O Status Info** | 할당된 I/O 장치 목록 | 열린 파일 목록 |

### PCB 구조 다이어그램

```
┌─────────────────────────────┐
│           PCB                │
├─────────────────────────────┤
│  Process State: Running      │
├─────────────────────────────┤
│  Process Number (PID): 4721  │
├─────────────────────────────┤
│  Program Counter: 0x00401234 │
├─────────────────────────────┤
│  CPU Registers               │
│    EAX: 0x0001               │
│    EBX: 0x0042               │
│    ESP: 0x7FFF5A00           │
├─────────────────────────────┤
│  Memory Limits               │
│    Base: 0x00400000          │
│    Limit: 0x00010000         │
├─────────────────────────────┤
│  List of Open Files          │
│    fd0: stdin                │
│    fd1: stdout               │
│    fd3: /tmp/data.txt        │
└─────────────────────────────┘
```

### Linux의 task_struct

Linux 커널에서 PCB는 `task_struct` 구조체로 구현된다. `<include/linux/sched.h>`에 정의되어 있다.

```
task_struct 주요 필드
┌─────────────────────────────────────┐
│  volatile long state;       // 상태  │
│  void *stack;               // 스택  │
│  pid_t pid;                 // PID   │
│  pid_t tgid;          // 스레드 그룹  │
│  struct mm_struct *mm;      // 메모리 │
│  struct files_struct *files; // 파일  │
│  int prio;              // 우선순위   │
│  struct task_struct *parent; // 부모  │
│  struct list_head children;  // 자식  │
└─────────────────────────────────────┘
```

- 모든 `task_struct`는 **이중 연결 리스트**로 연결된다.
- `current` 매크로(포인터)로 현재 실행 중인 프로세스의 `task_struct`에 접근할 수 있다.
- 프로세스가 생성될 때마다 새로운 `task_struct`가 할당되고, 종료되면 해제된다.

## 예시

컨텍스트 스위치 시 PCB의 역할:

1. 프로세스 A가 Running 중 타이머 인터럽트 발생
2. OS가 프로세스 A의 **현재 상태를 PCB_A에 저장** (레지스터, PC 등)
3. 스케줄러가 프로세스 B를 선택
4. **PCB_B에서 상태를 복원** (레지스터, PC 등)
5. 프로세스 B가 중단됐던 지점부터 재개

PCB가 없으면 프로세스를 중단했다가 다시 시작할 수 없다. 마치 책갈피 없이 책을 읽는 것과 같다.

## 관련 개념

- [프로세스 상태](/knowledge/os/process-state/) - PCB에 저장되는 핵심 정보 중 하나
- [컨텍스트 스위치](/knowledge/os/context-switch/) - PCB를 저장/복원하는 과정
