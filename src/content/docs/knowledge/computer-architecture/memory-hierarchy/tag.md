---
title: "태그 (Tag)"
description: "태그(Tag)는 메모리 계층구조의 테이블에서 사용되는 필드로, 해당 블록이 요청된 워드에 대응하는지 식별하는 데 필요한 주소 정보를 포함한다"
tags: ['Cache', 'Memory Hierarchy', 'Address', 'Direct Mapped', 'Identification']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/tag
sidebar:
  order: 8
---

## 핵심 개념

캐시에서 여러 메모리 블록이 같은 캐시 위치에 매핑될 수 있으므로, 현재 캐시에 저장된 블록이 어떤 메모리 주소에 해당하는지 구별하는 방법이 필요하다. 태그는 캐시 인덱스로 사용되지 않는 주소의 상위 비트를 저장한다. 32비트 주소, 2^n 블록, 2^m 워드/블록인 캐시에서 태그 크기는 32-(n+m+2) 비트이다. 캐시 접근 시 인덱스로 선택된 블록의 태그를 요청 주소의 상위 비트와 비교하여, 일치하고 유효 비트가 설정되어 있으면 히트로 판단한다. 연관도(associativity)가 증가하면 세트당 블록 수가 늘어나 태그 비교기가 더 많이 필요하고, 태그 크기도 1비트씩 증가한다. 완전 연관 캐시에서는 인덱스가 없으므로 블록 오프셋을 제외한 전체 주소가 태그가 된다.

## 예시

```
32비트 주소의 캐시 주소 분해:

| 태그 (20비트) | 인덱스 (10비트) | 바이트 오프셋 (2비트) |
  상위 비트        캐시 블록 선택      워드 내 바이트

1024 워드 직접 사상 캐시 (1워드 블록):
- 인덱스: 10비트 (2^10 = 1024 블록)
- 태그: 32 - 10 - 2 = 20비트
- 비교: 태그 == 주소 상위 20비트? && 유효 비트 == 1? → 히트
```

## 관련 개념

- [직접 사상 캐시 (Direct-Mapped Cache)](/knowledge/computer-architecture/direct-mapped-cache/)
- [유효 비트 (Valid Bit)](/knowledge/computer-architecture/valid-bit/)
- [집합 연관 캐시 (Set-Associative Cache)](/knowledge/computer-architecture/set-associative-cache/)
- [캐시 메모리 (Cache Memory)](/knowledge/computer-architecture/cache-memory/)
