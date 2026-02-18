---
title: "Object File"
description: "오브젝트 파일(Object File)은 기계어 명령어, 데이터, 그리고 명령어를 메모리에 적절히 배치하기 위한 정보의 조합이다"
tags: ['Assembler', 'Linker', 'Translation Hierarchy', 'Text Segment', 'Data Segment']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/object-file
sidebar:
  order: 5
---

## 핵심 개념

어셈블러가 어셈블리 언어를 기계어로 변환한 결과물이다. UNIX 시스템에서 오브젝트 파일은 여섯 가지 구성 요소를 포함한다: (1) 오브젝트 파일 헤더 - 다른 부분의 크기와 위치, (2) 텍스트 세그먼트 - 기계어 코드, (3) 정적 데이터 세그먼트 - 프로그램 수명 동안 할당된 데이터, (4) 재배치 정보 - 절대 주소에 의존하는 명령어와 데이터, (5) 심볼 테이블 - 외부 참조 같은 미정의 레이블, (6) 디버깅 정보 - 소스 파일과 기계어 명령어의 매핑. UNIX에서는 .o 확장자, MS-DOS에서는 .OBJ를 사용한다. 부분적으로 링크된 오브젝트 파일(라이브러리 루틴 등)은 미해결 주소를 포함할 수 있다.

## 예시

```
# UNIX 파일 확장자 규칙:
# .c   → C 소스 파일
# .s   → 어셈블리 파일
# .o   → 오브젝트 파일
# .a   → 정적 링크 라이브러리
# .so  → 동적 링크 라이브러리
# a.out → 실행 파일 (기본)
```

## 관련 개념

- [Assembler](/knowledge/language/assembler/)
- [Linker](/knowledge/language/linker/)
- [Executable File](/knowledge/language/executable-file/)
- [Symbol Table](/knowledge/language/symbol-table/)
