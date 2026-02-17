---
title: "Page Fault"
description: "페이지 폴트는 접근하려는 페이지가 메인 메모리에 존재하지 않을 때 발생하는 이벤트이다"
tags: ['Virtual Memory', 'Exception', 'Page Table', 'Swap Space', 'Operating System']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/page-fault
sidebar:
  order: 4
---

## 핵심 개념

페이지 폴트가 발생하면 운영체제가 예외(exception) 메커니즘을 통해 제어를 받는다. 디스크 접근 시간이 메인 메모리보다 약 100,000배 느리기 때문에, 페이지 폴트 처리는 수백만 클럭 사이클이 소요된다. 이 엄청난 미스 페널티는 가상 메모리 설계의 핵심 결정들을 이끌어낸다.

운영체제가 페이지 폴트를 처리하는 세 단계:
1. 페이지 테이블을 사용하여 디스크에서 참조된 페이지의 위치를 찾는다.
2. 대체할 물리 페이지를 선택한다 (더티 페이지인 경우 먼저 디스크에 기록).
3. 디스크에서 참조된 페이지를 선택된 물리 페이지로 읽어온다.

디스크 접근이 수백만 사이클이 걸리므로, 운영체제는 보통 페이지 폴트가 발생한 프로세스 대신 다른 프로세스를 실행하며, 디스크 I/O 완료 후 원래 프로세스의 상태를 복원하고 폴트를 발생시킨 명령어를 다시 실행한다.

## 예시

```
# 페이지 폴트 처리 흐름
1. 프로세서가 가상 주소로 메모리 접근 시도
2. TLB 미스 발생 -> 페이지 테이블 참조
3. 페이지 테이블 엔트리의 valid bit = 0
4. 페이지 폴트 예외 발생
5. OS가 제어권 획득
6. OS가 디스크에서 해당 페이지 위치 파악
7. 대체할 물리 페이지 선택 (LRU 알고리즘 사용)
8. 더티 페이지면 디스크에 기록 (write-back)
9. 디스크에서 새 페이지 읽기 시작
10. OS가 다른 프로세스에 CPU 할당
11. 디스크 읽기 완료 시 OS가 원래 프로세스 복원
12. 폴트를 발생시킨 명령어 재실행
```

## 관련 개념

- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Table](/knowledge/computer-architecture/page-table/)
- [Swap Space](/knowledge/computer-architecture/swap-space/)
- [Translation Lookaside Buffer](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [Context Switch](/knowledge/computer-architecture/context-switch/)
