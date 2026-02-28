---
title: "자료구조 설계 (Data Structure Design)"
description: "프로그램 작성의 가장 핵심적인 결정으로, 적절한 자료구조를 선택하면 알고리즘이 자연스럽게 따라온다"
tags: ["Software-Engineering", "Data-Structure", "Design", "Architecture"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/data-structure-design
sidebar:
  order: 112
---

## 핵심 개념

자료구조 설계는 프로그램 작성의 가장 핵심적인 결정으로, 적절한 자료구조를 선택하면 알고리즘이 자연스럽게 따라온다. 잘못된 자료구조는 코드를 복잡하고 비효율적으로 만든다.

"자료구조를 먼저 결정하면 나머지는 따라온다."

## 동작 원리

**설계 과정 (마르코프 체인 예제):**
1. **문제 분석**: 접두사(N개 단어)에 대응하는 접미사 목록을 저장하고 빠르게 조회해야 한다.
2. **자료구조 선택**: 해시 테이블(접두사 → 접미사 목록)이 O(1) 조회로 최적.
3. **세부 구조 결정**: 접미사는 가변 길이이므로 연결 리스트로 저장.
4. **알고리즘 도출**: 자료구조가 정해지자 생성 알고리즘이 자연스럽게 결정됨.

**핵심 원칙들:**
- 데이터가 코드를 결정한다, 그 반대가 아니다.
- 가능한 한 기존 라이브러리의 자료구조를 사용하라.
- 단순한 자료구조를 먼저 시도하라 — 충분히 빠른 경우가 많다.
- 자료구조를 인터페이스 뒤에 숨겨라 — 나중에 교체할 수 있도록.

## 예시

```
마르코프 체인의 자료구조 설계:

요구사항:
  - "접두사 → 접미사 목록" 매핑
  - 빠른 조회 (텍스트 생성 시 반복 조회)
  - 동적 삽입 (입력 처리 시)

설계 결정:
  ┌──────────────┐
  │  Hash Table  │ ← O(1) 조회
  │──────────────│
  │ [prefix] → ──┼──→ Suffix List (linked list)
  │ [prefix] → ──┼──→ Suffix List
  └──────────────┘

  prefix = 고정 크기 단어 배열 (NPREF개)
  suffix = 연결 리스트 (동적 추가 용이)
```

```c
// 인터페이스 뒤에 자료구조를 숨기는 예
// 외부에 공개하는 함수
void   build(char *input[], int n);
void   generate(int maxwords);

// 내부 구현 세부사항은 숨김
// → 해시 테이블을 트리로 교체해도 외부 코드 변경 불필요
```

## 관련 개념

- [인터페이스 설계 원칙 (Interface Design Principles)](/knowledge/software-engineering/interface-design/) - 자료구조를 인터페이스 뒤에 숨기는 원칙
- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/) - 마르코프 체인에서 선택된 핵심 자료구조
- [연결 리스트 (Linked List)](/knowledge/algorithms/linked-list/) - 접미사 목록에 사용된 자료구조
