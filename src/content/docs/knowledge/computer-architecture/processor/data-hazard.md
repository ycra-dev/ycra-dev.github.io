---
title: "Data Hazard"
description: "데이터 해저드(Data Hazard)는 파이프라인에서 명령어가 아직 사용 가능하지 않은 데이터를 필요로 하여 정상적인 클록 사이클에서 실행할 수 없는 상황이다"
tags: ['Pipeline Hazard', 'Dependence', 'Forwarding', 'Stall']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/data-hazard
sidebar:
  order: 15
---

## 핵심 개념

데이터 해저드는 하나의 명령어가 파이프라인에 아직 있는 이전 명령어의 결과에 의존할 때 발생한다. 예를 들어, add 명령어 직후에 그 결과를 사용하는 sub 명령어가 오면, add가 WB 단계에서 결과를 기록하기 전에 sub가 ID 단계에서 레지스터를 읽으려 한다. 주된 해결 방법은 포워딩(forwarding/bypassing)으로, ALU 결과를 내부 버퍼에서 직접 가져와 레지스터 파일에 기록되기를 기다리지 않는다. 그러나 load 직후 그 결과를 사용하는 경우(load-use data hazard)에는 포워딩으로도 해결할 수 없어 1 사이클 스톨이 필요하다.

## 예시

```
add $s0, $t0, $t1    # $s0에 결과 기록 (WB 단계)
sub $t2, $s0, $t3    # $s0 필요 (EX 단계) -> 데이터 해저드!

포워딩으로 해결:
add: IF  ID  EX  MEM  WB
sub:     IF  ID  EX   MEM  WB
              ^---| (EX 결과를 직접 전달)

load-use 해저드 (포워딩으로도 1 스톨 필요):
lw  $s0, 0($t0)     # MEM 단계에서 데이터 로드
sub $t2, $s0, $t3   # EX 단계에서 $s0 필요 -> 1 사이클 스톨
```

## 관련 개념

- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [Pipeline Stall](/knowledge/computer-architecture/pipeline-stall/)
- [Load-Use Data Hazard](/knowledge/computer-architecture/load-use-data-hazard/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
