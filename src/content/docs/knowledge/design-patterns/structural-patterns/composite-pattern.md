---
title: "Composite Pattern"
description: "Composite 패턴은 객체들을 트리 구조로 구성하여 부분-전체 계층(part-whole hierarchy)을 표현하며, 클라이언트가 개별 객체와 복합 객체를 동일하게 다룰 수 있게 한다"
tags: ['Composite', 'Structural Pattern', 'Tree Structure', 'Part Whole Hierarchy']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/composite-pattern
sidebar:
  order: 3
---

## 핵심 개념

### 의도와 동기

그래픽 편집기 같은 애플리케이션에서는 사용자가 단순한 컴포넌트로 복잡한 다이어그램을 만들고, 컴포넌트를 그룹으로 묶어 더 큰 컴포넌트를 구성한다. 이때 기본 객체(primitive)와 컨테이너 객체를 다르게 처리해야 한다면 코드가 복잡해진다. Composite 패턴은 재귀적 합성(recursive composition)을 사용하여 클라이언트가 이러한 구분을 할 필요가 없게 만든다. 핵심은 기본 객체와 컨테이너 모두를 대표하는 추상 클래스를 정의하는 것이다. 예를 들어, Graphic 추상 클래스는 Draw 같은 연산과 자식 관리 연산을 모두 선언하며, Line/Rectangle/Text는 기본 객체, Picture는 Graphic 객체의 집합체로서 재귀적으로 다른 Picture를 포함할 수 있다.

### 적용 가능성

Composite 패턴은 다음과 같은 경우에 사용한다: (1) 객체의 부분-전체 계층을 표현하고자 할 때, (2) 클라이언트가 개별 객체와 복합 객체의 차이를 무시하고 모든 객체를 동일하게 다루도록 하고 싶을 때.

### 참여자

- **Component** (Graphic): 합성 내 객체들의 인터페이스를 선언하고, 모든 클래스에 공통인 인터페이스의 기본 행위를 구현하며, 자식 컴포넌트에 접근하고 관리하는 인터페이스를 선언한다. 선택적으로 재귀 구조에서 부모에 접근하는 인터페이스를 정의한다.
- **Leaf** (Rectangle, Line, Text 등): 합성의 말단 객체를 나타내며 자식이 없다. 기본 객체의 행위를 정의한다.
- **Composite** (Picture): 자식을 가진 컴포넌트의 행위를 정의하고, 자식 컴포넌트를 저장하며, Component 인터페이스의 자식 관련 연산을 구현한다.
- **Client**: Component 인터페이스를 통해 합성 내 객체를 조작한다.

### 핵심 설계 결정: 투명성 vs 안전성

Composite 패턴에서 가장 중요한 설계 결정은 자식 관리 연산(Add, Remove)을 어디에 선언할 것인가이다. **투명성(Transparency)**: Component 루트에 자식 관리 인터페이스를 정의하면 모든 컴포넌트를 동일하게 다룰 수 있지만, 클라이언트가 Leaf에 자식을 추가하는 등 무의미한 작업을 시도할 수 있다. **안전성(Safety)**: Composite 클래스에만 자식 관리를 정의하면 컴파일 타임에 잘못된 조작을 방지할 수 있지만, Leaf와 Composite의 인터페이스가 달라져 투명성을 잃는다. GoF 책에서는 투명성을 더 강조하며, 기본적으로 Add와 Remove가 실패하도록(예외 발생) 구현하는 것을 권장한다.

### 결과

Composite 패턴은 기본 객체와 복합 객체로 구성된 클래스 계층을 정의하며, 재귀적으로 구성할 수 있다. 클라이언트를 단순화하여 Leaf인지 Composite인지 알 필요 없이 동일하게 다룰 수 있다. 새로운 종류의 컴포넌트를 쉽게 추가할 수 있지만, 합성 요소에 제약을 두기가 어려워 설계가 지나치게 일반적이 될 수 있다.

## 예시

### Equipment 합성 계층 (C++)

```cpp
// Component: 모든 장비의 추상 인터페이스
class Equipment {
public:
    virtual ~Equipment();

    const char* Name() { return _name; }

    virtual Watt Power();
    virtual Currency NetPrice();
    virtual Currency DiscountPrice();

    // 자식 관리 연산
    virtual void Add(Equipment*);
    virtual void Remove(Equipment*);
    virtual Iterator<Equipment*>* CreateIterator();

protected:
    Equipment(const char*);
private:
    const char* _name;
};

// Leaf: 기본 장비 (자식 없음)
class FloppyDisk : public Equipment {
public:
    FloppyDisk(const char*);
    virtual ~FloppyDisk();

    virtual Watt Power();
    virtual Currency NetPrice();
    virtual Currency DiscountPrice();
};

// Composite: 다른 장비를 포함하는 복합 장비
class CompositeEquipment : public Equipment {
public:
    virtual ~CompositeEquipment();

    virtual Watt Power();
    virtual Currency NetPrice();
    virtual Currency DiscountPrice();

    virtual void Add(Equipment*);
    virtual void Remove(Equipment*);
    virtual Iterator<Equipment*>* CreateIterator();

protected:
    CompositeEquipment(const char*);
private:
    List<Equipment*> _equipment;  // 자식 장비 목록
};

// NetPrice의 기본 구현: 모든 자식의 순가격 합산
Currency CompositeEquipment::NetPrice() {
    Iterator<Equipment*>* i = CreateIterator();
    Currency total = 0;

    for (i->First(); !i->IsDone(); i->Next()) {
        total += i->CurrentItem()->NetPrice();
    }
    delete i;
    return total;
}
```

### Composite를 이용한 컴퓨터 조립

```cpp
// 구체적인 Composite: Chassis (컴퓨터 본체)
class Chassis : public CompositeEquipment {
public:
    Chassis(const char*);
    virtual ~Chassis();

    virtual Watt Power();
    virtual Currency NetPrice();
    virtual Currency DiscountPrice();
};

// 클라이언트 코드: 트리 구조로 장비 조립
Cabinet* cabinet = new Cabinet("PC Cabinet");
Chassis* chassis = new Chassis("PC Chassis");

cabinet->Add(chassis);

Bus* bus = new Bus("MCA Bus");
bus->Add(new Card("16Mbs Token Ring"));

chassis->Add(bus);
chassis->Add(new FloppyDisk("3.5in Floppy"));

// 전체 가격 계산 - Leaf와 Composite 구분 없이 동일하게 처리
cout << "The net price is " << chassis->NetPrice() << endl;
```

개별 FloppyDisk(Leaf)와 Chassis(Composite) 모두 동일한 NetPrice() 인터페이스를 통해 가격을 계산할 수 있다.

## 관련 개념

- [Recursive Composition](/knowledge/language/design-patterns/recursive-composition/) - Composite 패턴의 핵심 기법으로, 객체가 자신과 같은 타입의 객체를 포함하는 구조이다.
- [Iterator Pattern](/knowledge/language/design-patterns/iterator-pattern/) - Composite의 자식을 순회하는 데 Iterator를 사용하며, 자식 순서가 중요할 때 특히 유용하다.
- [Visitor Pattern](/knowledge/language/design-patterns/visitor-pattern/) - Composite와 Leaf 클래스에 분산된 연산과 행위를 한 곳에 모을 수 있다.
- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/) - Decorator와 Composite는 구조가 유사하며 함께 사용되는 경우가 많다. Decorator는 Composite의 관점에서 Leaf이고, Composite는 Decorator의 관점에서 ConcreteComponent이다.
