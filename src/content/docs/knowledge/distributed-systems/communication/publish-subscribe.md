---
title: "발행/구독 (Publish Subscribe)"
description: "발행-구독(Publish-Subscribe) 시스템은 발행자(publisher)가 이벤트를 생성하고, 구독자(subscriber)가 관심 있는 이벤트 유형을 선언하면, 시스템이 발행된 이벤트를 해당하는 구독자에게 자동으로 매칭 및 전달하는 통신 패러다임이다"
tags: ['Publish Subscribe', 'Event Matching', 'Decoupling', 'Messaging']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/publish-subscribe
sidebar:
  order: 7
---

## 핵심 개념

발행-구독 시스템의 핵심 문제는 **분산 이벤트 매칭(distributed event matching)**: 구독(subscription)을 발행(publication)에 효율적으로 매칭하는 것이다.

**구독 유형**:
- **토픽 기반(Topic-based)**: 이벤트가 미리 정의된 토픽/채널에 발행
- **콘텐츠 기반(Content-based)**: 이벤트의 속성값에 기반한 필터링 (예: "가격 < $100")
- **혼합(Hybrid)**: 토픽과 콘텐츠 기반 결합

**구현 방식**:
- **중앙 집중식**: 단일 서버가 모든 구독과 이벤트를 관리. 단순하지만 확장성 제한.
- **분산식**: 이벤트 매칭을 여러 브로커(broker) 노드에 분산. 구독 정보를 브로커 네트워크에 전파하여 이벤트가 관련 구독자에게만 라우팅되도록 함.

발행-구독은 시간적, 공간적, 동기화 측면에서 **결합도를 낮춘다(decoupling)**:
- **공간적 결합 해제**: 발행자와 구독자가 서로를 알 필요 없음
- **시간적 결합 해제**: 동시에 활성화될 필요 없음
- **동기화 결합 해제**: 비동기 메시지 전달

## 예시

```python
# 간단한 발행-구독 시스템
class PubSubBroker:
    def __init__(self):
        self.subscriptions = {}  # topic → [subscriber_callbacks]

    def subscribe(self, topic, callback):
        if topic not in self.subscriptions:
            self.subscriptions[topic] = []
        self.subscriptions[topic].append(callback)

    def publish(self, topic, event):
        for callback in self.subscriptions.get(topic, []):
            callback(event)  # 매칭된 구독자에게 전달

# 콘텐츠 기반 구독 예:
# subscribe(filter="price < 100 AND category == 'electronics'")
# publish(event={price: 50, category: 'electronics'})  → 매칭!
```

## 관련 개념

- [가십 프로토콜 (Gossip Protocol)](/knowledge/distributed-systems/gossip-protocol/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
