---
title: "코드로서의 설정 (Configuration as Code)"
description: "설정을 코드와 동일한 엄격함으로 관리하는 철학"
tags: ["Software Engineering", "DevOps", "Operations"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/configuration-as-code
sidebar:
  order: 22
---

## 핵심 개념

코드로서의 설정(Configuration as Code)은 설정을 코드와 동일한 엄격함 — 버전 관리, 리뷰, 테스트, 빌드, 배포 — 으로 관리하는 철학이다. 설정 실수는 재앙적이다 — 잘못된 정수 하나가 프로덕션 서비스를 중단시킬 수 있다.

## 동작 원리

관리 원칙:
- **Git**으로 설정 변경 이력 관리
- 코드 리뷰처럼 **설정 변경도 리뷰**
- CI에서 **형식, 타입, 값 범위 자동 검증**
- 배포된 머신에서 직접 설정 편집 **절대 금지** (다음 배포 시 덮어씌워짐)

정적 설정 vs 동적 설정:
- **정적 설정 우선**: 서비스 재시작으로 적용, 단순하고 안전
- **동적 설정**: 런타임에 변경 가능하지만 복잡성 높음 — 모든 가능한 영향을 고려해야 함

## 예시

```yaml
# config/production.yaml - Git으로 관리
server:
  port: 8080
  timeout_ms: 30000  # CI에서 범위 검증: 1000 <= x <= 120000
  max_connections: 500

database:
  host: "db.prod.internal"
  pool_size: 20
  connection_timeout_ms: 5000
```

CI 검증 워크플로우:
```yaml
# .github/workflows/validate-config.yml
validate_config:
  steps:
    - name: Syntax check
      run: python -c "import yaml; yaml.safe_load(open('config/production.yaml'))"

    - name: Schema validation
      run: python validate_config.py config/production.yaml

    - name: Value range check
      run: |
        timeout=$(python -c "import yaml; c=yaml.safe_load(open('config/production.yaml')); print(c['server']['timeout_ms'])")
        [ "$timeout" -ge 1000 ] && [ "$timeout" -le 120000 ] || exit 1

    - name: No secrets check
      run: grep -rE "(password|api_key|secret)" config/ && exit 1 || exit 0
```

설정 변경 프로세스:
```
1. YAML 파일을 Git 브랜치에서 수정
2. PR로 변경 제출
3. CI가 자동 검증 수행 (문법, 타입, 범위, 보안)
4. 팀원 코드 리뷰 후 머지
5. 배포 파이프라인이 프로덕션에 자동 적용
```

## 관련 개념

- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
- [방어적 프로그래밍 (Defensive Programming)](/knowledge/software-engineering/foundations/defensive-programming/)
- [버전 관리 (Version Management)](/knowledge/software-engineering/quality-and-configuration/version-management/)
