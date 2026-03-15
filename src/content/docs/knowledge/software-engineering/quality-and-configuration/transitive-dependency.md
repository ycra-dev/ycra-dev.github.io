---
title: "이행적 의존성 (Transitive Dependency)"
description: "직접 의존하지 않지만 직접 의존성이 의존하는 라이브러리"
tags: ["Software Engineering", "Dependency Management", "Build Systems"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/transitive-dependency
sidebar:
  order: 24
---

## 핵심 개념

전이적 의존성(Transitive Dependency)은 직접 의존하지 않지만 직접 의존성이 의존하는 라이브러리이다. A → B → C에서 C는 A의 전이적 의존성이다. 단 하나의 의존성 추가가 수십~수백 개의 전이적 의존성을 끌어올 수 있다.

## 동작 원리

주의사항:
- **직접 사용 금지**: 전이적 의존성의 클래스/메서드를 코드에서 직접 사용하지 말 것. 라이브러리가 내부 의존성을 교체하면 코드가 깨진다
- **의존성 트리 확인**: `gradle dependencies`, `pip show`, `npm ls`로 전체 의존성 트리 파악
- **보안 취약점 주의**: 전이적 의존성에 취약점이 있어도 업데이트가 필요할 수 있다

확인 명령어:
```bash
# Java/Gradle
gradle dependencies

# Python
pip show requests  # requires와 required-by 확인

# Node.js
npm ls --depth=3

# Rust
cargo tree
```

## 예시

`httpclient` 하나를 추가했을 때의 전이적 의존성:

```
httpclient:4.5.13
  ├── httpcore:4.4.15
  │     ├── commons-codec:1.11
  │     └── commons-logging:1.2
  └── commons-lang3:3.12.0
```

프로젝트가 `commons-codec`의 메서드를 직접 사용하면 위험하다:
```java
// Bad: 전이적 의존성 직접 사용
import org.apache.commons.codec.binary.Base64;
// httpclient가 내부에서 commons-codec을 없애면 이 코드가 깨짐!

String encoded = Base64.encodeBase64String(data);
```

```java
// Good: 직접 의존성으로 명시적 추가
// build.gradle
dependencies {
    implementation 'org.apache.commons:commons-codec:1.15'  // 명시적
    implementation 'org.apache.http.client:httpclient:4.5.13'
}
```

## 관련 개념

- [의존성 지옥 (Dependency Hell)](/knowledge/software-engineering/quality-and-configuration/dependency-hell/)
- [다이아몬드 의존성 (Diamond Dependency)](/knowledge/software-engineering/quality-and-configuration/diamond-dependency/)
- [버전 고정 (Version Pinning)](/knowledge/software-engineering/quality-and-configuration/version-pinning/)
