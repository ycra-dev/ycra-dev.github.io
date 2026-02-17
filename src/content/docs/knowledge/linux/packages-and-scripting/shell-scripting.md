---
title: "Shell Scripting"
description: "쉘 스크립팅은 쉘 명령어들을 파일에 작성하여 반복 작업을 자동화하는 기법으로, sh(Bourne Shell)와 bash(Bourne Again Shell)가 가장 널리 사용된다"
tags: ['Shell', 'Bash', 'Sh', 'Automation', 'Scripting', 'System Administration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/shell-scripting
sidebar:
  order: 9
---

## 핵심 개념

스크립트의 첫 줄은 shebang(#!/bin/sh)으로 인터프리터를 지정한다. 실행 권한(chmod +x)을 부여받아야 하며, 환경 변수와 명령행 인자($1, $2 등)를 처리할 수 있다. 50행 이하의 단순 작업에 적합하고, 복잡한 작업은 Python이나 Ruby로 전환하는 것이 권장된다.

시스템 관리자는 "microscripts"를 ~/bin에 보관하여 반복 작업을 자동화한다. 쉘 함수는 .bash_profile에 정의되어 메모리에 상주하므로 PATH에 독립적이다.

좋은 스크립트는 입력 검증, STDERR로의 에러 메시지, 의미 있는 종료 코드(성공 시 0), 사용법 메시지(-h 옵션)를 포함해야 한다. setuid로 실행하는 것은 보안상 위험하므로 sudo를 사용해야 한다.

## 예시

```bash
#!/bin/sh
# 사용법 표시 함수
show_usage() {
    echo "Usage: $0 <source_dir> <dest_dir>" 1>&2
    exit 1
}

# 인자 검증
if [ $# -ne 2 ]; then
    show_usage
fi

# 백업 생성
timestamp=$(date +%Y%m%d_%H%M%S)
tar czf "${2}/backup_${timestamp}.tar.gz" "$1"

if [ $? -eq 0 ]; then
    echo "Backup successful"
    exit 0
else
    echo "Backup failed" 1>&2
    exit 1
fi
```

## 관련 개념

- [Environment Variables](/knowledge/linux/environment-variables/)
- [Regular Expressions](/knowledge/linux/regular-expressions/)
- [Command-Line Pipelines](/knowledge/linux/command-line-pipelines/)
- [Process](/knowledge/linux/process/)
- [Sudo](/knowledge/linux/sudo/)
- [Cron](/knowledge/linux/cron/)
