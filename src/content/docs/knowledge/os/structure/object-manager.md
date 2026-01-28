---
title: "객체 관리자 (Object Manager)"
description: "Windows 커널의 모든 시스템 자원을 일관된 방식으로 생성, 접근, 보호, 삭제하는 executive 컴포넌트"
tags: ["OS", "Windows", "Kernel"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/object-manager
sidebar:
  order: 11
---

## 핵심 개념

객체 관리자(Object Manager)는 Windows 커널의 모든 시스템 자원(파일, 프로세스, 뮤텍스 등)을 일관된 방식으로 생성, 접근, 보호, 삭제하는 executive 컴포넌트입니다. NT 설계 시 객체 지향 원칙을 적용하여, 모든 커널 자원을 "객체"라는 추상화로 통합 관리합니다.

## 동작 원리

모든 커널 자원은 생성, 열기, 접근 권한 확인, 참조 카운팅, 삭제라는 공통 생명주기를 가집니다.

### 객체 타입

시스템 정의 데이터 타입으로 속성(데이터)과 메서드(연산)를 가집니다.
예: File, Process, Thread, Mutex, Event, Registry Key, ALPC Port

### 핸들(Handle)

유저/커널 모드에서 객체를 참조하는 불투명 값입니다.
- 각 프로세스는 핸들 테이블 소유 (트리 구조, 1,024 ~ 16M 엔트리)
- 핸들 획득 방법: 객체 생성(Create), 기존 객체 열기(Open), 핸들 복제(Duplicate), 부모 프로세스로부터 상속

### 보안 통합

객체 열 때 SRM(보안 참조 모니터)이 접근 권한 검사합니다. 성공 시 접근 마스크(access mask)가 핸들에 캐싱되어, 이후 해당 핸들 사용 시 보안 검사를 생략합니다 (성능 최적화).

### 참조 카운팅

- **핸들 카운트**: 모든 핸들 테이블의 해당 객체 핸들 수
- **참조 카운트**: 핸들 + 커널 포인터 참조 합계
- 참조 카운트가 0이 되면 객체 삭제

```
User Mode Process A                User Mode Process B
┌─────────────────┐                ┌─────────────────┐
│ Handle Table    │                │ Handle Table    │
│ ┌─────┬────────┐│                │ ┌─────┬────────┐│
│ │0x100│File Obj││───────┐    ┌───││0x200│File Obj││
│ └─────┴────────┘│       │    │   │└─────┴────────┘│
└─────────────────┘       │    │   └─────────────────┘
───────────────────────────┼────┼──────────────────────
       Kernel Mode         │    │
                           ▼    ▼
                      ┌──────────┐
                      │File Object│
                      │RefCount: 2│ ← 두 프로세스가 참조
                      └──────────┘
```

## 예시

도서관 대출 시스템과 같습니다. 책(객체)은 도서관(커널)에 있고, 대출증 번호(핸들)로 빌립니다. 대출증에는 "열람만 가능" 또는 "대출 가능"(접근 마스크)이 기록됩니다.

1. 프로세스 A가 CreateFile()로 파일 객체 생성 → 핸들 0x100 반환
2. SRM이 A의 토큰과 파일 ACL 비교 → GENERIC_WRITE 허용
3. A가 WriteFile(0x100, ...) 호출 → 핸들에 WRITE 권한 있으므로 보안 검사 생략
4. A 종료 시 핸들 자동 닫힘 → 참조 카운트 감소

- 장점: 일관된 자원 관리, 보안 중앙화, 핸들 기반 접근 마스크 캐싱, 자원 누수 방지
- 단점: 간접 참조 오버헤드, 핸들 테이블 메모리 소비, 드라이버 언로드 시 시스템 핸들 자동 정리 안 됨

## 관련 개념

- [UNIX 파일 디스크립터 (File Descriptor)](/knowledge/os/unix-file-descriptor/)
- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/)
- [하이브리드 시스템 (Hybrid Systems)](/knowledge/os/hybrid-systems/)
