---
title: "Systems Software"
description: "시스템 소프트웨어(Systems Software)는 일반적으로 유용한 서비스를 제공하는 소프트웨어로, 운영체제, 컴파일러, 로더, 어셈블러 등을 포함한다"
tags: ['Operating System', 'Compiler', 'Assembler', 'Loader', 'Software Layer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/systems-software
sidebar:
  order: 12
---

## 핵심 개념

시스템 소프트웨어는 하드웨어와 애플리케이션 소프트웨어 사이에 위치하는 계층적 소프트웨어이다. 운영체제와 컴파일러가 가장 핵심적인 두 가지 시스템 소프트웨어이다. 운영체제는 사용자 프로그램과 하드웨어 사이의 인터페이스를 제공하고, 컴파일러는 고급 언어를 하드웨어가 이해하는 명령어로 번역한다. 이 외에도 어셈블러(기호적 명령어를 이진 명령어로 변환), 로더(프로그램을 메모리에 로드), 링커(여러 오브젝트 파일을 연결) 등이 있다. 복잡한 애플리케이션에서는 여러 계층의 시스템 소프트웨어가 존재할 수 있다(예: 데이터베이스 시스템 위에 실행되는 애플리케이션).

## 예시

```
소프트웨어 계층 구조 (동심원 모델):

[하드웨어] (가장 안쪽)
    ↑
[시스템 소프트웨어]
  - 운영체제 (Linux, Windows, iOS)
  - 컴파일러 (gcc, javac)
  - 어셈블러
  - 로더/링커
    ↑
[애플리케이션 소프트웨어] (가장 바깥쪽)
  - 워드 프로세서, 웹 브라우저, 게임 등
```

## 관련 개념

- [Operating System](/knowledge/computer-architecture/operating-system/)
- [Compiler](/knowledge/language/compiler/)
- [Assembly Language](/knowledge/computer-architecture/assembly-language/)
- [Abstraction](/knowledge/computer-architecture/abstraction/)
