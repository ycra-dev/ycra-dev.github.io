---
title: "GPU (Graphics Processing Unit)"
description: "대량의 단순한 연산을 동시에 처리하는 데 특화된 프로세서로 딥러닝과 과학 계산에 널리 활용"
tags: ["Computer-Architecture", "GPU", "Parallel-Processing", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/gpu-basics
sidebar:
  order: 25
---

## 핵심 개념

그래픽 처리 장치(Graphics Processing Unit, GPU)는 대량의 단순한 연산을 동시에(병렬로) 처리하는 데 특화된 프로세서이다. 원래 그래픽 렌더링을 위해 설계되었으나, 딥러닝, 과학 계산, 신호처리 등 대규모 병렬 연산이 필요한 분야에서 널리 활용되고 있다.

## 동작 원리

CPU가 **소수의 복잡한 작업을 빠르게** 처리하는 데 최적화되어 있다면, GPU는 **수천 개의 단순한 작업을 동시에** 처리하는 데 최적화되어 있다.

### CPU vs GPU 비교

| 특성 | CPU | GPU |
|------|-----|-----|
| 코어 수 | 4~16개 (고성능) | 수천~수만 개 (단순) |
| 코어당 성능 | 높음 | 낮음 |
| 적합한 작업 | 순차적, 복잡한 로직 | 대량 병렬, 단순 반복 |
| 비유 | 박사급 연구원 몇 명 | 단순 작업자 수천 명 |

### 그래픽에서의 역할
화면에 3D 장면을 그리려면 수백만 개의 픽셀 각각에 대해 색상을 계산해야 한다. 각 픽셀의 계산은 독립적이고 비교적 단순하므로, GPU의 수천 코어가 동시에 처리하면 매우 효율적이다.

### GPGPU (General-Purpose GPU)
GPU의 대규모 병렬 처리 능력을 그래픽이 아닌 범용 계산에 활용하는 것을 GPGPU라 한다:
- **딥러닝/AI**: 신경망의 행렬 곱셈은 대량 병렬 연산에 완벽히 부합한다.
- **과학 시뮬레이션**: 기상 예측, 분자 동역학, 유체 역학
- **암호화폐 채굴**: 해시 계산의 대량 병렬 처리

## 예시

CPU vs GPU의 작업 비유:

```
과제: 10,000장의 시험지 채점

CPU 방식 (직렬):
  교수 1명이 순서대로 채점 → 시험지당 1분 → 총 10,000분

GPU 방식 (병렬):
  조교 1,000명이 동시에 채점 → 총 10분 (1,000배 빠름)

단, 조교(GPU 코어)는 복잡한 논술은 못 채점한다 (단순 작업만 가능).
```

행렬 곱셈에서 GPU의 위력:

```
A (1000×1000) × B (1000×1000) = C (1000×1000)

결과 행렬 C의 각 원소 C[i][j]는 독립적으로 계산 가능:
  C[i][j] = Σ A[i][k] * B[k][j]  (k = 0..999)

CPU: 1,000,000개 원소를 순차적으로 계산
GPU: 1,000,000개 원소를 수천 개씩 동시에 계산 → 수십~수백 배 빠름
```

## 관련 개념

- [CPU](/knowledge/computer-architecture/cpu-basics/) - GPU와 대비되는 범용 순차 처리 프로세서
- [무어의 법칙 (Moore's Law)](/knowledge/computer-architecture/moores-law/) - GPU 성능 향상도 반도체 발전의 혜택
- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor-basics/) - GPU도 수십억 개의 트랜지스터로 구성
- [픽셀 (Pixel)](/knowledge/computer-architecture/pixel/) - GPU가 원래 처리하도록 설계된 대상

## 출처

- Understanding the Digital World, Chapter 3
