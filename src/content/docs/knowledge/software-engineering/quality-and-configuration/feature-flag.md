---
title: "기능 플래그 (Feature Flag)"
description: "코드 배포와 기능 활성화를 분리하는 기법"
tags: ["Software Engineering", "Deployment", "Release Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/feature-flag
sidebar:
  order: 18
---

## 핵심 개념

기능 플래그(Feature Flag, Feature Toggle, Feature Switch)는 코드 배포와 기능 활성화를 분리하는 기법이다. 코드는 프로덕션에 배포하지만 런타임에 설정으로 기능의 활성/비활성을 제어한다. 장기 브랜치(Long-lived Branch)의 대안으로 등장하여, 미완성 기능도 main에 바로 통합할 수 있게 한다.

## 동작 원리

기능 플래그 유형:
- **Boolean**: 전체 on/off
- **허용 목록**: 특정 사용자만 활성화
- **퍼센트 기반**: 1% → 5% → 25% → 100% 점진적 확대
- **함수 기반**: 입력 기반 동적 결정 (예: 국가별 활성화)

활용 시나리오:
- **점진적 배포(Gradual Rollout)**: 일부 사용자에게만 먼저 새 기능 공개
- **A/B 테스트**: 두 가지 구현을 동시에 테스트
- **비상 스위치(Kill Switch)**: 문제 발생 시 기능을 즉시 비활성화
- **코드 프리즈 대안**: 브랜치 없이 미완성 기능 통합 가능

주의사항:
- DB 스키마 변경은 플래그로 제어 안 됨 (새/구 코드가 같은 테이블 접근)
- 전방/후방 호환성을 반드시 고려해야 함
- 토글이 누적되면 코드 복잡성 증가 — 사용이 끝난 토글은 반드시 제거

## 예시

```python
class FeatureFlags:
    _flags = {
        "new_checkout": False,
        "dark_mode": True,
        "recommendation_v2": False,
    }

    @classmethod
    def is_enabled(cls, feature: str, user_id: int = None) -> bool:
        # 퍼센트 기반 롤아웃 예시
        if feature == "new_checkout" and user_id:
            return (user_id % 100) < 5  # 5% 사용자에게 활성화
        return cls._flags.get(feature, False)

# 사용
def checkout(cart, user_id):
    if FeatureFlags.is_enabled("new_checkout", user_id):
        return new_checkout_flow(cart)
    else:
        return legacy_checkout_flow(cart)

# 기능 안정화 후 토글 제거
def checkout(cart, user_id):
    return new_checkout_flow(cart)  # 플래그 제거, 이전 코드 삭제
```

A/B 테스트 통계 고려사항:
```
# 플래그로 A/B 테스트를 할 때 주의
- 최소 통계적 유의성(p < 0.05)이 확보된 후 결정
- 충분한 샘플 크기가 확보될 때까지 결과 해석 금지
- 노벨티 효과(신기함 효과)를 고려하여 충분한 기간 운영
```

## 관련 개념

- [카나리 배포 (Canary Deployment)](/knowledge/software-engineering/quality-and-configuration/canary-deployment/)
- [블루-그린 배포 (Blue-Green Deployment)](/knowledge/software-engineering/quality-and-configuration/blue-green-deployment/)
- [서킷 브레이커 (Circuit Breaker)](/knowledge/software-engineering/quality-and-configuration/circuit-breaker/)
- [트렁크 기반 개발 (Trunk-Based Development)](/knowledge/software-engineering/quality-and-configuration/trunk-based-development/)
- [코드 프리즈 (Code Freeze)](/knowledge/software-engineering/quality-and-configuration/code-freeze/)
