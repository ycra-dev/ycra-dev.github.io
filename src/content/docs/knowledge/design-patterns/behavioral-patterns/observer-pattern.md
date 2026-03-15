---
title: "옵저버 패턴 (Observer Pattern)"
description: "객체 사이에 일대다(one-to-many) 의존 관계를 정의하여, 하나의 객체 상태가 변경될 때 모든 의존 객체에게 자동으로 통지하고 갱신하는 패턴이다"
tags: ['Observer', 'Behavioral Pattern', 'Publish Subscribe', 'Event Notification']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/observer-pattern
sidebar:
  order: 3
---

## 핵심 개념

Observer 패턴의 핵심 의도는 협력하는 클래스들 사이의 일관성을 유지하면서도, 클래스들 간의 결합도를 낮추어 재사용성을 보존하는 것이다. 시스템을 협력하는 클래스들의 집합으로 분할할 때, 관련 객체들 간의 일관성 유지가 필요하지만 강한 결합을 통해 이를 달성하면 재사용성이 떨어진다. 이 패턴의 핵심 객체는 **Subject**(주체)와 **Observer**(관찰자)이다. Subject는 임의의 수의 Observer를 가질 수 있으며, 상태가 변경되면 모든 Observer에게 통지한다. 이를 **publish-subscribe** 관계라고도 하며, Subject는 누가 관찰하고 있는지 모른 채 통지를 발송한다.

대표적인 동기 사례는 스프레드시트와 막대 차트가 동일한 데이터를 서로 다른 방식으로 표현하는 경우이다. Smalltalk MVC(Model/View/Controller)가 가장 잘 알려진 예로, Model이 Subject 역할을, View가 Observer 역할을 한다. 스프레드시트에서 데이터를 변경하면 막대 차트가 즉시 반영하며, 의존 객체의 수에 제한이 없다.

참여자는 네 가지이다: **Subject**(Observer를 등록(attach)/해제(detach)/통지(notify)하는 인터페이스 제공, Observer 목록 관리), **Observer**(Subject의 변경에 대한 갱신 인터페이스(Update) 정의), **ConcreteSubject**(ConcreteObserver에게 관심 있는 상태 저장, 상태 변경 시 Observer에게 통지), **ConcreteObserver**(ConcreteSubject 참조 유지, Subject와 일관된 상태 저장, Observer의 Update 인터페이스 구현).

구현 시 중요한 이슈가 많다. (1) **Subject-Observer 매핑**: 저장 효율을 위해 해시 테이블 등의 연관 검색을 사용할 수 있다. (2) **다중 Subject 관찰**: Observer가 여러 Subject에 의존하는 경우, Update에 Subject를 인자로 전달하여 어떤 Subject가 통지했는지 알 수 있게 한다. (3) **갱신 트리거 주체**: Subject의 상태 변경 메서드가 자동으로 Notify를 호출하는 방식(편리하지만 연속 변경 시 비효율적)과 클라이언트가 적절한 시점에 Notify를 호출하는 방식(유연하지만 호출 누락 위험) 중 선택. (4) **삭제된 Subject의 댕글링 참조 방지**: Subject 삭제 시 Observer에게 통지하여 참조를 재설정. (5) **통지 전 Subject 상태의 자기 일관성 보장**: 서브클래스의 연산이 상속된 연산을 호출할 때 비일관 상태에서 통지가 발생할 수 있으므로, Template Method를 사용하여 Notify를 마지막에 호출. (6) **Push vs Pull 모델**: Push 모델은 Subject가 상세 정보를 보내고(Observer의 재사용성 감소 가능), Pull 모델은 최소 통지만 보내고 Observer가 필요한 정보를 직접 요청(비효율 가능). (7) **관심 사항의 명시적 등록**: aspect를 지정하여 특정 이벤트에만 등록. (8) **ChangeManager**: Subject-Observer 간 복잡한 의존관계에서 중복 갱신을 방지하기 위한 중재 객체. DAGChangeManager는 DAG 의존관계에서 Observer가 한 번만 갱신받도록 보장하며, 이는 Mediator 패턴의 인스턴스이자 Singleton이 될 수 있다.

