---
title: "분할 정복 디버깅 (Divide and Conquer Debugging)"
description: "버그 위치를 빠르게 찾기 위해 문제 공간을 절반씩 나누어 좁혀가는 이진 탐색 방식의 디버깅 기법이다."
tags: ["Software Engineering", "Debugging", "Problem Solving"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/divide-and-conquer-debugging
sidebar:
  order: 24
---

## 핵심 개념

분할 정복 디버깅은 버그를 찾을 때 코드를 절반씩 나눠 가면서 문제 범위를 줄여가는 기법이다. 1000줄 코드에서 버그를 찾을 때 처음부터 한 줄씩 추적하면 최악의 경우 1000번 확인해야 하지만, 이진 탐색 방식으로 접근하면 10번 만에 찾을 수 있다.

## 동작 원리

```
1. 코드의 중간 지점에 중단점(breakpoint)이나 로그를 추가한다
2. 이 지점에서 상태가 정상인지 확인한다
3. 정상이면 → 버그는 하반부에 있다 (하반부를 다시 절반으로 나눈다)
4. 비정상이면 → 버그는 상반부에 있다 (상반부를 다시 절반으로 나눈다)
5. 버그 위치가 충분히 좁혀질 때까지 반복한다
```

Git으로 언제 버그가 도입됐는지 찾을 때는 `git bisect` 명령어가 이 원리를 자동화해 준다.

## 예시

- 1000줄 코드에서 버그 탐색: 500번째 줄에서 상태 확인 → 정상이면 501-1000줄 범위로 좁힘 → 750번째 줄에서 재확인 → 10회 이내에 범위를 1줄로 좁힘
- `git bisect start` → `git bisect bad HEAD` → `git bisect good v1.0` → 이진 탐색으로 버그 커밋 발견
- API 오류 디버깅: 요청이 어느 레이어(라우터, 서비스, DB)에서 깨지는지 중간 지점부터 확인

## 관련 개념

- [디버깅](/knowledge/software-engineering/foundations/debugging/)
- [고장 격리](/knowledge/software-engineering/foundations/heisenbug/)
