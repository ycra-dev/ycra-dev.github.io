---
title: "Facade Pattern"
description: "Facade 패턴은 서브시스템의 인터페이스 집합에 대한 통합된 상위 수준 인터페이스를 제공하여, 서브시스템을 더 쉽게 사용할 수 있도록 한다"
tags: ['Facade', 'Structural Pattern', 'Subsystem', 'Simplified Interface']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/facade-pattern
sidebar:
  order: 2
---

## 핵심 개념

### 의도와 동기

시스템을 서브시스템으로 구조화하면 복잡성을 줄일 수 있으며, 서브시스템 간의 통신과 의존성을 최소화하는 것이 일반적인 설계 목표이다. 이를 달성하는 방법 중 하나가 **파사드(facade)** 객체를 도입하여 서브시스템에 단일화된 단순한 인터페이스를 제공하는 것이다. 예를 들어, 컴파일러 서브시스템에는 Scanner, Parser, ProgramNode, BytecodeStream, ProgramNodeBuilder 등의 클래스가 있다. 특수한 애플리케이션은 이 클래스들에 직접 접근할 필요가 있지만, 대부분의 클라이언트는 파싱이나 코드 생성의 세부 사항에 관심이 없다. Compiler 클래스가 파사드 역할을 하여 컴파일러 기능의 통합된 인터페이스를 제공함으로써 대부분의 프로그래머의 삶을 더 편하게 만든다.

### 적용 가능성

다음과 같은 경우에 Facade 패턴을 사용한다: (1) 복잡한 서브시스템에 간단한 인터페이스를 제공하고 싶을 때 -- 패턴을 적용하면 클래스가 더 많아지고 작아지므로, 커스터마이징할 필요 없는 클라이언트에게는 단순한 기본 뷰를 제공한다. (2) 클라이언트와 추상화의 구현 클래스 사이에 많은 의존성이 있을 때 -- 파사드를 도입하여 서브시스템을 클라이언트 및 다른 서브시스템과 분리하여 독립성과 이식성을 촉진한다. (3) 서브시스템을 계층화하고 싶을 때 -- 파사드를 사용하여 각 서브시스템 레벨의 진입점을 정의하고, 서브시스템 간 통신을 파사드를 통해서만 하도록 하여 의존성을 단순화한다.

### 참여자

- **Facade** (Compiler): 어떤 서브시스템 클래스가 요청에 책임이 있는지 알고, 클라이언트의 요청을 적절한 서브시스템 객체에 위임한다.
- **Subsystem classes** (Scanner, Parser, ProgramNode 등): 서브시스템 기능을 구현하고, Facade 객체가 할당한 작업을 처리하며, 파사드에 대한 정보를 전혀 가지고 있지 않다(파사드에 대한 참조를 유지하지 않는다).

### 결과

Facade 패턴의 주요 이점은 다음과 같다: (1) 클라이언트가 서브시스템 컴포넌트로부터 차폐되어, 클라이언트가 다루는 객체의 수가 줄어들고 서브시스템 사용이 쉬워진다. (2) 서브시스템과 클라이언트 사이의 느슨한 결합(weak coupling)을 촉진한다. 파사드는 시스템을 계층화하고 객체 간 의존성을 관리하며, 복잡하거나 순환적인 의존성을 제거할 수 있다. 대규모 소프트웨어 시스템에서 컴파일 의존성을 줄이는 것이 중요하며, 서브시스템 클래스가 변경될 때 재컴파일을 최소화할 수 있다. (3) 필요한 경우 클라이언트가 서브시스템 클래스를 직접 사용하는 것을 막지 않는다. 사용 용이성과 일반성 사이에서 선택할 수 있다.

### 구현 시 고려사항

