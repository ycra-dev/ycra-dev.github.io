---
title: "Project Estimation"
description: "작업 범위와 소요 시간을 예측하는 기술로, 계획 오류(Planning Fallacy) 인지적 편향을 극복하고 현실적 일정을 수립하는 엔지니어의 핵심 역량"
tags: ["SoftwareEngineering", "ProjectManagement", "Planning", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/project-estimation
sidebar:
  order: 34
---

## 핵심 개념

프로젝트 추정은 작업 범위, 소요 시간, 필요 리소스를 예측하는 기술이다. 엔지니어는 체계적으로 프로젝트를 과소추정하는 경향이 있으며, 이는 **계획 오류(Planning Fallacy)**라 불리는 인지적 편향이다.

## 동작 원리

**과소추정의 원인:**
1. **미지의 미지(Unknown unknowns)** 과소평가
2. 통합, 테스트, 배포 시간 누락
3. 낙관적 시나리오만 가정
4. 범위 증가(Scope creep) 미반영

**실패 사례:** Ooyala의 비디오 플레이어 재작성 — 원래 4개월 예상이었으나 6개월 후에도 미완성. 갈수록 추가되는 고객 요구사항과 예상치 못한 기술적 도전으로 마감이 반복적으로 연기됨.

**추정 개선 전략:**
- **작업을 세분화**: 큰 작업을 2일 이내의 소규모 태스크로 분해. 세분화할수록 예측이 정확해진다
- **과거 데이터 활용**: 이전 프로젝트의 실제 소요 시간을 기록하고 참조
- **안전 여유 추가**: 가장 가능성 높은 추정에 1.5~2배 버퍼
- **범위를 정의하고 방어**: 무분별한 기능 추가를 경계
- **위험한 부분부터 착수**: "가장 무서운 부분을 먼저 하라" (Zach Brock, Square)
- **재작성 vs 점진적 개선 판단**: 대규모 재작성은 거의 항상 예상보다 오래 걸림

## 예시

```python
# 추정 세분화 예시

# 나쁜 추정: 너무 큰 단위
bad_estimate = {"사용자 인증 시스템 구축": "3주"}

# 좋은 추정: 2일 이내로 세분화
good_estimate = {
    "DB 스키마 설계":       "0.5일",
    "로그인/회원가입 API":   "2일",
    "비밀번호 해싱/검증":    "0.5일",
    "세션 관리":             "1일",
    "이메일 인증":           "1일",
    "비밀번호 재설정 플로우": "1.5일",
    "프론트엔드 폼":         "2일",
    "통합 테스트":           "1.5일",
    "보안 리뷰/수정":        "1일",
    "배포/모니터링":         "0.5일",
    "버퍼 (예상치 못한 이슈)": "2일",
}
# 합계: 13.5일 ≈ 2.7주
# 세분화로 놓쳤던 항목(배포, 보안 리뷰 등) 발견 가능

# 1주 후 진행 상황으로 검증
after_1_week = {
    "DB 스키마":      "완료",
    "로그인 API":     "50% 완료 → 원래 추정보다 2배 걸림",
    "결론":           "전체 일정 1.5배 연장 필요 → 재협상"
}
```

## 관련 개념

- [Minimum Viable Product](/knowledge/software-engineering/agile-methods/minimum-viable-product/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
