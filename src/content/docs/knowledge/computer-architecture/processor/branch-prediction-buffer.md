---
title: "분기 예측 버퍼 (Branch Prediction Buffer)"
description: "분기 예측 버퍼(Branch Prediction Buffer), 또는 분기 이력 테이블(Branch History Table)은 분기 명령어 주소의 하위 비트로 인덱싱되어 해당 분기의 최근 수행 여부를 저장하는 소형 메모리이다"
tags: ['Branch Prediction', 'Cache', 'Branch History Table']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/branch-prediction-buffer
sidebar:
  order: 24
---

## 핵심 개념

분기 예측 버퍼는 IF 파이프 단계에서 명령어 주소로 접근된다. 분기가 수행으로 예측되면 PC가 알려지는 즉시 대상 주소에서 명령어 인출을 시작한다. 예측이 맞으면 파이프라인은 패널티 없이 진행하고, 틀리면 예측 비트를 반전시키고 올바른 경로에서 다시 시작한다. 같은 하위 주소 비트를 공유하는 다른 분기의 예측이 저장될 수 있지만, 이는 정확성에 영향을 미치지 않는다(예측은 단지 힌트). 분기 대상 버퍼(Branch Target Buffer)는 분기 대상 PC나 명령어를 캐싱하여 분기 대상 주소 계산 비용도 줄인다.

## 예시

```
분기 예측 버퍼 구조:
Index (주소 하위 비트) | Prediction Bits | (Optional: Target Address)
     0000             |      10         |
     0001             |      01         |
     ...              |      ...        |
     1111             |      11         |

2-bit 인코딩:
00 = Strongly Not Taken
01 = Weakly Not Taken
10 = Weakly Taken
11 = Strongly Taken
```

## 관련 개념

- [동적 분기 예측 (Dynamic Branch Prediction)](/knowledge/computer-architecture/dynamic-branch-prediction/)
- [분기 목표 버퍼 (Branch Target Buffer)](/knowledge/computer-architecture/branch-target-buffer/)
- [제어 해저드 (Control Hazard)](/knowledge/computer-architecture/control-hazard/)
