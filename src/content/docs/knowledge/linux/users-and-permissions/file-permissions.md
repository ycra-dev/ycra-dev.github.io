---
title: "파일 권한 (File Permissions)"
description: "UNIX/Linux 파일 권한은 9개의 기본 비트(읽기/쓰기/실행 x 소유자/그룹/기타)와 3개의 특수 비트(setuid, setgid, sticky)로 구성된 12비트 모드로, 파일 접근을 제어한다"
tags: ['Permissions', 'Chmod', 'Chown', 'Umask', 'Security', 'Unix']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/file-permissions
sidebar:
  order: 8
---

## 핵심 개념

**9개 기본 비트 (8진수 표기):**
- 소유자(u): 400(읽기), 200(쓰기), 100(실행)
- 그룹(g): 40(읽기), 20(쓰기), 10(실행)
- 기타(o): 4(읽기), 2(쓰기), 1(실행)

**특수 비트:**
- Setuid(4000): 실행 파일의 유효 UID를 파일 소유자로 변경
- Setgid(2000): 디렉토리에서 새 파일이 디렉토리의 그룹을 상속
- Sticky(1000): 디렉토리에서 파일 삭제를 소유자/root만 가능하게 함 (`/tmp`에 사용)

**umask:** 새 파일 생성 시 제거할 권한을 지정. 예: `umask 027`은 그룹의 쓰기, 기타의 모든 권한 제거. 기본값은 보통 `022`.

**디렉토리 권한:** 실행 비트는 디렉토리 진입/통과 허용(검색 비트), 읽기+실행은 내용 목록 조회, 쓰기+실행은 파일 생성/삭제/이름변경 허용.

`ls -l`의 첫 문자로 파일 유형(`d`=디렉토리, `-`=일반 파일, `l`=심볼릭 링크 등)을, 이후 9문자로 권한(`rwxr-xr-x`)을 확인한다. ctime은 생성 시간이 아닌 속성 변경 시간이다.

## 예시

```bash
# 8진수로 권한 설정
chmod 755 script.sh      # rwxr-xr-x
chmod 4755 /usr/bin/prog  # setuid + rwxr-xr-x

# 기호적(mnemonic) 변경
chmod g+w file.txt        # 그룹에 쓰기 추가
chmod o-rwx secret.txt    # 기타의 모든 권한 제거
chmod a+x script.sh       # 모두에게 실행 권한

# 소유자/그룹 변경
chown user:group file.txt
chown -R matt ~matt

# 기본 umask 설정
umask 027
```

## 관련 개념

- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [Setuid (사용자 ID 설정)](/knowledge/linux/setuid/)
- [접근 제어 목록 (Access Control List)](/knowledge/linux/access-control-list/)
- [Sudo (관리자 권한 실행)](/knowledge/linux/sudo/)
