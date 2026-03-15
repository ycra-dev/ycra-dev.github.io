---
title: "개방성 (Openness)"
description: "개방성(Openness)은 분산 시스템의 구성 요소가 다른 시스템에 쉽게 사용되거나 통합될 수 있도록 표준 규칙에 따라 서비스를 제공하는 설계 목표이다"
tags: ['Openness', 'Interoperability', 'Extensibility', 'Idl', 'Distributed Systems']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/openness
sidebar:
  order: 5
---

## 핵심 개념

개방형 분산 시스템은 세 가지 핵심 속성을 추구한다:

1. **상호운용성(Interoperability)**: 서로 다른 제조사의 두 시스템이 공통 표준에 명시된 서비스만으로 상호 동작할 수 있는 정도.
2. **이식성(Portability)**: 분산 시스템 A용으로 개발된 애플리케이션이 동일 인터페이스를 구현하는 다른 시스템 B에서 수정 없이 실행될 수 있는 정도.
3. **확장성(Extensibility)**: 시스템에 새 컴포넌트를 추가하거나 기존 컴포넌트를 교체하기 쉬운 정도. 플러그인 시스템이 대표적 예.

인터페이스 명세는 **완전성(completeness)**과 **중립성(neutrality)**을 갖추어야 한다. 완전성은 구현에 필요한 모든 것이 명세되었다는 의미이고, 중립성은 구현 방법을 규정하지 않는다는 의미이다.

개방성을 달성하기 위해서는 **정책과 메커니즘의 분리**가 중요하다. 예를 들어, 웹 브라우저의 캐싱에서 저장 위치, 제거 정책, 공유 여부, 갱신 시점 등의 정책을 캐싱 메커니즘과 분리할 수 있다. 단, 엄격한 분리는 수많은 설정 파라미터를 초래하여 복잡성을 증가시킬 수 있다.

## 예시

```python
# IDL을 사용한 인터페이스 정의 예
# 인터페이스는 서비스의 구문(함수, 파라미터, 반환값)을 정의
# 의미는 보통 자연어로 비공식적으로 기술됨

# 정책과 메커니즘 분리 예: 웹 캐시
class WebCache:
    """메커니즘: 문서를 저장하고 검색하는 기능"""
    def store(self, url, document): pass
    def retrieve(self, url): pass
    def evict(self): pass

class CachePolicy:
    """정책: 어떤 문서를 얼마나 오래 저장할지 결정"""
    def should_cache(self, url, headers): pass
    def should_refresh(self, url, cached_time): pass
    def select_victim(self, cache_entries): pass

# 사용자는 정책을 교체하여 캐시 동작을 커스터마이즈
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [RPC (원격 프로시저 호출)](/knowledge/distributed-systems/remote-procedure-call/)
