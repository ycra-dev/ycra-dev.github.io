---
title: "코드 주석 (Code Comment)"
description: "프로그램의 의도와 맥락을 설명하는 자연어 텍스트로, 잘 쓰인 주석은 '왜(why)'를 설명하고 코드가 전달할 수 없는 정보를 보완한다"
tags: ["Software-Engineering", "Documentation", "Readability", "Best-Practices"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/code-comment
sidebar:
  order: 104
---

## 핵심 개념

코드 주석은 프로그램의 의도와 맥락을 설명하는 자연어 텍스트이다. 잘 쓰인 주석은 "왜(why)"를 설명하고, 잘못 쓰인 주석은 코드와 모순되거나 명백한 것을 반복하여 오히려 해가 된다.

**핵심 통찰**: 좋은 코드는 주석이 적게 필요하다. 이름과 구조가 명확하면 코드 자체가 문서가 된다. 주석은 코드가 전달할 수 없는 정보(설계 의도, 알고리즘 출처, 제약 사항의 이유)를 보완하는 역할이다.

## 동작 원리

**주석 원칙:**

1. **자명한 것을 반복하지 말라**: `i++; // increment i`는 무가치하다.
2. **함수와 전역 데이터에 주석을 달라**: 각 함수의 목적, 전역 변수의 역할을 설명한다.
3. **나쁜 코드에 주석을 달지 말라 — 다시 작성하라**: 주석으로 복잡한 코드를 설명하려 하지 말고, 코드 자체를 명확하게 고쳐라.
4. **코드와 모순되지 말라**: 코드가 바뀌면 주석도 함께 갱신해야 한다. 오래된 주석은 없는 것보다 나쁘다.

## 예시

```c
// 나쁜 주석: 자명한 것을 반복
int count = 0;   // count를 0으로 초기화
count++;          // count를 증가시킴
return count;     // count를 반환

// 좋은 주석: 의도와 맥락을 설명
// 타임아웃 후 재시도 횟수 — RFC 2988 권장값
int max_retries = 3;

// 역순 순회: 삭제 시 인덱스가 밀리는 것을 방지
for (int i = n - 1; i >= 0; i--)
    if (should_remove(arr[i]))
        remove_at(arr, i);
```

```c
// 최악의 주석: 코드와 모순
// 배열을 오름차순으로 정렬
sort(arr, n, DESCENDING);  // 실제로는 내림차순!
```

## 관련 개념

- [코딩 스타일 (Coding Style)](/knowledge/software-engineering/coding-style/) - 주석은 스타일의 중요한 구성 요소
- [명명 규칙 (Naming Convention)](/knowledge/software-engineering/naming-convention/) - 좋은 이름은 주석의 필요성을 줄인다
- [API](/knowledge/software-engineering/api-basics/) - API 문서화에서 주석이 핵심 역할을 한다
