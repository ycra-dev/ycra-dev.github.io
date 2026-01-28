---
title: "접근 행렬 구현 (Access Matrix Implementation)"
description: "접근 행렬을 효율적으로 구현하는 전역 테이블, ACL, 능력 리스트, Lock-Key 방식"
tags: ["OS", "Protection", "Security"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/access-matrix-impl
sidebar:
  order: 6
---

## 핵심 개념

접근 행렬은 개념적으로는 훌륭하지만, 실제로는 **희소 행렬(sparse matrix)**이다. 대부분의 항목이 비어 있기 때문에 행렬 전체를 그대로 저장하면 메모리 낭비가 심하다. 따라서 접근 행렬을 효율적으로 구현하는 네 가지 방식이 존재한다.

## 동작 원리

### 구현 방식 비교

| 방식 | 설명 | 장점 | 단점 |
|------|------|------|------|
| **전역 테이블** | `<도메인, 객체, 권한-집합>` 트리플의 집합으로 저장 | 구현이 단순 | 테이블이 매우 커짐, 그룹 권한 표현 어려움 |
| **접근 리스트 (ACL)** | 객체 중심 — 각 객체에 `(도메인, 권한)` 리스트 저장 | 권한 철회 용이, 객체 단위 관리 편리 | 접근 시 리스트 탐색 필요 |
| **능력 리스트 (Capability List)** | 도메인 중심 — 각 도메인에 `(객체, 권한)` 리스트 저장 | 접근 검증이 빠름 | 권한 철회 어려움, 위조 방지 필요 |
| **Lock-Key** | 절충 방식 — 객체에 Lock, 도메인에 Key 부여. Key와 Lock이 일치하면 접근 허용 | 유연하고 효과적 | 키 관리 복잡 |

### 접근 리스트 (ACL) — 객체 중심

```
파일A의 ACL: [(사용자A, {read}), (사용자B, {read, write}), (관리자, {read, write})]
파일B의 ACL: [(사용자A, {read, write}), (관리자, {read, write})]
```

파일을 열 때마다 ACL을 확인하여 요청자의 권한을 검증한다. 권한 철회가 쉽다 — 해당 객체의 ACL에서 항목을 제거하면 된다.

### 능력 리스트 (Capability List) — 도메인 중심

```
사용자A의 능력 리스트: [(파일A, {read}), (파일B, {read, write}), (프로그램, {execute})]
사용자B의 능력 리스트: [(파일A, {read, write}), (프린터, {print})]
```

능력(capability)은 **위조할 수 없는 토큰**이어야 한다. 커널 공간에 저장하거나 암호화로 보호한다. 권한 철회가 어렵다 — 모든 도메인의 능력 리스트를 탐색해야 한다.

### Lock-Key 방식

```
객체(파일A)의 Lock: [K1, K3]
도메인(사용자A)의 Key: [K1, K5]

→ K1이 일치하므로 사용자A는 파일A에 접근 가능
```

### 혼합 방식 (현대 OS)

현대 운영체제는 ACL과 능력 리스트를 **결합하여 사용**한다.

```
open("파일A", O_RDWR)
  │
  ├─ 1. ACL 확인 → 권한 검증 (접근 리스트 방식)
  │
  ├─ 2. 파일 디스크립터(fd) 생성 → 능력(capability) 발급
  │
  ├─ 3. read(fd) / write(fd) → 능력으로 빠른 검증
  │
  └─ 4. close(fd) → 능력 폐기
```

UNIX의 `open → read/write → close` 패턴이 이 혼합 방식의 대표적인 예시이다.

- **초기 접근**: ACL로 권한 확인 (정확하지만 느림)
- **이후 접근**: 능력(파일 디스크립터)으로 빠르게 검증
- **종료 시**: 능력 폐기로 자원 회수

## 예시

UNIX 파일 시스템에서의 혼합 방식:

```c
// 1. ACL 확인 → 파일 디스크립터(능력) 발급
int fd = open("/data/report.txt", O_RDONLY);

// 2. 능력(fd)으로 빠른 접근 검증
char buf[1024];
read(fd, buf, sizeof(buf));  // fd만 검증, ACL 재확인 안 함

// 3. 능력 폐기
close(fd);
```

## 관련 개념

- [접근 행렬](/knowledge/os/access-matrix/)
- [보호 도메인](/knowledge/os/protection-domain/)
