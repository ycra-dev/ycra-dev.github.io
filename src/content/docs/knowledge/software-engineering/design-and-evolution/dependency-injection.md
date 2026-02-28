---
title: "Dependency Injection"
description: "객체가 필요로 하는 의존성을 외부에서 주입받는 디자인 패턴"
tags: ["Software Engineering", "Design Pattern", "Testing", "Decoupling"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/dependency-injection
sidebar:
  order: 21
---

## 핵심 개념

의존성 주입(Dependency Injection)은 객체가 필요로 하는 의존성을 외부에서 주입받는 디자인 패턴이다. 시스템 클록, DB 연결, 외부 서비스 등을 파라미터로 받아 테스트에서 mock으로 교체 가능하게 한다. 결합도를 낮추고 테스트 가능성을 높이는 핵심 기법이다.

## 동작 원리

의존성 주입의 핵심 아이디어:
- 정적 메서드(now(), sleep()) 대신 주입 가능한 인터페이스 사용
- 일반 코드는 기본 구현 사용, 테스트는 mock 주입
- 시간 의존 코드의 결정적 테스트를 위해 특히 중요

결합도를 낮추는 방법:
```
직접 생성 (고결합) → 인터페이스 + 주입 (저결합)
```

## 예시

```python
# 높은 결합도: 직접 의존
class OrderService:
    def __init__(self):
        self.db = MySQLDatabase("localhost", 3306)  # 구체 구현에 직접 의존

# 낮은 결합도: 인터페이스 의존 + 의존성 주입
class OrderService:
    def __init__(self, database: Database):  # 추상에 의존
        self.db = database

# 프로덕션 사용
order_service = OrderService(MySQLDatabase("localhost", 3306))
# 테스트 시
test_service = OrderService(InMemoryDatabase())
```

```ruby
# 시간 의존 코드 - 테스트 불가
class Throttler
  def elapsed
    Time.now - @start_time
  end
end

# 주입 가능한 클록 - 테스트 가능
class Throttler
  def initialize(clock = Time)
    @clock = clock
  end
  def elapsed
    @clock.now - @start_time
  end
end
# 테스트에서 mock_clock 주입
```

## 관련 개념

- [Mocking](/knowledge/software-engineering/testing/mocking/)
- [Deterministic Testing](/knowledge/software-engineering/testing/deterministic-testing/)
- [Coupling](/knowledge/software-engineering/architectural-design/coupling/)
