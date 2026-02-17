---
title: "Site Reliability Engineering"
description: "SRE(Site Reliability Engineering)는 시스템의 가용성(uptime)과 정확성(correctness)을 최우선으로 하는 엔지니어링 분야로, 대규모 서비스의 안정적 운영을 책임진다"
tags: ['Sre', 'Reliability', 'Uptime', 'Monitoring', 'Operations', 'DevOps', 'System Administration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/site-reliability-engineering
sidebar:
  order: 4
---

## 핵심 개념

SRE 엔지니어의 주요 업무는 네트워크 모니터링, 프로덕션 소프트웨어 배포, 페이저 당직(on-call), 향후 확장 계획 수립, 장애 디버깅이다. 단일 장애점(Single Point of Failure)을 제거하는 것이 핵심 목표이다.

SRE는 시스템 관리와 소프트웨어 엔지니어링의 교차점에 위치하며, Google에서 처음 정립한 개념이다. 전통적 시스템 관리자가 수동 운영에 집중했다면, SRE는 소프트웨어 공학적 접근으로 운영 문제를 해결한다.

관련 역할로는 보안 운영 엔지니어(취약점 탐색, 공격 모니터링), 네트워크 관리자(물리적 네트워크 장비 관리), DBA(데이터베이스 전문가), NOC 엔지니어(실시간 시스템 건강 모니터링)가 있다.

**DevOps 시대의 시스템 관리자 역할 (Ch.31):**
DevOps 우산 아래에서 시스템 관리자는 여전히 IT의 만능 재주꾼이다. 주요 책임 영역: 시스템 인프라 구축/구성/자동화/배포, OS 및 주요 서브시스템의 보안/패치/업데이트, DevOps 기술(CI/CD, 모니터링, 컨테이너화, 가상화, ChatOps) 배포 및 전파, 팀원에 대한 인프라/보안 모범 사례 코칭, 인프라 모니터링/유지보수, 향후 확장 계획 수립, 외부 벤더 관리. DevOps의 핵심은 영역적 본능을 극복하는 것이며, 다른 팀원의 성공을 돕는 영웅으로 인식될 때 가장 효과적이다.

## 예시

```bash
# 서비스 가용성 모니터링
curl -o /dev/null -s -w "%{http_code}" https://example.com

# 시스템 리소스 모니터링
top -bn1 | head -20

# 로그 분석으로 장애 원인 파악
journalctl -u nginx --since "1 hour ago"
```

## 관련 개념

- [DevOps](/knowledge/linux/devops/)
- [Man Pages](/knowledge/linux/man-pages/)
- [ChatOps](/knowledge/linux/chatops/) - DevOps 소통 채널
- [SLA](/knowledge/linux/sla/) - 서비스 수준 합의와 가용성 목표
- [Change Management](/knowledge/linux/change-management/) - 변경 관리와 운영 자동화
- [Ticketing System](/knowledge/linux/ticketing-system/) - IT 업무 관리와 추적
