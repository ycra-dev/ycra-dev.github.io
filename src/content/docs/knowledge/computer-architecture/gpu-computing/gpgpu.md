---
title: "GPGPU (범용 GPU 컴퓨팅)"
description: "GPGPU(General-Purpose computation on GPU)는 전통적인 그래픽 API와 그래픽 파이프라인을 사용하여 비그래픽 작업을 수행하기 위해 GPU를 활용하는 접근 방식이다"
tags: ['Gpgpu', 'GPU Computing', 'General Purpose', 'Graphics API']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/gpgpu
sidebar:
  order: 2
---

## 핵심 개념

GPGPU는 CUDA 이전에 GPU의 부동소수점 처리 능력을 범용 계산에 활용하려는 시도였다. 그래픽 API(OpenGL, Direct3D)를 통해 계산 문제를 그래픽 렌더링 알고리즘으로 변환하여 GPU에서 실행했다.

**GPGPU의 한계**:
- 계산 문제를 그래픽 렌더링으로 표현해야 하는 어색함
- 그래픽 API의 제약 (범용 메모리 접근, 포인터, 재귀 미지원)
- 프로그래밍 생산성이 낮음
- 그래픽 파이프라인의 제약에 갇힘

**GPU Computing으로의 전환**:
GPU computing은 GPGPU의 발전된 형태로, 전용 병렬 프로그래밍 언어와 API를 통해 그래픽 API를 거치지 않고 직접 GPU를 프로그래밍한다. CUDA가 이 전환을 이끌었으며, 프로그래머가 C/C++로 직접 GPU를 프로그래밍할 수 있게 했다.

이 전환은 GPU를 단순한 그래픽 가속기에서 범용 대규모 병렬 프로세서로 변모시켰다.

## 예시

```
GPGPU vs GPU Computing 비교:

GPGPU 방식 (텍스처를 통한 행렬 곱셈):
1. 행렬 A, B를 텍스처로 GPU에 업로드
2. 프래그먼트 셰이더에서 내적 계산
3. 결과를 프레임 버퍼에 렌더링
4. 프레임 버퍼에서 결과 읽기
→ 어색하고 제한적

GPU Computing 방식 (CUDA):
1. cudaMemcpy로 데이터 전송
2. C 커널로 행렬 곱셈 직접 구현
3. cudaMemcpy로 결과 반환
→ 직관적이고 유연

발전 과정:
초기 GPU → GPGPU (그래픽 API 활용) → GPU Computing (CUDA)
"비트를 텍셀로    "계산을 셰이더로     "C/C++로 직접
 위장"              표현"               프로그래밍"
```

## 관련 개념

- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [셰이더 (Shader)](/knowledge/computer-architecture/shader/)
- [텍스처 (Texture)](/knowledge/computer-architecture/texture/)
