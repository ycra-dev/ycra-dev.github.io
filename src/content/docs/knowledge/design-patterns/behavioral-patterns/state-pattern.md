---
title: "상태 패턴 (State Pattern)"
description: "객체의 내부 상태가 변경될 때 행위를 변경할 수 있게 하는 패턴으로, 객체가 마치 자신의 클래스를 바꾸는 것처럼 보이게 한다"
tags: ['State', 'Behavioral Pattern', 'State Machine', 'Objects For States']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/state-pattern
sidebar:
  order: 5
---

## 핵심 개념

State 패턴의 핵심 의도는 객체의 상태에 따라 달라지는 행위를 별도의 상태 객체에 캡슐화하여, 상태별 행위를 명시적으로 구조화하고 상태 전환을 체계적으로 관리하는 것이다. 상태에 따라 다르게 동작해야 하는 객체에서 조건문(if/switch)을 사용하는 대신, 각 상태를 별도의 클래스로 정의하고 현재 상태 객체에 요청을 위임한다.

대표적인 동기 사례는 TCP 연결을 나타내는 TCPConnection 클래스이다. TCPConnection 객체는 Established, Listening, Closed 등 여러 상태 중 하나에 있을 수 있으며, Open 요청의 효과는 연결이 Closed 상태인지 Established 상태인지에 따라 달라진다. 이 패턴에서는 추상 클래스 TCPState를 도입하여 네트워크 연결의 상태를 표현하는 공통 인터페이스를 선언한다. TCPState의 서브클래스인 TCPEstablished, TCPListen, TCPClosed가 각각 특정 상태의 행위를 구현한다. TCPConnection은 현재 상태를 나타내는 TCPState 서브클래스 인스턴스를 유지하며, 모든 상태 관련 요청을 이 상태 객체에 위임한다. 상태가 변경되면 사용하는 상태 객체를 교체한다.

참여자는 세 가지이다: **Context**(TCPConnection - 클라이언트에 관심 있는 인터페이스 정의, 현재 상태를 정의하는 ConcreteState 서브클래스의 인스턴스 유지), **State**(TCPState - Context의 특정 상태와 관련된 행위를 캡슐화하기 위한 인터페이스 정의), **ConcreteState 서브클래스**(TCPEstablished, TCPListen, TCPClosed - 각 서브클래스가 Context의 한 상태에 대한 행위를 구현).

적용 가능한 경우는 두 가지이다: (1) 객체의 행위가 상태에 의존하며 런타임에 상태에 따라 행위를 변경해야 하는 경우, (2) 연산에 객체의 상태에 따른 크고 다분기적인 조건문이 있는 경우(State 패턴은 각 분기를 별도의 클래스에 배치).

주요 결과는 세 가지이다: (1) **상태별 행위의 지역화와 분할**: 특정 상태의 모든 행위가 하나의 객체에 집중되며, 새 상태와 전환을 새 서브클래스로 쉽게 추가할 수 있다. 대규모 조건문을 분산하여 코드의 의도가 명확해진다. (2) **상태 전환의 명시성**: 내부 데이터 값으로만 상태를 표현하면 전환이 변수 대입으로만 나타나지만, 별도의 상태 객체를 도입하면 전환이 하나의 변수(Context의 State 변수) 리바인딩으로 원자적으로 일어나 비일관 상태를 방지한다. (3) **상태 객체 공유**: 상태 객체에 인스턴스 변수가 없으면(상태가 타입으로만 인코딩), Context들이 State 객체를 공유할 수 있으며 이는 Flyweight 패턴에 해당한다.

구현 시 주요 이슈로는 (1) **상태 전환 정의 주체**: Context가 고정 기준을 가지고 있으면 Context에서, 유연성이 필요하면 State 서브클래스 자체에서 전환 결정(이 경우 서브클래스 간 구현 의존성 발생), (2) **테이블 기반 대안**: 테이블로 입력을 상태 전환에 매핑하는 방식은 규칙성은 있으나 덜 효율적이고 전환에 동작을 추가하기 어려움. State 패턴은 상태별 행위를 모델링하고, 테이블 기반 접근은 상태 전환 정의에 초점, (3) **State 객체 생성/파괴**: 필요할 때만 생성하고 이후 파괴(상태 전환이 드문 경우) vs 미리 생성하고 파괴하지 않음(상태 전환이 빈번한 경우), (4) **동적 상속**: Self 같은 위임 기반 언어에서는 위임 대상을 런타임에 변경하여 State 패턴을 직접 지원한다.

