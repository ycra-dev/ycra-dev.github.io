---
title: "방화벽 (Firewall)"
description: "신뢰할 수 있는 네트워크와 신뢰할 수 없는 네트워크 사이에서 트래픽을 필터링하고 모니터링하는 보안 장치"
tags: ["OS", "Security", "Network"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/firewall
sidebar:
  order: 11
---

## 핵심 개념

방화벽(Firewall)은 신뢰할 수 있는 네트워크와 신뢰할 수 없는 네트워크 사이에서 트래픽을 필터링하고 모니터링하는 보안 장치입니다. 필요한 통신만 허용하고 불필요하거나 위험한 접근을 차단합니다.

필터링 기준:
- 출발지/목적지 IP 주소
- 출발지/목적지 포트
- 연결 방향 (inbound/outbound)

## 동작 원리

### DMZ (Demilitarized Zone)

```
         Internet (Untrusted)
              │
         [ Firewall ]
              │
    ┌─────────┴─────────┐
    ▼                   ▼
   DMZ              Internal
(Semi-trusted)     (Trusted)
```

| 연결 | 허용 |
|------|------|
| Internet → DMZ | O |
| Internal → Internet | O |
| Internet → Internal | X |
| DMZ → Internal | 제한적 |

DMZ에는 웹 서버, 메일 서버 등 외부 노출이 필요한 서비스를 배치합니다.

### 방화벽 유형

| 유형 | 설명 |
|------|------|
| **Network Firewall** | 네트워크 경계에서 패킷 필터링 |
| **Personal Firewall** | 개별 호스트 보호 (SW 기반) |
| **Application Proxy** | 특정 프로토콜(SMTP 등) 이해하고 중계 |
| **System-call Firewall** | 프로세스의 시스템 콜 제한 |

### 방화벽의 한계

| 한계 | 설명 |
|------|------|
| **Tunneling** | 허용된 프로토콜 내 악성 데이터 전송 |
| **Buffer Overflow** | HTTP 허용 → HTTP 내 익스플로잇 통과 |
| **DoS** | 방화벽도 DoS 대상이 될 수 있음 |
| **IP Spoofing** | 허용된 IP로 위장하여 통과 |

## 예시

건물 출입구의 경비원에 비유할 수 있습니다. 신분증을 확인하고 허가된 사람만 입장시킵니다.

```
[방화벽 규칙 예시]

Rule 1: ALLOW TCP dst_port=80 from ANY to WebServer
Rule 2: ALLOW TCP dst_port=443 from ANY to WebServer
Rule 3: DENY  TCP dst_port=22 from Internet to ANY
Rule 4: ALLOW TCP dst_port=22 from Internal to ANY
Rule 5: DENY  ALL (default)
```

### 장단점

- **장점**: 네트워크 경계 보호, 공격 표면 축소, 연결 모니터링 및 로깅
- **단점**: 허용된 트래픽 내 공격 탐지 불가, 단일 실패점 가능, 방화벽 자체도 패치/업데이트 필요

## 관련 개념

- [공격 유형 (Attack Types)](/knowledge/os/attack-types/)
- [서비스 거부 공격 (Denial of Service)](/knowledge/os/denial-of-service/)
- [코드 인젝션 (Code Injection)](/knowledge/os/code-injection/)
