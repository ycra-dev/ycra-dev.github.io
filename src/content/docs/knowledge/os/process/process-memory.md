---
title: "프로세스 메모리 구조 (Process Memory Layout)"
description: "프로세스의 메모리 레이아웃은 Text, Data, Heap, Stack 4개 섹션으로 구성된다"
tags: ["OS", "Process", "Memory"]
created: 2026-01-27
updated: 2026-01-27
draft: true
slug: knowledge/os/process-memory
sidebar:
  order: 4
---

## 핵심 개념

프로세스가 메모리에 올라가면 **4개의 섹션**으로 나뉜다. 각 섹션은 역할이 다르고, 크기가 고정인 것과 가변인 것이 있다.

| 섹션 | 내용 | 크기 | 비고 |
|------|------|------|------|
| **Text** | 실행할 기계어 코드 | 고정 | 읽기 전용 |
| **Data** | 전역 변수, 정적(static) 변수 | 고정 | 초기화된 데이터 + BSS |
| **Heap** | 동적 할당 영역 (`malloc`, `new`) | 가변 | 위로 성장 (↑) |
| **Stack** | 지역 변수, 매개변수, 리턴 주소 | 가변 | 아래로 성장 (↓) |

쉽게 말하면, Text는 "무엇을 할지(코드)", Data는 "처음부터 있는 데이터", Heap은 "실행 중 요청한 데이터", Stack은 "함수 호출 때 잠깐 쓰는 데이터"이다.

## 동작 원리

```
높은 주소  ┌─────────────────────┐
           │       Stack         │ ← 지역 변수, 매개변수
           │         ↓           │    (아래로 성장)
           │         ...         │
           │                     │
           │         ...         │
           │         ↑           │    (위로 성장)
           │       Heap          │ ← malloc(), new
           ├─────────────────────┤
           │       Data          │ ← 전역/정적 변수
           ├─────────────────────┤
           │       Text          │ ← 실행 코드 (read-only)
낮은 주소  └─────────────────────┘
```

**Heap과 Stack은 서로를 향해 자란다.** Heap은 낮은 주소에서 높은 주소로, Stack은 높은 주소에서 낮은 주소로 성장한다. OS는 이 두 영역이 겹치지 않도록 보장한다. 만약 겹치면 **Stack Overflow** 또는 **Heap Overflow**가 발생한다.

### 왜 이렇게 나눌까?

- **Text를 읽기 전용**으로 두면 여러 프로세스가 같은 프로그램을 실행할 때 코드를 공유할 수 있다.
- **Heap과 Stack을 반대 방향**으로 성장시키면 메모리 공간을 효율적으로 사용할 수 있다. 한쪽이 많이 쓰면 다른 쪽은 적게 쓰는 경우가 많기 때문이다.

## 예시

```c
#include <stdio.h>
#include <stdlib.h>

int global_var = 42;          // Data 섹션 (초기화된 전역 변수)
static int static_var = 10;   // Data 섹션 (정적 변수)

int main() {                  // Text 섹션 (코드)
    int local_var = 5;        // Stack 섹션 (지역 변수)
    int *ptr = malloc(sizeof(int) * 100);  // Heap 섹션 (동적 할당)

    printf("Text  (code):   %p\n", (void*)main);
    printf("Data  (global): %p\n", (void*)&global_var);
    printf("Heap  (malloc): %p\n", (void*)ptr);
    printf("Stack (local):  %p\n", (void*)&local_var);

    free(ptr);
    return 0;
}
```

실행하면 주소 순서가 `Text < Data < Heap < ... < Stack`임을 확인할 수 있다.

## 관련 개념

- [프로세스 (Process)](/knowledge/os/process/) - 메모리에 올라간 실행 중인 프로그램
- [스레드 (Thread)](/knowledge/os/thread/) - 같은 프로세스의 스레드들은 Text, Data, Heap을 공유하고 **Stack만 독립**적으로 가진다
