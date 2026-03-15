---
title: "씬 클라이언트 (Thin Client)"
description: "씬 클라이언트(Thin Client)는 서버에서 모든 처리와 저장이 이루어지고, 클라이언트는 사용자 인터페이스만 제공하는 애플리케이션 중립적(application-neutral) 솔루션이다"
tags: ['Thin Client', 'X Window', 'Vnc', 'Remote Desktop', 'Virtual Desktop', 'Progressive Web App']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/thin-client
sidebar:
  order: 7
---

## 핵심 개념

**두 가지 클라이언트-서버 상호작용 방식**:
1. **애플리케이션별 프로토콜**: 각 원격 서비스마다 별도의 클라이언트 소프트웨어. 예: 캘린더 앱이 원격 공유 캘린더와 동기화.
2. **씬 클라이언트**: 원격 서비스에 대한 직접 접근만 제공. 사용자 인터페이스 역할만 수행.

**X Window System**: 가장 오래되고 널리 사용되는 네트워크 사용자 인터페이스.
- X 커널이 터미널(모니터, 키보드, 마우스)을 제어하는 서버 역할.
- 원격 애플리케이션이 Xlib 라이브러리를 통해 X 커널에 요청 전송.
- X 프로토콜로 네트워크를 통해 통신. 여러 애플리케이션이 동시에 통신 가능.
- 윈도우 매니저가 디스플레이의 외관(look and feel) 결정.
- NX 프로토콜: X 메시지의 대역폭을 최대 1000배 감소시켜 9600 kbps 저대역폭에서도 동작 가능.

**VNC(Virtual Network Computing)**: 원격 데스크톱 제어 방식. 애플리케이션이 픽셀 단위로 원격 디스플레이를 직접 제어. 효율적인 인코딩 기법이 필수 (320x240, 24비트, 30fps → 53 Mbps 필요).

**가상 데스크톱 환경**: Chrome OS가 선도. 브라우저가 로컬 데스크톱 인터페이스를 제공하며, 모든 애플리케이션은 클라우드 기반.
- 브라우저가 OS 사용자 인터페이스의 역할을 대체하는 추세.
- **Progressive Web App (PWA)**: 브라우저를 호스팅 환경으로 사용하되 네이티브 앱처럼 보임. 서버 측 콘텐츠를 클라이언트에 캐싱하여 오프라인에서도 동작 가능. 모바일 앱에 가까운 성능 제공.

**Chrome 브라우저 구조**: 2500만 줄 이상의 코드. 리소스 로더 → HTML 파싱(DOM 구성) → 스타일링 → 레이아웃 → 페인팅 → 래스터화 → 합성. 각 탭이 별도 렌더러 프로세스, 보안 샌드박스에서 실행.

**씬 클라이언트의 진화**: 과거 "단순한 디스플레이 장치"에서 PWA, 모바일 앱, 브라우저 확장 등으로 점점 더 많은 기능을 클라이언트에 동적으로 마이그레이션하는 방향으로 발전.

## 예시

```
# X Window System 구조

[원격 애플리케이션]  ←→  [Xlib/툴킷]
        │                    │
        │       X 프로토콜 (네트워크)
        │                    │
        ▼                    ▼
[윈도우 매니저]  ←→  [X 커널 (서버)]
                         │
                    [디스플레이/키보드/마우스]

# 클라이언트-서버 역할이 직관과 반대!
# X 커널 = 서버 (디스플레이 요청을 처리)
# 원격 애플리케이션 = 클라이언트 (요청을 보냄)

# Chrome 브라우저 렌더링 파이프라인
# HTTP 요청 → 리소스 로더 → HTML 파싱 → DOM 트리
#                                          ↓
#                              CSS 파싱 → 렌더 트리
#                                          ↓
#                              레이아웃 → 페인팅 → 래스터화 → 합성 → 화면
# 각 단계가 별도 스레드/프로세스에서 실행 가능
```

## 관련 개념

- [계층화 아키텍처 (Layered Architecture)](/knowledge/distributed-systems/layered-architecture/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [코드 마이그레이션 (Code Migration)](/knowledge/distributed-systems/code-migration/)
- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
