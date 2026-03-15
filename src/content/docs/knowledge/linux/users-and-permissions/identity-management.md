---
title: "ID 관리 (Identity Management)"
description: "Identity Management(IAM)는 시스템 사용자를 식별하고, 신원을 인증하며, 인증된 신원에 따라 권한을 부여하는 프로세스와 시스템으로, 사용자 계정 관리, 역할 기반 접근 제어, 감사 추적을 통합한다"
tags: ['Iam', 'Authentication', 'Authorization', 'Access Control', 'Compliance', 'Rbac']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/identity-management
sidebar:
  order: 11
---

## 핵심 개념

상업용 ID 관리 시스템은 LDAP 기반 사용자 데이터베이스, UNIX 그룹 개념의 제어, sudo를 통한 제한된 관리 권한을 GUI로 통합한다. Sarbanes-Oxley, HIPAA, GLBA 같은 규정이 시스템 관리를 복잡하게 만들며, **역할 기반 접근 제어(RBAC)**가 이러한 요구사항을 충족하는 유일한 실행 가능한 옵션일 수 있다.

**평가 기준**: (1) 감독 — 보안 웹 인터페이스, 역할별 프로비저닝 요청, HR 데이터베이스 연동 (2) 계정 관리 — 전역 고유 ID, 워크플로 엔진, RBAC, 감사 로깅 (3) 사용 용이성 — 셀프서비스 비밀번호 변경, SSO.

대표 시스템: Oracle Identity Management, SailPoint IdentityIQ, VMware Identity Manager.

## 예시

```bash
# RBAC 역할 확인
sudo -l
id username

# 감사 로그 확인
sudo ausearch -ua username
sudo aureport -au

# 비밀번호 정책 설정
sudo vim /etc/security/pwquality.conf
# minlen=12, dcredit=-1, ucredit=-1

# 역할 기반 그룹 생성 및 할당
sudo groupadd -g 5000 developers
sudo usermod -aG developers username

# 감사 규칙 추가
sudo auditctl -w /etc/passwd -p wa -k passwd_changes
sudo auditctl -w /etc/shadow -p wa -k shadow_changes
```

## 관련 개념

- [LDAP (경량 디렉토리 접근 프로토콜)](/knowledge/linux/ldap/)
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/)
- [Sudo (관리자 권한 실행)](/knowledge/linux/sudo/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
- [싱글 사인온 (Single Sign-On)](/knowledge/linux/single-sign-on/)
- [Kerberos (커버로스)](/knowledge/linux/kerberos/)
- [SSSD (시스템 보안 서비스 데몬)](/knowledge/linux/sssd/)
