---
title: "GPU"
description: "GPU(Graphics Processing Unit)는 원래 그래픽 처리를 위해 설계된 대규모 병렬 프로세서로, 수백 개의 병렬 부동소수점 유닛을 통해 데이터 수준 병렬성이 높은 연산을 가속하는 가속기이다"
tags: ['Graphics Processing Unit', 'Cuda', 'Simd', 'Multithreading', 'Data Level Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/gpu
sidebar:
  order: 1
---

## 핵심 개념

GPU와 CPU의 핵심 차이점:
1. GPU는 메모리 지연을 숨기기 위해 다단계 캐시 대신 **하드웨어 멀티스레딩**에 의존한다. 메모리 요청과 데이터 도착 사이에 수백~수천 개의 독립 스레드를 실행한다.
2. GPU 메모리는 지연 시간이 아닌 **대역폭** 중심으로 설계되었다.
3. GPU는 더 많은 프로세서와 스레드를 수용한다.

GPU 내부 구조 (NVIDIA 기준):
- GPU = 여러 멀티스레드 SIMD 프로세서의 MIMD 구성
- 각 SIMD 프로세서 내에 16개의 SIMD 레인
- 32-wide SIMD 명령어가 2 클럭 사이클에 실행
- 32,768개의 32비트 레지스터 (프로세서당)
- 두 단계의 하드웨어 스케줄러: Thread Block Scheduler + SIMD Thread Scheduler

CUDA 스레드가 최하위 병렬성 프리미티브로, 컴파일러와 하드웨어가 수천 개의 CUDA 스레드를 묶어 멀티스레딩, MIMD, SIMD, ILP를 모두 활용한다.

### GPU의 역사적 발전 (Appendix C)

GPU는 1990년대 VGA 컨트롤러에서 발전했다. 2000년에 워크스테이션급 그래픽 파이프라인을 단일 칩에 통합하면서 "GPU"라는 용어가 탄생했다. 이후 고정 기능 로직이 프로그래밍 가능한 프로세서로 대체되었고, GeForce 8 시리즈에서 정점/기하/픽셀 처리가 통합 프로세서 배열(Streaming Multiprocessor)에서 실행되는 통합 아키텍처로 전환되었다. GPU는 CPU와 결합하여 이종(heterogeneous) 시스템을 구성하며, PCI-Express를 통해 연결된다. CUDA를 통해 C/C++로 직접 프로그래밍이 가능해져, 그래픽 처리와 범용 병렬 컴퓨팅을 동시에 수행할 수 있다.

## 예시

```
# GPU 메모리 구조
GPU Memory (DRAM): 모든 스레드 블록이 공유 (4~16 GiB)
Local Memory: SIMD 프로세서 내 스레드들이 공유
레지스터: SIMD 레인별 2048개

# GPU vs CPU 비교 (2020년 기준)
                    CPU (Core i7)    GPU (Volta V100)
SIMD 레인:          8 (AVX-512)      80 x 16 = 1280
스레드 수:          8 (4코어 x 2)    수십만
온칩 메모리:        L1+L2+L3 (~30MB) 레지스터+캐시 (~20MB)
메인 메모리:        64~512 GiB        4~16 GiB
메모리 대역폭:      ~50 GB/s          ~900 GB/s

# CUDA 프로그래밍 모델
__global__ void vector_add(float *A, float *B, float *C, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) C[i] = A[i] + B[i];
}
// 수천 개의 CUDA 스레드가 동시에 실행
```

## 관련 개념

- [SIMD](/knowledge/computer-architecture/simd/)
- [Hardware Multithreading](/knowledge/computer-architecture/hardware-multithreading/)
- [Data-Level Parallelism](/knowledge/computer-architecture/data-level-parallelism/)
- [Vector Lane](/knowledge/computer-architecture/vector-lane/)
- [Domain Specific Architecture](/knowledge/computer-architecture/domain-specific-architecture/)
- [CUDA](/knowledge/computer-architecture/cuda/)
- [SIMT](/knowledge/computer-architecture/simt/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
- [Warp](/knowledge/computer-architecture/warp/)
- [Heterogeneous System](/knowledge/computer-architecture/heterogeneous-system/)
