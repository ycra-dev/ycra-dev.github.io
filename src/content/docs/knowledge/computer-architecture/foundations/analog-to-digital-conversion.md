---
title: "아날로그-디지털 변환 (Analog to Digital Conversion)"
description: "연속적인 아날로그 신호를 이산적인 디지털 숫자로 변환하는 과정으로 샘플링과 양자화의 두 단계를 거친다"
tags: ["Computer-Architecture", "ADC", "Digital", "Analog", "Sampling"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/analog-to-digital-conversion
sidebar:
  order: 32
---

## 핵심 개념

아날로그-디지털 변환(A/D Conversion)은 연속적인 아날로그 신호를 이산적인 디지털 숫자로 변환하는 과정이다. **샘플링**(일정 간격으로 값을 추출)과 **양자화**(추출된 값을 가장 가까운 이산 값으로 반올림)의 두 단계를 거친다.

## 동작 원리

현실 세계의 소리, 빛, 온도 등은 모두 **아날로그(연속적)** 신호이다. 이를 컴퓨터가 처리하려면 **디지털(이산적)** 형태로 변환해야 한다.

### 변환의 두 단계

1. **샘플링(Sampling)**: 연속 신호를 일정한 시간 간격으로 측정하여 값을 추출한다.
   - **샘플링 레이트**: 초당 몇 번 측정하는가. 단위는 Hz(헤르츠).
   - **나이퀴스트 정리**: 원래 신호를 충실히 재현하려면 최대 주파수의 최소 2배로 샘플링해야 한다.

2. **양자화(Quantization)**: 측정된 연속 값을 유한한 이산 단계 중 가장 가까운 값으로 변환한다.
   - 비트 수가 많을수록 더 세밀하게 표현 가능 (8비트=256단계, 16비트=65,536단계).

### 반대 방향: D/A 변환
디지털 데이터를 다시 아날로그 신호로 복원하는 것이 D/A 변환이다. 스피커로 소리를 재생하거나 화면에 이미지를 표시할 때 사용된다.

핵심 트레이드오프: 샘플링 레이트와 비트 깊이를 높일수록 원본에 가까운 품질을 얻지만, 그만큼 더 많은 저장 공간과 처리 능력이 필요하다.

## 예시

CD 오디오의 A/D 변환 사양:

```
샘플링 레이트: 44,100 Hz (초당 44,100번 측정)
비트 깊이:     16비트 (65,536단계로 양자화)
채널:          2 (스테레오)

1초 분량 데이터 크기:
44,100 × 16 × 2 = 1,411,200 비트 ≈ 176 KB/초
```

일상 속 A/D 변환 장치:
- **마이크 → 사운드카드**: 음파(아날로그) → WAV 파일(디지털)
- **카메라 센서**: 빛(아날로그) → JPEG/RAW 이미지(디지털)
- **체온계(디지털)**: 체온(아날로그) → 숫자 표시(디지털)

## 관련 개념

- [비트 (Bit)](/knowledge/computer-architecture/bit/) - A/D 변환 결과를 구성하는 기본 단위
- [픽셀 (Pixel)](/knowledge/computer-architecture/pixel/) - 이미지의 A/D 변환 결과 단위
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - A/D 변환 결과가 저장되는 수 체계
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - 디지털 데이터 저장의 기본 단위

## 출처

- Understanding the Digital World, Chapter 2
