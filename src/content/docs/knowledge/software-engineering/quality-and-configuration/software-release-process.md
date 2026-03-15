---
title: "소프트웨어 릴리스 프로세스 (Software Release Process)"
description: "개발된 소프트웨어를 사용자에게 전달하기 위한 체계적인 절차"
tags: ["Software Engineering", "Release Management", "DevOps"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/software-release-process
sidebar:
  order: 17
---

## 핵심 개념

소프트웨어 릴리스 프로세스는 개발된 소프트웨어를 사용자에게 전달하기 위한 체계적인 절차이다. 빌드, 테스트, 패키징, 배포, 검증의 단계를 포함한다. 릴리스는 단순한 "코드 배포"가 아닌 체계적인 프로세스이며, **"일찍 릴리스하고, 자주 릴리스하라(Release Early and Often)"**가 핵심 원칙이다.

## 동작 원리

5단계 릴리스 프로세스:
1. **정의(Define)**: 릴리스에 포함될 기능과 버그 수정 목록 확정
2. **준비(Prepare)**: 릴리스 브랜치 생성, 버전 번호 부여, 릴리스 노트 작성
3. **빌드(Build)**: 릴리스 빌드 생성, 빌드 자동화
4. **테스트(Test)**: QA 테스트, 회귀 테스트, 성능 테스트
5. **배포(Deploy)**: 프로덕션 환경에 배포, 모니터링

핵심 원칙:
- 릴리스 프로세스를 최대한 자동화한다
- 모든 릴리스에 태그를 달고 릴리스 아티팩트를 보관한다
- 릴리스 노트를 의도적으로 작성한다 (변경 사항, 알려진 문제 등)

## 예시

```bash
# 릴리스 프로세스 자동화 예시

# 1. 릴리스 브랜치 생성
git checkout -b release/2.1.0 main

# 2. 버전 번호 업데이트
echo "2.1.0" > VERSION
git commit -am "Bump version to 2.1.0"

# 3. 빌드 & 테스트
make build && make test

# 4. 태그 생성
git tag -a v2.1.0 -m "Release 2.1.0"

# 5. 배포
make deploy

# 6. main에 병합
git checkout main && git merge release/2.1.0
```

릴리스 노트 예시:
```markdown
## v2.1.0 (2026-02-27)

### New Features
- Added support for bulk user import
- Dark mode for dashboard

### Bug Fixes
- Fixed payment timeout in high-load scenarios

### Known Issues
- PDF export is slow for reports > 1000 rows

### Breaking Changes
- None
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [지속적 전달 (Continuous Delivery)](/knowledge/software-engineering/quality-and-configuration/continuous-delivery/)
- [코드 프리즈 (Code Freeze)](/knowledge/software-engineering/quality-and-configuration/code-freeze/)
- [시맨틱 버전 관리 (Semantic Versioning)](/knowledge/software-engineering/quality-and-configuration/semantic-versioning/)
