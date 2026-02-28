---
title: "Principle of Least Astonishment"
description: "사용자와 개발자를 놀라게 하지 않는 방식으로 기능을 설계하는 원칙"
tags: ["Software Engineering", "Architecture", "API Design"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/principle-of-least-astonishment
sidebar:
  order: 13
---

## 핵심 개념

최소 놀라움의 원칙(Principle of Least Astonishment, POLA)은 코드와 API가 사용자의 첫 번째 기대대로 동작해야 한다는 원칙이다. 놀라운 코드는 불투명(obscure)하여 소프트웨어 복잡성을 유발한다. 예상 가능한 코드가 버그를 줄이고 유지보수를 쉽게 만든다.

## 동작 원리

놀라운 코드의 원인과 제거 방법:

1. **암묵적 지식(Implicit Knowledge) 배제**: API 사용에 필요한 비명시적 정보를 최소화한다
2. **숨겨진 순서 요구 제거**: 메서드 A를 B 전에 호출해야 하는 요구를 내부 서브메서드 호출로 해결한다
3. **숨겨진 인수 요구 제거**: int로 1~10만 받을 때 특정 타입을 사용하여 컴파일 타임에 강제한다
4. **표준 라이브러리와 관용적 패턴 사용**: 개발자가 이미 알고 있는 패턴을 따른다

반직관적으로, 짧은 메서드/변수 이름이 인지 부하를 증가시킨다 — 구체적이고 긴 이름이 더 이해하기 쉬운 경우가 많다.

## 예시

```java
// Bad: 숨겨진 순서 요구
worples.flubberize();
worples.pontoon(); // flubberize 안 하면 런타임 에러 발생
// 이 사실을 문서 없이는 알 수 없다

// Good: 메서드가 전제조건을 내부에서 처리
worples.pontoonFlubberizedWorples(); // 이름에서 요구사항 명시
```

```python
# Bad: 암묵적 지식 필요
user_service.update(user_id, "admin")  # "admin"이 뭘 의미?

# Good: 명시적 타입 사용
from enum import Enum
class Role(Enum):
    ADMIN = "admin"
    VIEWER = "viewer"

user_service.update(user_id, role=Role.ADMIN)  # 의도 명확
```

```python
# Bad: 놀라운 부작용
def get_user(user_id):
    user = db.query(user_id)
    db.update_last_accessed(user_id)  # 읽기 함수가 쓰기를 수행!
    return user

# Good: 명확한 책임 분리
def get_user(user_id):
    return db.query(user_id)

def get_user_and_track_access(user_id):
    user = get_user(user_id)
    db.update_last_accessed(user_id)
    return user
```

## 관련 개념

- [Software Complexity](/knowledge/software-engineering/architectural-design/software-complexity/)
- [YAGNI](/knowledge/software-engineering/design-and-evolution/yagni/)
- [Defensive Programming](/knowledge/software-engineering/foundations/defensive-programming/)
- [Code Readability](/knowledge/software-engineering/design-and-evolution/code-readability/)
