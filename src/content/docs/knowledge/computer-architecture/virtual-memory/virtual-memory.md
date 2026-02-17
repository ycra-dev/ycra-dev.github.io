---
title: "Virtual Memory"
description: "가상 메모리는 메인 메모리를 보조 저장장치(디스크 또는 플래시)의 \"캐시\"로 사용하는 기술이다"
tags: ['Memory Hierarchy', 'Paging', 'Address Translation', 'Page Table', 'Secondary Storage']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/virtual-memory
sidebar:
  order: 1
---

## 핵심 개념

가상 메모리의 핵심 역할은 두 가지이다. 첫째, 여러 프로세스(또는 가상 머신)가 안전하게 메모리를 공유할 수 있도록 보호 메커니즘을 제공한다. 둘째, 프로그램의 가상 주소 공간을 물리적 주소로 변환(address translation)하여 프로그램이 물리적 메모리보다 큰 주소 공간을 사용할 수 있게 한다.

가상 메모리에서 블록은 페이지(page)라 하고, 미스는 페이지 폴트(page fault)라 한다. 페이지 폴트의 엄청난 비용(수백만 클럭 사이클)은 다음과 같은 설계 결정을 이끌어낸다:
- 큰 페이지 크기(4 KiB ~ 16 KiB)로 높은 접근 시간을 분산
- 완전 연관(fully associative) 배치로 페이지 폴트 빈도 감소
- 소프트웨어로 페이지 폴트 처리 (디스크 접근 시간에 비해 오버헤드 작음)
- Write-back 방식 사용 (write-through는 디스크 쓰기 시간이 너무 길어 비실용적)

가상 주소는 가상 페이지 번호(virtual page number)와 페이지 오프셋(page offset)으로 나뉘며, 페이지 테이블을 통해 가상 페이지 번호가 물리적 페이지 번호로 변환된다.

## 예시

```
# 32비트 주소 체계에서 4 KiB 페이지 사용 시
가상 주소: [가상 페이지 번호 (20비트)] [페이지 오프셋 (12비트)]
                    |
                    v (페이지 테이블 조회)
물리 주소: [물리 페이지 번호 (18비트)] [페이지 오프셋 (12비트)]

# 페이지 테이블 크기 계산
페이지 테이블 엔트리 수 = 2^32 / 2^12 = 2^20 = 1,048,576
페이지 테이블 크기 = 2^20 * 4 bytes = 4 MiB (프로세스당)
```

## 관련 개념

- [Page Table](/knowledge/computer-architecture/page-table/)
- [Page Fault](/knowledge/computer-architecture/page-fault/)
- [Address Translation](/knowledge/computer-architecture/address-translation/)
- [Translation Lookaside Buffer](/knowledge/computer-architecture/translation-lookaside-buffer/)
- [Swap Space](/knowledge/computer-architecture/swap-space/)
