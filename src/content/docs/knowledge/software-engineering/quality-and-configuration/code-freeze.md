---
title: "코드 프리즈 (Code Freeze)"
description: "소프트웨어 릴리스 전에 코드베이스에 대한 변경을 제한하는 기간"
tags: ["Software Engineering", "Release Management", "Process"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/code-freeze
sidebar:
  order: 16
---

## 핵심 개념

코드 프리즈(Code Freeze)는 소프트웨어 릴리스 전에 코드베이스에 대한 변경을 제한하는 기간이다. 새 기능 추가를 중단하고 안정화에 집중한다. 기술 부채가 많으면 코드 프리즈 기간이 길어지며, 이는 일상적인 코드 품질 관리의 중요성을 역설한다.

## 동작 원리

코드 프리즈의 유형:
- **기능 프리즈(Feature Freeze)**: 새 기능 추가 중단, 버그 수정만 허용
- **완전 프리즈**: 모든 변경 중단, 릴리스 준비만 진행

코드 프리즈가 필요한 이유:
- 릴리스 안정성 확보
- QA 팀이 변하지 않는 코드를 테스트할 시간 확보
- 릴리스 관련 작업(문서, 빌드, 패키징)에 집중

코드 프리즈를 피하는 현대적 접근:
- **지속적 배포(CD)**: 항상 릴리스 가능한 상태를 유지
- **기능 토글(Feature Flag)**: 코드는 배포하되 기능은 비활성화
- **릴리스 브랜치**: 메인 개발과 릴리스 준비를 분리

## 예시

릴리스 브랜치를 사용한 코드 프리즈 대안:

```
main ────●────●────●────●────●──── (개발 계속)
          \
           ●── release/2.0 ── (버그 수정만)
           │
           ├── QA 테스트
           ├── 버그 수정 cherry-pick
           └── v2.0 태그 → 배포

→ main 브랜치는 프리즈 없이 계속 개발
→ release 브랜치만 안정화에 집중
```

Feature Flag를 사용하여 프리즈 없이 배포하기:
```python
# main에 미완성 기능이 있어도 배포 가능
def new_checkout():
    if feature_flags.is_enabled("new_checkout_v2"):
        return new_checkout_flow()
    else:
        return legacy_checkout_flow()

# 릴리스 시 flag만 활성화
# feature_flags.enable("new_checkout_v2")
```

## 관련 개념

- [버전 관리 (Version Management)](/knowledge/software-engineering/quality-and-configuration/version-management/)
- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [기능 플래그 (Feature Flag)](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [기술 부채 (Technical Debt)](/knowledge/software-engineering/design-and-evolution/technical-debt/)
