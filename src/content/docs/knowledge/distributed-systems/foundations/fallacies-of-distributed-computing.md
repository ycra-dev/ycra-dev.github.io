---
title: "분산 컴퓨팅의 오류 (Fallacies of Distributed Computing)"
description: "분산 컴퓨팅의 오류(Fallacies of Distributed Computing)는 Peter Deutsch가 Sun Microsystems에서 정리한, 분산 애플리케이션 개발 시 흔히 범하는 8가지 잘못된 가정들이다"
tags: ['Fallacies', 'Distributed Systems', 'Design Pitfalls', 'Network Assumptions']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/fallacies-of-distributed-computing
sidebar:
  order: 2
---

## 핵심 개념

8가지 잘못된 가정:

1. **네트워크는 신뢰할 수 있다**: 실제로 네트워크 실패는 일상적이며, 실패 투명성의 완전한 달성은 불가능하다.
2. **네트워크는 안전하다**: 네트워크 통신은 본질적으로 안전하지 않으며, 보안에 별도의 장(Chapter)을 할애할 만큼 중요하다.
3. **네트워크는 동질적이다**: 분산 시스템은 개방적이어야 하며 이질성을 고려해야 한다.
4. **토폴로지는 변하지 않는다**: 노드와 연결이 동적으로 변한다.
5. **지연 시간은 0이다**: 광역 네트워크에서 최소 35ms의 지연이 물리적으로 불가피하며, 실제로는 수백 ms에 달한다.
6. **대역폭은 무한하다**: 복제와 캐싱으로 확장성 문제를 해결할 때 대역폭 제한을 고려해야 한다.
7. **전송 비용은 0이다**: 네트워크 인프라의 구축과 유지에는 비용이 든다.
8. **관리자가 한 명이다**: 여러 독립적 관리 도메인에 걸친 시스템에서는 관리적 확장성이 문제가 된다.

이 오류들은 분산 시스템에 고유한 속성들과 직접 관련된다: 신뢰성, 보안, 이질성, 토폴로지, 지연, 대역폭, 전송 비용, 관리 도메인.

## 예시

```python
# 잘못된 가정에 기반한 코드 vs 올바른 접근

# 나쁜 예: 네트워크가 신뢰할 수 있다고 가정
result = remote_server.call("process_data", data)  # 실패 처리 없음

# 좋은 예: 네트워크 실패를 고려
try:
    result = remote_server.call("process_data", data, timeout=5000)
except TimeoutError:
    result = fallback_local_processing(data)  # 대체 처리
except ConnectionError:
    retry_with_backoff(remote_server, "process_data", data)

# 나쁜 예: 지연 시간이 0이라고 가정
for field in form_fields:
    response = server.validate(field)  # 필드마다 서버 왕복

# 좋은 예: 지연을 고려하여 클라이언트 측 검증
validated_form = client_side_validate(form_fields)  # 로컬 검증
server.submit(validated_form)  # 한 번만 전송
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [분산 투명성 (Distribution Transparency)](/knowledge/distributed-systems/distribution-transparency/)
- [장애 허용 (Fault Tolerance)](/knowledge/distributed-systems/fault-tolerance/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
