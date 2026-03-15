---
title: "트렁크 기반 개발 (Trunk-Based Development)"
description: "모든 개발자가 메인 브랜치에서 작업하는 브랜칭 전략"
tags: ["Software Engineering", "Version Control", "DevOps"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/trunk-based-development
sidebar:
  order: 29
---

## 핵심 개념

트렁크 기반 개발(Trunk-Based Development)은 모든 개발자가 메인 브랜치(trunk/main)에서 작업하고, 브랜치는 단일 작은 기능/버그 수정에만 사용하는 브랜칭 전략이다. 브랜치를 짧게 (수시간~하루 이내) 유지하여 CI(Continuous Integration)를 실현한다.

## 동작 원리

Trunk-Based Development vs Gitflow:

| | Trunk-Based | Gitflow |
|--|--|--|
| 브랜치 수명 | 수시간~하루 | 수일~수주 |
| 병합 충돌 | 거의 없음 | 자주 발생 |
| CI/CD | 자연스러움 | 어려움 |
| 적합한 상황 | 서비스형 소프트웨어 | 다중 버전 유지 |

Gitflow 창시자 Driessen도 CI/CD가 가능한 소프트웨어에는 Gitflow를 비추천한다. 서비스 지향 시스템(웹 서비스, SaaS)에는 보통 트렁크 기반이 적합하다.

트렁크가 불안정하거나 다양한 버전을 동시에 유지해야 할 때는 Gitflow가 유리하다.

## 예시

```
trunk ────●────●────●────●────● (항상 배포 가능한 상태)
          ↑    ↑    ↑
         PR1  PR2  PR3 (수시간 내 머지)
```

실제 워크플로우:
```bash
# 1. trunk에서 기능 브랜치 생성
git checkout -b feature/add-search main

# 2. 작은 단위로 작업 (수시간 내 완료)
git commit -m "Add search API endpoint"
git commit -m "Add search result pagination"

# 3. PR 생성 → CI 실행 → 코드 리뷰 → 머지
# 브랜치 수명: 수시간

# 4. 릴리스 브랜치는 trunk에서 컷
git checkout -b release/1.0 main
git tag v1.0.0
```

미완성 기능 처리:
```python
# Feature Flag로 미완성 기능을 trunk에 통합
def new_feature():
    if feature_flags.is_enabled("new-search-v2"):
        return new_search()
    return legacy_search()

# trunk에 있지만 플래그로 비활성화 → 안전하게 통합
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [기능 플래그 (Feature Flag)](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [지속적 전달 (Continuous Delivery)](/knowledge/software-engineering/quality-and-configuration/continuous-delivery/)
- [원자적 커밋 (Atomic Commit)](/knowledge/software-engineering/quality-and-configuration/atomic-commit/)
