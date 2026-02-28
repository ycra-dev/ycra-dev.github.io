---
title: "명명 규칙 (Naming Convention)"
description: "변수, 함수, 타입 등의 이름을 일관되고 의미 있게 짓는 규칙으로, 이름은 코드에서 가장 기본적인 문서화 역할을 한다"
tags: ["Software-Engineering", "Naming", "Readability", "Best-Practices"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/naming-convention
sidebar:
  order: 102
---

## 핵심 개념

이름 짓기 관례는 변수, 함수, 타입 등의 이름을 일관되고 의미 있게 짓는 규칙이다. 이름은 코드에서 가장 기본적인 문서화 역할을 하며, 범위(scope)에 따라 이름의 길이와 서술성을 조절해야 한다.

## 동작 원리

**범위에 따른 이름 길이:**
- **전역 변수/함수**: 서술적이고 긴 이름 사용 (`npending`, `numberOfInputLines`)
- **지역 변수**: 짧은 이름 사용 (`i`, `n`, `p`) — 범위가 좁으므로 맥락에서 의미가 명확
- 루프 변수에 `theElementIndex` 같은 긴 이름은 오히려 가독성을 해친다

**함수 이름은 능동적으로:**
- `getTime()`, `putChar()`, `isDigit()` — 동작을 나타내는 동사로 시작
- boolean 반환 함수는 `is`, `has` 접두사: `isReady()`, `hasNext()`

**일관성 유지:**
- 한 프로젝트에서 같은 개념에 같은 이름 패턴을 사용한다
- `class` vs `queue` vs `type` 등 동의어를 혼용하지 않는다

## 예시

```c
// 좋은 예: 전역은 서술적, 지역은 짧게
int npending = 0;  // 전역: 대기 중인 이벤트 수

for (int i = 0; i < n; i++)    // 지역: 짧은 루프 변수
    queue[i] = 0;

// 나쁜 예: 전역이 너무 짧거나, 지역이 너무 길다
int n;  // 전역인데 무엇의 n인지 불명확
for (int theLoopCounterIndex = 0;  // 불필요하게 장황
     theLoopCounterIndex < numberOfElements;
     theLoopCounterIndex++)
```

```c
// 능동적 함수 이름
// 좋은 예
now = getTime();
putChar('\n');
if (isDigit(c)) ...

// 나쁜 예
now = date();        // 동사가 아님
output('\n');        // 모호함
if (checkDigit(c))   // check가 무엇을 반환하는지 불명확
```

## 관련 개념

- [코딩 스타일 (Coding Style)](/knowledge/software-engineering/coding-style/) - 이름 짓기는 스타일의 핵심 요소
- [코드 주석 (Code Comment)](/knowledge/software-engineering/code-comment/) - 좋은 이름은 주석의 필요성을 줄인다
- [API](/knowledge/software-engineering/api-basics/) - 공개 인터페이스에서 이름 짓기의 중요성
