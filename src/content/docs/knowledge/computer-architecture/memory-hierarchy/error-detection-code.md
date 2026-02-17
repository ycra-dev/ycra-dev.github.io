---
title: "Error Detection Code"
description: "오류 검출 코드(Error Detection Code)는 데이터의 오류를 감지할 수 있지만 정확한 위치를 파악하여 수정할 수는 없는 코드로, 대표적으로 패리티(parity) 코드가 있다"
tags: ['Parity', 'Error Correction', 'Hamming Code', 'Memory Reliability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/error-detection-code
sidebar:
  order: 26
---

## 핵심 개념

대형 메모리에서 데이터 손상 가능성 때문에 대부분의 컴퓨터 시스템은 오류 검사 코드를 사용한다. 패리티 코드는 가장 간단한 형태로, 데이터 워드의 1 비트 수를 세어 홀수(odd) 또는 짝수(even) 패리티를 결정한다. 1비트 패리티는 최대 1비트(또는 홀수 비트) 오류를 감지할 수 있지만, 2비트 오류는 감지하지 못한다. 오류 수정 코드(ECC)는 오류를 감지하고 수정까지 가능하다. 거리-2 코드(패리티)는 1비트 변경으로 다른 합법적 조합이 생성되지 않고, 거리-3 코드는 1비트 오류 수정과 2비트 오류 검출이 가능하다. 해밍 코드(Hamming code)는 대표적인 오류 수정 코드로, 64비트 워드에 7비트, 128비트 워드에 8비트의 추가 비트가 필요하다. 대형 메인 메모리에서는 보통 2비트 오류 검출과 1비트 오류 수정이 가능한 코드를 사용한다.

## 예시

```
패리티 코드 예시:
  데이터: 1011001 (1이 4개 → 짝수 패리티)
  패리티 비트: 0 (짝수 유지)
  저장: 10110010

  읽기 시 1이 4개 → 짝수 → 패리티 비트 0과 일치 → 오류 없음
  1비트 오류: 10110110 → 1이 5개 → 홀수 → 패리티 불일치 → 오류 감지!
  2비트 오류: 10110111 → 1이 6개 → 짝수 → 패리티 일치 → 오류 미감지

해밍 코드 크기:
  64비트 데이터 → 7비트 ECC 추가 (총 71비트)
  128비트 데이터 → 8비트 ECC 추가 (총 136비트)
```

## 관련 개념

- [DRAM](/knowledge/computer-architecture/dram/)
- [SRAM](/knowledge/computer-architecture/sram/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Hamming Code](/knowledge/computer-architecture/hamming-code/)
