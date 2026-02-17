---
title: "Dynamic Branch Prediction"
description: "동적 분기 예측(Dynamic Branch Prediction)은 프로그램 실행 중 런타임 정보를 활용하여 분기 결과를 예측하는 기법이다"
tags: ['Branch Prediction', 'Branch History Table', 'Control Hazard', 'Runtime']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dynamic-branch-prediction
sidebar:
  order: 23
---

## 핵심 개념

동적 분기 예측은 각 분기 명령어의 과거 행동을 기록하여 미래를 예측한다. 분기 예측 버퍼(Branch Prediction Buffer)는 분기 명령어 주소의 하위 비트로 인덱싱되는 소형 메모리로, 분기의 최근 수행/미수행 여부를 저장한다. 1-bit 예측기는 마지막 결과로 예측하지만, 루프에서 두 번의 오예측이 발생할 수 있다. 2-bit 예측기는 두 번 연속 틀려야 예측을 변경하여 이 문제를 해결한다. 더 발전된 형태로 상관 예측기(correlating predictor)는 지역적 분기 행동과 전역적 분기 행동을 결합하고, 토너먼트 예측기(tournament predictor)는 여러 예측기 중 가장 정확한 것을 선택한다.

## 예시

```
2-bit 예측기 상태 전이:
  Strongly Taken -> Weakly Taken -> Weakly Not Taken -> Strongly Not Taken
       (예측: Taken)     (예측: Taken)    (예측: Not Taken)    (예측: Not Taken)

  실제 Taken이면 왼쪽으로 이동, Not Taken이면 오른쪽으로 이동

루프 (9번 taken, 1번 not taken):
- 1-bit: 80% 정확도 (첫 반복과 마지막 반복에서 오예측)
- 2-bit: 90% 정확도 (마지막 반복에서만 오예측)
```

## 관련 개념

- [Branch Prediction](/knowledge/computer-architecture/branch-prediction/)
- [Branch Prediction Buffer](/knowledge/computer-architecture/branch-prediction-buffer/)
- [Control Hazard](/knowledge/computer-architecture/control-hazard/)
- [Tournament Branch Predictor](/knowledge/computer-architecture/tournament-branch-predictor/)
