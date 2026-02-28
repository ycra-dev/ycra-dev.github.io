---
title: "코드 리딩 (Code Reading)"
description: "다른 사람이 작성한 소스 코드를 체계적으로 읽고 분석하여 각 줄이 무엇을 하는지 이해하는 학습 기법으로, 프로그래밍 언어 학습의 시작점이다."
tags: ["Career", "Code Reading", "Open Source", "Learning"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/professional-development/code-reading
sidebar:
  order: 13
---

## 핵심 개념

코드 리딩은 두 가지 시점에서 활용한다:

**1단계 - 학습 시작 시 (오픈소스 프로젝트 탐색)**:
- 가장 먼저 실제 작동하는 애플리케이션의 소스 코드를 살펴본다
- 불편하고 이해가 안 되는 것이 정상이다
- 목적: 프로그래밍 언어의 문법이 어떻게 생겼는지 느낌을 얻는 것
- 고고학자가 고대 문명의 글자를 해독하듯이 접근한다

**2단계 - 기본 학습 후 (한 줄씩 분석)**:
- 언어의 주요 개념을 배운 후, 기존 코드의 모든 줄을 하나하나 분석한다
- 각 줄과 문장이 정확히 무엇을 하는지 이해할 때까지 반복한다
- "왜(why)"보다 "무엇(what)"에 먼저 집중한다

단어의 뜻을 모르면 문장을 이해할 수 없고, 문장을 이해 못하면 개념을 파악할 수 없다.

## 동작 원리

"what"을 먼저 이해하지 않으면 "why"를 이해할 수 없다. 가장 낮은 수준에서 시작하여 점진적으로 상위 수준의 이해로 나아가야 한다.

## 예시

```python
# 1단계: 각 줄이 "무엇"을 하는지 분석
def binary_search(arr, target):    # 함수 정의: 배열과 목표값을 인자로 받음
    low = 0                         # 검색 범위의 시작 인덱스를 0으로 설정
    high = len(arr) - 1             # 검색 범위의 끝 인덱스를 배열 길이-1로 설정
    while low <= high:              # 시작이 끝보다 작거나 같은 동안 반복
        mid = (low + high) // 2     # 중간 인덱스 계산 (정수 나눗셈)
        if arr[mid] == target:      # 중간값이 목표값과 같으면
            return mid              # 중간 인덱스 반환
        elif arr[mid] < target:     # 중간값이 목표값보다 작으면
            low = mid + 1           # 시작을 중간 다음으로 이동
        else:
            high = mid - 1          # 끝을 중간 이전으로 이동
    return -1                       # 찾지 못하면 -1 반환

# 2단계: "왜" 이렇게 작성했는지 이해 (나중 단계)
# -> 이진 검색 알고리즘으로, 정렬된 배열에서 O(log n) 시간에 검색 가능
```

## 관련 개념

- [Hello World Program](/knowledge/career/foundations/hello-world-program/)
- [Learn by Doing](/knowledge/career/foundations/learn-by-doing/)
- [Coding Challenges](/knowledge/career/professional-development/coding-challenges/)
