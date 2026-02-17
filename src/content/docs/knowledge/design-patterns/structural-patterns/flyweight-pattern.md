---
title: "Flyweight Pattern"
description: "Flyweight 패턴은 공유(sharing)를 통해 대량의 세밀한 객체(fine-grained objects)를 효율적으로 지원하며, 본질적 상태(intrinsic state)와 외부적 상태(extrinsic state)를 분리하여 메모리를 절약한다"
tags: ['Flyweight', 'Structural Pattern', 'Sharing', 'Fine Grained Objects']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/flyweight-pattern
sidebar:
  order: 7
---

## 핵심 개념

### 의도와 동기

일부 애플리케이션은 설계 전반에 걸쳐 객체를 사용하는 것이 유리하지만, 단순하게 구현하면 비용이 과도해진다. 예를 들어 문서 편집기에서 각 문자를 객체로 표현하면 유연성이 높아지지만(문자와 포매팅을 동일하게 다룰 수 있음), 중간 크기의 문서도 수십만 개의 문자 객체가 필요하여 메모리 소모와 런타임 오버헤드가 막대하다. Flyweight 패턴은 **공유 객체(flyweight)**를 여러 컨텍스트에서 동시에 사용할 수 있도록 하여 이 문제를 해결한다.

핵심 개념은 **본질적 상태(intrinsic state)**와 **외부적 상태(extrinsic state)**의 구분이다. 본질적 상태는 flyweight에 저장되며, 컨텍스트에 독립적이어서 공유할 수 있다. 외부적 상태는 flyweight의 컨텍스트에 따라 달라지며 공유할 수 없으므로, 클라이언트가 필요할 때 flyweight에 전달한다. 예를 들어, 문자 코드는 본질적 상태이고, 문서 내 위치와 타이포그래피 스타일은 외부적 상태이다.

### 적용 가능성

다음 조건이 **모두** 충족될 때 Flyweight 패턴을 적용한다: (1) 애플리케이션이 대량의 객체를 사용하고, (2) 객체의 순수한 수량으로 인해 저장 비용이 높으며, (3) 대부분의 객체 상태를 외부적 상태로 만들 수 있고, (4) 외부적 상태를 제거하면 많은 그룹의 객체를 상대적으로 적은 수의 공유 객체로 대체할 수 있으며, (5) 애플리케이션이 객체 동일성에 의존하지 않을 때(flyweight 객체가 공유되므로 개념적으로 구별되는 객체에 대해 동일성 테스트가 true를 반환한다).

### 참여자

- **Flyweight** (Glyph): flyweight가 외부적 상태를 받아서 작동할 수 있는 인터페이스를 선언한다.
- **ConcreteFlyweight** (Character): Flyweight 인터페이스를 구현하고 본질적 상태를 저장한다. 반드시 공유 가능해야 하며, 저장하는 모든 상태는 본질적(컨텍스트 독립적)이어야 한다.
- **UnsharedConcreteFlyweight** (Row, Column): 모든 Flyweight 서브클래스가 공유될 필요는 없다. Flyweight 인터페이스는 공유를 *가능하게* 하지만 강제하지는 않는다. UnsharedConcreteFlyweight는 flyweight 객체 구조의 특정 레벨에서 ConcreteFlyweight를 자식으로 가지는 것이 일반적이다.
- **FlyweightFactory**: flyweight 객체를 생성하고 관리하며, flyweight가 적절히 공유되도록 보장한다. 클라이언트가 flyweight를 요청하면 기존 인스턴스를 제공하거나, 없으면 새로 생성한다.
- **Client**: flyweight에 대한 참조를 유지하고, flyweight의 외부적 상태를 계산하거나 저장한다.

### 결과

Flyweight는 외부적 상태를 전달하고 찾고 계산하는 런타임 비용을 유발할 수 있지만, 이는 공간 절약으로 상쇄된다. 절약 효과는 다음에 의해 결정된다: 공유로 인한 총 인스턴스 수 감소, 객체당 본질적 상태의 양, 외부적 상태의 계산 vs 저장 여부. 공유되는 flyweight가 많을수록, 그리고 본질적/외부적 상태가 모두 상당할수록 절약 효과가 크다. Flyweight 패턴은 Composite 패턴과 자주 결합되어 공유 리프 노드를 가진 계층적 구조를 나타낸다. 이 경우 flyweight 리프 노드는 부모에 대한 포인터를 저장할 수 없으며, 부모 포인터는 외부적 상태로 전달해야 한다.

