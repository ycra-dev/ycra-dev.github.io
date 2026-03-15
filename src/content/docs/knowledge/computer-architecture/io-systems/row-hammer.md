---
title: "로우 해머 (Row Hammer)"
description: "로우 해머(Row Hammer)는 DDR3 DRAM 칩의 물리적 취약점을 악용하여 인접 행(row)의 비트를 변조시키는 하드웨어 기반 보안 공격이다"
tags: ['Dram', 'Security', 'Hardware Attack', 'Virtual Memory', 'Page Table']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/row-hammer
sidebar:
  order: 7
---

## 핵심 개념

2015년 구글이 시연한 이 공격은 DRAM의 2차원 내부 구조와 DDR3의 매우 작은 메모리 셀 크기에 기인한다. 사용자 프로그램이 DDR3 DRAM의 한 행을 반복적으로 쓰기 접근하면, 인접 행에 교란 오류(disturbance error)가 발생하여 비트가 뒤집힐 수 있다.

교활한 공격자는 이 기법을 사용하여 페이지 테이블 엔트리의 보호 비트를 변경할 수 있으며, 이를 통해 프로그램이 운영체제가 보호하려는 메모리 영역에 접근할 수 있게 된다.

이 공격은 보안 연구자들에게 큰 충격을 주었는데, 그때까지 하드웨어는 보안 문제에 면역이라고 생각했기 때문이다. 이후 프로세서와 DRAM에 로우 해머 공격을 감지하고 방어하는 메커니즘이 포함되었다. 특히 AWS와 같은 클라우드 환경에서는 여러 VM이 서버를 공유하므로, 하드웨어 공격이 경쟁사의 민감한 데이터를 노출시킬 수 있어 더욱 위험하다.

## 예시

```
# Row Hammer 공격 원리
DRAM 메모리 구조:
  Row N-1: [보호 비트를 포함한 페이지 테이블 엔트리]  <- 피해 행
  Row N:   [공격자의 데이터]                          <- 반복 접근
  Row N+1: [다른 데이터]

공격 과정:
  1. 공격자가 Row N을 수만 번 반복 접근 (hammering)
  2. 전기적 교란으로 Row N-1의 비트가 뒤집힘
  3. 페이지 테이블 엔트리의 보호 비트가 변경됨
  4. 공격자가 이전에 접근 불가능했던 메모리 영역에 접근 가능

# 클라우드 환경에서의 위험성
VM A (경쟁사) <-- 같은 물리 서버 --> VM B (공격자)
공격자가 Row Hammer로 VM A의 페이지 테이블 보호 비트 변조
-> VM A의 민감한 데이터에 접근 가능
```

## 관련 개념

- [가상 메모리 (Virtual Memory)](/knowledge/computer-architecture/virtual-memory/)
- [페이지 테이블 (Page Table)](/knowledge/computer-architecture/page-table/)
- [가상 머신 (Virtual Machine)](/knowledge/computer-architecture/virtual-machine/)
- [더티 비트 (Dirty Bit)](/knowledge/computer-architecture/dirty-bit/)
