---
title: "Microarchitecture"
description: "마이크로아키텍처(Microarchitecture)는 프로세서의 상세한 내부 아키텍처로, 기능 유닛, 캐시, 레지스터 파일, 명령어 발행, 파이프라인 제어 등의 설계가 상호 연결된 구조를 의미한다"
tags: ['Processor', 'Implementation', 'Pipeline', 'Cache', 'Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/microarchitecture
sidebar:
  order: 2
---

## 핵심 개념

정교한 동적 스케줄링 프로세서에서는 데이터패스, 파이프라인, 캐시, 레지스터 파일, 명령어 발행, 전체 파이프라인 제어가 상호 의존적이어서 데이터패스와 파이프라인을 분리하기 어렵다. 이러한 이유로 엔지니어와 연구자들은 "마이크로아키텍처"라는 용어를 사용한다. 예를 들어, Intel Core i7 6700의 마이크로아키텍처는 14단계 파이프라인, x86 명령어를 마이크로 연산(micro-operation)으로 변환하는 디코더, 최대 6개 마이크로 연산을 동시 디스패치하는 예약 스테이션, 레지스터 리네이밍(16개 아키텍처 레지스터를 더 큰 물리 레지스터 집합에 매핑), 64개 항목의 마이크로 연산 버퍼(루프 스트림 감지 포함), 매크로/마이크로 퓨전 등을 포함한다. ARM Cortex-A53은 8단계 인오더 듀얼 이슈 파이프라인으로, 더 단순하지만 i7의 1/200 전력으로 동작한다.

## 예시

```
Intel Core i7 6700 마이크로아키텍처:

1. 명령어 인출 (16바이트)
2. 프리디코드 (x86 → 개별 명령어 분리)
3. 마이크로 연산 디코드 (3 simple + 1 complex decoder)
4. 마이크로 연산 버퍼 (64 entries, 루프 감지)
5. 레지스터 리네이밍 + 리오더 버퍼 할당 (최대 4/cycle)
6. 예약 스테이션 → 6개 기능 유닛 디스패치
7. 실행 + 결과 전달
8. 커밋 (인오더)

성능: 평균 CPI ≈ 0.71 (SPECint2006)
분기 오예측 패널티: ~17 사이클
```

## 관련 개념

- [Superscalar](/knowledge/computer-architecture/superscalar/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Reservation Station](/knowledge/computer-architecture/reservation-station/)
- [Register Renaming](/knowledge/computer-architecture/register-renaming/)
- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