## 예시

### Glyph Flyweight 구현 (C++)

```cpp
// Flyweight: 그래픽 객체의 추상 클래스
class Glyph {
public:
    virtual ~Glyph();

    // 외부적 상태(GlyphContext)를 매개변수로 받는 연산들
    virtual void Draw(Window*, GlyphContext&);

    virtual void SetFont(Font*, GlyphContext&);
    virtual Font* GetFont(GlyphContext&);

    virtual void First(GlyphContext&);
    virtual void Next(GlyphContext&);
    virtual bool IsDone(GlyphContext&);
    virtual Glyph* Current(GlyphContext&);

    virtual void Insert(Glyph*, GlyphContext&);
    virtual void Remove(GlyphContext&);
protected:
    Glyph();
};

// ConcreteFlyweight: 문자 코드만 저장 (본질적 상태)
class Character : public Glyph {
public:
    Character(char);

    virtual void Draw(Window*, GlyphContext&);
private:
    char _charcode;  // 본질적 상태: 문자 코드만 저장
    // 위치, 폰트 등은 외부적 상태로 GlyphContext에서 관리
};
```

### GlyphContext: 외부적 상태 저장소

```cpp
// 외부적 상태를 관리하는 컨텍스트 객체
class GlyphContext {
public:
    GlyphContext();
    virtual ~GlyphContext();

    // 순회 중 현재 위치 관리
    virtual void Next(int step = 1);
    virtual void Insert(int quantity = 1);

    // 폰트 정보 관리 (외부적 상태)
    virtual Font* GetFont();
    virtual void SetFont(Font*, int span = 1);
private:
    int _index;           // 현재 인덱스
    BTree* _fonts;        // 글리프-폰트 매핑 (BTree로 효율적 저장)
};

// 폰트 변경 예시: "expect" 단어의 폰트를 주변 텍스트와 동일하게
GlyphContext gc;
Font* times12 = new Font("Times-Roman-12");
gc.SetFont(times12, 6);  // 인덱스 102부터 6글자에 대해 폰트 설정
```

### FlyweightFactory: GlyphFactory

```cpp
// FlyweightFactory: flyweight의 생성과 공유를 관리
const int NCHARCODES = 128;

class GlyphFactory {
public:
    GlyphFactory();
    virtual ~GlyphFactory();

    // Character flyweight를 반환 (공유)
    virtual Character* CreateCharacter(char);

    // 비공유 글리프 생성
    virtual Row* CreateRow();
    virtual Column* CreateColumn();
    // ...
private:
    Character* _character[NCHARCODES];  // 공유 풀
};

GlyphFactory::GlyphFactory() {
    for (int i = 0; i < NCHARCODES; ++i) {
        _character[i] = 0;  // 초기에는 모두 null
    }
}

// 이미 생성된 Character가 있으면 반환, 없으면 새로 생성
Character* GlyphFactory::CreateCharacter(char c) {
    if (!_character[c]) {
        _character[c] = new Character(c);
    }
    return _character[c];
}

// Row, Column은 공유하지 않으므로 매번 새로 생성
Row* GlyphFactory::CreateRow() {
    return new Row;
}

Column* GlyphFactory::CreateColumn() {
    return new Column;
}
```

180,000자의 문서에서도 약 480개의 문자 객체만 할당하면 되므로 막대한 메모리 절약을 달성할 수 있다.

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - Flyweight는 Composite와 자주 결합되어 공유 리프 노드를 가진 방향 비순환 그래프(DAG) 구조를 구현한다. 공유의 결과로 flyweight 리프 노드는 부모 포인터를 가질 수 없다.
- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - Strategy 객체를 flyweight로 구현하는 것이 일반적이다. ET++에서 Layout 객체가 그 예시이다.
- [State Pattern](/knowledge/language/design-patterns/state-pattern/) - State 객체도 flyweight로 구현하는 것이 효과적인 경우가 많다.
- [Singleton](/knowledge/language/design-patterns/singleton/) - FlyweightFactory는 종종 Singleton으로 구현되며, flyweight 풀을 중앙에서 관리한다.
