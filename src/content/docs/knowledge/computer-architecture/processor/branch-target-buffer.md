---
title: "분기 목표 버퍼 (Branch Target Buffer)"
description: "분기 타겟 버퍼(Branch Target Buffer)는 분기 명령어의 예측된 목표 주소를 캐싱하여, 분기 인출 시 즉시 다음 명령어 주소를 제공하는 구조이다"
tags: ['Branch Prediction', 'Pipeline', 'Control Hazard', 'Cache', 'Performance']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/branch-target-buffer
sidebar:
  order: 25
---

## 핵심 개념

분기 타겟 버퍼는 분기 예측과 결합하여 분기 명령어의 지연을 최소화한다. ARM Cortex-A53은 4가지 분기 예측기를 사용한다: (1) 단일 항목 분기 타겟 캐시로 두 명령어 분량을 캐싱하여 히트 시 지연 없이 다음 명령어를 공급, (2) 3072 항목 하이브리드 예측기(2 사이클 지연), (3) 256 항목 간접 분기 예측기(3 사이클 지연), (4) 8단 깊이의 리턴 스택(3 사이클 지연). Intel Core i7은 정교한 다단계 분기 예측기와 함수 리턴 주소 스택을 사용하며, 분기 오예측 패널티는 약 17 사이클이다. 분기 타겟 버퍼는 분기 결정이 완료되기 전에 다음 인출 주소를 예측적으로 제공하므로, 파이프라인이 깊을수록 그 중요성이 커진다.

## 예시

```
ARM Cortex-A53 분기 예측기 계층:

인출 사이클 F1:
  분기 타겟 캐시 조회 → 히트 시 0 사이클 지연

인출 사이클 F3:
  3072-entry 하이브리드 예측기 → 2 사이클 지연

인출 사이클 F4:
  256-entry 간접 분기 예측기 → 3 사이클 지연
  8-deep 리턴 스택 → 3 사이클 지연

분기 결정: ALU pipe 0 (EX1 단계)
  오예측 패널티: 8 사이클 (A53), 17 사이클 (i7)
```

## 관련 개념

- [분기 예측 (Branch Prediction)](/knowledge/computer-architecture/branch-prediction/)
- [동적 분기 예측 (Dynamic Branch Prediction)](/knowledge/computer-architecture/dynamic-branch-prediction/)
- [분기 예측 버퍼 (Branch Prediction Buffer)](/knowledge/computer-architecture/branch-prediction-buffer/)
- [제어 해저드 (Control Hazard)](/knowledge/computer-architecture/control-hazard/)
- [마이크로아키텍처 (Microarchitecture)](/knowledge/computer-architecture/microarchitecture/)
