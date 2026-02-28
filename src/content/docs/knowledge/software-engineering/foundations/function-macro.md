---
title: "함수형 매크로 (Function Macro)"
description: "C 전처리기의 #define으로 정의하는 함수처럼 보이는 텍스트 치환 구문으로, 부작용과 예상치 못한 평가 순서 문제를 일으키기 쉽다"
tags: ["Software-Engineering", "C", "Preprocessor", "Pitfall"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/function-macro
sidebar:
  order: 105
---

## 핵심 개념

함수형 매크로는 C 전처리기의 `#define`으로 정의하는 함수처럼 보이는 텍스트 치환 구문이다. 컴파일 전에 단순 텍스트 치환되므로 부작용(side effect)과 예상치 못한 평가 순서 문제를 일으키기 쉽다.

## 동작 원리

함수형 매크로는 인라인 함수가 없던 시절 함수 호출 오버헤드를 피하기 위해 사용되었다. 그러나 여러 위험성이 있다:

**주요 함정들:**
1. **부작용 다중 평가**: 인자가 여러 번 평가될 수 있다.
2. **연산자 우선순위**: 괄호 없이 정의하면 예상과 다른 결과가 나온다.
3. **타입 안전성 없음**: 컴파일러가 타입 검사를 하지 않는다.
4. **디버깅 어려움**: 매크로는 전처리 후 사라지므로 디버거에서 보이지 않는다.

**대안**: 현대 C에서는 `inline` 함수, C++에서는 `inline` 함수나 템플릿을 사용한다. 매크로를 꼭 써야 한다면 본체와 인자를 모두 괄호로 감싸라.

## 예시

```c
// 위험한 매크로
#define SQUARE(x) x * x
int a = SQUARE(3 + 1);  // 기대: 16, 실제: 3 + 1 * 3 + 1 = 7

// 괄호로 개선
#define SQUARE(x) ((x) * (x))
int a = SQUARE(3 + 1);  // 정확: ((3+1) * (3+1)) = 16

// 그래도 부작용 문제 존재
int i = 3;
int a = SQUARE(i++);
// ((i++) * (i++)) → i가 두 번 증가! 미정의 동작

// 안전한 대안: 인라인 함수
static inline int square(int x) {
    return x * x;
}
```

```c
// 매크로의 또 다른 함정: 여러 문장
#define SWAP(a, b) t = a; a = b; b = t;
if (x > y)
    SWAP(x, y);  // if가 t=a만 감싼다!

// do-while 관용구로 해결
#define SWAP(a, b) do { int t = a; a = b; b = t; } while(0)
```

## 관련 개념

- [코딩 스타일 (Coding Style)](/knowledge/software-engineering/coding-style/) - 매크로 오용은 스타일 문제이기도 하다
- [컴파일러 (Compiler)](/knowledge/language/compiler-basics/) - 매크로는 컴파일 전 전처리기가 처리한다
