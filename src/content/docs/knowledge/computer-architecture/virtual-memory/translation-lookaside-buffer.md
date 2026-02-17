---
title: "Translation Lookaside Buffer"
description: "TLB(Translation Lookaside Buffer)는 최근 사용된 주소 변환 정보를 저장하여 페이지 테이블에 대한 메모리 접근을 피하기 위한 특수한 캐시이다"
tags: ['Virtual Memory', 'Cache', 'Address Translation', 'Page Table', 'Tlb Miss']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/translation-lookaside-buffer
sidebar:
  order: 5
---

## 핵심 개념

페이지 테이블이 메인 메모리에 저장되어 있으므로, TLB 없이는 모든 메모리 접근이 최소 두 배의 시간이 걸린다(하나는 물리 주소 획득, 하나는 실제 데이터 접근). TLB는 지역성의 원리를 활용하여 최근 사용된 변환을 캐싱함으로써 이 문제를 해결한다.

TLB의 각 태그 엔트리는 가상 페이지 번호의 일부를 포함하고, 각 데이터 엔트리는 물리 페이지 번호를 포함한다. 더티 비트(dirty bit)와 참조 비트(reference bit) 같은 상태 비트도 포함된다.

TLB 미스가 발생하면 두 가지 상황이 가능하다: (1) 페이지가 메모리에 있지만 TLB에 변환이 없는 경우(TLB 미스만) - 페이지 테이블에서 변환을 로드, (2) 페이지가 메모리에 없는 경우(진정한 페이지 폴트) - OS가 디스크에서 페이지를 가져와야 함.

일반적인 TLB 사양:
- 크기: 16~512 엔트리
- 히트 시간: 0.5~1 클럭 사이클
- 미스 페널티: 10~100 클럭 사이클
- 미스율: 0.01%~1%

## 예시

```
# Intrinsity FastMATH TLB 예시
- 32비트 주소 공간, 4 KiB 페이지
- 가상 페이지 번호: 20비트
- TLB 엔트리: 16개 (완전 연관 사상)
- 각 엔트리: 64비트
  [태그(VPN) 20비트 | PPN 20비트 | Valid | Dirty | 기타]

# TLB 조회 과정
가상 주소 -> VPN 추출 -> 16개 TLB 엔트리 모두와 비교
  - 매칭 + Valid = 1 -> TLB 히트 -> PPN으로 물리 주소 구성
  - 매칭 없음 -> TLB 미스 -> 페이지 테이블 참조

# MIPS TLB 미스 핸들러 (~13 클럭 사이클)
mfc0 $k1, Context    # Context 레지스터 읽기
lw   $k1, 0($k1)     # 페이지 테이블 엔트리 로드
mtc0 $k1, EntryLo    # TLB 엔트리 설정
tlbwr                 # TLB에 랜덤 위치에 쓰기
eret                  # 예외 복귀
```

## 관련 개념

- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
- [Page Table](/knowledge/computer-architecture/page-table/)
- [Address Translation](/knowledge/computer-architecture/address-translation/)
- [Page Fault](/knowledge/computer-architecture/page-fault/)
- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
