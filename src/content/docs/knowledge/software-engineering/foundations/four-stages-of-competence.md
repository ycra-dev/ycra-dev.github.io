---
title: "역량의 4단계 (Four Stages of Competence)"
description: "기술 학습 과정에서 인식(의식)과 능력의 조합으로 학습 단계를 설명하는 모델"
tags: ["Software Engineering", "Learning", "Skill Acquisition"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/four-stages-of-competence
sidebar:
  order: 20
---

## 핵심 개념

4단계 역량 모델(Four Stages of Competence)은 기술 학습 과정에서 인식(의식)과 능력의 조합으로 학습 단계를 설명하는 모델이다. Martin Broadwell이 정의했으며, 학습자가 무의식적 무능에서 무의식적 유능으로 진화하는 과정을 나타낸다.

## 동작 원리

4단계:
1. **무의식적 무능력(Unconscious Incompetence)**: 자기가 무엇을 모르는지도 모르는 상태. 가장 위험한 단계. 자신이 모른다는 것조차 모름
2. **의식적 무능력(Conscious Incompetence)**: 자기의 부족함을 인식. 배움의 시작점. 부족함을 인식하지만 아직 수행 불가
3. **의식적 능력(Conscious Competence)**: 의식적 노력으로 수행 가능. 집중이 필요
4. **무의식적 능력(Unconscious Competence)**: 자동화된 능숙함. 자연스럽게 수행 가능 (숙련)

프로그래밍에서의 교훈:
- 가장 위험한 것은 1단계의 자만심. "나는 잘하고 있다"고 착각하지만 실제로는 심각한 결함이 있는 코드를 생산
- 4단계에 도달한 후에도 안주(complacency)를 경계해야 한다. 환경이 변하면 1단계로 돌아갈 수 있다
- TDD 같은 방법론은 3단계 이상의 능력이 있어야 효과적으로 활용 가능

## 예시

신입 개발자가 코드 리뷰를 처음 할 때:
1. **무의식적 무능** — 뭘 봐야 할지 모름
2. **의식적 무능** — 보안, 성능 등을 놓치고 있음을 인식
3. **의식적 유능** — 체크리스트를 활용해 리뷰
4. **무의식적 유능** — 자연스럽게 패턴 인식

```
# 프로그래머의 4단계 역량

무의식적 무능력:
  "내 코드에 버그가 있을 리 없어"
  → 테스트 없이 자신감만 높음

의식적 무능력:
  "내 코드에 보안 취약점이 있을 수 있다는 걸 안다"
  → 부족함을 인식하고 학습 시작

의식적 능력:
  "SQL 인젝션을 방지하려면 파라미터화된 쿼리를 사용해야 한다"
  → 의식적으로 올바른 패턴 적용

무의식적 능력:
  자연스럽게 안전한 코드를 작성
  → 보안 패턴이 체화됨
```

Dunning-Kruger Effect는 1단계의 자만심이 심한 경우, Impostor Syndrome은 능력이 있음에도 2단계에 머무는 경우이다.

## 관련 개념

- [드레이퍼스 모델 (Dreyfus Model)](/knowledge/software-engineering/foundations/dreyfus-model/)
- [가면 증후군 (Impostor Syndrome)](/knowledge/software-engineering/foundations/impostor-syndrome/)
- [더닝-크루거 효과 (Dunning-Kruger Effect)](/knowledge/software-engineering/foundations/dunning-kruger-effect/)
- [지식 포트폴리오 (Knowledge Portfolio)](/knowledge/software-engineering/project-management/knowledge-portfolio/)
