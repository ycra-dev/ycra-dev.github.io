---
title: "상태 소자 (State Element)"
description: "상태 요소(State Element)는 내부 저장 공간을 가진 메모리 요소로, 레지스터나 메모리가 이에 해당한다"
tags: ['Digital Logic', 'Register', 'Memory', 'Flip Flop']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/state-element
sidebar:
  order: 6
---

## 핵심 개념

상태 요소는 최소 두 개의 입력(데이터 값, 클록)과 하나의 출력을 가진다. 출력은 이전 클록 사이클에서 기록된 값을 제공한다. 컴퓨터의 전원을 끄더라도 상태 요소의 값을 저장하고 복원하면 컴퓨터의 상태를 완전히 재현할 수 있다. D-type 플립플롭이 가장 단순한 상태 요소이며, MIPS 구현에서는 메모리와 레지스터도 상태 요소로 사용된다. 상태 요소는 순차 논리(sequential logic)라고도 하며, 출력이 입력과 내부 상태 모두에 의존한다.

## 예시

```
상태 요소의 예:
- 레지스터 파일 (Register File)
- 명령어 메모리 (Instruction Memory)
- 데이터 메모리 (Data Memory)
- 프로그램 카운터 (PC)
- 파이프라인 레지스터 (Pipeline Register)
```

## 관련 개념

- [조합 소자 (Combinational Element)](/knowledge/computer-architecture/combinational-element/)
- [에지 트리거 클로킹 (Edge-Triggered Clocking)](/knowledge/computer-architecture/edge-triggered-clocking/)
- [레지스터 파일 (Register File)](/knowledge/computer-architecture/register-file/)
- [파이프라인 레지스터 (Pipeline Register)](/knowledge/computer-architecture/pipeline-register/)
