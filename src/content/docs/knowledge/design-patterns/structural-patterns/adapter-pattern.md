---
title: "어댑터 패턴 (Adapter Pattern)"
description: "Adapter 패턴은 클래스의 인터페이스를 클라이언트가 기대하는 다른 인터페이스로 변환하여, 호환되지 않는 인터페이스를 가진 클래스들이 함께 동작할 수 있도록 한다"
tags: ['Adapter', 'Structural Pattern', 'Wrapper', 'Interface Conversion']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/adapter-pattern
sidebar:
  order: 1
---

## 핵심 개념

### 의도와 동기

Adapter 패턴의 핵심 의도는 기존 클래스를 재사용하고 싶지만, 그 인터페이스가 요구하는 도메인 특화 인터페이스와 맞지 않을 때 이를 해결하는 것이다. 예를 들어, 그래픽 편집기에서 Shape 추상 클래스의 인터페이스를 기대하는데, 기존의 TextView 클래스는 완전히 다른 인터페이스를 가지고 있다. TextView를 수정하는 것은 현실적이지 않으므로, TextShape라는 어댑터를 두어 TextView의 인터페이스를 Shape에 맞게 변환한다.

### 두 가지 형태: 클래스 어댑터와 객체 어댑터

어댑터에는 두 가지 형태가 있다. **클래스 어댑터(Class Adapter)**는 다중 상속을 사용하여 Target 인터페이스를 공개적으로(public) 상속하고 Adaptee 구현을 비공개적으로(private) 상속한다. C++에서는 Target을 public 상속, Adaptee를 private 상속하여 구현한다. 반면 **객체 어댑터(Object Adapter)**는 객체 합성(composition)을 사용하여 Adaptee 인스턴스에 대한 포인터를 유지하며, 요청을 위임한다.

### 적용 가능성

다음과 같은 상황에서 Adapter 패턴을 사용한다: (1) 기존 클래스를 사용하고 싶지만 인터페이스가 맞지 않을 때, (2) 서로 관련 없거나 예상치 못한 클래스와 협력할 수 있는 재사용 가능한 클래스를 만들고 싶을 때, (3) 객체 어댑터만 해당되지만 여러 기존 서브클래스의 인터페이스를 적용해야 하지만 모든 서브클래스를 개별적으로 서브클래싱하는 것이 비현실적일 때.

### 참여자

- **Target** (Shape): 클라이언트가 사용하는 도메인 특화 인터페이스를 정의한다.
- **Client** (DrawingEditor): Target 인터페이스를 따르는 객체와 협력한다.
- **Adaptee** (TextView): 적용이 필요한 기존 인터페이스를 정의한다.
- **Adapter** (TextShape): Adaptee의 인터페이스를 Target 인터페이스에 맞게 변환한다.

### 결과와 트레이드오프

클래스 어댑터는 구체적인 Adaptee 클래스 하나에 종속되므로 Adaptee와 그 서브클래스 모두를 적용할 수 없다. 하지만 Adaptee의 행위를 오버라이드할 수 있고, 추가적인 포인터 간접 참조 없이 하나의 객체만 도입한다. 객체 어댑터는 하나의 Adapter로 여러 Adaptee(Adaptee 자체와 모든 서브클래스)와 작동할 수 있지만, Adaptee 행위를 오버라이드하기가 더 어렵다. 또한 **플러거블 어댑터(Pluggable Adapter)**를 통해 인터페이스 적용을 클래스에 내장할 수 있으며, **양방향 어댑터(Two-way Adapter)**는 다중 상속을 이용해 두 인터페이스를 모두 지원한다.

## 예시

### Shape와 TextView의 클래스 어댑터 (C++)

```cpp
// Target 인터페이스
class Shape {
public:
    Shape();
    virtual void BoundingBox(
        Point& bottomLeft, Point& topRight
    ) const;
    virtual Manipulator* CreateManipulator() const;
};

// Adaptee - 기존의 호환되지 않는 클래스
class TextView {
public:
    TextView();
    void GetOrigin(Coord& x, Coord& y) const;
    void GetExtent(Coord& width, Coord& height) const;
    virtual bool IsEmpty() const;
};

// 클래스 어댑터: public으로 Target 상속, private으로 Adaptee 상속
class TextShape : public Shape, private TextView {
public:
    TextShape();

    // Shape 인터페이스를 TextView에 맞게 변환
    virtual void BoundingBox(
        Point& bottomLeft, Point& topRight
    ) const;

    virtual bool IsEmpty() const;

    // TextView에 없는 기능을 직접 구현
    virtual Manipulator* CreateManipulator() const;
};

// BoundingBox 구현: TextView의 인터페이스를 Shape에 맞게 변환
void TextShape::BoundingBox(
    Point& bottomLeft, Point& topRight
) const {
    Coord bottom, left, width, height;
    GetOrigin(bottom, left);
    GetExtent(width, height);
    bottomLeft = Point(bottom, left);
    topRight = Point(bottom + height, left + width);
}

// 단순 전달(forwarding)의 예
bool TextShape::IsEmpty() const {
    return TextView::IsEmpty();
}

// Adaptee에 없는 기능을 새로 구현
Manipulator* TextShape::CreateManipulator() const {
    return new TextManipulator(this);
}
```

### 객체 어댑터 (C++)

```cpp
// 객체 어댑터: 합성을 이용
class TextShape : public Shape {
public:
    TextShape(TextView* t);

    virtual void BoundingBox(
        Point& bottomLeft, Point& topRight
    ) const;

    virtual bool IsEmpty() const;
    virtual Manipulator* CreateManipulator() const;
private:
    TextView* _text;  // Adaptee에 대한 포인터
};

TextShape::TextShape(TextView* t) {
    _text = t;
}

// TextView 객체에 위임하여 인터페이스 변환
void TextShape::BoundingBox(
    Point& bottomLeft, Point& topRight
) const {
    Coord bottom, left, width, height;
    _text->GetOrigin(bottom, left);
    _text->GetExtent(width, height);
    bottomLeft = Point(bottom, left);
    topRight = Point(bottom + height, left + width);
}

bool TextShape::IsEmpty() const {
    return _text->IsEmpty();
}

Manipulator* TextShape::CreateManipulator() const {
    return new TextManipulator(this);
}
```

객체 어댑터 버전의 TextShape는 TextView의 서브클래스와도 동일하게 작동한다. 클라이언트가 TextView 서브클래스의 인스턴스를 TextShape 생성자에 전달하기만 하면 된다.

## 관련 개념

- [Bridge Pattern](/knowledge/language/design-patterns/bridge-pattern/) - Bridge와 구조는 유사하지만, Bridge는 추상화와 구현을 분리하여 독립적으로 변화시키려는 의도이고 Adapter는 기존 객체의 인터페이스를 변경하려는 의도이다.
- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/) - Decorator는 인터페이스를 변경하지 않고 객체를 투명하게 감싸며, 재귀적 합성을 지원한다.
- [Proxy Pattern](/knowledge/language/design-patterns/proxy-pattern/) - Proxy는 다른 객체의 대리자 역할을 하며 인터페이스를 변경하지 않는다.
