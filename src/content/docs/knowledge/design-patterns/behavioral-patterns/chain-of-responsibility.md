---
title: "책임 연쇄 패턴 (Chain of Responsibility)"
description: "요청의 발신자와 수신자 사이의 결합을 피하기 위해, 여러 객체에게 요청을 처리할 기회를 부여하는 패턴이다"
tags: ['Chain Of Responsibility', 'Behavioral Pattern', 'Request Handling', 'Decoupling']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/chain-of-responsibility
sidebar:
  order: 8
---

## 핵심 개념

Chain of Responsibility 패턴의 핵심 의도는 요청을 보내는 객체와 그 요청을 실제로 처리하는 객체 사이의 결합을 제거하는 것이다. 요청을 처리할 수 있는 객체가 여러 개 존재하지만, 어떤 객체가 처리할지는 런타임에 결정되어야 하는 상황에서 유용하다. 요청은 "암시적 수신자(implicit receiver)"를 가지며, 발신자는 누가 최종적으로 처리할지 알 필요가 없다.

이 패턴의 대표적인 동기 사례는 GUI에서의 맥락 감지 도움말 시스템이다. 사용자가 인터페이스의 어떤 부분을 클릭하면 해당 부분에 특화된 도움말이 제공되어야 하지만, 특화된 도움말이 없으면 더 일반적인 수준(예: 대화상자 전체, 애플리케이션 수준)의 도움말로 전달된다. 버튼 -> 대화상자 -> 애플리케이션 순서로 체인을 구성하여, 각 수준에서 도움말 요청을 처리하거나 다음 후계자(successor)에게 전달한다.

적용 가능한 경우는 다음과 같다: (1) 요청을 처리할 객체가 사전에 알려지지 않은 경우, (2) 수신자를 명시적으로 지정하지 않고 여러 객체 중 하나에게 요청을 보내고 싶은 경우, (3) 요청을 처리할 수 있는 객체 집합을 동적으로 지정해야 하는 경우이다. 체인의 참여 객체는 Handler(인터페이스 정의, 선택적으로 후계자 링크 구현), ConcreteHandler(요청 처리 또는 후계자에게 전달), Client(체인 상의 ConcreteHandler에게 요청을 시작)로 구성된다.

이 패턴의 결과로는 세 가지 주요 특성이 있다. 첫째, **결합도 감소**: 객체는 요청이 "적절하게" 처리될 것만 알면 되며, 체인의 구조를 알 필요가 없다. 모든 후보 수신자에 대한 참조 대신 단일 후계자 참조만 유지하면 된다. 둘째, **책임 할당의 유연성**: 체인을 런타임에 추가하거나 변경하여 요청 처리 책임을 유연하게 배분할 수 있다. 셋째, **수신 보장 불가**: 요청이 체인의 끝까지 전달되어도 처리되지 않을 수 있다.

구현 시 주요 고려사항으로는 후계자 체인 구현 방법(새 링크 정의 또는 기존 객체 참조 활용), 요청 표현 방식(하드코딩된 오퍼레이션, 요청 코드 파라미터, 또는 별도의 Request 객체), 자동 전달 메커니즘(Smalltalk의 doesNotUnderstand 활용) 등이 있다.

## 예시

도움말 시스템에서의 Chain of Responsibility 구현 예시:

```cpp
// Handler 기본 클래스 - 도움말 요청 처리를 위한 인터페이스 정의
class HelpHandler {
public:
    HelpHandler(HelpHandler* s) : _successor(s) { }
    virtual void HandleHelp();
    // 도움말 주제가 설정되어 있는지 확인
    bool HasHelp() { return _topic != NO_HELP_TOPIC; }
    void SetHandler(HelpHandler*, Topic);
private:
    HelpHandler* _successor;
    Topic _topic;
};

// 기본 동작: 후계자에게 전달
void HelpHandler::HandleHelp() {
    if (_successor != 0) {
        _successor->HandleHelp();
    }
}

// Widget - 모든 UI 요소의 기본 클래스 (HelpHandler 상속)
class Widget : public HelpHandler {
protected:
    Widget(Widget* parent, Topic t = NO_HELP_TOPIC);
private:
    Widget* _parent;  // 기존 부모 참조를 체인으로 활용
};

// ConcreteHandler - 버튼 (체인의 첫 번째 핸들러)
class Button : public Widget {
public:
    Button(Widget* d, Topic t = NO_HELP_TOPIC);
    virtual void HandleHelp();
};

void Button::HandleHelp() {
    if (HasHelp()) {
        // 도움말 주제가 있으면 직접 처리
        // ... 도움말 표시 ...
    } else {
        // 없으면 후계자(부모 위젯)에게 전달
        HelpHandler::HandleHelp();
    }
}

// 사용 예: 체인 구성 및 요청 전달
Application* application = new Application(APPLICATION_TOPIC);
Dialog* dialog = new Dialog(application, PRINT_DIALOG);
Button* button = new Button(dialog, PRINT_TOPIC);

// 버튼에서 도움말 요청 시작 -> 체인을 따라 전달
button->HandleHelp();
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - 컴포넌트의 부모가 후계자 역할을 할 수 있어, Composite 패턴과 함께 자주 적용된다
- [Command Pattern](/knowledge/language/design-patterns/command-pattern/) - Unidraw에서 Command 객체가 체인을 따라 해석을 위해 전달되는 사례가 있다
