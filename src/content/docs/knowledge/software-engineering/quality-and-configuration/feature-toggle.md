---
title: "Feature Toggle"
description: "코드 배포와 기능 활성화를 분리하는 기법으로, 런타임 설정으로 기능의 활성/비활성을 제어하여 장기 브랜치 없이 미완성 기능을 main에 통합할 수 있게 한다"
tags: ["SoftwareEngineering", "ReleaseManagement", "Deployment", "Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/feature-toggle
sidebar:
  order: 331
---

## 핵심 개념

기능 토글(Feature Toggle, Feature Flag)은 코드 배포와 기능 활성화를 분리하는 기법이다. 코드는 프로덕션에 배포하지만 런타임에 설정으로 기능의 활성/비활성을 제어한다. 장기 브랜치(Long-lived Branch)의 대안으로 등장했다.

## 동작 원리

브랜치를 오래 유지하면 병합 충돌이 커진다. 기능 토글을 사용하면 미완성 기능도 main에 바로 통합할 수 있어 Trunk-Based Development가 가능해진다.

**활용 시나리오:**
- **점진적 배포(Gradual Rollout)**: 일부 사용자에게만 먼저 새 기능 공개
- **A/B 테스트**: 두 가지 구현을 동시에 테스트
- **비상 스위치(Kill Switch)**: 문제 발생 시 기능을 즉시 비활성화
- **트렁크 기반 개발**: 브랜치 없이 미완성 기능 통합 가능

**주의사항:**
- 토글이 누적되면 코드 복잡성이 증가한다
- 사용이 끝난 토글은 반드시 제거해야 한다 (토글 부채)
- 토글 조합에 의한 예상치 못한 동작을 주의

## 예시

```python
# 기능 토글 구현 예시

class FeatureFlags:
    _flags = {
        "new_checkout": False,
        "dark_mode": True,
        "recommendation_v2": False,
    }

    @classmethod
    def is_enabled(cls, feature: str) -> bool:
        return cls._flags.get(feature, False)

# 사용
def checkout(cart):
    if FeatureFlags.is_enabled("new_checkout"):
        return new_checkout_flow(cart)
    else:
        return legacy_checkout_flow(cart)

# 토글 정리: 기능이 안정화되면 토글과 이전 코드 제거
def checkout_v2(cart):
    return new_checkout_flow(cart)  # 토글 제거, 이전 코드 삭제

# 환경 변수 기반 토글 (더 유연한 방법)
import os

def is_feature_enabled(feature: str) -> bool:
    return os.environ.get(f"FEATURE_{feature.upper()}", "false").lower() == "true"
```

## 관련 개념

- [Continuous Integration](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [Version Control](/knowledge/software-engineering/quality-and-configuration/version-control/)
