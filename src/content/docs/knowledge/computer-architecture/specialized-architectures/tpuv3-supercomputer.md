---
title: "TPUv3 Supercomputer"
description: "TPUv3 슈퍼컴퓨터는 Google이 DNN 훈련을 위해 설계한 도메인 특화 슈퍼컴퓨터로, 32x32 2D 토러스 토폴로지로 1024개 칩을 연결하며 각 칩에 두 개의 TensorCore를 탑재한다"
tags: ['Domain Specific Architecture', 'Deep Learning', 'Google', 'Tensor Processing Unit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/tpuv3-supercomputer
sidebar:
  order: 17
---

## 핵심 개념

TPUv3는 TPUv1의 추론 전용 설계에서 발전하여 훨씬 어려운 훈련 문제를 해결한다. 주요 아키텍처적 특징으로는: (1) ICI(Inter-Core Interconnect) 링크로 칩 간 직접 연결하여 42.3 Tbps의 이등분 대역폭을 제공하며, 이는 InfiniBand 클러스터 대비 6.6배. (2) 각 칩에 두 개의 TensorCore가 있으며, MXU(Matrix Multiply Unit), VPU(Vector Processing Unit), HBM(High Bandwidth Memory) 등으로 구성. (3) bf16 부동소수점을 사용하여 fp16 대비 하드웨어 크기와 에너지를 절반으로 줄이면서 소프트웨어 복잡성도 감소. (4) 소프트웨어 제어 32MiB 스크래치패드 메모리 사용. Volta GPU 대비 조정 다이 크기가 약 절반이고 전력은 1.3배 낮으며 클라우드 가격은 1.6배 저렴하다.

## 예시

```
TPUv3 TensorCore 구성:
1. ICI (Inter-Core Interconnect) - 칩 간 656 Gbps 링크 x 4
2. HBM - 25배 높은 대역폭 (64개 64비트 버스)
3. Core Sequencer - 322비트 VLIW 명령어 (8개 연산 동시 발행)
4. VPU - 128x8 32비트 벡터 레지스터, 16MiB 벡터 메모리
5. MXU - 16비트 입력 → 32비트 축적 행렬 곱셈 유닛 x 2
6. Transpose/Reduction/Permute Unit

성능: 프로덕션 애플리케이션에서 피크 성능의 70% 달성
      (범용 슈퍼컴퓨터의 Linpack보다 높은 효율)
```

## 관련 개념

- [Brain Floating Point](/knowledge/computer-architecture/brain-floating-point/)
- [DNN Training](/knowledge/computer-architecture/dnn-training/)
- [Domain-Specific Architecture](/knowledge/computer-architecture/domain-specific-architecture/)
- [2D Torus Topology](/knowledge/computer-architecture/2d-torus-topology/)
- [High Bandwidth Memory](/knowledge/computer-architecture/high-bandwidth-memory/)
