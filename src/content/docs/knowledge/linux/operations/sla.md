---
title: "SLA (서비스 수준 계약)"
description: "SLA(Service Level Agreement)는 IT 조직이 제공하는 서비스의 구체적인 세부 사항을 협상, 합의, 문서화한 서비스 수준 합의서로, 적절한 기대치를 설정하고 질문 발생 시 참조 기준이 된다"
tags: ['Sla', 'Service Level Agreement', 'Availability', 'Uptime', 'Compliance', 'Metrics']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sla
sidebar:
  order: 8
---

## 핵심 개념

**SLA의 핵심 구성 요소:**

1. **서비스 범위 및 설명**: 비기술 직원이 이해할 수 있는 용어로 IT 서비스 명시 (이메일, 채팅, 인터넷, 파일 서버, 비즈니스 애플리케이션, 인증 등)

2. **서비스 표준**: 운영 시간, 정기 유지보수 창, 실시간 지원 가용 시간 정의
   - 예: 평일 8:00~18:00 정규 지원, 24/7 긴급 지원
   - 응답 시간, 주말/비근무 시간 서비스, 원격 지원 등

3. **대기열 우선순위 정책**:
   - 다수가 작업 불가 (최고 우선)
   - 1명이 작업 불가
   - 개선 요청 (최저 우선)
   - 우선순위 결정 변수: 서비스 중요도, 보안 영향, 영향받는 사용자 수, 기한 중요도

4. **적합성 측정 지표**:
   - 프로젝트 일정/예산 준수율
   - SLA 항목 충족 비율
   - 시스템별 가동률 (예: "이메일 Q1 99.92% 가용")
   - 만족스럽게 해결된 티켓 비율
   - 평균 티켓 해결 시간
   - 새 시스템 프로비저닝 시간
   - 문서화된 절차에 따라 처리된 보안 인시던트 비율

**핵심 원칙:**
- 사용자 관점에서 "무소식이 희소식" - 시스템이 작동하거나 안 하거나
- 사용자는 디스크/발전기가 왜 고장났는지보다 언제 고쳐지는지를 알고 싶음
- IT는 솔루션을 제공하며, 장애물을 만들지 않음

## 예시

```
# SLA 가동률 계산 예시
# 99.9% 가용성 = 연간 8.76시간 다운타임
# 99.95% 가용성 = 연간 4.38시간 다운타임
# 99.99% 가용성 = 연간 52.56분 다운타임

# SLA 측정 지표 대시보드 항목 예시
# - 이메일 서비스: Q1 가동률 99.92%
# - 웹 애플리케이션: Q1 가동률 99.97%
# - 평균 티켓 해결 시간: 4.2시간
# - 신규 시스템 프로비저닝: 평균 2일

# 우선순위 분류 체계
# P1 (긴급): 다수 사용자 업무 불가 → 즉시 대응
# P2 (높음): 1명 업무 불가 → 4시간 내 대응
# P3 (보통): 개선 요청 → FIFO 순서 처리
# P4 (낮음): 향후 개선 사항 → 일정 조율
```

## 관련 개념

- [티켓 시스템 (Ticketing System)](/knowledge/linux/ticketing-system/) - SLA 준수를 위한 티켓 관리
- [데이터 센터 티어 (Data Center Tier)](/knowledge/linux/data-center-tier/) - 인프라 가용성 등급과 SLA
- [사이트 신뢰성 공학 (Site Reliability Engineering)](/knowledge/linux/site-reliability-engineering/) - SRE의 가용성 목표
- [재해 복구 (Disaster Recovery)](/knowledge/linux/disaster-recovery/) - 재해 복구와 SLA 연속성
- [컴플라이언스 표준 (Compliance Standards)](/knowledge/linux/compliance-standards/) - 규정 준수와 SLA의 관계
