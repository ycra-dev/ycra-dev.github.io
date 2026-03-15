---
title: "도메인 특화 아키텍처 (DSA)"
description: "도메인 특화 아키텍처(DSA)는 범용 컴퓨터와 대조적으로, 특정 응용 도메인에 최적화된 특수 목적 컴퓨터이다"
tags: ['Dsa', 'Tpu', 'Machine Learning', 'Accelerator', 'Energy Efficiency']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/domain-specific-architecture
sidebar:
  order: 15
---

## 핵심 개념

무어의 법칙 둔화, 데나드 스케일링 종료, 암달의 법칙에 의한 멀티코어 성능 한계가 결합되면서, DSA가 성능 및 에너지 효율 향상의 유일한 경로로 부상했다. DSA의 성공은 하드웨어뿐 아니라 소프트웨어 스택에도 크게 의존하며, TensorFlow, PyTorch 같은 도메인 특화 소프트웨어 플랫폼이 배열 연산을 통해 데이터 수준 병렬성을 쉽게 표현하고 활용할 수 있게 한다. MLPerf 벤치마크에서 100개 이상의 회사가 DNN용 DSA를 개발 중이며, 소프트웨어 없이 하드웨어만 만드는 것은 실패로 이어질 수 있다. FPGA도 DSA 구현 플랫폼이 될 수 있으나, Verilog 같은 저수준 언어로 프로그래밍해야 하는 단점이 있다.

DSA의 다섯 가지 설계 원칙:
1. **전용 메모리 사용:** 소프트웨어 제어 스크래치패드 메모리로 데이터 이동 최소화 (캐시 대비 2.5배 에너지 효율)
2. **더 많은 연산 유닛 투자:** OoO 실행, 투기, 멀티스레딩 등의 자원을 연산 유닛이나 메모리로 전환
3. **도메인에 맞는 가장 쉬운 병렬성 형태 사용:** SIMD가 통하면 MIMD보다 우선, VLIW가 통하면 OoO 대신
4. **데이터 크기와 타입 축소:** 좁은 데이터(8비트, 16비트)로 연산 유닛 밀도와 메모리 대역폭 향상
5. **도메인 특화 프로그래밍 언어 사용:** TensorFlow, Halide 등

대표 사례인 Google TPUv1:
- 256x256 ALU 배열 (65,536개 ALU)
- 8비트/16비트 정수 연산 (GPU의 32비트 FP 대비)
- 24 MiB 통합 버퍼 + 4 MiB 누적기
- 700 MHz에서 90 TOPS 성능
- CPU 대비 29.2배, GPU 대비 15.3배 빠름
- 와트당 성능: GPU 대비 29배, CPU 대비 83배

## 예시

```
# TPUv1 블록 다이어그램 주요 구성
+------------------+
| Host Interface   |
+------------------+
| Weight FIFO      | --> Matrix Multiply Unit (256x256)
+------------------+     |
| Unified Buffer   | <-- Accumulators (4 MiB)
| (24 MiB)         | --> Activation Pipeline
+------------------+

# DSA 원칙 적용 예시
범용 CPU:                    TPU (DSA):
- OoO 실행 하드웨어          - 65,536 ALU에 투자
- 다단계 캐시 (다이의 2/3)    - 전용 버퍼/FIFO (다이의 2/3)
- 32/64비트 FP              - 8/16비트 정수
- 범용 ISA                  - TensorFlow로 프로그래밍

# 성능 비교 (DNN 추론, 6개 응용 평균)
CPU: 1x (기준)
GPU: 1.9x
TPU: 29.2x
```

```
DSA vs 범용 프로세서 설계 철학:

범용 CPU:
  - 분기 예측기, 비순차 실행, 캐시 계층
  - 모든 종류의 프로그램을 실행 가능
  - 에너지 효율 낮음

DSA (TPU 예):
  - 대형 MXU (행렬 곱셈 유닛): 128x128 또는 256x256
  - 소프트웨어 제어 스크래치패드 메모리 (캐시 대신)
  - VLIW 명령어 (분기 예측기 불필요)
  - 특화 부동소수점 형식 (bf16)
  - DNN 연산에 최적화

결과: TPUv3는 Volta GPU 대비
  - 조정 다이 크기 ~50%
  - 전력 소비 ~77%
  - 클라우드 가격 ~63%
```

## 관련 개념

- [GPU (그래픽 처리 장치)](/knowledge/computer-architecture/gpu/)
- [SIMD (단일 명령어 다중 데이터)](/knowledge/computer-architecture/simd/)
- [멀티프로세서 (Multiprocessor)](/knowledge/computer-architecture/multiprocessor/)
- [창고 규모 컴퓨터 (WSC)](/knowledge/computer-architecture/warehouse-scale-computer/)
- [TPUv3 슈퍼컴퓨터 (TPUv3 Supercomputer)](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [DNN 학습 (DNN Training)](/knowledge/computer-architecture/dnn-training/)
- [MLPerf 벤치마크 (MLPerf Benchmark)](/knowledge/computer-architecture/mlperf-benchmark/)
- [FPGA (필드 프로그래머블 게이트 어레이)](/knowledge/computer-architecture/fpga/)
- [암달의 법칙 (Amdahl's Law)](/knowledge/computer-architecture/amdahls-law/)
