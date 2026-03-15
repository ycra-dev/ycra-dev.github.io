---
title: "선언적 구성 (Declarative Configuration)"
description: "선언적 구성(Declarative Configuration)은 시스템에 어떤 변경을 가할지(절차적/명령적)가 아니라, 달성하고자 하는 최종 상태(desired state)를 기술하는 구성 방식으로, 대부분의 구성 관리 시스템이 채택하는 핵심 패러다임이다"
tags: ['Declarative', 'Imperative', 'Configuration Management', 'Desired State']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/declarative-configuration
sidebar:
  order: 7
---

## 핵심 개념

선언적 방식과 절차적(procedural/imperative) 방식의 핵심 차이:

- **절차적**: "패키지 저장소를 업데이트하고, nginx를 다운로드하고, 압축을 풀고, 설치하고, 서비스를 시작하라"
- **선언적**: "nginx가 설치되어 있고 실행 중인 상태를 보장하라"

선언적 접근의 장점:
1. **멱등성 보장**: 현재 상태가 이미 원하는 상태이면 아무 작업도 수행하지 않음
2. **플랫폼 독립성**: CM 시스템이 각 OS에 맞는 구현을 알아서 선택
3. **자기 문서화**: 구성 코드 자체가 시스템의 현재 상태를 설명
4. **감사 추적**: 버전 제어 시스템에 추적 가능

CM 시스템에서 선언적 구성은 궁극적으로 실행 가능한 명령으로 변환되어야 한다. 오퍼레이션은 시작과 끝이 있고, 성공 또는 실패하며, 결과를 호출 환경에 보고한다. 그러나 일반 UNIX 명령과 달리 시스템 상태 변경 여부를 인식하고, UNIX 스타일 종료 코드보다 풍부한 보고 데이터를 제공한다.

## 예시

```yaml
# 선언적 방식 (Ansible)
- name: Ensure nginx is installed and running
  package:
    name: nginx
    state: present

- name: Ensure nginx service is running
  service:
    name: nginx
    state: started
    enabled: yes
```

```bash
# 절차적 방식 (셸 스크립트)
#!/bin/bash
apt-get update
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
# 이미 설치/실행 중이면 오류 발생 가능!
```

## 관련 개념

- [구성 관리 (Configuration Management)](/knowledge/linux/configuration-management/)
- [멱등성 (Idempotence)](/knowledge/linux/idempotence/)
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
- [Ansible (자동화 도구)](/knowledge/linux/ansible/)
- [Salt (솔트)](/knowledge/linux/salt/)
