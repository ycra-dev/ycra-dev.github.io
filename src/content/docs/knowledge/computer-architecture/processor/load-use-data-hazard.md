---
title: "Load-Use Data Hazard"
description: "로드-사용 데이터 해저드(Load-Use Data Hazard)는 load 명령어에 의해 로드되는 데이터가 바로 다음 명령어에서 필요하지만, 아직 사용 가능하지 않은 특수한 형태의 데이터 해저드이다"
tags: ['Data Hazard', 'Pipeline Stall', 'Load Instruction', 'Forwarding']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/load-use-data-hazard
sidebar:
  order: 17
---

## 핵심 개념

load 명령어는 MEM 단계에서 데이터를 읽으므로, 그 결과는 EX 단계에서는 아직 사용 가능하지 않다. 포워딩을 사용해도 시간을 거슬러 올라갈 수 없으므로, 1 클록 사이클의 스톨(bubble)이 필수적이다. 해저드 검출 유닛이 ID 단계에서 이를 감지하여 파이프라인을 스톨시킨다. 검출 조건: ID/EX.MemRead가 활성화되고, ID/EX.RegisterRt가 IF/ID.RegisterRs 또는 IF/ID.RegisterRt와 같을 때. 컴파일러 최적화(코드 재배치)를 통해 load-use 해저드를 회피할 수 있다.

## 예시

```
lw  $t1, 0($t0)    # MEM 단계에서 데이터 로드
add $t3, $t1, $t2  # EX 단계에서 $t1 필요 -> 1 사이클 스톨!

해결: 코드 재배치
lw  $t1, 0($t0)
lw  $t4, 8($t0)    # 관련 없는 명령어를 사이에 배치
add $t3, $t1, $t2  # 이제 스톨 없음 (포워딩으로 해결 가능)
```

## 관련 개념

- [Data Hazard](/knowledge/computer-architecture/data-hazard/)
- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [Pipeline Stall](/knowledge/computer-architecture/pipeline-stall/)
- [Hazard Detection Unit](/knowledge/computer-architecture/hazard-detection-unit/)
