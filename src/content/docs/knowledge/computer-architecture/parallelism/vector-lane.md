---
title: "Vector Lane"
description: "벡터 레인(vector lane)은 하나 이상의 벡터 기능 유닛과 벡터 레지스터 파일의 일부로 구성된다"
tags: ['Vector Architecture', 'Simd', 'Parallel Pipeline', 'Throughput', 'Functional Unit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/vector-lane
sidebar:
  order: 8
---

## 핵심 개념

벡터 산술 명령어는 보통 한 벡터 레지스터의 요소 N이 다른 벡터 레지스터의 요소 N과만 연산에 참여하도록 한다. 이러한 특성은 여러 병렬 벡터 레인으로 구조화된 고도로 병렬적인 벡터 유닛의 구성을 크게 단순화한다.

4개의 레인을 가진 벡터 프로세서에서는 벡터 레지스터 저장소가 레인에 분산되어, 각 레인이 각 벡터 레지스터의 4번째 요소마다 보유한다. 각 벡터 산술 유닛에는 레인당 하나의 실행 파이프라인이 포함되며, 이들이 협력하여 단일 벡터 명령어를 완료한다.

레인을 추가하면 벡터 유닛의 최대 처리량이 증가하지만, 이를 효과적으로 활용하려면 애플리케이션과 아키텍처 모두 긴 벡터를 지원해야 한다.

## 예시

```
# 4-레인 벡터 프로세서에서의 벡터 덧셈 C = A + B
# 벡터 길이 = 16 요소

레인 0: A[0]+B[0], A[4]+B[4], A[8]+B[8],  A[12]+B[12]
레인 1: A[1]+B[1], A[5]+B[5], A[9]+B[9],  A[13]+B[13]
레인 2: A[2]+B[2], A[6]+B[6], A[10]+B[10], A[14]+B[14]
레인 3: A[3]+B[3], A[7]+B[7], A[11]+B[11], A[15]+B[15]

# 1-레인: 16 클럭 사이클
# 4-레인: ~4 클럭 사이클 (약 4배 빠름)

# GPU의 SIMD 레인
NVIDIA GPU: 16 SIMD 레인, SIMD 폭 32
-> 32-wide SIMD 명령어가 16 레인에서 2 클럭에 완료
```

## 관련 개념

- [Vector Architecture](/knowledge/computer-architecture/vector-architecture/)
- [SIMD](/knowledge/computer-architecture/simd/)
- [GPU](/knowledge/computer-architecture/gpu/)
- [Data-Level Parallelism](/knowledge/computer-architecture/data-level-parallelism/)
