---
title: "API (애플리케이션 프로그래밍 인터페이스)"
description: "소프트웨어 컴포넌트 간의 상호작용 방식을 정의한 인터페이스로 무엇을 할 수 있는지 알려주지만 어떻게 하는지는 숨긴다"
tags: ["Software-Engineering", "API", "Interface", "Abstraction"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/api-basics
sidebar:
  order: 30
---

## 핵심 개념

API(Application Programming Interface, 응용 프로그래밍 인터페이스)는 소프트웨어 컴포넌트 간의 상호작용 방식을 정의한 **계약(contract)이자 인터페이스**이다. 어떤 기능을 요청할 수 있고, 어떤 형식으로 데이터를 주고받을지를 규정한다. "무엇을 할 수 있는지(what)는 알려주지만, 어떻게 하는지(how)는 숨기는 것"이 API의 핵심이다.

## 동작 원리

### API의 세 가지 주요 형태

1. **라이브러리 API**: 프로그래밍 라이브러리가 제공하는 함수·클래스의 집합.
   - 예: Python의 `math.sqrt()`를 호출하면 제곱근을 구할 수 있다. 내부 구현은 알 필요 없다.

2. **운영체제 API (시스템 콜)**: OS가 응용프로그램에 제공하는 서비스 인터페이스.
   - 예: 파일을 열려면 OS의 `open()` 시스템 콜을 사용한다.

3. **웹 API**: 네트워크를 통해 원격 서비스의 기능을 사용하는 인터페이스.
   - 예: 날씨 정보를 얻기 위해 `GET /api/weather?city=Seoul` 요청을 보낸다.

### API의 핵심 가치
- **추상화**: 복잡한 내부 구현을 숨기고 간단한 인터페이스만 노출한다.
- **재사용**: 이미 만들어진 기능을 API를 통해 다른 프로그램에서 활용한다.
- **호환성**: API가 변하지 않으면 내부 구현이 바뀌어도 기존 프로그램은 계속 동작한다.
- **분업**: 각 팀이 API만 합의하면 독립적으로 개발할 수 있다.

레스토랑의 메뉴가 API와 같다. 메뉴(API)에는 주문할 수 있는 음식(기능)과 가격(입력/출력 형식)이 적혀 있다. 손님(프로그래머)은 요리 방법(내부 구현)을 알 필요 없이 메뉴에서 선택하기만 하면 된다.

## 예시

라이브러리 API 사용 (Python):

```python
import math

# math 라이브러리의 API를 사용
result = math.sqrt(144)    # 제곱근 계산 → 12.0
angle = math.sin(3.14159)  # 사인 값 계산 → ≈ 0

# 내부에서 어떤 알고리즘으로 제곱근을 구하는지 알 필요 없음
```

웹 API 사용 예시:

```
요청 (클라이언트 → 서버):
GET https://api.weather.com/current?city=Seoul

응답 (서버 → 클라이언트):
{
  "city": "Seoul",
  "temperature": 15,
  "condition": "맑음"
}
```

API 계층 구조:

```
응용프로그램 (웹 브라우저, 게임 등)
       ↓ 라이브러리 API 호출
프로그래밍 라이브러리 (표준 라이브러리)
       ↓ 시스템 콜 API 호출
운영체제 커널
       ↓ 하드웨어 인터페이스
하드웨어 (CPU, 디스크, 네트워크)
```

## 관련 개념

- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 운영체제가 제공하는 API
- [오픈 소스 소프트웨어 (Open Source Software)](/knowledge/software-engineering/open-source-software/) - 공개 API와 소스코드를 제공하는 소프트웨어

## 출처

- Understanding the Digital World, Chapter 5
