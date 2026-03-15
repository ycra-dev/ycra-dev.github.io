---
title: "시맨틱 버전 관리 (Semantic Versioning)"
description: "MAJOR.MINOR.PATCH 형식으로 소프트웨어 버전을 부여하는 표준 체계"
tags: ["Software Engineering", "Versioning", "Dependency Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/semantic-versioning
sidebar:
  order: 23
---

## 핵심 개념

시맨틱 버전 관리(Semantic Versioning, SemVer)는 MAJOR.MINOR.PATCH 형식의 버전 체계이다. 버전 번호만 보고도 변경의 성격을 이해할 수 있게 한다. semver.org에서 공식 스펙을 확인할 수 있다.

## 동작 원리

버전 번호 규칙:
- **PATCH** (예: 1.0.0 → 1.0.1): 하위 호환 버그 수정
- **MINOR** (예: 1.0.0 → 1.1.0): 하위 호환 새 기능 추가
- **MAJOR** (예: 1.0.0 → 2.0.0): 하위 비호환 변경 (Breaking Change)

특수 표기:
- **메이저 0 (0.x.x)**: 프리릴리스. 호환성 보장 없음
- **프리릴리스**: `-` 뒤에 식별자 (`3.0.0-rc.1`, `1.0.0-alpha`)
- **빌드 번호**: `+` 뒤에 (`2.13.7-alpha.2+1942`)

버전 범위 지정:
- `2.13.x` 또는 `~2.13.0`: 패치 업데이트만 자동 수용
- `^2.13.0` 또는 `>=2.13, <3`: 마이너/패치 업데이트 자동 수용
- `2.13.7`: 정확한 버전 고정

## 예시

SemVer 버전 번호 해석:
```
httpclient 4.3.6
  major=4, minor=3, patch=6

4.3.*  → 4.3.7, 4.3.8 등 패치 업데이트 자동 수용
4.*    → 4.4.0, 4.5.0 등 마이너 업데이트 자동 수용
5.0.0  → major 증가 = Breaking Change 가능성!
```

실제 사례:
```
# Breaking Change 예시 (MAJOR 증가 필요)
# Before (v1.x)
def get_user(user_id: int) -> User:
    return db.query(user_id)

# After (v2.0.0 - 반환 타입 변경)
def get_user(user_id: int) -> Optional[User]:
    return db.query(user_id) or None  # None 반환 가능!
```

```python
# requirements.txt에서의 버전 지정
requests==2.28.1        # 완전 고정 (가장 안전)
flask>=2.0,<3.0         # MINOR 업데이트까지 허용
django~=4.1             # 4.1.x만 허용 (4.2는 안 됨)
```

## 관련 개념

- [버전 고정 (Version Pinning)](/knowledge/software-engineering/quality-and-configuration/version-pinning/)
- [의존성 지옥 (Dependency Hell)](/knowledge/software-engineering/quality-and-configuration/dependency-hell/)
- [하위 호환성 (Backward Compatibility)](/knowledge/software-engineering/design-and-evolution/backward-compatibility/)
