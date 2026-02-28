---
title: "Diamond Dependency"
description: "두 개 이상의 직접 의존성이 같은 라이브러리의 서로 다른 버전에 의존하는 충돌"
tags: ["Software Engineering", "Dependency Management", "Conflict Resolution"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/diamond-dependency
sidebar:
  order: 26
---

## 핵심 개념

다이아몬드 의존성(Diamond Dependency)은 두 개 이상의 직접 의존성이 같은 라이브러리의 서로 다른 버전에 의존하여 다이아몬드 형태의 의존성 그래프를 만드는 충돌이다. 프로젝트가 동시에 두 버전을 사용할 수 없으므로 빌드 시스템이 하나를 선택한다.

## 동작 원리

```
     프로젝트
    /        \
  util      zookeeper
   |             |
slf4j 1.7.21  slf4j 1.6.1
      \         /
      충돌!
```

해결 방식의 문제:
- SemVer 보장에 따라 높은 버전(1.7.21)으로 통일하지만, 실제 호환이 안 될 수 있음
- Java classpath에서는 같은 클래스의 다른 버전이 존재할 때 `NoSuchMethodError` 등 런타임 에러가 발생
- 빌드는 성공하지만 런타임에 예상치 못한 에러가 발생할 수 있음

## 예시

실제 충돌 시나리오:
```
프로젝트
  ├── util (→ slf4j-api 1.7.21)
  └── zookeeper (→ slf4j-api 1.6.1)
       └── slf4j-log4j12 1.6.1 (slf4j-api 1.6.1에 맞춰 컴파일됨)

Gradle이 slf4j-api를 1.7.21로 통일
zookeeper의 slf4j-log4j12는 여전히 1.6.1 기준
→ 런타임에 NoSuchMethodError 발생 가능
```

해결 방법:
```groovy
// Gradle에서 버전 강제 지정
configurations.all {
    resolutionStrategy {
        force 'org.slf4j:slf4j-api:1.7.30'
        force 'org.slf4j:slf4j-log4j12:1.7.30'
        // 관련 라이브러리를 모두 일치시킴
    }
}
```

```
# 충돌 진단
gradle dependencies | grep slf4j
# 출력:
# +--- org.apache.zookeeper:zookeeper:3.6.3
# |    \--- org.slf4j:slf4j-api:1.6.1 -> 1.7.30 (*)
# (*) 강제 업그레이드됨 표시
```

## 관련 개념

- [Dependency Hell](/knowledge/software-engineering/quality-and-configuration/dependency-hell/)
- [Transitive Dependency](/knowledge/software-engineering/quality-and-configuration/transitive-dependency/)
- [Semantic Versioning](/knowledge/software-engineering/quality-and-configuration/semantic-versioning/)
