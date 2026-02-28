---
title: "Software Complexity"
description: "소프트웨어 시스템을 이해하고 수정하기 어렵게 만드는 구조적 특성의 총합"
tags: ["Software Engineering", "Architecture", "Maintainability"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/architectural-design/software-complexity
sidebar:
  order: 9
---

## 핵심 개념

소프트웨어 복잡성(Software Complexity)은 시스템을 이해하고, 수정하고, 검증하기 어렵게 만드는 구조적 특성의 총합이다. John Ousterhout는 이를 "시스템을 이해하고 수정하기 어렵게 만드는 구조의 모든 것"으로 정의한다. 복잡성이 증가하면 버그 발생률이 높아지고, 개발 속도가 느려지며, 유지보수 비용이 기하급수적으로 증가한다.

## 동작 원리

복잡성의 세 가지 특성:
- **높은 의존성(Dependency)**: 긴밀한 결합(tight coupling)과 높은 변경 증폭 — 하나의 변경이 연쇄 수정을 유발한다
- **높은 불투명성(Obscurity)**: 변경의 부작용 예측 불가, God Object, 전역 상태, 과도한 간접 참조가 증상이다
- **관성(Inertia)**: 사용 중단하거나 변경하기 어려운 정도

복잡성을 구성하는 두 가지 주요 요소:
- **Blobs (덩어리)**: 모듈, 클래스, 함수 등 코드의 구성 단위. 각 덩어리의 크기와 역할이 적절해야 한다
- **Lines (연결)**: 모듈 간 의존성과 통신 경로. 연결이 많을수록 복잡성이 증가한다

**필수 복잡성(Essential Complexity)**과 **우발적 복잡성(Accidental Complexity)**을 구분해야 한다. 우발적 복잡성을 제거하는 것이 좋은 설계의 핵심이다.

복잡성 관리 전략: 높은 관성 + 높은 변경 빈도의 시스템을 단순화해야 한다. 복잡성을 완전히 제거할 수 없으면 위치를 선택한다 — 사용 편의성 vs 구현 복잡성의 트레이드오프.

## 예시

```python
# 높은 결합도 + 낮은 응집도 (나쁜 설계)
class GodObject:
    def parse_xml(self): ...
    def send_email(self): ...
    def calculate_tax(self): ...
    def render_pdf(self): ...
    def connect_database(self): ...
    # 모든 것을 하는 신 객체 → 복잡성 폭발

# 낮은 결합도 + 높은 응집도 (좋은 설계)
class XmlParser:
    def parse(self, content): ...

class EmailService:
    def send(self, to, subject, body): ...

class TaxCalculator:
    def calculate(self, amount, region): ...
# 각 클래스가 하나의 명확한 책임만 담당
```

과도한 추상화가 오히려 복잡성을 키우는 경우:
```java
// Bad: 모든 큐의 합집합 인터페이스
interface IDistributedQueue {
    void push(Message m);
    Message pull();
    void acknowledge(Message m);  // Kafka에는 불필요
    void seek(Offset o);          // RabbitMQ에는 불필요
}

// Good: 구체적 구현체 직접 사용
KafkaConsumer consumer = new KafkaConsumer(config);
// 나중에 필요 시 추상화
```

## 관련 개념

- [Cohesion](/knowledge/software-engineering/architectural-design/cohesion/)
- [Coupling](/knowledge/software-engineering/architectural-design/coupling/)
- [KISS Principle](/knowledge/software-engineering/foundations/kiss-principle/)
- [YAGNI](/knowledge/software-engineering/design-and-evolution/yagni/)
- [Technical Debt](/knowledge/software-engineering/design-and-evolution/technical-debt/)
