---
title: "공격 유형 (Attack Types)"
description: "공격자가 보안을 침해하기 위해 사용하는 주요 공격 기법의 분류와 방어 전략"
tags: ["OS", "Security", "Network"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/attack-types
sidebar:
  order: 7
---

## 핵심 개념

공격 유형(Attack Types)은 공격자가 시스템 보안을 침해하기 위해 사용하는 **표준 기법들의 분류**이다. 신원 위장, 데이터 재전송, 중간자 개입, 세션 가로채기, 권한 상승 등이 대표적이다.

네트워크 통신에서는 송신자와 수신자를 무조건 신뢰할 수 없다. 공격 기법을 이해해야 적절한 방어 메커니즘(암호화, 인증)을 설계할 수 있다.

## 동작 원리

### 주요 공격 유형

| 공격 | 설명 | 방어 |
|------|------|------|
| **Masquerading** | 다른 호스트/사용자로 위장 | 인증(Authentication) |
| **Replay Attack** | 유효한 데이터 전송을 캡처 후 재전송 | Nonce, Timestamp, 세션 키 |
| **Man-in-the-Middle** | 송수신 사이에서 양쪽을 위장하며 데이터 가로채기/수정 | 상호 인증, 암호화 |
| **Session Hijacking** | 활성 통신 세션을 가로채기 | 세션 암호화 |
| **Message Modification** | 통신 중 데이터 변조 | MAC, 디지털 서명 |

### 공격 흐름 도식

```
[정상 통신]
Sender ──────────────────→ Receiver

[Masquerading - 신원 위장]
Attacker ─(위장)─────────→ Receiver
(Receiver는 Attacker를 Sender로 오인)

[Man-in-the-Middle - 중간자 공격]
Sender ←──→ Attacker ←──→ Receiver
(양쪽 모두 Attacker를 상대방으로 오인)

[Replay Attack - 재전송 공격]
Sender ─── 유효한 메시지 ──→ Receiver
                ↓ (캡처)
            Attacker
                ↓ (재전송)
            ──────────────→ Receiver
```

### Privilege Escalation (권한 상승)

할당된 것보다 **더 많은 권한을 획득**하는 공격이다. 다른 공격 유형과 결합하여 시스템을 장악하는 최종 목표가 되는 경우가 많다.

**메커니즘:**
- 이메일의 스크립트/매크로 실행을 통한 송신자 권한 초과
- Masquerading + Message Modification을 결합한 권한 상승
- 시스템 취약점 악용으로 일반 사용자 → root/admin 권한 획득

**비유:** 일반 직원 사원증으로 출입한 뒤(Masquerading), 관리자 권한 문서를 위조(Message Modification)하여 서버실에 접근(Privilege Escalation)하는 것과 같다.

### 공격별 비유

| 공격 | 비유 |
|------|------|
| **Masquerading** | 타인의 신분증으로 출입하는 것 |
| **Replay Attack** | 녹음한 승인 음성을 다시 재생하는 것 |
| **MITM** | 우편물을 가로채서 내용을 바꾸고 다시 봉투에 넣는 것 |
| **Session Hijacking** | 통화 중인 전화를 빼앗아 대화를 이어가는 것 |

## 예시

공용 WiFi에서 MITM 공격 시나리오:
1. 공격자가 공용 WiFi와 동일한 이름의 가짜 AP를 설정
2. 피해자가 가짜 AP에 접속
3. 공격자가 중간에서 모든 트래픽을 가로채고 전달
4. 피해자가 웹사이트에 로그인하면 아이디/비밀번호 탈취
5. HTTPS 사용 시 인증서 검증으로 MITM 방어 가능

## 관련 개념

- [인증 (Authentication)](/knowledge/os/authentication/)
- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/)
- [코드 인젝션 (Code Injection)](/knowledge/os/code-injection/)
- [보호의 목표와 원칙 (Protection Goals)](/knowledge/os/protection-goals/)
