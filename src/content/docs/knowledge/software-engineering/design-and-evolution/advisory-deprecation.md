---
title: "Advisory Deprecation"
description: "마감 기한이 없고 조직이 높은 우선순위를 두지 않는 deprecation으로, 클라이언트가 자발적으로 새로운 시스템으로 마이그레이션하기를 희망하는 방식"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/advisory-deprecation
sidebar:
  order: 51
---

## 핵심 개념

Advisory deprecation은 새 시스템의 존재를 알리고 얼리 어답터의 사용을 유도하는 데 효과적이다. 그러나 기존 시스템의 사용을 강제로 막을 수 없으며, 실제로 기존 시스템의 사용이 개념적/기술적 "인력(pull)"을 발휘하여 새로운 사용자를 끌어들인다. Google의 경험에 따르면, deprecation 경고를 달아놓고 떠나는 것만으로는 기존 사용을 줄이는 데 거의 효과가 없다.

## 동작 원리

새 시스템이 단순히 점진적 개선이 아닌 변혁적(transformative) 이점을 제공할 때만 advisory deprecation이 효과를 발휘한다. 한계적 이점만으로는 사용자가 자발적으로 마이그레이션하지 않는다.

"Hope is not a strategy"라는 SRE의 격언이 이 상황에 정확히 적용된다.

Advisory deprecation의 한계:
- 마감 기한이 없으므로 사용자들이 우선순위를 낮춘다
- 기능 개발과의 경쟁에서 항상 밀린다
- 완전한 마이그레이션은 advisory 방식만으로는 달성되지 않는다

## 예시

Google에서 새 시스템이 기존 시스템 대비 압도적 이점을 제공할 때, 셀프 서비스 마이그레이션 도구를 함께 제공하면 상당한 자발적 채택을 이끌어낸 사례가 있다. 그러나 이런 경우에도 완전한 마이그레이션은 advisory 방식만으로는 달성되지 않았다.

## 관련 개념

- [Deprecation](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [Compulsory Deprecation](/knowledge/software-engineering/design-and-evolution/compulsory-deprecation/)
- [Deprecation Warnings](/knowledge/software-engineering/design-and-evolution/deprecation-warnings/)
