---
title: "Valid Bit"
description: "유효 비트(Valid Bit)는 메모리 계층구조의 테이블에서 해당 블록에 유효한 데이터가 포함되어 있는지를 나타내는 필드이다"
tags: ['Cache', 'Memory Hierarchy', 'Initialization', 'Tag', 'Control']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/valid-bit
sidebar:
  order: 9
---

## 핵심 개념

캐시에서 유효 비트는 해당 캐시 항목의 태그를 무시해야 하는지 여부를 알려준다. 프로세서 시작 시 캐시에는 유효한 데이터가 없으므로 모든 유효 비트가 해제(0)된 상태이다. 명령어를 실행하면서 캐시 미스가 발생할 때마다 메모리에서 블록을 가져와 캐시에 기록하면서 유효 비트를 설정(1)한다. 유효 비트가 해제된 항목은 태그가 일치하더라도 히트로 판단하지 않는다. 이는 캐시의 정확성을 보장하는 핵심 메커니즘이다. 캐시 무효화(invalidation) 시에도 유효 비트를 해제하여 해당 블록을 논리적으로 제거한다. 유효 비트는 캐시의 총 비트 수에 포함되며, 각 블록당 1비트만 필요하다.

## 예시

```
캐시 초기화 및 유효 비트:

인덱스 | V | 태그 | 데이터
-------|---|------|-------
000    | 0 |  --  |  --    ← 유효하지 않음 (무시)
001    | 0 |  --  |  --    ← 유효하지 않음
010    | 1 |  10  | [data] ← 유효 (태그 비교 가능)
011    | 0 |  --  |  --    ← 유효하지 않음
...

캐시 미스 처리 후:
인덱스 001에 메모리 블록 로드 → V = 1, 태그 설정, 데이터 기록
```

## 관련 개념

- [Tag](/knowledge/computer-architecture/tag/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
