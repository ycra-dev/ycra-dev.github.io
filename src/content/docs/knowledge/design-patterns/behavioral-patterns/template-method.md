---
title: "Template Method"
description: "알고리즘의 골격을 연산으로 정의하고, 일부 단계를 서브클래스로 미루는 패턴이다"
tags: ['Template Method', 'Behavioral Pattern', 'Algorithm Skeleton', 'Hook Operations']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/template-method
sidebar:
  order: 2
---

## 핵심 개념

Template Method 패턴의 핵심 의도는 알고리즘의 변하지 않는 부분을 한 번만 정의하고, 변할 수 있는 행위는 서브클래스가 구현하도록 남겨두는 것이다. 이는 코드 재사용의 기본적인 기법이며, 특히 클래스 라이브러리에서 공통 행위를 추출하여 라이브러리 클래스에 배치할 때 핵심적이다. 부모 클래스가 알고리즘의 전체 흐름을 제어하면서, 구체적인 단계의 구현은 서브클래스에 맡긴다.

대표적인 동기 사례는 Application과 Document 클래스를 제공하는 애플리케이션 프레임워크이다. Application 클래스의 OpenDocument 연산이 문서 열기 알고리즘을 정의한다: 문서를 열 수 있는지 확인(CanOpenDocument), 애플리케이션 고유의 Document 객체 생성(DoCreateDocument), 문서 집합에 추가, 파일에서 읽기(DoRead). 여기서 OpenDocument가 template method이고, CanOpenDocument, DoCreateDocument, DoRead 등이 서브클래스가 오버라이드해야 하는 primitive operations이다. 이렇게 함으로써 단계의 순서를 고정하면서도 각 단계의 구체적 동작을 서브클래스가 결정할 수 있다.

참여자는 두 가지이다: **AbstractClass**(Application - 서브클래스가 구체적 단계를 구현하기 위해 오버라이드하는 추상 primitive operations를 정의하고, 알고리즘의 골격을 정의하는 template method를 구현. template method는 primitive operations뿐만 아니라 AbstractClass에 정의된 연산이나 다른 객체의 연산도 호출), **ConcreteClass**(MyApplication - 알고리즘의 서브클래스 고유 단계를 구현하기 위해 primitive operations를 오버라이드).

Template Method 패턴은 "할리우드 원칙(Hollywood Principle)"으로 알려진 역전된 제어 구조를 이끈다: "우리가 호출할 테니, 당신은 호출하지 마세요(Don't call us, we'll call you)." 부모 클래스가 서브클래스의 연산을 호출하는 것이지 그 반대가 아니다. template method가 호출하는 연산의 종류는 다음과 같다: (1) 구체 연산(ConcreteClass 또는 클라이언트 클래스의), (2) AbstractClass의 구체 연산(서브클래스에 일반적으로 유용한), (3) primitive operations(추상 연산, 반드시 오버라이드해야 함), (4) factory methods, (5) **hook operations**(기본 행위를 제공하되 서브클래스가 필요시 확장할 수 있는 연산, 기본적으로 아무것도 하지 않는 경우가 많음).

hook operations과 abstract operations의 구분이 중요하다. abstract operations는 반드시 오버라이드해야 하지만, hook operations는 선택적으로 오버라이드할 수 있다. 서브클래스가 부모의 연산을 오버라이드하고 부모 연산을 명시적으로 호출해야 하는 패턴(super 호출)은 누락 위험이 있으므로, 부모 클래스에서 hook operation을 호출하는 template method로 변환하면 부모가 확장을 제어할 수 있다.

구현 시 세 가지 이슈가 있다: (1) **C++ 접근 제어**: template method가 호출하는 primitive operations를 protected로 선언하여 template method에서만 호출되도록 보장하고, 반드시 오버라이드해야 하는 것은 순수 가상 함수로 선언. template method 자체는 비가상 멤버 함수로 만들어 오버라이드를 방지. (2) **primitive operations 최소화**: 오버라이드해야 할 연산 수가 많을수록 클라이언트에게 번거로우므로 최소화. (3) **명명 규칙**: 오버라이드 대상 연산을 식별하기 위해 접두사 사용(MacApp의 "Do-" 접두사: DoCreateDocument, DoRead 등).

