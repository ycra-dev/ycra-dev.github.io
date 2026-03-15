---
title: "프레임워크 (Framework)"
description: "특정 도메인의 소프트웨어를 위한 재사용 가능한 설계를 구성하는 협력 클래스들의 집합으로, 설계 재사용을 강조한다"
tags: ['Framework', 'Design Reuse', 'Inversion Of Control', 'Architecture']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/framework
sidebar:
  order: 12
---

## 핵심 개념

프레임워크는 애플리케이션의 전체 아키텍처를 결정한다. 구조, 클래스와 객체로의 분할, 핵심 책임, 협력 방식, 제어 흐름을 사전에 정의한다. 개발자는 프레임워크의 추상 클래스를 서브클래싱하여 애플리케이션 고유의 동작을 정의한다. 이는 "제어의 역전(inversion of control)"을 초래한다: 라이브러리에서는 개발자가 메인을 작성하고 라이브러리를 호출하지만, 프레임워크에서는 프레임워크가 메인이 되고 개발자가 작성한 코드를 호출한다. 성숙한 프레임워크는 대개 여러 디자인 패턴을 내포한다. 패턴과의 차이점: 패턴은 프레임워크보다 추상적이고, 더 작은 아키텍처 요소이며, 덜 전문화되어 있다.

## 예시

```
// 프레임워크 vs 라이브러리
// 라이브러리: 개발자가 호출
myApp.main() {
    List list = new List();  // 라이브러리 호출
    list.add(item);
}

// 프레임워크: 프레임워크가 개발자 코드를 호출 (제어의 역전)
class MyApp extends Application {  // 프레임워크 확장
    Document createDocument() {    // 프레임워크가 이 메서드를 호출
        return new MyDocument();
    }
}
```

## 관련 개념

[Design Pattern](/knowledge/language/design-patterns/design-pattern/), [Abstract Class](/knowledge/language/design-patterns/abstract-class/), [Class Inheritance](/knowledge/language/design-patterns/class-inheritance/), [Program to Interface](/knowledge/language/design-patterns/program-to-interface/)
