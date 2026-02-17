---
title: "Hazard Detection Unit"
description: "해저드 검출 유닛(Hazard Detection Unit)은 파이프라인에서 데이터 해저드를 감지하고 필요 시 스톨을 삽입하는 하드웨어 유닛이다"
tags: ['Pipeline', 'Data Hazard', 'Stall', 'Load Use', 'Control']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/hazard-detection-unit
sidebar:
  order: 19
---

## 핵심 개념

해저드 검출 유닛은 ID 단계에서 동작하며, load-use 해저드를 감지하여 파이프라인을 스톨시킨다. 검출 조건은: ID/EX.MemRead가 활성화되고, ID/EX.RegisterRt가 IF/ID.RegisterRs 또는 IF/ID.RegisterRt와 같을 때이다. 해저드가 감지되면 PC와 IF/ID 레지스터의 쓰기를 방지하고, ID/EX 파이프라인 레지스터의 제어 필드를 0으로 설정하여 nop을 삽입한다. 1 사이클 스톨 후에는 포워딩 로직이 의존성을 처리할 수 있다. 해저드 검출 유닛과 포워딩 유닛은 함께 작동하여 파이프라인의 정확한 실행을 보장한다.

## 예시

```
해저드 검출 조건 (의사 코드):
if (ID/EX.MemRead and
    ((ID/EX.RegisterRt = IF/ID.RegisterRs) or
     (ID/EX.RegisterRt = IF/ID.RegisterRt)))
then
    stall the pipeline
    - PCWrite = 0          (PC 유지)
    - IF/IDWrite = 0       (IF/ID 레지스터 유지)
    - ID/EX 제어 = 0       (nop 삽입)
```

## 관련 개념

- [Load-Use Data Hazard](/knowledge/computer-architecture/load-use-data-hazard/)
- [Pipeline Stall](/knowledge/computer-architecture/pipeline-stall/)
- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [Data Hazard](/knowledge/computer-architecture/data-hazard/)
