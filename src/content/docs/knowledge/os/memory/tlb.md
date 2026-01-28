---
title: "TLB (Translation Look-Aside Buffer)"
description: "최근 사용된 페이지 테이블 엔트리를 캐싱하는 고속 연관 메모리"
tags: ["OS", "Memory"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/tlb
sidebar:
  order: 26
---

## 핵심 개념

TLB(Translation Look-Aside Buffer)는 최근 사용된 페이지 테이블 엔트리를 캐싱하는 **고속 연관 메모리(associative memory)**이다. 페이지 테이블이 메모리에 있으면 모든 메모리 접근이 2배로 느려지는데(테이블 조회 1번 + 실제 접근 1번), TLB가 이 성능 문제를 해결한다.

비유하면, 도서관에서 자주 찾는 책의 위치를 메모해둔 포스트잇이다. 메모에 있으면 바로 찾고(hit), 없으면 목록을 뒤져야 한다(miss).

## 동작 원리

### 주소 변환 흐름

```
        ┌─────────────┐
        │  논리 주소   │
        │   [p | d]   │
        └──────┬──────┘
               │
        ┌──────v──────┐
        │    TLB     │──hit──> [f | d] ──> 메모리
        └──────┬──────┘
              miss
               │
        ┌──────v──────┐
        │ 페이지 테이블 │──> [f | d] ──> 메모리
        └─────────────┘      │
               <─────────────┘
               (TLB 갱신)
```

1. CPU가 논리 주소 생성
2. TLB에서 페이지 번호를 **모든 키와 동시에 비교** → O(1) 검색
3. **TLB Hit**: 프레임 번호 즉시 반환 → 메모리 1회 접근
4. **TLB Miss**: 페이지 테이블 조회 → 프레임 획득 → TLB에 추가 → 메모리 2회 접근

### ASID (Address-Space Identifier)

프로세스 식별자를 TLB 엔트리에 저장하여, 컨텍스트 스위칭 시 **TLB 플러시 불필요**. ASID가 없으면 프로세스 전환마다 TLB를 비워야 한다.

### 교체 정책

- LRU, 라운드 로빈, 랜덤 등
- 일부 엔트리는 **"wired down"**되어 교체 불가 (커널 코드 등)

### Effective Access Time (EAT)

```
EAT = hit_ratio × memory_time + (1 - hit_ratio) × 2 × memory_time
```

## 예시

메모리 접근 10ns, TLB 접근 시간 무시 가능:

| Hit Ratio | EAT | 성능 저하 |
|-----------|-----|----------|
| 80% | 0.8×10 + 0.2×20 = **12ns** | 20% |
| 99% | 0.99×10 + 0.01×20 = **10.1ns** | 1% |

현대 CPU에서 99%+ hit ratio 달성 가능하므로, 페이징의 성능 문제가 사실상 해결된다.

TLB 크기: 보통 32~1024 엔트리.

## 관련 개념

- [페이지 테이블 (Page Table)](/knowledge/os/page-table/) - TLB가 캐싱하는 원본 매핑 테이블
- [페이징 (Paging)](/knowledge/os/paging/) - TLB가 가속하는 메모리 관리 기법
- [캐시 (Cache)](/knowledge/os/cache/) - TLB도 캐시의 일종
- [컨텍스트 스위치 (Context Switch)](/knowledge/os/context-switch/) - ASID 없이는 TLB 플러시 필요
