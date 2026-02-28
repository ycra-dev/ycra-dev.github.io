---
title: "CSV 파서 사례 연구 (CSV Parser Case Study)"
description: "쉼표로 구분된 데이터를 파싱하는 라이브러리의 설계 과정을 통해 인터페이스 설계 원칙을 보여주는 사례 연구"
tags: ["Software-Engineering", "Parsing", "Interface", "Case-Study"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/csv-parser
sidebar:
  order: 110
---

## 핵심 개념

CSV(Comma-Separated Values) 파서는 쉼표로 구분된 데이터를 파싱하는 라이브러리의 설계 과정을 통해 인터페이스 설계 원칙을 구체적으로 보여주는 사례 연구이다.

CSV는 단순해 보이지만 실제로는 많은 엣지 케이스가 있다. 좋은 인터페이스는 한 번에 나오지 않으며, 프로토타입에서 시작해 사용 경험을 바탕으로 개선해야 한다.

## 동작 원리

**엣지 케이스들:**
- 필드가 쉼표를 포함할 수 있다 → 따옴표로 감싼다: `"Seoul, Korea"`
- 필드가 따옴표를 포함할 수 있다 → 이중 따옴표: `"He said ""hello"""`
- 필드가 줄바꿈을 포함할 수 있다 → 따옴표 안의 줄바꿈
- 빈 필드: `a,,b`는 세 개의 필드 (중간이 빈 문자열)

**진화 과정:**

1. **프로토타입 (Quick hack)**: 전역 변수, 고정 크기 버퍼, 최소한의 에러 처리. "일단 동작하게" 만든다.

2. **C 라이브러리 버전**: 동적 메모리 할당, `static` 변수로 상태 은닉, 깨끗한 3-함수 인터페이스 (`csvgetline`, `csvfield`, `csvnfield`).

3. **C++ 클래스 버전**: 클래스로 상태 캡슐화, 여러 CSV 파일을 동시에 처리 가능.

## 예시

```c
/* 최종 C 인터페이스 - 단 3개의 함수 */
#include "csv.h"

FILE *fin = fopen("data.csv", "r");
char *line;

while ((line = csvgetline(fin)) != NULL) {
    printf("line = '%s'\n", line);
    for (int i = 0; i < csvnfield(); i++)
        printf("field[%d] = '%s'\n", i, csvfield(i));
}
```

```cpp
// C++ 버전 - 객체로 상태 캡슐화
Csv csv(cin);
string line;

while (csv.getline(line) != 0) {
    cout << "line = '" << line << "'" << endl;
    for (int i = 0; i < csv.getnfield(); i++)
        cout << "field[" << i << "] = '"
             << csv.getfield(i) << "'" << endl;
}
```

```
파싱 엣지 케이스:
입력: one,two,"three,four","say ""hello"""
결과: [one] [two] [three,four] [say "hello"]
```

## 관련 개념

- [인터페이스 설계 원칙 (Interface Design Principles)](/knowledge/software-engineering/interface-design/) - 이 사례의 핵심 교훈
- [정보 은닉 (Information Hiding)](/knowledge/software-engineering/information-hiding/) - static 변수로 내부 상태를 숨기는 방법
- [경계값 테스팅 (Boundary Testing)](/knowledge/software-engineering/boundary-testing/) - CSV 파서의 엣지 케이스 테스트
