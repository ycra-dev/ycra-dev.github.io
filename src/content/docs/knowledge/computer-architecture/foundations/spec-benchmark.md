---
title: "SPEC 벤치마크 (SPEC Benchmark)"
description: "SPEC(System Performance Evaluation Cooperative) 벤치마크는 여러 컴퓨터 벤더가 공동으로 만든 표준 벤치마크 세트로, 실제 프로그램을 사용하여 컴퓨터 시스템의 성능을 측정한다"
tags: ['Performance', 'Measurement', 'Benchmark', 'Workload', 'Evaluation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/spec-benchmark
sidebar:
  order: 20
---

## 핵심 개념

SPEC은 1988년에 처음 설립되었으며, 최신 버전인 SPEC CPU2017은 10개의 정수 벤치마크와 13개의 부동소수점 벤치마크로 구성된다. 정수 벤치마크에는 C 컴파일러, 체스 프로그램, 양자 컴퓨터 시뮬레이션 등이 포함된다. 각 벤치마크의 실행 시간을 참조 프로세서의 실행 시간으로 나누어 SPECratio를 구하며, 숫자가 클수록 성능이 좋다. 전체 요약 값은 SPECratio의 기하평균(geometric mean)으로 계산한다. SPEC은 전력 벤치마크(SPECpower)도 제공하여, 다양한 워크로드 수준에서의 전력 소비를 측정한다. 워크로드 기반 평가의 핵심은 "흔한 경우를 빠르게(make the common case fast)"라는 원칙에 따라, 실제 사용 패턴을 정확히 파악하는 것이다.

## 예시

```
SPECspeed 2017 Integer 벤치마크 예시:
- perlbench: Perl 인터프리터
- gcc: C 컴파일러
- mcf: 경로 최적화
- x264: 비디오 압축
- deepsjeng: 체스 엔진

SPECratio = 참조 실행 시간 / 측정 실행 시간

전체 요약 = 기하평균(SPECratio₁, SPECratio₂, ..., SPECratioₙ)
         = (SPECratio₁ × SPECratio₂ × ... × SPECratioₙ)^(1/n)
```

## 관련 개념

- [응답 시간 (Response Time)](/knowledge/computer-architecture/response-time/)
- [CPU 성능 방정식 (CPU Performance Equation)](/knowledge/computer-architecture/cpu-performance-equation/)
- [처리율 (Throughput)](/knowledge/computer-architecture/throughput/)
- [명령어당 사이클 수 (CPI)](/knowledge/computer-architecture/cpi/)
