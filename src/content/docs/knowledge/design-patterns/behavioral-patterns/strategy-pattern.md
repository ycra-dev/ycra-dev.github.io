---
title: "전략 패턴 (Strategy Pattern)"
description: "알고리즘의 가족을 정의하고 각각을 캡슐화하여 상호 교환 가능하게 만드는 패턴이다"
tags: ['Strategy', 'Behavioral Pattern', 'Algorithm Encapsulation', 'Interchangeable']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/strategy-pattern
sidebar:
  order: 1
---

## 핵심 개념

Strategy 패턴의 핵심 의도는 다양한 알고리즘이 존재할 때, 이들을 각각의 클래스로 캡슐화하여 런타임에 교체할 수 있도록 하는 것이다. 알고리즘을 필요로 하는 클래스에 직접 하드코딩하면 클라이언트가 복잡해지고, 유지보수가 어려워지며, 새 알고리즘을 추가하거나 기존 것을 변경하기 어렵다. Strategy 패턴은 알고리즘을 정의하는 클래스 계층을 통해 이 문제를 해결한다.

대표적인 동기 사례는 텍스트의 줄 바꿈(linebreaking) 알고리즘이다. Composition 클래스가 텍스트의 줄 바꿈을 유지 관리하되, 줄 바꿈 전략은 직접 구현하지 않고 추상 Compositor 클래스의 서브클래스에서 구현한다. SimpleCompositor는 한 줄씩 줄 바꿈을 결정하는 단순 전략, TeXCompositor는 문단 전체를 고려하여 전역 최적화하는 TeX 알고리즘, ArrayCompositor는 각 행에 고정 개수의 항목을 배치하는 전략을 각각 구현한다. Composition은 Compositor 객체에 대한 참조를 유지하고, 텍스트를 재포맷할 때 이 Compositor에 책임을 전달한다.

참여자는 세 가지이다: **Strategy**(Compositor - 지원하는 모든 알고리즘에 공통인 인터페이스 선언. Context가 이 인터페이스를 통해 ConcreteStrategy가 정의한 알고리즘을 호출), **ConcreteStrategy**(SimpleCompositor, TeXCompositor, ArrayCompositor - Strategy 인터페이스를 사용하여 알고리즘 구현), **Context**(Composition - ConcreteStrategy 객체로 구성됨, Strategy 객체에 대한 참조 유지, Strategy가 데이터에 접근할 수 있는 인터페이스 정의 가능).

주요 결과는 일곱 가지이다: (1) **관련 알고리즘의 가족**: Strategy 클래스의 계층이 Context가 재사용할 수 있는 알고리즘 가족을 정의하며, 상속을 통해 공통 기능을 분리할 수 있다. (2) **서브클래싱의 대안**: Context를 직접 서브클래싱하여 행위를 변경하는 대신, 알고리즘을 별도의 Strategy 클래스로 캡슐화하여 독립적으로 변경할 수 있다. (3) **조건문 제거**: 서로 다른 행위가 하나의 클래스에 몰리면 조건문으로 행위를 선택해야 하지만, Strategy 패턴은 행위를 별도 클래스로 캡슐화하여 조건문을 제거한다. (4) **구현의 선택**: 동일 행위의 서로 다른 시간/공간 트레이드오프 구현을 클라이언트가 선택할 수 있다. (5) **클라이언트의 Strategy 인지 필요**: 적절한 Strategy를 선택하기 위해 클라이언트가 각 Strategy의 차이를 이해해야 한다. (6) **Strategy-Context 간 통신 오버헤드**: 모든 ConcreteStrategy가 Strategy 인터페이스를 공유하므로, 일부 단순한 ConcreteStrategy는 전달받는 정보를 모두 사용하지 않아 낭비가 발생할 수 있다. (7) **객체 수 증가**: 상태 없는 Strategy를 Context들이 공유하도록 하여 Flyweight 패턴으로 이를 완화할 수 있다.

