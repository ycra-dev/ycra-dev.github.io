---
title: "YAGNI"
description: "현재 필요하지 않은 기능을 미리 구현하지 말라는 소프트웨어 설계 원칙"
tags: ["Software Engineering", "Design Principle", "Simplicity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/yagni
sidebar:
  order: 13
---

## 핵심 개념

YAGNI(You Aren't Gonna Need It)는 현재 필요하지 않은 기능을 미리 구현하지 말라는 소프트웨어 설계 원칙이다. 익스트림 프로그래밍(XP)에서 유래했다. 개발자들은 "나중에 필요할 것 같다"는 이유로 미리 기능을 구현하는 경향이 있지만, 통계적으로 이렇게 미리 만든 기능의 대부분은 실제로 사용되지 않는다.

## 동작 원리

YAGNI 위반의 비용:
- **개발 시간 낭비**: 불필요한 기능 구현에 시간을 소모
- **복잡성 증가**: 사용되지 않는 코드가 시스템을 복잡하게 만듦
- **유지보수 부담**: 불필요한 코드도 테스트하고 관리해야 함
- **설계 왜곡**: 미래 요구사항을 추측하여 현재 설계가 왜곡됨

YAGNI는 KISS 원칙과 밀접하게 관련되며, 둘 다 불필요한 복잡성을 경계한다. 설계 결정을 "마지막 책임 있는 순간(Last Responsible Moment)"까지 미루는 것이 현명하다.

위반 유형:
1. **조기 최적화**: 필요 증명 전 캐시, 샤딩 등 추가
2. **불필요한 유연한 추상화**: 플러그인 아키텍처, 래퍼 인터페이스
3. **MVP에 불필요한 기능 추가**

## 예시

```python
# YAGNI 위반: 아직 필요 없는 기능을 미리 구현
class UserService:
    def get_user(self, user_id):
        return self.db.find(user_id)

    def get_user_with_caching(self, user_id):  # 아직 성능 문제 없음
        pass

    def get_user_batch(self, user_ids):  # 배치 조회 요구사항 없음
        pass

    def get_user_async(self, user_id):  # 비동기 필요 없음
        pass

# YAGNI 준수: 현재 필요한 것만 구현
class UserService:
    def get_user(self, user_id):
        return self.db.find(user_id)
```

## 관련 개념

- [KISS Principle](/knowledge/software-engineering/foundations/kiss-principle/)
- [Dead Code](/knowledge/software-engineering/design-and-evolution/dead-code/)
- [Software Complexity](/knowledge/software-engineering/architectural-design/software-complexity/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
