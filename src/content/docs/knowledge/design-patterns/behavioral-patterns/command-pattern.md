---
title: "Command Pattern"
description: "요청을 객체로 캡슐화하여, 서로 다른 요청으로 클라이언트를 매개변수화하고, 요청을 큐에 넣거나 로그로 기록하며, 실행 취소 가능한 연산을 지원하는 패턴이다"
tags: ['Command', 'Behavioral Pattern', 'Encapsulated Request', 'Undo Redo']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/command-pattern
sidebar:
  order: 4
---

## 핵심 개념

Command 패턴(또한 Action, Transaction이라고도 불림)의 핵심 의도는 요청 자체를 객체로 만들어서, 요청을 발행하는 객체와 요청을 수행하는 방법을 아는 객체 사이의 결합을 제거하는 것이다. 예를 들어, UI 툴킷의 버튼이나 메뉴 항목은 특정 애플리케이션 동작을 직접 구현할 수 없다. Command 패턴은 추상 Command 클래스에 Execute 인터페이스를 선언하고, ConcreteCommand 서브클래스가 수신자(Receiver)와 동작(Action)의 바인딩을 정의하여 이 문제를 해결한다.

이 패턴의 주요 동기 사례는 메뉴 시스템이다. 각 MenuItem은 구체적인 Command 서브클래스의 인스턴스로 구성된다. PasteCommand는 Document를 수신자로 하여 붙여넣기를 수행하고, OpenCommand는 사용자에게 문서 이름을 묻고 새 Document를 생성한다. MacroCommand는 여러 Command를 순차적으로 실행하는 복합 커맨드로, 명시적 수신자 없이 하위 커맨드들이 각자의 수신자를 정의한다. 이를 통해 메뉴와 버튼이 동일한 ConcreteCommand 인스턴스를 공유하여 동일한 기능을 제공할 수 있다.

참여자는 다섯 가지이다: **Command**(Execute 연산 인터페이스 선언), **ConcreteCommand**(PasteCommand, OpenCommand - Receiver와 Action 사이의 바인딩 정의, Execute를 통해 Receiver의 해당 연산 호출), **Client**(Application - ConcreteCommand 생성 및 수신자 설정), **Invoker**(MenuItem - 커맨드에 요청 실행을 요청), **Receiver**(Document, Application - 요청 수행에 필요한 연산을 알고 있는 객체).

적용 시 주요 결과는 다음과 같다: (1) 연산을 호출하는 객체와 수행하는 객체의 디커플링, (2) 커맨드가 일급 객체로서 조작 및 확장 가능, (3) MacroCommand를 통한 복합 커맨드 조립, (4) 기존 클래스 변경 없이 새로운 Command 추가 용이. 특히 중요한 기능은 **undo/redo 지원**이다. Command 인터페이스에 Unexecute 연산을 추가하고, 실행된 커맨드를 히스토리 리스트에 저장하여 무한 단계의 실행 취소/재실행을 구현할 수 있다. 실행 취소 시 상태 변경 정보를 커맨드 내에 저장해야 하며, 오차 누적(hysteresis) 문제를 방지하기 위해 Memento 패턴을 활용할 수 있다.

구현 시 고려할 점으로는 커맨드의 지능 수준(단순한 수신자-동작 바인딩부터 자체 구현까지), C++ 템플릿을 이용한 간단한 커맨드의 서브클래싱 회피, 실행 취소가 불필요한 경우의 경량화된 구현 등이 있다. 히스토리 리스트에 배치하기 전에 커맨드를 복사해야 하는 경우, 해당 커맨드는 Prototype으로 동작한다.

## 예시

```cpp
// 추상 Command 클래스
class Command {
public:
    virtual ~Command();
    virtual void Execute() = 0;  // 실행 인터페이스
protected:
    Command();
};

// 문서 열기 커맨드 - 사용자 입력을 받아 문서 생성
class OpenCommand : public Command {
public:
    OpenCommand(Application*);
    virtual void Execute();
protected:
    virtual const char* AskUser();
private:
    Application* _application;
    char* _response;
};

void OpenCommand::Execute() {
    const char* name = AskUser();  // 사용자에게 문서 이름 요청
    if (name != 0) {
        Document* document = new Document(name);
        _application->Add(document);
        document->Open();
    }
}

// 붙여넣기 커맨드 - Document를 수신자로 보유
class PasteCommand : public Command {
public:
    PasteCommand(Document*);
    virtual void Execute();
private:
    Document* _document;
};

void PasteCommand::Execute() {
    _document->Paste();  // 수신자에게 연산 위임
}

// 매크로 커맨드 - 복합 커맨드 (Composite 패턴 적용)
class MacroCommand : public Command {
public:
    MacroCommand();
    virtual ~MacroCommand();
    virtual void Execute();
    // 하위 커맨드 관리
    virtual void Add(Command*);
    virtual void Remove(Command*);
private:
    List<Command*>* _cmds;
};

void MacroCommand::Execute() {
    ListIterator<Command*> i(_cmds);
    for (i.First(); !i.IsDone(); i.Next()) {
        Command* c = i.CurrentItem();
        c->Execute();  // 모든 하위 커맨드를 순차 실행
    }
}

// C++ 템플릿을 이용한 간단한 커맨드 (undo 불필요, 인자 없는 경우)
template <class Receiver>
class SimpleCommand : public Command {
public:
    typedef void (Receiver::* Action)();
    SimpleCommand(Receiver* r, Action a)
        : _receiver(r), _action(a) { }
    virtual void Execute();
private:
    Action _action;
    Receiver* _receiver;
};

template <class Receiver>
void SimpleCommand<Receiver>::Execute() {
    (_receiver->*_action)();
}

// 사용 예:
// MyClass* receiver = new MyClass;
// Command* aCommand =
//     new SimpleCommand<MyClass>(receiver, &MyClass::Action);
// aCommand->Execute();
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - MacroCommand는 Composite 패턴의 인스턴스이다
- [Memento Pattern](/knowledge/language/design-patterns/memento-pattern/) - 커맨드의 실행 취소 효과를 위한 상태를 Memento로 보존할 수 있다
- [Prototype Pattern](/knowledge/language/design-patterns/prototype-pattern/) - 히스토리 리스트에 배치하기 전에 복사가 필요한 커맨드는 Prototype으로 동작한다
