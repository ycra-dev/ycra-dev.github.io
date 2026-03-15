---
title: "싱글턴 패턴 (Singleton)"
description: "클래스의 인스턴스가 오직 하나만 존재하도록 보장하고, 그 인스턴스에 대한 전역 접근점을 제공하는 생성 패턴"
tags: ['Singleton', 'Creational Pattern', 'Global Access', 'Unique Instance']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/singleton
sidebar:
  order: 5
---

## 핵심 개념

Singleton 패턴은 클래스 자체가 유일한 인스턴스를 관리하게 한다. 생성자를 protected로 선언하여 외부 인스턴스화를 방지하고, 정적 Instance() 메서드를 통해 유일한 인스턴스에 접근한다. 지연 초기화(lazy initialization)를 사용하여 처음 접근할 때만 인스턴스를 생성한다.

장점: (1) 유일 인스턴스에 대한 제어된 접근, (2) 전역 변수 대비 네임스페이스 오염 감소, (3) 연산과 표현의 정제 가능(서브클래싱), (4) 인스턴스 수를 가변적으로 허용할 수 있음, (5) 클래스 연산(static 메서드)보다 유연.

서브클래싱 시 주요 이슈: 환경 변수로 서브클래스 선택, 싱글톤 레지스트리를 사용하여 이름으로 등록/조회. C++에서는 전역/정적 객체로는 불충분한 이유: (1) 유일성 보장 불가, (2) 정적 초기화 시점에 충분한 정보 부족, (3) 번역 단위 간 생성자 호출 순서 미정의.

## 예시

```cpp
class MazeFactory {
public:
    static MazeFactory* instance();
    // 팩토리 메서드들
    virtual Maze* makeMaze() { return new Maze; }
    virtual Room* makeRoom(int n) { return new Room(n); }
protected:
    MazeFactory() {}  // 외부 인스턴스화 방지
private:
    static MazeFactory* _instance;
};

MazeFactory* MazeFactory::_instance = nullptr;

MazeFactory* MazeFactory::instance() {
    if (!_instance) {
        // 환경 변수로 서브클래스 결정 가능
        const char* style = getenv("MAZESTYLE");
        if (strcmp(style, "bombed") == 0)
            _instance = new BombedMazeFactory;
        else
            _instance = new MazeFactory;
    }
    return _instance;
}
```

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/)
- [Builder Pattern](/knowledge/language/design-patterns/builder-pattern/)
- [Prototype Pattern](/knowledge/language/design-patterns/prototype-pattern/)
- [Factory Method](/knowledge/language/design-patterns/factory-method/)
