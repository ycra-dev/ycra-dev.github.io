---
title: "SNMP"
description: "SNMP(Simple Network Management Protocol)는 네트워크 장치의 관리 데이터를 표준화된 계층 구조로 명명하고 수집, 설정하는 업계 표준 프로토콜이다"
tags: ['Monitoring', 'Network', 'Protocol', 'Mib', 'Oid', 'Net Snmp']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/snmp
sidebar:
  order: 1
---

## 핵심 개념

SNMP는 이름과 달리 상당히 복잡한 프로토콜이다. 계층적 네임스페이스에 관리 데이터를 정의하고, 각 네트워크 장치에서 해당 데이터를 읽고 쓰는 방법을 규정한다.

**SNMP 구성 요소:**
- **MIB (Management Information Base)**: SNMP를 통해 접근 가능한 데이터를 기술하는 구조화된 텍스트 파일
- **OID (Object Identifier)**: 관리되는 특정 정보의 이름. 점으로 구분된 숫자 계층 구조 (예: 1.3.6.1.2.1.1.3 = sysUpTime)

**SNMP 기본 연산:**
- `get`: 특정 OID의 데이터 읽기
- `get-next`: MIB 계층 순회
- `set`: 데이터 쓰기
- `trap`: 에이전트에서 매니저로의 비동기 알림 메시지

**보안:**
- SNMPv1/v2: "커뮤니티 스트링"(실질적으로 비밀번호) 사용. 기본값 "public"은 반드시 변경해야 함
- SNMPv3: 사용자별 인가와 접근 제어를 포함한 향상된 보안 프레임워크

**현대적 관점:**
SNMP는 라우터 같은 전용 네트워크 하드웨어에서는 합리적이지만, 서버 모니터링에는 collectd 같은 대안이 훨씬 우수하다. SNMP 세계에서 가능한 빨리 데이터를 가져와 범용 모니터링 플랫폼으로 넘기는 것이 권장된다.

## 예시

```bash
# Net-SNMP 명령줄 도구 설치 (Ubuntu)
sudo apt-get install snmp

# SNMP 워크 - 장치의 전체 OID 덤프
snmpwalk -v1 -c secret813community tuva

# 특정 OID 조회 (5분 로드 평균)
snmpget -v1 -c public localhost 1.3.6.1.4.1.2021.10.1.3.2

# SNMP 테이블 조회
snmptable -v2c -c public switch1 ifTable

# 시스템 업타임 조회
snmpget -v2c -c public router1 sysUpTime.0
```

## 관련 개념

- [network-monitoring](/knowledge/linux/network-monitoring/) - SNMP가 주로 사용되는 네트워크 모니터링
- [collectd](/knowledge/linux/collectd/) - 서버 모니터링에서 SNMP의 현대적 대안
- [time-series-database](/knowledge/linux/time-series-database/) - SNMP 데이터를 저장하는 플랫폼
- [nagios](/knowledge/linux/nagios/) - SNMP 모니터링 플러그인을 포함하는 플랫폼
