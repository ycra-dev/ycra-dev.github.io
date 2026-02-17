---
title: "Decoder"
description: "디코더(Decoder)는 n비트 입력을 받아 2^n개의 출력 중 입력의 이진 값에 해당하는 하나의 출력만 활성화하는 조합 논리 블록이다"
tags: ['Combinational Logic', 'Logic Design', 'Multiplexor', 'Address Decoding']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/decoder
sidebar:
  order: 7
---

## 핵심 개념

디코더는 이진 코드를 one-hot 인코딩으로 변환하는 장치이다. 예를 들어, 3-to-8 디코더는 3비트 입력으로 8개 출력 중 하나를 선택한다. 디코더는 메모리 시스템에서 주소를 디코딩하여 특정 메모리 셀을 선택하거나, 레지스터 파일에서 쓰기 대상 레지스터를 결정하거나, 명령어 디코딩에서 옵코드를 해석하는 데 사용된다. 인코더(encoder)는 디코더의 역함수로, 2^n개 입력을 n비트 출력으로 변환한다. 멀티플렉서 내부에서도 디코더가 사용되어 선택 신호를 디코딩한 후 AND 게이트로 입력을 선택한다. 대형 메모리(SRAM, DRAM)에서는 2단계 디코딩을 사용하여 거대한 단일 디코더의 비실용성을 해결한다.

## 예시

```
3-to-8 디코더:

입력 (I2, I1, I0)  →  출력 (Out0 ~ Out7)
    000            →  Out0 = 1 (나머지 0)
    001            →  Out1 = 1
    010            →  Out2 = 1
    011            →  Out3 = 1
    100            →  Out4 = 1
    101            →  Out5 = 1
    110            →  Out6 = 1
    111            →  Out7 = 1

논리 구현:
  Out0 = I2' · I1' · I0'
  Out1 = I2' · I1' · I0
  Out2 = I2' · I1  · I0'
  ...
  Out7 = I2  · I1  · I0
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Multiplexor](/knowledge/computer-architecture/multiplexor/)
- [Register File](/knowledge/computer-architecture/register-file/)
- [SRAM](/knowledge/computer-architecture/sram/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
