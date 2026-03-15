---
title: "DevOps (데브옵스)"
description: "DevOps는 특정 직무가 아닌 문화 또는 운영 철학으로, 소프트웨어의 빌드와 배포 효율성을 개선하는 것을 목표로 하며, 개발(Development)과 운영(Operations) 팀 간의 통합을 촉진한다"
tags: ['DevOps', 'Culture', 'Operations', 'Development', 'Automation', 'Clams', 'Lean', 'Measurement', 'Sharing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/devops
sidebar:
  order: 3
---

## 핵심 개념

DevOps를 실천하는 조직은 엔지니어링 팀 간 통합을 장려하며, 개발과 운영 사이의 구분을 최소화한다. 특히 상호 연관된 서비스와 팀이 많은 대규모 사이트에서 소프트웨어 빌드와 배포 효율성 향상에 중점을 둔다.

DevOps 전문가는 비효율적인 프로세스를 찾아내어 자동화 도구(쉘 스크립트, Chef, Ansible 등의 구성 관리 도구)로 대체한다. 이는 시스템 관리자의 역할과 밀접하게 관련되며, 현대적 시스템 관리에서는 개발자와 운영자의 경계가 흐려지고 있다.

연속적 배포(Continuous Delivery)는 DevOps의 핵심 실천 중 하나로, 개발된 소프트웨어를 정기적 주기로 자동 릴리즈하는 프로세스이다.

구성 관리(Configuration Management)는 DevOps 철학과 밀접하게 관련되어 있지만, 동일한 것은 아니다. CM은 DevOps의 여러 핵심 요소를 가능하게 하는 도구이다. CI/CD(Continuous Integration/Continuous Delivery)는 DevOps의 기둥으로, 개발자와 운영팀을 연결하는 접착제 역할을 하며, 기술 혁신인 동시에 비즈니스 자산이다.

**CLAMS - DevOps의 5가지 원칙 (Ch.31):**
- **Culture**: Dev와 Ops가 24/7 공동 온콜, 공동 코드 리뷰, 동일 환경 미러링. ChatOps를 통한 전략적/운영적 실시간 소통
- **Lean**: 반복 회의 대신 실시간 소통. 구성 요소 문제를 하나씩 해결. "오늘 무엇을 할 수 있는가"에 집중
- **Automation**: 2회 이상 수행 작업은 자동화. 이해하지 못하는 것은 자동화하지 않음. Ansible, Salt, Jenkins 등 도구 활용
- **Measurement**: 서브초 단위 측정 데이터를 전체 서비스 스택에서 수집. Graphite, Grafana, ELK 등 도구 활용
- **Sharing**: 내부(lunch-and-learn, wiki) 및 외부(Meetup, 컨퍼런스) 지식 공유 장려

DevOps는 변경 최소화를 추구하던 전통적 IT 관리에서 벗어나, 클라우드, 가상화, 자동화 도구의 발전에 힘입어 IT 조직이 변경을 주도하고 장려하는 서비스 철학이다. ITIL의 anti-methodology로 간주되기도 한다.

## 예시

```bash
# 구성 관리 도구로 인프라 자동화 (예: Ansible)
ansible-playbook deploy.yml

# CI/CD 파이프라인에서 자동 배포
git push origin main  # → 자동 빌드 → 자동 테스트 → 자동 배포

# Jenkins 파이프라인으로 CI/CD 자동화
# Jenkinsfile에 빌드, 테스트, 배포 단계 정의
```

## 관련 개념

- [사이트 신뢰성 공학 (Site Reliability Engineering)](/knowledge/linux/site-reliability-engineering/)
- [패키지 관리 (Package Management)](/knowledge/linux/package-management/)
- [리눅스 배포판 (Linux Distribution)](/knowledge/linux/linux-distribution/)
- [구성 관리 (Configuration Management)](/knowledge/linux/configuration-management/)
- [지속적 통합 (Continuous Integration)](/knowledge/linux/continuous-integration/)
- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [ChatOps (챗옵스)](/knowledge/linux/chatops/) - 실시간 소통 채널
- [티켓 시스템 (Ticketing System)](/knowledge/linux/ticketing-system/) - 통합 업무 관리
- [변경 관리 (Change Management)](/knowledge/linux/change-management/) - 자동화된 변경 관리
- [컴플라이언스 표준 (Compliance Standards)](/knowledge/linux/compliance-standards/) - ITIL에서 DevOps로의 전환
