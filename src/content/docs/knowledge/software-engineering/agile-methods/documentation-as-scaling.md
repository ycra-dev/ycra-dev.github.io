---
title: "확장 수단으로서의 문서화 (Documentation as Scaling)"
description: "문서화는 팀과 조직의 확장을 가능하게 하는 핵심 메커니즘 — 처음 배울 때가 개선의 최적 시점이며, 발견 가능성이 핵심이다"
tags: ["Software Engineering", "Agile", "Documentation", "Knowledge Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/documentation-as-scaling
sidebar:
  order: 25
---

## 핵심 개념

문서화는 독자의 학습을 돕는 것을 주목적으로 하는 기록된 지식이며, 팀과 조직의 확장을 가능하게 하는 핵심 메커니즘이다.

## 동작 원리

문서화의 핵심 원칙:

1. **처음 배울 때가 개선의 최적 시점**: 새로운 프로세스나 시스템을 학습할 때, 기존 문서의 부족한 부분을 가장 잘 발견할 수 있다. "캠프장을 발견했을 때보다 깨끗하게 남겨라"

2. **발견 가능성이 핵심**: 발견할 수 없거나 검색할 수 없는 문서는 존재하지 않는 것이나 마찬가지이다. Google의 g3doc은 문서를 소스 코드 바로 옆에 예측 가능하게 배치한다

3. **피드백 메커니즘 필수**: 독자가 문서의 오류를 쉽게 보고할 수 있어야 한다. Google에서는 문서 자체에서 직접 버그를 제출할 수 있다

4. **확장 효과**: 문서의 정보가 정식화(canonicalized)되면 팀 외부로도 확산될 수 있다

문서 작성은 시간과 노력이 필요하고, 혜택은 즉각적이지 않으며 대부분 다른 사람에게 돌아간다. 그러나 작성자 본인도 직접적으로 혜택을 받을 수 있다: 항상 같은 질문에 답해주는 대신 문서를 가리키면 시간이 절약된다.

## 예시

팀원들이 항상 특정 프로덕션 장애 디버깅 방법을 물어본다면, 절차를 문서화하는 데 초기 시간 투자가 필요하지만, 이후에는 문서를 가리키고 필요할 때만 직접 도움을 제공하면 된다. 이 문서는 팀 내에서 정식 참조가 되고, 팀 외부에서도 유사한 문제를 해결하려는 사람들에게 유용해질 수 있다.

## 관련 개념

- [정보의 정식 소스 (Canonical Sources of Information)](/knowledge/software-engineering/agile-methods/canonical-sources-of-information/)
- [지식 공유 문화 (Knowledge Sharing Culture)](/knowledge/software-engineering/agile-methods/knowledge-sharing-culture/)
- [정책의 확장성 (Scalability of Policies)](/knowledge/software-engineering/foundations/scalability-of-policies/)
