---
title: "기술 부채 (Technical Debt)"
description: "빠른 구현을 위해 이상적이지 않은 설계나 코드를 선택했을 때 미래에 발생하는 추가적인 개발 비용"
tags: ["Software Engineering", "Code Quality", "Maintenance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/technical-debt
sidebar:
  order: 16
---

## 핵심 개념

기술 부채(Technical Debt)는 빠른 구현을 위해 이상적이지 않은 설계나 코드를 선택했을 때 미래에 발생하는 추가적인 개발 비용이다. Ward Cunningham이 금융의 "부채" 개념에 비유하여 명명했다. 기술 부채는 금융 부채와 마찬가지로 "이자"가 발생한다. 부채를 방치할수록 유지보수 비용(이자)이 누적되어 결국 개발 속도가 극도로 느려진다.

## 동작 원리

Martin Fowler의 2x2 매트릭스:

|           | 의도적 (Deliberate)              | 비의도적 (Inadvertent)              |
|-----------|----------------------------------|-------------------------------------|
| **신중**  | 알면서 속도를 위해 타협 (좋은 부채) | 경험 후 "이렇게 했어야 했는데"      |
| **무모**  | 압박 하에 "그냥 나중에"           | 모르는 것을 모르는 상태             |

기술 부채의 유형:
- **의도적 부채**: 마감일을 맞추기 위해 의식적으로 품질을 타협 (관리 가능)
- **비의도적 부채**: 경험 부족이나 부주의로 발생한 나쁜 코드 (위험)
- **비트 부패(Bit Rot)**: 시간이 지나면서 자연스럽게 발생하는 코드 퇴화

단순히 마음에 안 드는 코드는 기술 부채가 아니다. 남용하면 의미가 약해진다.

기술 부채 관리 전략:
- 부채의 존재를 인지하고 추적한다 (TODO, 이슈 트래커)
- 정기적으로 "상환" 시간을 확보한다
- 새로운 부채 발생을 최소화하는 팀 문화를 만든다

팀에 기술 부채 해결을 제안하는 프레임워크:
1. 사실 기반 상황 설명
2. 부채의 위험과 비용 기술
3. 해결안 제안
4. 대안 논의
5. 트레이드오프 비교

## 예시

```python
# 기술 부채 예시

# "지금은 이렇게 하고 나중에 고치자" (의도적 부채)
def get_user_data(user_id):
    # TODO: 캐싱 추가 필요 - 현재 매번 DB 호출
    # TODO: 에러 처리 보강 필요
    return db.query(f"SELECT * FROM users WHERE id = {user_id}")
    # ↑ SQL 인젝션 취약점까지 포함 (비의도적 부채)

# 부채 상환 후:
def get_user_data(user_id: int) -> Optional[User]:
    cache_key = f"user:{user_id}"
    if cached := cache.get(cache_key):
        return cached
    user = db.query("SELECT * FROM users WHERE id = %s", (user_id,))
    if user:
        cache.set(cache_key, user, ttl=300)
    return user
```

## 관련 개념

- [레거시 시스템 (Legacy Systems)](/knowledge/software-engineering/design-and-evolution/legacy-systems/)
- [리팩토링 (Refactoring)](/knowledge/software-engineering/design-and-evolution/refactoring/)
- [소프트웨어 엔트로피 (Software Entropy)](/knowledge/software-engineering/design-and-evolution/software-entropy/)
- [코드 스멜 (Code Smell)](/knowledge/software-engineering/design-and-evolution/code-smell/)
