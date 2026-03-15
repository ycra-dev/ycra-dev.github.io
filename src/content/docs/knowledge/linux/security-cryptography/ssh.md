---
title: "SSH (보안 셸)"
description: "SSH(Secure Shell)는 안전하지 않은 네트워크에서 원격 로그인, 명령 실행, 파일 전송, 포트 포워딩 등을 암호화된 채널로 제공하는 클라이언트/서버 프로토콜이다"
tags: ['Security', 'Network', 'Remote Access', 'Openssh', 'Encryption', 'Authentication']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/ssh
sidebar:
  order: 18
---

## 핵심 개념

SSH는 Tatu Ylonen이 발명했으며, 시스템 관리자의 필수 도구인 "스위스 아미 나이프"이다. OpenSSH는 1999년 OpenBSD 프로젝트에서 개발된 오픈 소스 구현체로, 거의 모든 UNIX/Linux 배포판에 기본 포함된다.

**OpenSSH 구성 요소:**
- `ssh`: 클라이언트
- `sshd`: 서버 데몬 (포트 22, root로 실행)
- `ssh-keygen`: 공개/개인 키 쌍 생성
- `ssh-agent`: 복호화된 개인 키 캐싱 데몬
- `scp/sftp`: 파일 전송 유틸리티

**인증 방법:**
- 공개 키 인증 (가장 권장)
- UNIX 비밀번호 인증
- GSSAPI (Kerberos 통합)
- 챌린지/응답 (PAM, 일회용 비밀번호)

**공개 키 인증 절차:**
1. `ssh-keygen`으로 키 쌍 생성 (ECDSA 384-bit 또는 RSA 2048/4096-bit)
2. 공개 키를 서버의 `~/.ssh/authorized_keys`에 추가
3. 개인 키에 패스프레이즈 설정 권장 (sudo 권한 계정은 필수)

**ssh-agent 포워딩:**
로드된 키를 원격 호스트에서도 사용 가능하게 하여, 개인 키를 원격 시스템에 복사하지 않고도 서버 간 이동이 가능

**연결 멀티플렉싱:**
ControlMaster 기능으로 첫 연결의 소켓을 재사용하여 WAN 링크에서 SSH 성능을 크게 향상

## 예시

```bash
# ECDSA 키 쌍 생성
ssh-keygen -t ecdsa -b 384

# SSH 공개 키 인증으로 접속
ssh -i ~/.ssh/id_ecdsa user@remote.host

# ssh-agent에 키 로드
ssh-add ~/.ssh/id_ecdsa
ssh-add -l  # 로드된 키 목록 확인

# 에이전트 포워딩으로 접속
ssh -A user@jump-server

# ~/.ssh/config 호스트 별칭 설정
# Host web
#   Hostname 54.84.253.153
#   User han
#   Port 2222
#   IdentityFile ~/.ssh/id_web
#   PasswordAuthentication no

# 연결 멀티플렉싱 설정
# Host *
#   ControlMaster auto
#   ControlPath ~/.ssh/sockets/%r@%h-%p
#   ControlPersist 600

# sshd 보안 설정 (/etc/ssh/sshd_config)
# PermitRootLogin No
# PasswordAuthentication no
# PubkeyAuthentication yes
```

## 관련 개념

- [공개 키 암호화 (Public Key Cryptography)](/knowledge/linux/public-key-cryptography/) - SSH 인증의 기반 암호화
- [SSH 포트 포워딩 (SSH Port Forwarding)](/knowledge/linux/ssh-port-forwarding/) - SSH 터널링 기능
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/) - SSH와 통합되는 인증 프레임워크
- [다중 인증 (Multifactor Authentication)](/knowledge/linux/multifactor-authentication/) - SSH 접근에 적용하는 MFA
