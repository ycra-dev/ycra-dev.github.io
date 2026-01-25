---
title: "인터럽트 벡터 (Interrupt Vector)"
description: "다양한 장치의 인터럽트 서비스 루틴 주소를 저장하는 주소 배열"
tags: ["OS", "Interrupt", "Hardware"]
created: 2026-01-25
updated: 2026-01-25
draft: false
slug: knowledge/os/interrupt-vector
sidebar:
  order: 4
---

## 핵심 개념

인터럽트 벡터는 다양한 장치의 인터럽트 서비스 루틴 주소를 저장하는 주소 배열로, 인터럽트 요청과 함께 제공되는 고유 번호로 인덱싱된다.

> 인터럽트는 매우 빈번하게 발생하므로 빠르게 처리되어야 한다.

## 동작 원리

1. CPU 하드웨어에 interrupt-request line이 있음
2. CPU는 매 명령어 실행 후 이 라인을 감지
3. 컨트롤러가 신호를 보낸 것을 감지하면:
   - CPU가 인터럽트 번호를 읽음
   - 그 번호를 인터럽트 벡터의 인덱스로 사용
   - 해당 인터럽트 핸들러 루틴으로 점프
4. 해당 주소에서 실행 시작

## 메모리 위치

일반적으로 포인터 테이블은 **낮은 메모리(low memory)** 에 저장된다 (첫 100개 정도 위치).

## Intel 프로세서 인터럽트 벡터

| 벡터 번호 | 유형 | 설명 |
|----------|------|------|
| 0 | nonmaskable | divide error |
| 1 | nonmaskable | debug exception |
| 2 | nonmaskable | null interrupt |
| 3 | nonmaskable | breakpoint |
| 0-31 | nonmaskable | 오류 조건 신호 |
| 32-255 | maskable | 장치 생성 인터럽트 등 |

## 인터럽트 체이닝

실제로 컴퓨터는 인터럽트 벡터의 주소 요소보다 더 많은 장치를 가진다.

**해결책**: 인터럽트 벡터의 각 요소가 인터럽트 핸들러 **리스트의 헤드**를 가리킴

인터럽트 발생 시, 해당 리스트의 핸들러들이 요청을 서비스할 수 있는 것이 발견될 때까지 하나씩 호출된다.

> 거대한 인터럽트 테이블의 오버헤드와 단일 핸들러 디스패치의 비효율성 사이의 절충안

## 출처

- Operating System Concepts, 10th Edition, Chapter 1, p.9-11
