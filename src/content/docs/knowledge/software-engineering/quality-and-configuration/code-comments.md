---
title: "Code Comments"
description: "소스 코드 내에 작성되는 설명 — Google에서 엔지니어가 작성하는 대부분의 문서화가 코드 주석 형태로 이루어지며, '왜(why)'를 설명하는 것이 핵심이다"
tags: ["Software Engineering", "Quality", "Documentation", "Code Comments", "Readability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-comments
sidebar:
  order: 59
---

## 핵심 개념

소스 코드 내에 작성되는 설명으로, Google에서 엔지니어가 작성하는 대부분의 문서화가 코드 주석 형태로 이루어진다.

## 동작 원리

코드 주석은 가장 기본적이면서도 중요한 문서화 형태이다. Google에서는 여러 종류의 코드 주석을 구분한다:

1. **파일 주석(File Comments)**: 파일 상단에 위치하며, 해당 파일의 전반적인 목적을 설명한다. 모든 코드 파일의 시작점으로, 파일에 포함된 내용의 개요를 제공한다.

2. **클래스 주석(Class Comments)**: 클래스의 목적과 중요한 메서드를 설명한다. API로 노출되는 클래스는 반드시 문서화해야 한다.

3. **함수 주석(Function Comments)**: "무엇(what)"과 "왜(why)"에 집중해야 한다. "어떻게(how)"는 코드 자체가 설명해야 한다.

핵심 원칙:
- 코드가 "무엇을 하는지"보다 "왜 그렇게 하는지"를 설명해야 한다
- 명확한 코드로 대체할 수 있는 주석은 불필요하다
- API 주석은 구현이 아닌 계약(contract)을 문서화해야 한다
- 구현 주석은 코드만으로는 명확하지 않은 의도나 맥락을 제공해야 한다

## 예시

나쁜 주석:
```java
// i를 1 증가시킨다
i++;
```

좋은 주석:
```java
// 재시도 횟수를 추적한다. 서버가 간헐적으로 503을 반환하므로
// 최대 3번까지 재시도한 후 실패를 보고한다.
retryCount++;
```

## 관련 개념

- [Documentation as Code](/knowledge/software-engineering/quality-and-configuration/documentation-as-code/)
- [Documentation Types](/knowledge/software-engineering/quality-and-configuration/documentation-types/)
- [Code as Communication](/knowledge/software-engineering/quality-and-configuration/code-as-communication/)
