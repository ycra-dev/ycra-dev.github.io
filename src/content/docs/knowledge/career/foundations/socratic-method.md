---
title: "Socratic Method (소크라테스식 교수법)"
description: "답을 직접 주는 대신 질문을 통해 학습자가 스스로 답을 구성하도록 유도하는 교수법"
tags: ["Career", "Foundations", "Teaching", "Learning"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/socratic-method
sidebar:
  order: 218
---

## 핵심 개념

소크라테스식 방법의 핵심 원리: 가르치는 사람이 답을 말해주면 학습자의 뇌에는 **"누군가가 말한 것"이라는 약한 시냅스 연결**만 형성된다.

반면 **질문을 통해 학습자가 스스로 답을 찾아가면**, 사고 과정 전체가 시냅스 연결로 기록되어 훨씬 강한 기억이 만들어진다.

## 동작 원리

**투자 대비 수익:**
- "DNS 서버 재시작해" → 5초, 학습자는 원인을 모름
- 질문으로 유도 → 5~30분, 학습자는 사고 체인을 내면화

이 방법은 **인내심**을 요구하지만, 투자의 수익은 크다. 학습자는 다음번에 비슷한 문제를 스스로 해결할 수 있게 된다.

**적절한 질문의 조건:**
- 학습자의 현재 이해 수준에서 한 단계씩 앞으로 나아가도록 이끈다.
- 너무 큰 도약 → 좌절, 너무 쉬운 질문 → 시간 낭비

**언제 사용하지 않는가:** 긴급한 프로덕션 장애 상황에서는 빠르게 답을 주는 것이 맞다. 이후 회고(retrospective)에서 소크라테스식 방법을 적용한다.

## 예시

실제 트러블슈팅에서의 소크라테스식 대화:

```
학습자: "서버가 응답 안 해요"
멘토: "어떻게 접근했나요?"
학습자: "ping을 했는데 이름 해석이 실패했어요"
멘토: "이름 해석은 어떻게 동작하나요?"
학습자: "DNS요"
멘토: "DNS가 작동하고 있나요?"
학습자: (확인 후) "DNS 서버가 다운되어 있네요!"
```

멘토가 처음부터 "DNS 확인해봐"라고 했으면 5초 만에 끝났겠지만, 학습자는 "서버 응답 없음 → 이름 해석 실패 → DNS 문제"라는 사고 체인을 내면화하지 못했을 것이다.

## 관련 개념

- [Teaching and Learning](/knowledge/career/foundations/teaching-and-learning/) - 가르치기와 배우기의 뇌과학
- [Constructivism](/knowledge/career/foundations/constructivism/) - 학습자가 스스로 지식을 구성하는 학습 이론
- [Imposter Syndrome](/knowledge/career/personal-branding/imposter-syndrome/) - 임포스터 신드롬을 극복하는 것이 가르치기의 전제
