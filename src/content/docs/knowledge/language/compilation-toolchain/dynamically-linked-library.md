---
title: "동적 링크 라이브러리 (Dynamically Linked Library)"
description: "동적 연결 라이브러리(DLL, Dynamically Linked Library)는 프로그램이 실행될 때까지 링크 및 로드가 지연되는 라이브러리 루틴이다"
tags: ['Dll', 'Linker', 'Loader', 'Lazy Linkage', 'Shared Library']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/dynamically-linked-library
sidebar:
  order: 10
---

## 핵심 개념

정적 링킹의 두 가지 주요 단점을 해결한다: (1) 라이브러리의 새 버전이 출시되어도 정적으로 링크된 프로그램은 이전 버전을 계속 사용, (2) 실행되지 않는 호출을 포함한 라이브러리 전체가 로드됨. DLL의 지연 프로시저 링킹(lazy procedure linkage) 방식은 각 루틴이 실제로 호출될 때만 링크된다. 이 방식은 간접 점프(indirect jump)를 사용한 간접 참조 수준을 활용한다. 처음 호출 시에는 동적 링커/로더가 원하는 루틴을 찾아 재매핑하고 간접 점프 주소를 변경하지만, 이후 호출에서는 단일 간접 점프만 필요하다. Microsoft Windows와 UNIX 모두 DLL을 광범위하게 사용한다.

## 예시

```
# DLL의 지연 프로시저 링킹 과정
# 첫 번째 호출 시:
1. 프로그램 → 더미 엔트리 호출
2. 간접 점프 → 동적 링커/로더
3. 링커가 라이브러리 루틴 찾아서 재매핑
4. 간접 점프 주소를 실제 루틴으로 변경
5. 루틴 실행

# 이후 호출 시:
1. 프로그램 → 더미 엔트리 호출
2. 간접 점프 → 바로 라이브러리 루틴 (추가 오버헤드 없음)
```

## 관련 개념

- [링커 (Linker)](/knowledge/language/linker/)
- [로더 (Loader)](/knowledge/language/loader/)
- [실행 파일 (Executable File)](/knowledge/language/executable-file/)
