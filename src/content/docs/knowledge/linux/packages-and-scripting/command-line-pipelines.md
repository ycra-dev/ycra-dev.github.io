---
title: "명령줄 파이프라인 (Command-Line Pipelines)"
description: "커맨드 라인 파이프라인은 파이프(|)로 여러 명령어를 연결하여 한 명령의 출력을 다음 명령의 입력으로 전달하는 방식으로, \"한 가지 일을 잘하는 작은 도구들의 조합\"이라는 유닉스 철학의 핵심이다"
tags: ['Unix', 'Shell', 'Pipe', 'Filter', 'Stdin', 'Stdout', 'Text Processing']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/command-line-pipelines
sidebar:
  order: 10
---

## 핵심 개념

파이프 연산자는 왼쪽 명령의 STDOUT을 오른쪽 명령의 STDIN으로 연결한다. **필터 명령어**: grep(패턴 매칭), cut(필드 추출), sort(정렬), uniq(중복 제거), wc(개수 세기), head/tail(부분 추출), sed(스트림 편집), awk(텍스트 처리).

**tee 명령**: 데이터를 파일에 저장하면서 동시에 다음 명령으로 전달. **리다이렉션**: <(입력), >(출력), >>(추가), 2>(에러), &>(모두), 1>&2(출력을 에러로).

**xargs**: STDIN에서 읽은 값을 다른 명령의 인자로 변환. find의 -print0과 xargs의 -0 조합으로 공백이 포함된 파일명도 안전하게 처리 가능.

## 예시

```bash
# 프로세스 개수 세기
ps aux | wc -l

# 고유 셸 추출 및 카운트
cut -d: -f7 /etc/passwd | sort | uniq -c

# 중간 결과를 파일에 저장하면서 파이프 계속
ps aux | grep nginx | tee /tmp/nginx.txt | wc -l

# 에러 로그에서 IP별 404 카운트
grep "404" /var/log/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# 공백이 포함된 파일명 안전 처리
find /home -type f -size +1M -print0 | xargs -0 ls -lh

# 에러 메시지를 STDERR로 보내기
echo "Error: Invalid input" 1>&2
```

## 관련 개념

- [셸 스크립팅 (Shell Scripting)](/knowledge/linux/shell-scripting/)
- [프로세스 (Process)](/knowledge/linux/process/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [Journald (저널 데몬)](/knowledge/linux/journald/)
