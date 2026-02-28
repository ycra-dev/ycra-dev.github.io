---
title: "Coding Standard"
description: "팀이나 조직에서 코드의 스타일, 구조, 관례를 통일하기 위해 합의한 규칙 집합"
tags: ["Software Engineering", "Team Practice", "Convention"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/coding-standard
sidebar:
  order: 16
---

## 핵심 개념

코딩 표준(Coding Standard)은 팀이나 조직에서 코드의 스타일, 구조, 관례를 통일하기 위해 합의한 규칙 집합이다. 코딩 컨벤션(Coding Convention) 또는 스타일 가이드(Style Guide)라고도 한다. 목적은 코드의 일관성(Consistency)을 확보하는 것이다.

## 동작 원리

코딩 표준에 포함되는 요소:
- **명명 규칙**: 변수, 함수, 클래스의 명명 방식 (camelCase, snake_case 등)
- **레이아웃**: 들여쓰기, 중괄호 위치, 줄 길이 제한
- **주석 규칙**: 언제, 어떻게 주석을 작성할지
- **에러 처리 패턴**: 예외 사용 방식, 에러 보고 방법
- **파일 구조**: 디렉토리 구조, 파일 명명 규칙

주의사항:
- 표준은 "성전"이 아니다. 교조적으로 따르면 오히려 해롭다
- 팀원 전원이 합의해야 효과적이다
- 자동화된 린터와 포매터로 기계적으로 적용 가능한 부분은 자동화한다
- 표준은 살아있는 문서여야 한다. 필요 시 업데이트한다

## 예시

```python
# Python 코딩 표준 예시 (PEP 8 기반)

# 명명 규칙
class UserAccount:        # 클래스: PascalCase
    def get_balance(self): # 메서드: snake_case
        return self._balance  # private: 언더스코어 접두사

MAX_RETRY_COUNT = 3       # 상수: UPPER_SNAKE_CASE

# 자동화: pre-commit hook으로 강제
# .pre-commit-config.yaml
# - repo: https://github.com/psf/black
#   hooks:
#   - id: black
# - repo: https://github.com/pycqa/flake8
#   hooks:
#   - id: flake8
```

Bike-Shedding 방지:
- 코드 포맷팅 논쟁은 린터/포매터에 위임한다
- 중요한 아키텍처 결정에 집중하도록 자동화 도구를 활용한다

## 관련 개념

- [Code Readability](/knowledge/software-engineering/design-and-evolution/code-readability/)
- [Code Idiom](/knowledge/software-engineering/design-and-evolution/code-idiom/)
- [Bike-Shedding](/knowledge/software-engineering/foundations/bike-shedding/)
