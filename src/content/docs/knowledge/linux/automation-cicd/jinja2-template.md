---
title: "Jinja2 템플릿 (Jinja2 Template)"
description: "Jinja2는 Python 기반의 템플릿 엔진으로, Ansible과 Salt에서 YAML 구성 파일에 동적 표현력을 추가하고 구성 파일 템플릿을 렌더링하는 데 사용된다"
tags: ['Jinja2', 'Template Engine', 'Python', 'Ansible', 'Salt', 'Configuration Management']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/jinja2-template
sidebar:
  order: 6
---

## 핵심 개념

Jinja2는 두 가지 주요 역할을 수행한다:
1. **YAML 전처리**: 구성 파일 내에서 변수 확장, 조건문, 반복문 제공
2. **구성 파일 템플릿 렌더링**: `.j2` 확장자의 템플릿을 실제 구성 파일로 변환

**주요 구문:**
- `{{ variable }}`: 변수 값 출력
- `{% for item in list %}...{% endfor %}`: 반복문
- `{% if condition %}...{% endif %}`: 조건문
- `{# comment #}`: 주석

**Ansible vs Salt에서의 Jinja2 처리 차이:**
- **Salt**: Jinja2를 진정한 전처리기로 사용. YAML 파싱 전에 Jinja2가 먼저 실행되어 최종 YAML을 생성함
- **Ansible**: YAML을 Jinja2 표현식이 포함된 채로 파싱하고, 각 문자열 값을 사용 직전에 Jinja2 확장함. 따라서 Jinja2의 제어 구조(루프, 조건문)는 YAML 파일에서 사용 불가(템플릿에서만 가능)

Salt에서는 Jinja2 로직과 YAML을 분리하는 것이 권장된다. 코드는 파일 상단에 두고, 실제 구성은 깔끔한 YAML로 유지하는 것이 좋다.

## 예시

```jinja2
{# sudoers.j2 템플릿 예시 #}
# /etc/sudoers - managed by configuration management
Defaults    env_reset

{% for admin in admins %}
{{ admin.username }}  ALL=(ALL) ALL
{% endfor %}
```

```yaml
# Salt에서 Jinja2 사용 (조건부 패키지 이름)
{% set apache = salt['grains.get']('os') == 'Ubuntu'
    and 'apache2' or 'httpd' %}

install-apache:
  pkg.installed:
    - name: {{ apache }}
```

```yaml
# Ansible에서 Jinja2 변수 확장
- name: Configure hostname
  lineinfile:
    dest: /etc/rc.conf
    line: 'hostname="{{ ansible_fqdn }}"'
  when: ansible_os_family == "FreeBSD"
```

## 관련 개념

- [Ansible (자동화 도구)](/knowledge/linux/ansible/)
- [Salt (솔트)](/knowledge/linux/salt/)
- [YAML (야믈)](/knowledge/linux/yaml/)
- [구성 관리 (Configuration Management)](/knowledge/linux/configuration-management/)
