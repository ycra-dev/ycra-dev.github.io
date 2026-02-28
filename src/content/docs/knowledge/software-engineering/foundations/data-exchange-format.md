---
title: "데이터 교환 형식 (Data Exchange Format)"
description: "프로그램이나 시스템 간에 데이터를 주고받을 때 사용하는 표현 방식으로, 이식성을 위해 텍스트 형식을 우선적으로 사용해야 한다"
tags: ["Software-Engineering", "Portability", "Data-Format", "Interoperability"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/data-exchange-format
sidebar:
  order: 119
---

## 핵심 개념

데이터 교환 형식은 프로그램이나 시스템 간에 데이터를 주고받을 때 사용하는 표현 방식으로, 이식성을 위해 텍스트 형식을 우선적으로 사용해야 한다.

## 동작 원리

**텍스트 형식의 장점:**
- **이식성**: 바이트 순서, 정렬, 패딩 문제 없음
- **디버깅 용이**: 사람이 직접 읽고 확인 가능
- **도구 활용**: grep, awk, sed 등으로 처리 가능
- **버전 호환성**: 필드 추가/변경이 상대적으로 쉬움

**바이너리 형식의 문제:**
- 바이트 순서(endianness) 차이
- 구조체 정렬(alignment)과 패딩이 컴파일러/플랫폼마다 다름
- 포인터 크기(32비트 vs 64비트) 차이
- 디버깅이 어려움

**바이너리가 불가피한 경우의 원칙:**
1. 고정된 바이트 순서 사용 (네트워크 바이트 순서 권장)
2. 명시적인 크기 지정 (int32_t, int64_t 등)
3. 정렬과 패딩을 명시적으로 처리
4. 매직 넘버와 버전 필드 포함

## 예시

```c
/* 텍스트 형식으로 데이터 교환 */

// 쓰기: 사람이 읽을 수 있는 형식
void write_record(FILE *f, Record *r) {
    fprintf(f, "%s\t%d\t%.2f\n",
            r->name, r->age, r->score);
}

// 읽기: 텍스트 파싱
int read_record(FILE *f, Record *r) {
    return fscanf(f, "%s\t%d\t%lf\n",
                  r->name, &r->age, &r->score);
}

/* 나쁜 예: 바이너리 직접 쓰기 */
// 이식 불가능 - struct 패딩이 컴파일러마다 다름
fwrite(&record, sizeof(Record), 1, f);

/* JSON - 현대적 텍스트 교환 형식 */
// {"name": "Kim", "age": 30, "score": 95.5}
// → 어떤 언어/플랫폼에서든 파싱 가능

/* CSV - 간단한 테이블 데이터 */
// name,age,score
// Kim,30,95.5
```

## 관련 개념

- [바이트 순서 (Byte Order)](/knowledge/software-engineering/byte-order/) - 바이너리 형식의 주요 이식성 문제
- [이식성 (Portability)](/knowledge/software-engineering/portability/) - 텍스트 형식 선호의 근거
