---
title: "불변성 (Immutability)"
description: "한 번 설정된 후 변경할 수 없는 변수/객체의 특성"
tags: ["Software Engineering", "Programming Paradigm", "Concurrency"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/immutability
sidebar:
  order: 27
---

## 핵심 개념

불변성(Immutability)은 한 번 설정된 후 변경할 수 없는 변수/객체의 특성이다. Java의 `final`, Scala의 `val`, Rust의 기본 `let`이 대표적 예시다. 원칙: **"가능할 때마다 불변으로"**

## 동작 원리

장점:
- **병렬 프로그래밍 단순화**: 여러 스레드가 동시에 읽어도 안전
- **최적화 가능**: 컴파일러/런타임이 변수가 변하지 않음을 알면 최적화 가능
- **코드 추론이 쉬워짐**: 변수 값이 어디서 바뀌었는지 추적할 필요 없음
- **예상치 못한 수정 방지**: 생각보다 많은 변수를 불변으로 선언 가능

## 예시

```java
// Mutable - 위험
String name = "Alice";
name = processName(name); // 어디서 변경됐는지 추적 어려움

// Immutable - 안전
final String name = "Alice";
final String processed = processName(name);
```

```rust
// Rust에서는 기본이 불변
let x = 5;
// x = 6;  // 컴파일 에러!
let mut y = 5;  // 명시적으로 가변 선언해야 함
y = 6;  // OK
```

```python
# Python에서의 불변 활용
from dataclasses import dataclass
from typing import FrozenSet

@dataclass(frozen=True)  # 불변 데이터 클래스
class Config:
    host: str
    port: int
    allowed_origins: FrozenSet[str]
```

## 관련 개념

- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [동시성 (Concurrency)](/knowledge/software-engineering/foundations/concurrency/)
- [널 객체 패턴 (Null Object Pattern)](/knowledge/software-engineering/design-and-evolution/null-object-pattern/)
