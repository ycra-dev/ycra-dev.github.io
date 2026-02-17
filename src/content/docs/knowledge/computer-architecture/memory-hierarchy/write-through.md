---
title: "Write-Through"
description: "Write-through는 쓰기 시 항상 캐시와 하위 메모리 계층 모두에 데이터를 기록하여 일관성을 보장하는 캐시 쓰기 정책이다"
tags: ['Cache', 'Write Policy', 'Memory Hierarchy', 'Consistency', 'Write Buffer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/write-through
sidebar:
  order: 16
---

## 핵심 개념

Write-through는 캐시와 메모리 간 일관성을 유지하는 가장 단순한 방식이다. 매 쓰기마다 메인 메모리도 갱신하므로 구현이 간단하지만, 모든 쓰기에 메모리 접근이 필요하여 성능이 저하된다. 예를 들어, CPI가 1.0이고 명령어의 10%가 스토어이며 쓰기에 100 사이클이 걸리면 CPI가 11로 증가한다. 이를 완화하기 위해 쓰기 버퍼(write buffer)를 사용한다: 데이터를 캐시와 쓰기 버퍼에 기록한 후 프로세서가 계속 실행하고, 메모리 쓰기가 완료되면 버퍼 항목을 해제한다. 쓰기 미스 시에는 먼저 블록을 메모리에서 가져온 후(write allocate) 캐시에 기록하거나, 메모리에만 기록하는(no write allocate) 방식이 있다. Write-through는 write-back보다 미스 처리가 간단하지만, 메모리 대역폭 소비가 크다.

## 예시

```
Write-Through 동작:

store $t0, 0($s0)
  1. 캐시에 데이터 기록
  2. 쓰기 버퍼에 (주소, 데이터) 저장
  3. 프로세서 계속 실행
  4. 백그라운드에서 메모리에 기록
  5. 완료 시 쓰기 버퍼 항목 해제

성능 영향 (쓰기 버퍼 없이):
- 기본 CPI: 1.0
- 스토어 비율: 10%
- 쓰기 패널티: 100 사이클
- 결과 CPI: 1.0 + 100 × 10% = 11.0 (10배 이상 성능 저하)
```

## 관련 개념

- [Write-Back](/knowledge/computer-architecture/write-back/)
- [Write Buffer](/knowledge/computer-architecture/write-buffer/)
- [Direct-Mapped Cache](/knowledge/computer-architecture/direct-mapped-cache/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
- [Cache Miss](/knowledge/computer-architecture/cache-miss/)
