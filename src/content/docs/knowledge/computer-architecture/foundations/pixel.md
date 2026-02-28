---
title: "픽셀 (Pixel)"
description: "디지털 이미지를 구성하는 최소 단위로, RGB 세 채널의 조합으로 색상을 표현한다"
tags: ["Computer-Architecture", "Pixel", "Image", "RGB", "Digital"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/pixel
sidebar:
  order: 38
---

## 핵심 개념

픽셀(pixel)은 "picture element"의 줄임말로, 디지털 이미지를 구성하는 **최소 단위**이다. 각 픽셀은 하나의 색상 값을 가지며, RGB(빨강·초록·파랑) 세 채널의 조합으로 색상을 표현한다. 이미지의 해상도는 메가픽셀(MP) 단위로 측정된다.

## 동작 원리

디지털 이미지는 격자(grid) 형태로 배열된 수많은 픽셀의 집합이다. 충분히 많은 픽셀이 모이면 사람의 눈에는 연속적인 그림으로 보인다.

### 색상 표현 (RGB)
각 픽셀의 색상은 세 가지 기본 색의 강도를 조합하여 결정된다:
- **R (Red)**: 빨강 채널, 0~255
- **G (Green)**: 초록 채널, 0~255
- **B (Blue)**: 파랑 채널, 0~255

각 채널이 8비트(1바이트)이므로 한 픽셀 = 3바이트 = 24비트, 총 약 1,670만(2^24) 가지 색상을 표현할 수 있다.

### 해상도와 이미지 크기
- **해상도**: 가로 × 세로 픽셀 수. 예: 1920×1080 = 약 207만 픽셀 ≈ 2MP
- **비압축 이미지 크기**: 픽셀 수 × 3바이트(RGB). 12MP 사진 ≈ 36MB (비압축)
- **압축**: JPEG는 손실 압축, PNG는 무손실 압축을 사용하여 파일 크기를 줄인다.

### 화면 해상도
- Full HD: 1920 × 1080 ≈ 2MP
- 4K UHD: 3840 × 2160 ≈ 8.3MP
- **PPI(Pixels Per Inch)**: 같은 해상도라도 화면이 작을수록 PPI가 높아져 더 선명하게 보인다.

## 예시

RGB 색상 값 예시:

```
색상         R     G     B     16진법
빨강       255     0     0    #FF0000
초록         0   255     0    #00FF00
파랑         0     0   255    #0000FF
흰색       255   255   255    #FFFFFF
검정         0     0     0    #000000
노랑       255   255     0    #FFFF00
```

이미지 크기 계산 예시:

```
스마트폰 카메라 12MP 사진:
- 해상도: 4000 × 3000 = 12,000,000 픽셀
- 비압축 크기: 12,000,000 × 3바이트 = 36,000,000바이트 ≈ 36MB
- JPEG 압축 후: 약 3~5MB (약 1/10로 축소)
```

## 관련 개념

- [아날로그-디지털 변환 (Analog to Digital Conversion)](/knowledge/computer-architecture/analog-to-digital-conversion/) - 빛(아날로그)을 픽셀(디지털)로 변환
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 픽셀의 색상 정보를 구성하는 기본 단위
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - 각 RGB 채널이 1바이트
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - 색상 값의 16진법 표현

## 출처

- Understanding the Digital World, Chapter 2
