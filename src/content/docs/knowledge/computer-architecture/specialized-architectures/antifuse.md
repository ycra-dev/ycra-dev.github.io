---
title: "Antifuse"
description: "Antifuse는 집적 회로 내에서 프로그래밍 시 두 와이어 사이에 영구적인 연결을 만드는 구조이다"
tags: ['Antifuse', 'Fpd', 'Programmable Logic', 'Interconnect']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/antifuse
sidebar:
  order: 14
---

## 핵심 개념

Antifuse는 일반 퓨즈(fuse)와 반대 개념이다. 퓨즈는 초기에 연결되어 있다가 끊어지는 방식인 반면, antifuse는 초기에 끊어져 있다가 프로그래밍을 통해 영구적으로 연결되는 방식이다.

FPD(Field Programmable Device)에서 연결을 구성하는 두 가지 주요 방법 중 하나이다:
1. **Antifuse 방식**: 한 번 프로그래밍하면 영구적. 재구성 불가능하지만 안정적
2. **SRAM 기반 방식**: 전원 투입 시마다 구성을 다운로드. 재구성 가능하지만 휘발성

Antifuse 기술의 장점은 프로그래밍 후 연결이 영구적이어서 전원이 꺼져도 설정이 유지된다는 점이다. 단점은 한 번 프로그래밍하면 변경할 수 없다는 것이다. SRAM 기반 방식은 재구성이 가능하지만 활성 트랜지스터를 스위치로 사용하므로 연결 저항이 약간 증가한다.

## 예시

```
Antifuse 프로그래밍 과정:
1. 초기 상태: 두 금속 라인 사이에 절연체 존재 (연결 없음)
2. 프로그래밍: 높은 전압을 인가하여 절연체를 파괴
3. 최종 상태: 두 금속 라인이 영구적으로 연결됨

SRAM 기반 방식과의 비교:
- Antifuse: 비휘발성, 일회성 프로그래밍, 낮은 저항
- SRAM: 휘발성, 재프로그래밍 가능, 약간 높은 저항
```

## 관련 개념

- [Field Programmable Gate Array (FPGA)](/knowledge/computer-architecture/field-programmable-gate-array-fpga/)
- [Programmable Logic Device (PLD)](/knowledge/computer-architecture/programmable-logic-device-pld/)
- [Lookup Table (LUT)](/knowledge/computer-architecture/lookup-table-lut/)
