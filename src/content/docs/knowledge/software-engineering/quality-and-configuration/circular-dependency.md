---
title: "Circular Dependency"
description: "라이브러리가 전이적으로 자기 자신에 의존하는 구조"
tags: ["Software Engineering", "Dependency Management", "Anti-Pattern"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/circular-dependency
sidebar:
  order: 27
---

## 핵심 개념

순환 의존성(Circular Dependency)은 라이브러리(또는 모듈)가 전이적으로 자기 자신에 의존하는 구조이다. A → B → C → A. 닭과 달걀 문제처럼 하나를 업그레이드하면 다른 것이 깨지는 악순환이 발생한다.

## 동작 원리

순환 의존성이 위험한 이유:
- **빌드 순서 문제**: 어떤 것을 먼저 빌드해야 하는가?
- **업그레이드 어려움**: 하나를 바꾸면 다른 것도 바꿔야 하는 연쇄
- **이상한 빌드 동작**: 예측 불가능한 컴파일 오류
- **배포 순서 문제**: 어떤 서비스를 먼저 배포해야 하는가?

유틸리티/헬퍼 프로젝트에서 자주 발생한다:
- NLP 라이브러리가 문자열 유틸리티에 의존
- 문자열 유틸리티가 NLP의 단어 처리 함수를 역으로 사용

원칙: **절대로 순환 의존성을 도입하지 말 것.** 빌드 도구의 순환 의존성 탐지기를 활용한다.

## 예시

순환 의존성의 발생:
```
string-utils → nlp-lib (형태소 분석 위해)
nlp-lib → string-utils (문자열 파싱 위해)
→ 무한 순환!
```

해결 방법 1: 공통 기능 추출
```
# Before: 순환
string-utils ←→ nlp-lib

# After: 공통 라이브러리로 추출
common-utils
  ├── string-utils (→ common-utils만 의존)
  └── nlp-lib (→ common-utils만 의존)
```

해결 방법 2: 의존성 방향 역전
```python
# Before: 직접 의존 (순환 유발)
class NlpProcessor:
    def process(self, text):
        tokens = StringUtils.tokenize(text)  # StringUtils에 직접 의존

# After: 인터페이스로 분리
class NlpProcessor:
    def __init__(self, tokenizer: Tokenizer):  # 인터페이스에 의존
        self.tokenizer = tokenizer

    def process(self, text):
        tokens = self.tokenizer.tokenize(text)
```

순환 의존성 탐지:
```bash
# Python
python -c "import modulegraph; modulegraph.run()"

# Java/Gradle
gradle build  # JDepend 플러그인으로 순환 탐지

# JavaScript
madge --circular src/
```

## 관련 개념

- [Dependency Hell](/knowledge/software-engineering/quality-and-configuration/dependency-hell/)
- [Diamond Dependency](/knowledge/software-engineering/quality-and-configuration/diamond-dependency/)
- [Coupling](/knowledge/software-engineering/architectural-design/coupling/)
