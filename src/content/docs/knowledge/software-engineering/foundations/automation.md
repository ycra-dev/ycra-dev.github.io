---
title: "Automation"
description: "반복적인 수동 작업을 스크립트나 시스템으로 대체하여 엔지니어의 시간을 해방하고 운영 부담을 줄이는 고-레버리지 활동 — 기계적 자동화를 먼저, 의사결정 자동화는 신중하게"
tags: ["SoftwareEngineering", "DevOps", "Operations", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/automation
sidebar:
  order: 121
---

## 핵심 개념

자동화(Automation)는 반복적인 수동 작업을 스크립트나 시스템으로 대체하여 엔지니어의 시간을 해방하고 운영 부담을 줄이는 고-레버리지 활동이다. 새벽 3시에 호출되어 기계가 대신 할 수 있는 5개의 명령어를 실행하는 것은 시간 낭비의 전형이다.

## 동작 원리

**자동화를 미루는 이유:**
1. 지금 시간이 없음 (마감 압박)
2. **공유지의 비극**: 수동 작업이 여러 명에게 분산되어 개인 인센티브 부족
3. 자동화 도구에 대한 미숙함
4. 미래 빈도를 과소추정
5. 장기 시간 절약을 내면화하지 못함

**핵심 구분 (Bobby Johnson, 전 Facebook):**

**기계적 자동화 vs 의사결정 자동화:**
- **기계적 자동화**: 단순하고 테스트 가능. "샤드를 서버 A에서 서버 B로 이동" → 즉시 자동화 가능
- **의사결정 자동화**: 훨씬 어렵고 위험. "어떤 샤드를 어디로 이동할지" → 비정상 상황에서 폭주 가능

**의사결정 자동화의 위험:** 서버 하나 실패 시 트래픽 재분배는 잘 작동하지만, 절반이 실패하면 나머지 절반에 과부하 → 전체 클러스터 다운. **최악의 장애는 자동 복구 시스템에서 발생**한다.

**규칙:** 기계적 자동화를 먼저 모두 해결한 후, 의사결정 자동화에 도전하라.

**자동화할 수 있는 영역:**
코드 검증, 데이터 ETL, 에러율 감지, 소프트웨어 빌드/배포, DB 스냅샷, 배치 계산, 웹 서비스 재시작, 스타일 가이드 검사, ML 모델 학습, 사용자 계정 관리, 서버 증감

## 예시

```bash
#!/bin/bash
# move_shard.sh - 기계적 자동화 예시
# 의사결정(어떤 샤드를 어디로)은 사람이, 실행은 기계가

SOURCE=$1
TARGET=$2
SHARD_ID=$3

echo "Stopping writes to shard $SHARD_ID..."
disable_writes "$SOURCE" "$SHARD_ID"

echo "Copying data..."
replicate_shard "$SOURCE" "$TARGET" "$SHARD_ID"

echo "Verifying..."
verify_shard "$TARGET" "$SHARD_ID"

echo "Switching reads..."
update_routing "$SHARD_ID" "$TARGET"

echo "Done!"

# 사용: 의사결정은 사람이, 실행은 기계가
# "shard 42를 server-a에서 server-b로 이동" (사람 판단)
# ./move_shard.sh server-a server-b 42 (기계 실행)
```

```python
# 의사결정 자동화의 위험 예시
class AutoFailover:
    def handle_server_failure(self, failed_server):
        # 1개 서버 실패 → 트래픽을 나머지로 재분배 → 정상 작동
        # BUT: 10개 중 5개 서버가 동시 실패하면?
        # → 나머지 5개에 2배 트래픽 → 나머지도 과부하로 실패
        # → 전체 클러스터 다운 (cascade failure)
        redistribute_traffic(failed_server)  # 위험!
```

## 관련 개념

- [Operational Simplicity](/knowledge/software-engineering/safety-and-resilience/operational-simplicity/)
- [Fail Fast](/knowledge/software-engineering/safety-and-resilience/fail-fast/)
- [Chaos Engineering](/knowledge/software-engineering/safety-and-resilience/chaos-engineering/)
