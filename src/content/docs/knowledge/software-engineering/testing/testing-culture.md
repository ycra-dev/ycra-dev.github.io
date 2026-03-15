---
title: "테스팅 문화 (Testing Culture)"
description: "조직 내에서 테스트 작성과 유지보수를 엔지니어링의 핵심 활동으로 받아들이는 문화적 태도와 실천 방식"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/testing-culture
sidebar:
  order: 54
---

## 핵심 개념

Testing Culture는 조직 내에서 테스트 작성과 유지보수를 엔지니어링의 핵심 활동으로 받아들이는 문화적 태도와 실천 방식이다. Google도 처음부터 테스트 문화가 있었던 것은 아니다. 2005년경까지도 많은 프로젝트에 테스트가 부족했고, 엔지니어들은 "테스트를 작성할 시간이 없다"고 주장했다.

## 동작 원리

Google이 테스트 문화를 정착시킨 방법들:

**Testing on the Toilet (TotT)**: 2006년부터 시작된 독특한 캠페인으로, 화장실 칸막이에 테스팅 모범 사례를 담은 한 페이지 문서를 게시했다. 이 캠페인은 큰 성공을 거두어 전사적으로 테스트 인식을 높였다.

**Test Certified 프로그램**: 팀의 테스트 성숙도를 레벨 1~5로 평가하는 프레임워크를 도입했다:
- Level 1: 지속적 빌드 설정, 코드 커버리지 번들 생성, 소규모 테스트 식별
- Level 2: 모든 중요 코드 경로에 테스트 존재
- Level 3: 테스트에서 사소한 변경이 가능
- Level 4: 자동 스모크 테스트 실행
- Level 5: 모든 중요 버그에 재현 테스트 추가

**Orientation Classes**: 신입 엔지니어가 Google에 합류할 때 테스팅 관련 교육을 필수로 이수하게 하여, 초기부터 테스트 문화에 노출시킨다.

## 예시

Google의 경험에서 얻은 핵심 교훈: 테스트를 작성하도록 강제하는 것보다 테스트를 쉽게 작성할 수 있는 인프라와 도구를 제공하는 것이 더 효과적이다. 테스트 프레임워크, 코드 커버리지 도구, CI 시스템 등의 인프라가 갖추어지면 엔지니어들이 자발적으로 테스트를 작성하기 시작한다.

## 관련 개념

- [테스트 커버리지 (Test Coverage)](/knowledge/software-engineering/testing/test-coverage/)
- [테스트 피라미드 (Test Pyramid)](/knowledge/software-engineering/testing/test-pyramid/)
