---
title: "집적회로 (Integrated Circuit)"
description: "하나의 실리콘 웨이퍼 위에 모든 전자 회로를 사진 인쇄 방식으로 제조하는 기술"
tags: ["Computer-Architecture", "IC", "Semiconductor", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/integrated-circuit-basics
sidebar:
  order: 30
---

## 핵심 개념

집적회로(Integrated Circuit, IC)는 하나의 실리콘 웨이퍼 위에 트랜지스터, 저항, 커패시터 등 모든 전자 회로를 사진 인쇄 방식으로 한꺼번에 제조하는 기술이다. 1958년 잭 킬비(Jack Kilby)와 로버트 노이스(Robert Noyce)가 독립적으로 발명하였다.

## 동작 원리

집적회로 이전에는 개별 부품(트랜지스터, 저항 등)을 하나하나 납땜하여 회로를 만들었다. IC는 이 모든 것을 **하나의 작은 칩** 위에 동시에 만들어내는 혁신이었다.

### 제조 과정 (개략)
1. 순수 실리콘 웨이퍼를 준비한다.
2. 포토리소그래피(photolithography): 빛을 이용해 회로 패턴을 웨이퍼에 전사한다.
3. 에칭, 도핑 등의 공정을 반복하여 트랜지스터와 배선을 형성한다.
4. 하나의 웨이퍼에서 수백 개의 칩을 잘라내어 패키징한다.

### 핵심 개념
- **피처 사이즈(feature size)**: 회로에서 가장 작은 구조물의 크기. 나노미터(nm) 단위로 측정한다. 현재 최첨단 공정은 3~5nm 수준이다.
- **용어**: IC, 칩(chip), 마이크로칩(microchip)은 모두 같은 것을 가리킨다.
- **집적도에 따른 분류**: SSI(소규모) → MSI(중규모) → LSI(대규모) → VLSI(초대규모). 현대 CPU는 수십억 개의 트랜지스터를 포함하는 VLSI이다.

## 예시

집적도 변화의 실감나는 비교:

```
1958년  최초의 IC       : 트랜지스터 1개
1971년  Intel 4004 CPU  : 트랜지스터 2,300개 (10μm 공정)
2020년  Apple M1 CPU    : 트랜지스터 160억개 (5nm 공정)
```

IC가 사용되는 곳:
- **마이크로프로세서(CPU)**: 컴퓨터의 두뇌
- **메모리 칩(DRAM, Flash)**: 데이터 저장
- **센서 칩**: 스마트폰의 가속도계, 자이로스코프
- **통신 칩**: Wi-Fi, Bluetooth, 5G 모뎀

## 관련 개념

- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor-basics/) - IC를 구성하는 기본 소자
- [무어의 법칙 (Moore's Law)](/knowledge/computer-architecture/moores-law/) - IC의 집적도 증가 추세
- [CPU](/knowledge/computer-architecture/cpu-basics/) - IC 기술로 만들어지는 대표적 칩
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - 플래시 메모리도 IC 기술 기반

## 출처

- Understanding the Digital World, Chapter 1
