---
title: "페이킹 (Faking)"
description: "실제 구현과 유사하게 동작하지만 프로덕션에는 적합하지 않은 경량 API 구현으로, 테스트 더블 기법 중 가장 선호되는 방식"
tags: ["Software Engineering", "Testing"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/testing/faking
sidebar:
  order: 64
---

## 핵심 개념

Fake는 테스트 더블 기법 중 가장 이상적인 선택이다. 시스템 언더 테스트가 Fake와 실제 구현의 차이를 느끼지 못해야 한다. 대규모 조직에서 Fake를 제공하면 엔지니어링 생산성이 크게 향상된다.

## 동작 원리

**Fake의 충실도(Fidelity)**:
- 실제 구현의 API 계약에 대해 충실해야 한다
- 같은 입력에 대해 같은 출력과 상태 변경을 수행해야 한다
- 완벽한 충실도(예: 디스크 저장)는 필요하지 않다 - 테스트 관점에서의 충실도만 유지하면 된다
- 지원하지 않는 기능에 대해서는 빠르게 실패해야 한다 (오류 발생)

**Fake 작성 시 고려사항**:
- API를 소유한 팀이 Fake를 작성하고 유지보수해야 한다
- Fake에도 자체 테스트가 필요하다 (계약 테스트, contract tests)
- Fake가 없다면: API 소유자에게 요청하거나, API 래퍼를 만들어 자체 Fake를 작성할 수 있다
- 코드 트리의 가장 하위(root)에서만 Fake를 만들어야 한다 (예: DB API 레벨)

## 예시

```java
// 실제 파일 시스템 대신 인메모리 Fake
public class FakeFileSystem implements FileSystem {
    private Map<String, String> files = new HashMap<>();

    @Override
    public void writeFile(String path, String content) {
        files.put(path, content);
    }

    @Override
    public String readFile(String path) {
        return files.get(path);
    }
}
```

계약 테스트 - 동일한 테스트를 실제 구현과 Fake 모두에 실행:
```java
@RunWith(Parameterized.class)
public class FileSystemContractTest {
    @Parameters
    public static Collection<FileSystem> implementations() {
        return Arrays.asList(new RealFileSystem(), new FakeFileSystem());
    }
    // 두 구현 모두에서 동작하는 테스트
}
```

## 관련 개념

- [테스트 더블 (Test Doubles)](/knowledge/software-engineering/testing/test-doubles/)
- [스터빙 (Stubbing)](/knowledge/software-engineering/testing/stubbing/)
- [테스트 충실도 (Test Fidelity)](/knowledge/software-engineering/testing/test-fidelity/)
- [고전파 vs 모의파 테스팅 (Classical vs Mockist Testing)](/knowledge/software-engineering/testing/classical-vs-mockist-testing/)
