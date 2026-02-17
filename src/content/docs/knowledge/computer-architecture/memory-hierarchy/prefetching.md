---
title: "Prefetching"
description: "프리페칭(prefetching)은 실제로 참조되기 전에 미래에 필요할 데이터 블록을 캐시로 미리 가져오는 기술이다"
tags: ['Cache', 'Memory Hierarchy', 'Spatial Locality', 'Performance Optimization', 'Memory Latency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/prefetching
sidebar:
  order: 23
---

## 핵심 개념

프리페칭은 메모리 지연 시간을 줄이기 위한 중요한 기법으로, 소프트웨어와 하드웨어 두 가지 방식이 있다.

**하드웨어 프리페칭:** Core i7과 같은 프로세서는 데이터 미스 패턴을 분석하여 다음 접근할 주소를 예측하고 데이터를 미리 가져온다. 루프에서 배열을 접근하는 경우에 가장 잘 동작하며, 대부분의 경우 프리페치되는 라인은 캐시의 다음 블록이다.

**소프트웨어 프리페칭:** 컴파일러가 프리페치 명령어를 삽입하여 데이터를 미리 가져온다. 프로그래머가 접근 패턴을 잘 알고 있는 경우에 효과적이다.

프리페칭은 강제 미스(compulsory miss)를 줄이는 데 특히 효과적이다. 스트림 버퍼(stream buffer)는 프리페칭의 한 형태로, 특정 캐시 블록에 접근할 때 순차적으로 인접한 블록을 별도의 버퍼에 미리 가져온다.

프리페칭의 핵심 과제는 불필요한 데이터를 가져와 캐시를 오염시키는 것(cache pollution)을 피하면서, 유용한 데이터를 시간에 맞게 가져오는 것이다.

## 예시

```
# 하드웨어 프리페칭 예시 (배열 순차 접근)
for (i = 0; i < N; i++)
    sum += A[i];

# 하드웨어가 A[0], A[1]... 접근 패턴 감지
# A[i]를 접근할 때 A[i+1] 블록을 자동으로 프리페치

# 소프트웨어 프리페칭 예시
for (i = 0; i < N; i++) {
    prefetch(&A[i + 8]);  // 8개 앞의 데이터를 미리 요청
    sum += A[i];
}
# 메모리 지연 시간을 루프 반복으로 숨김
```

## 관련 개념

- [Nonblocking Cache](/knowledge/computer-architecture/nonblocking-cache/)
- [Three Cs Model](/knowledge/computer-architecture/three-cs-model/)
- [Cache Blocking](/knowledge/computer-architecture/cache-blocking/)
- [Virtual Memory](/knowledge/computer-architecture/virtual-memory/)
