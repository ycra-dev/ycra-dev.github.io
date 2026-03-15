---
title: "데코레이터 패턴 (Decorator Pattern)"
description: "Decorator 패턴은 객체에 동적으로 새로운 책임을 추가하며, 기능 확장을 위해 서브클래싱 대신 사용할 수 있는 유연한 대안을 제공한다"
tags: ['Decorator', 'Structural Pattern', 'Wrapper', 'Dynamic Extension']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/decorator-pattern
sidebar:
  order: 4
---

## 핵심 개념

### 의도와 동기

개별 객체에 책임을 추가하고 싶을 때 상속을 사용하면 선택이 정적으로 이루어져 유연하지 않다. 더 유연한 접근법은 컴포넌트를 다른 객체로 감싸는 것이다. 감싸는 객체를 **데코레이터(decorator)**라 하며, 데코레이터는 자신이 꾸미는 컴포넌트의 인터페이스를 따르므로 클라이언트에게 투명하다. 데코레이터는 요청을 컴포넌트에 전달하면서 전달 전후에 추가 작업(예: 테두리 그리기)을 수행할 수 있다. 투명성 덕분에 데코레이터를 재귀적으로 중첩할 수 있어 무한한 수의 책임을 추가할 수 있다.

예를 들어, TextView에 스크롤바가 필요하면 ScrollDecorator로, 두꺼운 검은 테두리가 필요하면 BorderDecorator로 감싸면 된다. 이 두 데코레이터를 합성하면 테두리가 있는 스크롤 가능한 텍스트 뷰를 얻는다.

### 적용 가능성

다음과 같은 경우에 Decorator를 사용한다: (1) 개별 객체에 동적으로, 투명하게 책임을 추가하고 싶을 때, (2) 추후 철회 가능한 책임을 추가할 때, (3) 서브클래싱에 의한 확장이 비현실적일 때 -- 독립적인 확장이 다수 가능하여 모든 조합을 지원하면 서브클래스가 폭발적으로 증가하거나, 클래스 정의가 숨겨져 있거나 서브클래싱이 불가능할 때.

### 참여자

- **Component** (VisualComponent): 동적으로 책임이 추가될 수 있는 객체의 인터페이스를 정의한다.
- **ConcreteComponent** (TextView): 추가적인 책임이 부착될 수 있는 객체를 정의한다.
- **Decorator**: Component 객체에 대한 참조를 유지하고, Component의 인터페이스를 따르는 인터페이스를 정의한다.
- **ConcreteDecorator** (BorderDecorator, ScrollDecorator): 컴포넌트에 책임을 추가한다.

### 결과와 트레이드오프

**장점**: (1) 정적 상속보다 유연하다. 런타임에 책임을 추가하고 제거할 수 있으며, 다양한 Decorator 클래스를 조합할 수 있다. 같은 데코레이터를 두 번 적용(예: 이중 테두리)하는 것도 가능하다. (2) 기능이 과도한 상위 클래스를 피할 수 있다. 모든 기능을 복잡한 클래스에 넣는 대신 단순한 클래스를 정의하고 Decorator로 점진적으로 기능을 추가하는 "필요한 만큼만 지불(pay-as-you-go)" 접근법이다.

**단점**: (3) 데코레이터와 컴포넌트는 동일하지 않다(identity). 장식된 컴포넌트는 원래 컴포넌트와 객체 동일성(identity)이 다르므로, 객체 동일성에 의존하면 안 된다. (4) 많은 작은 객체가 생긴다. 데코레이터를 사용하는 설계는 모두 비슷하게 보이는 많은 작은 객체로 구성되어, 이해하기는 쉽지만 학습과 디버깅이 어려울 수 있다.

### 구현 시 주의사항

