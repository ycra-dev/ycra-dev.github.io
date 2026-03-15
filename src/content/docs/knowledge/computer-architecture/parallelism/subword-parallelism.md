---
title: "서브워드 병렬성 (Subword Parallelism)"
description: "서브워드 병렬성(Subword Parallelism)은 넓은 워드 내의 캐리 체인을 분할하여 여러 짧은 데이터 요소에 대해 동시에 동일한 연산을 수행하는 병렬 처리 방식이다"
tags: ['Simd', 'Data Level Parallelism', 'Multimedia', 'Vector', 'Neon', 'Avx']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/subword-parallelism
sidebar:
  order: 6
---

## 핵심 개념

데이터 수준 병렬성(data-level parallelism)의 일종으로, SIMD(Single Instruction, Multiple Data)로도 분류된다. 128비트 가산기의 캐리 체인을 분할하면 16개의 8비트, 8개의 16비트, 4개의 32비트, 또는 2개의 64비트 피연산자에 대해 동시 연산이 가능하다. 분할 가산기의 비용은 매우 낮다. 그래픽과 오디오 등 멀티미디어 응용 프로그램의 인기로 이 기능이 확산되었다. ARM의 NEON은 100개 이상의 멀티미디어 명령어를 추가하여 256바이트의 새 레지스터를 제공한다. NEON은 8/16/32/64비트 정수와 32비트 부동소수점을 지원하지만 64비트 부동소수점은 제외한다.

## 예시

```
# 128비트 레지스터에서의 서브워드 병렬 연산

# 16 × 8비트 덧셈 (한 명령어로):
# [a0|a1|a2|...|a15] + [b0|b1|b2|...|b15]
# = [a0+b0|a1+b1|...|a15+b15]

# 4 × 32비트 부동소수점 덧셈:
# [f0|f1|f2|f3] + [g0|g1|g2|g3]
# = [f0+g0|f1+g1|f2+g2|f3+g3]

# ARM NEON 예시:
# VADD.I16 Q0, Q1, Q2   # 8개의 16비트 정수 병렬 덧셈
```

## 관련 개념

- [SIMD (단일 명령어 다중 데이터)](/knowledge/computer-architecture/simd/)
- [AVX (Advanced Vector Extensions)](/knowledge/computer-architecture/advanced-vector-extensions/)
- [DGEMM (배정밀도 행렬 곱셈)](/knowledge/computer-architecture/dgemm/)
- [데이터 수준 병렬성 (Data-Level Parallelism)](/knowledge/computer-architecture/data-level-parallelism/)
