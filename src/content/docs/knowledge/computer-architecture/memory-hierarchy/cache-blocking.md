---
title: "캐시 블로킹 (Cache Blocking)"
description: "캐시 블로킹(cache blocking)은 데이터를 캐시에 적합한 크기의 부분 행렬(sub-matrix)로 분할하여 처리함으로써 캐시 히트율을 높이는 프로그램 변환 기법이다"
tags: ['Cache', 'Matrix Multiply', 'Performance Optimization', 'Spatial Locality', 'Temporal Locality']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/cache-blocking
sidebar:
  order: 22
---

## 핵심 개념

행렬 곱셈과 같은 대규모 데이터 연산에서, 데이터가 캐시 크기를 초과하면 캐시 미스가 빈번히 발생한다. 캐시 블로킹은 전체 행렬을 캐시에 맞는 작은 블록으로 나누어 처리함으로써 데이터 재사용을 극대화한다.

블로킹의 효과는 행렬 크기에 따라 달라진다. 작은 행렬은 이미 L1 캐시에 들어가므로 블로킹이 거의 영향을 미치지 않는다. 중간 크기 행렬에서는 1.5~1.7배, 가장 큰 행렬에서는 10배의 성능 향상을 보인다.

서브워드 병렬성(AVX), 명령어 수준 병렬성(루프 언롤링), 캐시 블로킹을 모두 적용하면 비최적화 코드 대비 14~41배의 성능 향상을 달성할 수 있다. Intel i7 하드웨어는 L3에서 L1/L2로의 프리페칭을 투기적으로 수행하므로, 블로킹의 이점이 일부 다른 프로세서보다 낮을 수 있다.

## 예시

```c
// 블로킹 없는 행렬 곱셈
for (i = 0; i < N; i++)
    for (j = 0; j < N; j++)
        for (k = 0; k < N; k++)
            C[i][j] += A[i][k] * B[k][j];

// 캐시 블로킹 적용 (BLOCKSIZE = 32)
#define BLOCKSIZE 32
for (si = 0; si < N; si += BLOCKSIZE)
    for (sj = 0; sj < N; sj += BLOCKSIZE)
        for (sk = 0; sk < N; sk += BLOCKSIZE)
            // BLOCKSIZE x BLOCKSIZE 부분 행렬 곱셈
            for (i = si; i < si+BLOCKSIZE; i++)
                for (j = sj; j < sj+BLOCKSIZE; j++)
                    for (k = sk; k < sk+BLOCKSIZE; k++)
                        C[i][j] += A[i][k] * B[k][j];
// 부분 행렬이 캐시에 들어가므로 재사용 극대화
```

## 관련 개념

- [프리페칭 (Prefetching)](/knowledge/computer-architecture/prefetching/)
- [3C 모델 (Three Cs Model)](/knowledge/computer-architecture/three-cs-model/)
- [비차단 캐시 (Nonblocking Cache)](/knowledge/computer-architecture/nonblocking-cache/)
