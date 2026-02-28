---
title: "Chaos Engineering"
description: "프로덕션 시스템에 의도적으로 장애를 주입하여 취약점을 사전에 발견하고 빠른 복구 능력을 구축하는 엔지니어링 관행 — Netflix의 Chaos Monkey에서 시작"
tags: ["SoftwareEngineering", "Reliability", "Resilience", "Operations", "EffectiveEngineer"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/safety-and-resilience/chaos-engineering
sidebar:
  order: 14
---

## 핵심 개념

카오스 엔지니어링(Chaos Engineering)은 프로덕션 시스템에 의도적으로 장애를 주입하여 취약점을 사전에 발견하고, 빠른 복구 능력을 구축하는 엔지니어링 관행이다. "최대 예상치 못한 장애에 대한 최선의 방어는 자주 실패하는 것"이라는 역설적 원칙에 기반한다.

## 동작 원리

**Netflix의 Chaos Monkey:** 자체 인프라의 서비스를 무작위로 종료하는 시스템. 평일 근무 시간에 실행하여 엔지니어가 사무실에서 아키텍처 약점을 발견하고 수정할 수 있게 함.

**효과:** AWS 대규모 장애 시 Netflix는 최소한의 서비스 중단으로 버텼지만, Airbnb, Reddit, Foursquare, Hootsuite, Quora는 수 시간 다운타임을 겪었음.

**기업들의 장애 대비 전략:**
- **Google DiRT**: 연간 다일간 재해 복구 테스트. 지진, 허리케인 시뮬레이션으로 데이터센터 전원 차단. 단일 장애점, 불안정한 페일오버, 구식 비상 계획 발견
- **Dropbox**: 프로덕션 시스템에 인위적 부하 추가 시뮬레이션. 시스템 한계 조기 발견

**핵심 원칙:**
- 실패를 방지하는 데 투자하는 것은 수확체감의 법칙을 따른다
- 특정 시점부터는 **빠른 복구 능력에 투자하는 것이 더 높은 레버리지**다

**"What if" 질문 습관:**
- 크리티컬 버그가 릴리스에 포함되면? → 롤백 시간 단축 방법은?
- DB 서버가 실패하면? → 페일오버와 데이터 복구 절차는?
- 서버 과부하 시? → 트래픽 스케일업 또는 로드 셰딩은?
- 핵심 팀원이 아프거나 퇴사하면? → 지식 공유 방법은?

## 예시

```python
# Flight Rules (NASA 스타일) — 장애 대응 플레이북
flight_rules = {
    "mysql_master_failure": [
        "1. 슬레이브를 마스터로 승격",
        "2. 애플리케이션 연결 문자열 업데이트",
        "3. 바이너리 로그로 데이터 복구",
        "4. 새 슬레이브 프로비저닝"
    ],
    "traffic_spike": [
        "1. load_shedding.sh 실행",
        "2. scale_up.sh --tier=web --count=10",
        "3. 메트릭 대시보드에서 안정화 확인"
    ],
    "deployment_rollback": [
        "1. deploy rollback --to=last-known-good",
        "2. 에러율 대시보드 확인",
        "3. 포스트모템 일정 잡기"
    ]
}

# 간단한 카오스 테스트 예시
import random
import time

class ChaosMonkey:
    """프로덕션 전 스테이징 환경에서 사용"""

    def random_service_kill(self, services):
        """무작위 서비스 종료"""
        victim = random.choice(services)
        print(f"[CHAOS] Killing service: {victim}")
        victim.stop()
        time.sleep(5)
        # 시스템이 자동으로 복구되는지 확인
        assert system_is_healthy(), "System failed to recover!"
```

## 관련 개념

- [Operational Simplicity](/knowledge/software-engineering/safety-and-resilience/operational-simplicity/)
- [Fail Fast](/knowledge/software-engineering/safety-and-resilience/fail-fast/)
- [Automation](/knowledge/software-engineering/foundations/automation/)
