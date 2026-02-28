---
title: "Design Document"
description: "대규모 변경의 현재 설계, 변경 동기, 잠재적 해결책을 기술하는 협업 설계 도구"
tags: ["Software Engineering", "Documentation", "Design", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/project-management/design-document
sidebar:
  order: 28
---

## 핵심 개념

설계 문서(Design Document)는 대규모 변경의 현재 설계, 변경 동기, 잠재적 해결책, 제안된 해결책을 기술하는 문서다. 설계 결정을 팀 전체에 확장 가능하게 소통하는 도구로, 단순한 문서가 아니라 사고 도구이자 협업 채널이다.

## 동작 원리

설계 문서 작성이 필요한 경우:
1. 1개월 이상의 엔지니어링 작업
2. 장기적 확장/유지보수에 영향
3. 다른 팀에 큰 영향을 미치는 변경

설계 문서의 기능:
- **사고 도구**: 쓰면서 모르는 것을 발견하게 된다
- **피드백 수집**: 팀원과 이해관계자로부터 조기에 피드백을 받는다
- **팀 정보 공유**: 모든 팀원이 같은 맥락을 공유한다
- **신규 엔지니어 온보딩**: 왜 이렇게 설계했는지 이해하는 참고 자료
- **프로젝트 계획**: 구현 전에 리스크와 불확실성을 발견한다

표준 템플릿 구조:
```
소개 → 현재 상태 → 변경 동기 → 요구사항 →
잠재적 해결책 → 제안 해결책 → 설계/아키텍처 →
테스트 계획 → 롤아웃 계획 → 미해결 질문 → 부록
```

설계는 나선형(spiral) 과정이다 — 독립적 사고와 팀 협업을 번갈아 반복하며 점진적으로 정제해 나간다. 문서는 항상 living document로 유지해야 하며, 구현과 괴리되지 않도록 계속 업데이트해야 한다.

## 예시

오픈소스 설계 문서 참고 사례:
- Python PEP (Python Enhancement Proposal)
- Kafka KIP (Kafka Improvement Proposal)
- Rust RFC (Request for Comments)

설계 문서를 리뷰하는 방법:
```
[설계 리뷰 체크리스트]

요구사항 명확성:
  - 문제 정의가 명확한가?
  - 성공 기준이 측정 가능한가?

설계 완성도:
  - 대안들을 충분히 검토했는가?
  - 트레이드오프가 명시되어 있는가?
  - 엣지 케이스가 다루어졌는가?

리스크:
  - 알려진 리스크가 식별되었는가?
  - 롤백 계획이 있는가?

[미해결 질문 섹션 예시]
Q: 캐시 무효화 전략을 어떻게 처리할 것인가?
   → 제안: TTL 기반 + 명시적 무효화 조합
   → 담당: 김개발, 기한: 2026-03-01

Q: 데이터 마이그레이션 중 서비스 중단 허용 범위?
   → 스테이크홀더 논의 필요
```

## 관련 개념

- [Design Spike](/knowledge/software-engineering/project-management/design-spike/)
- [Code Review](/knowledge/software-engineering/foundations/code-review/)
- [Task Decomposition](/knowledge/software-engineering/project-management/task-decomposition/)
