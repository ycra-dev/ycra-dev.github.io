---
title: "바이트 순서 (Byte Order / Endianness)"
description: "다중 바이트 값에서 바이트가 메모리에 저장되는 순서로, 빅 엔디안과 리틀 엔디안 두 가지 방식이 있다"
tags: ["Software-Engineering", "Portability", "Endianness", "Networking"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/byte-order
sidebar:
  order: 116
---

## 핵심 개념

바이트 순서(byte order)는 다중 바이트 값에서 바이트가 메모리에 저장되는 순서로, 빅 엔디안(big-endian)과 리틀 엔디안(little-endian) 두 가지 방식이 있다.

## 동작 원리

정수 `0x12345678`이 메모리에 저장되는 방식:

| 주소 | 빅 엔디안 | 리틀 엔디안 |
|------|-----------|-------------|
| 0x00 | 0x12      | 0x78        |
| 0x01 | 0x34      | 0x56        |
| 0x02 | 0x56      | 0x34        |
| 0x03 | 0x78      | 0x12        |

- **빅 엔디안**: 최상위 바이트(MSB)가 먼저. 사람이 읽는 순서와 동일. SPARC, PowerPC (구형 Mac)
- **리틀 엔디안**: 최하위 바이트(LSB)가 먼저. x86, ARM (대부분의 현대 시스템)
- **네트워크 바이트 순서**: 빅 엔디안. TCP/IP 프로토콜 표준

**바이트 순서가 문제되는 상황:**
- 서로 다른 시스템 간 바이너리 데이터 교환
- 네트워크 통신
- 파일 포맷 읽기/쓰기

**해결책**: 데이터 교환 시 고정된 바이트 순서를 사용하라. 가능하면 텍스트 형식을 사용하라.

## 예시

```c
#include <arpa/inet.h>

/* 네트워크 바이트 순서 변환 함수들 */
uint32_t net_val = htonl(host_val);  // host to network long
uint32_t host_val = ntohl(net_val);  // network to host long
uint16_t net_s = htons(host_s);      // host to network short
uint16_t host_s = ntohs(net_s);      // network to host short

/* 이식 가능한 바이너리 쓰기 */
void write_int(FILE *f, int32_t val) {
    // 항상 빅 엔디안으로 저장
    unsigned char buf[4];
    buf[0] = (val >> 24) & 0xFF;
    buf[1] = (val >> 16) & 0xFF;
    buf[2] = (val >> 8)  & 0xFF;
    buf[3] = val & 0xFF;
    fwrite(buf, 1, 4, f);
}
```

## 관련 개념

- [이식성 (Portability)](/knowledge/software-engineering/portability/) - 바이트 순서는 이식성 문제의 주요 원인
- [데이터 교환 형식 (Data Exchange Format)](/knowledge/software-engineering/data-exchange-format/) - 바이트 순서를 피하기 위해 텍스트 형식을 선호한다
