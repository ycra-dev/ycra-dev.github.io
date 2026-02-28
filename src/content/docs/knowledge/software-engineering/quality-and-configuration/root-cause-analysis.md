---
title: "Root-Cause Analysis"
description: "장애의 근본 원인을 찾기 위해 왜를 반복적으로 묻는 분석 기법"
tags: ["Software Engineering", "Debugging", "Incident Management"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/root-cause-analysis
sidebar:
  order: 37
---

## 핵심 개념

근본 원인 분석(Root-Cause Analysis, RCA)은 장애의 근본 원인을 찾기 위해 "왜?"를 반복적으로 (보통 5회) 묻는 분석 기법이다. Five Whys라고도 한다. 표면적인 증상에서 출발하여 진짜 원인까지 파고든다.

## 동작 원리

Five Whys 방법:
- 문제에서 시작하여 "왜?"를 계속 물어 근본 원인까지 도달
- "5"는 경험적 숫자 — 대부분 5번 정도면 도달
- 실제로는 단일 원인이 아닌 여러 원인이 복합적으로 작용

트러블슈팅 시 과학적 방법 적용:
1. 증상 관찰
2. 가설 수립
3. 실험으로 검증
4. 성공 시 치료, 실패 시 재가설

이진 탐색(Half-Splitting): 대규모 시스템에서 효율적 탐색 — 콜스택 중간 지점에서 업스트림/다운스트림 확인.

## 예시

데이터 웨어하우스 장애의 Five Whys:
```
1. 왜? → 커넥터가 데이터 로드를 안 함
2. 왜? → 메시지 역직렬화 불가
3. 왜? → 메시지에 잘못된 헤더가 존재
4. 왜? → APM(모니터링 도구)이 헤더를 자동 주입
5. 왜? → APM 기본 설정이 개발자 모르게 활성화됨 ← 근본 원인

시정 조치:
- APM 설정 변경 시 코드 리뷰 필수화
- 데이터 파이프라인 통합 테스트에 헤더 검증 추가
```

가설 기반 트러블슈팅:
```
증상: API 응답 시간이 갑자기 5배 느려짐

가설 1: DB 부하 증가
  실험: DB 모니터링 대시보드 확인
  결과: DB 쿼리 시간 정상 → 가설 기각

가설 2: 특정 엔드포인트만 느림
  실험: 분산 트레이스 확인
  결과: /search 엔드포인트만 느림 → 가설 지지

가설 3: 검색 인덱스 이슈
  실험: Elasticsearch 클러스터 상태 확인
  결과: 샤드 재균형 중 → 근본 원인 발견!
```

## 관련 개념

- [Incident Response](/knowledge/software-engineering/quality-and-configuration/incident-response/)
- [Postmortem](/knowledge/software-engineering/quality-and-configuration/postmortem/)
- [Debugging](/knowledge/software-engineering/foundations/debugging/)
