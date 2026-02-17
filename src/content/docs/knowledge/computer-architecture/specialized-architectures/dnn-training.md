---
title: "DNN Training"
description: "DNN 훈련(Training)은 대규모 훈련 데이터셋을 사용하여 정확한 모델의 가중치(weight)를 학습하는 과정으로, 순전파(forward propagation), 역전파(back-propagation), 가중치 갱신(weight update) 세 단계를 반복..."
tags: ['Deep Learning', 'Forward Propagation', 'Back Propagation', 'Stochastic Gradient Descent']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/dnn-training
sidebar:
  order: 18
---

## 핵심 개념

DNN에는 훈련과 추론(inference) 두 단계가 있다. 훈련은 수일에서 수주가 소요되는 반면 추론은 밀리초 단위로 수행된다. 훈련은 세 단계로 구성된다: (1) 순전파는 무작위로 선택한 훈련 예제를 모델에 적용하여 결과를 산출하고 손실 함수로 오차를 측정한다. (2) 역전파는 모델을 역방향으로 실행하여 각 층의 오차/손실 값을 계산한다. (3) 가중치 갱신은 각 층의 입력과 손실 값을 결합하여 가중치 변경량(delta)을 계산하고 적용한다. 각 SGD 단계는 단일 (입력, 결과) 쌍에 대해 가중치를 미세 조정하며, 이를 반복하면 초기 무작위 가중치가 점차 훈련된 모델로 변환된다. 추론과 달리 훈련은 3배 이상의 연산량이 필요하다.

## 예시

```
SGD 훈련 과정:

1. 순전파 (Forward Propagation):
   입력 → [층1: 행렬곱 + 활성화] → [층2: 행렬곱 + 활성화] → 출력
   손실 = 손실함수(출력, 정답)

2. 역전파 (Back-Propagation):
   손실 → [층2 역방향] → [층1 역방향] → 각 층의 기울기 계산

3. 가중치 갱신 (Weight Update):
   가중치_새 = 가중치_기존 - 학습률 × 기울기
```

## 관련 개념

- [Stochastic Gradient Descent](/knowledge/computer-architecture/stochastic-gradient-descent/)
- [TPUv3](/knowledge/computer-architecture/tpuv3/)
- [Brain Floating Point](/knowledge/computer-architecture/brain-floating-point/)
- [Domain-Specific Architecture](/knowledge/computer-architecture/domain-specific-architecture/)
