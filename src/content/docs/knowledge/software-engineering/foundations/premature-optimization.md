---
title: "조기 최적화 (Premature Optimization)"
description: "성능 병목이 확인되기 전에 코드를 최적화하는 반패턴"
tags: ["Software Engineering", "Anti-Pattern", "Performance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/premature-optimization
sidebar:
  order: 18
---

## 핵심 개념

조기 최적화(Premature Optimization)는 성능 병목이 확인되기 전에 코드를 최적화하는 것으로, Donald Knuth가 "만악의 근원(root of all evil)"이라 부른 반패턴이다. 개발자들은 "이 부분이 느릴 것 같다"는 직관에 따라 최적화를 시도하는 경향이 있지만, 직관은 자주 틀리며, 실제 병목은 예상과 다른 곳에 있는 경우가 대부분이다.

## 동작 원리

조기 최적화의 해악:
- **가독성 저하**: 최적화된 코드는 대체로 읽기 어렵다
- **유지보수 비용 증가**: 복잡해진 코드는 수정이 어렵다
- **잘못된 곳의 최적화**: 병목이 아닌 곳을 최적화하면 시간만 낭비
- **버그 유발**: 복잡한 최적화 코드에 버그가 숨기 쉽다

올바른 최적화 절차:
1. 먼저 정확하게 동작하는 코드를 작성한다
2. 프로파일링으로 실제 병목을 측정한다
3. 병목이 확인된 부분만 최적화한다
4. 최적화 후 다시 측정하여 효과를 검증한다

## 예시

```python
# 조기 최적화 (가독성을 해치면서 불필요한 최적화)
def process_items(items):
    # "리스트 컴프리헨션이 더 빠르니까..."
    # "비트 연산이 더 빠르니까..."
    return [i.__dict__['v'] for i in items if i.__dict__['s'] & 0x1]

# 먼저 명확하게 작성하고, 필요할 때만 최적화
def process_items(items):
    return [item.value for item in items if item.is_active]

# 프로파일링 결과 이 함수가 병목이면 그때 최적화
```

프로파일링 기반 최적화:
```python
import cProfile

# 먼저 코드를 실행하고 병목을 확인
cProfile.run('process_large_dataset(data)')
# → 실제로 느린 부분을 측정 후 최적화
```

## 관련 개념

- [KISS 원칙 (KISS Principle)](/knowledge/software-engineering/foundations/kiss-principle/)
- [YAGNI 원칙 (YAGNI)](/knowledge/software-engineering/design-and-evolution/yagni/)
- [소프트웨어 복잡도 (Software Complexity)](/knowledge/software-engineering/architectural-design/software-complexity/)
