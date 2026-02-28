---
title: "Software Entropy"
description: "소프트웨어가 시간이 지남에 따라 자연스럽게 무질서해지는 경향"
tags: ["Software Engineering", "Code Quality", "Maintenance"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/software-entropy
sidebar:
  order: 17
---

## 핵심 개념

소프트웨어 엔트로피(Software Entropy)는 소프트웨어가 시간이 지남에 따라 자연스럽게 무질서해지는 경향이다. 열역학의 엔트로피 개념에서 차용했다. 개발자 간 스타일 차이, 요구사항 변경, 버그 수정, 성능 최적화 등이 원인이다. 개발자를 탓할 것이 아니라 변화의 자연스러운 부작용으로 이해해야 한다.

## 동작 원리

관리 방법:
- 코드 스타일 도구 (린터, 포매터)
- 코드 리뷰
- 지속적 리팩토링
- **보이스카우트 원칙** — 코드를 발견했을 때보다 깨끗하게 남기기

이는 자연스러운 현상이며, 의식적 노력으로 속도를 늦출 수 있지만 완전히 막을 수는 없다.

엔트로피 증가의 악순환:
- 하나의 나쁜 코드가 "이 정도는 괜찮다"는 인식을 만든다
- "어차피 나쁜 코드인데 뭐" 하며 품질 기준이 점점 낮아진다
- 결국 코드베이스 전체가 "진흙탕(Big Ball of Mud)"이 된다

## 예시

초기에 깔끔했던 마이크로서비스가 3년 후 10명의 개발자를 거치며 다음이 축적된다:
- 일관성 없는 에러 처리
- 혼재된 네이밍 컨벤션 (camelCase와 snake_case 혼용)
- 사용되지 않는 코드 (dead code)
- 문서와 실제 동작의 괴리

```python
# 깨진 창문의 연쇄 반응

# 누군가 이런 코드를 남겼다:
def do_stuff(x):  # 첫 번째 깨진 창문
    # TODO: 나중에 고치자
    return x + 1

# 다음 개발자: "이 정도면 괜찮겠지"
def do_more_stuff(y):  # 두 번째 깨진 창문
    # HACK: 임시 해결
    return y * 2 if y else 0

# 그 다음 개발자: "어차피 다 이런데..."
def func(a, b, c, d, e, f):  # 세 번째 깨진 창문
    return a+b+c+d-e*f  # 매직 넘버, 의미 불명
```

## 관련 개념

- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [Code Smell](/knowledge/software-engineering/design-and-evolution/code-smell/)
- [Boy Scout Rule](/knowledge/software-engineering/design-and-evolution/boy-scout-rule/)
- [Broken Window Theory](/knowledge/software-engineering/foundations/broken-window-theory/)
