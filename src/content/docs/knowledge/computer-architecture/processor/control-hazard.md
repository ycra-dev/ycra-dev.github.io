---
title: "Control Hazard"
description: "제어 해저드(Control Hazard), 또는 분기 해저드(Branch Hazard)는 파이프라인에서 분기 결정 결과에 따라 어떤 명령어를 인출해야 할지 모를 때 발생하는 해저드이다"
tags: ['Pipeline Hazard', 'Branch', 'Prediction', 'Flush']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/control-hazard
sidebar:
  order: 16
---

## 핵심 개념

분기 명령어의 결과가 결정되기 전에 다음 명령어를 인출해야 하므로 제어 해저드가 발생한다. 기본 MIPS 파이프라인에서 분기 결정이 MEM 단계에서 이루어지면 3개의 명령어를 플러시해야 한다. 이를 개선하기 위해 분기 결정을 ID 단계로 이동시키면 패널티가 1 사이클로 줄어든다. 해결 방법으로는: (1) 스톨 - 분기 결정까지 대기, (2) 분기 미수행 예측 - 항상 분기가 일어나지 않을 것으로 예측하고, 틀리면 플러시, (3) 동적 분기 예측 - 런타임 정보를 기반으로 예측이 있다. 잘못된 명령어를 무효화하기 위해 IF.Flush 신호로 명령어를 nop으로 변환한다.

## 예시

```
분기 미수행 예측 (predict not taken):
beq $t1, $t2, target    # IF   ID   EX   MEM   WB
next_instruction:         #      IF   ID   EX    MEM  WB  (미수행 시 정상 진행)
                          #      IF   flush flush flush   (수행 시 플러시)

ID 단계에서 분기 결정 시:
beq $t1, $t2, target    # IF   ID   EX   MEM  WB
bubble (if taken):        #      IF->nop
target_instruction:       #           IF   ID   EX   MEM  WB
패널티: 1 사이클
```

## 관련 개념

- [Branch Prediction](/knowledge/computer-architecture/branch-prediction/)
- [Pipeline Stall](/knowledge/computer-architecture/pipeline-stall/)
- [Dynamic Branch Prediction](/knowledge/computer-architecture/dynamic-branch-prediction/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
