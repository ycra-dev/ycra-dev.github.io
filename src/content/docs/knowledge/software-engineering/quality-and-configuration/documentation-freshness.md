---
title: "Documentation Freshness"
description: "문서가 현재 코드와 시스템의 상태를 정확히 반영하고 있는지를 나타내는 속성 — 오래된 문서는 없는 것보다 나쁘므로 소유자 지정과 주기적 검토가 필요하다"
tags: ["Software Engineering", "Quality", "Documentation", "Maintenance", "Ownership"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/documentation-freshness
sidebar:
  order: 58
---

## 핵심 개념

문서가 현재 코드와 시스템의 상태를 정확히 반영하고 있는지를 나타내는 속성으로, 문서의 최신성을 유지하기 위한 체계적 관리 방법을 포함한다.

## 동작 원리

문서에 대한 가장 큰 불만 중 하나는 "이 문서가 최신인가?"라는 질문이다. 오래된(stale) 문서는 신뢰를 잃게 하며, 최악의 경우 잘못된 정보를 제공한다.

Google에서 문서 최신성을 유지하기 위한 전략:

1. **문서 소유자 지정**: 모든 문서에 명확한 소유자를 두어 업데이트 책임을 부여한다.

2. **최신성 검토(Freshness Review)**: Google에서는 문서 소유자에게 주기적으로(보통 분기별) 자신의 문서를 검토하도록 알림을 보낸다. 소유자는 문서가 최신인지 확인하고, 업데이트가 필요하면 수정하거나, 더 이상 필요 없으면 삭제 표시한다.

3. **코드와 함께 위치**: 문서를 코드 옆에 두면 코드 변경 시 관련 문서도 함께 업데이트될 가능성이 높아진다.

4. **메타데이터 활용**: 마지막 검토일, 소유자 등의 메타데이터를 문서에 포함시켜 추적한다.

핵심은 문서도 코드처럼 지속적인 유지보수가 필요하다는 인식이다.

## 예시

Google의 g3doc 시스템에서는 문서 상단에 메타데이터를 포함시킬 수 있다. 시스템이 자동으로 마지막 검토 이후 일정 기간이 지나면 소유자에게 "이 문서를 검토해주세요"라는 알림을 보낸다. 소유자가 "확인했음(reviewed)" 버튼을 누르면 타이머가 리셋된다.

## 관련 개념

- [Documentation as Code](/knowledge/software-engineering/quality-and-configuration/documentation-as-code/)
- [Code Ownership](/knowledge/software-engineering/quality-and-configuration/code-ownership/)
- [Documentation Review](/knowledge/software-engineering/quality-and-configuration/documentation-review/)
