---
title: "코드 가독성 (Code Readability)"
description: "다른 개발자(또는 미래의 자신)가 코드를 얼마나 쉽게 이해할 수 있는지를 나타내는 코드 품질 속성"
tags: ["Software Engineering", "Code Quality", "Maintainability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/code-readability
sidebar:
  order: 9
---

## 핵심 개념

코드 가독성(Code Readability)은 다른 개발자(또는 미래의 자신)가 코드를 얼마나 쉽게 이해할 수 있는지를 나타내는 코드 품질 속성이다. 코드는 기계를 위한 명령어인 동시에 사람 간의 커뮤니케이션 수단이다. 코드를 작성하는 시간보다 읽는 시간이 훨씬 많기 때문에 가독성은 가장 중요한 코드 품질 요소 중 하나이다.

## 동작 원리

가독성을 높이는 핵심 요소:
- **명명(Naming)**: 변수, 함수, 클래스 이름이 의도를 명확히 전달해야 한다
- **레이아웃(Layout)**: 일관된 들여쓰기, 공백, 중괄호 스타일이 구조를 시각적으로 드러낸다
- **프레젠테이션(Presentation)**: 코드의 외형이 내용만큼 중요하다. 좋은 프레젠테이션은 코드의 의도를 즉시 파악하게 해준다

코드의 가독성이 떨어지면 버그가 숨기 쉽고, 유지보수 비용이 급격히 증가하며, 팀 생산성이 저하된다.

## 예시

```python
# 나쁜 가독성
def p(l, r):
    return [x for x in l if x > r]

# 좋은 가독성
def filter_values_above_threshold(values, threshold):
    return [value for value in values if value > threshold]
```

레이아웃의 중요성:
```java
// 일관된 레이아웃
if (isValid) {
    process();
    log();
}

// 비일관적 레이아웃 - 버그를 유발할 수 있음
if (isValid)
process();
    log();  // 항상 실행됨 - 들여쓰기가 의도와 다름
```

## 관련 개념

- [코드 스멜 (Code Smell)](/knowledge/software-engineering/design-and-evolution/code-smell/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [코딩 표준 (Coding Standard)](/knowledge/software-engineering/foundations/coding-standard/)
- [코드 관용구 (Code Idiom)](/knowledge/software-engineering/design-and-evolution/code-idiom/)
