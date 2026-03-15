---
title: "사용 지연시간 (Use Latency)"
description: "사용 지연(Use Latency)은 load 명령어와 그 결과를 스톨 없이 사용할 수 있는 명령어 사이에 필요한 클록 사이클 수이다"
tags: ['Pipeline', 'Data Hazard', 'Stall', 'Load Use', 'Multiple Issue']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/use-latency
sidebar:
  order: 20
---

## 핵심 개념

단순 5단계 파이프라인에서 load의 사용 지연은 1 클록 사이클이다. 즉, load 바로 다음 명령어가 load 결과를 사용하면 1 사이클 스톨이 발생한다. 다중 발행 프로세서에서는 사용 지연의 영향이 더 커진다. 2-issue 5단계 파이프라인에서 load 결과는 다음 클록 사이클까지 사용할 수 없으므로, 다음 두 개의 명령어(같은 사이클에 발행되는 쌍)가 load 결과를 사용할 수 없다. 또한 단순 파이프라인에서 사용 지연이 없던 ALU 명령어도 2-issue에서는 1 명령어 사용 지연을 갖게 된다: 결과가 같은 사이클에 발행된 paired load/store 명령어에서 사용될 수 없기 때문이다. 이러한 추가 제약으로 인해 다중 발행 프로세서에서 효과적으로 병렬성을 활용하려면 더 공격적인 컴파일러 또는 하드웨어 스케줄링이 필요하다.

## 예시

```
사용 지연 비교:

단일 발행 5단계 파이프라인:
lw $t0, 0($s0)     # 사이클 1
nop                 # 사이클 2 (1 사이클 사용 지연)
add $t1, $t0, $t2  # 사이클 3 (사용 가능)

2-issue 파이프라인:
사이클 1: [lw $t0, 0($s0)] | [다른 명령어]
사이클 2: [???]            | [???]  ← 둘 다 $t0 사용 불가
사이클 3: [add $t1,$t0,$t2]| [...]  ← 사용 가능

→ 2-issue에서는 2개 명령어 슬롯이 $t0을 사용할 수 없음
```

## 관련 개념

- [로드-사용 데이터 해저드 (Load-Use Data Hazard)](/knowledge/computer-architecture/load-use-data-hazard/)
- [파이프라인 스톨 (Pipeline Stall)](/knowledge/computer-architecture/pipeline-stall/)
- [다중 발행 (Multiple Issue)](/knowledge/computer-architecture/multiple-issue/)
- [포워딩 (Forwarding)](/knowledge/computer-architecture/forwarding/)
- [데이터 해저드 (Data Hazard)](/knowledge/computer-architecture/data-hazard/)
