---
title: "실행을 통한 학습 (Learn by Doing)"
description: "책이나 영상으로만 지식을 습득하는 것이 아니라, 실제로 기술을 사용하고 문제를 해결하면서 배우는 학습 방법이다."
tags: ["Career", "Learning", "Practice", "Self-Education"]
created: 2026-02-27
updated: 2026-02-27
draft: false
slug: knowledge/career/foundations/learn-by-doing
sidebar:
  order: 228
---

## 핵심 개념

기술적 스킬을 단순히 읽기만으로 배우는 것은 불가능하다. 책을 읽으면 기술로 무엇이 가능한지에 대한 아이디어를 얻을 수 있지만, 직접 사용하거나 문제를 해결해보지 않으면 표면적 수준의 이해만 갖게 된다.

스카이다이빙 비유: 비행기에서 뛰어내리기 직전에 스카이다이빙을 배우면 그 어느 때보다 집중해서 배울 수 있다. **즉각적 필요성이 학습 효과를 극대화**한다.

## 동작 원리

효과적인 학습 프로세스:
1. 학습 대상의 전체 그림과 범위 파악
2. 명확한 목표와 측정 기준 설정
3. 다양한 학습 자원 수집 (책, 블로그, 팟캐스트, 비디오 등)
4. 순차적 학습 계획 수립
5. 각 모듈별로 시작할 만큼만 배우고, **직접 해보고**, 질문에 답 찾기
6. 배운 것을 다른 사람에게 가르치기 (지식이 이해로 변환되는 단계)

## 예시

관계형 데이터베이스를 배우는 두 가지 접근법 비교:

**비효율적**: SQL 책을 처음부터 끝까지 읽고, 예제 쿼리를 따라 치기

**효율적 (Learn by Doing)**:
1. 목표 설정: "내가 소유한 영화 컬렉션을 저장하는 데이터베이스 만들기"
2. 데이터베이스 생성, 영화 추가, 삭제, 제목 수정 기능 구현
3. 간단한 애플리케이션으로 데이터베이스 접근
4. 필요한 지식을 찾아보며 실제 문제 해결

```sql
-- 실제 목표가 있으면 자연스럽게 배우게 되는 것들:
CREATE TABLE movies (id INT PRIMARY KEY, title VARCHAR(200), year INT);
INSERT INTO movies VALUES (1, 'Inception', 2010);
SELECT * FROM movies WHERE year > 2000;
UPDATE movies SET title = 'Inception (Director Cut)' WHERE id = 1;
```

## 관련 개념

- [Pareto Principle in Learning](/knowledge/career/foundations/pareto-principle-in-learning/)
- [Just in Time Learning](/knowledge/career/foundations/just-in-time-learning/)
- [Side Project](/knowledge/career/professional-development/side-project/)
