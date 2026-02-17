---
title: "Dynamic Pipeline Scheduling"
description: "동적 파이프라인 스케줄링(Dynamic Pipeline Scheduling)은 하드웨어가 명령어 실행 순서를 재배치하여 스톨을 회피하는 기법이다"
tags: ['Out Of Order', 'Superscalar', 'Hazard', 'Ilp', 'Hardware']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dynamic-pipeline-scheduling
sidebar:
  order: 33
---

## 핵심 개념

동적 파이프라인 스케줄링은 다음 실행할 명령어를 선택할 때 해저드를 회피하면서 가능하면 명령어 순서를 변경한다. 파이프라인은 세 주요 유닛으로 구성된다: 명령어 인출/발행 유닛, 다수의 기능 유닛(각각 예약 스테이션 보유), 커밋 유닛(리오더 버퍼 포함). 동적 스케줄링이 컴파일러 스케줄링보다 유리한 세 가지 이유가 있다: (1) 캐시 미스 등 예측 불가능한 스톨을 런타임에 숨길 수 있다, (2) 동적 분기 예측과 결합하면 컴파일 시점에 알 수 없는 명령어 순서를 처리할 수 있다, (3) 파이프라인 지연 시간과 발행 폭이 구현마다 달라도 같은 코드가 올바르게 그리고 효율적으로 실행된다. 이를 통해 사용자는 레거시 코드를 새로운 프로세서에서 재컴파일 없이 성능 향상을 얻을 수 있다.

## 예시

```
동적 스케줄링 예시:

원래 순서:
lw   $t0, 20($s2)    # 캐시 미스 가능
addu $t1, $t0, $t2   # $t0에 의존
sub  $s4, $s4, $t3   # 독립적
slti $t5, $s4, 20    # $s4에 의존

정적 파이프라인: lw 미스 시 모든 후속 명령어 스톨
동적 파이프라인:
  - lw 발행 후 캐시 미스 발생
  - addu는 $t0 대기 (예약 스테이션에 버퍼링)
  - sub는 독립적이므로 즉시 실행
  - slti는 sub 완료 후 실행
  → lw 대기 중에도 sub, slti 실행 가능
```

## 관련 개념

- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Reservation Station](/knowledge/computer-architecture/reservation-station/)
- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
- [Superscalar](/knowledge/computer-architecture/superscalar/)
- [Commit Unit](/knowledge/computer-architecture/commit-unit/)
