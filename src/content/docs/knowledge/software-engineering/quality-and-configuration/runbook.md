---
title: "Runbook"
description: "일반적인 운영 문제를 완화하거나 작업을 수행하기 위한 단계별 지침서"
tags: ["Software Engineering", "Operations", "On-Call", "Documentation"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/runbook
sidebar:
  order: 39
---

## 핵심 개념

런북(Runbook)은 일반적인 운영 문제를 완화하거나 재시작/롤백 등의 작업을 수행하기 위한 사전 정의된 단계별 지침서이다. 온콜 엔지니어의 첫 번째 참조 자료이다. 장애 중 긴장 상태에서도 실수 없이 대응할 수 있게 해준다.

## 동작 원리

런북 위치를 미리 파악해두는 것이 중요하다:
- 서비스별 런북 위치
- 트러블슈팅 가이드
- 대시보드 링크
- 로그 접근 방법
- 에스컬레이션 연락처

이상적으로는 별도 "온콜" 북마크 폴더에 정리한다.

런북의 품질 유지:
- 장애 중 발견한 메트릭/도구/설정의 빈틈을 기록하여 후속 태스크로 추적
- 시스템 변경 시 런북도 함께 업데이트
- SRE가 스크립트 가능한 CLI 도구를 선호 (런북 자동화 가능)

## 예시

서비스 재시작 런북 예시:
```bash
# 런북: 서비스 X 재시작
# 최종 업데이트: 2026-02-27

## 언제 사용?
- 서비스 X의 응답 시간이 SLO를 지속적으로 위반할 때
- 메모리 누수로 OOM이 반복될 때

## 전제 조건
- kubectl 접근 권한 확인
- 최소 2개 파드가 running 상태여야 함 (롤링 재시작)

## 단계

# 1. 현재 상태 확인
kubectl get pods -n prod | grep service-x
# 예상 출력: 모든 파드 Running 1/1

# 2. 최근 로그 확인
kubectl logs -n prod deploy/service-x --tail=100 | grep ERROR

# 3. 롤링 재시작
kubectl rollout restart deployment/service-x -n prod

# 4. 재시작 모니터링
kubectl rollout status deployment/service-x -n prod

# 5. 대시보드에서 에러율 확인
# https://grafana.example.com/d/service-x

# 6. 5분 내 정상화 안 되면 롤백
kubectl rollout undo deployment/service-x -n prod

## 에스컬레이션
재시작 후에도 문제 지속 시: #oncall 채널에서 시니어 온콜 호출
```

런북 자동화:
```bash
# 런북을 스크립트로 자동화
#!/bin/bash
# restart-service-x.sh

echo "Starting service-x restart runbook..."

# 상태 확인
RUNNING=$(kubectl get pods -n prod -l app=service-x --field-selector=status.phase=Running --no-headers | wc -l)
if [ "$RUNNING" -lt 2 ]; then
    echo "ERROR: Not enough pods running (${RUNNING}/2). Aborting."
    exit 1
fi

# 재시작
kubectl rollout restart deployment/service-x -n prod
kubectl rollout status deployment/service-x -n prod --timeout=5m || {
    echo "Rollout failed. Rolling back..."
    kubectl rollout undo deployment/service-x -n prod
    exit 1
}

echo "Service-x restart completed successfully."
```

## 관련 개념

- [Incident Response](/knowledge/software-engineering/quality-and-configuration/incident-response/)
- [Service Level Objective](/knowledge/software-engineering/quality-and-configuration/service-level-objective/)
- [Postmortem](/knowledge/software-engineering/quality-and-configuration/postmortem/)
