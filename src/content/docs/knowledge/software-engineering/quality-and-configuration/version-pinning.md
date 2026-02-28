---
title: "Version Pinning"
description: "모든 의존성의 버전 번호를 명시적으로 고정하는 관행"
tags: ["Software Engineering", "Dependency Management", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/version-pinning
sidebar:
  order: 28
---

## 핵심 개념

버전 고정(Version Pinning)은 모든 의존성의 버전 번호를 명시적으로 고정하는 관행이다. 언핀된 버전은 빌드 시스템이 임의로 결정하며, 같은 코드가 시점에 따라 다르게 동작할 수 있다. 빌드 안정성과 재현 가능성(reproducibility)의 핵심이다.

## 동작 원리

버전을 고정하지 않을 때의 문제:
- 와일드카드(`>=2.0`)는 버그 수정과 함께 새 버그, 동작 변경, 비호환 변경도 가져올 수 있다
- "어제는 됐는데 오늘은 안 된다" 현상의 주요 원인
- CI/CD에서 빌드마다 다른 결과 발생

Lock 파일로 전이적 의존성까지 고정:
- Python: `pip freeze > requirements.txt` 또는 `poetry.lock`
- Node.js: `package-lock.json` 또는 `yarn.lock`
- Rust: `Cargo.lock`
- Ruby: `Gemfile.lock`

Lock 파일을 **반드시 Git에 커밋**해야 팀 전체가 동일한 의존성을 사용한다.

## 예시

```
# Python requirements.txt

# Bad: 버전 미고정
requests
flask>=2.0

# Better: 범위 제한
flask>=2.0,<3.0
requests>=2.28,<3.0

# Best: 완전 고정
requests==2.28.1
flask==2.3.2

# pip freeze로 전이적 의존성까지 고정
pip install -r requirements.in   # 개략적 요구사항
pip freeze > requirements.txt    # 정확한 버전 고정
```

```json
// Node.js package.json
{
  "dependencies": {
    "express": "^4.18.0"  // ^ = 마이너까지 자동 업데이트 (주의!)
  }
}

// package-lock.json (자동 생성, 반드시 커밋)
{
  "express": {
    "version": "4.18.2",  // 정확한 버전 고정
    "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz"
  }
}
```

보안 업데이트를 위한 정기적 업데이트:
```bash
# 취약점 확인
pip audit
npm audit

# 마이너/패치 업데이트만 허용하며 업데이트
pip install --upgrade --upgrade-strategy=only-if-needed -r requirements.txt
```

## 관련 개념

- [Semantic Versioning](/knowledge/software-engineering/quality-and-configuration/semantic-versioning/)
- [Dependency Hell](/knowledge/software-engineering/quality-and-configuration/dependency-hell/)
- [Transitive Dependency](/knowledge/software-engineering/quality-and-configuration/transitive-dependency/)
