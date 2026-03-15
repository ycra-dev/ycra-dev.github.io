---
title: "스택 (Stack)"
description: "스택(Stack)은 후입선출(LIFO, Last-In First-Out) 정책을 따르는 동적 집합으로, 가장 최근에 삽입된 원소가 가장 먼저 삭제되는 자료구조이다"
tags: ['Stack', 'Data Structure', 'Lifo', 'Elementary', 'Push', 'Pop']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/stack
sidebar:
  order: 4
---

## 핵심 개념

스택은 삽입(PUSH)과 삭제(POP)가 한쪽 끝(top)에서만 이루어지는 자료구조이다. 배열 S[1:n]을 사용하여 최대 n개의 원소를 저장할 수 있으며, S.top 속성이 가장 최근에 삽입된 원소의 인덱스를 가리킨다.

**핵심 연산과 시간 복잡도:**
- STACK-EMPTY(S): S.top == 0이면 TRUE 반환 - O(1)
- PUSH(S, x): S.top을 증가시키고 x를 저장 - O(1)
- POP(S): S.top 위치의 원소를 반환하고 S.top 감소 - O(1)

**경계 조건:**
- S.top = 0일 때 스택은 비어 있다 (empty)
- 빈 스택에서 POP을 시도하면 언더플로(underflow) 발생
- S.top이 S.size를 초과하면 오버플로(overflow) 발생

스택은 함수 호출 관리, 표현식 평가, 트리 순회의 비재귀적 구현 등 다양한 알고리즘에서 핵심적으로 사용된다. A. M. Turing이 1947년에 서브루틴 연결을 위해 스택을 개발한 것으로 알려져 있다.

## 예시

```
STACK-EMPTY(S)
  if S.top == 0
    return TRUE
  else return FALSE

PUSH(S, x)
  if S.top == S.size
    error "overflow"
  else S.top = S.top + 1
       S[S.top] = x

POP(S)
  if STACK-EMPTY(S)
    error "underflow"
  else S.top = S.top - 1
       return S[S.top + 1]

// 실행 예시: S[1:6], 초기 S.top = 0
// PUSH(S, 4) -> S = [4, _, _, _, _, _], top = 1
// PUSH(S, 1) -> S = [4, 1, _, _, _, _], top = 2
// POP(S)     -> returns 1, top = 1
// PUSH(S, 8) -> S = [4, 8, _, _, _, _], top = 2
```

## 관련 개념

- [배열 (Array)](/knowledge/algorithms/array/)
- [큐 (Queue)](/knowledge/algorithms/queue/)
- [연결 리스트 (Linked List)](/knowledge/algorithms/linked-list/)
- [자료구조 (Data Structure)](/knowledge/algorithms/data-structure/)
