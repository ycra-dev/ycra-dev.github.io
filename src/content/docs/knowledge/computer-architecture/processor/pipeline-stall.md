---
title: "파이프라인 스톨 (Pipeline Stall)"
description: "파이프라인 스톨(Pipeline Stall), 또는 버블(Bubble)은 해저드를 해결하기 위해 파이프라인에 삽입되는 지연으로, 해당 사이클에서 아무 유효한 작업도 수행하지 않는다"
tags: ['Pipeline', 'Bubble', 'Nop', 'Hazard', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pipeline-stall
sidebar:
  order: 13
---

## 핵심 개념

스톨은 해저드 검출 유닛에 의해 생성된다. load-use 해저드의 경우, PC 레지스터와 IF/ID 파이프라인 레지스터의 변경을 방지하여 현재 명령어를 유지하고, ID/EX 파이프라인 레지스터의 제어 신호를 모두 0으로 설정하여 nop(no operation)을 삽입한다. 이 nop은 물 파이프의 공기 방울처럼 파이프라인을 따라 진행하며, 뒤따르는 모든 명령어를 지연시킨다. 제어 해저드의 경우에는 잘못 인출된 명령어를 플러시(flush)하여 제거한다.

## 예시

```
스톨 삽입 과정:
CC1  CC2  CC3  CC4  CC5  CC6  CC7  CC8
lw:   IF   ID   EX   MEM  WB
and:       IF   ID   stall EX   MEM  WB
or:             IF   stall ID   EX   MEM  WB

스톨 시 제어:
- PC 레지스터 쓰기 방지 (같은 명령어 유지)
- IF/ID 레지스터 쓰기 방지
- ID/EX 제어 필드를 0으로 설정 (nop 생성)
```

## 관련 개념

- [로드-사용 데이터 해저드 (Load-Use Data Hazard)](/knowledge/computer-architecture/load-use-data-hazard/)
- [해저드 검출 유닛 (Hazard Detection Unit)](/knowledge/computer-architecture/hazard-detection-unit/)
- [포워딩 (Forwarding)](/knowledge/computer-architecture/forwarding/)
- [제어 해저드 (Control Hazard)](/knowledge/computer-architecture/control-hazard/)
