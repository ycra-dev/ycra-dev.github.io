---
title: "중재자 패턴 (Mediator Pattern)"
description: "객체들 간의 상호작용 방식을 캡슐화하는 객체를 정의하여, 객체들이 서로를 직접 참조하지 않도록 함으로써 느슨한 결합을 촉진하고 상호작용을 독립적으로 변경할 수 있게 하는 패턴이다"
tags: ['Mediator', 'Behavioral Pattern', 'Loose Coupling', 'Centralized Communication']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/mediator-pattern
sidebar:
  order: 7
---

## 핵심 개념

Mediator 패턴의 핵심 의도는 객체 간의 다대다(many-to-many) 상호작용을 일대다(one-to-many) 관계로 변환하여 시스템의 복잡성을 줄이는 것이다. 객체지향 설계에서 행위의 분산은 재사용성을 높이지만, 객체 간의 상호 연결이 급증하면 오히려 재사용성이 떨어지고 시스템이 모놀리식처럼 동작하게 된다. 중재자(Mediator) 객체를 도입하여 그룹 내 객체들의 상호작용을 제어하고 조정하면, 각 객체는 중재자만 알면 되므로 상호 연결의 수가 대폭 감소한다.

대표적인 동기 사례는 GUI 대화상자(Dialog Box)의 위젯 간 의존성이다. 예를 들어, 리스트 박스에서 항목을 선택하면 입력 필드의 내용이 변경되고, 입력 필드에 텍스트가 입력되면 관련 버튼이 활성화되는 등 위젯 간 복잡한 의존관계가 존재한다. FontDialogDirector가 중재자로서 이러한 상호작용의 허브 역할을 한다: (1) 리스트 박스가 선택 변경을 디렉터에게 알림, (2) 디렉터가 리스트 박스에서 선택 항목을 가져옴, (3) 디렉터가 입력 필드에 선택 항목을 전달, (4) 디렉터가 관련 버튼들을 활성화. 위젯들은 서로를 전혀 알지 못하고 오직 디렉터를 통해서만 간접적으로 통신한다.

참여자는 세 가지이다: **Mediator**(DialogDirector - Colleague 객체들과의 통신 인터페이스 정의), **ConcreteMediator**(FontDialogDirector - Colleague 객체들을 조정하여 협력 행위를 구현하고, 자신의 Colleague들을 알고 유지관리), **Colleague 클래스들**(ListBox, EntryField - 각 Colleague는 자신의 Mediator를 알고 있으며, 다른 Colleague와 통신해야 할 때마다 Mediator를 통해 통신).

주요 결과는 다섯 가지이다: (1) **서브클래싱 제한**: 행위가 Mediator에 집중되므로 행위 변경 시 Mediator만 서브클래싱하면 된다. (2) **Colleague 간 디커플링**: Colleague와 Mediator 클래스를 독립적으로 변경하고 재사용할 수 있다. (3) **객체 프로토콜 단순화**: 다대다 상호작용을 일대다로 대체하여 이해, 유지보수, 확장이 쉬워진다. (4) **객체 협력 방식의 추상화**: 중재를 독립적인 개념으로 만들어 객체 간 상호작용에 집중할 수 있다. (5) **제어의 집중화**: 상호작용의 복잡성이 Mediator에 집중되어 Mediator 자체가 유지보수하기 어려운 모놀리스가 될 수 있다.

구현 시 두 가지 주요 이슈가 있다. 첫째, Colleague가 단일 Mediator와만 작업하는 경우 추상 Mediator 클래스가 필요 없다. 둘째, Colleague-Mediator 통신 방식으로 Observer 패턴(Colleague가 Subject, Mediator가 Observer)을 사용하거나, 위임(delegation) 방식(Colleague가 자신을 인자로 전달하여 Mediator가 발신자를 식별)을 사용할 수 있다.

## 예시

```cpp
// 추상 DialogDirector - 중재자 인터페이스
class DialogDirector {
public:
    virtual ~DialogDirector();
    virtual void ShowDialog();
    virtual void WidgetChanged(Widget*) = 0;  // Colleague 변경 통지
protected:
    DialogDirector();
    virtual void CreateWidgets() = 0;  // 위젯 생성
};

// Widget - Colleague 기본 클래스
class Widget {
public:
    Widget(DialogDirector*);
    virtual void Changed();  // 디렉터에게 변경 알림
    virtual void HandleMouse(MouseEvent& event);
    // ...
private:
    DialogDirector* _director;
};

void Widget::Changed() {
    _director->WidgetChanged(this);  // 자신을 인자로 전달
}

// 구체적 Colleague 클래스들
class ListBox : public Widget {
public:
    ListBox(DialogDirector*);
    virtual const char* GetSelection();
    virtual void SetList(List<char*>* listItems);
    virtual void HandleMouse(MouseEvent& event);
    // ...
};

class EntryField : public Widget {
public:
    EntryField(DialogDirector*);
    virtual void SetText(const char* text);
    virtual const char* GetText();
    // ...
};

class Button : public Widget {
public:
    Button(DialogDirector*);
    virtual void SetText(const char* text);
    virtual void HandleMouse(MouseEvent& event);
    // ...
};

void Button::HandleMouse(MouseEvent& event) {
    // ... 마우스 클릭 처리 ...
    Changed();  // 중재자에게 알림
}

// ConcreteMediator - 폰트 대화상자 디렉터
class FontDialogDirector : public DialogDirector {
public:
    FontDialogDirector();
    virtual ~FontDialogDirector();
    virtual void WidgetChanged(Widget*);
protected:
    virtual void CreateWidgets();
private:
    Button* _ok;
    Button* _cancel;
    ListBox* _fontList;
    EntryField* _fontName;
};

void FontDialogDirector::CreateWidgets() {
    _ok = new Button(this);
    _cancel = new Button(this);
    _fontList = new ListBox(this);
    _fontName = new EntryField(this);
    // 위젯 초기화...
}

// 핵심: 위젯 간 상호작용을 중재자가 조정
void FontDialogDirector::WidgetChanged(Widget* theChangedWidget) {
    if (theChangedWidget == _fontList) {
        // 리스트 박스 선택 변경 -> 입력 필드 업데이트
        _fontName->SetText(_fontList->GetSelection());
    } else if (theChangedWidget == _ok) {
        // OK 버튼 클릭 -> 폰트 변경 적용
        // ...
    } else if (theChangedWidget == _cancel) {
        // 취소 버튼 클릭 -> 대화상자 닫기
        // ...
    }
}
```

## 관련 개념

- [Facade Pattern](/knowledge/language/design-patterns/facade-pattern/) - Facade는 서브시스템에 대한 편리한 인터페이스를 제공하며 단방향적이지만, Mediator는 양방향적인 협력 행위를 가능하게 한다
- [Observer Pattern](/knowledge/language/design-patterns/observer-pattern/) - Colleague가 Observer 패턴을 사용하여 Mediator와 통신할 수 있다. ChangeManager는 Mediator 패턴의 인스턴스이다
- [Delegation](/knowledge/language/design-patterns/delegation/) - Smalltalk/V에서 위임 형태로 Colleague-Mediator 통신이 구현된다
