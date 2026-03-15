---
title: "트랜지스터 (Transistor)"
description: "작은 전압으로 더 큰 전류의 흐름을 제어하는 전자 스위치로, 집적회로와 현대 전자기기의 기본 구성요소"
tags: ["Computer-Architecture", "Transistor", "Semiconductor", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/transistor-basics
sidebar:
  order: 31
---

## 핵심 개념

트랜지스터는 1947년 벨 연구소에서 발명된 반도체 소자로, 작은 전압(신호)으로 더 큰 전류의 흐름을 제어하는 **전자 스위치**이다. 진공관을 대체하였으며, 집적회로(IC)와 모든 현대 전자기기의 기본 구성요소이다.

## 동작 원리

트랜지스터는 세 개의 단자(게이트, 소스, 드레인)를 가지며, **게이트에 가해지는 전압에 따라 소스-드레인 사이의 전류를 켜거나 끄는 스위치** 역할을 한다.

### 역사적 배경
- **이전 기술(진공관)**: 크고, 뜨겁고, 전력 소비가 많고, 자주 고장났다.
- **1947년**: 벨 연구소의 존 바딘, 월터 브래튼, 윌리엄 쇼클리가 최초의 트랜지스터를 발명하여 1956년 노벨 물리학상을 수상하였다.
- **이점**: 진공관보다 작고, 빠르고, 전력 소비가 적고, 신뢰성이 높다.

### 디지털 논리에서의 역할
컴퓨터에서 트랜지스터는 주로 **ON/OFF 스위치**로 사용된다:
- **ON (전류 흐름)** = 논리값 1
- **OFF (전류 차단)** = 논리값 0

이 단순한 스위칭을 조합하여 AND, OR, NOT 등의 **논리 게이트**를 만들고, 이를 더 조합하여 덧셈기, 레지스터, 궁극적으로 CPU 전체를 구성한다.

## 예시

트랜지스터를 수도꼭지에 비유할 수 있다:

```
게이트(손잡이)  →  작은 힘으로 회전
                    ↓
소스(수원) ───► [밸브] ───► 드레인(출수구)
                    ↑
              손잡이 돌리면 물(전류)이 흐른다
              잠그면 물(전류)이 멈춘다
```

NOT 게이트를 트랜지스터 하나로 구현:

```
입력 = 1 (전압 높음) → 트랜지스터 ON → 출력이 접지에 연결 → 출력 = 0
입력 = 0 (전압 낮음) → 트랜지스터 OFF → 출력이 전원에 연결 → 출력 = 1
```

## 관련 개념

- [집적회로 (Integrated Circuit)](/knowledge/computer-architecture/integrated-circuit-basics/) - 트랜지스터를 집적하여 만든 칩
- [무어의 법칙 (Moore's Law)](/knowledge/computer-architecture/moores-law/) - 칩당 트랜지스터 수의 증가 법칙
- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - 수십억 개의 트랜지스터로 구성된 프로세서
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 트랜지스터의 ON/OFF가 표현하는 정보 단위

## 출처

- Understanding the Digital World, Chapter 1
