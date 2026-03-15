---
title: "재귀적 합성 (Recursive Composition)"
description: "단순한 요소를 조합하여 점점 더 복잡한 요소를 구성하고, 이 과정을 반복하여 계층적 구조를 표현하는 기법"
tags: ['Recursive Composition', 'Hierarchical Structure', 'Document Structure', 'Composite']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/recursive-composition
sidebar:
  order: 10
---

## 핵심 개념

Lexi 문서 편집기에서 문자(character)와 그래픽 같은 기본 요소들을 왼쪽에서 오른쪽으로 배치하여 행(row)을 구성하고, 여러 행을 모아 열(column)을 구성하며, 열들을 모아 페이지를 구성한다. 각 요소를 객체로 표현하면 텍스트와 그래픽을 동일하게 취급할 수 있다.

Glyph이라는 추상 클래스를 정의하여 모든 문서 구조 요소의 공통 인터페이스를 제공한다. Glyph은 draw(), bounds(), intersects(), insert(), remove(), child() 연산을 가지며, Character, Row, Column, Image 등이 이를 상속한다.

이 접근법의 핵심은 단일 요소와 요소 그룹을 동일하게 취급하여 임의로 복잡한 문서를 구성할 수 있다는 것이며, 이것이 Composite 패턴의 본질이다.

## 예시

```
// 재귀적 합성의 문서 구조
Column
  ├── Row
  │    ├── Character 'H'
  │    ├── Character 'e'
  │    ├── Character 'l'
  │    └── Image (logo.png)
  └── Row
       ├── Character 'W'
       └── Character 'o'
```

```cpp
// Glyph 추상 클래스
class Glyph {
public:
    virtual void draw(Window*) = 0;
    virtual void bounds(Rect&) = 0;
    virtual void insert(Glyph*, int) = 0;
    virtual Glyph* child(int) = 0;
};
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/)
- [Abstract Class](/knowledge/language/design-patterns/abstract-class/)
- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/)
