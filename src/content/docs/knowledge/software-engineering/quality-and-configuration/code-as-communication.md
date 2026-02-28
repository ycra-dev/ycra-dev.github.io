---
title: "Code as Communication"
description: "코드가 컴파일러뿐만 아니라 다른 엔지니어에게 의도를 전달하는 매체라는 인식 — 가독성과 명확성이 코드의 핵심 품질 속성이다"
tags: ["Software Engineering", "Quality", "Readability", "Code Quality", "Communication"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-as-communication
sidebar:
  order: 44
---

## 핵심 개념

코드를 커뮤니케이션으로 보는 관점(Code as Communication)은 코드가 컴파일러뿐만 아니라 다른 엔지니어에게 의도를 전달하는 매체라는 인식이다. 따라서 가독성(readability)과 명확성(clarity)이 코드의 핵심 품질 속성이다.

## 동작 원리

구글은 "코드는 쓰이는 것보다 읽히는 것이 훨씬 많다"는 원칙을 강력히 신봉한다. 대부분의 엔지니어 시간은 기존 코드를 읽고 이해하는 데 소비된다. 따라서 스타일 규칙은 **작성자의 편의가 아닌 독자의 편의**를 위해 최적화되어야 한다.

이 원칙이 영향을 미치는 영역:
- **네이밍**: 변수, 함수, 클래스 이름은 의도를 명확히 전달해야 한다. 짧은 이름보다 설명적인 이름이 우선이다.
- **코멘트**: "왜(why)"를 설명하는 코멘트는 필수적이다. "무엇(what)"만 반복하는 코멘트는 불필요하다.
- **코드 구조**: 복잡한 로직은 읽는 사람이 이해할 수 있는 단위로 분해해야 한다.
- **패턴 사용**: 익숙한 패턴을 사용하면 독자가 코드의 의도를 빠르게 파악할 수 있다.

구글의 스타일 가이드는 "영리한(clever)" 코드보다 "명확한(clear)" 코드를 선호한다. 한 줄로 축약할 수 있는 코드도 가독성을 위해 여러 줄로 펼쳐 쓰는 것이 권장될 수 있다.

## 예시

```python
# 나쁜 예: 작성자만 이해할 수 있는 코드
d = {k: v for k, v in s.items() if v > t}

# 좋은 예: 독자를 위해 의도를 명확히 전달
active_users_by_id = {
    user_id: last_login_time
    for user_id, last_login_time in all_users.items()
    if last_login_time > activity_threshold
}
```

두 코드는 동일한 동작을 하지만, 두 번째 코드는 6개월 후 다른 엔지니어가 읽을 때 의도를 즉시 파악할 수 있다.

## 관련 개념

- [Style Guides and Rules](/knowledge/software-engineering/quality-and-configuration/style-guides-and-rules/)
- [Consistency in Codebase](/knowledge/software-engineering/quality-and-configuration/consistency-in-codebase/)
- [Software Engineering vs Programming](/knowledge/software-engineering/foundations/software-engineering-vs-programming/)
