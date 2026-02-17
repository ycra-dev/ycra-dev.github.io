---
title: "Commit Unit"
description: "커밋 유닛(Commit Unit)은 동적 또는 비순차 실행 파이프라인에서 연산 결과를 프로그래머 가시 레지스터와 메모리에 반영하는 것이 안전한 시점을 결정하는 유닛이다"
tags: ['Out Of Order', 'Reorder Buffer', 'Pipeline', 'Register File', 'Dynamic Scheduling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/commit-unit
sidebar:
  order: 38
---

## 핵심 개념

커밋 유닛은 동적 스케줄링 파이프라인의 세 번째 주요 유닛으로, 명령어 인출/발행 유닛과 기능 유닛 다음에 위치한다. 리오더 버퍼를 포함하며, 기능 유닛에서 생산된 결과를 버퍼링하다가 해당 명령어가 더 이상 투기적이지 않고 프로그램 순서상 커밋 가능할 때 레지스터 파일이나 메모리에 기록한다. 커밋 유닛은 레지스터 파일과 메모리의 업데이트를 모두 제어한다. 스토어 명령어의 경우 커밋 시점까지 스토어 버퍼에 버퍼링되며, 유효한 주소와 데이터를 갖고 예측된 분기에 더 이상 의존하지 않을 때 메모리에 기록이 허용된다. 결과가 커밋되어 레지스터 파일에 기록되면 이후에는 정상적으로 레지스터에서 직접 가져올 수 있다. 이 과정을 은퇴(retirement) 또는 졸업(graduation)이라고도 부른다.

## 예시

```
커밋 유닛의 파이프라인 위치:

명령어 인출/발행 유닛
       ↓
 기능 유닛 (다수)
  ALU | FPU | Load/Store
       ↓
   커밋 유닛
  (리오더 버퍼)
       ↓
레지스터 파일 / 메모리 갱신

커밋 조건:
1. 명령어가 리오더 버퍼 헤드에 위치
2. 실행이 완료됨
3. 투기가 확인됨 (분기 결과 확정)
→ 결과를 레지스터/메모리에 기록 후 항목 제거
```

## 관련 개념

- [Reorder Buffer](/knowledge/computer-architecture/reorder-buffer/)
- [In-Order Commit](/knowledge/computer-architecture/in-order-commit/)
- [Out-of-Order Execution](/knowledge/computer-architecture/out-of-order-execution/)
- [Dynamic Pipeline Scheduling](/knowledge/computer-architecture/dynamic-pipeline-scheduling/)
- [Speculation](/knowledge/computer-architecture/speculation/)
