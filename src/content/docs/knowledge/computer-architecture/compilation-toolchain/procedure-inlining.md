---
title: "Procedure Inlining"
description: "프로시저 인라이닝(Procedure Inlining)은 프로시저 호출을 해당 프로시저 본문의 코드로 직접 대체하는 컴파일러 최적화 기법이다"
tags: ['Compiler Optimization', 'Performance', 'Code Size', 'Function Call']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/procedure-inlining
sidebar:
  order: 18
---

## 핵심 개념

인라이닝은 매개변수 전달과 jal 명령어를 통한 코드 호출 대신, 호출 위치에 프로시저 본문 코드를 직접 복사한다. 이를 통해 함수 호출에 따른 오버헤드(매개변수 전달, 스택 저장/복원, 점프 및 복귀)를 제거할 수 있다. 예를 들어, sort에서 swap을 인라이닝하면 4개의 명령어를 절약할 수 있다. 그러나 단점은 인라이닝된 프로시저가 여러 위치에서 호출되면 컴파일된 코드가 커진다는 것이다. 코드 크기 확장은 캐시 미스율을 증가시켜 오히려 성능이 저하될 수 있다.

## 예시

```c
// 인라이닝 전: swap 프로시저 호출
for (j = i-1; j >= 0 && v[j] > v[j+1]; j -= 1)
    swap(v, j);  // jal swap

// 인라이닝 후: swap 본문이 직접 삽입됨
for (j = i-1; j >= 0 && v[j] > v[j+1]; j -= 1) {
    int temp = v[j];
    v[j] = v[j+1];
    v[j+1] = temp;
}
```

## 관련 개념

- [Compiler](/knowledge/computer-architecture/compiler/)
- [Loop Unrolling](/knowledge/computer-architecture/loop-unrolling/)
- [Register Allocation](/knowledge/computer-architecture/register-allocation/)
