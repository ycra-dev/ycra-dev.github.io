---
title: "Null Object Pattern"
description: "null 값 대신 빈 객체를 반환하여 NullPointerException을 방지하는 디자인 패턴"
tags: ["Software Engineering", "Design Pattern", "Null Safety"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/null-object-pattern
sidebar:
  order: 20
---

## 핵심 개념

Null Object Pattern은 null 값 대신 빈 객체를 반환하여 NullPointerException을 방지하는 디자인 패턴이다. 검색 메서드가 결과 없을 때 null 대신 빈 리스트를 반환하면, 호출자가 안전하게 반복 가능하고 특별한 null 처리 코드가 불필요하다.

## 동작 원리

핵심 기법:
- 메서드 시작 시 null 체크 수행
- @NotNull 어노테이션 활용
- 언어에 Option/Maybe 타입이 있으면 적극 활용 — 개발자가 빈 응답 처리를 강제로 고려하게 한다
- 컴파일 에러를 런타임 에러보다 선호

Rust의 `Option<T>`, Kotlin의 `?` 연산자, Java의 `Optional<T>` 등 언어 차원의 null 안전성 도구도 적극 활용해야 한다.

## 예시

```python
# Bad
def find_users(query):
    results = db.search(query)
    if not results:
        return None  # 호출자가 None 체크 필수

# 호출 시 매번 이렇게 해야 함
users = find_users("admin")
if users is not None:  # 잊으면 AttributeError
    for user in users:
        print(user.name)

# Good
def find_users(query):
    results = db.search(query)
    if not results:
        return []  # 호출자가 바로 for loop 가능

# 호출 시 안전하게 사용
users = find_users("admin")
for user in users:  # 빈 리스트면 그냥 실행 안 됨
    print(user.name)
```

Java Optional 활용:
```java
// Optional 반환
Optional<User> findUser(String id) {
    return Optional.ofNullable(db.find(id));
}

// 사용 시 명시적 처리
findUser("123")
    .ifPresent(user -> System.out.println(user.getName()));
```

## 관련 개념

- [Defensive Programming](/knowledge/software-engineering/foundations/defensive-programming/)
- [Immutability](/knowledge/software-engineering/foundations/immutability/)
