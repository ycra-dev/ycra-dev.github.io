---
title: "프로그래밍 언어 (Programming Language)"
description: 프로그래밍 언어 관련 개념 정리 (MOC)
tags: ["Language", "MOC"]
created: 2026-01-24
updated: 2026-01-24
draft: false
slug: knowledge/language
sidebar:
  order: 0
---

# Programming Language

> Map of Contents: 프로그래밍 언어 관련 지식 지도

## Python

- (예정)

## JavaScript / TypeScript

- (예정)

## Go

- (예정)

## Rust

- (예정)

## Compilation Toolchain (컴파일 도구)

- [컴파일러 (Compiler)](/knowledge/language/compiler/) - 컴파일러(Compiler)는 고급 프로그래밍 언어로 작성된 프로그램을 어셈블리 언어 또는 기계어 명령어로 번역하는 프로그램이다
- [어셈블러 (Assembler)](/knowledge/language/assembler/) - 어셈블러(Assembler)는 어셈블리 언어로 작성된 소스 파일을 기계어 명령어와 데이터를 포함하는 오브젝트 파일로 변환하는 프로그램이다
- [링커 (Linker)](/knowledge/language/linker/) - 링커(Linker, link editor)는 독립적으로 어셈블된 기계어 프로그램들을 결합하고 모든 미정의 레이블을 해결하여 실행 가능한 파일을 생성하는 시스템 프로그램이다
- [로더 (Loader)](/knowledge/language/loader/) - 로더(Loader)는 오브젝트 프로그램을 메인 메모리에 적재하여 실행할 준비를 하는 시스템 프로그램이다
- [오브젝트 파일 (Object File)](/knowledge/language/object-file/) - 오브젝트 파일(Object File)은 기계어 명령어, 데이터, 그리고 명령어를 메모리에 적절히 배치하기 위한 정보의 조합이다
- [오브젝트 파일 포맷 (Object File Format)](/knowledge/language/object-file-format/) - 오브젝트 파일 형식은 어셈블러가 생성하는 출력 파일의 구조로, UNIX에서는 오브젝트 파일 헤더, 텍스트 세그먼트, 데이터 세그먼트, 재배치 정보, 심볼 테이블, 디버깅 정보의 6개 섹션으로 구성된다
- [실행 파일 (Executable File)](/knowledge/language/executable-file/) - 실행 파일(Executable File)은 미해결 참조가 없는 오브젝트 파일 형식의 기능적 프로그램으로, 컴퓨터에서 바로 실행할 수 있다
- [심볼 테이블 (Symbol Table)](/knowledge/language/symbol-table/) - 심볼 테이블(Symbol Table)은 레이블의 이름과 해당 레이블이 위치한 메모리 주소를 매핑하는 테이블이다
- [텍스트 세그먼트 (Text Segment)](/knowledge/language/text-segment/) - 텍스트 세그먼트(Text Segment)는 프로그램의 기계어 명령어를 포함하는 메모리 영역으로, MIPS 시스템에서는 주소 400000(hex)에서 시작한다
- [동적 링크 라이브러리 (Dynamically Linked Library)](/knowledge/language/dynamically-linked-library/) - 동적 연결 라이브러리(DLL, Dynamically Linked Library)는 프로그램이 실행될 때까지 링크 및 로드가 지연되는 라이브러리 루틴이다
- [JVM (자바 가상 머신)](/knowledge/language/java-virtual-machine/) - 자바 가상 머신(JVM, Java Virtual Machine)은 자바 바이트코드를 해석하여 실행하는 소프트웨어 인터프리터 프로그램이다
- [자바 바이트코드 (Java Bytecode)](/knowledge/language/java-bytecode/) - 자바 바이트코드(Java Bytecode)는 자바 프로그램을 해석(interpret)하기 위해 설계된 명령어 세트의 명령어이다
- [JIT 컴파일러 (Just In Time Compiler)](/knowledge/language/just-in-time-compiler/) - JIT(Just In Time) 컴파일러는 런타임에 동작하는 컴파일러로, 인터프리트되는 코드 세그먼트를 실행 중인 컴퓨터의 네이티브 코드로 변환한다
- [레지스터 할당 (Register Allocation)](/knowledge/language/register-allocation/) - 레지스터 할당(Register Allocation)은 프로그램의 변수를 프로세서의 물리적 레지스터에 매핑하는 컴파일러 최적화 과정으로, 메모리 접근을 최소화하여 성능을 향상시킨다
- [데이터 흐름 분석 (Data Flow Analysis)](/knowledge/language/data-flow-analysis/) - 데이터 흐름 분석(Data Flow Analysis)은 프로그램의 각 지점에서 변수의 정의(definition)와 사용(use) 관계를 분석하여 최적화 가능성을 판단하는 컴파일러 분석 기법이다
- [공통 부분식 제거 (Common Subexpression Elimination)](/knowledge/language/common-subexpression-elimination/) - 공통 부분식 제거(Common Subexpression Elimination)는 동일한 식의 여러 인스턴스를 찾아 두 번째 이후의 계산을 첫 번째 결과의 참조로 대체하는 컴파일러 최적화 기법이다
- [강도 감소 (Strength Reduction)](/knowledge/language/strength-reduction/) - 강도 감소(Strength Reduction)는 복잡한 연산을 더 단순한 동등한 연산으로 대체하는 컴파일러 최적화 기법으로, 대표적으로 곱셈을 시프트로 대체한다
- [프로시저 인라이닝 (Procedure Inlining)](/knowledge/language/procedure-inlining/) - 프로시저 인라이닝(Procedure Inlining)은 프로시저 호출을 해당 프로시저 본문의 코드로 직접 대체하는 컴파일러 최적화 기법이다
- [루프 풀기 (Loop Unrolling)](/knowledge/language/loop-unrolling/) - 루프 언롤링(Loop Unrolling)은 루프 본문을 여러 번 복제하여 변환된 루프의 반복 횟수를 줄임으로써 성능을 향상시키는 최적화 기법이다
- [객체지향 언어 (Object-Oriented Language)](/knowledge/language/object-oriented-language/) - 객체 지향 언어(Object-Oriented Language)는 동작(action)이나 논리(logic)보다 객체(object)를 중심으로 설계된 프로그래밍 언어이다

