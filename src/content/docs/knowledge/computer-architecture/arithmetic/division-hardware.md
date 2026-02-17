---
title: "Division Hardware"
description: "나눗셈 하드웨어는 피제수(dividend)를 제수(divisor)로 나누어 몫(quotient)과 나머지(remainder)를 생성하는 하드웨어로, 기본적으로 반복적 뺄셈과 시프트를 통해 동작한다"
tags: ['Divider', 'Alu', 'Restoring Division', 'Srt Division', 'Quotient', 'Remainder']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/division-hardware
sidebar:
  order: 6
---

## 핵심 개념

나눗셈의 기본 관계: Dividend = Quotient x Divisor + Remainder. 기본 알고리즘(restoring division)은 제수를 나머지에서 빼고, 결과가 양수면 몫에 1을 기록, 음수면 원래 값을 복원하고 몫에 0을 기록한다. n+1 단계가 필요하다. 곱셈과 동일한 하드웨어(64비트 레지스터, 32비트 ALU)를 공유할 수 있다. MIPS는 Hi 레지스터에 나머지를, Lo 레지스터에 몫을 저장한다. 곱셈과 달리 병렬화가 어려운데, 다음 단계 수행 전 현재 차이의 부호를 알아야 하기 때문이다. SRT 나눗셈은 상위 비트를 기반으로 테이블 룩업으로 여러 몫 비트를 예측하여 속도를 높인다(일반적으로 단계당 4비트).

## 예시

```
# 4비트 나눗셈 예시: 7 ÷ 2 (0111 ÷ 0010)
# 나머지 레지스터를 피제수(0111)로 초기화

# 반복 단계:
# 1. 나머지에서 제수를 빼기
# 2a. 결과 >= 0: 몫에 1 추가
# 2b. 결과 < 0: 나머지 복원, 몫에 0 추가
# 3. 제수 오른쪽 시프트

# 최종 결과: 몫 = 0011 (3), 나머지 = 0001 (1)
# 검증: 7 = 3 × 2 + 1 ✓
```

## 관련 개념

- [Multiplication Hardware](/knowledge/computer-architecture/multiplication-hardware/)
- [Arithmetic Logic Unit](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [Floating Point](/knowledge/computer-architecture/floating-point/)
