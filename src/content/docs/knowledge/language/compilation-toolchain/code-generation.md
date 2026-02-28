---
title: "코드 생성 (Code Generation)"
description: "프로그램이 다른 프로그램(코드)을 작성하는 기법으로, 명세로부터 반복적이거나 정형화된 코드를 자동으로 생성하여 오류를 줄이고 생산성을 높인다"
tags: ["Language", "Code-Generation", "Metaprogramming", "Automation"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/language/code-generation
sidebar:
  order: 102
---

## 핵심 개념

코드 생성은 프로그램이 다른 프로그램(코드)을 작성하는 기법으로, 명세(specification)로부터 반복적이거나 정형화된 코드를 자동으로 생성하여 오류를 줄이고 생산성을 높인다.

"프로그램을 작성하는 프로그램을 작성하라(Programs that write programs)."

## 동작 원리

반복적인 코드를 수동으로 작성하면 오류가 발생하기 쉽고 유지보수가 어렵다. 코드 생성은 이 문제를 해결한다.

**코드 생성의 유형:**
1. **테이블 구동(Table-driven)**: 데이터 테이블로부터 코드를 생성
2. **파서 생성기**: yacc/lex가 문법 명세로부터 파서 코드 생성
3. **매크로를 이용한 코드 생성**: 전처리기로 반복 코드 생산
4. **스크립트 기반 생성**: 스크립트가 소스 코드 파일을 출력

**장점:**
- 반복 코드의 오류 감소: 한 곳에서 정의, 여러 곳에서 사용
- 일관성 보장: 생성된 코드는 항상 패턴을 따름
- 유지보수 용이: 명세만 수정하면 코드가 자동 재생성

**주의사항:**
- 생성된 코드를 수동으로 편집하지 마라 (재생성 시 덮어씀)
- 생성기 자체의 복잡도를 관리해야 함

## 예시

```c
/* X 매크로를 이용한 코드 생성 */

/* 열거형과 문자열 배열을 동시에 정의 */
#define COLORS \
    X(RED,    "red")    \
    X(GREEN,  "green")  \
    X(BLUE,   "blue")   \
    X(YELLOW, "yellow")

/* 열거형 생성 */
#define X(name, str) name,
enum Color { COLORS NUM_COLORS };
#undef X

/* 문자열 배열 생성 */
#define X(name, str) str,
const char *color_names[] = { COLORS };
#undef X

/* 결과:
 * enum Color { RED, GREEN, BLUE, YELLOW, NUM_COLORS };
 * const char *color_names[] = { "red", "green", "blue", "yellow" };
 * → 한 곳(COLORS)만 수정하면 양쪽 모두 업데이트
 */
```

```python
# 스크립트로 C 코드 생성
opcodes = [
    ("ADD", "+"), ("SUB", "-"),
    ("MUL", "*"), ("DIV", "/"),
]

print("switch (opcode) {")
for name, op in opcodes:
    print(f'    case OP_{name}: result = a {op} b; break;')
print("}")
```

```
# yacc 문법 명세 → 파서 코드 자동 생성
expr : expr '+' term  { $$ = $1 + $3; }
     | expr '-' term  { $$ = $1 - $3; }
     | term
     ;
# → yacc가 수천 줄의 파서 C 코드를 생성
```

## 관련 개념

- [도메인 특화 언어 (DSL)](/knowledge/language/domain-specific-language/) - 코드 생성의 기반이 되는 DSL
- [가상 머신 인터프리터 (Virtual Machine Interpreter)](/knowledge/language/virtual-machine-interpreter/) - 코드를 실행하는 다른 접근법
