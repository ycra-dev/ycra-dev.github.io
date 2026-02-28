---
title: "Source of Truth"
description: "주어진 프로젝트에서 공식적인 코드 상태를 나타내는 하나의 지정된 저장소와 브랜치로, 협업 시 변경사항을 어디에 푸시해야 하는지에 대한 선택이나 불확실성이 없어야 한다"
tags: ["Software Engineering", "Quality and Configuration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/source-of-truth
sidebar:
  order: 200
---

## 핵심 개념

Source of Truth(단일 진실 원천)는 주어진 프로젝트에서 공식적인 코드 상태를 나타내는 하나의 지정된 저장소와 브랜치를 의미한다. 버전 관리 시스템의 가장 중요한 개념 중 하나로, "어디가 진실인가"를 명확히 해야 한다. 핵심은 변경사항을 어디에 푸시해야 하는지에 대한 선택이나 불확실성이 없어야 한다는 것이다.

## 동작 원리

DVCS(분산 버전 관리 시스템)는 많은 훌륭한 워크플로를 가능하게 하지만, 팀이 성장할 때 하위선형(sublinear) 인적 노력으로 관리하려면 하나의 저장소(와 하나의 브랜치)가 궁극적인 Source of Truth로 정의되어야 한다.

Source of Truth에는 상대성이 있다. Google 엔지니어와 RedHat 엔지니어, 리누스 토르발즈 각각이 Linux 커널 패치에 대해 서로 다른 Source of Truth를 가질 수 있다. DVCS는 조직과 그들의 Source of Truth가 계층적(hierarchical)이고 외부에 보이지 않을 때 잘 작동한다.

## 예시

VCS 없이 협업하는 경우를 상상하면 문제가 명확해진다: "Presentation v5 - final - redlines - Josh's version v2" 같은 파일명으로 협업하는 공포를 생각해보라. 합의된 단일 Source of Truth가 없으면 협업은 높은 마찰과 오류를 수반하게 된다.

## 관련 개념

- [One Version Rule](/knowledge/software-engineering/quality-and-configuration/one-version-rule/)
- [Monorepo](/knowledge/software-engineering/quality-and-configuration/monorepo/)
- [Dev Branches](/knowledge/software-engineering/quality-and-configuration/dev-branches/)