클라이언트-서브시스템 결합을 더 줄이려면 Facade를 추상 클래스로 만들고 서로 다른 서브시스템 구현에 대한 구체 서브클래스를 둘 수 있다. 대안으로 Facade 객체에 다른 서브시스템 객체를 구성하여 커스터마이징할 수 있다. 또한 서브시스템의 공개(public) 인터페이스와 비공개(private) 인터페이스를 구분하는 것이 유용하다. Facade 클래스는 당연히 공개 인터페이스의 일부이지만, 다른 서브시스템 클래스도 공개될 수 있다. C++ 네임스페이스를 사용하면 공개 서브시스템 클래스만 노출할 수 있다.

## 예시

### 컴파일러 서브시스템의 Facade (C++)

```cpp
// 서브시스템 클래스들

// Scanner: 문자 스트림을 토큰으로 변환
class Scanner {
public:
    Scanner(istream&);
    virtual ~Scanner();
    virtual Token& Scan();
private:
    istream& _inputStream;
};

// Parser: 토큰으로부터 파스 트리를 구성
class Parser {
public:
    Parser();
    virtual ~Parser();
    virtual void Parse(Scanner&, ProgramNodeBuilder&);
};

// ProgramNodeBuilder: 파스 트리 노드를 생성하는 Builder
class ProgramNodeBuilder {
public:
    ProgramNodeBuilder();

    virtual ProgramNode* NewVariable(
        const char* variableName
    ) const;
    virtual ProgramNode* NewAssignment(
        ProgramNode* variable, ProgramNode* expression
    ) const;
    // ...

    ProgramNode* GetRootNode();
private:
    ProgramNode* _node;
};

// ProgramNode: Composite 패턴 사용, 파스 트리의 노드
class ProgramNode {
public:
    virtual void GetSourcePosition(int& line, int& index);
    // ...
    virtual void Add(ProgramNode*);
    virtual void Remove(ProgramNode*);
    // ...

    // Visitor 패턴으로 코드 생성
    virtual void Traverse(CodeGenerator&);
protected:
    ProgramNode();
};

// CodeGenerator: 코드 생성기 (Visitor)
class CodeGenerator {
public:
    virtual void Visit(StatementNode*);
    virtual void Visit(ExpressionNode*);
    // ...
protected:
    CodeGenerator(BytecodeStream&);
private:
    BytecodeStream& _output;
};
```

### Facade 클래스: Compiler

```cpp
// Facade: 컴파일러 서브시스템의 통합 인터페이스
class Compiler {
public:
    Compiler();

    // 단순한 인터페이스: 소스를 컴파일하여 바이트코드 생성
    virtual void Compile(istream&, BytecodeStream&);
};

void Compiler::Compile(
    istream& input, BytecodeStream& output
) {
    Scanner scanner(input);
    ProgramNodeBuilder builder;
    Parser parser;

    parser.Parse(scanner, builder);

    RISCCodeGenerator generator(output);
    ProgramNode* parseTree = builder.GetRootNode();
    parseTree->Traverse(generator);
}
```

클라이언트는 Scanner, Parser, ProgramNodeBuilder, CodeGenerator 등의 복잡한 서브시스템 클래스를 직접 다룰 필요 없이, Compiler의 Compile() 메서드 하나로 소스 코드를 컴파일할 수 있다. 하지만 세부 제어가 필요한 전문가는 여전히 서브시스템 클래스에 직접 접근할 수 있다.

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/) - Facade와 함께 사용하여 서브시스템 독립적인 방식으로 서브시스템 객체를 생성하는 인터페이스를 제공할 수 있다. 또한 플랫폼 종속 클래스를 숨기기 위한 Facade의 대안으로 사용할 수 있다.
- [Mediator Pattern](/knowledge/language/design-patterns/mediator-pattern/) - Mediator도 기존 클래스의 기능을 추상화하지만, Mediator의 목적은 동료(colleague) 객체 간의 임의의 통신을 추상화하는 것이고 파사드는 서브시스템 인터페이스를 단순화하는 것이다. Mediator의 동료들은 서로를 인식하고 Mediator를 통해 통신하지만, Facade의 서브시스템 클래스는 파사드를 모른다.
- [Singleton](/knowledge/language/design-patterns/singleton/) - 일반적으로 Facade 객체는 하나만 필요하므로 Facade는 종종 Singleton으로 구현된다.
