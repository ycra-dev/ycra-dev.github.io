---
title: "VMM 메모리 관리 (VMM Memory Management)"
description: "물리 메모리를 여러 게스트에 효율적으로 분배하고 메모리 오버커밋 상황을 관리하는 VMM의 기능"
tags: ["OS", "Virtualization", "Memory"]
created: 2026-01-28
updated: 2026-01-28
draft: true
slug: knowledge/os/vmm-memory-management
sidebar:
  order: 12
---

## 핵심 개념

VMM 메모리 관리는 물리 메모리를 여러 게스트에 효율적으로 분배하고, **메모리 오버커밋** 상황에서도 각 게스트가 충분한 메모리를 가진 것처럼 느끼게 하는 VMM의 기능이다.

게스트들의 총 설정 메모리가 실제 물리 메모리를 초과하는 경우가 많다. 일반 OS는 메모리 크기가 변하지 않는다고 가정하지만, VMM은 이 가정을 유지하면서 실제 메모리를 동적으로 관리해야 한다.

## 동작 원리

각 게스트가 항상 설정된 메모리를 전부 사용하지는 않는다는 가정하에, 세 가지 메모리 회수 기법을 사용한다.

### 1. Double Paging (이중 페이징)

VMM이 자체 페이지 교체 알고리즘으로 게스트 페이지를 VMM의 backing store로 내보낸다.

```
Guest → Guest PT → VMM NPT → 물리 메모리 또는 VMM Swap
```

**문제**: VMM은 게스트의 메모리 접근 패턴을 모르기 때문에 비효율적이다. 다른 방법이 부족할 때만 사용하는 **최후 수단**이다.

### 2. Balloon Memory (풍선 메모리) — 권장

VMM이 게스트에 **pseudo-device driver**를 설치하고, 이 드라이버가 게스트 내에서 메모리를 할당 후 pin(고정)한다. 게스트는 가용 메모리 감소를 인식하여 자체 페이징을 수행하고, VMM은 pinned 페이지를 다른 게스트에 할당한다.

```
1. VMM → Balloon Driver: "1GB 할당해"
2. Balloon Driver: 게스트에서 1GB 할당 + pin
3. 게스트 OS: "메모리 부족!" → 자체 LRU 페이징
4. VMM: pinned 1GB를 다른 게스트에 할당
```

게스트 OS의 메모리 관리 알고리즘을 활용하므로 **가장 효율적**이다.

### 3. Page Sharing (페이지 공유)

동일한 페이지가 여러 게스트에 로드된 경우 하나로 합치는 중복 제거 기법이다. VMware의 방식:

1. 랜덤하게 게스트 메모리 샘플링
2. 각 페이지의 해시 계산
3. 해시 테이블에서 동일 해시 검색
4. 매칭되면 바이트 단위 비교
5. 동일하면 하나만 남기고 매핑

```
Guest 1: [OS Page A] [App Page X]
Guest 2: [OS Page A] [App Page Y]
Guest 3: [OS Page A] [App Page Z]

→ 공유 후:
Physical: [OS Page A] [Page X] [Page Y] [Page Z]
          (3개 → 1개로 줄어듦)
```

같은 OS를 실행하는 여러 게스트에서 특히 효과적이다.

### 기법 비교

| 기법 | 장점 | 단점 |
|------|------|------|
| Double Paging | 게스트 수정 불필요 | 비효율적, 느림 |
| Balloon | 게스트 알고리즘 활용 | 드라이버 설치 필요 |
| Page Sharing | 자동, 투명 | CPU 오버헤드 (해싱) |

### 메모리 압력 관리

VMM이 각 게스트의 **목표 메모리**를 계산하여 balloon을 inflate/deflate한다:
- 설정 메모리
- 오버커밋 비율
- 현재 시스템 부하

## 예시

6대의 게스트가 각각 8GB 메모리를 설정받았지만, 물리 메모리가 32GB인 상황(48GB 오버커밋). Balloon으로 유휴 게스트의 메모리를 회수하고, Page Sharing으로 동일 OS 이미지를 공유하면, 대부분의 경우 모든 게스트가 정상 동작한다.

### 장단점

- **장점**: 유연한 자원 할당 (오버커밋 가능), 게스트 투명하게 동작, 물리 메모리 효율적 활용
- **단점**: Double Paging의 비효율성, Balloon은 드라이버 필요, Page Sharing의 CPU 오버헤드

## 관련 개념

- [가상화 (Virtualization)](/knowledge/os/virtualization/) - 가상화의 전반적 개념
- [하이퍼바이저 유형 (Type 0/1/2)](/knowledge/os/hypervisor-types/) - 하이퍼바이저 분류
- [VMM CPU 스케줄링](/knowledge/os/vmm-cpu-scheduling/) - VMM의 CPU 자원 관리
- [라이브 마이그레이션 (Live Migration)](/knowledge/os/live-migration/) - VM 이동 시 메모리 관리와 연계
