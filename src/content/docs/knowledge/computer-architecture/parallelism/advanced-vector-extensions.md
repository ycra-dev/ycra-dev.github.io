---
title: "Advanced Vector Extensions"
description: "AVX(Advanced Vector Extensions)는 Intel이 2011년에 도입한 x86의 SIMD 확장으로, SSE2의 128비트 레지스터를 256비트(YMM)로 확장하고, 2015년에 AVX-512로 512비트(ZMM)까지 확장했다"
tags: ['Avx', 'Avx 512', 'Simd', 'X86', 'Ymm', 'Zmm', 'Intel']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/advanced-vector-extensions
sidebar:
  order: 5
---

## 핵심 개념

AVX 이전의 SSE/SSE2는 128비트 XMM 레지스터를 사용하여 4개의 단정밀도 또는 2개의 배정밀도 연산을 병렬 수행했다. AVX는 이를 256비트 YMM으로 확장하여 8개의 단정밀도 또는 4개의 배정밀도 연산을 가능하게 했다. AVX-512는 다시 512비트 ZMM으로 확장하여 16개 단정밀도 또는 8개 배정밀도 연산을 지원한다. 레거시 SSE/SSE2 명령어는 YMM/ZMM 레지스터의 하위 128비트에서 동작한다. AVX는 3-주소 명령어도 추가하여 연산에 필요한 레지스터와 명령어 수를 줄였다. DGEMM에 AVX-512를 적용하면 약 7.5배의 속도 향상을 달성할 수 있다(이론적 8배에 근접).

## 예시

```
# SSE2 → AVX → AVX-512 진화
# SSE2:    addpd   %xmm0, %xmm4        # 2 × 64비트 (128비트)
# AVX:     vaddpd  %ymm0, %ymm1, %ymm4 # 4 × 64비트 (256비트)
# AVX-512: vaddpd  %zmm0, %zmm1, %zmm4 # 8 × 64비트 (512비트)

# AVX-512 DGEMM 핵심 루프:
vmovapd   (%r9), %zmm0           # A 8개 요소 병렬 로드
vbroadcastsd (%rcx), %zmm1       # B 요소 8개 복제
vfmadd231pd %zmm1, %zmm0, %zmm2 # FMA: zmm2 += zmm0 * zmm1
```

## 관련 개념

- [SIMD](/knowledge/computer-architecture/simd/)
- [Subword Parallelism](/knowledge/computer-architecture/subword-parallelism/)
- [x86 Instruction Set](/knowledge/computer-architecture/x86-instruction-set/)
- [DGEMM](/knowledge/computer-architecture/dgemm/)
- [Fused Multiply Add](/knowledge/computer-architecture/fused-multiply-add/)
