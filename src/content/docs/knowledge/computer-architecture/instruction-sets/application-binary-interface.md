---
title: "Application Binary Interface"
description: "ABI(Application Binary Interface)는 명령어 집합의 사용자 부분과 운영체제 인터페이스를 결합한 것으로, 컴퓨터 간 바이너리 이식성(binary portability)의 표준을 정의한다"
tags: ['Isa', 'Operating System', 'Software Interface', 'Binary Compatibility', 'Abstraction']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/application-binary-interface
sidebar:
  order: 21
---

## 핵심 개념

ABI는 애플리케이션 프로그래머에게 제공되는 인터페이스로, 기본 ISA의 명령어와 운영체제가 제공하는 시스템 호출 인터페이스를 포함한다. ABI를 통해 동일한 바이너리 프로그램이 같은 ABI를 지원하는 서로 다른 하드웨어 구현에서 실행될 수 있다. 이는 소프트웨어의 이식성과 호환성을 보장하는 핵심 메커니즘이다. 운영체제는 I/O, 메모리 할당 등의 저수준 기능을 캡슐화하여 애플리케이션 프로그래머가 이런 세부 사항에 신경 쓰지 않도록 한다.

## 예시

```
ABI의 구성 요소:
1. ISA의 사용자 수준 명령어 (예: add, sub, lw, sw)
2. 시스템 호출 규약 (예: 파일 열기, 메모리 할당)
3. 함수 호출 규약 (인수 전달, 반환값, 스택 사용)
4. 데이터 타입의 크기와 정렬 규칙
5. 바이너리 파일 형식 (실행 파일 구조)
```

## 관련 개념

- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Operating System](/knowledge/computer-architecture/operating-system/)
- [Abstraction](/knowledge/computer-architecture/abstraction/)
