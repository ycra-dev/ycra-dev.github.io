---
title: "Deprecation"
description: "구식이 된 시스템으로부터 질서 있게 마이그레이션하고 최종적으로 해당 시스템을 제거하는 프로세스"
tags: ["Software Engineering", "Design and Evolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/design-and-evolution/deprecation
sidebar:
  order: 50
---

## 핵심 개념

Deprecation(디프리케이션)은 구식이 된 시스템으로부터 질서 있게 마이그레이션하고 최종적으로 해당 시스템을 제거하는 프로세스다. Google은 "코드는 자산이 아니라 부채"라는 전제에서 deprecation을 시작한다. 코드 자체가 아닌 코드가 제공하는 기능이 가치를 가진다.

## 동작 원리

시스템이 노후화되면 유지보수 비용, 전문 지식 요구, 주변 생태계와의 괴리가 증가한다. 같은 기능을 수행하는 두 시스템이 공존하면 서로 인터페이스해야 하고, 새로운 시스템의 진화도 방해받는다.

Deprecation은 프로그래밍보다는 소프트웨어 엔지니어링의 영역에 속한다. 시간에 걸쳐 시스템을 관리하는 방법에 대한 사고가 필요하기 때문이다. 잘 실행된 deprecation은 중복성과 복잡성을 줄여 리소스 비용을 절감하고 속도를 향상시킨다.

Google에서는 동시에 진행할 수 있는 deprecation 작업의 양에 한계가 있다는 것을 경험했다. 도로 포장 작업에 비유한다: 모든 도로를 동시에 포장하면 아무도 이동할 수 없다. 집중적으로 특정 프로젝트를 선택하여 완료까지 추진하는 것이 효과적이다.

## 예시

Google 내부에는 "두 가지 방법이 있다: deprecated된 것과 아직 준비되지 않은 것"이라는 농담이 있을 정도로 deprecation은 일상적이다.

동일한 기능을 더 적은 코드로 제공할 수 있다면 그것이 더 좋다. 예를 들어 두 가지 로깅 라이브러리가 공존한다면, 엔지니어들은 어느 것을 사용해야 할지 혼란스럽고 버그 수정도 두 번 해야 한다.

## 관련 개념

- [Advisory Deprecation](/knowledge/software-engineering/design-and-evolution/advisory-deprecation/)
- [Compulsory Deprecation](/knowledge/software-engineering/design-and-evolution/compulsory-deprecation/)
- [Deprecation Warnings](/knowledge/software-engineering/design-and-evolution/deprecation-warnings/)
- [Backsliding Prevention](/knowledge/software-engineering/design-and-evolution/backsliding-prevention/)
- [Deprecation Process Owners](/knowledge/software-engineering/design-and-evolution/deprecation-process-owners/)
