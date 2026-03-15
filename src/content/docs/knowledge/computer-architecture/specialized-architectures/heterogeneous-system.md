---
title: "이기종 시스템 (Heterogeneous System)"
description: "이종 시스템(Heterogeneous System)은 서로 다른 프로세서 유형을 결합한 시스템이다"
tags: ['Heterogeneous System', 'CPU GPU', 'Parallel Computing', 'System Architecture']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/heterogeneous-system
sidebar:
  order: 16
---

## 핵심 개념

이종 시스템에서 CPU와 GPU는 상호 보완적인 역할을 한다:
- **CPU**: 직렬 처리 중심의 범용 프로세서. 복잡한 제어 흐름과 분기 예측에 최적화
- **GPU**: 대규모 병렬 처리 중심. 데이터 병렬 연산과 높은 처리량에 최적화

일반적인 이종 시스템 구성에서 GPU는 PCI-Express를 통해 CPU에 연결된다. Intel과 AMD 시스템 모두 16-lane PCIe 2.0 링크로 최대 16 GB/s의 전송률을 제공한다.

저비용 변형인 UMA(Unified Memory Architecture) 시스템은 GPU 전용 메모리를 생략하고 CPU 시스템 메모리만 사용한다. 이는 비용을 절감하지만 GPU의 메모리 대역폭이 제한되어 상대적으로 낮은 성능을 보인다.

많은 애플리케이션에서 최고의 성능은 CPU와 GPU 모두를 활용하여 작업을 적절히 분배할 때 달성된다.

## 예시

```
이종 시스템의 전형적인 작업 분배:
CPU 담당:                    GPU 담당:
- 운영체제 관리               - 그래픽 렌더링
- 직렬 알고리즘               - 대규모 행렬 연산
- 분기가 많은 코드            - 이미지/비디오 처리
- I/O 관리                   - 물리 시뮬레이션
- 복잡한 자료구조 관리         - 딥러닝 학습

데이터 흐름:
CPU --[PCIe]--> GPU 메모리 (cudaMemcpy)
GPU에서 병렬 처리 수행
GPU 메모리 --[PCIe]--> CPU (결과 반환)
```

## 관련 개념

- [CUDA (Compute Unified Device Architecture)](/knowledge/computer-architecture/cuda/)
- [PCI-Express (PCIe)](/knowledge/computer-architecture/pci-express/)
- [UMA (균일 메모리 접근 아키텍처)](/knowledge/computer-architecture/unified-memory-architecture/)
