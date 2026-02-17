---
title: "Interpreter Pattern"
description: "주어진 언어에 대해 문법을 위한 표현을 정의하고, 이 표현을 사용하여 해당 언어의 문장을 해석하는 인터프리터를 제공하는 패턴이다"
tags: ['Interpreter', 'Behavioral Pattern', 'Grammar', 'Abstract Syntax Tree']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/interpreter-pattern
sidebar:
  order: 11
---

## 핵심 개념

Interpreter 패턴의 핵심 의도는 특정 종류의 문제가 충분히 자주 발생할 때, 그 문제의 인스턴스를 간단한 언어의 문장으로 표현하고, 이 문장을 해석하여 문제를 해결하는 인터프리터를 구축하는 것이다. 이 패턴은 문법의 각 규칙을 클래스로 표현하며, 규칙의 우변에 있는 기호들은 해당 클래스의 인스턴스 변수가 된다. 문법에 의해 정의된 모든 문장은 이 클래스들의 인스턴스로 구성된 추상 구문 트리(Abstract Syntax Tree)로 표현된다.

대표적인 동기 사례는 정규 표현식이다. 문법이 `expression ::= literal | alternation | sequence | repetition`과 같이 정의되면, 이에 대응하는 클래스 계층을 만든다: 추상 클래스 RegularExpression과 그 서브클래스인 LiteralExpression, AlternationExpression, SequenceExpression, RepetitionExpression. 예를 들어, `raining & (dogs | cats)*` 같은 정규 표현식은 이 클래스들의 인스턴스로 이루어진 트리로 표현되고, 각 서브클래스의 Interpret 연산이 입력 문자열의 다음 부분을 현재 컨텍스트에 기반하여 매칭한다.

참여자는 다섯 가지이다: **AbstractExpression**(RegularExpression - 모든 노드에 공통인 추상 Interpret 연산 선언), **TerminalExpression**(LiteralExpression - 문법의 터미널 기호에 대한 Interpret 연산 구현, 문장의 모든 터미널 기호마다 인스턴스 필요), **NonterminalExpression**(AlternationExpression, SequenceExpression - 문법 규칙 R ::= R1 R2...Rn 마다 하나의 클래스, 각 기호에 대한 AbstractExpression 타입 인스턴스 변수 유지), **Context**(인터프리터에 전역적인 정보 포함), **Client**(추상 구문 트리 구축 및 Interpret 연산 호출).

이 패턴은 문법이 간단하고 효율성이 주요 관심사가 아닌 경우에 가장 적합하다. 복잡한 문법의 경우 클래스 계층이 너무 커지므로 파서 생성기가 더 나은 대안이다. 주요 결과는 다음과 같다: (1) 문법의 변경 및 확장이 상속을 통해 쉽다, (2) 추상 구문 트리 노드의 구현이 유사하여 구현이 쉽다, (3) 규칙이 많은 복잡한 문법은 관리하기 어렵다, (4) 새로운 해석 방식(예: pretty printing, 타입 검사)을 표현식 클래스에 새 연산을 정의하여 추가할 수 있다(이 경우 Visitor 패턴이 유용하다).

구현 시 고려사항으로는 추상 구문 트리 생성(패턴이 파싱 자체는 다루지 않음), Interpret 연산을 별도의 Visitor 객체로 분리하는 방안, 그리고 터미널 기호를 Flyweight 패턴으로 공유하는 방안(프로그램의 변수처럼 동일한 터미널 기호가 여러 곳에 등장하는 경우)이 있다.

## 예시

Boolean 표현식 인터프리터의 C++ 구현 예시:

```cpp
// 문법: BooleanExp ::= VariableExp | Constant | OrExp | AndExp | NotExp
//                      'and' | 'or' | 'not' | '(' BooleanExp ')'

// 추상 표현식 - 모든 Boolean 표현식의 인터페이스
class BooleanExp {
public:
    BooleanExp();
    virtual ~BooleanExp();
    virtual bool Evaluate(Context&) = 0;          // 해석(평가)
    virtual BooleanExp* Replace(const char*, BooleanExp&) = 0;  // 변수 교체
    virtual BooleanExp* Copy() const = 0;          // 복사
};

// 컨텍스트 - 변수에서 Boolean 값으로의 매핑
class Context {
public:
    bool Lookup(const char*) const;
    void Assign(VariableExp*, bool);
};

// 터미널 표현식 - 변수
class VariableExp : public BooleanExp {
public:
    VariableExp(const char*);
    virtual bool Evaluate(Context&);
    virtual BooleanExp* Replace(const char*, BooleanExp&);
    virtual BooleanExp* Copy() const;
private:
    char* _name;
};

bool VariableExp::Evaluate(Context& aContext) {
    return aContext.Lookup(_name);  // 컨텍스트에서 변수 값 조회
}

BooleanExp* VariableExp::Replace(
    const char* name, BooleanExp& exp
) {
    if (strcmp(name, _name) == 0) {
        return exp.Copy();   // 이름이 같으면 교체
    } else {
        return new VariableExp(_name);  // 다르면 자신의 복사본 반환
    }
}

// 비터미널 표현식 - And 연산
class AndExp : public BooleanExp {
public:
    AndExp(BooleanExp*, BooleanExp*);
    virtual bool Evaluate(Context&);
    virtual BooleanExp* Replace(const char*, BooleanExp&);
    virtual BooleanExp* Copy() const;
private:
    BooleanExp* _operand1;
    BooleanExp* _operand2;
};

bool AndExp::Evaluate(Context& aContext) {
    return _operand1->Evaluate(aContext) &&
           _operand2->Evaluate(aContext);  // 재귀적으로 하위 표현식 평가
}

// 사용 예: (true and x) or (y and (not x))
BooleanExp* expression;
Context context;

VariableExp* x = new VariableExp("X");
VariableExp* y = new VariableExp("Y");

expression = new OrExp(
    new AndExp(new Constant(true), x),
    new AndExp(y, new NotExp(x))
);

context.Assign(x, false);
context.Assign(y, true);

bool result = expression->Evaluate(context);
// result == true

// 변수 y를 새 표현식으로 교체 후 재평가
BooleanExp* replacement = new NotExp(y);
BooleanExp* newExp = expression->Replace("Y", *replacement);
```

## 관련 개념

- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/) - 추상 구문 트리는 Composite 패턴의 인스턴스이다
- [Iterator Pattern](/knowledge/language/design-patterns/iterator-pattern/) - 인터프리터가 구조를 순회하기 위해 Iterator를 사용할 수 있다
- [Visitor Pattern](/knowledge/language/design-patterns/visitor-pattern/) - 추상 구문 트리의 각 노드에 대한 동작을 하나의 클래스에서 유지관리하기 위해 Visitor를 사용할 수 있다
- [Flyweight Pattern](/knowledge/language/design-patterns/flyweight-pattern/) - 추상 구문 트리 내에서 터미널 기호를 공유하는 방법을 보여준다
