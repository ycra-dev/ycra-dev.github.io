---
title: "보안 위반 (Security Violations)"
description: "기밀성/무결성/가용성 침해와 서비스 도용/거부를 포함하는 보안 위반 유형 분류"
tags: ["OS", "Security"]
created: 2026-01-28
updated: 2026-01-28
draft: false
slug: knowledge/os/security-violations
sidebar:
  order: 6
---

## 핵심 개념

보안 위반(Security Violation)은 시스템 자원이 의도된 방식 외로 사용되거나 접근되는 상황으로, **기밀성/무결성/가용성 침해**와 **서비스 도용/거부**를 포함한다. 공격자는 다양한 목적(금전, 명성, 파괴)으로 시스템을 노리며, 보안 위반 유형을 분류해야 적절한 방어 전략을 수립할 수 있다.

비유하면, 집에서 Confidentiality는 "엿보기 금지", Integrity는 "물건 건드리지 마", Availability는 "문 막지 마"이다.

## 동작 원리

### CIA Triad

- **Confidentiality (기밀성)**: 인가된 자만 정보 접근
- **Integrity (무결성)**: 정보가 정확하고 완전하게 유지
- **Availability (가용성)**: 필요할 때 정보에 접근 가능

### 5가지 보안 위반 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| **Breach of Confidentiality** | 비인가 데이터 읽기 | 신용카드 정보 탈취, 개인정보 유출 |
| **Breach of Integrity** | 비인가 데이터 수정 | 소스코드 변조, 금융 데이터 조작 |
| **Breach of Availability** | 비인가 데이터 파괴 | 웹사이트 변조(defacement) |
| **Theft of Service** | 비인가 자원 사용 | 좀비 PC를 파일 서버로 사용 |
| **Denial of Service** | 정당한 사용 방해 | DDoS 공격으로 서비스 마비 |

### Threat vs Attack

- **Threat (위협)**: 보안 위반의 잠재적 가능성 (취약점 발견 등)
- **Attack (공격)**: 보안을 깨려는 실제 시도

실제 공격은 여러 유형을 **복합적으로 침해**하는 경우가 많다. 예를 들어, 랜섬웨어는 Availability 침해(파일 암호화)로 금전을 요구한다.

## 예시

- **기밀성 침해**: 데이터베이스에서 고객 개인정보 유출
- **무결성 침해**: 금융 시스템의 거래 금액 조작
- **가용성 침해**: 웹 서버에 대한 DDoS 공격으로 서비스 중단
- **서비스 도용**: 감염된 PC를 암호화폐 채굴에 사용
- **서비스 거부**: 네트워크 대역폭을 소진하여 정상 트래픽 차단

## 관련 개념

- [보안 vs 보호 (Security vs Protection)](/knowledge/os/security-vs-protection/) - 내부 보호 메커니즘과 외부 보안의 차이
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/) - 구체적 공격 기법 분류
- [서비스 거부 공격 (Denial of Service)](/knowledge/os/denial-of-service/) - DoS/DDoS 공격 원리
- [방화벽 (Firewall)](/knowledge/os/firewall/) - 네트워크 기반 방어 수단
