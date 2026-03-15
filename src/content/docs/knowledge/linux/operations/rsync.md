---
title: "Rsync (원격 동기화)"
description: "rsync는 파일과 디렉터리를 네트워크를 통해 효율적으로 동기화하는 도구로, 파일 내부의 차이만 전송하여 네트워크 대역폭을 절약하며, 링크, 수정 시간, 권한을 보존한다"
tags: ['Rsync', 'File Transfer', 'Synchronization', 'Backup', 'Ssh']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rsync
sidebar:
  order: 15
---

## 핵심 개념

rsync는 Andrew Tridgell과 Paul Mackerras가 작성한 도구로, scp의 강화판과 같다. 핵심 특징은 개별 파일 내부를 검사하여 버전 간 차이점만 전송하는 **델타 전송** 알고리즘이다.

SSO 대안으로서 /etc/passwd, /etc/group 등의 파일을 마스터 서버에서 rsync로 배포하는 빠르고 간단한 방법이 있다. 이 방식은 설정이 쉽지만 모든 변경 사항(사용자 비밀번호 변경 포함)을 마스터에 직접 적용해야 하는 제한이 있다.

rsync는 기본적으로 SSH를 전송 수단으로 사용하여 연결을 암호화한다. 스크립트에서 자동 실행하려면 sshd에서 비밀번호 없는 인증을 설정해야 하는데, 이는 보안에 중대한 영향을 미친다. --include/--exclude 플래그로 정규 표현식 기반의 정교한 전송 기준을 설정할 수 있다.

현대적 대안으로 Ansible 같은 구성 관리 도구가 파일 배포에 더 자주 사용된다.

## 예시

```bash
# 원격 서버로 파일 동기화 (권한/소유권/시간 보존)
rsync -gopt /etc/passwd /etc/shadow lollipop:/etc

# include/exclude 패턴 사용
rsync -avz --exclude='*.log' /src/ remote:/dest/

# cron으로 정기 동기화 설정
# 0 * * * * rsync -gopt /etc/passwd /etc/shadow server:/etc

# 별도 파일에서 패턴 읽기
rsync -avz --include-file=includes.txt \
  --exclude-file=excludes.txt /src/ remote:/dest/

# SSH를 통한 안전한 전송 (기본값)
rsync -avz -e ssh /data/ user@remote:/backup/
```

## 관련 개념

- [싱글 사인온 (Single Sign-On)](/knowledge/linux/single-sign-on/)
- [셸 스크립팅 (Shell Scripting)](/knowledge/linux/shell-scripting/)
- [크론 (Cron)](/knowledge/linux/cron/)
- [코드형 인프라 (Infrastructure as Code)](/knowledge/linux/infrastructure-as-code/)
