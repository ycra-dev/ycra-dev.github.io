---
title: "이터레이터 패턴 (Iterator Pattern)"
description: "내부 표현 방식을 노출하지 않으면서 집합체(aggregate) 객체의 요소들을 순차적으로 접근할 수 있는 방법을 제공하는 패턴이다"
tags: ['Iterator', 'Behavioral Pattern', 'Traversal', 'Aggregate Access']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/iterator-pattern
sidebar:
  order: 6
---

## 핵심 개념

Iterator 패턴의 핵심 의도는 집합체 객체의 접근과 순회 책임을 집합체 자체에서 분리하여 별도의 이터레이터 객체에 맡기는 것이다. 리스트와 같은 집합체 객체는 내부 구조를 노출하지 않고도 요소에 접근하는 방법을 제공해야 하며, 다양한 순회 방식을 지원해야 하고, 동일한 집합체에 대해 여러 순회가 동시에 진행될 수 있어야 한다. Iterator 클래스가 이러한 요소 접근 인터페이스(First, Next, IsDone, CurrentItem)를 정의하고, 현재 요소의 추적 책임을 담당한다.

이 패턴에서 다형적 이터레이션(polymorphic iteration)은 중요한 개념이다. AbstractList와 같은 추상 클래스가 공통 인터페이스를 제공하고, 구체적인 리스트 구현(List, SkipList)마다 대응하는 ConcreteIterator를 갖는다. CreateIterator 팩토리 메서드를 통해 클라이언트가 구체적인 리스트 클래스에 독립적인 코드를 작성할 수 있게 된다. 이로써 이터레이션 메커니즘이 구체적인 집합체 클래스로부터 독립적이 된다.

참여자는 네 가지이다: **Iterator**(요소 접근 및 순회 인터페이스 정의), **ConcreteIterator**(Iterator 인터페이스 구현, 순회 중 현재 위치 추적), **Aggregate**(Iterator 객체를 생성하는 인터페이스 정의), **ConcreteAggregate**(적절한 ConcreteIterator 인스턴스를 반환하는 Iterator 생성 인터페이스 구현).

구현 시 중요한 이슈들이 있다. (1) **외부 이터레이터 vs 내부 이터레이터**: 외부(external) 이터레이터는 클라이언트가 순회를 제어하며 더 유연하다(두 컬렉션 비교 등). 내부(internal) 이터레이터는 이터레이터가 순회를 제어하며 사용이 더 쉽지만, C++에서는 익명 함수가 없어 제한적이다. (2) **순회 알고리즘의 주체**: 이터레이터가 알고리즘을 정의하면 동일 집합체에 다른 순회를 쉽게 적용할 수 있지만, 집합체의 private 변수 접근 문제가 발생한다. 집합체가 알고리즘을 정의하고 이터레이터를 커서로만 사용하는 방법도 있다. (3) **강건한(robust) 이터레이터**: 순회 중 집합체가 수정되어도 안전하게 작동하도록, 이터레이터를 집합체에 등록하여 삽입/삭제 시 상태를 조정한다. (4) **NullIterator**: IsDone이 항상 true인 퇴화된 이터레이터로, Composite 같은 트리 구조에서 경계 조건 처리에 유용하다. C++에서 다형적 이터레이터는 힙에 할당되므로 메모리 누수 방지를 위해 Proxy 패턴(IteratorPtr)을 활용할 수 있다.

주요 결과는 세 가지이다: (1) 집합체 순회의 다양한 변형 지원 - 이터레이터 인스턴스만 교체하면 순회 알고리즘 변경 가능, (2) Aggregate 인터페이스 단순화 - 순회 관련 인터페이스가 Iterator로 이동, (3) 하나의 집합체에 대해 여러 순회가 동시에 진행 가능.

## 예시

```cpp
// 추상 Iterator 인터페이스
template <class Item>
class Iterator {
public:
    virtual void First() = 0;
    virtual void Next() = 0;
    virtual bool IsDone() const = 0;
    virtual Item CurrentItem() const = 0;
protected:
    Iterator();
};

// 구체적 이터레이터 - 전방 순회
template <class Item>
class ListIterator : public Iterator<Item> {
public:
    ListIterator(const List<Item>* aList);
    virtual void First();
    virtual void Next();
    virtual bool IsDone() const;
    virtual Item CurrentItem() const;
private:
    const List<Item>* _list;
    long _current;
};

template <class Item>
void ListIterator<Item>::First() { _current = 0; }

template <class Item>
void ListIterator<Item>::Next() { _current++; }

template <class Item>
bool ListIterator<Item>::IsDone() const {
    return _current >= _list->Count();
}

template <class Item>
Item ListIterator<Item>::CurrentItem() const {
    if (IsDone()) { throw IteratorOutOfBounds; }
    return _list->Get(_current);
}

// 다형적 이터레이션을 위한 팩토리 메서드
template <class Item>
class AbstractList {
public:
    virtual Iterator<Item>* CreateIterator() const = 0;
    // ...
};

template <class Item>
Iterator<Item>* List<Item>::CreateIterator() const {
    return new ListIterator<Item>(this);
}

// 이터레이터 자동 정리를 위한 Proxy (IteratorPtr)
template <class Item>
class IteratorPtr {
public:
    IteratorPtr(Iterator<Item>* i) : _i(i) { }
    ~IteratorPtr() { delete _i; }  // 소멸 시 자동 정리
    Iterator<Item>* operator->() { return _i; }
    Iterator<Item>& operator*() { return *_i; }
private:
    Iterator<Item>* _i;
};

// 사용 예: 구체적 리스트 구현에 독립적인 코드
void PrintEmployees(AbstractList<Employee*>& list) {
    IteratorPtr<Employee*> i(list.CreateIterator());
    for (i->First(); !i->IsDone(); i->Next()) {
        i->CurrentItem()->Print();
    }
    // IteratorPtr가 스코프를 벗어나면 이터레이터 자동 삭제
}

// 내부 이터레이터 예시 - 서브클래싱 방식
template <class Item>
class ListTraverser {
public:
    ListTraverser(List<Item>* aList);
    bool Traverse();  // 순회 시작
protected:
    virtual bool ProcessItem(const Item&) = 0;  // 서브클래스가 오버라이드
private:
    ListIterator<Item> _iterator;
};

template <class Item>
bool ListTraverser<Item>::Traverse() {
    bool result = false;
    for (_iterator.First(); !_iterator.IsDone(); _iterator.Next()) {
        result = ProcessItem(_iterator.CurrentItem());
        if (result == false) { break; }  // 조기 종료 가능
    }
    return result;
}
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - 재귀적 구조인 Composite에 Iterator가 자주 적용된다
- [Factory Method](/knowledge/language/design-patterns/factory-method/) - 다형적 이터레이터는 팩토리 메서드에 의존하여 적절한 Iterator 서브클래스를 인스턴스화한다
- [Memento Pattern](/knowledge/language/design-patterns/memento-pattern/) - 이터레이션 상태를 캡처하기 위해 Memento와 함께 사용될 수 있다
- [Visitor Pattern](/knowledge/language/design-patterns/visitor-pattern/) - Iterator로 구조를 순회하면서 Visitor로 각 요소에 연산을 적용할 수 있다
