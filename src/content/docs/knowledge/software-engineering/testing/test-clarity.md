---
title: "Test Clarity"
description: "테스트의 존재 이유와 실패 원인이 즉각적으로 명확한 테스트의 특성으로, 완전성(completeness)과 간결성(conciseness)을 통해 달성된다"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/test-clarity
sidebar:
  order: 60
---

## 핵심 개념

명확한 테스트는 시간이 지나도 가치를 제공한다. 테스트는 작성자보다 오래 존속하는 경우가 많으며, 불분명한 테스트는 수정이 불가능해져 결국 삭제되어 테스트 커버리지의 공백을 만든다. 명확한 테스트는 엔지니어가 실패 메시지만 보고도 문제를 진단할 수 있어야 한다.

## 동작 원리

**완전성(Completeness)**: 테스트 본문에 결과를 이해하는 데 필요한 모든 정보가 포함되어 있어야 한다.

**간결성(Conciseness)**: 방해가 되는 불필요한 정보가 없어야 한다.

**테스트에 로직을 넣지 말 것**:
- 연산자, 루프, 조건문 등의 로직은 테스트에서 피해야 한다
- 테스트 코드는 "한눈에 봐서 명백하게 올바른" 수준이어야 한다
- 문자열 연결 같은 간단한 로직도 버그를 숨길 수 있다
- 직선적인 코드(straight-line code)를 선호하고, 약간의 중복을 감수한다

**명확한 실패 메시지**:
- 이상적으로 엔지니어는 실패 메시지만 보고 문제를 진단할 수 있어야 한다
- 나쁜 예: `Test failed: account is closed`
- 좋은 예: `Expected an account in state CLOSED, but got account: <{name: "my-account", state: "OPEN"}>`

## 예시

로직이 버그를 숨기는 예:
```java
// 로직이 있는 테스트 - 버그를 발견하기 어려움
@Test void testUrl() {
    String url = "//" + server + "/" + path;  // 연결 로직
    assertEquals(url, generateUrl(server, path));
}

// 로직이 없는 테스트 - 버그가 명확함
@Test void testUrl() {
    assertEquals("//my-server/my-path", generateUrl("my-server", "my-path"));
    // URL에 슬래시가 2개가 아니라 1개여야 함을 즉시 알 수 있다
}
```

## 관련 개념

- [Test Maintainability](/knowledge/software-engineering/testing/test-maintainability/)
- [Behavior Driven Testing](/knowledge/software-engineering/testing/behavior-driven-testing/)
- [DAMP vs DRY in Tests](/knowledge/software-engineering/testing/damp-vs-dry-in-tests/)
