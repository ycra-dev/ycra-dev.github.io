---
title: "Configuration Management"
description: "구성 관리(Configuration Management, CM)는 네트워크상의 운영체제를 자동으로 관리하는 소프트웨어로, 관리자가 서버의 바람직한 상태를 명세로 작성하면 CM 시스템이 현실을 해당 명세에 맞게 조정하는 자동화 도구이다"
tags: ['Configuration Management', 'Automation', 'Infrastructure', 'Declarative', 'Cm']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/configuration-management
sidebar:
  order: 1
---

## 핵심 개념

전통적 시스템 관리 자동화는 자체 제작 셸 스크립트와 임기응변식 대응의 복잡한 조합이었으며, 시간이 지나면 시스템들이 서로 다른 상태로 퇴화하는 "스노우플레이크(snowflake)" 모델을 초래했다. CM은 바람직한 상태를 **코드로 캡처**하여 이 문제를 해결한다.

CM 시스템의 핵심 특징은 **선언적(declarative)** 방식이다. 시스템에 어떤 변경을 가할지 스크립트를 작성하는 절차적 방식 대신, 달성하고자 하는 상태를 기술하면 CM 시스템이 자체 로직으로 대상 시스템을 조정한다.

CM 시스템의 주요 구성 요소:
- **오퍼레이션(Operations)**: 사용자 계정 생성, 패키지 설치 등 작은 단위 작업
- **변수(Variables)**: 구성이 개별 머신에 적용되는 방식을 결정하는 명명된 값
- **팩트(Facts)**: 대상 시스템의 IP 주소, OS 유형 등 자동 검색된 정보
- **핸들러(Handlers)**: 변경에 반응하여 실행되는 오퍼레이션
- **바인딩(Bindings)**: 오퍼레이션 집합을 특정 호스트 그룹에 연결
- **번들(Bundles)**: 재사용 가능한 오퍼레이션 컬렉션
- **환경(Environments)**: 개발, 테스트, 프로덕션 등 분리된 구성 세계

CM 오퍼레이션의 중요한 속성은 **멱등성(idempotence)**으로, 동일한 오퍼레이션을 반복 적용해도 문제가 발생하지 않으며, 현재 상태가 이미 명세에 부합하면 아무 작업도 수행하지 않는다.

## 예시

```yaml
# Ansible 예시: sudo 패키지 설치 및 구성
- name: Install sudo
  package:
    name: sudo
    state: present

- name: Copy sudoers file
  template:
    src: sudoers.j2
    dest: /etc/sudoers
    mode: "0440"
    owner: root
    group: root

- name: Create sudo group
  group:
    name: sudo
    state: present
```

```yaml
# Salt 예시: SSH 서비스 활성화
sshd:
  service.running:
    - enable: True
```

## 관련 개념

- [Ansible](/knowledge/linux/ansible/)
- [Salt](/knowledge/linux/salt/)
- [Infrastructure as Code](/knowledge/linux/infrastructure-as-code/)
- [DevOps](/knowledge/linux/devops/)
- [Idempotence](/knowledge/linux/idempotence/)
- [YAML](/knowledge/linux/yaml/)
- [Declarative Configuration](/knowledge/linux/declarative-configuration/)
