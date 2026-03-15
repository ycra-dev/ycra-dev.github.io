---
title: "실행 파일 (Executable File)"
description: "실행 파일(Executable File)은 미해결 참조가 없는 오브젝트 파일 형식의 기능적 프로그램으로, 컴퓨터에서 바로 실행할 수 있다"
tags: ['Linker', 'Object File', 'Loader', 'Translation Hierarchy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/executable-file
sidebar:
  order: 7
---

## 핵심 개념

링커가 모든 외부 참조를 해결한 후 생성하는 최종 결과물이다. 오브젝트 파일과 동일한 형식을 갖지만, 미해결 참조가 없다는 점이 다르다. 심볼 테이블과 디버깅 정보를 포함할 수 있으며, "스트립(stripped)" 실행 파일에는 이 정보가 제거된다. 로더를 위한 재배치 정보도 포함될 수 있다. UNIX에서 기본 실행 파일 이름은 a.out이고, MS-DOS에서는 .EXE 확장자를 사용한다. 실행 파일은 텍스트 세그먼트(기계어 코드), 정적 데이터 세그먼트, 재배치 정보 등을 포함한다.

## 예시

```
# UNIX 오브젝트 파일/실행 파일 구조
1. 오브젝트 파일 헤더   → 크기와 위치 정보
2. 텍스트 세그먼트      → 기계어 코드
3. 정적 데이터 세그먼트  → 프로그램 수명 동안 할당된 데이터
4. 재배치 정보          → 절대 주소 의존 명령어/데이터
5. 심볼 테이블          → 미정의 레이블
6. 디버깅 정보          → 소스 파일 매핑 정보
```

## 관련 개념

- [링커 (Linker)](/knowledge/language/linker/)
- [로더 (Loader)](/knowledge/language/loader/)
- [오브젝트 파일 (Object File)](/knowledge/language/object-file/)
- [심볼 테이블 (Symbol Table)](/knowledge/language/symbol-table/)
