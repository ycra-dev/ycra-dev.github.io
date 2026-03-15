---
title: "고무 오리 디버깅 (Rubber Duck Debugging)"
description: "문제를 무생물(고무 오리 등)이나 다른 사람에게 차근차근 설명하면서 스스로 해결책을 발견하는 디버깅 기법"
tags: ["Software Engineering", "Debugging", "Problem Solving"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/rubber-duck-debugging
sidebar:
  order: 22
---

## 핵심 개념

러버덕 디버깅(Rubber Duck Debugging)은 문제를 무생물(고무 오리 등)이나 다른 사람에게 차근차근 설명하면서 스스로 해결책을 발견하는 디버깅 기법이다. 문제를 말로 설명하는 과정에서 머릿속으로만 생각할 때는 놓쳤던 논리적 빈틈이나 잘못된 가정을 발견하게 된다. 이는 인지과학의 "설명 효과(Explanation Effect)"와 관련이 있다.

## 동작 원리

동작 원리:
- 코드를 한 줄씩 설명하면 각 줄의 의도와 실제 동작을 비교하게 된다
- "이 부분은 당연히 이렇게 동작한다"라는 가정을 검증하게 된다
- 문제를 체계적으로 구조화하는 과정 자체가 문제 해결에 도움

혼자 디버깅에 빠지면 터널 비전이 생긴다. 정기적인 진척 공유와 도움 요청으로 "삽질"을 줄인다.

## 예시

```
# 러버덕 디버깅 과정

개발자: "오리야, 이 함수는 사용자 목록을 정렬하는 건데..."
오리: (가만히 있음)
개발자: "먼저 DB에서 사용자를 가져와서..."
오리: (가만히 있음)
개발자: "그 다음 이름 기준으로 정렬을 하는데...
         잠깐, 여기서 None 이름인 사용자가 있으면
         비교가 실패하겠네!"
오리: (미소)
개발자: "찾았다!"
```

효과적인 질문 템플릿 (동료에게 도움 요청 시):
```
- 문제: X 기능에서 Y 에러 발생
- 시도한 것: 로그 확인, 디버거로 Z 지점까지 추적
- 발견한 것: A 변수가 예상과 다른 값
- 추측: B 서비스와의 통신 문제?
```

## 관련 개념

- [디버깅 (Debugging)](/knowledge/software-engineering/foundations/debugging/)
- [페어 프로그래밍 (Pair Programming)](/knowledge/software-engineering/agile-methods/pair-programming/)
- [타임박싱 (Timeboxing)](/knowledge/software-engineering/agile-methods/timeboxing/)
