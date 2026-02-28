---
title: "웹 추적 (Web Tracking)"
description: "쿠키, 브라우저 핑거프린팅, 추적 픽셀 등의 기술을 사용하여 사용자의 온라인 활동을 수집하고 분석하는 행위이다"
tags: ["Security", "Privacy", "Tracking", "Advertising", "Fingerprinting"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/web-tracking
sidebar:
  order: 24
---

## 핵심 개념

웹 추적(Web Tracking)은 쿠키, 브라우저 핑거프린팅, 추적 픽셀 등의 기술을 사용하여 사용자의 온라인 활동(방문 사이트, 검색 기록, 클릭 패턴 등)을 수집하고 분석하는 행위이다. 현대 인터넷 광고 산업의 기반이며, 동시에 프라이버시 침해의 핵심 문제이다.

## 동작 원리

**1. 제3자 쿠키(Third-party Cookie)**:
- 가장 전통적이고 널리 사용되는 추적 방법
- 광고 네트워크(Google, Facebook 등)가 여러 사이트에 걸쳐 같은 쿠키를 설정
- 사용자가 어떤 사이트를 방문하는지 교차 추적 가능
- 주요 브라우저들이 차단을 강화하고 있음

**2. 추적 픽셀(Tracking Pixel / Web Beacon)**:
- 1x1 픽셀 크기의 보이지 않는 이미지를 웹 페이지나 이메일에 삽입
- 이미지가 로드될 때 서버에 요청이 전송되어 방문/열람 사실을 기록
- 이메일 마케팅에서 수신 확인에 흔히 사용

**3. 브라우저 핑거프린팅(Browser Fingerprinting)**:
- 브라우저 종류, 버전, 설치된 플러그인, 화면 해상도, 시간대, 글꼴 목록 등을 조합
- 쿠키 없이도 개별 사용자를 높은 확률로 식별 가능
- 쿠키 차단으로 회피할 수 없어 더 위협적

**4. 소셜 미디어 버튼**:
- "좋아요", "공유" 버튼이 포함된 모든 페이지에서 추적 발생
- 해당 소셜 미디어에 로그인된 상태라면 실명과 연결 가능

**Do Not Track(DNT)**: 브라우저에서 추적 거부 신호를 보내는 기능이지만, **법적 강제력이 없어** 대부분의 웹사이트가 무시한다.

## 예시

제3자 쿠키 추적 시나리오:
```
1. 뉴스 사이트 방문 → 광고 네트워크 DoubleClick의 쿠키(id=user_7834) 저장
2. 쇼핑 사이트 방문 → 같은 DoubleClick 쿠키 전송
3. 여행 사이트 방문 → 같은 DoubleClick 쿠키 전송

DoubleClick이 아는 정보:
- user_7834는 오전에 정치 뉴스를 읽고
- 오후에 러닝화를 검색하고
- 저녁에 제주도 항공권을 알아봤다
→ 이 정보로 맞춤형 광고 표시
```

핑거프린팅 수집 정보 예시:
```
User-Agent: Chrome/120 on Windows 11
화면 해상도: 2560x1440
시간대: Asia/Seoul (UTC+9)
설치 글꼴: 298개 (특정 목록)
Canvas 렌더링 해시: a7f3b2c1...
→ 이 조합이 고유하여 쿠키 없이도 사용자 식별 가능
```

## 관련 개념

- [쿠키 (Cookie)](/knowledge/network/cookie/) - 제3자 쿠키는 웹 추적의 전통적 핵심 수단
- [검색 엔진 (Search Engine)](/knowledge/distributed-systems/search-engine/) - 검색 엔진은 검색 기록을 추적하여 광고에 활용
- [데이터 마이닝 (Data Mining)](/knowledge/distributed-systems/data-mining/) - 추적 데이터는 데이터 마이닝의 주요 입력
- [피싱 (Phishing)](/knowledge/distributed-systems/phishing/) - 추적으로 수집된 개인정보가 스피어 피싱에 악용 가능

## 출처

- Understanding the Digital World, Chapter 11
