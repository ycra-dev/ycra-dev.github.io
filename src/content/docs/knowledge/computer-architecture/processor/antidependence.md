---
title: "Antidependence"
description: "반이름 의존성(Antidependence)은 실제 데이터 값의 흐름이 아닌 이름(레지스터)의 재사용에 의해 강제되는 순서 제약으로, 이름 의존성(name dependence)이라고도 한다"
tags: ['Name Dependence', 'War Hazard', 'Register Renaming', 'Ilp', 'Pipeline']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/antidependence
sidebar:
  order: 21
---

## 핵심 개념

반이름 의존성은 명령어 j가 명령어 i가 읽는 레지스터나 메모리 위치에 쓸 때 발생한다. 원래 순서가 유지되어야 i가 올바른 값을 읽을 수 있다. 이는 진정한 데이터 의존성(true dependence, RAW)과 달리 실제 데이터 값이 흐르지 않으므로, 레지스터 리네이밍을 통해 제거할 수 있다. 비순차 실행에서는 세 가지 유형의 파이프라인 해저드가 발생한다: (1) 반이름 의존성은 WAR(Write-After-Read) 해저드를, (2) 출력 의존성(output dependence)은 WAW(Write-After-Write) 해저드를, (3) 진정한 데이터 의존성은 RAW(Read-After-Write) 해저드를 유발한다. 인오더 파이프라인에서는 WAR과 WAW 해저드가 발생하지 않지만, 비순차 실행 파이프라인에서는 이들을 처리해야 한다.

## 예시

```
반이름 의존성 예시:
Loop: lwc1  $f0, 0(x1)     # f0 읽기 (나중에 사용됨)
      add.s $f4, $f0, $f2  # f0 읽기
      swc1  $f4, 0(x1)     # f4 읽기
      addiu x1, x1, 4      # x1에 쓰기 ← swc1의 x1 읽기와 반이름 의존성
      bne   x1, x2, Loop

파이프라인 해저드 유형:
- WAR (Write After Read): 반이름 의존성에서 발생
- WAW (Write After Write): 출력 의존성에서 발생
- RAW (Read After Write): 진정한 데이터 의존성에서 발생
```

## 관련 개념

- [Register Renaming](/knowledge/computer-architecture/register-renaming/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Data Hazard](/knowledge/computer-architecture/data-hazard/)
- [Loop Unrolling](/knowledge/language/loop-unrolling/)
