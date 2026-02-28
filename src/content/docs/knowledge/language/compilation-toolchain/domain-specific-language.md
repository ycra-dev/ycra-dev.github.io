---
title: "도메인 특화 언어 (Domain-Specific Language, DSL)"
description: "특정 문제 영역을 위해 설계된 소규모 언어로, 해당 영역의 문제를 범용 언어보다 훨씬 간결하고 명확하게 표현할 수 있다"
tags: ["Language", "DSL", "Abstraction", "Notation"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/language/domain-specific-language
sidebar:
  order: 101
---

## 핵심 개념

도메인 특화 언어(DSL)는 특정 문제 영역을 위해 설계된 소규모 언어로, 해당 영역의 문제를 범용 언어보다 훨씬 간결하고 명확하게 표현할 수 있다.

좋은 표기법은 문제 해결의 절반이다. 적절한 DSL을 선택하거나 설계하면 수백 줄의 코드가 몇 줄로 줄어든다.

## 동작 원리

문제 영역이 잘 이해되어 있을 때, 특화된 표기법(notation)은 프로그램을 극적으로 단순화할 수 있다.

**DSL의 대표적인 사례:**
- **정규 표현식**: 패턴 매칭
- **printf 형식 문자열**: 출력 포맷팅
- **SQL**: 데이터베이스 질의
- **HTML/CSS**: 웹 문서 구조와 스타일
- **스프레드시트 수식**: `=SUM(A1:A10)`
- **Make**: 빌드 자동화
- **yacc/lex**: 파서 생성

**DSL 설계 원칙:**
1. 문제 영역의 개념을 직접 표현할 수 있어야 함
2. 간결해야 함 - 장황하면 범용 언어가 나음
3. 오류 메시지가 사용자에게 의미 있어야 함
4. 범용 언어의 기능을 무리하게 추가하지 마라 (Greenspun's tenth rule)

## 예시

```
# 정규식으로 이메일 유효성 검사 (DSL)
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
# → C로 작성하면 수십 줄

# SQL로 데이터 조회 (DSL)
SELECT name, age FROM users WHERE age > 30 ORDER BY name;
# → 범용 언어로 직접 구현하면 수백 줄

# Make로 빌드 규칙 (DSL)
program: main.o utils.o
	cc -o program main.o utils.o
# → 쉘 스크립트로 동일한 의존성 관리를 하면 훨씬 복잡
```

```c
/* DSL의 힘: printf 형식 문자열 */
// DSL 사용:
printf("%-20s %5d %8.2f\n", name, count, total);

// DSL 없이 동일한 출력:
print_left_justified(name, 20);
print_char(' ');
print_right_justified_int(count, 5);
print_char(' ');
print_right_justified_float(total, 8, 2);
print_char('\n');
// → 6배 더 장황하고 오류 가능성 높음
```

## 관련 개념

- [정규 표현식 (Regular Expression)](/knowledge/language/regular-expression-practice/) - DSL의 가장 성공적인 사례
- [코드 생성 (Code Generation)](/knowledge/language/code-generation/) - DSL로 코드를 생성하는 기법
- [가상 머신 인터프리터 (Virtual Machine Interpreter)](/knowledge/language/virtual-machine-interpreter/) - DSL을 실행하는 방법 중 하나
