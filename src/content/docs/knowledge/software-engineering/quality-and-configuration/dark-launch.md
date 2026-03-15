---
title: "다크 런칭 (Dark Launch)"
description: "새 코드를 실제 트래픽에 노출하되 결과를 사용자에게 보여주지 않는 배포 기법"
tags: ["Software Engineering", "Deployment", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/dark-launch
sidebar:
  order: 32
---

## 핵심 개념

다크 런치(Dark Launch)는 새 코드를 실제 프로덕션 트래픽에 노출하되 결과를 사용자에게 보여주지 않는 배포 기법이다. Traffic Shadowing이라고도 한다. 프로덕션 환경에서 새 시스템을 안전하게 검증할 수 있다.

## 동작 원리

동작 방식:
1. 프록시가 요청을 프로덕션 + 다크(새) 시스템에 동시 전달
2. 두 응답을 비교하여 차이점 기록
3. 사용자에게는 프로덕션 응답만 전송 (다크 시스템 응답은 버림)
4. 차이가 사라지면 다크 시스템을 새 프로덕션으로 전환

두 가지 모드:
- **Dark Reads**: 읽기 요청만 새 시스템으로 복제
- **Dark Writes**: 쓰기까지 독립적인 데이터스토어에 복제 (원본에 영향 없음)

Diffy 도구: 프로덕션 인스턴스 2대 + 신버전 1대로 비결정적 노이즈와 실제 차이를 구분한다.

## 예시

Twitter의 기술 부채 해결 사례:
```
레거시 시스템에 대한 대규모 리팩토링이 필요
→ Dark writes로 안전망 구축
→ 새 시스템에 실제 트래픽을 "그림자"로 전송
→ 차이가 발생하는 케이스 기록
→ 테스트 추가 및 수정 반복
→ 차이가 0이 되면 전환

"산이 어깨에서 내려온 것 같았다" (엔지니어 소감)
```

프록시 기반 다크 런치:
```
사용자 요청
    │
    ▼
프록시/로드밸런서
    │         │
    │         └──(복제)──▶ 새 시스템
    │                         │
    ▼                    응답 비교 & 기록
현재 시스템
    │
    ▼
사용자 응답
(새 시스템 응답은 사용자에게 보내지 않음)
```

시스템 마이그레이션 단계:
```
1단계: Dark Read
  - 기존 DB 읽기 + 새 DB 읽기
  - 결과 비교, 차이 기록
  - 사용자: 기존 DB 결과만 받음

2단계: Dark Write
  - 기존 DB 쓰기 + 새 DB에도 쓰기 (독립)
  - 새 DB 데이터 검증

3단계: 전환
  - 새 DB가 프로덕션
  - 기존 DB는 다크 모드로 역할 전환
```

## 관련 개념

- [카나리 배포 (Canary Deployment)](/knowledge/software-engineering/quality-and-configuration/canary-deployment/)
- [블루-그린 배포 (Blue-Green Deployment)](/knowledge/software-engineering/quality-and-configuration/blue-green-deployment/)
- [기능 플래그 (Feature Flag)](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
