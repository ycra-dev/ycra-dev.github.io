---
title: "Brain Floating Point"
description: "Brain Floating Point(bf16)는 Google이 DNN 훈련을 위해 설계한 16비트 부동소수점 형식으로, IEEE fp32와 동일한 8비트 지수부를 유지하면서 가수부를 7비트로 줄인 형식이다"
tags: ['Floating Point', 'Deep Learning', 'Tpuv3', 'Numerical Representation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/brain-floating-point
sidebar:
  order: 13
---

## 핵심 개념

Google은 DNN에서 16비트 부동소수점 연산의 정확도를 분석한 결과 세 가지 발견을 했다: (1) 행렬 곱셈 출력과 내부 합은 fp32를 유지해야 한다. (2) fp16의 5비트 지수부는 범위가 좁아 연산 실패를 유발하지만, fp32의 8비트 지수부는 이를 방지한다. (3) 가수부를 fp32의 23비트에서 7비트로 줄여도 정확도에 영향이 없다. bf16은 fp32와 같은 지수부 크기를 사용하므로 작은 갱신 값이 부동소수점 언더플로우로 손실될 위험이 없어, GPU에서 필요한 loss scaling이 불필요하다. 곱셈기 크기는 가수부 너비의 제곱에 비례하므로, bf16 곱셈기는 fp16 대비 면적과 에너지가 절반이다. 이는 하드웨어와 에너지를 줄이면서 소프트웨어를 단순화하는 드문 조합을 달성한다.

## 예시

```
부동소수점 형식 비교:
                  부호  지수부  가수부  총 비트
fp32 (single):    1     8       23      32
fp16 (half):      1     5       10      16
bf16 (brain):     1     8       7       16

bf16의 장점:
- fp32와 같은 표현 범위 (8비트 지수부)
- fp16보다 작은 곱셈기 (7비트 vs 10비트 가수부)
- loss scaling 불필요 → 소프트웨어 단순화
- 곱셈기 면적: bf16 ≈ fp16의 50% (가수부 제곱에 비례)
```

## 관련 개념

- [TPUv3 Supercomputer](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [DNN Training](/knowledge/computer-architecture/dnn-training/)
