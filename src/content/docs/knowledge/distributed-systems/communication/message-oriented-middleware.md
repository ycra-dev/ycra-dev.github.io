---
title: "메시지 지향 미들웨어 (Message-Oriented Middleware)"
description: "메시지 지향 미들웨어(MOM, Message-Oriented Middleware)는 메시지 큐를 기반으로 영구적 비동기 통신(persistent asynchronous communication)을 지원하는 미들웨어 서비스이다"
tags: ['Mom', 'Message Queue', 'Persistent Communication', 'Amqp', 'Rabbitmq', 'Message Broker']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/message-oriented-middleware
sidebar:
  order: 5
---

## 핵심 개념

**메시지 큐잉 모델의 특성**:
- 각 애플리케이션은 자체 전용 큐를 가짐. 다른 애플리케이션이 해당 큐에 메시지 삽입 가능.
- 송신자는 메시지가 수신자 큐에 삽입될 것만 보장받음. 수신자가 언제 읽는지는 보장되지 않음.
- 시간적 디커플링: 송신자/수신자가 완전히 독립적으로 실행 가능. 4가지 조합 모두 지원 (둘 다 활성, 송신자만 활성, 수신자만 활성, 둘 다 비활성).

**기본 인터페이스**:
| 연산 | 설명 |
|------|------|
| PUT | 지정 큐에 메시지 추가 (비블로킹) |
| GET | 큐에서 가장 오래된 메시지 제거 (큐 비어있으면 블로킹) |
| POLL | 큐에서 메시지 확인 및 제거 (비블로킹) |
| NOTIFY | 메시지 도착 시 호출될 핸들러(콜백) 설치 |

**메시지 큐잉 시스템 구조**:
- **큐 매니저**: 별도 프로세스 또는 라이브러리로 구현. 보통 애플리케이션과 같은 머신에 위치.
- **주소 지정**: 큐에 논리적 위치 독립 이름 사용. 이름→주소 매핑 테이블 필요.
- **라우터**: 큐 매니저 간 메시지 전달. 전체 토폴로지를 모든 매니저가 알 필요 없이, 인접 라우터에만 전달 → 확장성 확보.

**메시지 브로커**: 애플리케이션 수준 게이트웨이. 서로 다른 메시징 프로토콜을 사용하는 애플리케이션 간 메시지 형식 변환. 플러그인 방식으로 변환 규칙을 동적 추가/제거. 발행-구독 모델에서 토픽 기반 매칭 수행.

**AMQP(Advanced Message-Queuing Protocol)**: 메시지 큐잉 시스템의 상호운용성을 위한 표준 프로토콜.
- 연결(connection) 안에 여러 채널(channel), 세션(session), 링크(link) 다중화.
- 3단계 메시지 전송: unsettled → 수신자 처리 완료 → settled. 진정한 종단 간 통신 신뢰성 제공.
- 내구성(durability) 지원: 메시지와 노드를 durable로 표시하여 장애 시 복구 가능.

**RabbitMQ**: AMQP 0.9/1.0 구현. exchange를 통해 프로듀서가 메시지를 발행하면, 바인딩 키에 따라 적절한 큐에 분배.

## 예시

```python
# RabbitMQ 프로듀서/컨슈머 예시
import rabbitpy

# 프로듀서
def producer():
    connection = rabbitpy.Connection()
    channel = connection.channel()

    exchange = rabbitpy.Exchange(channel, 'exchange')
    exchange.declare()

    queue1 = rabbitpy.Queue(channel, 'example1')
    queue1.declare()
    queue1.bind(exchange, 'example-key')      # 키로 큐를 exchange에 바인딩

    message = rabbitpy.Message(channel, 'Test message')
    message.publish(exchange, 'example-key')  # 키에 바인딩된 모든 큐에 발행

# 컨슈머
def consumer():
    connection = rabbitpy.Connection()
    channel = connection.channel()
    queue = rabbitpy.Queue(channel, 'example1')

    while len(queue) > 0:
        message = queue.get()
        print('Message: %s' % message.body.decode())
        message.ack()                          # 처리 완료 확인

# MOM vs 소켓/RPC 비교
# 소켓/RPC: 일시적(transient), 동기적, 수신자 실행 필수
# MOM:      영구적(persistent), 비동기적, 수신자 비활성 가능
```

## 관련 개념

- [소켓 (Socket)](/knowledge/distributed-systems/socket/)
- [RPC (원격 프로시저 호출)](/knowledge/distributed-systems/remote-procedure-call/)
- [발행/구독 (Publish Subscribe)](/knowledge/distributed-systems/publish-subscribe/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
