---
title: "Parameter Marshaling"
description: "파라미터 마샬링(Parameter Marshaling)은 RPC에서 파라미터를 메시지로 포장(pack)하여 네트워크를 통해 전송하고, 수신 측에서 다시 원래의 데이터 구조로 복원(unpack)하는 과정이다"
tags: ['Marshaling', 'Serialization', 'Endianness', 'Call By Value', 'Call By Reference', 'Rpc']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/parameter-marshaling
sidebar:
  order: 3
---

## 핵심 개념

**마샬링이 필요한 이유**:
1. **해석 문제**: 서버는 수신한 바이트 시퀀스에 대한 추가 메타 정보가 없음. 바이트가 무엇을 의미하는지 알 수 없음.
2. **바이트 순서 문제**: Intel 프로세서는 리틀 엔디안(오른쪽→왼쪽), 일부 ARM은 빅 엔디안(왼쪽→오른쪽). 네트워크 전송은 보통 빅 엔디안.

**해결책**: 데이터를 머신/네트워크 독립적 형식으로 변환. 양쪽이 동일한 메시지 데이터 타입을 기대하도록 보장. 프로그래밍 언어 수준에서 해결 가능.

**파라미터 전달 메커니즘**:
- **값에 의한 호출(Call-by-Value)**: 파라미터 값을 복사. 피호출자의 수정이 호출자에 영향 없음.
- **참조에 의한 호출(Call-by-Reference)**: 메모리 주소를 전달. RPC에서 포인터는 원격 주소 공간에서 의미 없음 → 심각한 문제.
- **값/복원에 의한 호출(Call-by-Copy/Restore)**: 값을 복사하여 전달하고, 호출 후 결과를 원본에 다시 복사. RPC에서 참조 전달의 대안으로 자주 사용.

**포인터/참조 문제 해결**:
- 고정 크기 데이터(정적 배열 등): copy-by-value/restore로 대체
- 읽기 전용 참조: copy-by-value로 충분
- 복잡한 데이터 구조: Python, Java 등 언어의 자동 마샬링 활용
- **전역 참조(Global Reference)**: 호출자와 피호출자 모두에게 의미 있는 참조 사용 (예: 파일 핸들). 클라이언트 스텁 자체를 참조로 사용 가능 (포터블 바이트코드로 전송).

**Python pickle**: 데이터 구조를 바이트 시퀀스로 직렬화/역직렬화하는 라이브러리. RPC에서 마샬링/언마샬링에 사용.

## 예시

```python
# Python pickle을 사용한 마샬링/언마샬링

import pickle

# 클라이언트 스텁
class Client:
    def append(self, data, dbList):
        msglst = (APPEND, data, dbList)
        msgsnd = pickle.dumps(msglst)        # 마샬링: 객체 → 바이트
        self.channel.sendTo(self.server, msgsnd)
        msgrcv = self.channel.recvFrom(self.server)
        retval = pickle.loads(msgrcv[1])      # 언마샬링: 바이트 → 객체
        return retval

# 서버 스텁
class Server:
    def run(self):
        while True:
            msgreq = self.channel.recvFromAny()
            client = msgreq[0]
            msgrpc = pickle.loads(msgreq[1])  # 언마샬링
            if APPEND == msgrpc[0]:
                result = self.append(msgrpc[1], msgrpc[2])
                msgres = pickle.dumps(result) # 마샬링
                self.channel.sendTo(client, msgres)

# 엔디안 문제 예시
# 정수 0x01020304의 메모리 배치:
# 빅 엔디안:    [01] [02] [03] [04]  (네트워크 바이트 순서)
# 리틀 엔디안:  [04] [03] [02] [01]  (Intel x86)
```

## 관련 개념

- [Remote Procedure Call](/knowledge/distributed-systems/remote-procedure-call/)
- [Middleware](/knowledge/distributed-systems/middleware/)
- [Distribution Transparency](/knowledge/distributed-systems/distribution-transparency/)
- [Distributed System](/knowledge/distributed-systems/distributed-system/)
