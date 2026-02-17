---
title: "BIND (Berkeley Internet Name Domain)"
description: "BIND(Berkeley Internet Name Domain)는 ISC(Internet Systems Consortium)에서 개발한 오픈소스 DNS 서버 소프트웨어로, 인터넷 DNS 서버의 75% 이상이 사용하며 named 데몬, 리졸버 라이브러리, dig/n..."
tags: ['Bind', 'Named', 'DNS Server', 'Isc', 'Named Conf', 'Rndc']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/bind
sidebar:
  order: 14
---

## 핵심 개념

**BIND의 주요 구성 요소:**
1. **named**: 쿼리에 응답하는 네임 서버 데몬
2. **리졸버 라이브러리**: 사용자를 대신하여 DNS 서버에 쿼리
3. **쿼리 도구**: dig, nslookup, host, drill, delv
4. **rndc**: named를 원격으로 제어하는 프로그램

**설정 파일 구조:**
- **named.conf**: 호스트의 역할(마스터/슬레이브/캐싱), 존 데이터 소스, 글로벌 옵션을 지정. 매우 취약한 구문 (세미콜론 누락이나 따옴표 불균형으로 오류 발생)
- **존 데이터 파일**: 각 존의 리소스 레코드를 포함하는 텍스트 파일
- **root.cache**: 루트 네임 서버의 힌트 파일

**named.conf 주요 구문:**
- **options**: 글로벌 옵션 (디렉토리, 재귀, 포워딩, 보안 등). BIND 9.9에는 170개 이상의 옵션
- **zone**: 존 설정 (마스터/슬레이브/힌트/포워드 유형)
- **acl**: 이름이 있는 주소 매치 리스트
- **key**: TSIG 공유 비밀 인증
- **view**: 분할 DNS를 위한 뷰 설정
- **controls**: rndc 접근 제어
- **logging**: 로깅 채널과 카테고리 설정

**rndc 주요 명령어:**
- `rndc reload` - 설정과 존 파일 재로드
- `rndc reconfig` - 설정 재읽기 및 새 존 로드
- `rndc freeze/thaw` - 동적 업데이트 중지/재개
- `rndc flush` - 캐시 비우기
- `rndc stats` - 통계 덤프

## 예시

```bash
# BIND 설치 (Ubuntu)
sudo apt install bind9

# named.conf 기본 구조
# options {
#     directory "/var/named";
#     recursion yes;
#     allow-recursion { localnets; };
#     dnssec-enable yes;
#     dnssec-validation yes;
# };
#
# zone "atrust.com" {
#     type master;
#     file "atrust.com.zone";
#     allow-transfer { my-slaves; };
# };

# rndc 제어
sudo rndc reload                  # 전체 리로드
sudo rndc reload atrust.com       # 특정 존 리로드
sudo rndc reconfig                # 새 존 추가 시
sudo rndc querylog                # 쿼리 로깅 토글
sudo rndc dumpdb                  # 데이터베이스 덤프
sudo rndc stats                   # 통계 출력

# 루트 힌트 파일 갱신
dig @f.root-servers.net . ns > /var/named/root.cache
```

## 관련 개념

- [dns](/knowledge/linux/dns/) - BIND가 구현하는 시스템
- [dns-zone](/knowledge/linux/dns-zone/) - BIND가 서비스하는 데이터 단위
- [dns-resource-record](/knowledge/linux/dns-resource-record/) - BIND의 존 파일에 포함되는 레코드
- [dnssec](/knowledge/linux/dnssec/) - BIND가 지원하는 DNS 보안 확장
- [tsig](/knowledge/linux/tsig/) - BIND 서버 간 보안 통신
- [split-dns](/knowledge/linux/split-dns/) - BIND의 view 기능으로 구현
- [dns-zone-transfer](/knowledge/linux/dns-zone-transfer/) - BIND 마스터-슬레이브 동기화
- [dynamic-dns](/knowledge/linux/dynamic-dns/) - BIND의 동적 업데이트 기능
