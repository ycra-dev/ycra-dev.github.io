---
title: "Nonblocking Cache"
description: "비블로킹 캐시(nonblocking cache)는 캐시가 이전 미스를 처리하는 동안에도 프로세서가 캐시에 대한 참조를 계속할 수 있게 하는 캐시 설계이다"
tags: ['Cache', 'Out Of Order Execution', 'Miss Latency', 'Hit Under Miss', 'Memory Hierarchy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/nonblocking-cache
sidebar:
  order: 21
---

## 핵심 개념

비블로킹 캐시는 캐시 미스 지연 시간을 다른 유용한 작업으로 숨기기 위해, 비순서 실행(out-of-order) 프로세서에서 일반적으로 사용된다. 두 가지 형태가 있다:

1. **Hit-under-miss:** 미스 처리 중에 추가적인 캐시 히트를 허용한다. 미스 지연 시간의 일부를 다른 작업으로 숨기는 것을 목표로 한다.

2. **Miss-under-miss:** 여러 미해결 캐시 미스를 허용한다. 두 개 이상의 서로 다른 미스의 지연 시간을 겹치는 것을 목표로 한다.

블로킹 캐시는 프로세서가 캐시 요청이 완료될 때까지 기다려야 하는 반면, 비블로킹 캐시는 프로세서가 계속 명령어를 실행할 수 있게 한다. Intel Core i7이 대표적인 구현 사례이다.

여러 미해결 미스에 대해 대부분의 미스 시간을 겹치려면, 여러 미스를 병렬로 처리할 수 있는 고대역폭 메모리 시스템이 필요하다. 대형 서버에서는 이를 잘 활용할 수 있지만, 개인 모바일 장치에서는 제한적이다.

## 예시

```
# 블로킹 vs 비블로킹 캐시

블로킹 캐시:
  시간 1: load A -> 캐시 미스 발생
  시간 2~101: 프로세서 정지 (메모리 접근 대기)
  시간 102: 데이터 도착, 다음 명령어 실행

비블로킹 캐시 (hit-under-miss):
  시간 1: load A -> 캐시 미스 발생
  시간 2: load B -> 캐시 히트! (A의 미스 처리 중에도 서비스)
  시간 3: add C, D -> 실행 가능 (A와 무관)
  ...
  시간 101: A의 데이터 도착

비블로킹 캐시 (miss-under-miss):
  시간 1: load A -> 캐시 미스 발생
  시간 10: load B -> 캐시 미스 발생 (두 번째 미스 허용)
  # A와 B의 메모리 접근이 병렬로 진행됨
```

## 관련 개념

- [Three Cs Model](/knowledge/computer-architecture/three-cs-model/)
- [Write-Back](/knowledge/computer-architecture/write-back/)
- [Prefetching](/knowledge/computer-architecture/prefetching/)
- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
