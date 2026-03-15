---
title: "Python 스크립팅 (Python Scripting)"
description: "Python 스크립팅은 쉘 스크립트보다 복잡한 로직을 다루면서 높은 가독성과 풍부한 라이브러리를 제공하는 현대적인 시스템 관리 자동화 방법이다"
tags: ['Python', 'Scripting', 'Automation', 'Programming', 'System Administration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/python-scripting
sidebar:
  order: 13
---

## 핵심 개념

Python은 쉘 스크립트가 50행을 넘어서거나 복잡한 데이터 구조가 필요할 때 권장되는 선택이다. 들여쓰기가 문법적 의미를 가지며, "모든 것이 객체"라는 철학을 따른다.

**핵심 데이터 구조**: 리스트([]), 튜플(()), 딕셔너리({}). 정규 표현식은 re 모듈, raw 문자열(r"pattern")을 사용한다. Python 2와 3은 별도 언어로 취급되며 새 작업에는 Python 3를 사용한다.

shebang은 `#!/usr/bin/env python3`을 사용하여 PATH에서 python3를 찾는다. 가상 환경(virtualenv)으로 프로젝트별 독립적 라이브러리 환경을 구성하고, pip로 패키지를 관리한다.

## 예시

```python
#!/usr/bin/env python3
import sys
import subprocess

def get_disk_usage(path='/'):
    output = subprocess.check_output(
        ['df', '-h', path], universal_newlines=True
    )
    lines = output.strip().split('\n')
    if len(lines) > 1:
        fields = lines[1].split()
        return int(fields[4].rstrip('%'))

def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <threshold>", file=sys.stderr)
        sys.exit(1)

    threshold = int(sys.argv[1])
    usage = get_disk_usage('/')

    if usage >= threshold:
        print(f"WARNING: Disk usage {usage}% exceeds {threshold}%")
        sys.exit(1)

if __name__ == '__main__':
    main()
```

## 관련 개념

- [셸 스크립팅 (Shell Scripting)](/knowledge/linux/shell-scripting/)
- [정규 표현식 (Regular Expressions)](/knowledge/linux/regular-expressions/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
- [패키지 관리 (Package Management)](/knowledge/linux/package-management/)
