---
title: "파일 시스템 (File System)"
description: "디스크 데이터를 파일과 폴더라는 계층적 구조로 조직하는 운영체제 구성 요소로 물리적 저장 방식의 복잡성을 추상화한다"
tags: ["Software-Engineering", "File-System", "OS", "Storage", "Abstraction"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/file-system-basics
sidebar:
  order: 33
---

## 핵심 개념

파일 시스템은 디스크 등 저장 매체의 데이터를 **파일과 폴더(디렉터리)**라는 계층적 구조로 조직하는 운영체제의 구성 요소이다. 물리적 저장 방식의 복잡성을 추상화하여 사용자와 프로그래머에게 논리적이고 통일된 데이터 접근 방법을 제공한다.

## 동작 원리

### 핵심 개념

1. **파일(File)**: 이름이 붙은 데이터의 모음. 텍스트, 이미지, 프로그램 등 모든 종류의 데이터를 저장한다.

2. **폴더/디렉터리(Directory)**: 파일과 다른 폴더를 포함하는 컨테이너. 계층적 트리 구조를 형성한다.

3. **경로(Path)**: 파일의 위치를 나타내는 문자열. 예: `/home/user/documents/report.txt`

4. **메타데이터**: 파일의 내용 외에 이름, 크기, 생성일, 수정일, 권한 등의 정보를 관리한다.

### 추상화의 가치
동일한 파일 시스템 인터페이스가 다양한 물리적 장치에서 동작한다:
- HDD의 자기 디스크 위에서든
- SSD의 플래시 메모리 위에서든
- USB 드라이브, 네트워크 드라이브 위에서든

프로그램은 `open("file.txt")`라고 쓰면 되고, 그 파일이 어떤 물리적 장치에 있는지 알 필요가 없다.

### 주요 파일 시스템 종류
- **NTFS**: Windows의 기본 파일 시스템
- **APFS**: macOS/iOS의 파일 시스템
- **ext4**: Linux의 대표 파일 시스템
- **FAT32**: USB 드라이브 등에서 널리 사용 (크로스 플랫폼 호환)

## 예시

파일 시스템의 계층 구조:

```
/ (루트)
├── home/
│   ├── alice/
│   │   ├── documents/
│   │   │   ├── report.txt
│   │   │   └── budget.xlsx
│   │   └── photos/
│   │       └── vacation.jpg
│   └── bob/
├── usr/
│   ├── bin/       (실행 프로그램들)
│   └── lib/       (라이브러리들)
└── etc/           (설정 파일들)
```

물리적 저장 vs 논리적 보기:

```
물리적 디스크 (실제 모습):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ C │ A │ B │ A │ C │ B │ A │ C │  (블록 단위로 흩어져 저장)
└───┴───┴───┴───┴───┴───┴───┴───┴───┘

파일 시스템이 보여주는 논리적 모습:
파일 A: [████████████]    (연속된 하나의 파일처럼 보임)
파일 B: [████████]
파일 C: [████████████]

→ 파일 시스템이 흩어진 블록들을 모아 하나의 연속된 파일로 보여줌
```

## 관련 개념

- [운영체제 (Operating System)](/knowledge/software-engineering/operating-system-basics/) - 파일 시스템을 관리하는 시스템 소프트웨어
- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 파일 열기/읽기/쓰기 등의 파일 시스템 조작 인터페이스
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - 파일 시스템이 실제 데이터를 저장하는 물리적 장치
- [가상 메모리 (Virtual Memory)](/knowledge/software-engineering/virtual-memory-basics/) - 파일 시스템과 유사한 추상화를 메모리에 적용

## 출처

- Understanding the Digital World, Chapter 6
