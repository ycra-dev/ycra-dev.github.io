---
title: "Object File Format"
description: "오브젝트 파일 형식은 어셈블러가 생성하는 출력 파일의 구조로, UNIX에서는 오브젝트 파일 헤더, 텍스트 세그먼트, 데이터 세그먼트, 재배치 정보, 심볼 테이블, 디버깅 정보의 6개 섹션으로 구성된다"
tags: ['Assembler', 'Linker', 'Text Segment', 'Data Segment', 'Relocation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/object-file-format
sidebar:
  order: 6
---

## 핵심 개념

텍스트 세그먼트는 소스 파일의 기계어 코드를 포함하며, 미해결 참조 때문에 아직 실행 불가능할 수 있다. 데이터 세그먼트는 소스 파일의 데이터를 이진 표현으로 포함한다. 재배치 정보는 절대 주소에 의존하는 명령어와 데이터 워드를 식별하여, 프로그램의 일부가 메모리에서 이동할 때 참조를 수정할 수 있게 한다. MIPS에서는 서브루틴 호출, 로드, 스토어 명령어만 절대 주소를 참조하며, PC 상대 주소를 사용하는 분기 명령어는 재배치가 필요 없다. 심볼 테이블은 외부 레이블과 주소를 연결하고 미해결 참조를 나열한다. 어셈블러는 각 파일이 주소 0에서 시작한다고 가정하고, 링커가 실제 메모리 위치를 할당할 때 재배치를 수행한다.

## 예시

```
오브젝트 파일 구조 (UNIX):

┌─────────────────────┐
│  오브젝트 파일 헤더    │  ← 다른 섹션의 크기와 위치
├─────────────────────┤
│  텍스트 세그먼트       │  ← 기계어 명령어
├─────────────────────┤
│  데이터 세그먼트       │  ← 초기화된 데이터
├─────────────────────┤
│  재배치 정보          │  ← 절대 주소 참조 목록
├─────────────────────┤
│  심볼 테이블          │  ← 외부 레이블, 미해결 참조
├─────────────────────┤
│  디버깅 정보          │  ← 소스 코드-명령어 주소 대응
└─────────────────────┘
```

## 관련 개념

- [Assembler](/knowledge/computer-architecture/assembler/)
- [Linker](/knowledge/computer-architecture/linker/)
- [Text Segment](/knowledge/computer-architecture/text-segment/)
- [Relocation](/knowledge/computer-architecture/relocation/)
