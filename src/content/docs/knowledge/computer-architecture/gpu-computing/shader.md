---
title: "Shader"
description: "셰이더(Shader)는 정점(vertex)이나 픽셀 프래그먼트 등의 그래픽 데이터를 처리하는 프로그램이다"
tags: ['Shader', 'Graphics Pipeline', 'GPU', 'Rendering']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/shader
sidebar:
  order: 18
---

## 핵심 개념

셰이더는 GPU 그래픽 파이프라인의 프로그래밍 가능한 단계에서 실행되는 프로그램으로, 세 가지 주요 유형이 있다:

1. **정점 셰이더(Vertex Shader)**: 삼각형 정점의 화면 위치를 매핑하고, 위치/색상/방향을 변환. (x,y,z,w) 정점 위치를 입력받아 (x,y,z) 화면 위치를 출력
2. **기하 셰이더(Geometry Shader)**: 기하학적 프리미티브(선, 삼각형 등)를 조작하여 변경하거나 추가 프리미티브 생성
3. **픽셀(프래그먼트) 셰이더(Pixel Shader)**: 각 픽셀을 "셰이딩"하여 RGBA 색상 기여값을 계산. 텍스처 접근을 광범위하게 사용

모든 셰이더 유형에서 많은 프로그램 인스턴스가 독립적인 병렬 스레드로 실행될 수 있다. 각 스레드가 독립적인 데이터를 처리하고 독립적인 결과를 생성하며 부작용이 없기 때문이다. 이러한 독립성 덕분에 셰이더 프로그램은 다양한 수의 프로세서 코어를 가진 GPU로 투명하게 확장된다.

셰이딩 언어(HLSL, Cg 등)는 C와 유사한 구문과 풍부한 라이브러리 함수를 제공하지만, 범용 메모리 접근이나 포인터, 재귀 등은 지원하지 않는다.

## 예시

```c
// Cg 픽셀 셰이더 예시: 환경 매핑
void env_map_shader(
    float2 texCoord : TEXCOORD0,      // 2D 텍스처 좌표
    float3 reflectDir : TEXCOORD1,     // 반사 벡터
    uniform float reflectivity,         // 반사율
    uniform sampler2D colorMap,         // 표면 색상 텍스처
    uniform samplerCUBE envMap,         // 환경 큐브맵
    out float4 color : COLOR           // 출력 색상
) {
    float4 surfColor = tex2D(colorMap, texCoord);
    float4 envColor = texCUBE(envMap, reflectDir);
    color = lerp(surfColor, envColor, reflectivity);
}
// 이 3줄 셰이더가 많은 GPU 하드웨어를 활성화:
// 텍스처 페치, 보간, 부동소수점 필터링 등
```

## 관련 개념

- [Graphics Processing Unit (GPU)](/knowledge/computer-architecture/graphics-processing-unit-gpu/)
- [Texture](/knowledge/computer-architecture/texture/)
- [SPMD](/knowledge/computer-architecture/spmd/)
- [Streaming Multiprocessor](/knowledge/computer-architecture/streaming-multiprocessor/)
