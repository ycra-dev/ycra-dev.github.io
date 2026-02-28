---
title: "Boring Technology"
description: "Dan McKinley가 제안한 개념으로, 검증된 기술을 새로운 기술보다 우선 선택하는 전략"
tags: ["Software Engineering", "Technology Choice", "Risk Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/boring-technology
sidebar:
  order: 19
---

## 핵심 개념

지루한 기술(Boring Technology)은 Dan McKinley가 제안한 개념으로, 검증된 기술을 새로운 기술보다 우선 선택하는 전략이다. "지루한 기술의 실패 모드는 잘 알려져 있다." 새 기술 채택은 회사의 **"혁신 토큰"**을 소비한다. 토큰은 제한적이므로, 핵심 역량 영역에 집중해야 한다.

## 동작 원리

새 기술의 문제점:
- 작은 커뮤니티
- 낮은 안정성
- 부족한 문서
- 낮은 호환성

혁신 토큰을 투자해야 할 때:
- 핵심 역량 영역
- 넓은 활용 범위
- 여러 팀 채택 가능

특히 새 프로그래밍 언어는 토큰 3개를 소비한다 — 빌드 시스템, 테스트 프레임워크, IDE, 라이브러리 전체를 끌어온다.

의사결정 기준: "이 기술이 3년 후에도 잘 지원될 것인가? 채용이 쉬운가? Stack Overflow에 답이 있는가?"

## 예시

LinkedIn의 Scala 도입 사례:
- JVM 호환이라 쉬워 보였지만...
- 빌드 도구(SBT) 문제
- 바이너리 비호환
- JVM 세그폴트
- 수년간 고생

**"충분히 지루하지 않았다."**

새 기술 채택 시 고려 사항:
```
✓ 커뮤니티 규모와 활발한 유지보수 여부
✓ 기존 스택과의 호환성
✓ 팀원들의 학습 비용
✓ 채용 시장에서의 인재 풀
✓ 프로덕션 환경에서의 검증 사례
✗ 단순히 "최신"이거나 "트렌디"하다는 이유
```

## 관련 개념

- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
- [Software Entropy](/knowledge/software-engineering/design-and-evolution/software-entropy/)
- [YAGNI](/knowledge/software-engineering/design-and-evolution/yagni/)
