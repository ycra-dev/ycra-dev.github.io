---
title: "토르 (Tor, The Onion Router)"
description: "양파 라우팅 기술을 사용하여 인터넷 트래픽을 3개의 릴레이를 통해 전달함으로써 사용자의 IP 주소와 온라인 활동을 익명화하는 네트워크 시스템이다"
tags: ["Security", "Privacy", "Anonymity", "Tor", "Onion-Routing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/tor
sidebar:
  order: 32
---

## 핵심 개념

Tor(The Onion Router)는 양파 라우팅(onion routing) 기술을 사용하여 인터넷 트래픽을 3개의 릴레이를 통해 전달함으로써, 사용자의 IP 주소와 온라인 활동을 익명화하는 네트워크 시스템이다. 미 해군 연구소에서 개발되었으며, 현재는 비영리 단체가 운영한다.

## 동작 원리

**양파 라우팅(Onion Routing)의 원리**:
양파처럼 여러 겹의 암호화 층으로 데이터를 감싸는 방식이다.

Tor 클라이언트가 네트워크에서 3개의 릴레이(노드)를 무작위로 선택한다:
- **입구 노드(Entry/Guard)**: 사용자의 IP를 알지만, 최종 목적지는 모름
- **중간 노드(Middle)**: 어디서 왔는지도, 어디로 가는지도 모름
- **출구 노드(Exit)**: 최종 목적지를 알지만, 원래 발신자를 모름

메시지를 3겹으로 암호화:
- 가장 안쪽: 출구 노드의 키로 암호화
- 중간 층: 중간 노드의 키로 암호화
- 가장 바깥쪽: 입구 노드의 키로 암호화

각 릴레이가 자신의 암호화 층을 하나씩 벗겨내고 다음 릴레이로 전달한다.

**핵심 보안 속성**: 어떤 단일 릴레이도 "누가 무엇을 했는지"를 완전히 알 수 없다. 발신자와 목적지를 동시에 아는 지점이 없다.

**한계와 약점**:
- 속도가 느림 (3개 릴레이를 거치므로)
- 출구 노드에서 비암호화 트래픽은 열람 가능 (HTTPS 병행 필요)
- 트래픽 분석 공격에 이론적으로 취약 (입구와 출구를 동시에 관찰하는 경우)
- 사용자 행동(로그인 등)으로 스스로 익명성을 깨뜨릴 수 있음

**사용 사례**: 언론인의 내부 고발자 보호, 검열 국가에서의 자유로운 인터넷 접근, 프라이버시를 중시하는 일반 사용자.

## 예시

양파 라우팅 과정:
```
Alice가 example.com에 접속하려 할 때:

1. 암호화 과정 (양파 만들기):
   메시지: "GET /index.html"

   3겹 암호화:
   Encrypt(Exit_Key,  "example.com: GET /index.html")  → 층3
   Encrypt(Middle_Key, "Exit주소: 층3")                  → 층2
   Encrypt(Entry_Key,  "Middle주소: 층2")                → 층1

2. 전달 과정 (양파 벗기기):
   Alice → [층1] → Entry 노드
                    Decrypt → "Middle주소: 층2"
                    → [층2] → Middle 노드
                              Decrypt → "Exit주소: 층3"
                              → [층3] → Exit 노드
                                        Decrypt → "example.com: GET /index.html"
                                        → example.com

3. 각 노드가 아는 정보:
   Entry:  Alice의 IP, Middle의 주소 (목적지 모름)
   Middle: Entry의 주소, Exit의 주소 (Alice도 목적지도 모름)
   Exit:   Middle의 주소, example.com (Alice 모름)
```

## 관련 개념

- [공개키 암호 (Public-Key Cryptography)](/knowledge/distributed-systems/public-key-cryptography/) - 각 릴레이와의 암호화에 공개키 암호 사용
- [암호학 (Cryptography)](/knowledge/distributed-systems/cryptography/) - 다중 암호화 층이 Tor의 핵심
- [IP 주소 (IP Address)](/knowledge/network/ip-address/) - Tor의 목적은 사용자의 IP 주소를 숨기는 것
- [라우팅 (Routing)](/knowledge/network/routing/) - 일반 라우팅과 달리 익명성을 위한 간접 경로 사용
- [웹 추적 (Web Tracking)](/knowledge/distributed-systems/web-tracking/) - Tor는 웹 추적을 회피하는 수단

## 출처

- Understanding the Digital World, Chapter 12
