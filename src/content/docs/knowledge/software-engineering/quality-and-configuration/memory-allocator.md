---
title: "메모리 할당자 (Memory Allocator)"
description: "특정 할당 패턴에 맞게 설계된 전용 메모리 관리 시스템으로, 범용 malloc보다 훨씬 빠를 수 있다"
tags: ["Software-Engineering", "Performance", "Memory", "Pool-Allocator"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/memory-allocator
sidebar:
  order: 204
---

## 핵심 개념

커스텀 메모리 할당자는 특정 할당 패턴에 맞게 설계된 전용 메모리 관리 시스템으로, 범용 malloc보다 훨씬 빠를 수 있다.

범용 메모리 할당자(malloc/free)는 모든 크기의 할당을 처리해야 하므로 오버헤드가 크다. 프로그램의 할당 패턴이 예측 가능한 경우, 전용 할당자를 만들어 성능을 크게 향상시킬 수 있다.

## 동작 원리

**풀 할당자(Pool Allocator)의 원리:**
1. 고정 크기 블록의 큰 배열을 한 번에 할당
2. 개별 요청 시 풀에서 블록 하나를 반환 (O(1))
3. 해제 시 블록을 프리 리스트에 반환 (O(1))
4. 풀이 소진되면 새 풀을 할당

**장점:**
- malloc/free 호출 횟수를 크게 줄임
- 메모리 단편화(fragmentation) 감소
- 캐시 지역성(locality) 향상
- 일괄 해제(bulk free) 가능

## 예시

```c
/* 고정 크기 풀 할당자 */
#define POOL_SIZE 1024

typedef struct Node {
    int data;
    struct Node *next;
} Node;

static Node pool[POOL_SIZE];
static Node *freelist = NULL;
static int pool_used = 0;

Node *pool_alloc(void) {
    Node *p;
    if (freelist != NULL) {
        p = freelist;
        freelist = freelist->next;
    } else if (pool_used < POOL_SIZE) {
        p = &pool[pool_used++];
    } else {
        return NULL;  // 풀 소진
    }
    return p;
}

void pool_free(Node *p) {
    p->next = freelist;
    freelist = p;  // 프리 리스트 앞에 추가
}

/* 성능 비교:
 * 100만 개 노드 할당/해제:
 * malloc/free:  0.42초
 * pool_alloc:   0.05초 (8배 빠름)
 */
```

## 관련 개념

- [프로파일링 (Profiling)](/knowledge/software-engineering/profiling/) - 메모리 할당이 병목인지 측정으로 확인한다
- [공간-시간 트레이드오프 (Space-Time Tradeoff)](/knowledge/software-engineering/space-time-tradeoff/) - 풀은 메모리를 미리 사용하여 속도를 높이는 트레이드오프이다
