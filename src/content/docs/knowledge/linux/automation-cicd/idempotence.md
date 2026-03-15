---
title: "멱등성 (Idempotence)"
description: "멱등성(Idempotence)은 동일한 오퍼레이션을 여러 번 반복 적용해도 결과가 달라지지 않는 속성으로, 구성 관리 시스템에서 오퍼레이션의 핵심 특성이다"
tags: ['Idempotence', 'Configuration Management', 'Automation', 'Operations']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/idempotence
sidebar:
  order: 4
---

## 핵심 개념

멱등성은 원래 선형대수학에서 유래한 개념으로, 구성 관리에서는 오퍼레이션이 다음과 같은 속성을 가짐을 의미한다:

1. **반복 적용 안전성**: 같은 오퍼레이션을 여러 번 실행해도 문제가 발생하지 않는다.
2. **상태 인식**: 현재 시스템 상태가 이미 명세에 부합하면 오퍼레이션은 아무 작업도 수행하지 않고 종료한다.
3. **변경 감지**: 오퍼레이션이 실제로 시스템 상태를 변경했는지 알고 있다.

예를 들어, "sudo 패키지 설치" 오퍼레이션은 이미 설치되어 있으면 아무것도 하지 않고, 미설치 상태면 설치를 수행한다. 반면 임의의 셸 명령을 실행하는 오퍼레이션은 CM 시스템이 그 명령의 효과를 직접 파악할 수 없기 때문에 관리자가 추가 도움을 제공해야 멱등성을 보장할 수 있다.

멱등성은 구성 관리의 **선언적 모델**을 가능하게 하는 핵심이다. 시스템이 바람직한 상태에 이미 있으면 변경하지 않고, 아니면 변경한다는 단순한 논리가 반복적이고 안전한 적용을 보장한다.

## 예시

```yaml
# 멱등적 오퍼레이션 (Ansible)
- name: Ensure nginx is installed
  package:
    name: nginx
    state: present    # 이미 설치되어 있으면 변경 없음

- name: Ensure nginx is running
  service:
    name: nginx
    state: started    # 이미 실행 중이면 변경 없음

# 멱등성이 보장되지 않는 예시
- name: Run arbitrary command
  shell: echo "hello" >> /tmp/output.txt
  # 실행할 때마다 파일에 행이 추가됨 - 멱등적이지 않음
```

## 관련 개념

- [구성 관리 (Configuration Management)](/knowledge/linux/configuration-management/)
- [Ansible (자동화 도구)](/knowledge/linux/ansible/)
- [Salt (솔트)](/knowledge/linux/salt/)
- [선언적 구성 (Declarative Configuration)](/knowledge/linux/declarative-configuration/)