주요 결과로는 (1) Subject와 Observer 간 추상적 결합(다른 추상화 계층에 속할 수 있음), (2) 브로드캐스트 통신 지원(수신자를 지정하지 않고 모든 관심 객체에 통지), (3) 예상치 못한 갱신(Observer 간의 무지로 인해 연쇄적 갱신 발생 가능)이 있다.

## 예시

```cpp
// 추상 Observer 인터페이스
class Observer {
public:
    virtual ~Observer();
    virtual void Update(Subject* theChangedSubject) = 0;
    // 다중 Subject 관찰을 위해 Subject를 인자로 전달
protected:
    Observer();
};

// 추상 Subject 인터페이스
class Subject {
public:
    virtual ~Subject();
    virtual void Attach(Observer*);
    virtual void Detach(Observer*);
    virtual void Notify();
protected:
    Subject();
private:
    List<Observer*>* _observers;
};

void Subject::Attach(Observer* o) { _observers->Append(o); }
void Subject::Detach(Observer* o) { _observers->Remove(o); }

void Subject::Notify() {
    ListIterator<Observer*> i(_observers);
    for (i.First(); !i.IsDone(); i.Next()) {
        i.CurrentItem()->Update(this);  // 모든 Observer에게 통지
    }
}

// ConcreteSubject - 시계 타이머
class ClockTimer : public Subject {
public:
    ClockTimer();
    virtual int GetHour();
    virtual int GetMinute();
    virtual int GetSecond();
    void Tick();  // 내부 타이머에 의해 주기적으로 호출
};

void ClockTimer::Tick() {
    // 내부 시간 상태 갱신...
    Notify();  // Observer들에게 변경 통지
}

// ConcreteObserver - 디지털 시계
class DigitalClock : public Widget, public Observer {
public:
    DigitalClock(ClockTimer*);
    virtual ~DigitalClock();
    virtual void Update(Subject*);
    virtual void Draw();
private:
    ClockTimer* _subject;
};

DigitalClock::DigitalClock(ClockTimer* s) {
    _subject = s;
    _subject->Attach(this);  // Subject에 자신을 등록
}

DigitalClock::~DigitalClock() {
    _subject->Detach(this);  // 소멸 시 등록 해제
}

void DigitalClock::Update(Subject* theChangedSubject) {
    if (theChangedSubject == _subject) {
        Draw();  // Subject가 자신의 Subject인 경우에만 갱신
    }
}

void DigitalClock::Draw() {
    int hour = _subject->GetHour();    // Subject에서 상태 조회 (Pull 모델)
    int minute = _subject->GetMinute();
    int second = _subject->GetSecond();
    // 디지털 시계 표시 갱신...
}

// 사용 예: 동일한 타이머에 여러 Observer 등록
ClockTimer* timer = new ClockTimer;
AnalogClock* analogClock = new AnalogClock(timer);
DigitalClock* digitalClock = new DigitalClock(timer);
// timer->Tick() 호출 시 두 시계 모두 자동 갱신
```

## 관련 개념

- [Model-View-Controller](/knowledge/language/design-patterns/model-view-controller/) - MVC는 Observer 패턴의 가장 대표적인 적용 사례로, Model이 Subject, View가 Observer이다
- [Mediator Pattern](/knowledge/language/design-patterns/mediator-pattern/) - ChangeManager는 Subject와 Observer 사이의 Mediator 역할을 하며, 복잡한 갱신 시맨틱을 캡슐화한다
- [Singleton](/knowledge/language/design-patterns/singleton/) - ChangeManager는 전역적으로 유일하게 접근 가능하도록 Singleton 패턴을 적용할 수 있다
