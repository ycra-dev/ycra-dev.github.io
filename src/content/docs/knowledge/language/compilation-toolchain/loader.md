---
title: "Loader"
description: "로더(Loader)는 오브젝트 프로그램을 메인 메모리에 적재하여 실행할 준비를 하는 시스템 프로그램이다"
tags: ['Translation Hierarchy', 'Executable File', 'Operating System', 'Memory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/loader
sidebar:
  order: 4
---

## 핵심 개념

로더는 프로그램 번역 계층의 마지막 단계를 담당한다. UNIX 시스템에서 로더는 다음 단계를 따른다: (1) 실행 파일 헤더를 읽어 텍스트와 데이터 세그먼트의 크기 결정, (2) 텍스트와 데이터를 위한 충분한 주소 공간 생성, (3) 실행 파일에서 명령어와 데이터를 메모리로 복사, (4) 메인 프로그램의 매개변수를 스택에 복사, (5) 레지스터 초기화 및 스택 포인터를 첫 번째 빈 위치로 설정, (6) 시작 루틴으로 점프하여 매개변수를 인수 레지스터에 복사하고 메인 루틴 호출.

## 예시

```
# 로더 동작 순서 (UNIX)
1. 실행 파일 헤더 읽기 → text: 1024 bytes, data: 256 bytes
2. 주소 공간 할당: text(0x00400000), data(0x10000000)
3. 명령어/데이터 메모리 복사
4. 스택 초기화: $sp = 0x7FFFFFFC
5. 시작 루틴 점프 → main() 호출
```

## 관련 개념

- [Linker](/knowledge/language/linker/)
- [Executable File](/knowledge/language/executable-file/)
- [Dynamically Linked Library](/knowledge/language/dynamically-linked-library/)
