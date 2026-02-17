---
title: "Vector Architecture"
description: "벡터 아키텍처는 메모리에서 데이터 요소를 수집하여 순서대로 큰 레지스터 세트에 넣고, 파이프라인된 실행 유닛을 사용하여 레지스터에서 순차적으로 연산한 뒤, 결과를 메모리에 다시 기록하는 SIMD 해석 방식이다"
tags: ['Simd', 'Data Level Parallelism', 'Vector Lane', 'Pipelined Execution', 'Vector Register']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/vector-architecture
sidebar:
  order: 7
---

## 핵심 개념

벡터 아키텍처는 1970년대 시모어 크레이(Seymour Cray)부터 시작되어, 데이터 수준 병렬성이 풍부한 문제에 매우 적합하다. 옛날 배열 프로세서가 64개 ALU로 64개 덧셈을 동시에 수행했다면, 벡터 아키텍처는 ALU를 파이프라인하여 더 낮은 비용으로 좋은 성능을 달성한다.

핵심 특성은 벡터 레지스터 세트이다 (예: 32개 벡터 레지스터, 각 64개의 64비트 요소). 벡터 명령어는 스칼라 대비 다음과 같은 장점을 제공한다:
- 동적 명령어 대역폭이 극적으로 감소 (전체 루프를 하나의 명령어로 대체)
- 파이프라인 해저드가 벡터 요소당이 아닌 벡터 연산당 한 번만 발생
- 메모리 접근 패턴이 예측 가능하여 메모리 대역폭을 효율적으로 활용
- 제어 해저드(루프 분기)가 없음

벡터 레인(vector lane)은 다중 병렬 파이프라인으로, 교통 도로의 차선처럼 벡터 유닛의 처리량을 증가시킨다. 4개 레인은 벡터 명령어당 클럭 수를 약 4배 줄인다.

멀티미디어 확장(AVX)과의 차이: 벡터는 연산 요소 수가 opcode가 아닌 별도 레지스터에 있어 바이너리 호환성이 유지되며, 스트라이드 접근과 gather-scatter를 지원한다.

## 예시

```
# DAXPY: Y = a * X + Y (64개 double 연산)

# 스칼라 MIPS: ~600개 동적 명령어
loop: l.d   $f0, 0($s0)     # X[i] 로드
      mul.d $f0, $f0, $f2   # a * X[i]
      l.d   $f4, 0($s1)     # Y[i] 로드
      add.d $f0, $f0, $f4   # a*X[i] + Y[i]
      s.d   $f0, 0($s1)     # 결과 저장
      addi  $s0, $s0, 8
      addi  $s1, $s1, 8
      bne   $s0, $t0, loop
      # 파이프라인 해저드: 모든 요소마다 발생

# 벡터 MIPS: 6개 명령어
      lv    $v0, $s0        # 벡터 X 로드
      mulvs.d $v1, $v0, $f0 # a * X (벡터-스칼라 곱)
      lv    $v2, $s1        # 벡터 Y 로드
      addv.d $v3, $v1, $v2  # a*X + Y
      sv    $v3, $s1        # 결과 저장
      # 파이프라인 해저드: 벡터 연산당 한 번만!
```

## 관련 개념

- [SIMD](/knowledge/computer-architecture/simd/)
- [Data-Level Parallelism](/knowledge/computer-architecture/data-level-parallelism/)
- [GPU](/knowledge/computer-architecture/gpu/)
- [Vector Lane](/knowledge/computer-architecture/vector-lane/)
