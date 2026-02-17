---
title: "MLPerf Benchmark"
description: "MLPerf는 머신러닝 워크로드를 위한 벤치마크 스위트로, 프로그램, 데이터셋, 그리고 공정한 비교를 위한 규칙을 포함하며, 빠른 ML 발전 속도에 맞추어 약 3개월마다 새로운 버전이 출시된다"
tags: ['Benchmarking', 'Machine Learning', 'Deep Neural Network', 'Performance Evaluation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/mlperf-benchmark
sidebar:
  order: 20
---

## 핵심 개념

MLPerf는 주로 병렬 컴퓨터에서 실행되는 ML 벤치마크이다. 기존 병렬 벤치마크들과 차별화되는 새로운 특징으로 "폐쇄(closed)" 부문과 "개방(open)" 부문을 동시에 운영한다. 폐쇄 부문은 시스템 간 공정한 비교를 위해 엄격하게 통제된 규칙을 적용하고, 개방 부문은 더 나은 데이터 구조, 알고리즘, 프로그래밍 시스템 등의 혁신을 장려한다. 또한 서로 다른 크기의 컴퓨터를 정규화하기 위해 벤치마크 실행 시 전력 소비를 포함한다. MLPerf는 DSA(Domain-Specific Architecture)의 상대적 성공을 평가하는 데 활용되며, TPUv3와 Volta GPU의 비교에도 사용되었다.

## 예시

```
MLPerf 0.6 벤치마크 (TPUv3 vs Volta GPU):
- ResNet-50, Transformer 등 5개 프로그램
- 16-bit 산술 사용, NVIDIA는 loss scaling 적용
- TPUv3 기하평균 대 Volta: 0.95 (거의 동일한 성능)

스케일링 결과 (1024 칩):
- TPUv3 프로덕션 애플리케이션: 96~99% 선형 확장
- Volta 1536 칩 ResNet-50: 41% 선형 확장
```

## 관련 개념

- [Domain-Specific Architecture](/knowledge/computer-architecture/domain-specific-architecture/)
- [TPUv3](/knowledge/computer-architecture/tpuv3/)
- [Deep Neural Network Training](/knowledge/computer-architecture/deep-neural-network-training/)
- [Roofline Model](/knowledge/computer-architecture/roofline-model/)
