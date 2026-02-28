---
title: "Readability Process (Knowledge Sharing)"
description: "프로그래밍 언어 모범 사례를 전파하기 위한 Google의 표준화된 회사 전체 멘토링 프로세스 — 지식 공유의 관점에서"
tags: ["Software Engineering", "Agile", "Mentoring", "Knowledge Sharing", "Code Review"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/agile-methods/readability-process-knowledge-sharing
sidebar:
  order: 20
---

## 핵심 개념

Google의 Readability 프로세스는 프로그래밍 언어 모범 사례를 전파하기 위한 표준화된, 회사 전체 멘토링 프로세스이다. 언어 관용구, 코드 구조, API 설계, 공통 라이브러리 사용, 문서화, 테스트 커버리지를 포함한다.

## 동작 원리

Google 초기에 Craig Silverstein(직원 ID #3)이 모든 신입 사원의 첫 주요 코드 커밋에 대해 직접 한 줄씩 리뷰하던 것에서 시작되었다. 이 프로세스가 너무 가치 있다고 느낀 엔지니어들이 자원봉사로 확장했고, 현재 약 20%의 Google 엔지니어가 리뷰어 또는 작성자로 참여한다.

핵심 메커니즘:
- 모든 changelist(CL)에는 해당 언어의 readability 인증을 가진 사람의 승인이 필수
- 인증된 작성자는 자신의 CL에 암묵적으로 readability 승인을 제공
- 중앙화된 readability 리뷰어 그룹이 회사 전체의 코드를 리뷰
- 작성자가 가이드라인을 내면화하면서 점차 코멘트가 줄어들고 졸업

Readability 리뷰어(전체 엔지니어의 약 1-2%)는 자원봉사자이며, 깊은 언어 전문성뿐만 아니라 코드 리뷰를 통한 교육 적성도 갖추어야 한다. **이 프로세스는 게이트키핑이 아닌 멘토링과 협력적 과정으로 취급되어야 한다.**

## 예시

EPR(Engineering Productivity Research) 팀의 연구 결과:
- readability를 가진 작성자의 CL은 통계적으로 유의미하게 리뷰 및 제출 시간이 짧다
- readability를 완료한 엔지니어의 유의미한 다수가 프로세스에 만족하고 가치 있다고 보고한다
- 리뷰어로부터 배우고, 코드를 작성하고 리뷰할 때 readability 이슈를 피하도록 행동을 변경했다고 보고한다

## 관련 개념

- [Knowledge Sharing Culture](/knowledge/software-engineering/agile-methods/knowledge-sharing-culture/)
- [Canonical Sources of Information](/knowledge/software-engineering/agile-methods/canonical-sources-of-information/)
- [Constructive Criticism](/knowledge/software-engineering/agile-methods/constructive-criticism/)
- [Chesterton's Fence](/knowledge/software-engineering/foundations/chesterton-fence/)
