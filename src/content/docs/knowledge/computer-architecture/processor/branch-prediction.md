---
title: "Branch Prediction"
description: "분기 예측(Branch Prediction)은 분기의 결과를 가정하고 그 가정에 따라 실행을 진행하는 해저드 해결 기법이다"
tags: ['Control Hazard', 'Prediction', 'Performance', 'Pipeline']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/branch-prediction
sidebar:
  order: 22
---

## 핵심 개념

분기 예측은 분기 결정을 기다리는 동안 파이프라인 스톨을 줄이기 위해 사용된다. 정적 예측은 항상 분기 미수행(not taken)으로 예측하거나, 후방 분기(루프)를 항상 수행으로 예측하는 등 고정된 규칙을 사용한다. 동적 예측은 각 분기의 실행 이력을 기반으로 예측하여 90% 이상의 정확도를 달성할 수 있다. 예측이 맞으면 파이프라인이 전속력으로 진행하고, 틀리면 잘못된 명령어를 플러시하고 올바른 경로에서 다시 시작한다. 파이프라인이 길어질수록 오예측 비용이 증가하므로 더 정교한 예측이 필요하다.

## 예시

```
정적 예측: 항상 "분기 미수행"으로 예측
- 맞으면: 패널티 없음
- 틀리면: 1 사이클 패널티 (ID에서 분기 결정 시)

동적 예측: 분기 이력 기반
- 1-bit predictor: 마지막 분기 결과로 예측
- 2-bit predictor: 2번 연속 틀려야 예측 변경
  - 루프(9번 taken, 1번 not taken): 1-bit → 80%, 2-bit → 90% 정확도
```

## 관련 개념

- [Control Hazard](/knowledge/computer-architecture/control-hazard/)
- [Dynamic Branch Prediction](/knowledge/computer-architecture/dynamic-branch-prediction/)
- [Branch Prediction Buffer](/knowledge/computer-architecture/branch-prediction-buffer/)
- [Pipelining](/knowledge/computer-architecture/pipelining/)
