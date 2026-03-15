---
title: "구조적 해저드 (Structural Hazard)"
description: "구조적 해저드(Structural Hazard)는 하드웨어가 동일한 클록 사이클에서 실행하려는 명령어 조합을 지원하지 못할 때 발생하는 파이프라인 해저드이다"
tags: ['Pipeline Hazard', 'Resource Conflict', 'Hardware']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/structural-hazard
sidebar:
  order: 14
---

## 핵심 개념

구조적 해저드는 두 명령어가 동시에 같은 하드웨어 리소스를 사용하려 할 때 발생한다. 예를 들어, 단일 메모리를 사용하는 경우 한 명령어가 데이터를 접근하면서 동시에 다른 명령어가 명령어를 인출하려 하면 충돌이 발생한다. MIPS는 파이프라인을 위해 설계되었으므로 별도의 명령어 메모리와 데이터 메모리를 사용하여 이 문제를 방지한다. 각 논리 구성 요소(명령어 메모리, 레지스터 읽기 포트, ALU, 데이터 메모리, 레지스터 쓰기 포트)는 단일 파이프라인 단계 내에서만 사용될 수 있다.

## 예시

```
구조적 해저드 예시 (단일 메모리 사용 시):
CC4에서 Inst 1이 데이터 메모리를 접근하는 동시에
Inst 4가 명령어를 인출하려고 함 -> 충돌!

해결: 별도의 Instruction Memory와 Data Memory 사용
```

## 관련 개념

- [파이프라이닝 (Pipelining)](/knowledge/computer-architecture/pipelining/)
- [데이터 해저드 (Data Hazard)](/knowledge/computer-architecture/data-hazard/)
- [제어 해저드 (Control Hazard)](/knowledge/computer-architecture/control-hazard/)
