---
title: "CPU (중앙처리장치)"
description: "산술·논리 연산, 데이터 이동, 프로그램 제어를 담당하는 컴퓨터의 핵심 처리 장치"
tags: ["Computer-Architecture", "CPU", "Hardware", "Processor"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/cpu-basics
sidebar:
  order: 26
---

## 핵심 개념

중앙처리장치(Central Processing Unit)는 산술·논리 연산, 데이터 이동, 프로그램 제어를 담당하는 컴퓨터의 핵심 처리 장치이다. GHz 단위의 클럭 속도로 동작하며, Intel Core나 Apple M 시리즈 등이 대표적이다.

## 동작 원리

CPU는 컴퓨터의 "두뇌"에 해당하며, 세 가지 핵심 기능을 수행한다:

1. **산술·논리 연산(ALU)**: 덧셈, 뺄셈 등의 산술 연산과 AND, OR 등의 논리 연산을 수행한다.
2. **데이터 이동**: 메모리와 레지스터 사이에서 데이터를 읽고 쓴다.
3. **제어(Control)**: 명령어를 해석하고 실행 순서를 관리한다. 분기 명령어에 따라 흐름을 변경하기도 한다.

CPU의 속도는 **클럭 속도**로 측정한다. 1GHz는 초당 10억 번의 클럭 틱을 의미한다. 현대 CPU는 보통 2~5GHz 범위에서 동작한다. 하지만 클럭 속도만으로 성능을 비교할 수는 없다. 한 클럭에 처리하는 명령어 수, 캐시 크기, 코어 수 등이 모두 성능에 영향을 미치기 때문이다.

CPU 내부에는 소량의 고속 저장소인 **레지스터(register)**가 있으며, 현재 처리 중인 데이터와 명령어 주소 등을 보관한다. 또한 **누산기(accumulator)**라는 특별한 레지스터에 연산 결과가 저장된다.

## 예시

현대 CPU 사양 예시:
- Intel Core i7: 4코어 8스레드, 3.6GHz 기본 클럭, 8MB L3 캐시
- Apple M2: 8코어 CPU + 10코어 GPU, 고효율/고성능 코어 혼합

CPU가 `3 + 5`를 계산하는 과정 (단순화):

```
1. LOAD  3    → 누산기에 3을 로드
2. ADD   5    → 누산기의 값에 5를 더함 (결과: 8)
3. STORE 결과  → 누산기의 값 8을 메모리에 저장
```

## 관련 개념

- [폰 노이만 구조 (Von Neumann Architecture)](/knowledge/computer-architecture/von-neumann-architecture-basics/) - CPU가 속한 전체 컴퓨터 구조
- [RAM (랜덤 액세스 메모리)](/knowledge/computer-architecture/ram/) - CPU가 명령어와 데이터를 읽어오는 주기억장치
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - CPU의 기본 동작 주기
- [캐시 (Cache)](/knowledge/computer-architecture/cache-basics/) - CPU와 RAM 사이의 고속 버퍼 메모리
- [GPU (그래픽 처리 장치)](/knowledge/computer-architecture/gpu-basics/) - CPU와 대비되는 병렬 처리 특화 프로세서
- [트랜지스터 (Transistor)](/knowledge/computer-architecture/transistor-basics/) - CPU를 구성하는 기본 소자

## 출처

- Understanding the Digital World, Chapter 1
