---
title: "Distribution Transparency"
description: "분산 투명성(Distribution Transparency)은 프로세스와 자원이 물리적으로 여러 컴퓨터에 분산되어 있다는 사실을 최종 사용자와 애플리케이션에게 숨기는 것을 목표로 하는 분산 시스템의 핵심 설계 목표이다"
tags: ['Transparency', 'Distributed Systems', 'Middleware', 'Design Goals']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/distribution-transparency
sidebar:
  order: 3
---

## 핵심 개념

분산 투명성에는 여러 유형이 있으며, ISO 표준(1995)에 따라 다음과 같이 분류된다:

1. **접근 투명성(Access Transparency)**: 데이터 표현 방식과 객체 접근 방법의 차이를 숨김
2. **위치 투명성(Location Transparency)**: 객체의 물리적 위치를 숨김. URL이 대표적 예시
3. **재배치 투명성(Relocation Transparency)**: 사용 중인 객체가 다른 위치로 이동될 수 있음을 숨김
4. **이동 투명성(Migration Transparency)**: 사용자가 시작한 프로세스/자원 이동을 숨김
5. **복제 투명성(Replication Transparency)**: 자원의 여러 복사본이 존재한다는 사실을 숨김
6. **동시성 투명성(Concurrency Transparency)**: 독립적인 사용자들이 동일 자원을 공유한다는 사실을 숨김
7. **실패 투명성(Failure Transparency)**: 시스템 일부의 실패와 복구를 숨김

그러나 완전한 분산 투명성은 실현 불가능하며, 성능과의 트레이드오프를 고려해야 한다. 특히 광역 네트워크에서는 35ms 이상의 지연이 물리적으로 불가피하며, 강한 일관성 보장은 초 단위의 지연을 초래할 수 있다. 따라서 분산을 명시적으로 노출하는 것이 때로는 더 나은 선택일 수 있다.

## 예시

```python
# 위치 투명성의 예: URL
url = "https://www.distributed-systems.net/"
# 이 URL은 실제 서버 위치에 대한 단서를 제공하지 않음
# 전체 사이트가 한 데이터 센터에서 다른 곳으로 이동해도 사용자는 알 수 없음

# 접근 투명성의 예: RPC (원격 프로시저 호출)
# 로컬 호출과 동일한 인터페이스를 제공
result = client.append(data, dbList)  # 로컬처럼 보이지만 실제로는 원격 서버에서 실행
```

투명성과 성능의 트레이드오프 예:
- 복제된 데이터의 강한 일관성 보장 -> 모든 복제본 업데이트 대기 -> 성능 저하
- 실패한 서버에 반복 연결 시도 -> 시스템 전체 속도 저하

## 관련 개념

- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Middleware](/knowledge/distributed-systems/middleware/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
