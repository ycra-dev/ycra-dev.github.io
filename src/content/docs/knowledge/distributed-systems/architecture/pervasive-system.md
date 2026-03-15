---
title: "퍼베이시브 시스템 (Pervasive System)"
description: "퍼베이시브 시스템(Pervasive System)은 모바일 및 임베디드 컴퓨팅 장치가 환경에 자연스럽게 녹아들어 사용자와의 경계가 모호해지는 분산 시스템이다"
tags: ['Pervasive Computing', 'Ubiquitous Computing', 'Iot', 'Sensor Network', 'Mobile Computing']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/pervasive-system
sidebar:
  order: 10
---

## 핵심 개념

**유비쿼터스 컴퓨팅(Ubiquitous Computing)** 시스템의 5대 요구사항:
1. **분산**: 장치들이 네트워크화되고 투명하게 접근 가능
2. **상호작용**: 사용자와의 상호작용이 자연스럽고 비간섭적. 암묵적 행동(implicit action)을 입력으로 인식
3. **맥락 인식(Context Awareness)**: 위치, 신원, 시간, 활동 등의 맥락 정보를 활용하여 최적화
4. **자율성**: 인간의 개입 없이 자율적으로 운영. 자동 주소 할당(DHCP), 장치 발견(UPnP), 자동 업데이트
5. **지능**: AI 기법을 활용하여 불완전한 입력 처리, 환경 변화에 신속 대응

**모바일 컴퓨팅**: 장치의 위치가 시간에 따라 변하는 것이 특징. Mobile Cloud Computing(MCC)과 Mobile Edge Computing(MEC)의 두 가지 모델이 있다. MEC는 지연 시간이 중요한 증강현실, 인터랙티브 게임, 실시간 헬스케어 등에 필수적이다.

**센서 네트워크**: 수십~수천 개의 작은 노드로 구성. 센서 데이터를 분산 데이터베이스로 조직하여 SQL과 유사한 질의 처리가 가능. 네트워크 내 처리(in-network processing)와 데이터 집계(aggregation)가 핵심 과제이다.

## 예시

```python
# 센서 네트워크에서 추상 영역(abstract region) 사용 예
region = k_nearest_region.create(8)      # 가장 가까운 8개 이웃 노드 영역 생성
reading = get_sensor_reading()            # 자체 센서에서 값 읽기
region.putvar(reading_key, reading)       # 영역에 값 공유
max_id = region.reduce(OP_MAXID, reading_key)  # 영역 내 최대값을 가진 노드 식별

# 맥락 인식의 예: 차량 개인화
# Bob이 차에 앉으면 → 시스템이 Bob을 인식
# → 좌석, 핸들, 미러를 Bob의 설정으로 자동 조정
# 사용자는 컴퓨터 시스템과 상호작용하고 있다는 것을 의식하지 못함
```

## 관련 개념

- [분산 시스템 (Distributed System)](/knowledge/distributed-systems/distributed-system/)
- [엣지 컴퓨팅 (Edge Computing)](/knowledge/distributed-systems/edge-computing/)
- [클라우드 컴퓨팅 (Cloud Computing)](/knowledge/distributed-systems/cloud-computing/)
- [미들웨어 (Middleware)](/knowledge/distributed-systems/middleware/)
- [확장성 (Scalability)](/knowledge/distributed-systems/scalability/)
