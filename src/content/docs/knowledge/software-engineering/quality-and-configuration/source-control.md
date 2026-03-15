---
title: "소스 관리 (Source Control)"
description: "소스 컨트롤은 소프트웨어 프로젝트의 파일 변경 이력을 관리하고 여러 개발자가 동시에 같은 코드에서 작업할 수 있게 해주는 시스템이다."
tags: ["Software Engineering", "Version Control", "Git", "Collaboration"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/source-control
sidebar:
  order: 303
---

## 핵심 개념

소스 컨트롤(버전 관리 시스템)은 현대 소프트웨어 개발의 필수 도구다. 과거에는 네트워크 공유 폴더나 USB 드라이브로 코드를 주고받았는데, 이 방식은 덮어쓰기 사고나 이전 버전 복구 불가 같은 치명적인 문제를 일으켰다.

소스 컨트롤의 핵심 기능:
- **변경 이력 추적**: 프로젝트 파일의 모든 변경 사항을 시간순으로 기록
- **동시 작업 지원**: 여러 개발자가 같은 코드베이스에서 동시에 작업 가능
- **변경 병합(Merge)**: 여러 소스의 변경 사항을 하나로 통합
- **코드 체크인/체크아웃**: 코드를 저장소에 등록하고 가져오는 기본 작업

소스 컨트롤은 단순히 읽기만으로 배울 수 없다. 잘못된 브랜치에 파일을 머지하거나, 잘못된 버전을 체크아웃하는 실수를 직접 경험해봐야 진정한 학습이 된다.

## 동작 원리

1. 중앙 저장소(repository)에 코드의 모든 버전과 변경 이력이 보관된다
2. 개발자는 저장소에서 코드를 체크아웃(checkout)하여 로컬에서 작업한다
3. 변경 후 체크인(commit/push)하면 이력이 저장소에 기록된다
4. 여러 개발자의 변경사항은 머지(merge)를 통해 통합된다
5. 충돌(conflict)이 발생하면 수동으로 해결한다

## 예시

```bash
# 코드 변경 후 스테이징
git add modified_file.py

# 변경 사항 커밋
git commit -m "Fix login validation bug"

# 원격 저장소에 푸시
git push origin main

# 다른 개발자의 변경 사항 가져오기
git pull origin main

# 브랜치 생성 및 병합
git checkout -b feature/new-login
# ... 작업 후 ...
git merge feature/new-login
```

## 관련 개념

- [버전 관리 (Version Control)](/knowledge/software-engineering/quality-and-configuration/version-control/)
- [브랜칭과 병합 (Branching and Merging)](/knowledge/software-engineering/quality-and-configuration/branching-and-merging/)
- [지속적 통합 (Continuous Integration)](/knowledge/software-engineering/quality-and-configuration/continuous-integration/)
