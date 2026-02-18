---
title: "Texture"
description: "텍스처(Texture)는 보간된 좌표를 사용하여 샘플링 및 필터링된 조회를 지원하는 1D, 2D, 또는 3D 배열이다"
tags: ['Texture', 'Texture Mapping', 'GPU', 'Graphics']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/texture
sidebar:
  order: 19
---

## 핵심 개념

텍스처는 GPU 그래픽 파이프라인에서 핵심적인 역할을 하는 대규모 데이터 배열이다. 셰이더 프로그램은 텍스처 접근을 통해 맵, 함수, 데칼, 이미지, 데이터 등을 활용한다.

텍스처 매핑과 필터링 과정:
1. 현재 화면 픽셀 (x,y)에 대한 텍스처 주소 (s,t) 수신
2. MIP-map 레벨 결정을 위한 상세도(LOD) 계산
3. 삼선형 보간 분수 계산
4. 선택된 MIP-map 레벨에 맞게 텍스처 주소 스케일링
5. 메모리에서 텍셀(텍스처 요소) 가져오기
6. 텍셀에 대한 필터링 연산 수행

텍스처 접근에서 좌표는 보통 부동소수점이며, 정수가 아닌 좌표는 가장 가까운 텍셀 값들의 이중선형(bilinear) 가중 보간을 수행한다.

텍스처 메모리는 GPU의 스트리밍 캐시 계층에 캐싱되며, 일부 프로그램은 텍스처 페치를 전역 메모리의 캐싱 방법으로 사용하기도 한다.

## 예시

```
텍스처 페치의 대역폭 요구:
- 일반적인 텍스처 유닛: 클럭당 4 픽셀 × 2 이중선형 보간
- 각 이중선형 보간: 4개의 독립적 텍셀 필요
- 각 텍셀: 64비트 (예: 4개의 16비트 컴포넌트)
- 총 대역폭: 2 × 4 × 4 × 64 = 2048 bits/clock
- 32개의 고유 주소를 클럭당 처리 필요
→ 멀티뱅크/멀티포트 SRAM 배열 구조 필요

텍스처 좌표 예시:
tex2D(sampler, float2(0.5, 0.7))
→ 텍스처의 (50%, 70%) 위치에서 색상 값을 보간하여 반환
```

## 관련 개념

- [Shader](/knowledge/computer-architecture/shader/)
- [MIP-map](/knowledge/computer-architecture/mip-map/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
