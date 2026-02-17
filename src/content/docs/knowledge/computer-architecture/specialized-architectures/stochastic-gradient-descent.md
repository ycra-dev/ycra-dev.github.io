---
title: "Stochastic Gradient Descent"
description: "확률적 경사 하강법(SGD)은 DNN 훈련에서 가장 널리 사용되는 최적화 알고리즘으로, 무작위로 선택한 훈련 예제에 대해 순전파, 역전파, 가중치 갱신을 반복하여 모델의 가중치를 점진적으로 개선한다"
tags: ['Deep Learning', 'Optimization', 'Dnn Training', 'Weight Update']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/stochastic-gradient-descent
sidebar:
  order: 19
---

## 핵심 개념

SGD는 전체 데이터셋이 아닌 무작위로 선택된 소수의 훈련 예제(미니배치)에 대해 기울기를 계산하여 가중치를 갱신한다. 이를 통해 계산 비용을 줄이면서도 효과적인 최적화가 가능하다. 각 SGD 단계에서 가중치에 대한 변경량은 매우 작으며, 이 미세한 조정이 반복되면서 초기 무작위 가중치가 훈련된 모델로 변환된다. SGD의 세 단계는 DNN 훈련 하드웨어의 설계에 직접적인 영향을 미친다: 순전파는 추론과 유사하지만, 역전파와 가중치 갱신으로 인해 훈련은 추론의 3배 이상의 연산량이 필요하다. bf16에서 가중치 갱신의 크기가 작을 수 있으므로 fp16의 작은 지수부는 언더플로우를 유발할 수 있지만, bf16의 8비트 지수부는 이를 방지한다.

## 예시

```
SGD 알고리즘:

초기: 가중치 W를 무작위로 초기화

반복:
  1. 미니배치 B 선택 (예: 32개 훈련 예제)
  2. 순전파: 각 예제에 대해 출력 계산
     y_pred = f(x; W)
  3. 손실 계산:
     L = loss(y_pred, y_true)
  4. 역전파: 기울기 계산
     dW = dL/dW
  5. 가중치 갱신:
     W = W - learning_rate * dW

연산량 비교:
  추론: 순전파만 (1배)
  훈련: 순전파 + 역전파 + 갱신 (3배 이상)
```

## 관련 개념

- [DNN Training](/knowledge/computer-architecture/dnn-training/)
- [Brain Floating Point](/knowledge/computer-architecture/brain-floating-point/)
- [TPUv3 Supercomputer](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [Matrix Multiply Unit](/knowledge/computer-architecture/matrix-multiply-unit/)
