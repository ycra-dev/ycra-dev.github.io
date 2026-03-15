---
title: "운영체제 (Operating System) - 기초 개념"
description: "컴퓨터 하드웨어를 관리하고 응용프로그램이 실행될 수 있는 환경을 제공하는 시스템 소프트웨어"
tags: ["Software-Engineering", "OS", "Process-Management", "System-Software"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/operating-system-basics
sidebar:
  order: 32
---

## 핵심 개념

운영체제(OS)는 컴퓨터 하드웨어를 관리하고 응용프로그램이 실행될 수 있는 환경을 제공하는 **시스템 소프트웨어**이다. Windows, macOS, Linux, Android, iOS가 대표적이며, 프로세스 관리, 메모리 관리, 파일 시스템, 장치 관리 기능을 수행한다.

## 동작 원리

운영체제는 하드웨어와 응용프로그램 사이의 중재자 역할을 한다.

### 운영체제의 핵심 기능

1. **프로세스 관리**: 여러 프로그램을 동시에 실행하는 것처럼 보이게 한다. CPU 시간을 각 프로세스에 빠르게 번갈아 할당하여 멀티태스킹을 구현한다.

2. **메모리 관리**: 각 프로그램에 메모리를 할당하고, 프로그램들이 서로의 메모리에 접근하지 못하도록 보호한다. 가상 메모리를 통해 물리적 RAM보다 큰 주소 공간을 제공한다.

3. **파일 시스템**: 디스크의 원시 데이터를 파일과 폴더라는 논리적 구조로 조직한다.

4. **장치 관리**: 키보드, 마우스, 프린터, 네트워크 등 다양한 하드웨어 장치를 통일된 방식으로 사용할 수 있게 한다.

### 커널(Kernel)
OS의 핵심부로 항상 메모리에 상주하며, 하드웨어에 직접 접근할 수 있는 유일한 소프트웨어이다. 응용프로그램은 시스템 콜을 통해 커널에 서비스를 요청한다.

## 예시

운영체제의 계층 구조:

```
┌─────────────────────────────────────────┐
│  응용프로그램 (브라우저, 게임, 에디터)    │
├─────────────────────────────────────────┤
│  시스템 콜 인터페이스 (API)              │
├─────────────────────────────────────────┤
│  운영체제 커널                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ │
│  │프로세스│ │메모리│ │파일  │ │장치    │ │
│  │ 관리  │ │ 관리 │ │시스템│ │드라이버│ │
│  └──────┘ └──────┘ └──────┘ └────────┘ │
├─────────────────────────────────────────┤
│  하드웨어 (CPU, RAM, 디스크, I/O 장치)   │
└─────────────────────────────────────────┘
```

멀티태스킹의 원리:

```
시간 →
CPU: [브라우저][음악][메일][브라우저][음악][메일]...
       10ms    10ms  10ms   10ms    10ms  10ms

→ 각 프로그램에 아주 짧은 시간씩 CPU를 할당
→ 사용자에게는 세 프로그램이 동시에 실행되는 것처럼 보임
```

## 관련 개념

- [파일 시스템 (File System)](/knowledge/software-engineering/file-system-basics/) - OS가 관리하는 파일 저장/조직 체계
- [가상 메모리 (Virtual Memory)](/knowledge/software-engineering/virtual-memory-basics/) - OS의 메모리 관리 핵심 기술
- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 응용프로그램이 OS에 서비스를 요청하는 인터페이스
- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - OS가 관리하는 핵심 하드웨어 자원
- [오픈 소스 소프트웨어 (Open Source Software)](/knowledge/software-engineering/open-source-software/) - Linux는 오픈 소스 OS의 대표

## 출처

- Understanding the Digital World, Chapter 6
