---
title: "Broken Window Theory"
description: "환경이 방치되면 더 많은 방치와 파괴를 부른다는 범죄학 이론을 소프트웨어에 적용한 것"
tags: ["Software Engineering", "Code Quality", "Psychology"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/broken-window-theory
sidebar:
  order: 21
---

## 핵심 개념

깨진 창문 이론(Broken Window Theory)은 환경이 방치되면 더 많은 방치와 파괴를 부른다는 범죄학 이론을 소프트웨어에 적용한 것이다. 코드베이스에 나쁜 코드가 있으면 더 나쁜 코드가 쌓이는 경향이 있다. 한 건물의 깨진 창문 하나가 방치되면, 곧 다른 창문도 깨지고, 건물 전체가 방치되는 것처럼 소프트웨어에서도 동일하다.

## 동작 원리

소프트웨어에서의 악순환:
- 하나의 나쁜 코드가 "이 정도는 괜찮다"는 인식을 만든다
- "어차피 나쁜 코드인데 뭐" 하며 품질 기준이 점점 낮아진다
- 결국 코드베이스 전체가 "진흙탕(Big Ball of Mud)"이 된다

이 악순환을 끊는 방법:
- **즉시 수정**: 나쁜 코드를 발견하면 즉시 고친다 (Boy Scout Rule)
- **표준 유지**: 높은 코드 품질 기준을 팀 문화로 정착
- **첫 번째 창문을 지키기**: 새 프로젝트에서 처음부터 품질을 유지

반대로, 깨끗한 코드베이스에서는 개발자들이 자연스럽게 높은 품질을 유지하려 노력한다.

## 예시

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

# 결국 전체 코드베이스가 무너진다
```

## 관련 개념

- [Boy Scout Rule](/knowledge/software-engineering/design-and-evolution/boy-scout-rule/)
- [Code Smell](/knowledge/software-engineering/design-and-evolution/code-smell/)
- [Software Entropy](/knowledge/software-engineering/design-and-evolution/software-entropy/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
