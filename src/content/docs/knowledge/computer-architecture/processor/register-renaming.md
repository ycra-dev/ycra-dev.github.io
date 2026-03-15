---
title: "레지스터 리네이밍 (Register Renaming)"
description: "레지스터 리네이밍(Register Renaming)은 컴파일러 또는 하드웨어가 레지스터를 재명명하여 반이름 의존성(antidependence)을 제거하는 기법이다"
tags: ['Antidependence', 'Name Dependence', 'Ilp', 'Out Of Order', 'Pipeline']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/register-renaming
sidebar:
  order: 37
---

## 핵심 개념

레지스터 리네이밍은 실제 데이터 흐름이 없는 이름 의존성(name dependence)을 제거하여 더 많은 ILP를 활용할 수 있게 한다. 컴파일러 기반 리네이밍에서는 루프 언롤링 시 추가 레지스터를 도입하여 서로 독립적인 명령어 시퀀스가 같은 레지스터를 재사용하지 않도록 한다. 하드웨어 기반 리네이밍에서는 프로세서가 아키텍처 레지스터(예: x86의 16개)를 더 큰 물리 레지스터 집합에 매핑한다. Intel Core i7은 리오더 버퍼와 결합된 레지스터 리네이밍을 사용하여 반이름 의존성과 잘못된 투기를 처리한다. 리네이밍 매핑을 추적하면 잘못된 투기 시 매핑을 되돌려 올바른 상태로 복구할 수 있다. 예약 스테이션과 리오더 버퍼의 조합도 하드웨어 레지스터 리네이밍의 한 형태를 구현한다.

## 예시

```
루프 언롤링에서의 레지스터 리네이밍:

# 리네이밍 전 (같은 $t0 재사용 → 반이름 의존성)
lw $t0, 0($s1)
addu $t0, $t0, $s2
sw $t0, 0($s1)
lw $t0, -4($s1)      # $t0 재사용 → WAR 해저드
addu $t0, $t0, $s2
sw $t0, -4($s1)

# 리네이밍 후 (독립적인 레지스터 → 유연한 스케줄링)
lw $t0, 0($s1)
addu $t0, $t0, $s2
sw $t0, 0($s1)
lw $t1, -4($s1)      # $t1 사용 → 의존성 제거
addu $t1, $t1, $s2
sw $t1, -4($s1)
```

## 관련 개념

- [역의존성 (Antidependence)](/knowledge/computer-architecture/antidependence/)
- [루프 풀기 (Loop Unrolling)](/knowledge/language/loop-unrolling/)
- [리오더 버퍼 (Reorder Buffer)](/knowledge/computer-architecture/reorder-buffer/)
- [예약 스테이션 (Reservation Station)](/knowledge/computer-architecture/reservation-station/)
- [비순차 실행 (Out-of-Order Execution)](/knowledge/computer-architecture/out-of-order-execution/)
