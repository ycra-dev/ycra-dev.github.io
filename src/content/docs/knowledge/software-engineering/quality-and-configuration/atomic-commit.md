---
title: "Atomic Commit"
description: "하나의 논리적 변경 단위만을 포함하는 버전 관리 커밋"
tags: ["Software Engineering", "Version Control", "Best Practice"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/atomic-commit
sidebar:
  order: 15
---

## 핵심 개념

원자적 커밋(Atomic Commit)은 하나의 논리적 변경 단위만을 포함하는 버전 관리 커밋이다. "원자적"이라 함은 더 이상 의미 있게 분할할 수 없는 최소 단위라는 뜻이다. 효과적인 버전 관리의 핵심이며, 커밋 메시지에서는 "왜(why)" 변경했는지를 기록하는 것이 "무엇을(what)" 변경했는지보다 중요하다.

## 동작 원리

원자적 커밋의 이점:
- **이력 추적이 쉽다**: 각 커밋이 무엇을 왜 변경했는지 명확
- **되돌리기가 안전하다**: 문제가 된 변경만 정확히 revert 가능
- **코드 리뷰가 효과적**: 작은 단위의 변경은 리뷰하기 쉽다
- **이진 탐색 디버깅**: `git bisect`가 효과적으로 동작

원자적이지 않은 커밋의 문제:
- 버그 수정과 리팩토링이 섞이면 어느 것이 문제를 일으켰는지 파악 어려움
- 기능 변경과 포맷팅 변경이 섞이면 diff가 지저분해짐
- 큰 커밋은 리뷰어의 피로도를 높이고 리뷰 품질을 떨어뜨림

## 예시

```bash
# 나쁜 커밋: 여러 변경이 섞임
git add -A
git commit -m "Various changes"
# → 버그 수정 + 새 기능 + 코드 포맷팅이 한 커밋에

# 좋은 원자적 커밋: 변경 유형별로 분리
git add src/parser.py
git commit -m "Fix off-by-one error in CSV parser

The previous implementation skipped the last column when
parsing CSV files with trailing commas."

git add src/parser.py tests/test_parser.py
git commit -m "Add support for quoted fields in CSV parser"

git add src/formatter.py
git commit -m "Apply consistent formatting to formatter module"
```

커밋 메시지의 "왜" 기록:
```bash
# 나쁜 예 (what만 설명)
git commit -m "Fix token expiration check"

# 좋은 예 (why도 설명)
git commit -m "Fix token expiration check in auth module

The previous implementation didn't account for clock skew
between servers, causing intermittent auth failures in
multi-region deployments."
```

## 관련 개념

- [Version Management](/knowledge/software-engineering/quality-and-configuration/version-management/)
- [Code Review](/knowledge/software-engineering/quality-and-configuration/reviews-and-inspections/)
- [Debugging](/knowledge/software-engineering/foundations/debugging/)
- [Code Readability](/knowledge/software-engineering/design-and-evolution/code-readability/)
