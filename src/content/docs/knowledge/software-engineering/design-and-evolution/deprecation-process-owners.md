---
title: "Deprecation Process Owners"
description: "Deprecation 프로세스의 관리와 실행을 전담하는 명시적 소유자로, 이 없이는 deprecation이 의미 있는 진전을 이루기 어렵다"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/deprecation-process-owners
sidebar:
  order: 55
---

## 핵심 개념

Google의 경험에 따르면 명시적 소유자가 없는 deprecation은 아무리 많은 경고와 알림이 있어도 진전이 거의 없다. Deprecation 작업은 우선순위 경쟁에서 항상 낮은 순위로 밀리는 "중요하지만 긴급하지 않은" 정리 작업에 해당하므로, 제거를 주 목표로 하는 전담 팀이 필요하다.

## 동작 원리

명시적 소유자가 없을 때의 대안:
1. 아무것도 deprecate하지 않는다 → 모든 구 시스템을 영구히 유지하겠다는 약속이 된다
2. 사용자에게 deprecation을 위임한다 → 결국 advisory deprecation이 되어 자연적으로 완료되지 않는다

**특히 문제가 되는 것은 "버려진 프로젝트(abandoned projects)"**:
- 원래 소유자가 후속 프로젝트로 이동한 후 구식 시스템이 여전히 중요한 프로젝트의 의존성으로 남아 있다
- 이런 프로젝트는 저절로 사라지지 않으며, 부적절한 시점에 실패할 위험이 있다

**성과 관리**:
- 점진적 마일스톤(핵심 하위 컴포넌트 삭제 등)을 인정하여 사기를 유지한다
- 최종 시스템 제거만을 유일한 성과 지표로 삼지 않는다

## 예시

Google에서는 이런 중요하지만 긴급하지 않은 정리 작업을 20% 시간의 좋은 활용처로 보며, 엔지니어들에게 코드베이스의 다른 부분을 경험할 기회를 제공한다.

## 관련 개념

- [Deprecation](/knowledge/software-engineering/design-and-evolution/deprecation/)
- [Compulsory Deprecation](/knowledge/software-engineering/design-and-evolution/compulsory-deprecation/)
- [Advisory Deprecation](/knowledge/software-engineering/design-and-evolution/advisory-deprecation/)
