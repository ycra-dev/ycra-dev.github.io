---
title: "Visitor Pattern"
description: "객체 구조의 요소에 대해 수행할 연산을 표현하는 패턴이다"
tags: ['Visitor', 'Behavioral Pattern', 'Double Dispatch', 'Open For Extension']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/visitor-pattern
sidebar:
  order: 10
---

## 핵심 개념

Visitor 패턴의 핵심 의도는 객체 구조의 요소들에 적용할 연산을 요소 클래스들과 분리하여, 요소 클래스를 수정하지 않고도 새로운 연산을 추가할 수 있게 하는 것이다. 컴파일러에서 추상 구문 트리(AST)를 생각해보면, 타입 검사, 코드 최적화, 흐름 분석, 코드 생성, pretty printing 등 다양한 연산이 필요하다. 이러한 연산들을 노드 클래스에 분산시키면 시스템의 이해, 유지보수, 변경이 어려워진다. Visitor 패턴은 관련된 연산들을 별도의 visitor 객체에 패키징하고, 이 visitor를 객체 구조의 요소들에 전달하여 연산을 수행한다.

이 패턴의 동작 방식은 다음과 같다: 요소가 visitor를 "accept"하면, 요소의 클래스를 인코딩하는 요청을 visitor에게 보낸다. 예를 들어, 컴파일러에서 TypeCheckingVisitor를 생성하고 AST에 Accept 연산을 호출하면, 배정 노드는 visitor의 VisitAssignment을 호출하고, 변수 참조 노드는 VisitVariableReference를 호출한다. 이전에 AssignmentNode의 TypeCheck 연산이었던 것이 TypeCheckingVisitor의 VisitAssignment 연산이 되는 것이다. 새 연산을 추가하려면 새로운 NodeVisitor 서브클래스만 정의하면 되며, 노드 클래스를 변경할 필요가 없다.

참여자는 다섯 가지이다: **Visitor**(NodeVisitor - 객체 구조의 각 ConcreteElement 클래스에 대해 Visit 연산을 선언. 연산의 이름과 시그니처가 Visit 요청을 보내는 클래스를 식별하여, visitor가 해당 요소의 구체적 인터페이스를 통해 직접 접근 가능), **ConcreteVisitor**(TypeCheckingVisitor - Visitor가 선언한 각 연산을 구현. 각 연산은 구조의 해당 클래스 객체에 대해 정의된 알고리즘의 일부를 구현하며, ConcreteVisitor가 알고리즘의 컨텍스트를 제공하고 순회 중 누적 상태를 저장), **Element**(Node - visitor를 인자로 받는 Accept 연산 정의), **ConcreteElement**(AssignmentNode, VariableRefNode - visitor를 인자로 받는 Accept 연산 구현), **ObjectStructure**(Program - 요소들을 열거할 수 있고, Composite이나 리스트/집합 등이 될 수 있음).

핵심 메커니즘은 **이중 디스패치(double dispatch)**이다. 단일 디스패치 언어(C++, Smalltalk 등)에서 실행될 연산은 요청의 이름과 수신자의 타입 두 가지에 의해 결정된다. Visitor 패턴의 Accept는 이중 디스패치 연산으로, 실행될 연산이 Visitor의 타입과 Element의 타입 두 가지에 의존한다. Element의 Accept가 자신의 타입에 맞는 Visitor의 Visit 메서드를 호출하므로, 연산을 Element 인터페이스에 정적으로 바인딩하는 대신 Visitor에 통합하고 Accept로 런타임에 바인딩한다.

주요 결과는 여섯 가지이다: (1) **새 연산 추가 용이**: 새 visitor 서브클래스만 추가하면 된다. (2) **관련 연산의 집중과 무관한 연산의 분리**: 관련 행위가 visitor에 집중되고, 알고리즘별 데이터 구조를 visitor에 숨길 수 있다. (3) **새 ConcreteElement 추가의 어려움**: 새 요소 추가 시 모든 Visitor에 새 Visit 연산을 추가해야 한다. 따라서 요소 클래스가 안정적이고 연산이 자주 변경되는 경우에 적합하다. (4) **클래스 계층을 넘나드는 방문**: Iterator와 달리 공통 부모 클래스가 없는 객체들도 방문할 수 있다. (5) **상태 누적**: visitor가 요소를 방문하면서 상태를 누적할 수 있다(전역 변수나 추가 인자 없이). (6) **캡슐화 파괴 위험**: visitor가 작업을 수행하기 위해 ConcreteElement의 내부 상태에 접근하는 공개 연산이 필요하여 캡슐화가 약화될 수 있다.