Component 클래스는 가볍게 유지하는 것이 중요하다. 인터페이스 정의에 집중하고, 데이터 저장은 서브클래스에 맡겨야 한다. Component에 많은 기능이나 데이터를 넣으면 데코레이터가 너무 무거워진다. 데코레이터가 하나만 필요한 경우 추상 Decorator 클래스를 생략하고 ConcreteDecorator에 전달 책임을 합칠 수 있다. 또한 객체의 "겉모습(skin)"을 바꾸는 Decorator 대신 "내부(guts)"를 바꾸려면 Strategy 패턴이 더 적합하다.

## 예시

### VisualComponent와 Decorator (C++)

```cpp
// Component: 시각적 컴포넌트의 추상 인터페이스
class VisualComponent {
public:
    VisualComponent();

    virtual void Draw();
    virtual void Resize();
    // ...
};

// Decorator: Component를 감싸는 추상 클래스
class Decorator : public VisualComponent {
public:
    Decorator(VisualComponent*);

    virtual void Draw();
    virtual void Resize();
    // ...
private:
    VisualComponent* _component;  // 감싸는 컴포넌트에 대한 참조
};

// 기본 구현: 요청을 컴포넌트에 전달
void Decorator::Draw() {
    _component->Draw();
}

void Decorator::Resize() {
    _component->Resize();
}
```

### ConcreteDecorator: 테두리 추가

```cpp
// BorderDecorator: 테두리를 추가하는 구체적 데코레이터
class BorderDecorator : public Decorator {
public:
    BorderDecorator(VisualComponent*, int borderWidth);

    virtual void Draw();
private:
    void DrawBorder(int);

    int _width;
};

void BorderDecorator::Draw() {
    Decorator::Draw();      // 먼저 원래 컴포넌트를 그린다
    DrawBorder(_width);     // 그 다음 테두리를 그린다
}
```

### 데코레이터 합성: 테두리가 있는 스크롤 가능한 텍스트 뷰

```cpp
// 윈도우에 내용물을 설정하는 함수
void Window::SetContents(VisualComponent* contents);

// 사용 코드
Window* window = new Window;
TextView* textView = new TextView;

// 데코레이터를 중첩하여 합성
// 1. ScrollDecorator로 스크롤 기능 추가
// 2. BorderDecorator로 테두리 추가
window->SetContents(
    new BorderDecorator(
        new ScrollDecorator(textView), 1
    )
);
```

Window는 VisualComponent 인터페이스를 통해 내용물에 접근하므로, 데코레이터의 존재를 알지 못한다. 데코레이터를 추가하거나 제거해도 Window 코드를 변경할 필요가 없다.

### Stream 데코레이터: I/O에서의 활용

```cpp
// Stream 데코레이터: 압축 + 7비트 ASCII 변환
Stream* aStream = new CompressingStream(
    new ASCII7Stream(
        new FileStream("aFileName")
    )
);

// FileStream -> ASCII7Stream으로 7비트 변환 -> CompressingStream으로 압축
// 데코레이터 체인을 통해 데이터가 처리된다
```

이 예시는 GUI뿐 아니라 I/O 스트림 같은 다양한 도메인에서도 Decorator 패턴이 유용함을 보여준다.

## 관련 개념

- [Transparent Enclosure](/knowledge/language/design-patterns/transparent-enclosure/) - Decorator의 핵심 메커니즘으로, 컴포넌트를 투명하게 감싸서 동일한 인터페이스를 제공한다.
- [Adapter Pattern](/knowledge/language/design-patterns/adapter-pattern/) - Adapter는 인터페이스를 변경하지만 Decorator는 인터페이스를 변경하지 않고 책임만 추가한다.
- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - Decorator는 컴포넌트 하나만을 가진 퇴화된(degenerate) Composite로 볼 수 있지만, 목적은 객체 집합이 아닌 책임 추가이다.
- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - Decorator가 객체의 "겉모습"을 바꾼다면, Strategy는 객체의 "내부"를 바꾼다. Component가 본질적으로 무거울 때는 Strategy가 더 적합하다.
