---
title: "매직 넘버 (Magic Number)"
description: "코드 안에 이름 없이 직접 쓰인 숫자 상수로, 의미와 근거를 알기 어렵게 만드는 안티패턴이다"
tags: ["Software-Engineering", "Anti-Pattern", "Readability", "Constants"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/magic-number
sidebar:
  order: 103
---

## 핵심 개념

매직 넘버는 코드 안에 이름 없이 직접 쓰인 숫자 상수로, 그 의미와 근거를 알기 어렵게 만드는 안티패턴이다. `enum`, `const`, `#define` 등으로 이름을 부여하여 제거해야 한다.

## 동작 원리

**매직 넘버의 문제점:**
1. **의미 불명확**: `512`가 배열 크기인지, 버퍼 크기인지, 포트 번호인지 알 수 없다.
2. **변경 어려움**: 같은 값이 여러 곳에 흩어져 있으면 하나만 바꿔도 버그가 발생한다.
3. **관계 불명확**: `256`과 `512`가 서로 관련된 값인지 알 수 없다.

**해결책:**
- `enum`이나 `const`로 이름 붙인 상수를 정의한다.
- 객체 크기는 하드코딩하지 말고 `sizeof`를 사용한다.
- 문자의 숫자 값(`0x41` 대신 `'A'`)을 직접 사용하지 않는다.
- 0과 1 같은 자명한 값은 예외적으로 허용된다.

## 예시

```c
// 나쁜 예: 매직 넘버
char buf[512];
fgets(buf, 512, stdin);
for (int i = 0; i < 512; i++) ...

// 좋은 예: 이름 있는 상수
enum { BUFSIZE = 512 };
char buf[BUFSIZE];
fgets(buf, BUFSIZE, stdin);
for (int i = 0; i < BUFSIZE; i++) ...
```

```c
// 나쁜 예: sizeof 미사용
memset(arr, 0, 100 * 4);  // 4가 int 크기라는 가정

// 좋은 예: sizeof 사용
memset(arr, 0, NELEMS * sizeof(arr[0]));
```

## 관련 개념

- [코딩 스타일 (Coding Style)](/knowledge/software-engineering/coding-style/) - 매직 넘버 제거는 스타일 개선의 기본
- [명명 규칙 (Naming Convention)](/knowledge/software-engineering/naming-convention/) - 상수에도 의미 있는 이름을 부여한다
