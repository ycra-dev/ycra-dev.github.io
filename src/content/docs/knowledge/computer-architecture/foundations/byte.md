---
title: "바이트 (Byte)"
description: "8개의 비트로 구성된 데이터 단위로, 컴퓨터 메모리 주소 지정과 데이터 저장의 기본 단위"
tags: ["Computer-Architecture", "Byte", "Digital", "Memory"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/byte
sidebar:
  order: 34
---

## 핵심 개념

바이트(byte)는 8개의 비트로 구성된 데이터 단위로, 0부터 255까지의 정수 또는 하나의 ASCII 문자를 표현할 수 있다. 컴퓨터 메모리 주소 지정과 데이터 저장의 **기본 단위**이다.

## 동작 원리

바이트는 비트와 더 큰 데이터 단위 사이를 잇는 **실용적인 기본 단위**이다. 8비트를 하나의 바이트로 묶은 이유는 역사적·실용적 이유가 복합적이지만, 한 바이트(256가지 값)가 한 문자를 표현하기에 적당한 크기였기 때문이다.

### 바이트의 용도
- **문자 표현**: ASCII 코드에서 하나의 영문 문자 = 1바이트
- **메모리 주소 지정**: RAM의 각 바이트마다 고유한 주소가 부여된다
- **파일 크기 측정**: 모든 파일 크기는 바이트 단위로 표현된다

### 바이트 기반 단위 (10진 접두사 vs 2진 접두사)

| 10진(SI) | 값 | 2진(IEC) | 값 |
|----------|-----|----------|-----|
| 1 KB (킬로바이트) | 10^3 = 1,000 | 1 KiB | 2^10 = 1,024 |
| 1 MB (메가바이트) | 10^6 = 1,000,000 | 1 MiB | 2^20 = 1,048,576 |
| 1 GB (기가바이트) | 10^9 | 1 GiB | 2^30 |
| 1 TB (테라바이트) | 10^12 | 1 TiB | 2^40 |

저장장치 제조사는 10진 단위를, 운영체제는 2진 단위를 쓰는 경우가 많아 "1TB SSD가 실제로는 931GB로 표시되는" 혼란이 발생하기도 한다.

## 예시

다양한 데이터의 대략적 크기:

```
1 바이트    : 영문 한 글자 ('A')
10 바이트   : 짧은 영단어 ("Hello World" 정도)
1 KB       : 짧은 이메일 한 통
1 MB       : 디지털 사진 한 장 (압축)
1 GB       : 영화 한 편 (압축)
1 TB       : 영화 약 1,000편
```

1바이트의 이진 표현:

```
문자 'A' = ASCII 코드 65 = 이진수 01000001
  0  1  0  0  0  0  0  1
  ↑                    ↑
 MSB(최상위비트)    LSB(최하위비트)
```

## 관련 개념

- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 바이트를 구성하는 기본 단위 (1바이트 = 8비트)
- [RAM (랜덤 액세스 메모리)](/knowledge/computer-architecture/ram/) - 바이트 단위로 주소가 지정되는 주기억장치
- [ASCII (미국 표준 정보 교환 코드)](/knowledge/computer-architecture/ascii/) - 1바이트로 문자를 인코딩하는 표준
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - 바이트의 값을 이진수로 해석하는 방법

## 출처

- Understanding the Digital World, Chapter 2
