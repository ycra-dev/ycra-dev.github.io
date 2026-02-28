---
title: "비트 (Bit)"
description: "0 또는 1 두 가지 값만을 가지는 정보의 최소 단위로, N비트로는 2^N가지 값을 나타낼 수 있다"
tags: ["Computer-Architecture", "Bit", "Binary", "Digital"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/bit
sidebar:
  order: 33
---

## 핵심 개념

비트(bit)는 "binary digit"의 줄임말로, 0 또는 1 두 가지 값만을 가지는 **정보의 최소 단위**이다. 모든 디지털 정보는 비트의 조합으로 표현되며, N비트로는 2^N가지 서로 다른 값을 나타낼 수 있다.

## 동작 원리

비트는 디지털 세계의 **원자**에 해당한다. 컴퓨터 내부의 모든 것 — 숫자, 문자, 이미지, 소리, 영상, 프로그램 — 은 궁극적으로 0과 1의 비트 나열로 표현된다.

### 비트의 물리적 구현
비트 자체는 추상적 개념이지만, 실제 하드웨어에서는 다양한 방식으로 구현된다:
- **전압**: 높은 전압 = 1, 낮은 전압 = 0 (CPU, RAM)
- **자기 방향**: 한 방향 = 1, 반대 방향 = 0 (HDD)
- **전하 유무**: 전하 있음 = 1, 없음 = 0 (플래시 메모리, SSD)
- **빛**: 빛 있음 = 1, 없음 = 0 (광섬유 통신)

### 비트 수와 표현력
N비트로 표현 가능한 값의 수 = 2^N:
- 1비트: 2가지 (0, 1)
- 8비트: 256가지 (0~255)
- 16비트: 65,536가지
- 32비트: 약 43억 가지
- 64비트: 약 1.8 × 10^19 가지

비트 수를 하나 추가할 때마다 표현력이 **2배**가 된다.

## 예시

비트 수와 표현 가능한 값:

```
비트 수    표현 가능한 값 수    예시
1비트      2                  참/거짓, 켜짐/꺼짐
2비트      4                  동서남북 방향
3비트      8                  8가지 색상
8비트      256                ASCII 문자, 그레이스케일 픽셀 밝기
10비트     1,024              약 1K (킬로)
20비트     1,048,576          약 1M (메가)
```

비트를 전구에 비유:

```
전구 1개: ○ ●         → 2가지 상태
전구 2개: ○○ ○● ●○ ●● → 4가지 상태
전구 3개:               → 8가지 상태
...
전구 8개:               → 256가지 상태
```

## 관련 개념

- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - 8비트를 묶은 기본 데이터 단위
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - 비트로 수를 표현하는 방법
- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor-basics/) - 비트를 물리적으로 저장하는 기본 소자
- [아날로그-디지털 변환 (Analog to Digital Conversion)](/knowledge/computer-architecture/analog-to-digital-conversion/) - 아날로그 정보를 비트로 변환하는 과정
- [ASCII](/knowledge/computer-architecture/ascii/) - 비트로 문자를 인코딩하는 표준

## 출처

- Understanding the Digital World, Chapter 2
