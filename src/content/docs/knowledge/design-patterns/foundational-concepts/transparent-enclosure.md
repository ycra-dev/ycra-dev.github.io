---
title: "투명한 감싸기 (Transparent Enclosure)"
description: "단일 컴포넌트 합성과 호환 인터페이스를 결합하여, 클라이언트가 원본 컴포넌트와 장식된 컴포넌트를 구별하지 못하게 하는 기법"
tags: ['Transparent Enclosure', 'Embellishment', 'Monoglyph', 'Single Component Composition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/transparent-enclosure
sidebar:
  order: 11
---

## 핵심 개념

투명한 감싸기(transparent enclosure)는 두 가지 개념을 결합한다: (1) 단일 자식 합성(single-child composition)과 (2) 호환 인터페이스(compatible interfaces). 클라이언트는 원본 컴포넌트를 다루든 이를 감싼 enclosure를 다루든 구별할 수 없다.

enclosure는 모든 연산을 자신의 컴포넌트에 위임하되, 위임 전후에 추가 작업을 수행하여 행위를 보강(augment)할 수 있다. Lexi 편집기에서 MonoGlyph 추상 클래스가 이를 구현한다. Border는 MonoGlyph를 상속하여 테두리를 추가하고, Scroller는 스크롤 기능을 추가한다.

이 기법은 상속의 클래스 폭발 문제 없이 런타임에 장식을 추가/제거할 수 있게 해주며, Decorator 패턴의 본질이다.

## 예시

```cpp
// MonoGlyph: Decorator의 기반
class MonoGlyph : public Glyph {
protected:
    Glyph* _component;
public:
    void draw(Window* w) override {
        _component->draw(w);  // 위임
    }
};

class Border : public MonoGlyph {
public:
    void draw(Window* w) override {
        MonoGlyph::draw(w);  // 먼저 원본 그리기
        drawBorder(w);       // 그 위에 테두리 추가
    }
};

// 합성 순서로 장식 조합
Glyph* doc = new Border(new Scroller(composition));
```

## 관련 개념

- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/)
- [Recursive Composition](/knowledge/language/design-patterns/recursive-composition/)
- [Object Composition](/knowledge/language/design-patterns/object-composition/)
- [Delegation](/knowledge/language/design-patterns/delegation/)