## 표기법 및 미니 언어 (Notation and Mini-Languages)

- [정규 표현식 실용 가이드 (Regular Expression)](/knowledge/language/regular-expression-practice/) - 정규 표현식은 문자열의 패턴을 기술하기 위한 간결한 표기법으로, 텍스트 검색, 치환, 유효성 검사 등에 광범위하게 사용되는 DSL의 대표적 성공 사례이다
- [도메인 특화 언어 (DSL)](/knowledge/language/domain-specific-language/) - DSL은 특정 문제 영역을 위해 설계된 소규모 언어로, 해당 영역의 문제를 범용 언어보다 훨씬 간결하고 명확하게 표현할 수 있다
- [코드 생성 (Code Generation)](/knowledge/language/code-generation/) - 코드 생성은 프로그램이 다른 프로그램(코드)을 작성하는 기법으로, 명세로부터 반복적이거나 정형화된 코드를 자동으로 생성하여 오류를 줄이고 생산성을 높인다
- [가상 머신 인터프리터 (Virtual Machine Interpreter)](/knowledge/language/virtual-machine-interpreter/) - 가상 머신 인터프리터는 가상의 프로세서를 위한 명령어를 소프트웨어로 실행하는 프로그램으로, 한 번 작성하면 어디서나 실행할 수 있는 이식성을 제공한다
- [Printf 형식 문자열 (Printf Format Strings)](/knowledge/language/printf-format/) - printf 형식 문자열은 출력 포맷을 제어하는 미니 언어(mini-language)로, %d, %s, %f 등의 변환 지정자를 통해 범용 언어 안에 내장된 도메인 특화 표기법의 대표적인 사례이다
