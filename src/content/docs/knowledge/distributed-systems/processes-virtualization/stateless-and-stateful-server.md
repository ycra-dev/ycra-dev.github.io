---
title: "Stateless and Stateful Server"
description: "무상태 서버(Stateless Server)는 클라이언트 상태 정보를 유지하지 않으며, 자체 상태를 클라이언트에 알리지 않고 변경할 수 있는 서버이다"
tags: ['Server Design', 'Stateless', 'Stateful', 'Soft State', 'Session State', 'Cookie']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/stateless-and-stateful-server
sidebar:
  order: 6
---

## 핵심 개념

**무상태 서버**:
- 대표적 예: 웹 서버. HTTP 요청을 처리한 후 클라이언트를 완전히 잊음.
- 서버가 크래시되어도 복구가 단순 - 재시작 후 클라이언트 요청을 기다리기만 하면 됨.
- 로그 같은 정보를 유지할 수 있으나, 손실되어도 서비스에 지장 없음 (최적화 성능만 영향).
- 파일 open/read/close를 매 요청마다 반복하여 상태 유지 동작을 모방.

**소프트 스테이트(Soft State)**:
- 무상태 설계의 변형. 제한된 시간 동안만 클라이언트 상태를 유지.
- 시간 만료 후 기본 동작으로 복귀. 예: 서버가 제한된 시간 동안 업데이트를 푸시, 이후 클라이언트가 폴링.
- 컴퓨터 네트워크 프로토콜 설계에서 유래.

**상태 유지 서버**:
- 대표적 예: 파일 서버가 클라이언트별 (클라이언트, 파일) 테이블을 유지하여 업데이트 권한 추적.
- **장점**: 읽기/쓰기 성능 향상. 클라이언트가 로컬 복사본에서 작업 가능.
- **단점**: 크래시 시 전체 상태를 복구해야 함 → 복잡성 증가.

**세션 상태 vs 영구 상태**:
- **세션 상태**: 단일 사용자의 일련의 작업과 관련. 손실 시 클라이언트가 재요청 가능 → 덜 신뢰성 있는 저장 허용.
- **영구 상태**: 데이터베이스의 고객 정보, 소프트웨어 키 등. 손실 불가.

**쿠키(Cookie)**: 무상태 서버에서 클라이언트 이력을 활용하기 위한 해결책. 서버가 클라이언트별 소량 데이터를 생성하여 브라우저에 저장. 후속 접근 시 브라우저가 자동으로 쿠키를 서버에 전송.

## 예시

```python
# 무상태 서버 예 (웹 서버)
class StatelessFileServer:
    def handle_read(self, filename, offset, length):
        f = open(filename)       # 매번 열기
        f.seek(offset)
        data = f.read(length)
        f.close()                # 즉시 닫기
        return data              # 클라이언트 정보 저장하지 않음

# 상태 유지 서버 예 (파일 서버)
class StatefulFileServer:
    def __init__(self):
        self.client_table = {}   # (client, file) → 상태 정보

    def handle_open(self, client_id, filename, mode):
        handle = open(filename, mode)
        self.client_table[(client_id, filename)] = {
            'handle': handle,
            'permissions': mode
        }
        return handle

    # 크래시 시 client_table 전체 복구 필요!

# 소프트 스테이트 예
# 서버: "30분간 업데이트를 푸시합니다"
# 30분 후: "시간 만료. 이제 직접 폴링하세요"
```

## 관련 개념

- [RESTful Architecture](/knowledge/distributed-systems/restful-architecture/)
- [Fault Tolerance](/knowledge/distributed-systems/fault-tolerance/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
- [Scalability](/knowledge/distributed-systems/scalability/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
