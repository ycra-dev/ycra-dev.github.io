---
title: "빌더 패턴 (Builder Pattern)"
description: "복잡한 객체의 구성(construction)과 표현(representation)을 분리하여, 동일한 구성 과정으로 서로 다른 표현을 생성할 수 있게 하는 생성 패턴"
tags: ['Builder', 'Creational Pattern', 'Step By Step Construction', 'Director']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/builder-pattern
sidebar:
  order: 3
---

## 핵심 개념

Builder 패턴은 복잡한 객체를 단계적으로 구축한다. Director가 Builder 인터페이스를 통해 구축 과정을 지시하고, ConcreteBuilder가 실제 부품을 생성 및 조립한다. RTF 리더 예시에서 RTFReader(Director)가 TextConverter(Builder)에게 토큰별로 변환을 요청하고, ASCIIConverter나 TeXConverter(ConcreteBuilder)가 각각 다른 형식으로 결과를 생성한다.

핵심 참여자: Builder(부품 생성 인터페이스), ConcreteBuilder(구체적 생성/조립 구현, 결과물 제공), Director(Builder를 사용하여 구축), Product(구축 결과 복잡 객체).

장점: (1) 제품 내부 표현 변경 가능, (2) 구축과 표현 코드 분리로 모듈성 향상, (3) 단계적 구축으로 구축 과정에 대한 세밀한 제어 가능. Abstract Factory와 달리 Builder는 단계별로 구축하며, 완성된 후에야 제품을 반환한다.

## 예시

```cpp
// Builder 패턴 - 미로 구축
class MazeBuilder {
public:
    virtual void buildMaze() {}
    virtual void buildRoom(int room) {}
    virtual void buildDoor(int r1, int r2) {}
    virtual Maze* getMaze() { return nullptr; }
};

class StandardMazeBuilder : public MazeBuilder {
    Maze* _currentMaze;
public:
    void buildMaze() override { _currentMaze = new Maze; }
    void buildRoom(int n) override { /* 방 생성 및 벽 설치 */ }
    void buildDoor(int r1, int r2) override { /* 문 생성 */ }
    Maze* getMaze() override { return _currentMaze; }
};

// Director가 Builder를 사용
Maze* MazeGame::createMaze(MazeBuilder& builder) {
    builder.buildMaze();
    builder.buildRoom(1);
    builder.buildRoom(2);
    builder.buildDoor(1, 2);
    return builder.getMaze();
}
```

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/)
- [Composite Pattern](/knowledge/language/design-patterns/composite-pattern/)
- [Factory Method](/knowledge/language/design-patterns/factory-method/)
- [Design Pattern](/knowledge/language/design-patterns/design-pattern/)
