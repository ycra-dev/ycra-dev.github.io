---
title: "소프트웨어 고고학 (Software Archaeology)"
description: "기존 코드베이스의 역사와 구조를 조사하고 이해하는 체계적인 탐색 활동"
tags: ["Software Engineering", "Maintenance", "Legacy Code"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/software-archaeology
sidebar:
  order: 11
---

## 핵심 개념

소프트웨어 고고학(Software Archaeology)은 기존 코드베이스의 역사와 구조를 조사하고 이해하는 체계적인 탐색 활동이다. 버전 관리 이력, 코드 구조, 문서 등을 통해 코드의 진화 과정을 파악한다. 새 프로젝트에 합류하거나 레거시 코드를 다룰 때, 코드베이스를 이해하는 것이 첫 번째 과제이다.

## 동작 원리

탐색 방법:
- **버전 관리 이력 분석**: `git log`, `git blame`으로 코드 변경 이유와 맥락을 파악
- **파일 구조 조사**: 디렉토리 구조, 명명 규칙으로 아키텍처 파악
- **테스트 코드 읽기**: 테스트는 코드의 의도된 동작을 문서화한다
- **빌드 시스템 분석**: 의존성, 모듈 구조를 이해
- **문서 확인**: README, 위키, 코드 주석에서 설계 의도 파악
- **정적 분석 도구 활용**: 코드 의존성, 복잡도 측정

"조금씩 자주(little-and-often)" 접근이 효과적이다. 코드를 수정할 때마다 주변 코드를 조금씩 이해해 나간다.

## 예시

```bash
# 버전 관리를 활용한 소프트웨어 고고학

# 특정 파일의 변경 이력 추적
git log --oneline -- src/core/engine.py

# 특정 줄의 작성자와 커밋 확인
git blame src/core/engine.py

# 두 버전 간의 변경 사항 비교
git diff v1.0..v2.0 -- src/core/

# 특정 함수가 언제 도입되었는지 검색
git log -S "def process_event" --oneline
```

## 관련 개념

- [버전 관리 (Version Control)](/knowledge/software-engineering/quality-and-configuration/version-management/)
- [레거시 시스템 (Legacy Systems)](/knowledge/software-engineering/design-and-evolution/legacy-systems/)
- [코드 가독성 (Code Readability)](/knowledge/software-engineering/design-and-evolution/code-readability/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
