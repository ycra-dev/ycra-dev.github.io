---
title: "밉맵 (MIP-map)"
description: "MIP-map은 라틴어 \"multum in parvo\"(작은 공간에 많은 것)에서 유래한 용어로, 렌더링 속도를 높이고 아티팩트를 줄이기 위해 서로 다른 해상도로 미리 계산된 이미지들을 포함하는 구조이다"
tags: ['Mip Map', 'Texture', 'Level Of Detail', 'Rendering']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/mip-map
sidebar:
  order: 20
---

## 핵심 개념

MIP-map은 텍스처 매핑에서 핵심적인 기법이다. 원본 텍스처에서 점진적으로 해상도를 줄인 버전들을 미리 생성하여 저장한다.

**MIP-map의 목적**:
- 멀리 있는 객체에 고해상도 텍스처를 사용하면 에일리어싱(계단 현상) 발생
- 적절한 해상도의 텍스처를 선택하여 렌더링 품질 향상
- 텍스처 캐시 효율성 향상 (저해상도 텍스처는 더 작음)

**텍스처 매핑에서 MIP-map 사용**:
1. 텍스처 주소 (s,t)를 수신
2. LOD(Level of Detail)를 계산하여 적절한 MIP-map 레벨 선택
3. 삼선형 보간 분수 계산
4. 선택된 MIP-map 레벨의 텍스처 주소 스케일링
5. 메모리에서 텍셀 접근
6. 필터링 연산 수행

MIP-map의 텍스처 필터링은 상당한 부동소수점 연산을 필요로 하며, 대부분 16비트 반정밀도로 수행된다. GeForce 8800 Ultra는 텍스처 매핑 명령어를 위해 약 500 GFLOPS의 독점 형식 부동소수점 연산 처리량을 제공한다.

## 예시

```
MIP-map 레벨 구조:

Level 0: 256×256 (원본)     = 262,144 텍셀
Level 1: 128×128             = 16,384 텍셀
Level 2:  64×64              = 4,096 텍셀
Level 3:  32×32              = 1,024 텍셀
Level 4:  16×16              = 256 텍셀
Level 5:   8×8               = 64 텍셀
Level 6:   4×4               = 16 텍셀
Level 7:   2×2               = 4 텍셀
Level 8:   1×1               = 1 텍셀

총 추가 메모리: 원본의 약 1/3
(1/4 + 1/16 + 1/64 + ... ≈ 1/3)

LOD 선택:
- 카메라에 가까운 객체 → Level 0 (최고 해상도)
- 멀리 있는 객체 → 높은 Level (저해상도)
- 삼선형 필터링: 인접한 두 MIP-map 레벨 사이를 보간
```

## 관련 개념

- [텍스처 (Texture)](/knowledge/computer-architecture/texture/)
- [반정밀도 (Half Precision)](/knowledge/computer-architecture/half-precision/)
- [셰이더 (Shader)](/knowledge/computer-architecture/shader/)
