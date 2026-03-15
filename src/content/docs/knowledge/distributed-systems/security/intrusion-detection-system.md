---
title: "침입 탐지 시스템 (Intrusion Detection System)"
description: "침입 탐지 시스템(IDS, Intrusion Detection System)은 시스템에서 비인가 활동을 감지하기 위한 모니터링 메커니즘으로, 서명 기반(SIDS)과 이상 기반(AIDS) 두 가지 유형이 있으며, 대규모 분산 시스템에서는 협업 침입 탐지 시스템(CI..."
tags: ['Ids', 'Monitoring', 'Anomaly Detection', 'Firewall', 'Machine Learning', 'Security']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/distributed-systems/intrusion-detection-system
sidebar:
  order: 16
---

## 핵심 개념

**방화벽(Firewall)**: 외부 세계와 내부 시스템을 분리하는 1차 방어선.
- 패킷 필터링 게이트웨이: IP 주소/포트 기반 라우팅 결정
- 애플리케이션 레벨 게이트웨이: 메시지 내용 검사 (메일 필터링, 스크립트 차단)
- 한계: 인증/인가 처리 불가, 우회 시 보호 무력화

**서명 기반 IDS (SIDS)**: 알려진 침입 패턴과 매칭. 제로데이 공격에 취약.

**이상 기반 IDS (AIDS)**: 정상 행동 모델을 구축하여 비정상적 행동 탐지. 머신러닝 기반.
- 학습 단계: 정상적 비악성 데이터 수집, 탐지 모델 구축 (결정 트리, 신경망, 분류기)
- 테스트 단계: 새로운 데이터에 대해 이상 판단
- 핵심 과제: 거짓 음성(false negative, 놓친 침입) 최소화 vs 거짓 양성(false positive) 최소화의 균형

**협업 IDS (CIDS)**: 대규모 분산 시스템을 위한 솔루션.
- 센서들이 커뮤니티로 그룹화되어 커뮤니티 헤드에게 보고
- 중앙화 CIDS: 모든 커뮤니티 헤드가 단일 엔티티에 보고
- 분산 CIDS: 커뮤니티 헤드가 P2P 네트워크 형성

성능 지표:
- 정확도: `ACC = (TP + TN) / (TP + TN + FP + FN)`
- 정밀도: `PRE = TP / (TP + FP)`
- 커뮤니티가 크고 겹칠수록 정확도와 정밀도 향상

## 예시

```python
# 이상 기반 IDS 개념
class AnomalyIDS:
    def __init__(self):
        self.model = None

    def train(self, normal_data):
        """정상 행동 데이터로 모델 학습"""
        self.model = build_classifier(normal_data)

    def detect(self, event):
        """새 이벤트가 이상인지 판단"""
        score = self.model.anomaly_score(event)
        if score > threshold:
            return "ANOMALY"   # 양성 (참양성 또는 거짓양성)
        return "NORMAL"        # 음성 (참음성 또는 거짓음성)

# 협업 IDS 구성
# 대규모 커뮤니티 + 커뮤니티 간 중복 센서 = 높은 정확도
community_1 = [sensor_A, sensor_B, sensor_C]
community_2 = [sensor_B, sensor_C, sensor_D]  # B,C가 중복 -> 정확도 향상
```

## 관련 개념

- [보안 정책과 메커니즘 (Security Policy and Mechanism)](/knowledge/distributed-systems/security-policy-and-mechanism/)
- [보안 설계 원칙 (Security Design Principles)](/knowledge/distributed-systems/security-design-principles/)
- [시빌 공격 (Sybil Attack)](/knowledge/distributed-systems/sybil-attack/)
- [신뢰 컴퓨팅 기반 (Trusted Computing Base)](/knowledge/distributed-systems/trusted-computing-base/)
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain/)
