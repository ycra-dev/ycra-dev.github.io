---
title: "Hamming ECC"
description: "해밍 ECC(Hamming Error Correction Code)는 메모리에서 단일 비트 오류를 검출하고 교정할 수 있는 오류 정정 코드로, Richard Hamming이 발명했다"
tags: ['Error Correction', 'Memory', 'Reliability', 'Redundancy', 'Parity']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/hamming-ecc
sidebar:
  order: 25
---

## 핵심 개념

해밍 ECC는 해밍 거리(두 유효 코드 간 최소 비트 차이)를 활용한다. 최소 거리가 2이면 단일 비트 오류 검출(패리티), 3이면 단일 비트 오류 교정이 가능하다. 해밍 ECC 구성: (1) 2의 거듭제곱 위치(1,2,4,8,...)를 패리티 비트로 지정, (2) 나머지 위치에 데이터 비트 배치, (3) 각 패리티 비트는 특정 비트 그룹의 짝수 패리티를 보장. 읽기 시 패리티 그룹을 다시 계산하여 불일치 패턴으로 오류 위치를 식별한다. 예를 들어, p2와 p8이 불일치이면 비트 10(=2+8)에 오류가 있다. 패리티 비트 수 p는 2^p >= p+d+1 (d=데이터 비트)을 만족해야 한다. 추가로 전체 패리티 비트 1개를 더하면 SEC/DED(Single Error Correcting / Double Error Detecting)가 가능하다. 서버 메모리에서는 SEC/DED가 표준이며, 8바이트 데이터에 1바이트의 ECC만 추가하면 되어 DIMM이 72비트 폭인 이유이다.

## 예시

```
8비트 데이터의 해밍 ECC (12비트 코드):

위치: 1  2  3  4  5  6  7  8  9  10  11  12
종류: p1 p2 d1 p3 d2 d3 d4 p4 d5  d6  d7  d8

데이터 10011010:
코드:  0  1  1  1  0  0  1  0  1   0   1   0

오류 검출 (비트 10 반전 시):
- p1(1,3,5,7,9,11): 짝수 → OK
- p2(2,3,6,7,10,11): 홀수 → ERROR
- p4(4,5,6,7,12): 짝수 → OK
- p8(8,9,10,11,12): 홀수 → ERROR
→ 2 + 8 = 10 → 비트 10에 오류! → 반전하여 교정

SEC/DED: 추가 전체 패리티 비트로 2비트 오류 검출
```

## 관련 개념

- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [DRAM](/knowledge/computer-architecture/dram/)
- [Cache Memory](/knowledge/computer-architecture/cache-memory/)
