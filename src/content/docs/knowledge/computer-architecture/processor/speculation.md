---
title: "Speculation"
description: "투기(Speculation)는 컴파일러나 프로세서가 명령어의 결과를 추측하여, 의존 명령어들의 실행을 가능하게 하는 접근 방식이다"
tags: ['Prediction', 'Ilp', 'Branch Prediction', 'Out Of Order Execution']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/speculation
sidebar:
  order: 34
---

## 핵심 개념

투기는 분기 결과나 메모리 주소 등을 예측하여 더 많은 ILP를 활용할 수 있게 한다. 소프트웨어 투기에서는 컴파일러가 명령어를 재배치하고 추측 확인 코드를 삽입한다. 하드웨어 투기에서는 프로세서가 추측 결과를 버퍼에 저장하고, 추측이 맞으면 레지스터/메모리에 반영하고, 틀리면 버퍼를 폐기한다. 투기는 원래 발생하지 않았어야 할 예외를 유발할 수 있으므로, 명령어가 더 이상 추측이 아닐 때까지 예외를 버퍼링한다. 올바른 투기는 성능을 향상시키지만, 부주의한 투기는 성능을 저하시킬 수 있어 투기 여부 결정에 상당한 노력이 필요하다.

## 예시

```
분기 투기 예시:
beq $t0, $t1, target  # 분기 미수행으로 투기
add $s0, $s1, $s2     # 투기적 실행 (결과를 버퍼에 저장)
sub $s3, $s4, $s5     # 투기적 실행

투기 확인:
- 분기가 실제로 미수행이면: 버퍼 결과를 레지스터에 커밋
- 분기가 실제로 수행이면: 버퍼 폐기, target에서 다시 시작
```

## 관련 개념

- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
- [Branch Prediction](/knowledge/computer-architecture/branch-prediction/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
