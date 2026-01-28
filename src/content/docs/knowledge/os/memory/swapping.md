---
title: "스와핑 (Swapping)"
description: "프로세스 또는 페이지를 메모리와 보조 저장장치 사이에서 이동시키는 기법"
tags: ["OS", "Memory", "VirtualMemory"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/swapping
sidebar:
  order: 8
---

## 핵심 개념

스와핑(Swapping)은 프로세스 또는 페이지를 메모리와 보조 저장장치(backing store) 사이에서 이동시키는 기법입니다. 물리 메모리는 유한하므로, 실행 중인 모든 프로세스를 동시에 메모리에 유지할 수 없을 때 사용합니다.

## 동작 원리

### 표준 스와핑 (Standard Swapping)

전체 프로세스를 메모리 ↔ 디스크 간 이동합니다. 전통적 UNIX에서 사용했으나, 현대 시스템에서는 너무 느려서 거의 사용하지 않습니다.

### 페이징과 결합된 스와핑 (Swapping with Paging)

프로세스 전체가 아닌 **페이지 단위**로 스와핑합니다. Linux, Windows 등 현대 OS에서 사용합니다.

- **Page out**: 페이지를 메모리 → 디스크로 이동
- **Page in**: 페이지를 디스크 → 메모리로 이동

```
표준 스와핑:
┌──────────┐    swap out    ┌──────────────┐
│  메모리   │ ──────────────> │  backing     │
│ [프로세스]│ <────────────── │  store       │
└──────────┘    swap in     └──────────────┘

페이징 스와핑:
┌──────────┐    page out    ┌──────────────┐
│  메모리   │ ──────────────> │  swap 영역   │
│  [페이지] │ <────────────── │  (디스크)    │
└──────────┘    page in     └──────────────┘
```

### 모바일 시스템

- iOS/Android는 스와핑 미지원
- 이유: 플래시 메모리의 쓰기 수명 제한, 느린 전송 속도
- 대안: 메모리 부족 시 앱에게 메모리 해제 요청, 불응 시 앱 종료

## 예시

책상(메모리)이 좁아서 모든 책(프로세스)을 펼쳐놓을 수 없을 때, 안 보는 책은 책장(디스크)에 넣어두고 필요할 때 꺼내옵니다.

- 장점: 물리 메모리보다 많은 프로세스/큰 주소 공간 지원, 멀티프로그래밍 향상
- 단점: 디스크 I/O로 심각한 성능 저하, 빈번하면 스래싱 발생

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/)
- [스래싱 (Thrashing)](/knowledge/os/thrashing/)
- [스왑 공간 관리](/knowledge/os/swap-space/)
- [메모리 압축 (Memory Compression)](/knowledge/os/memory-compression/)
