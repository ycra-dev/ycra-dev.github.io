---
title: "가상 메모리 (Virtual Memory) - 기초 개념"
description: "운영체제가 물리적 RAM보다 큰 메모리 공간을 각 프로그램에 제공하는 기술로 디스크를 RAM의 확장으로 사용한다"
tags: ["Software-Engineering", "Virtual-Memory", "OS", "Memory-Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/virtual-memory-basics
sidebar:
  order: 34
---

## 핵심 개념

가상 메모리는 운영체제가 물리적 RAM보다 큰 메모리 공간을 각 프로그램에 제공하는 기술이다. 디스크를 RAM의 확장으로 사용하며, 각 프로그램에 독립적인 주소 공간을 부여하여 **메모리 보호**와 효율적 관리를 가능하게 한다.

## 동작 원리

1. **가상 주소 공간**: 각 프로그램은 자신만의 독립적인 주소 공간을 가진다. 프로그램은 자신이 메모리 전체를 독점적으로 사용하는 것처럼 동작한다.

2. **페이지(Page)**: 가상 메모리는 고정 크기(보통 4KB)의 페이지 단위로 관리된다.

3. **페이지 테이블**: OS가 관리하는 매핑 표로, 가상 주소를 실제 물리적 RAM 주소로 변환한다.

4. **페이지 스왑(Swap)**: 현재 사용하지 않는 페이지를 RAM에서 디스크로 옮기고, 필요할 때 다시 RAM으로 가져온다.

### 핵심 이점
- **용량 확장**: 4GB RAM이 있어도 각 프로그램에 훨씬 큰 주소 공간을 제공할 수 있다.
- **메모리 보호**: 프로그램 A가 프로그램 B의 메모리에 접근할 수 없다.
- **효율적 할당**: 물리적 메모리의 빈 곳을 찾아 유연하게 할당할 수 있다.

RAM은 나노초 단위로 접근 가능하지만, 디스크는 밀리초 단위로 약 10만 배 느리다. 따라서 페이지 스왑이 빈번해지면(thrashing) 성능이 급격히 저하된다.

## 예시

가상 주소 → 물리적 주소 매핑:

```
프로그램 A의 가상 메모리:     물리적 RAM:        디스크 (스왑):
┌──────────┐               ┌──────────┐       ┌──────────┐
│ 페이지 0  │──────────────►│ RAM 블록 3│       │          │
│ 페이지 1  │──────────────►│ RAM 블록 7│       │          │
│ 페이지 2  │─────────────────────────────────►│ 디스크   │
│ 페이지 3  │──────────────►│ RAM 블록 1│       │          │
└──────────┘               └──────────┘       └──────────┘

→ A의 페이지 2는 현재 디스크에 있음 (RAM 부족 시)
```

메모리 보호의 효과:

```
프로그램 A가 주소 0x1000에 쓰기 → A의 가상 페이지에 쓰기 (안전)
프로그램 B가 주소 0x1000에 쓰기 → B의 가상 페이지에 쓰기 (안전)
→ 같은 가상 주소지만 물리적으로 다른 곳이므로 서로 간섭하지 않음

프로그램 A가 B의 영역에 접근 시도 → OS가 차단 → "세그멘테이션 폴트"
```

## 관련 개념

- [운영체제 (Operating System)](/knowledge/software-engineering/operating-system-basics/) - 가상 메모리를 관리하는 시스템 소프트웨어
- [RAM (랜덤 액세스 메모리)](/knowledge/computer-architecture/ram/) - 가상 메모리가 매핑되는 물리적 메모리
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - 스왑 영역으로 사용되는 보조기억장치
- [파일 시스템 (File System)](/knowledge/software-engineering/file-system-basics/) - 디스크 추상화의 또 다른 형태
- [캐시 (Cache)](/knowledge/computer-architecture/cache-basics/) - 메모리 계층 구조에서 RAM보다 빠른 단계

## 출처

- Understanding the Digital World, Chapter 6
