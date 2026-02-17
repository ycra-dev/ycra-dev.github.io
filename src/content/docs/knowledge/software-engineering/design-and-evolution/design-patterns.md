---
title: "Design Patterns"
description: "디자인 패턴은 객체지향 소프트웨어 설계에서 반복적으로 발생하는 공통적인 문제에 대한 재사용 가능한 해결책을 추상화하여 기술한 것이다"
tags: ['Design Patterns', 'GoF', 'Observer Pattern', 'Facade Pattern', 'Reusable Design', 'Object Oriented']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/design-patterns
sidebar:
  order: 2
---

## 핵심 개념

디자인 패턴은 GoF(Gang of Four)가 1995년 출간한 "Design Patterns" 책에서 체계화되었다. 각 패턴은 이름, 문제 설명, 해결 방안, 적용 결과를 포함한다. 주요 패턴으로는 Observer(상태 변화 통지), Facade(복잡한 서브시스템의 단순 인터페이스 제공), Iterator(컬렉션 순회), Decorator(동적 기능 추가) 등이 있다. 디자인 패턴은 설계의 어휘를 제공하여 개발자 간 커뮤니케이션을 돕고, 검증된 설계 결정을 재사용할 수 있게 한다.

## 예시

Observer 패턴: 기상 관측 시스템에서 WeatherData(Subject)의 온도가 변경되면, 등록된 모든 Observer(CurrentDisplay, StatisticsDisplay, ForecastDisplay)에게 자동으로 알림이 전달된다.
```java
interface Observer { void update(float temp); }
class WeatherData {
    List<Observer> observers;
    void notifyObservers() {
        for (Observer o : observers) o.update(temperature);
    }
}
```

## 관련 개념

- [Object-oriented Design](/knowledge/software-engineering/object-oriented-design/)
- [Software Reuse](/knowledge/software-engineering/software-reuse/)
