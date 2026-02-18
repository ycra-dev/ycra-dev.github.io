---
title: "SOA Record"
description: "SOA(Start of Authority) 레코드는 DNS 존의 시작을 표시하는 레코드로, 존의 이름, 주 네임 서버, 기술 담당자, 시리얼 번호, 그리고 존 동기화에 사용되는 각종 타임아웃 값을 포함한다(RFC1035)"
tags: ['Soa Record', 'DNS', 'Zone File', 'Serial Number', 'DNS Zone']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/network/soa-record
sidebar:
  order: 6
---

## 핵심 개념

각 존은 정확히 하나의 SOA 레코드를 가진다.

**SOA 레코드의 주요 필드:**
1. **주 네임 서버**: 존의 마스터 네임 서버 (동적 DNS 사용 시 반드시 마스터)
2. **기술 연락처**: user.host 형식의 이메일 (스팸 우려로 대부분 최신 유지 안함)
3. **시리얼 번호(Serial Number)**: 존 데이터 변경 시마다 증가. 32비트 정수. 슬레이브가 업데이트 필요 여부를 판단하는 데 사용. 일반적으로 날짜 인코딩(예: 2017110200)
4. **리프레시(Refresh)**: 슬레이브가 마스터의 시리얼 번호를 확인하는 주기 (1~6시간)
5. **리트라이(Retry)**: 마스터 확인 실패 시 재시도 간격 (20~60분)
6. **만료(Expire)**: 마스터 부재 시 슬레이브가 데이터를 권한적으로 제공하는 최대 기간 (1~2개월)
7. **최소(Minimum)**: 부정 응답의 캐시 TTL (1시간~수시간, BIND는 3시간 초과 시 무시)

**시리얼 번호 관리의 중요성:**
- 데이터 변경 후 시리얼 번호를 증가시키지 않으면 변경이 슬레이브로 전파되지 않음
- 실수로 큰 값을 설정한 경우, 2^31을 더한 값으로 설정 후 원하는 값으로 복원하는 방법이 있음

## 예시

```bash
# SOA 레코드 예시
# $TTL 1d
# atrust.com.  IN  SOA  ns1.atrust.com. hostmaster.atrust.com. (
#              2017110200  ; serial (YYYYMMDDNN 형식)
#              6h          ; refresh (6시간)
#              1h          ; retry (1시간)
#              4w          ; expire (4주)
#              1h )        ; minimum (부정 캐시 TTL)

# 시리얼 번호 형식: YYYYMMDDNN
# 2017110200 = 2017년 11월 02일, 첫 번째 변경

# SOA 레코드 조회
dig atrust.com SOA

# 존 변경 후 리로드
sudo rndc reload atrust.com
```

## 관련 개념

- [dns-zone](/knowledge/network/dns-zone/) - SOA가 정의하는 존
- [dns-resource-record](/knowledge/network/dns-resource-record/) - SOA를 포함하는 레코드 체계
- [dns-zone-transfer](/knowledge/network/dns-zone-transfer/) - 시리얼 번호 기반 존 동기화
- [bind](/knowledge/network/bind/) - SOA 레코드를 처리하는 서버 소프트웨어
- [dns-caching](/knowledge/network/dns-caching/) - SOA의 TTL 설정이 영향을 미치는 캐싱
