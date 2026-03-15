---
title: "폰 노이만 구조 (Von Neumann Architecture)"
description: "CPU, RAM, 저장장치, I/O 장치를 버스로 연결하고 명령어와 데이터를 같은 메모리에 저장하는 저장 프로그램 방식의 컴퓨터 아키텍처"
tags: ["Computer-Architecture", "Von-Neumann", "Stored-Program", "Hardware"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/von-neumann-architecture-basics
sidebar:
  order: 25
---

## 핵심 개념

폰 노이만 구조는 CPU, RAM, 저장장치, I/O 장치를 **버스(bus)**로 연결하고, 명령어와 데이터를 **같은 메모리에 저장**하는 저장 프로그램(stored-program) 방식의 컴퓨터 아키텍처이다. 1946년 존 폰 노이만이 기술한 논문에서 유래하였으며, 현대 범용 컴퓨터의 근간이 되는 설계 원리이다.

## 동작 원리

폰 노이만 구조의 핵심 구성 요소는 네 가지이다:

1. **프로세서(CPU)**: 산술·논리 연산을 수행하고 전체 동작을 제어한다.
2. **주기억장치(RAM)**: 현재 실행 중인 프로그램의 명령어와 데이터를 저장한다.
3. **보조기억장치(Secondary Storage)**: 전원이 꺼져도 데이터를 영구 보존한다.
4. **입출력(I/O)**: 키보드, 디스플레이, 네트워크 등 외부 세계와 소통한다.

가장 중요한 혁신은 **저장 프로그램 개념**이다. 이전 컴퓨터(ENIAC 등)는 배선을 물리적으로 변경해야 프로그램을 바꿀 수 있었지만, 폰 노이만 구조에서는 프로그램 자체가 데이터와 동일한 메모리에 저장되므로 소프트웨어만 교체하면 완전히 다른 작업을 수행할 수 있다.

## 예시

```
┌─────────┐    버스(Bus)    ┌─────────┐
│   CPU   │◄──────────────►│   RAM   │
└─────────┘                └─────────┘
     ▲                          ▲
     │          버스(Bus)        │
     ▼                          ▼
┌─────────┐                ┌─────────┐
│  저장장치 │                │   I/O   │
│ (SSD/HDD)│                │(키보드 등)│
└─────────┘                └─────────┘
```

워드프로세서를 실행하면:
1. SSD에 저장된 프로그램이 RAM으로 로드된다 (저장 프로그램 방식).
2. CPU가 RAM에서 명령어를 하나씩 가져와(fetch) 실행한다.
3. 키보드(I/O)로 입력한 텍스트가 RAM에 저장되고, 저장 버튼을 누르면 SSD에 기록된다.

## 관련 개념

- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - 폰 노이만 구조의 핵심 처리 장치
- [RAM (랜덤 액세스 메모리)](/knowledge/computer-architecture/ram/) - 프로그램과 데이터를 저장하는 주기억장치
- [보조기억장치 (Secondary Storage)](/knowledge/computer-architecture/secondary-storage/) - 비휘발성 보조기억장치
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - CPU가 명령어를 처리하는 기본 주기
- [튜링 머신 (Turing Machine)](/knowledge/computer-architecture/turing-machine/) - 폰 노이만 구조의 이론적 기반

## 출처

- Understanding the Digital World, Chapter 1
