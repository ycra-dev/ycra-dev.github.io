---
title: "장애 대응 (Incident Response)"
description: "프로덕션 장애 발생 시 영향을 최소화하고 서비스를 복구하는 체계적 프로세스"
tags: ["Software Engineering", "On-Call", "Operations", "SRE"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/incident-response
sidebar:
  order: 35
---

## 핵심 개념

인시던트 대응(Incident Response)은 프로덕션 장애 발생 시 영향을 최소화하고 서비스를 복구하는 체계적 5단계 프로세스이다. **최우선 목표는 문제 해결이 아닌 영향 완화(mitigation)와 서비스 복구이다.** 원인 분석은 서비스가 복구된 후에 진행한다.

## 동작 원리

5단계 프로세스:
1. **Triage**: 영향도로 우선순위 결정. 트러블슈팅 금지 — 빠른 대응이 먼저
2. **Coordination**: 인시던트 리더 지정, 관련자 통보, war room 구성, 상태 페이지 업데이트
3. **Mitigation**: 롤백, 장애 전환, 기능 비활성화로 영향 범위 줄이기 (출혈 멈추기)
4. **Resolution**: 과학적 방법(가설-실험-검증)으로 근본 원인 추적 후 해결
5. **Follow-up**: 포스트모템 작성, 재발 방지 태스크 생성

우선순위 (P0-P4):
- **P0**: 전체 서비스 중단, 즉각 대응
- **P1**: 주요 기능 장애, 1시간 이내 대응
- **P2**: 부분 기능 저하, 당일 대응
- **P3-P4**: 경미한 이슈, 일반 티켓 처리

## 예시

데이터 웨어하우스 장애 실제 사례:
```
1. [Triage]
   커넥터가 데이터 로드 중단 → 고객 대면 테이블 영향 확인
   우선순위: P1 (비즈니스 크리티컬)

2. [Coordination]
   인시던트 리더 지정
   데이터 팀, SRE 팀 소집
   상태 페이지 업데이트: "데이터 파이프라인 지연 조사 중"
   Slack #incident 채널 개설

3. [Mitigation]
   이진 탐색으로 문제 스트림 격리
   나머지 스트림 복구 (부분 서비스 재개)

4. [Resolution]
   APM 도구가 자동으로 주입한 헤더의 빈 값이 역직렬화 오류 유발
   APM 헤더 주입 비활성화 → 완전 복구

5. [Follow-up]
   포스트모템 작성
   APM 설정 변경이 데이터 파이프라인에 미치는 영향 테스트 추가
```

인시던트 중 커뮤니케이션 템플릿:
```
[상태 업데이트 (15분마다)]
시간: 14:23 KST
상태: 조사 중
영향: 데이터 대시보드 업데이트 지연 (~2시간)
진행 상황: 문제 스트림 격리 완료, 80% 파이프라인 복구
다음 업데이트: 14:38 KST
```

## 관련 개념

- [서비스 수준 목표 (Service Level Objective)](/knowledge/software-engineering/quality-and-configuration/service-level-objective/)
- [근본 원인 분석 (Root-Cause Analysis)](/knowledge/software-engineering/quality-and-configuration/root-cause-analysis/)
- [포스트모템 (Postmortem)](/knowledge/software-engineering/quality-and-configuration/postmortem/)
- [런북 (Runbook)](/knowledge/software-engineering/quality-and-configuration/runbook/)
- [관측 가능성 (Observability)](/knowledge/software-engineering/quality-and-configuration/observability/)
