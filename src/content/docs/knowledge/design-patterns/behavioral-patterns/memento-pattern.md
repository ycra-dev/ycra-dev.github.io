---
title: "메멘토 패턴 (Memento Pattern)"
description: "캡슐화를 위반하지 않으면서 객체의 내부 상태를 포착하고 외부화하여, 나중에 해당 객체를 이 상태로 복원할 수 있게 하는 패턴이다"
tags: ['Memento', 'Behavioral Pattern', 'State Capture', 'Undo']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/memento-pattern
sidebar:
  order: 9
---

## 핵심 개념

Memento 패턴의 핵심 의도는 체크포인트와 실행 취소 메커니즘을 구현하기 위해 객체의 내부 상태를 기록하되, 캡슐화를 깨뜨리지 않는 것이다. 객체는 일반적으로 자신의 상태를 캡슐화하므로 외부에서 접근할 수 없고, 이 상태를 노출하면 캡슐화가 훼손되어 애플리케이션의 신뢰성과 확장성이 저하된다. Memento는 이 문제를 해결하기 위해 객체의 내부 상태 스냅샷을 저장하는 별도의 객체를 도입한다.

대표적인 동기 사례는 그래픽 편집기에서 객체 간 연결을 유지하는 ConstraintSolver이다. 이동 연산의 실행 취소를 위해 단순히 역방향으로 이동하는 것으로는 부족할 수 있다(연결의 느슨함 등으로 인해). ConstraintSolver의 공개 인터페이스만으로는 효과를 정확히 되돌릴 수 없으므로, Memento 패턴을 적용한다: (1) 이동 연산의 부수 효과로 ConstraintSolver에게 Memento(SolverState)를 요청, (2) SolverState가 내부 방정식과 변수의 현재 상태를 담은 데이터 구조를 포함, (3) 실행 취소 시 SolverState를 ConstraintSolver에게 돌려줌, (4) ConstraintSolver가 내부 구조를 이전 상태로 정확히 복원.

참여자는 세 가지이다: **Memento**(SolverState - Originator의 내부 상태를 저장. 두 가지 인터페이스를 가짐: Caretaker를 위한 **좁은 인터페이스**(다른 객체에게 전달만 가능)와 Originator를 위한 **넓은 인터페이스**(이전 상태 복원에 필요한 모든 데이터 접근 가능)), **Originator**(ConstraintSolver - 현재 내부 상태의 스냅샷을 담은 Memento를 생성하고, Memento를 사용하여 내부 상태를 복원), **Caretaker**(실행 취소 메커니즘 - Memento를 안전하게 보관하되, Memento의 내용을 조작하거나 검사하지 않음).

주요 결과는 다섯 가지이다: (1) **캡슐화 경계 보존**: Originator만 관리해야 할 정보가 외부에 노출되지 않으면서도 외부에 저장된다. (2) **Originator 단순화**: 클라이언트가 요청한 상태를 관리하는 부담이 클라이언트로 이전되어 Originator가 단순해진다. (3) **비용 문제**: 대량의 정보를 복사해야 하거나 Memento 생성이 빈번하면 상당한 오버헤드가 발생할 수 있다. (4) **좁은/넓은 인터페이스 정의의 어려움**: 일부 언어에서는 Originator만 Memento 상태에 접근하도록 보장하기 어렵다(C++에서는 friend 선언으로 해결). (5) **Caretaker의 숨겨진 비용**: Caretaker는 Memento에 얼마나 많은 상태가 있는지 모르므로, 경량 Caretaker가 예상치 못한 큰 저장 비용을 부담할 수 있다.

구현 시 중요한 점은 **증분 변경(incremental change)의 저장**이다. Memento가 예측 가능한 순서로 생성되고 반환되는 경우, 전체 상태 대신 증분적 변경만 저장할 수 있다. 예를 들어, 히스토리 리스트의 실행 취소 가능한 커맨드는 각 커맨드가 영향을 주는 모든 객체의 전체 상태 대신 해당 커맨드가 만든 변경 사항만 저장할 수 있다.

## 예시

```cpp
// Memento 클래스 - Originator의 내부 상태 저장
class ConstraintSolverMemento {
public:
    virtual ~ConstraintSolverMemento();
private:
    friend class ConstraintSolver;  // Originator만 넓은 인터페이스 접근
    ConstraintSolverMemento();
    // 내부 상태 데이터 (private - Caretaker는 접근 불가)
    // ... ConstraintSolver의 내부 방정식/변수 상태 ...
};

// Originator - Memento를 생성하고 복원에 사용
class ConstraintSolver {
public:
    static ConstraintSolver* Instance();  // Singleton
    void Solve();
    void AddConstraint(Graphic* startConnection, Graphic* endConnection);
    void RemoveConstraint(Graphic* startConnection, Graphic* endConnection);
    ConstraintSolverMemento* CreateMemento();  // 현재 상태 스냅샷 생성
    void SetMemento(ConstraintSolverMemento*);  // 이전 상태로 복원
};

// Caretaker 역할을 하는 MoveCommand - Memento를 보관
class MoveCommand {
public:
    MoveCommand(Graphic* target, const Point& delta);
    void Execute();
    void Unexecute();
private:
    ConstraintSolverMemento* _state;  // Memento 보관 (내용 검사 안 함)
    Point _delta;
    Graphic* _target;
};

void MoveCommand::Execute() {
    ConstraintSolver* solver = ConstraintSolver::Instance();
    // 실행 전 상태 저장 (Memento 생성)
    _state = solver->CreateMemento();
    _target->Move(_delta);
    solver->Solve();
}

void MoveCommand::Unexecute() {
    ConstraintSolver* solver = ConstraintSolver::Instance();
    _target->Move(-_delta);  // 역방향 이동
    solver->SetMemento(_state);  // 이전 상태로 복원
    solver->Solve();
}

// Dylan 컬렉션의 이터레이션 상태 - Memento의 또 다른 활용 예
// 이터레이션 상태 객체가 Memento 역할을 하여
// 컬렉션의 내부 표현을 노출하지 않고도 이터레이션을 지원
class Collection {
public:
    IterationState* CreateInitialState();
    void Next(IterationState*);
    bool IsDone(const IterationState*) const;
    Item* CurrentItem(const IterationState*) const;
    IterationState* Copy(const IterationState*) const;
};
```

## 관련 개념

- [Command Pattern](/knowledge/language/design-patterns/command-pattern/) - 커맨드가 실행 취소 가능한 연산의 상태를 유지하기 위해 Memento를 사용할 수 있다
- [Iterator Pattern](/knowledge/language/design-patterns/iterator-pattern/) - Memento가 이터레이션 상태를 캡처하는 데 사용될 수 있다(Dylan 컬렉션 사례)
- [Encapsulation](/knowledge/language/design-patterns/encapsulation/) - Memento 패턴의 핵심 가치는 캡슐화를 보존하면서 상태를 외부화하는 것이다
