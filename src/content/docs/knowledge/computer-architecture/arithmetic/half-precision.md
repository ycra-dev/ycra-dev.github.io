---
title: "반정밀도 (Half Precision)"
description: "반정밀도(Half Precision)는 16비트 이진 부동소수점 형식으로, 1비트 부호, 5비트 지수, 10비트 소수부, 그리고 암시적 정수 비트로 구성된다"
tags: ['Half Precision', 'Floating Point', 'GPU', 'Data Format']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/half-precision
sidebar:
  order: 12
---

## 핵심 개념

반정밀도 형식은 IEEE 754 표준에서 지정한 16비트 저장 형식이다. GPU와 Cg 셰이딩 언어에서 효율적인 데이터 저장 및 이동을 위해 사용되며, 높은 동적 범위를 유지한다.

**사용 영역**:
- 텍스처 필터링과 픽셀 블렌딩 연산
- GPU 텍스처 필터링 유닛과 래스터 연산 유닛 내부
- OpenEXR HDR 이미지 파일 형식의 색상 컴포넌트 값

**GPU 정밀도 발전 과정**:
1. 인덱스 산술 → 정수/고정소수점 → 단정밀도(32비트) 부동소수점 → 배정밀도(64비트) 부동소수점
2. 반정밀도는 주로 저장과 전송에 사용되며, 내부 연산은 보통 더 높은 정밀도로 수행

반정밀도의 범위: 약 6.1 × 10^-5 ~ 65,504 (정규화된 값)
정밀도: 약 3.3 유효 십진 자릿수

## 예시

```
16비트 반정밀도 부동소수점 형식:
[S|EEEEE|MMMMMMMMMM]
 1   5      10 비트

비교:
형식          | 비트 | 부호 | 지수 | 소수부 | 유효 자릿수
--------------+------+------+------+--------+------------
반정밀도       | 16   | 1    | 5    | 10     | ~3.3
단정밀도       | 32   | 1    | 8    | 23     | ~7.2
배정밀도       | 64   | 1    | 11   | 52     | ~15.9

메모리 절약 예시:
1920×1080 RGBA 텍스처:
- 반정밀도: 1920 × 1080 × 4 × 2 = 15.8 MB
- 단정밀도: 1920 × 1080 × 4 × 4 = 31.6 MB
→ 반정밀도 사용 시 메모리와 대역폭 50% 절약
```

## 관련 개념

- [텍스처 (Texture)](/knowledge/computer-architecture/texture/)
- [셰이더 (Shader)](/knowledge/computer-architecture/shader/)
- [융합 곱셈-덧셈 (FMA)](/knowledge/computer-architecture/fused-multiply-add/)
