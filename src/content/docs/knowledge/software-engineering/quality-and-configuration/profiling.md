---
title: "프로파일링 (Profiling)"
description: "프로그램이 어디에서 시간을 소비하는지 측정하는 기법으로, 성능 최적화의 첫 번째 단계이다. 추측하지 말고 측정하라."
tags: ["Software-Engineering", "Performance", "Profiling", "Optimization"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/profiling
sidebar:
  order: 200
---

## 핵심 개념

프로파일링은 프로그램이 어디에서 시간을 소비하는지 측정하는 기법으로, 성능 최적화의 첫 번째 단계이다.

성능 문제를 해결할 때 가장 중요한 원칙: **"추측하지 말고 측정하라."** 개발자의 직관은 병목 지점을 예측하는 데 매우 부정확하다.

## 동작 원리

**핵심 규칙:**
- **자동화**: 타이밍 측정을 자동화하라. 수동 측정은 반복 불가능하고 오류가 많다
- **핫스팟 집중**: 전체 실행 시간의 대부분을 차지하는 소수의 코드에 집중하라
- **콜드 코드 무시**: 거의 실행되지 않는 코드를 최적화하는 것은 시간 낭비이다
- **반복 측정**: 최적화 전후를 비교하여 실제 개선 효과를 확인하라

**대표적인 프로파일러:**
- **gprof** (C/C++): 함수별 실행 시간과 호출 횟수
- **Valgrind/callgrind**: 캐시 미스, 명령어 수 분석
- **perf** (Linux): 하드웨어 카운터 기반 성능 분석
- **Python cProfile**: 함수별 누적/자체 실행 시간

## 예시

```c
/* gprof 사용 예시 */
// 1. 컴파일 시 프로파일링 플래그 추가
// $ gcc -pg -o program program.c

// 2. 프로그램 실행 (gmon.out 생성)
// $ ./program

// 3. 프로파일 결과 분석
// $ gprof program gmon.out

/* 프로파일 결과 예시:
 *  % time  cumulative  self    calls  function
 *  72.3    4.82        4.82    10000  string_match
 *  15.1    5.83        1.01    50000  hash_lookup
 *   8.2    6.38        0.55    10000  read_line
 * → string_match가 핫스팟! 여기를 최적화해야 함
 */
```

```python
# Python에서의 프로파일링
import cProfile
import pstats

cProfile.run('main()', 'output.prof')
stats = pstats.Stats('output.prof')
stats.sort_stats('cumulative')
stats.print_stats(10)  # 상위 10개 함수
```

## 관련 개념

- [코드 최적화 (Code Optimization)](/knowledge/software-engineering/code-optimization/) - 프로파일링 후 수행하는 최적화
- [병목 (Bottleneck)](/knowledge/software-engineering/bottleneck/) - 프로파일링으로 발견하는 병목 지점
