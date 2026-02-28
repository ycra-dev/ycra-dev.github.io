---
title: "Attention Set"
description: "코드 리뷰에서 현재 변경이 차단되어 있는 사람들의 집합을 관리하여 누가 다음에 행동해야 하는지 명확히 하는 기능"
tags: ["Software Engineering", "Code Review", "Developer Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/attention-set
sidebar:
  order: 307
---

## 핵심 개념

Attention set(어텐션 셋)은 Critique의 기능으로, 현재 코드 리뷰 변경이 차단된 사람들의 집합을 관리한다. 코드 리뷰의 턴 기반(turn-based) 특성을 강조하며, "누구 차례인가"를 명확히 하여 병목을 제거한다.

## 동작 원리

어텐션 셋의 핵심 목적은 "누구 차례인가"를 명확히 하는 것이다. 특히 하나의 변경에 여러 리뷰어가 할당된 경우(예: 소프트웨어 엔지니어와 UX 담당자) 효과가 크다.

동작 흐름:
1. 작성자가 코드 리뷰를 요청 → 리뷰어가 어텐션 셋에 추가됨
2. 리뷰어가 코멘트를 게시 → 작성자가 어텐션 셋으로 이동
3. 작성자가 코멘트에 응답하고 새 스냅샷을 업로드 → 리뷰어가 다시 어텐션 셋으로 이동

어텐션 셋에 포함된 사람은 적시에 응답해야 하며, Critique는 관련 사용자 이름을 볼드체로 렌더링하여 표시한다. 사용자가 코멘트를 게시하면 Critique가 자동으로 어텐션 셋을 업데이트하지만, 사용자가 직접 관리할 수도 있다.

이 기능이 구현되기 전에는 리뷰어와 작성자 사이에 채팅으로 "누가 이 변경을 처리하고 있는지" 확인해야 했다. 구현 후 사용자들의 반응: "이 기능 없이 어떻게 했나?"

## 예시

Critique의 대시보드는 기본적으로 사용자의 주의가 필요한 변경들을 첫 번째 섹션에 표시한다. 여러 리뷰어가 할당된 경우, 한 명이 응답하면 다른 리뷰어들도 어텐션 셋에서 제거될 수 있어 불필요한 대기를 줄인다.

## 관련 개념

- [Critique](/knowledge/software-engineering/quality-and-configuration/critique/)
- [LGTM and Approval](/knowledge/software-engineering/quality-and-configuration/lgtm-and-approval/)
