---
title: "지속적 전달 (Continuous Delivery)"
description: "패키징, 테스팅, 릴리스, 배포를 모두 자동화하여 인간의 개입 없이 소프트웨어를 전달하는 자동화"
tags: ["Software Engineering", "DevOps", "Automation", "Deployment"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/continuous-delivery
sidebar:
  order: 34
---

## 핵심 개념

지속적 전달(Continuous Delivery, CD)은 패키징, 테스팅, 릴리스, 배포, 롤아웃을 모두 자동화하여 사람의 개입 없이 소프트웨어를 전달하는 고도화된 자동화이다. CI(Continuous Integration)의 자연스러운 확장이다. **자주 릴리스할수록 각 릴리스의 위험이 줄고, 버그 디버깅이 쉬워진다.**

## 동작 원리

소프트웨어 전달 4단계:
1. **Build**: 코드를 실행 가능한 형태로 패키징
2. **Release**: 배포 가능한 아티팩트를 릴리스 저장소에 저장
3. **Deploy**: 실행 환경에 설치 및 구성
4. **Rollout**: 사용자가 새 버전에 접근하도록 트래픽 전환

배포 자동화 원칙:
- **스크립트화**: 모든 수동 단계를 스크립트로 대체
- **원자적 배포**: all-or-nothing으로 부분 성공 없음
- **독립적 배포**: 서비스 간 배포 순서 의존성 제거

Continuous Delivery vs Continuous Deployment:
- **Delivery**: 자동화되지만 최종 배포는 사람이 승인
- **Deployment**: 승인 없이 완전 자동 배포

## 예시

전체 CD 파이프라인:
```
git push main
  ↓
CI: 린트 + 단위 테스트 (5분)
  ↓
빌드: Docker 이미지 생성
  ↓
릴리스: 이미지를 레지스트리에 저장
  ↓
스테이징 자동 배포 + 통합 테스트
  ↓
[승인 (Continuous Delivery)] 또는 [자동 진행 (Continuous Deployment)]
  ↓
카나리 배포: 1% 트래픽
  ↓
모니터링: 에러율, 응답시간 자동 확인
  ↓
점진적 확대: 5% → 25% → 100%
  ↓
완료! (코드 push부터 전체 배포까지 ~30분)
```

Terraform + GitHub Actions 예시:
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  deploy:
    steps:
      - name: Build
        run: docker build -t my-app:$GITHUB_SHA .

      - name: Test
        run: docker run my-app:$GITHUB_SHA pytest

      - name: Push to Registry
        run: docker push my-app:$GITHUB_SHA

      - name: Deploy to Staging
        run: terraform apply -var="image_tag=$GITHUB_SHA"

      - name: Smoke Test
        run: ./scripts/smoke-test.sh staging.example.com

      - name: Deploy to Production (Canary)
        run: kubectl set image deployment/my-app app=my-app:$GITHUB_SHA
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [트렁크 기반 개발 (Trunk-Based Development)](/knowledge/software-engineering/quality-and-configuration/trunk-based-development/)
- [기능 플래그 (Feature Flag)](/knowledge/software-engineering/quality-and-configuration/feature-flag/)
- [카나리 배포 (Canary Deployment)](/knowledge/software-engineering/quality-and-configuration/canary-deployment/)
