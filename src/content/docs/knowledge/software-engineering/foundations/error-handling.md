---
title: "Error Handling"
description: "프로그램 실행 중 발생하는 예외적 상황이나 오류를 감지하고 적절히 대응하는 프로그래밍 기법"
tags: ["Software Engineering", "Reliability", "Code Quality"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/error-handling
sidebar:
  order: 11
---

## 핵심 개념

에러 처리(Error Handling)는 프로그램 실행 중 발생하는 예외적 상황이나 오류를 감지하고 적절히 대응하는 프로그래밍 기법이다. "에러를 무시하지 마라"는 가장 기본적인 원칙이다. 무시된 에러는 디버깅이 극히 어려운 버그의 원인이 된다.

## 동작 원리

주요 에러 처리 메커니즘:
1. **반환 값(Return Values)**: C 스타일 errno 패턴. 호출자가 반드시 확인해야 하지만 무시하기 쉽다
2. **예외(Exceptions)**: Java, Python, C++ 스타일. 무시할 수 없지만 제어 흐름을 복잡하게 만들 수 있다
3. **부작용(Side Effects)**: 전역 상태나 콜백을 통한 에러 알림. 추적이 어려워 권장되지 않는다

에러 처리의 핵심 원칙:
- 발생 가능한 모든 에러를 처리해야 한다
- 에러 처리 코드는 정상 경로만큼 중요하다
- 에러는 적절한 수준에서 처리해야 한다 (너무 낮으면 맥락 부족, 너무 높으면 구체성 부족)
- 빈 catch 블록은 절대 사용하지 않는다

## 예시

```python
# 나쁜 에러 처리: 에러 무시
try:
    data = json.loads(response)
except:
    pass  # 절대 이렇게 하지 마라!

# 좋은 에러 처리: 구체적이고 적절한 대응
try:
    data = json.loads(response)
except json.JSONDecodeError as e:
    logger.error(f"Invalid JSON response: {e}")
    raise DataParsingError(f"Failed to parse response: {e}") from e
except TypeError as e:
    logger.error(f"Unexpected response type: {type(response)}")
    raise DataParsingError(f"Response is not a string: {e}") from e
```

## 관련 개념

- [Defensive Programming](/knowledge/software-engineering/foundations/defensive-programming/)
- [Debugging](/knowledge/software-engineering/foundations/debugging/)
- [Log Levels](/knowledge/software-engineering/quality-and-configuration/log-levels/)