객체 구조의 순회 책임은 세 곳에 배치할 수 있다: (1) 객체 구조 자체(Composite의 각 Accept가 자식들을 순회), (2) visitor(불규칙한 순회가 필요할 때, 예: RepeatExpression의 반복적 순회), (3) 별도의 Iterator 객체.

## 예시

```cpp
// Visitor 추상 클래스 - 각 ConcreteElement에 대한 Visit 연산 선언
class EquipmentVisitor {
public:
    virtual ~EquipmentVisitor();
    virtual void VisitFloppyDisk(FloppyDisk*);
    virtual void VisitCard(Card*);
    virtual void VisitChassis(Chassis*);
    virtual void VisitBus(Bus*);
    // 기본 구현: 아무것도 하지 않음
protected:
    EquipmentVisitor();
};

// Element - Accept 연산이 추가된 Equipment 클래스
class Equipment {
public:
    virtual ~Equipment();
    const char* Name() { return _name; }
    virtual Watt Power();
    virtual Currency NetPrice();
    virtual Currency DiscountPrice();
    virtual void Accept(EquipmentVisitor&) = 0;  // Visitor 수용
protected:
    Equipment(const char*);
private:
    const char* _name;
};

// ConcreteElement의 Accept 구현 - 이중 디스패치의 핵심
void FloppyDisk::Accept(EquipmentVisitor& visitor) {
    visitor.VisitFloppyDisk(this);  // 자신의 타입에 맞는 Visit 호출
}

// Composite 요소의 Accept - 자식 순회 후 자신의 Visit 호출
void Chassis::Accept(EquipmentVisitor& visitor) {
    ListIterator<Equipment*> i(_parts);
    for (i.First(); !i.IsDone(); i.Next()) {
        i.CurrentItem()->Accept(visitor);  // 자식 요소 순회
    }
    visitor.VisitChassis(this);  // 자신 방문
}

// ConcreteVisitor - 가격 계산 visitor
class PricingVisitor : public EquipmentVisitor {
public:
    PricingVisitor();
    Currency& GetTotalPrice();

    // 단순 장비: 정가 사용
    virtual void VisitFloppyDisk(FloppyDisk* e) {
        _total += e->NetPrice();
    }
    virtual void VisitCard(Card* e) {
        _total += e->NetPrice();
    }

    // 복합 장비: 할인가 사용
    virtual void VisitChassis(Chassis* e) {
        _total += e->DiscountPrice();
    }
    virtual void VisitBus(Bus* e) {
        _total += e->DiscountPrice();
    }
private:
    Currency _total;  // 순회 중 상태 누적
};

// ConcreteVisitor - 재고 조사 visitor
class InventoryVisitor : public EquipmentVisitor {
public:
    InventoryVisitor();
    Inventory& GetInventory();

    virtual void VisitFloppyDisk(FloppyDisk*);
    virtual void VisitCard(Card*);
    virtual void VisitChassis(Chassis*);
    virtual void VisitBus(Bus*);
    // 각 Visit에서 해당 장비 유형의 수량을 Inventory에 기록
private:
    Inventory _inventory;  // 누적 상태
};

// 사용 예
Equipment* component = CreateEquipmentStructure();

// 가격 계산
PricingVisitor pricingVisitor;
component->Accept(pricingVisitor);
cout << "총 비용: " << pricingVisitor.GetTotalPrice() << endl;

// 재고 조사 - 동일한 구조에 다른 연산 적용
InventoryVisitor inventoryVisitor;
component->Accept(inventoryVisitor);
inventoryVisitor.GetInventory().Show();

// 새 연산 추가 시: 새로운 EquipmentVisitor 서브클래스만 정의
// Equipment 클래스 계층은 전혀 수정할 필요 없음
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - Visitor는 Composite 패턴으로 정의된 객체 구조에 연산을 적용하는 데 자주 사용된다
- [Iterator Pattern](/knowledge/language/design-patterns/iterator-pattern/) - Iterator로 구조를 순회하면서 각 요소에 Visitor를 적용할 수 있다. 순회 책임을 별도의 Iterator에 맡길 수 있다
- [Interpreter Pattern](/knowledge/language/design-patterns/interpreter-pattern/) - Visitor를 사용하여 인터프리터 패턴의 해석(interpretation)을 수행할 수 있다
- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - 두 패턴 모두 알고리즘을 캡슐화하지만, Visitor는 객체 구조의 요소별로 다른 연산을 정의하고 Strategy는 단일 알고리즘을 캡슐화한다
