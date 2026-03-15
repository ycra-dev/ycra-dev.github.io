---
title: "정적 코드 분석 (Static Code Analysis)"
description: "코드를 실행하지 않고 소스 텍스트를 분석하여 잠재적 버그, 스타일 위반, 보안 취약점을 자동으로 발견하는 도구와 기법이다."
tags: ["Software Engineering", "Code Quality", "Linting", "Security"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/static-code-analysis
sidebar:
  order: 14
---

## 핵심 개념

정적 코드 분석은 프로그램을 실행하지 않은 상태에서 소스코드를 자동으로 검사하는 것이다. 컴파일러의 경고보다 훨씬 심층적인 분석을 수행하여, null 포인터 역참조, 미사용 변수, SQL 인젝션 취약점, 복잡도 초과 등을 코드 리뷰 전에 자동으로 잡아낸다.

## 동작 원리

정적 분석 도구가 탐지하는 영역:

| 범주 | 탐지 항목 | 예시 도구 |
|------|----------|----------|
| 스타일/린팅 | 코딩 표준 위반 | ESLint, Pylint, Checkstyle |
| 보안 | SQL 인젝션, XSS, 하드코딩된 시크릿 | SonarQube, Bandit, Semgrep |
| 버그 | null 역참조, 데드코드, 조건 오류 | SpotBugs, Clang-Tidy |
| 복잡도 | 순환 복잡도 과다 | CodeClimate, SonarQube |
| 의존성 | 알려진 취약점이 있는 라이브러리 | Dependabot, Snyk |

CI 파이프라인에 통합하면 PR 생성 시 자동으로 분석하고 위반 사항을 코멘트로 남긴다.

## 예시

```yaml
# GitHub Actions에 ESLint + SonarQube 통합
- name: Run ESLint
  run: npx eslint src/ --max-warnings 0
- name: SonarQube Scan
  uses: sonarsource/sonarqube-scan-action@master
```

- ESLint: `no-unused-vars`, `no-console`, `eqeqeq` 규칙 자동 체크
- SonarQube: "Code Smells", "Vulnerabilities", "Bugs" 대시보드
- Pre-commit hook으로 커밋 전 린터 자동 실행
- 코드 커버리지 70% 미만 시 PR 차단

## 관련 개념

- [코딩 표준](/knowledge/software-engineering/quality-and-configuration/coding-standard/)
- [코드 리뷰](/knowledge/software-engineering/quality-and-configuration/reviews-and-inspections/)
- [지속적 배포](/knowledge/software-engineering/quality-and-configuration/continuous-deployment/)
