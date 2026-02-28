---
title: "Dependency Hell"
description: "동일 라이브러리의 충돌 버전으로 빌드 실패나 런타임 오류가 발생하는 상황"
tags: ["Software Engineering", "Dependency Management", "Troubleshooting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/dependency-hell
sidebar:
  order: 25
---

## 핵심 개념

의존성 지옥(Dependency Hell)은 동일 라이브러리의 충돌 버전, 비호환 업그레이드 등으로 빌드 실패나 런타임 오류가 발생하는 상황이다. 주요 원인으로는 다이아몬드 의존성, 순환 의존성, 버전 충돌이 있다.

## 동작 원리

의존성을 추가할 때마다 질문해야 할 것:
- 이 라이브러리가 정말 필요한가? 대안은?
- 유지보수 상태는? 마지막 업데이트는?
- 라이선스는 프로젝트와 호환되는가?
- 이 의존성이 끌고 오는 전이적 의존성은?

빌드 시스템이 버전 선택 시 SemVer 호환성을 기대하지만, 실제로는 마이너/패치 버전에서도 비호환 변경이 발생한다.

대표 사례: **left-pad 사건(2016)** — 11줄짜리 패키지 하나가 npm에서 삭제되자 수천 개의 프로젝트 빌드가 실패했다.

## 예시

Gradle 의존성 충돌 보고서:
```
slf4j-api:
  - util 라이브러리 요청: 1.7.21
  - zookeeper 요청: 1.6.1
  → 빌드 시스템이 1.7.21로 강제 업그레이드
  → zookeeper의 slf4j-log4j12는 1.6.1 유지
  → 잠재적 비호환 발생
```

의존성 지옥을 피하는 방법:
```python
# 1. 의존성을 최소로 유지
# Bad: 한 줄의 유틸리티 함수를 위해 대형 라이브러리 추가
import pandas as pd
value = pd.Series([1, 2, 3]).mean()

# Good: 직접 구현
import statistics
value = statistics.mean([1, 2, 3])

# 2. 의존성 추가 시 lock 파일 업데이트
pip install requests==2.28.1
pip freeze > requirements.txt  # 모든 버전 고정

# 3. 정기적인 의존성 감사
pip audit  # 보안 취약점 확인
npm audit
```

## 관련 개념

- [Diamond Dependency](/knowledge/software-engineering/quality-and-configuration/diamond-dependency/)
- [Circular Dependency](/knowledge/software-engineering/quality-and-configuration/circular-dependency/)
- [Transitive Dependency](/knowledge/software-engineering/quality-and-configuration/transitive-dependency/)
- [Version Pinning](/knowledge/software-engineering/quality-and-configuration/version-pinning/)
- [Semantic Versioning](/knowledge/software-engineering/quality-and-configuration/semantic-versioning/)
