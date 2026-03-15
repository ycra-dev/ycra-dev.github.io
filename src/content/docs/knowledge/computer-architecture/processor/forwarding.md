---
title: "포워딩 (Forwarding)"
description: "포워딩(Forwarding), 또는 바이패싱(Bypassing)은 누락된 데이터를 레지스터 파일이 아닌 내부 파이프라인 레지스터에서 직접 가져와 데이터 해저드를 해결하는 기법이다"
tags: ['Data Hazard', 'Bypassing', 'Pipeline', 'Alu', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/forwarding
sidebar:
  order: 18
---

## 핵심 개념

포워딩은 ALU 결과가 EX/MEM 또는 MEM/WB 파이프라인 레지스터에 있을 때, 이를 다음 명령어의 ALU 입력으로 직접 전달하여 스톨 없이 파이프라인을 진행시킨다. 포워딩 유닛은 EX 단계에 위치하며, 해저드 조건을 검출한다: (1) EX 해저드 - 이전 명령어의 EX/MEM.RegisterRd가 현재 명령어의 소스 레지스터와 일치, (2) MEM 해저드 - 2단계 전 명령어의 MEM/WB.RegisterRd가 현재 소스와 일치. ALU 입력에 멀티플렉서를 추가하여 레지스터 파일 값, EX/MEM 값, MEM/WB 값 중 하나를 선택한다. $0 레지스터에 대한 포워딩은 방지해야 한다.

## 예시

```
해저드 검출 조건:
1a. EX/MEM.RegisterRd = ID/EX.RegisterRs (EX hazard, upper ALU input)
1b. EX/MEM.RegisterRd = ID/EX.RegisterRt (EX hazard, lower ALU input)
2a. MEM/WB.RegisterRd = ID/EX.RegisterRs (MEM hazard, upper ALU input)
2b. MEM/WB.RegisterRd = ID/EX.RegisterRt (MEM hazard, lower ALU input)

ForwardA/B 멀티플렉서 제어:
00 = ID/EX 레지스터 파일 값
10 = EX/MEM 파이프라인 레지스터 값 (포워딩)
01 = MEM/WB 파이프라인 레지스터 값 (포워딩)
```

## 관련 개념

- [데이터 해저드 (Data Hazard)](/knowledge/computer-architecture/data-hazard/)
- [파이프라인 레지스터 (Pipeline Register)](/knowledge/computer-architecture/pipeline-register/)
- [해저드 검출 유닛 (Hazard Detection Unit)](/knowledge/computer-architecture/hazard-detection-unit/)
- [파이프라이닝 (Pipelining)](/knowledge/computer-architecture/pipelining/)
