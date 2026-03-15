---
title: "PAM (장착형 인증 모듈)"
description: "PAM(Pluggable Authentication Modules)은 다양한 인증 방법을 위한 래퍼 프레임워크로, 프로그램이 특정 인증 방식에 종속되지 않고 유연하게 인증을 수행할 수 있게 한다"
tags: ['Pam', 'Authentication', 'Security', 'Pluggable', 'Login', 'Sso']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/pam
sidebar:
  order: 6
---

## 핵심 개념

PAM은 접근 제어가 아닌 인증 기술이다. "사용자 X가 작업 Y를 할 권한이 있는가?"가 아니라 "이 사용자가 정말 X인가?"라는 선행 질문에 답한다.

전통적으로 login, sudo, su 등의 프로그램은 각자 비밀번호 검증을 구현했지만, PAM을 통해 관리자가 시스템 전체의 인증 방법(비밀번호, 생체인식, 2FA, 네트워크 ID 시스템 등)을 통합 관리할 수 있다.

PAM 설정 파일은 4가지 **모듈 유형**으로 구성된다: (1) **auth** - 사용자 식별 및 그룹 멤버십 부여, (2) **account** - 로그인 시간/동시 접속 등 제한 적용, (3) **session** - 홈 디렉터리 마운트 등 사전/사후 작업, (4) **password** - 비밀번호 변경. **제어 플래그**는 모듈 스택의 흐름을 결정한다: **required**(실패 시 최종 실패하지만 나머지 모듈 계속 실행), **requisite**(실패 시 즉시 중단), **sufficient**(성공 시 즉시 스택 완료), **optional**(결과가 다른 모듈에 의존).

SSO 환경에서 PAM은 SSSD를 통해 LDAP/Kerberos/Active Directory 인증을 처리한다. pam_unix는 전통적 UNIX 인증, pam_sss는 SSSD를 통한 중앙 인증, pam_nologin은 /etc/nologin 파일 검사, pam_securetty는 root 로그인 터미널 제한 등 다양한 모듈이 스택으로 구성된다.

## 예시

```bash
# PAM 설정 파일 위치
ls /etc/pam.d/

# /etc/pam.d/login 예시 (SSO 환경)
# auth     requisite  pam_nologin.so
# auth     required   pam_securetty.so
# auth     required   pam_env.so
# auth     sufficient pam_unix2.so
# auth     required   pam_sss.so

# account  required   pam_unix2.so
# account  sufficient pam_sss.so

# password requisite  pam_pwcheck.so  nullok
# password sufficient pam_unix2.so
# password required   pam_sss.so

# session  required   pam_loginuid.so
# session  required   pam_limits.so
# session  required   pam_umask.so

# PAM 모듈 위치 확인
ls /lib/x86_64-linux-gnu/security/
```

## 관련 개념

- [Sudo (관리자 권한 실행)](/knowledge/linux/sudo/)
- [Setuid (사용자 ID 설정)](/knowledge/linux/setuid/)
- [LDAP (경량 디렉토리 접근 프로토콜)](/knowledge/linux/ldap/)
- [Kerberos (커버로스)](/knowledge/linux/kerberos/)
- [SSSD (시스템 보안 서비스 데몬)](/knowledge/linux/sssd/)
- [싱글 사인온 (Single Sign-On)](/knowledge/linux/single-sign-on/)
- [ID 관리 (Identity Management)](/knowledge/linux/identity-management/)
