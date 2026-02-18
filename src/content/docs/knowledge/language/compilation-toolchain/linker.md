---
title: "Linker"
description: "링커(Linker, link editor)는 독립적으로 어셈블된 기계어 프로그램들을 결합하고 모든 미정의 레이블을 해결하여 실행 가능한 파일을 생성하는 시스템 프로그램이다"
tags: ['Translation Hierarchy', 'Object File', 'Executable File', 'Relocation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/linker
sidebar:
  order: 3
---

## 핵심 개념

링커는 프로그램 번역 계층의 세 번째 단계를 담당한다. 각 프로시저를 독립적으로 컴파일하고 어셈블할 수 있게 하여, 한 줄의 수정이 전체 프로그램의 재컴파일을 요구하지 않도록 한다. 링커의 세 가지 주요 단계는: (1) 코드와 데이터 모듈을 메모리에 상징적으로 배치, (2) 데이터와 명령어 레이블의 주소 결정, (3) 내부 및 외부 참조를 패치하는 것이다. 링커는 각 오브젝트 모듈의 재배치 정보와 심볼 테이블을 사용하여 미해결 레이블을 해결한다. 재컴파일하고 재어셈블하는 것보다 코드를 패치하는 것이 훨씬 빠르기 때문에 링커가 유용하다.

링커는 또한 프로그램이 사용하는 라이브러리 루틴을 라이브러리에서 검색한다. 외부 심볼과 미해결 참조를 매칭하여 한 파일의 외부 심볼이 다른 파일의 참조를 해결한다. 분리 컴파일(separate compilation)을 통해 프로그램을 논리적으로 관련된 모듈들로 나누어 독립적으로 컴파일할 수 있으므로, 한 모듈의 변경이 전체 프로그램의 재컴파일을 요구하지 않는다.

## 예시

```
# 두 오브젝트 파일 링킹
# Procedure A: text 시작 주소 = 0x00400000, data = 0x10000000
# Procedure B: text 시작 주소 = 0x00400100, data = 0x10000020

# A의 jal B 명령어: 주소 필드를 0x00400100으로 업데이트
# B의 jal A 명령어: 주소 필드를 0x00400000으로 업데이트
```

```
링킹 과정:

파일 A (main.o):
  - 외부 심볼: main (정의)
  - 미해결 참조: printf, factorial

파일 B (factorial.o):
  - 외부 심볼: factorial (정의)
  - 미해결 참조: (없음)

라이브러리 (libc.a):
  - 외부 심볼: printf (정의)

링커 수행:
1. main.o의 printf 참조 → libc.a의 printf 정의로 해결
2. main.o의 factorial 참조 → factorial.o의 factorial 정의로 해결
3. 각 모듈의 메모리 위치 결정 및 재배치
4. 실행 파일 생성 (미해결 참조 없음)
```

## 관련 개념

- [Compiler](/knowledge/language/compiler/)
- [Assembler](/knowledge/language/assembler/)
- [Object File](/knowledge/language/object-file/)
- [Executable File](/knowledge/language/executable-file/)
- [Loader](/knowledge/language/loader/)
- [Symbol Table](/knowledge/language/symbol-table/)
- [Object File Format](/knowledge/language/object-file-format/)
