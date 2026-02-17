---
title: "Change Management"
description: "변경 관리(Change Management)는 개발, 테스트, 프로덕션 환경 간의 소프트웨어 및 구성 변경을 체계적으로 추적하고 제어하는 프로세스로, DevOps 시대에는 코드로서의 변경 추적과 자동화된 프로모션을 핵심으로 한다"
tags: ['Change Management', 'DevOps', 'Environment Separation', 'Git', 'Audit Trail', 'Automation']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/change-management
sidebar:
  order: 11
---

## 핵심 개념

**전통적 접근 (변경 최소화 철학):**
- 안정성을 위해 변경을 최소화하는 것이 과거 IT 관리의 지배적 철학
- 단점: 기술 부채(Technical Debt) 축적, 비즈니스 요구에 뒤처짐
- 업그레이드가 필요한 시스템을 아무도 건드리지 않으려 함

**DevOps 시대의 변경 관리:**

1. **환경 분리**: 개발(Dev), 테스트(Test), 프로덕션(Prod) 환경을 분리하되 동일하게 유지
   - 구성 변경은 OS 패치부터 애플리케이션 업데이트, 관리 변경까지 모두 포함
   - 개발 환경 변경 시 테스트/프로덕션 환경에도 전파

2. **코드로서의 추적**: 모든 변경을 Git 등의 저장소에 기록
   - 불변 감사 추적(Immutable Audit Trail)으로 역할 분리 대체
   - 원치 않는 변경을 도입한 사람까지 추적 가능
   - 문제 발견 시 해당 커밋 식별 후 일시적 우회로 복원

3. **자동화된 프로모션**: 개발 → 테스트 → 프로덕션으로의 코드/구성 전파를 자동화
   - 테스트 자체도 자동화, 명확한 평가/프로모션 기준 설정
   - 이상적으로는 프로덕션에 관리 권한 없이 자동화된 프로세스만 사용

**자동화 전략의 필수 요소:**
- 새 머신의 자동 설정 (OS + 추가 소프트웨어 + 로컬 구성)
- 자동화된 구성 관리 (모든 동일 유형 머신에 자동 적용)
- 자동화된 코드 프로모션 (환경 간 전파)
- 기존 머신의 체계적 패칭 및 업데이트 (오프라인 머신 처리 포함)

## 예시

```bash
# Git 기반 변경 추적
git log --oneline --graph --all
# 모든 변경의 불변 감사 추적 확인

# 환경별 프로모션 파이프라인
# Dev → Test → Staging → Production
# 각 단계에서 자동화된 테스트 실행

# Ansible을 이용한 자동화된 구성 변경
ansible-playbook -i inventory/production site.yml --check  # 드라이런
ansible-playbook -i inventory/production site.yml          # 실제 적용

# 문제 발생 시 롤백
git revert <problematic-commit>
ansible-playbook -i inventory/production site.yml

# 자동화의 두 가지 황금률
# 1. 작업을 2번 이상 수행해야 하면 자동화해야 한다
# 2. 이해하지 못하는 것을 자동화하지 말라
```

## 관련 개념

- [DevOps](/knowledge/linux/devops/) - CLAMS 중 Automation 원칙
- [Configuration Management](/knowledge/linux/configuration-management/) - 자동화된 구성 관리 도구
- [Infrastructure as Code](/knowledge/linux/infrastructure-as-code/) - 인프라 변경의 코드화
- [Ansible](/knowledge/linux/ansible/) - 구성 관리 및 자동화 도구
- [Continuous Integration](/knowledge/linux/continuous-integration/) - CI/CD를 통한 자동화된 배포
