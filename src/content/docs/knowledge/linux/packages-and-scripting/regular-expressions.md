---
title: "정규 표현식 (Regular Expressions)"
description: "정규 표현식(regex)은 텍스트 패턴을 표준화된 문법으로 정의하여 문자열을 검색, 매칭, 치환하는 도구로, 대부분의 프로그래밍 언어와 유닉스 명령어에서 지원된다"
tags: ['Regex', 'Pattern Matching', 'Text Processing', 'Grep', 'Sed']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/regular-expressions
sidebar:
  order: 11
---

## 핵심 개념

**메타문자**: `.`(임의 한 문자), `*`(0회 이상), `+`(1회 이상), `?`(0 또는 1회), `^`(줄 시작), `$`(줄 끝), `|`(OR), `[]`(문자 클래스), `()`(그룹). 정규 표현식은 쉘의 파일명 글로빙(globbing)과는 다른 시스템이다.

**탐욕성(greediness)**: `*`과 `+`는 기본적으로 탐욕적으로 동작하여 가능한 많은 문자를 매칭한다. "catastrophic backtracking" 방지를 위해 lazy 연산자(`*?`, `+?`)를 사용하거나 줄 단위로 처리하는 것이 좋다.

**캡처 그룹**: 괄호로 묶인 부분은 `\1`, `\2` 등의 역참조를 통해 치환 패턴에서 재사용할 수 있다. grep, sed, awk, Python(re 모듈), Ruby에서 정규 표현식을 지원한다.

## 예시

```python
import re

# US zip code 패턴
zip_pattern = re.compile(r'^\d{5}(-\d{4})?$')

# 이메일 추출 (캡처 그룹)
email_pattern = re.compile(r'([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})')
matches = email_pattern.findall("Contact support@example.com")

# Lazy vs Greedy
html = "<img src='a.jpg'> text <img src='b.jpg'>"
greedy = re.findall(r'<img.*>', html)   # 전체 매칭
lazy = re.findall(r'<img.*?>', html)    # 각 태그 매칭
```

## 관련 개념

- [셸 스크립팅 (Shell Scripting)](/knowledge/linux/shell-scripting/)
- [Python 스크립팅 (Python Scripting)](/knowledge/linux/python-scripting/)
- [명령줄 파이프라인 (Command-Line Pipelines)](/knowledge/linux/command-line-pipelines/)
