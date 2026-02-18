---
title: "Loop Unrolling"
description: "루프 언롤링(Loop Unrolling)은 루프 본문을 여러 번 복제하여 변환된 루프의 반복 횟수를 줄임으로써 성능을 향상시키는 최적화 기법이다"
tags: ['Compiler Optimization', 'Performance', 'Loop Transformation', 'Instruction Level Parallelism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/loop-unrolling
sidebar:
  order: 19
---

## 핵심 개념

배열에 접근하는 루프에서 더 높은 성능을 얻기 위한 기법으로, 루프 오버헤드(분기, 증가 등)를 줄이고 다른 여러 최적화의 기회를 제공한다. 루프 본문의 여러 복사본을 만들고, 서로 다른 반복의 명령어를 함께 스케줄링한다. 고수준 최적화에 속하며, 루프 인터체인지(loop interchange), 루프 블로킹(loop blocking) 등 다른 루프 변환과 함께 사용될 수 있다. 이러한 변환은 메모리 접근 패턴을 개선하고 하드웨어를 더 효과적으로 활용할 수 있게 한다.

다중 발행 파이프라인에서 루프 언롤링은 특히 중요하다. 2-issue 정적 파이프라인에서 4회 언롤링 시, 14개 명령어 중 12개가 쌍으로 실행되어 CPI가 0.57(IPC 1.75)로 개선된다. 언롤링 과정에서 컴파일러는 레지스터 리네이밍을 수행하여 반이름 의존성(antidependence)을 제거하고, 독립적인 명령어를 더 유연하게 스케줄링한다. 비용으로는 추가 임시 레지스터 사용과 코드 크기 증가가 있다.

## 예시

```c
// 원본 루프
for (i = 0; i < 100; i++)
    a[i] = b[i] + c[i];

// 4배 언롤링 후
for (i = 0; i < 100; i += 4) {
    a[i]   = b[i]   + c[i];
    a[i+1] = b[i+1] + c[i+1];
    a[i+2] = b[i+2] + c[i+2];
    a[i+3] = b[i+3] + c[i+3];
}
// 루프 오버헤드가 1/4로 감소
```

## 관련 개념

- [Compiler](/knowledge/language/compiler/)
- [Procedure Inlining](/knowledge/language/procedure-inlining/)
- [Register Allocation](/knowledge/language/register-allocation/)
- [Subword Parallelism](/knowledge/computer-architecture/subword-parallelism/)
- [Register Renaming](/knowledge/computer-architecture/register-renaming/)
- [Antidependence](/knowledge/computer-architecture/antidependence/)
- [Multiple Issue](/knowledge/computer-architecture/multiple-issue/)
- [Instruction-Level Parallelism](/knowledge/computer-architecture/instruction-level-parallelism/)
