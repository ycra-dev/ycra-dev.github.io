---
title: "Ansible"
description: "Ansible은 서버 데몬 없이(agentless) SSH를 통해 원격 시스템을 구성하는 오픈소스 구성 관리 도구로, YAML 기반의 선언적 구성과 Jinja2 템플릿을 사용하며, 클라이언트에 별도 소프트웨어 설치가 필요 없다"
tags: ['Ansible', 'Configuration Management', 'Automation', 'Python', 'Ssh', 'Agentless']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ansible
sidebar:
  order: 2
---

## 핵심 개념

Ansible의 가장 큰 특징은 **에이전트리스(agentless)** 아키텍처이다. 클라이언트 측에 데몬을 설치하지 않고 SSH와 Python만 있으면 작동한다. 관리자가 `ansible-playbook` 명령을 실행하면 SSH를 통해 원격 명령을 실행하고, 구성 완료 후 클라이언트에 흔적을 남기지 않는다.

**핵심 개념:**
- **인벤토리(Inventory)**: 관리 대상 클라이언트 목록 (`/etc/ansible/hosts`)
- **태스크(Tasks)**: Ansible의 오퍼레이션 단위
- **플레이(Play)**: 태스크를 호스트 그룹에 바인딩하는 단위
- **플레이북(Playbook)**: 여러 플레이의 시퀀스
- **롤(Roles)**: 재사용 가능한 태스크, 변수, 템플릿의 묶음 (번들)
- **ansible-vault**: 구성 데이터를 암호화하여 보관하는 기능

Ansible은 **프레젠테이션 순서대로** 오퍼레이션을 실행한다. 태스크는 여러 호스트에서 병렬로 실행되며(기본 5개), 각 태스크가 모든 호스트에서 완료된 후 다음 태스크로 진행한다.

**장점**: 진입 장벽이 낮음, 보안성 우수(vault 기능), 에이전트 불필요
**단점**: Salt 대비 약 10배 느린 성능, 대규모 배포에서 확장성 한계

## 예시

```bash
# 클라이언트 연결 확인
ansible client1 -m setup --ask-become-pass

# 플레이북 실행
ansible-playbook site.yml --ask-vault-pass

# 특정 호스트 그룹에 ad-hoc 명령 실행
ansible webservers -m command -a "uptime" --become
```

```yaml
# 플레이북 예시 (site.yml)
---
- hosts: webservers
  become: true
  roles:
    - nginx
    - rails_app
  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted
```

```ini
# 인벤토리 파일 예시 (hosts/static)
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
```

## 관련 개념

- [Configuration Management](/knowledge/linux/configuration-management/)
- [Salt](/knowledge/linux/salt/)
- [YAML](/knowledge/linux/yaml/)
- [Jinja2 Template](/knowledge/linux/jinja2-template/)
- [SSH](/knowledge/linux/ssh/)
- [DevOps](/knowledge/linux/devops/)