## 예시

```cpp
// Context - TCP 연결
class TCPConnection {
public:
    TCPConnection();
    void ActiveOpen();
    void PassiveOpen();
    void Close();
    void Send();
    void Acknowledge();
    void Synchronize();
private:
    friend class TCPState;
    void ChangeState(TCPState*);  // State가 접근하여 상태 전환
    TCPState* _state;
};

// 생성자 - 초기 상태는 TCPClosed
TCPConnection::TCPConnection() {
    _state = TCPClosed::Instance();
}

// 모든 요청을 현재 상태 객체에 위임
void TCPConnection::ActiveOpen() { _state->ActiveOpen(this); }
void TCPConnection::PassiveOpen() { _state->PassiveOpen(this); }
void TCPConnection::Close() { _state->Close(this); }
void TCPConnection::Send() { _state->Send(this); }
void TCPConnection::Acknowledge() { _state->Acknowledge(this); }
void TCPConnection::Synchronize() { _state->Synchronize(this); }

// 추상 State - 상태 인터페이스
class TCPState {
public:
    virtual void Transmit(TCPConnection*, TCPOctetStream*);
    virtual void ActiveOpen(TCPConnection*);
    virtual void PassiveOpen(TCPConnection*);
    virtual void Close(TCPConnection*);
    virtual void Synchronize(TCPConnection*);
    virtual void Acknowledge(TCPConnection*);
    virtual void Send(TCPConnection*);
protected:
    void ChangeState(TCPConnection*, TCPState*);
};

// 상태 전환 헬퍼 - Context의 상태를 변경
void TCPState::ChangeState(TCPConnection* t, TCPState* s) {
    t->ChangeState(s);
}

// ConcreteState - Established 상태
class TCPEstablished : public TCPState {
public:
    static TCPState* Instance();  // Singleton
    virtual void Transmit(TCPConnection*, TCPOctetStream*);
    virtual void Close(TCPConnection*);
};

void TCPEstablished::Close(TCPConnection* t) {
    // 연결 종료 시퀀스에 필요한 작업 수행...
    ChangeState(t, TCPListen::Instance());  // Listen 상태로 전환
}

// ConcreteState - Closed 상태
class TCPClosed : public TCPState {
public:
    static TCPState* Instance();  // Singleton
    virtual void ActiveOpen(TCPConnection*);
    virtual void PassiveOpen(TCPConnection*);
};

void TCPClosed::ActiveOpen(TCPConnection* t) {
    // 연결 수립을 위한 SYN 전송 등...
    ChangeState(t, TCPEstablished::Instance());  // Established로 전환
}

// ConcreteState - Listen 상태
class TCPListen : public TCPState {
public:
    static TCPState* Instance();  // Singleton
    virtual void Send(TCPConnection*);
};

void TCPListen::Send(TCPConnection* t) {
    // SYN, ACK 등 전송...
    ChangeState(t, TCPEstablished::Instance());
}
```

## 관련 개념

- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - State와 Strategy는 구조적으로 유사하지만, State는 상태 전환을 통해 행위가 자동으로 변경되는 반면 Strategy는 클라이언트가 명시적으로 알고리즘을 선택한다
- [Flyweight Pattern](/knowledge/language/design-patterns/flyweight-pattern/) - 인스턴스 변수가 없는 State 객체는 Flyweight로 공유될 수 있다
- [Singleton](/knowledge/language/design-patterns/singleton/) - 각 TCPState 서브클래스의 유일한 인스턴스는 Singleton으로 구현된다
- [Delegation](/knowledge/language/design-patterns/delegation/) - Context가 State 객체에 요청을 위임하는 것이 패턴의 핵심 메커니즘이다
