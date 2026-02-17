---
title: "Ticketing System"
description: "티켓팅 시스템은 IT 조직의 업무 요청을 접수, 추적, 해결까지 관리하는 핵심 도구로, 개선 요청, 이슈 관리, 소프트웨어 버그 추적을 하나의 시스템에서 통합 관리한다"
tags: ['Ticketing', 'Task Management', 'Itil', 'Workflow', 'Help Desk', 'Jira', 'Rt']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ticketing-system
sidebar:
  order: 13
---

## 핵심 개념

**티켓 시스템의 주요 역할:**
- 이메일, 웹 등 다양한 인터페이스를 통해 요청 접수
- 제출부터 해결까지 요청 추적
- 매니저가 그룹 또는 개인에게 티켓 할당
- 사용자가 요청 상태와 담당자 확인 가능

**방지해야 할 워크플로우 함정:**
1. 모든 사람이 다른 사람이 처리하고 있다고 생각하여 누락되는 작업
2. 여러 사람이 동일 문제를 중복 작업하여 리소스 낭비

**티켓 소유권 원칙:**
- 모든 작업에 단일, 명확한 소유자 지정
- "책임"은 비난이 아닌 모호성 제거가 목적
- 누가 무엇을 변경했는지 투명하게 추적 가능

**관리 메트릭:**
- 미해결 티켓 수, 평균 해결 시간, 직원 생산성
- 미해결(rotting) 티켓 비율, 해결 시간별 업무량 분포
- 해결된 티켓은 FAQ 시스템이나 교육 자료로 재활용

**디스패칭 모델:**
- 선임 관리자가 월별 교대로 "디스패처" 역할 수행
- 새 티켓 확인, 필요 정보 추출, 적절한 담당자에게 배정
- 직원 기술 데이터베이스를 활용한 배정 최적화

**주요 티켓 시스템:**
- 오픈소스: RT (Request Tracker), OTRS, osTicket, Bugzilla
- 상용: Jira, ServiceNow, Zendesk, Remedy

## 예시

```bash
# RT (Request Tracker) - Perl 기반 오픈소스
# 설치 예시
sudo apt-get install request-tracker4

# Jira - Atlassian 상용 제품 (SaaS 또는 온프레미스)
# ServiceNow - SaaS 기반 IT 서비스 관리

# 티켓 우선순위 체계 (간단한 모델)
# 1. 다수가 작업 불가 (최고 우선순위)
# 2. 1명이 작업 불가
# 3. 개선 요청
# 동일 우선순위 → 심각도 평가 (이메일 > 웹사이트 등)
# 하위 우선순위 → FIFO 처리

# 자동 확인 메시지 후 반드시 실제 담당자의 개인 응답 필요
# → 사용자 만족도의 핵심 결정 요인
```

## 관련 개념

- [ChatOps](/knowledge/linux/chatops/) - 실시간 소통과 티켓 시스템의 통합
- [SLA](/knowledge/linux/sla/) - 티켓 해결 시간과 서비스 수준 합의
- [Incident Response](/knowledge/linux/incident-response/) - 보안 사고 티켓 처리 절차
- [DevOps](/knowledge/linux/devops/) - 모든 IT 부서를 아우르는 단일 티켓 시스템의 중요성
