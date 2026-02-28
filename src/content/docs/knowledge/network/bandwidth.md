---
title: "대역폭 (Bandwidth)"
description: "네트워크가 단위 시간당 전송할 수 있는 데이터의 최대량으로 bps 단위로 측정되는 네트워크 성능 지표"
tags: ["Network", "Performance", "Bandwidth", "Data-Transfer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/network/bandwidth
sidebar:
  order: 6
---

## 핵심 개념

대역폭(Bandwidth)은 네트워크가 단위 시간당 전송할 수 있는 데이터의 **최대량**으로, bps(bits per second) 단위로 측정된다. 네트워크 성능을 결정짓는 가장 기본적인 지표 중 하나이다.

## 동작 원리

대역폭은 파이프의 굵기에 비유할 수 있다. 파이프가 굵을수록 한 번에 더 많은 물이 흐르듯, 대역폭이 클수록 더 많은 데이터를 동시에 전송할 수 있다.

대역폭의 역사적 발전:
- **전화 모뎀**: 56 Kbps (1990년대)
- **초기 이더넷**: 3 Mbps → 10 Mbps (1980-90년대)
- **현대 이더넷**: 1 Gbps ~ 10 Gbps
- **광섬유**: 100 Gbps 이상

대역폭과 **지연 시간(latency)**은 서로 독립적인 개념이다. "디스크를 가득 실은 트럭"의 비유: 트럭에 테라바이트의 디스크를 실어 미국을 횡단하면 대역폭은 엄청나지만, 지연 시간은 며칠이 걸린다.

네트워크의 실제 성능은 경로상 가장 느린 구간(**병목현상**, bottleneck)에 의해 결정된다.

## 예시

일상적인 대역폭 비교:

| 활동 | 필요 대역폭 |
|------|------------|
| 음성 전화 | ~64 Kbps |
| 음악 스트리밍 (MP3) | ~128-320 Kbps |
| SD 영상 스트리밍 | ~3-5 Mbps |
| HD 영상 스트리밍 | ~5-25 Mbps |
| 4K 영상 스트리밍 | ~25-50 Mbps |

## 관련 개념

- [지연 시간 (Latency)](/knowledge/network/latency/) - 대역폭과 함께 네트워크 성능을 결정하는 또 다른 핵심 지표
- [패킷 (Packet)](/knowledge/network/packet/) - 대역폭은 패킷 전송 속도에 직접 영향
- [데이터 압축 (Data Compression)](/knowledge/network/data-compression/) - 제한된 대역폭을 효율적으로 사용하기 위한 기술
- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 대역폭의 기본 측정 단위

## 출처

- Understanding the Digital World, Chapter 8
