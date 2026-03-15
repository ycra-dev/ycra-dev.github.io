---
title: "버전 관리 (Version Management)"
description: "버전 관리는 소프트웨어 컴포넌트와 시스템의 여러 버전을 추적하고, 서로 다른 개발자가 만든 변경 사항이 서로 간섭하지 않도록 보장하는 프로세스이다"
tags: ['Version Management', 'Version Control', 'Git', 'Branching', 'Merging', 'Codeline']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/version-management
sidebar:
  order: 8
---

## 핵심 개념

버전 관리는 코드라인(codeline)과 베이스라인(baseline)을 관리하는 프로세스이다. 코드라인은 소스 코드의 버전 시퀀스이고, 베이스라인은 특정 시스템을 구성하는 컴포넌트 버전의 정의이다. 중앙집중형 VC 시스템(예: Subversion)은 단일 마스터 저장소를 유지하며, 개발자가 컴포넌트를 체크아웃/체크인한다. 분산형 VC 시스템(예: Git)은 각 개발자가 프로젝트 저장소의 복제본(clone)을 생성하여 로컬에서 작업한 후 커밋하고, 프로젝트 저장소에 푸시(push)하거나 통합 관리자가 풀(pull)한다. 분산형의 장점은 백업 메커니즘, 오프라인 작업, 전체 시스템 로컬 빌드/테스트가 가능하다는 것이다. 독립적 개발의 결과로 코드라인이 분기(branch)되며, 후에 병합(merge)이 필요할 수 있다.

## 예시

중앙집중형 예시: Alice가 A1.0, B1.0, C1.0을 체크아웃하여 A1.1, B1.1, C1.1을 생성. Bob이 X1.0, Y1.0, C1.0을 체크아웃하여 작업. Alice가 먼저 C1.1을 체크인한 후, Bob의 체크인은 C1.2를 생성하여 Alice의 변경을 덮어쓰지 않음. 분산형(Git) 예시: 오픈소스에서 Alice와 Bob이 독립적으로 저장소를 클론하고, 각자의 공개 저장소에 푸시한 후, 통합 관리자 Charlie가 풀하여 테스트 후 프로젝트 저장소를 업데이트함.

## 관련 개념

- [시스템 빌드 (System Building)](/knowledge/software-engineering/system-building/)
- [변경 관리 (Change Management)](/knowledge/software-engineering/change-management/)
- [릴리스 관리 (Release Management)](/knowledge/software-engineering/release-management/)
