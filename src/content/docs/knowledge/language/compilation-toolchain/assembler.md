---
title: "Assembler"
description: "어셈블러(Assembler)는 어셈블리 언어로 작성된 소스 파일을 기계어 명령어와 데이터를 포함하는 오브젝트 파일로 변환하는 프로그램이다"
tags: ['Assembly Language', 'Machine Language', 'Symbol Table', 'Two Pass Assembly']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/assembler
sidebar:
  order: 2
---

## 핵심 개념

어셈블러의 변환 과정은 두 단계로 구성된다. 첫 번째 패스에서는 모든 레이블을 찾아 심볼 테이블에 레이블 이름과 메모리 주소의 대응 관계를 기록한다. 이는 전방 참조(forward reference) 문제를 해결하기 위한 것으로, 레이블이 정의되기 전에 사용될 수 있기 때문이다. 두 번째 패스에서는 각 어셈블리 문장을 실제 기계어로 변환하며, 옵코드와 오퍼랜드의 이진 표현을 조합한다. 어셈블러는 의사명령어(pseudoinstruction)를 실제 하드웨어 명령어 시퀀스로 확장하고, 매크로를 통해 프로그래머에게 자주 사용되는 명령어 시퀀스를 추상화하는 기능도 제공한다. 오브젝트 파일에는 텍스트 세그먼트, 데이터 세그먼트, 재배치 정보, 심볼 테이블, 디버깅 정보가 포함된다.

## 예시

```
어셈블리 언어 → 기계어 변환 과정:

1단계 (심볼 수집):
  main:    → 심볼 테이블에 main의 주소 기록
  loop:    → 심볼 테이블에 loop의 주소 기록
  str:     → 심볼 테이블에 str의 주소 기록

2단계 (코드 생성):
  add $t0, $t1, $t2
  → 000000 01001 01010 01000 00000 100000
     op=0   rs=9  rt=10 rd=8  shamt func=32

의사명령어 확장:
  blt $t0, $t1, label
  → slt $at, $t0, $t1    (실제 명령어 1)
  → bne $at, $zero, label (실제 명령어 2)
```

## 관련 개념

- [Linker](/knowledge/language/linker/)
- [Machine Language](/knowledge/computer-architecture/machine-language/)
- [Symbol Table](/knowledge/language/symbol-table/)
- [Object File Format](/knowledge/language/object-file-format/)
