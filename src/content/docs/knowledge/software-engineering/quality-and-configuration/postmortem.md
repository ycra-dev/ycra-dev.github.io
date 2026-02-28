---
title: "Postmortem"
description: "장애 후 무엇이 발생했고, 무엇을 배웠으며, 재발 방지를 위해 무엇을 해야 하는지 기록하는 문서"
tags: ["Software Engineering", "Incident Management", "Learning", "Process"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/postmortem
sidebar:
  order: 38
---

## 핵심 개념

포스트모템(Postmortem)은 장애 후 무엇이 발생했고, 무엇을 배웠으며, 재발 방지를 위해 무엇을 해야 하는지 기록하는 문서이다. Retrospective라고도 한다. 핵심 원칙: **개인/팀 비난 금지 — 시스템과 프로세스 개선에 집중한다.**

## 동작 원리

문서 구조:
- 경위 (Lead-up)
- 장애 내용 (Fault)
- 영향 범위 (Impact)
- 감지 방법 (Detection)
- 대응 과정 (Response)
- 복구 방법 (Recovery)
- 타임라인 (Timeline)
- 근본 원인 (Root Causes)
- 교훈 (Lessons Learned)
- 시정 조치 (Corrective Actions)

진행 방식:
- 온콜 엔지니어가 초안 작성
- 리뷰 미팅에서 관련자 전원이 토론
- 모든 후속 태스크가 완료될 때까지 인시던트 미종료

**해결 논의(Solutioning)는 별도 분리**: 미팅은 문제 파악과 태스크 할당에 집중.

## 예시

비난 없는(Blameless) 포스트모템 언어:
```
❌ "Peter가 잘못된 설정으로 배포했다"
   → 개인 비난, 방어적 반응 유발

✓ "설정 변경이 코드 리뷰 프로세스를 거치지 않고
   직접 프로덕션에 적용될 수 있는 구조였다"
   → 시스템 문제로 프레이밍, 개선 방향 명확
```

시정 조치 예시:
```markdown
## Corrective Actions

| 액션 | 담당자 | 기한 | 상태 |
|------|--------|------|------|
| 설정 변경 시 PR 필수화 | DevOps팀 | 2026-03-06 | 진행 중 |
| 데이터 파이프라인 통합 테스트 추가 | 데이터팀 | 2026-03-13 | 미시작 |
| APM 설정 변경 알림 구성 | SRE팀 | 2026-03-10 | 완료 |
| 런북 업데이트 | 온콜팀 | 2026-03-08 | 완료 |
```

학습 자료: Dan Luu의 공개 포스트모템 컬렉션 (github.com/danluu/post-mortems)

## 관련 개념

- [Incident Response](/knowledge/software-engineering/quality-and-configuration/incident-response/)
- [Root-Cause Analysis](/knowledge/software-engineering/quality-and-configuration/root-cause-analysis/)
- [Sprint Retrospective](/knowledge/software-engineering/agile-methods/sprint-retrospective/)
- [Blameless Postmortem](/knowledge/software-engineering/agile-methods/blameless-postmortem/)
