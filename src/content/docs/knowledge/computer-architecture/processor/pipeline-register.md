---
title: "Pipeline Register"
description: "파이프라인 레지스터(Pipeline Register)는 파이프라인 단계 사이에 위치하여 각 단계의 데이터와 제어 정보를 다음 단계로 전달하기 위해 저장하는 레지스터이다"
tags: ['Pipelining', 'Datapath', 'State Element', 'Stage Separation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pipeline-register
sidebar:
  order: 12
---

## 핵심 개념

MIPS 5단계 파이프라인에는 4개의 파이프라인 레지스터가 있다: IF/ID(64비트), ID/EX(128비트), EX/MEM(97비트), MEM/WB(64비트). 이 레지스터들은 매 클록 사이클마다 기록되므로 별도의 쓰기 제어 신호가 필요하지 않다. 각 레지스터는 데이터와 함께 제어 신호도 전달한다. 예를 들어, load 명령어의 목적지 레지스터 번호는 ID/EX에서 EX/MEM을 거쳐 MEM/WB까지 전달되어야 WB 단계에서 올바른 레지스터에 결과를 기록할 수 있다. WB 단계 이후에는 별도의 파이프라인 레지스터가 불필요한데, 상태가 레지스터 파일이나 메모리에 직접 업데이트되기 때문이다.

## 예시

```
IF/ID 레지스터 내용:
- 인출된 명령어 (32 bits)
- 증가된 PC 값 (32 bits)

ID/EX 레지스터 내용:
- 증가된 PC 값
- 레지스터 읽기 데이터 1, 2
- 부호 확장된 즉시 값
- 명령어의 rt, rd 필드
- 제어 신호 (EX, MEM, WB용)
```

## 관련 개념

- [Pipelining](/knowledge/computer-architecture/pipelining/)
- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [State Element](/knowledge/computer-architecture/state-element/)
- [Datapath](/knowledge/computer-architecture/datapath/)
