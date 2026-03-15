---
title: "블루-그린 배포 (Blue-Green Deployment)"
description: "블루-그린 배포(Blue-Green Deployment)는 서비스 중단 없이 소프트웨어를 업데이트하는 무중단 배포 기법으로, 대기 시스템(standby)에 새 소프트웨어를 준비한 후 트래픽을 전환하는 방식이다"
tags: ['Blue Green', 'Deployment', 'Zero Downtime', 'Rolling', 'Canary', 'Release']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/blue-green-deployment
sidebar:
  order: 14
---

## 핵심 개념

서비스 중단이 허용 불가능한 환경(의료, 정부, 고볼륨 전자상거래, 금융)에서 라이브 소프트웨어를 서비스 중단 없이 업데이트하는 것은 배포의 이상(Xanadu)이다.

**블루-그린 배포 프로세스:**
1. 대기(standby) 시스템에 새 소프트웨어 설치
2. 대기 시스템에서 테스트 실행하여 기능 확인
3. 테스트 완료 후 라이브 시스템에서 대기 시스템으로 트래픽 전환
4. 이전 라이브 시스템의 모든 트랜잭션 완료 후 배포 완료

로드 밸런서를 통해 트래픽을 프록시하는 환경에서 특히 효과적이다. 대기 시스템을 로드 밸런서에 추가하고 이전 시스템을 제거하면 된다.

**롤링 배포(Rolling Deployment):** 기존 시스템을 한 대씩 순차적으로 업데이트. 각 시스템을 로드 밸런서에서 제거, 업데이트 후 다시 추가. 두 버전이 동시 실행되므로 호환성 문제 발생 가능.

**카나리 배포(Canary):** 소수의 시스템이나 소량의 트래픽에만 새 릴리스를 먼저 배포. 문제 발생 시 소수 사용자만 영향. 정밀한 텔레메트리와 모니터링이 필수.

이 세 가지 전략은 결합하여 사용할 수 있다. 예를 들어, 블루-그린과 카나리를 결합하면 새 시스템 중 소수에만 먼저 트래픽을 보내 검증한 후 전체 전환한다.

## 예시

```bash
# 블루-그린 배포 개념 (로드 밸런서 구성 변경)
# 1. 그린(새 버전) 서버 준비
terraform apply -var "image_id=$NEW_IMAGE"

# 2. 헬스 체크 통과 확인
curl -f http://green-server:8000/healthy

# 3. 로드 밸런서에서 블루→그린 전환
# (로드 밸런서 API를 통해 백엔드 서버 변경)

# 4. 이전 블루 서버 종료
terraform destroy -target=blue-servers
```

```yaml
# Kubernetes에서 롤링 업데이트
apiVersion: apps/v1
kind: Deployment
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

## 관련 개념

- [지속적 전달 (Continuous Delivery)](/knowledge/linux/continuous-delivery/)
- [CI/CD 파이프라인 (CI/CD Pipeline)](/knowledge/linux/cicd-pipeline/)
- [Terraform (테라폼)](/knowledge/linux/terraform/)
- [컨테이너 오케스트레이션 (Container Orchestration)](/knowledge/linux/container-orchestration/)
