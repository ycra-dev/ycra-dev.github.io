---
title: "마르코프 체인 (Markov Chain)"
description: "현재 상태만으로 다음 상태의 확률이 결정되는 통계적 모델로, 텍스트 생성에서 직전 N개의 단어를 상태로 삼고 다음 단어를 확률적으로 선택한다"
tags: ["Algorithms", "Probability", "Text-Generation", "State-Machine"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/markov-chain
sidebar:
  order: 100
---

## 핵심 개념

마르코프 체인은 현재 상태만으로 다음 상태의 확률이 결정되는 통계적 모델이다. 텍스트 생성에서는 직전 N개의 단어(접두사, prefix)를 상태로 삼고, 원문에서 그 접두사 뒤에 나타난 단어(접미사, suffix) 중 하나를 무작위로 선택하여 새 텍스트를 만든다.

## 동작 원리

**알고리즘 (접두사 길이 = 2):**
1. 입력 텍스트를 읽으며 모든 2-단어 접두사와 그 뒤에 오는 접미사를 기록한다.
2. 임의의 접두사에서 시작한다.
3. 해당 접두사에 대응하는 접미사 목록에서 하나를 무작위로 선택하여 출력한다.
4. 접두사를 한 단어씩 밀어서 갱신한다 (첫 단어 제거, 선택한 접미사 추가).
5. 종료 조건을 만날 때까지 반복한다.

**결과의 특성**: 생성된 텍스트는 원문의 통계적 특성을 반영하여, 얼핏 보면 그럴듯하지만 의미적으로는 무작위이다. 접두사 길이가 길수록 원문에 가까워지고, 짧을수록 무작위성이 증가한다.

이 알고리즘의 교육적 가치: 동일한 알고리즘을 C, C++, Java, Awk, Perl 다섯 가지 언어로 구현하여 언어 간 트레이드오프를 직접 비교할 수 있다.

## 예시

```
입력: "show your horse a horse show"

접두사 → 접미사 목록:
"show your" → [horse]
"your horse" → [a]
"horse a"   → [horse]
"a horse"   → [show]
"horse show" → [END]

생성 과정 (시작: "show your"):
  "show your" → horse 선택 → 출력: "show your horse"
  "your horse" → a 선택 → 출력: "show your horse a"
  "horse a" → horse 선택 → 출력: "show your horse a horse"
  "a horse" → show 선택 → 출력: "show your horse a horse show"
  "horse show" → END → 종료
```

```c
// 핵심 자료구조 (C)
typedef struct State State;
typedef struct Suffix Suffix;

struct State {
    char *pref[NPREF];  // 접두사 단어 배열
    Suffix *suf;         // 접미사 연결 리스트
    State *next;         // 해시 체이닝
};

struct Suffix {
    char *word;
    Suffix *next;
};
```

## 관련 개념

- [자료구조 설계 (Data Structure Design)](/knowledge/software-engineering/data-structure-design/) - 마르코프 체인의 자료구조 설계 과정
- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/) - 접두사 → 접미사 매핑에 해시 테이블 사용
- [프로그래밍 언어 비교 (Language Comparison)](/knowledge/software-engineering/language-comparison/) - 동일 알고리즘의 다중 언어 구현
