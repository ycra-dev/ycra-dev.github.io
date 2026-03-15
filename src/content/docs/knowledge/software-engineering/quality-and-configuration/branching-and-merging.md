---
title: "브랜칭과 병합 (Branching and Merging)"
description: "Git 등의 버전 관리 시스템에서 독립적인 작업 흐름(브랜치)을 만들고 완성 후 메인 코드베이스에 통합하는 협업 전략이다."
tags: ["Software Engineering", "Version Control", "Git", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/branching-and-merging
sidebar:
  order: 12
---

## 핵심 개념

브랜치는 메인 코드베이스의 복사본을 만들어 독립적으로 작업하는 공간이다. 여러 개발자가 서로 방해받지 않고 동시에 작업하고, 완성된 코드만 메인 브랜치에 합친다(merge). 충돌(conflict)이 발생하면 두 변경사항 중 어느 것을 적용할지 수동으로 결정해야 한다.

## 동작 원리

일반적인 브랜치 전략(Git Flow):

```
main (또는 master)
  ├── develop
  │     ├── feature/login-page
  │     ├── feature/payment-api
  │     └── bugfix/null-pointer-error
  └── hotfix/critical-security-patch
```

머지 방식:
- **Fast-forward merge**: 브랜치가 main보다 앞서 있을 때 포인터만 이동
- **3-way merge**: 두 브랜치와 공통 조상을 비교하여 자동 통합
- **Rebase**: 브랜치의 커밋을 main의 끝에 재적용 (더 깔끔한 히스토리)
- **Squash merge**: 브랜치의 여러 커밋을 하나로 합쳐 머지

충돌 해결: 같은 파일의 같은 줄을 두 브랜치에서 다르게 수정하면 Git이 자동 머지를 포기하고 수동 해결을 요구한다.

## 예시

```bash
git checkout -b feature/user-auth   # 새 브랜치 생성
# ... 작업 ...
git add . && git commit -m "feat: add JWT authentication"
git checkout main
git merge feature/user-auth          # main에 병합
```

- GitHub/GitLab의 Pull Request/Merge Request: 코드 리뷰 후 병합
- GitHub Flow: `main` 브랜치 하나 + 기능 브랜치 (단순한 팀에 적합)
- Trunk-based Development: 작은 커밋을 main에 자주 직접 푸시

## 관련 개념

- [버전 관리](/knowledge/software-engineering/quality-and-configuration/version-management/)
- [지속적 통합](/knowledge/software-engineering/agile-methods/continuous-integration/)
- [코드 리뷰](/knowledge/software-engineering/quality-and-configuration/reviews-and-inspections/)
