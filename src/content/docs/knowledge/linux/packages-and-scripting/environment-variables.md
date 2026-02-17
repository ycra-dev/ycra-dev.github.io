---
title: "Environment Variables"
description: "환경 변수는 유닉스/리눅스 프로세스가 시작할 때 받는 키-값 쌍의 설정 정보로, 프로그램의 동작 방식을 제어하고 시스템 전역 설정을 전달하는 메커니즘이다"
tags: ['Shell', 'Configuration', 'Process', 'Unix', 'Environment', 'Path']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/environment-variables
sidebar:
  order: 12
---

## 핵심 개념

프로세스 시작 시 커맨드 라인 인자와 함께 환경 변수 세트를 받으며, export 명령을 사용해야 자식 프로세스에 전달된다. 환경 변수는 프로세스 시작 시 부모로부터 복사된 스냅샷이므로, 자식 프로세스의 변경은 부모에 영향을 주지 않는다.

**주요 변수**: PATH(명령어 검색 디렉토리), HOME(홈 디렉토리), PWD(현재 작업 디렉토리), SHELL(기본 쉘), EDITOR(선호 에디터), LANG/LC_*(로케일 설정).

로그인 시 설정할 변수는 ~/.profile이나 ~/.bash_profile에 정의한다. sudo 실행 시 보안상 일부 환경 변수가 재설정될 수 있으므로 주의해야 한다.

## 예시

```bash
# 환경 변수 확인
printenv
echo $PATH

# 변수 설정 및 내보내기
export EDITOR=vim
export PATH="$HOME/bin:$PATH"

# 한 명령에만 임시 적용
EDITOR=nano vipw

# 스크립트에서 변수 확인
if [ -n "$EDITOR" ]; then
    echo "Editor: $EDITOR"
fi

# ~/.bash_profile 설정
export HISTSIZE=10000
export HISTFILESIZE=20000
```

## 관련 개념

- [Shell Scripting](/knowledge/linux/shell-scripting/)
- [Process](/knowledge/linux/process/)
- [Sudo](/knowledge/linux/sudo/)
- [Systemd](/knowledge/linux/systemd/)
