---
title: "코딩 스타일 (Coding Style)"
description: "코드의 가독성과 유지보수성을 결정하는 작성 관행의 총체로, 좋은 스타일은 버그를 줄이고 코드를 이해하기 쉽게 만든다"
tags: ["Software-Engineering", "Coding-Style", "Readability", "Best-Practices"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/coding-style
sidebar:
  order: 101
---

## 핵심 개념

코딩 스타일은 프로그램의 논리적 정확성과는 별개로, 코드의 가독성과 유지보수성을 결정하는 작성 관행의 총체이다. 좋은 스타일은 버그를 줄이고 다른 프로그래머(미래의 자신 포함)가 코드를 이해하기 쉽게 만든다.

스타일은 단순한 미학이 아니다. 나쁜 스타일은 실제로 버그를 유발하고, 디버깅 시간을 늘리며, 코드의 수명을 단축시킨다.

## 동작 원리

**핵심 원칙:**

1. **이름 짓기**: 전역 변수는 서술적으로(`npending`), 지역 변수는 짧게(`i`, `n`), 함수명은 능동적으로(`getTime`, `putChar`).
2. **들여쓰기**: 코드의 구조를 시각적으로 드러내도록 일관되게 들여쓴다.
3. **자연스러운 표현**: `if(!(a>b))` 대신 `if(a<=b)`처럼 자연스러운 형태를 사용한다.
4. **일관성**: 팀이나 프로젝트 내에서 하나의 스타일을 선택하고 고수한다.
5. **관용구 사용**: 언어의 관용적 패턴을 따르면 경험 있는 프로그래머가 즉시 이해할 수 있다.

## 예시

```c
// 나쁜 스타일: 의미 없는 이름, 불일관한 형식
int f(int a,int b){
if(a>b)
{return a;}
else return b;
}

// 좋은 스타일: 명확한 이름, 일관된 들여쓰기
int max(int a, int b)
{
    return (a > b) ? a : b;
}
```

```c
// 자연스러운 표현 사용
// 부자연스러운 (이중 부정)
if (!(block_id < actblks) || !(block_id >= unatea))

// 자연스러운
if (block_id >= actblks || block_id < unatea)
```

## 관련 개념

- [명명 규칙 (Naming Convention)](/knowledge/software-engineering/naming-convention/) - 스타일의 가장 중요한 구성 요소
- [코드 주석 (Code Comment)](/knowledge/software-engineering/code-comment/) - 코드 문서화의 스타일 원칙
- [매직 넘버 (Magic Number)](/knowledge/software-engineering/magic-number/) - 상수 이름 짓기의 스타일 원칙