## 예시

```cpp
// AbstractClass - 뷰의 그리기 template method
class View {
public:
    // Template Method - 알고리즘의 골격 정의
    // 이 함수는 오버라이드하지 않아야 함 (nonvirtual)
    void Display() {
        SetFocus();       // 구체 연산: 그리기 상태 설정
        DoDisplay();      // Hook operation: 서브클래스가 오버라이드
        ResetFocus();     // 구체 연산: 그리기 상태 정리
    }

protected:
    // Hook operation - 기본적으로 아무것도 하지 않음
    // 서브클래스가 필요에 따라 오버라이드
    virtual void DoDisplay() { }

private:
    void SetFocus();     // 불변 단계
    void ResetFocus();   // 불변 단계
};

// ConcreteClass - 특정 뷰의 그리기 구현
class MyView : public View {
protected:
    virtual void DoDisplay() {
        // MyView 고유의 그리기 로직
        // 실제 화면에 컨텐츠를 그린다
    }
};

// 클라이언트 코드:
// myView->Display();  // 항상 Display()를 호출
// View가 SetFocus -> DoDisplay -> ResetFocus 순서를 보장

// ----- 또 다른 예시: 문서 열기 template method -----

class Application {
public:
    // Template Method - 문서 열기 알고리즘의 골격
    void OpenDocument(const char* name) {
        if (!CanOpenDocument(name)) {
            return;  // 열 수 없는 문서
        }
        Document* doc = DoCreateDocument();  // Factory Method (primitive)
        if (doc) {
            _docs->AddDocument(doc);
            AboutToOpenDocument(doc);  // Hook operation
            doc->Open();
            doc->DoRead();             // Primitive operation
        }
    }

protected:
    // Primitive operations - 서브클래스가 반드시 구현해야 함
    virtual Document* DoCreateDocument() = 0;
    virtual bool CanOpenDocument(const char*) = 0;

    // Hook operation - 기본적으로 아무것도 하지 않음
    virtual void AboutToOpenDocument(Document*) { }

private:
    List<Document*>* _docs;
};

// ConcreteClass - 드로잉 애플리케이션
class DrawApplication : public Application {
protected:
    virtual Document* DoCreateDocument() {
        return new DrawDocument;  // 드로잉 문서 생성
    }
    virtual bool CanOpenDocument(const char* name) {
        // .draw 확장자인지 확인
        return true;
    }
};

// Hook 활용 예시: 부모 클래스가 확장을 제어
// 나쁜 방식 (서브클래스가 super 호출을 잊을 수 있음):
// void DerivedClass::Operation() {
//     ParentClass::Operation();  // 잊기 쉬움!
//     // 추가 동작...
// }

// 좋은 방식 (Template Method + Hook):
class ParentClass {
public:
    void Operation() {
        // 공통 동작...
        HookOperation();  // 서브클래스에 확장 지점 제공
    }
protected:
    virtual void HookOperation() { }  // 기본: 아무것도 안 함
};

class DerivedClass : public ParentClass {
protected:
    virtual void HookOperation() {
        // 확장 동작만 구현하면 됨 (super 호출 불필요)
    }
};
```

## 관련 개념

- [Factory Method](/knowledge/language/design-patterns/factory-method/) - Factory Method는 template method에 의해 자주 호출된다. OpenDocument 예시에서 DoCreateDocument가 Factory Method이다
- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - Template Method는 상속으로 알고리즘의 일부를 변경하고, Strategy는 위임으로 전체 알고리즘을 변경한다
- [Class Inheritance](/knowledge/language/design-patterns/class-inheritance/) - Template Method는 클래스 상속에 의존하는 클래스 행위 패턴이다