구현 시 주요 이슈로는 (1) Strategy와 Context 인터페이스 설계(데이터를 파라미터로 전달 vs Context 자체를 인자로 전달 vs Strategy가 Context 참조 보유), (2) C++ 템플릿을 이용한 컴파일 타임 Strategy 바인딩(런타임 변경이 불필요하고 효율성을 높이고 싶을 때), (3) Strategy 객체를 선택적(optional)으로 만들어 클라이언트가 기본 행위로 충분하면 Strategy를 다룰 필요 없게 하기 등이 있다.

## 예시

```cpp
// Strategy 추상 클래스 - 줄 바꿈 알고리즘 인터페이스
class Compositor {
public:
    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    ) = 0;
protected:
    Compositor();
};

// Context - 텍스트 조합 (Strategy 객체로 구성)
class Composition {
public:
    Composition(Compositor*);
    void Repair();  // 재포맷 시 Strategy에 위임
private:
    Compositor* _compositor;
    Component* _components;
    int _componentCount;
    int _lineWidth;
    int* _lineBreaks;
    int _lineCount;
};

void Composition::Repair() {
    Coord* natural;
    Coord* stretchability;
    Coord* shrinkability;
    int componentCount;
    int* breaks;

    // 컴포넌트의 크기 정보 초기화...

    // Strategy에 줄 바꿈 계산 위임 ("데이터를 전략에 전달")
    int breakCount = _compositor->Compose(
        natural, stretchability, shrinkability,
        componentCount, _lineWidth, breaks
    );

    // 줄 바꿈에 따라 컴포넌트 배치...
}

// ConcreteStrategy - 한 줄씩 단순 줄 바꿈
class SimpleCompositor : public Compositor {
public:
    SimpleCompositor();
    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    );
    // stretchability를 무시하고 natural width만 고려
};

// ConcreteStrategy - TeX 전역 최적화 줄 바꿈
class TeXCompositor : public Compositor {
public:
    TeXCompositor();
    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    );
    // 문단 전체를 고려하여 공백 최소화, 모든 파라미터 활용
};

// ConcreteStrategy - 고정 간격 줄 바꿈
class ArrayCompositor : public Compositor {
public:
    ArrayCompositor(int interval);
    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    );
    // 모든 파라미터를 무시하고 일정 간격으로 줄 바꿈
};

// 사용 예: 서로 다른 Strategy로 Composition 인스턴스화
Composition* quick = new Composition(new SimpleCompositor);
Composition* slick = new Composition(new TeXCompositor);
Composition* iconic = new Composition(new ArrayCompositor(100));

// 조건문 제거 효과:
// 이전 코드 (조건문 방식)
// void Composition::Repair() {
//     switch (_breakingStrategy) {
//         case SimpleStrategy:    ComposeWithSimple(); break;
//         case TeXStrategy:       ComposeWithTeX();    break;
//         case ArrayStrategy:     ComposeWithArray();  break;
//     }
// }
//
// Strategy 패턴 적용 후: _compositor->Compose(...) 한 줄로 대체
```

## 관련 개념

- [State Pattern](/knowledge/language/design-patterns/state-pattern/) - 구조적으로 유사하지만, Strategy는 알고리즘을 교체하고 State는 상태에 따른 행위를 변경한다
- [Template Method](/knowledge/language/design-patterns/template-method/) - Template Method는 상속을 통해 알고리즘의 일부를 변경하고, Strategy는 위임을 통해 전체 알고리즘을 변경한다
- [Flyweight Pattern](/knowledge/language/design-patterns/flyweight-pattern/) - 상태 없는 Strategy 객체는 Flyweight로 공유될 수 있다
- [Delegation](/knowledge/language/design-patterns/delegation/) - Context가 Strategy 객체에 알고리즘 실행을 위임하는 것이 패턴의 핵심 메커니즘이다
