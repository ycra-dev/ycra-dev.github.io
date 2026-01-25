---
title: 이중 모드 연산 (Dual-Mode Operation)
description: 운영체제 코드와 사용자 코드 실행을 구분하기 위한 하드웨어 기반 실행 모드
tags: ["OS", "Protection", "Mode"]
created: 2026-01-22
updated: 2026-01-25
draft: false
slug: knowledge/os/dual-mode-operation
---

## 핵심 개념

운영체제 코드 실행과 사용자 정의 코드 실행을 구분하기 위해 하드웨어가 제공하는 최소 두 가지 실행 모드

- user mode
- kernel mode

잘못된(또는 악의적인) 프로그램이 다른 프로그램이나 운영체제 자체를 부정확하게 실행시킬 수 있는 문제를 방지하기 위해 필요하다.

## 동작 원리

컴퓨터 하드웨어에 현재 모드를 나타내는 **mode bit**이 존재한다:

| 모드 | mode bit | 별칭 |
|------|----------|------|
| kernel mode | 0 | supervisor mode, system mode, privileged mode |
| user mode | 1 | - |

### 모드 전환 흐름

```
사용자 프로세스 실행 (user mode, bit=1)
           ↓
    시스템 콜 호출
           ↓
      trap 발생 (bit→0)
           ↓
  커널에서 시스템 콜 실행
           ↓
    시스템 콜 반환 (bit→1)
           ↓
사용자 프로세스 실행 재개
```

### 부팅 시 동작

1. 시스템 부팅 시, 하드웨어는 kernel mode에서 시작
2. 운영체제가 로드된 후, user mode에서 사용자 응용 프로그램 시작
3. trap이나 interrupt 발생 시마다 하드웨어가 user mode에서 kernel mode로 전환

## 2개 이상의 모드

- **Intel 프로세서**: 4개의 protection ring (ring 0 = kernel, ring 3 = user)
- **ARMv8 시스템**: 7개의 모드
- **가상화 지원 CPU**: VMM(Virtual Machine Manager)용 별도 모드 존재

## 트레이드오프

- **장점**: OS를 오류 사용자로부터, 사용자들을 서로로부터 보호
- **단점**: 모드 전환 시 오버헤드 발생

## 출처

- Operating System Concepts, 10th Edition, Chapter 1, p.24-25
