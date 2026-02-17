---
title: "DNS Caching"
description: "DNS 캐싱(Caching)은 네임 서버가 이전 쿼리의 응답을 TTL(Time to Live) 기간 동안 저장하여 동일한 쿼리에 대해 네트워크 조회 없이 즉시 응답할 수 있게 하는 효율성 메커니즘이다"
tags: ['DNS Caching', 'Ttl', 'Negative Caching', 'Performance', 'DNS']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/dns-caching
sidebar:
  order: 8
---

## 핵심 개념

**캐싱의 효과:**
- 캐시된 응답은 거의 무비용이며 대부분 정확함 (호스트 이름-주소 매핑은 드물게 변경)
- 대부분의 쿼리가 로컬 호스트에 대한 것이므로 빠르게 해결
- 사용자의 반복 쿼리가 캐시 효율성을 더욱 높임

**TTL(Time to Live) 설정 전략:**
- 일반 레코드: 1시간 ~ 1일 권장
- 로드 밸런싱 서비스: 10초 ~ 1분 (짧은 TTL로 빠른 장애 대응)
- google.com: 5분 TTL (서버 장애 대응용)
- 구글 네임 서버: 4일(345,600초) TTL
- 루트 서버: 42일 TTL

**부정 캐싱(Negative Caching)**: 쿼리 실패도 캐시하여 동일한 실패 쿼리를 반복하지 않음:
- 호스트 또는 도메인이 존재하지 않는 경우
- 요청한 데이터 유형이 존재하지 않는 경우
- 부정 캐시 TTL은 SOA 레코드의 minimum 필드로 설정

**대규모 재번호 작업 시**: 최소 1주 전에 $TTL을 기존 값(예: 1주)에서 짧은 값(예: 1시간)으로 변경하여, 이전의 긴 TTL 레코드가 만료되고 짧은 TTL 레코드로 교체되도록 해야 한다.

**라운드 로빈 DNS 로드 밸런싱**: 하나의 호스트 이름에 여러 IP 주소를 할당하면 네임 서버가 매 쿼리마다 다른 순서로 레코드를 반환한다. 조잡한 솔루션이며, 대규모 사이트는 HAProxy 같은 전용 로드 밸런서를 사용한다.

## 예시

```bash
# TTL 설정 예시 (존 파일)
# $TTL 1d                    # 기본 TTL: 1일
# www   3600  IN  A  1.2.3.4  # 개별 TTL: 1시간

# 캐시 상태 확인 (dig 출력)
dig google.com
# ;; ANSWER SECTION:
# google.com.   300   IN   A   142.250.185.238
#               ^^^
#               남은 TTL (초)

# 답변이 권한적인지 확인 (aa 플래그)
dig @ns1.google.com google.com
# ;; flags: qr aa rd; ...
#              ^^
#              Authoritative Answer

# 부정 캐시 TTL은 SOA minimum 필드에서 설정
# BIND는 3시간(10800초) 초과 값을 무시
```

## 관련 개념

- [dns](/knowledge/linux/dns/) - 캐싱이 동작하는 시스템
- [soa-record](/knowledge/linux/soa-record/) - 부정 캐시 TTL을 설정하는 레코드
- [dns-zone](/knowledge/linux/dns-zone/) - 캐싱의 데이터 원본
- [dns-resolver](/knowledge/linux/dns-resolver/) - 캐싱 네임 서버에 쿼리하는 클라이언트
- [bind](/knowledge/linux/bind/) - 캐싱을 구현하는 DNS 서버
