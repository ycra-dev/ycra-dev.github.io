---
title: "침입 탐지 시스템 (Intrusion Detection System)"
description: "침입 탐지 시스템(IDS)은 네트워크 트래픽이나 호스트 활동을 모니터링하여 의심스러운 활동이나 보안 위반을 탐지하고 경고하는 보안 소프트웨어이다"
tags: ['Security', 'Ids', 'Nids', 'Hids', 'Snort', 'Ossec', 'Monitoring']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/intrusion-detection-system
sidebar:
  order: 9
---

## 핵심 개념

IDS는 크게 두 가지 유형으로 나뉜다:

**NIDS (Network-based IDS):**
- 네트워크를 통과하는 트래픽을 검사하여 의심스러운 패턴을 탐지
- **Snort**: 가장 널리 사용되는 오픈 소스 NIDS. 원시 패킷을 캡처하여 규칙(시그니처) 세트와 비교. Cisco가 유지보수
- **Bro(Zeek)**: 개별 패킷 매칭이 아닌 트래픽 흐름을 모니터링하여 의심스러운 활동을 감지. 스테핑 스톤 탐지, 백도어 탐지, 비표준 포트의 프로토콜 탐지 가능
- 수동 모드(경고 생성)와 능동 모드(악성 활동 차단) 운영 가능

**HIDS (Host-based IDS):**
- 각 시스템에서 프로세스로 실행되며 호스트 활동을 모니터링
- **OSSEC**: 가장 인기 있는 오픈 소스 HIDS. 루트킷 탐지, 파일시스템 무결성 검사, 로그 파일 분석, 시간 기반 경고, 능동적 대응 기능 제공
- OSSEC은 매니저(서버)와 에이전트(클라이언트) 구조로 동작
- 경고 심각도는 0~15 단계로 분류

모든 프로덕션 시스템에 OSSEC과 같은 HIDS를 설치하여 운영하는 것을 권장하며, IDS 경고를 전체 모니터링 시스템과 통합해야 한다.

## 예시

```bash
# OSSEC 서버 시작
sudo /var/ossec/bin/ossec-control start

# OSSEC 에이전트 관리
sudo /var/ossec/bin/manage_agents
# A - 에이전트 추가
# E - 에이전트 키 추출
# L - 에이전트 목록 확인

# OSSEC 설정 파일: /var/ossec/etc/ossec.conf
# 파일 무결성 검사에서 특정 파일 제외
# <syscheck>
#   <ignore>/var/log/customapp.log</ignore>
# </syscheck>

# Snort 기본 실행
sudo snort -A console -c /etc/snort/snort.conf -i eth0
```

## 관련 개념

- [루트킷 (Rootkit)](/knowledge/linux/rootkit/) - HIDS가 탐지하는 주요 위협
- [암호화 해시 함수 (Cryptographic Hash Function)](/knowledge/linux/cryptographic-hash/) - 파일 무결성 검사에 사용되는 기술
- [중앙 집중 로깅 (Centralized Logging)](/knowledge/linux/centralized-logging/) - IDS 경고를 중앙 로그 시스템과 통합
- [네트워크 모니터링 (Network Monitoring)](/knowledge/linux/network-monitoring/) - 네트워크 수준 모니터링과의 연계
