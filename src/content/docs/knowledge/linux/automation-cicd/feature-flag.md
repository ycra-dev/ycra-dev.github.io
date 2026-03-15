---
title: "기능 플래그 (Feature Flag)"
description: "피처 플래그(Feature Flag, Feature Toggle)는 구성 설정값에 따라 애플리케이션의 특정 기능을 활성화하거나 비활성화하는 기법으로, 코드 배포와 기능 릴리스를 분리할 수 있게 한다"
tags: ['Feature Flag', 'Feature Toggle', 'Deployment', 'Release Management', 'Configuration']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/feature-flag
sidebar:
  order: 15
---

## 핵심 개념

피처 플래그를 사용하면 새 기능의 코드를 프로덕션에 배포하면서도 실제로 사용자에게 노출하지 않을 수 있다. 이를 통해:

1. **배포와 릴리스 분리**: 코드는 모든 환경에 배포하되, 스테이징에서만 활성화하고 프로덕션에서는 테스트 완료 시까지 비활성화
2. **저위험 릴리스**: 기능 활성화가 소프트웨어 릴리스가 아닌 단순 구성 변경이 됨
3. **빠른 롤백**: 기능에 버그가 있으면 소프트웨어 업데이트 없이 비활성화로 즉시 대응
4. **점진적 롤아웃**: 일부 사용자에게만 기능을 활성화하여 A/B 테스트 가능

**전자상거래 예시:**
쇼핑 카트에 프로모션 기능을 추가할 때, 개발팀은 기능을 구현하고 모든 환경에 배포하지만 dev/stage에서만 활성화. 비즈니스가 프로모션 시작 준비가 되면 단순한 구성 변경으로 프로덕션에서 활성화.

피처 플래그는 개발자가 소프트웨어에 지원을 내장해야 하며, 환경별 구성 관리와 결합하여 사용된다.

## 예시

```python
# Python 애플리케이션에서의 피처 플래그 사용
import os

FEATURE_NEW_CHECKOUT = os.environ.get('FEATURE_NEW_CHECKOUT', 'false')

def checkout(cart):
    if FEATURE_NEW_CHECKOUT == 'true':
        return new_checkout_flow(cart)
    else:
        return legacy_checkout_flow(cart)
```

```bash
# 환경 변수로 피처 플래그 전달 (Docker)
docker run -d \
  -e FEATURE_NEW_CHECKOUT=true \
  -e FEATURE_PROMOTIONS=false \
  myapp:latest

# 구성 관리에서 환경별 피처 플래그
# staging.yml
feature_new_checkout: true

# production.yml
feature_new_checkout: false
```

## 관련 개념

- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [블루-그린 배포 (Blue-Green Deployment)](/knowledge/linux/blue-green-deployment/)
- [DevOps (데브옵스)](/knowledge/linux/devops/)
