---
title: "YAML"
description: "YAML(YAML Ain't Markup Language)은 JSON의 대체 구문으로, 들여쓰기 기반의 가독성 높은 데이터 직렬화 형식이며, Ansible과 Salt 등 구성 관리 시스템의 주요 구성 언어로 사용된다"
tags: ['YAML', 'JSON', 'Data Format', 'Configuration', 'Ansible', 'Salt']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/yaml
sidebar:
  order: 5
---

## 핵심 개념

YAML은 본질적으로 JSON의 상위 집합이다. JSON에서 대괄호가 리스트를, 중괄호가 해시를 감싸는 반면, YAML은 들여쓰기로 구조를 표현하고 대시(-)로 리스트 항목을 표시한다.

YAML은 단순한 데이터 구조 표현에는 뛰어나지만, 구성 관리 시스템이 요구하는 복잡한 데이터를 JSON 형식으로 강제하다 보면 **다양한 엣지 케이스와 타협**이 필요하다:
- `name=value` 축약 구문 (비표준 해시 정의 단축)
- "자유 형식(freeform)" 인수를 받는 오퍼레이션의 특수 처리
- Jinja 표현식이 값의 시작에 올 때 인용부호 필요
- `with_items` 같은 속성의 올바른 들여쓰기 수준 결정의 어려움

흥미롭게도, YAML 사양은 Go 프로그래밍 언어 전체 사양보다 길다. 이는 YAML의 겉보기 단순함과 실제 복잡성 사이의 격차를 보여준다.

Ansible과 Salt 모두 **Jinja2**를 YAML의 전처리기/템플릿 시스템으로 사용하여 동적 표현력을 추가한다.

## 예시

```yaml
# YAML 기본 구조
name: John Doe
age: 30
languages:
  - Python
  - Go
  - Ruby

# 위의 YAML은 아래 JSON과 동일
# {"name": "John Doe", "age": 30,
#  "languages": ["Python", "Go", "Ruby"]}

# Ansible에서의 YAML + Jinja2
- name: Install packages
  package:
    name: "{{ item }}"
    state: present
  with_items:
    - nginx
    - curl
    - git
```

```yaml
# Salt에서의 YAML (.sls 파일)
nginx:
  pkg.installed: []
  service.running:
    - enable: True
    - require:
      - pkg: nginx
```

## 관련 개념

- [Ansible](/knowledge/linux/ansible/)
- [Salt](/knowledge/linux/salt/)
- [Configuration Management](/knowledge/linux/configuration-management/)
- [Jinja2 Template](/knowledge/linux/jinja2-template/)
