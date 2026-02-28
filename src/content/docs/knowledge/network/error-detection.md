---
title: "오류 검출과 정정 (Error Detection and Correction)"
description: "데이터의 전송이나 저장 과정에서 발생하는 오류를 감지하고 원래 데이터를 복원하는 기술로 패리티 비트, 체크섬, CRC가 대표적"
tags: ["Network", "Error-Detection", "Checksum", "CRC", "Reliability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/error-detection
sidebar:
  order: 13
---

## 핵심 개념

오류 검출과 정정은 데이터의 전송이나 저장 과정에서 발생하는 오류를 감지하고, 가능한 경우 원래 데이터를 복원하는 기술이다. 패리티 비트, 체크섬, 오류 정정 코드 등이 대표적이다.

## 동작 원리

디지털 통신에서 노이즈, 간섭, 하드웨어 결함 등으로 비트가 뒤집히는 오류가 불가피하게 발생한다.

### 오류 검출 (Error Detection)
오류 발생 여부만 알아낸다. 오류가 발견되면 재전송을 요청한다.

- **패리티 비트 (Parity Bit)**: 가장 단순한 방법. 데이터의 1의 개수가 짝수(짝수 패리티) 또는 홀수(홀수 패리티)가 되도록 1비트를 추가. 1비트 오류는 검출 가능.
- **체크섬 (Checksum)**: 데이터 블록의 바이트들을 수학적으로 결합하여 검증값을 생성.
- **CRC (Cyclic Redundancy Check)**: 다항식 나눗셈을 이용한 강력한 오류 검출 방식. 이더넷, USB, ZIP 파일 등에서 널리 사용.
- **Luhn 알고리즘**: 신용카드 번호의 유효성 검사에 사용.

### 오류 정정 (Error Correction)
오류를 검출할 뿐만 아니라 원래 데이터를 복원한다. 추가 비트(중복 정보)가 더 많이 필요하다.

- **해밍 코드 (Hamming Code)**: 여러 개의 패리티 비트를 전략적으로 배치하여 1비트 오류의 위치를 특정하고 정정.
- **리드-솔로몬 코드 (Reed-Solomon Code)**: CD, DVD, QR 코드, 위성 통신에 사용. 연속된 바이트 오류도 정정 가능.

## 예시

패리티 비트 예시 (짝수 패리티):

```
원본 데이터: 1010001
1의 개수: 3 (홀수)
패리티 비트: 1 (짝수로 만들기 위해)
전송: 1010001[1]

수신: 1010001[1] → 1이 4개 (짝수) → OK
수신: 1110001[1] → 1이 5개 (홀수) → 오류 검출!
```

QR 코드의 오류 정정:
- 리드-솔로몬 코드를 사용하여 코드의 일부가 손상되거나 가려져도 데이터를 복원
- 오류 정정 수준에 따라 7%(L)에서 30%(H)까지의 손상을 허용

## 관련 개념

- [이더넷 (Ethernet)](/knowledge/network/ethernet-basics/) - CRC를 통한 프레임 오류 검출
- [패킷 (Packet)](/knowledge/network/packet/) - 오류 검출 코드를 포함하는 전송 단위
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 오류 검출/정정의 기본 단위

## 출처

- Understanding the Digital World, Chapter 8
