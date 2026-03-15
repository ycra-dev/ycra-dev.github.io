---
title: "Version Control (소스 컨트롤)"
description: "버전 관리는 파일과 소스 코드의 여러 버전을 추적하고, 다수의 개발자가 동일한 코드베이스에서 협업할 수 있도록 관리하는 시스템이다."
tags: ["Software Engineering", "Version Control", "Git", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/version-control
sidebar:
  order: 304
---

## 핵심 개념

버전 관리가 필요한 세 가지 이유:
1. **코드 분실 방지**: 공유 폴더나 USB에 의존하던 시절의 위험 제거
2. **협업 지원**: 여러 개발자가 동시에 같은 파일을 수정하고 변경사항을 병합
3. **다중 버전 관리**: 릴리즈 버전과 개발 버전을 분리하여 관리

핵심 개념:
- **리포지토리**: 코드와 이력이 저장되는 중앙 저장소
- **체크아웃**: 리포지토리에서 로컬로 코드 복사본 가져오기
- **리비전**: 파일의 이전 버전들 (언제든 되돌아갈 수 있는 스냅샷)
- **브랜칭**: 코드 라인을 분기하여 독립적으로 작업
- **머징**: 분기된 변경사항을 다시 통합
- **컨플릭트**: 동일 파일의 같은 부분을 두 개발자가 수정했을 때 발생하는 충돌

## 동작 원리

버전 관리 시스템은 크게 두 종류로 나뉜다:

| 종류 | 예시 | 특징 |
|------|------|------|
| 중앙 집중식 | CVS, Subversion(SVN) | 하나의 중앙 리포지토리, 네트워크 필요 |
| 분산식 | Git, Mercurial | 각 개발자가 전체 리포지토리 복사본 보유, 오프라인 작업 가능 |

현재 Git이 시장을 압도적으로 지배하고 있다.

## 예시

```bash
# Git 기본 워크플로우
git clone https://github.com/user/repo.git  # 코드 체크아웃
git checkout -b feature-login               # 브랜치 생성
# ... 코드 수정 ...
git add .                                    # 변경 사항 스테이징
git commit -m "Add login feature"            # 커밋 (리비전 생성)
git push origin feature-login                # 원격에 푸시
git merge main                               # 메인 브랜치 병합

# 리비전 확인
git log --oneline   # 변경 이력 확인
git diff HEAD~1     # 이전 버전과 비교
```

## 관련 개념

- [소스 관리 (Source Control)](/knowledge/software-engineering/quality-and-configuration/source-control/)
- [브랜칭과 병합 (Branching and Merging)](/knowledge/software-engineering/quality-and-configuration/branching-and-merging/)
- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
