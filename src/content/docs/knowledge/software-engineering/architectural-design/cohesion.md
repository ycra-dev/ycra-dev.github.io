---
title: "Cohesion"
description: "모듈 내부의 요소들이 하나의 목적을 위해 얼마나 밀접하게 관련되어 있는지를 나타내는 척도"
tags: ["Software Engineering", "Architecture", "Design Principle"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/cohesion
sidebar:
  order: 10
---

## 핵심 개념

응집도(Cohesion)는 모듈 내부의 요소들이 하나의 목적이나 기능을 위해 얼마나 밀접하게 관련되어 있는지를 나타내는 척도이다. **높은 응집도가 좋은 설계를 나타낸다.** 단일 책임 원칙(SRP)과 직결되며, 하나의 모듈이 하나의 잘 정의된 역할만 수행하면 응집도가 높다.

## 동작 원리

응집도가 낮은 징후:
- 클래스나 모듈의 이름을 정하기 어려움 (무엇을 하는지 한마디로 설명 불가)
- 메서드들 사이에 공유하는 데이터가 거의 없음
- 수정 시 관련 없어 보이는 부분까지 영향을 받음
- 테스트 작성이 어렵고 setup이 복잡함

응집도를 높이는 방법:
- 관련된 기능을 한 모듈에 모으기
- 관련 없는 기능은 분리하기
- 모듈이 커지면 더 작은 모듈로 분할

DDD(Domain-Driven Design)의 관점에서 도메인 지식을 캡슐화하면 자연스럽게 높은 응집도를 달성할 수 있다.

## 예시

```python
# 낮은 응집도: 관련 없는 기능이 한 클래스에
class Utils:
    def format_date(self, date): ...
    def send_http_request(self, url): ...
    def calculate_checksum(self, data): ...
    def resize_image(self, img, size): ...
    # "Utils"라는 이름 자체가 저응집의 신호

# 높은 응집도: 관련 기능별로 분리
class DateFormatter:
    def format(self, date, pattern): ...
    def parse(self, date_string, pattern): ...

class HttpClient:
    def get(self, url): ...
    def post(self, url, data): ...
```

응집도와 결합도의 관계:
```
낮은 응집도 → God Object 발생 → 높은 결합도

높은 응집도 → 명확한 경계 → 낮은 결합도 → 유지보수 용이
```

## 관련 개념

- [Coupling](/knowledge/software-engineering/architectural-design/coupling/)
- [Software Complexity](/knowledge/software-engineering/architectural-design/software-complexity/)
- [Code Smell](/knowledge/software-engineering/design-and-evolution/code-smell/)
- [Domain-Driven Design](/knowledge/software-engineering/architectural-design/domain-driven-design/)
