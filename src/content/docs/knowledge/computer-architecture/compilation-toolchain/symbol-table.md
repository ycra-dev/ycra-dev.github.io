---
title: "Symbol Table"
description: "심볼 테이블(Symbol Table)은 레이블의 이름과 해당 레이블이 위치한 메모리 주소를 매핑하는 테이블이다"
tags: ['Assembler', 'Linker', 'Compiler', 'Object File']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/symbol-table
sidebar:
  order: 8
---

## 핵심 개념

어셈블러가 어셈블리 언어 프로그램의 각 명령어에 대한 바이너리 버전을 생성하려면, 모든 레이블에 해당하는 주소를 결정해야 한다. 심볼 테이블은 분기 명령어와 데이터 전송 명령어에서 사용되는 레이블을 추적하며, 심볼과 주소의 쌍을 포함한다. 또한 오브젝트 파일의 여섯 가지 구성 요소 중 하나로, 외부 참조처럼 아직 정의되지 않은 레이블을 포함한다. 링커는 심볼 테이블과 재배치 정보를 사용하여 미해결 레이블을 해결한다.

어셈블러의 첫 번째 패스에서 각 줄을 읽으며, 레이블이 있으면 심볼 테이블에 레이블 이름과 현재 주소를 기록한다. 명령어 크기를 추적하여 다음 명령어의 주소를 계산한다. 고정 길이 명령어(MIPS 등)는 간단히 계산되지만, 가변 길이 명령어(VAX 등)는 명령어를 상세히 분석해야 한다. 두 번째 패스에서 어셈블러는 심볼 테이블의 정보를 사용하여 레이블 참조를 실제 주소로 변환한다. 외부(global) 레이블은 다른 파일에서 참조 가능하고, 로컬 레이블은 정의된 파일 내에서만 사용 가능하다. 미해결 외부 참조는 링커가 처리하며, 심볼 테이블의 외부 심볼 정보가 오브젝트 파일에 포함되어 링커에 전달된다.

## 예시

```
# 심볼 테이블 예시
# Symbol    | Address
# ---------|----------
# main     | 0x00400000
# loop     | 0x00400010
# exit     | 0x00400024
# array    | 0x10000000
```

```
심볼 테이블 구성 과정:

소스 코드:
  .text
  .globl main
  main:         → 심볼 테이블: {main: 0x00400000, global}
    addiu $sp, $sp, -32
    sw $ra, 20($sp)
    ...
  loop:         → 심볼 테이블: {loop: 0x00400010, local}
    ...
  .data
  str:          → 심볼 테이블: {str: 0x10000000, local}
    .asciiz "Hello"

최종 심볼 테이블:
  이름     주소          유형
  main    0x00400000    global (외부)
  loop    0x00400010    local (로컬)
  str     0x10000000    local (로컬)
  printf  미해결         external reference
```

## 관련 개념

- [Assembler](/knowledge/computer-architecture/assembler/)
- [Linker](/knowledge/computer-architecture/linker/)
- [Object File](/knowledge/computer-architecture/object-file/)
- [Relocation](/knowledge/computer-architecture/relocation/)
- [Object File Format](/knowledge/computer-architecture/object-file-format/)
- [Forward Reference](/knowledge/computer-architecture/forward-reference/)
