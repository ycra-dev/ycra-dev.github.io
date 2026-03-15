---
title: "캐시 미스 (Cache Miss)"
description: "캐시 미스(Cache Miss)는 요청한 데이터가 캐시에 존재하지 않아 하위 메모리 계층에서 가져와야 하는 상황이다"
tags: ['Cache', 'Memory Hierarchy', 'Stall', 'Miss Penalty', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cache-miss
sidebar:
  order: 11
---

## 핵심 개념

캐시 미스 발생 시 프로세서 제어 유닛과 별도의 컨트롤러가 협력하여 메모리 접근을 시작하고 캐시를 리필한다. 캐시 미스 처리는 파이프라인 스톨을 유발하며, 프로세서의 임시 및 프로그래머 가시 레지스터의 내용을 동결시킨다. 명령어 캐시 미스 처리 절차는: (1) 원래 PC 값(현재 PC-4)을 메모리에 전송, (2) 메모리 읽기 수행 및 응답 대기, (3) 캐시 항목 기록(데이터, 태그, 유효 비트), (4) 명령어 실행 재시작. 데이터 캐시 미스도 유사하게 처리된다. 비순차 실행 프로세서에서는 캐시 미스 중에도 다른 독립적 명령어를 실행할 수 있지만, 인오더 프로세서에서는 미스 완료까지 전체 프로세서가 스톨된다. 블록 크기를 키우면 공간적 지역성을 활용하여 미스율을 줄일 수 있지만, 미스 패널티가 증가한다.

## 예시

```
명령어 캐시 미스 처리 절차:

1. PC - 4 → 메모리 주소 전송
2. 메모리 읽기 요청 (수 사이클~수백 사이클 대기)
3. 캐시 항목 기록:
   - 데이터 필드 ← 메모리에서 가져온 블록
   - 태그 필드 ← 주소 상위 비트
   - 유효 비트 ← 1
4. 명령어 실행 재시작 (캐시에서 히트)

성능 영향:
- L1 미스: ~10 사이클 패널티
- L2 미스: ~30 사이클 패널티
- L3 미스: ~130 사이클 패널티
```

## 관련 개념

- [캐시 메모리 (Cache Memory)](/knowledge/computer-architecture/cache-memory/)
- [파이프라인 스톨 (Pipeline Stall)](/knowledge/computer-architecture/pipeline-stall/)
- [미스 페널티 (Miss Penalty)](/knowledge/computer-architecture/miss-penalty/)
- [직접 사상 캐시 (Direct-Mapped Cache)](/knowledge/computer-architecture/direct-mapped-cache/)
- [AMAT (평균 메모리 접근 시간)](/knowledge/computer-architecture/amat/)
