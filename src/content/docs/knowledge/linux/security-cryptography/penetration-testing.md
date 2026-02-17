---
title: "Penetration Testing"
description: "침투 테스트(Penetration Testing)는 소유자의 허가를 받아 컴퓨터 네트워크나 애플리케이션에 대해 실제 공격을 시뮬레이션하여 보안 취약점을 발견하는 보안 평가 기법이다"
tags: ['Security', 'Metasploit', 'Owasp', 'Ethical Hacking', 'Application Security']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/penetration-testing
sidebar:
  order: 11
---

## 핵심 개념

보안은 체인에서 가장 약한 고리만큼만 강하다. 안전한 네트워크와 시스템 인프라를 갖추고 있더라도, 그 위에서 실행되는 애플리케이션이 비밀번호 없이 민감한 데이터에 접근을 허용하면 전체 보안이 무의미해진다.

**Metasploit**: 가장 널리 사용되는 오픈 소스 침투 테스트 프레임워크
- Ruby로 작성되었으며 Rapid7이 관리
- 수백 가지 알려진 취약점에 대한 기성 익스플로잇 데이터베이스 포함
- 워크플로우: 원격 시스템 스캔 → 익스플로잇 선택/실행 → 피벗(내부 이동) → 결과 보고 → 정리

**OWASP**: 비영리 웹 애플리케이션 보안 프로젝트
- 웹 애플리케이션 보안 위험에 대한 "Top 10" 목록 발행
- 침투 테스트의 표준 방법론 제공
- 전문 제3자가 OWASP 방법론에 따라 테스트를 수행하는 것을 권장

**주의 사항:**
- 침투 테스트는 정의가 모호한 분야이며, 많은 업체가 실질적인 테스트보다 쇼에 중점을 둔다
- 애플리케이션 출시 시와 수명 주기 전반에 걸쳐 정기적으로 수행해야 한다

## 예시

```bash
# Metasploit 콘솔 실행
msfconsole

# Metasploit 기본 워크플로우
msf> use auxiliary/scanner/portscan/tcp  # 포트 스캔 모듈 선택
msf> set RHOSTS 192.168.1.0/24          # 대상 설정
msf> run                                 # 스캔 실행

# 발견된 취약점에 대해 익스플로잇 시도
msf> search type:exploit platform:linux  # 익스플로잇 검색
msf> use exploit/linux/http/example      # 익스플로잇 선택
msf> set RHOST 192.168.1.100             # 대상 호스트 설정
msf> exploit                              # 익스플로잇 실행
```

## 관련 개념

- [nmap](/knowledge/linux/nmap/) - 침투 테스트의 첫 단계인 정보 수집
- [vulnerability-scanner](/knowledge/linux/vulnerability-scanner/) - 취약점 탐지 자동화
- [ssh](/knowledge/linux/ssh/) - 원격 시스템 접근에 사용되는 프로토콜
- [firewall](/knowledge/linux/firewall/) - 침투 테스트로 방화벽 효과 검증
