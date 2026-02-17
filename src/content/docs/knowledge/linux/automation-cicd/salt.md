---
title: "Salt"
description: "Salt(SaltStack)는 마스터-미니언 아키텍처 기반의 오픈소스 구성 관리 도구로, YAML과 Jinja2를 사용하며 고속 통신 버스를 통해 수천 대의 서버를 효율적으로 관리할 수 있다"
tags: ['Salt', 'Saltstack', 'Configuration Management', 'Automation', 'Python', 'Minion']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/salt
sidebar:
  order: 3
---

## 핵심 개념

Salt는 **마스터(master)**와 **미니언(minion)** 데몬 구조를 사용한다. 미니언이 마스터에 연결하여 구성 데이터를 수신하고, TCP 포트 4505/4506을 통해 통신한다. SSH 기반 에이전트리스 모드도 지원하지만 데몬 모드가 기본이다.

**Salt의 핵심 아키텍처 구분:**
- **States(상태 파일)**: 오퍼레이션 정의 (`/srv/salt/`)
- **Pillar(필라)**: 변수 값 바인딩 (`/srv/pillar/`)
- **Grains**: 미니언에서 수집되는 팩트(OS 유형, IP 주소 등)
- **Top file** (`top.sls`): 미니언 그룹에 상태와 필라를 바인딩

States는 미니언이 파싱하고 실행하지만, Pillar는 마스터에서 평가된 후 각 미니언에 JSON 계층으로 전달된다. 이 분리는 보안상 중요하며, 미니언은 서로의 필라 데이터에 접근할 수 없다.

Salt의 상태 함수(state functions)와 실행 함수(execution functions)는 명확히 구분된다. `.sls` 파일에서는 `pkg.installed` 같은 상태 함수를, 명령줄에서는 `pkg.install` 같은 실행 함수를 사용한다.

**장점**: Ansible보다 10배 이상 빠름, 단일 서버부터 대규모까지 확장성 뛰어남, 이벤트 기반 기능
**단점**: 문서화 구조가 복잡, 환경(environments) 설정이 직관적이지 않음

## 예시

```bash
# 미니언 키 승인
salt-key -a new-client.example.com

# 연결 확인
salt 'new-client*' test.ping

# 하이스테이트 적용 (전체 구성)
salt '*' state.apply

# 특정 상태 파일 실행
salt 'web*' state.apply webserver

# Red Hat 미니언만 하이스테이트 적용
salt -C 'G@os:RedHat' state.apply
```

```yaml
# /srv/salt/sudo.sls - 상태 파일 예시
sudo:
  pkg.installed:
    - refresh: True
  group.present: []

{% for admin in pillar['admins'] %}
{{ admin.username }}:
  group.present:
    - name: {{ admin.username }}
  user.present:
    - groups:
      - sudo
      - {{ admin.username }}
    - require:
      - group: {{ admin.username }}
{% endfor %}
```

## 관련 개념

- [Configuration Management](/knowledge/linux/configuration-management/)
- [Ansible](/knowledge/linux/ansible/)
- [YAML](/knowledge/linux/yaml/)
- [Jinja2 Template](/knowledge/linux/jinja2-template/)
- [Idempotence](/knowledge/linux/idempotence/)
