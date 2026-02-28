---
title: "JavaScript"
description: "웹 브라우저에서 실행되는 프로그래밍 언어로, HTML/CSS와 함께 웹의 3대 핵심 기술 중 하나이며 Node.js를 통해 서버 측에서도 사용된다"
tags: ["Software-Engineering", "JavaScript", "Web", "Programming-Language"]
created: 2026-02-25
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/javascript
sidebar:
  order: 100
---

## 핵심 개념

JavaScript는 웹 브라우저에서 실행되는 프로그래밍 언어로, 웹 페이지에 동적 기능과 상호작용을 부여한다. 변수, 반복문, 조건문, 함수 등 기본 프로그래밍 개념을 모두 지원하며, Node.js를 통해 서버 측에서도 사용된다.

웹은 세 가지 핵심 기술로 구성된다:

- **HTML**: 웹 페이지의 구조(내용)를 정의
- **CSS**: 웹 페이지의 시각적 표현(스타일)을 정의
- **JavaScript**: 웹 페이지의 동작(행동)을 정의

## 동작 원리

JavaScript는 브라우저에 내장된 엔진(Chrome의 V8, Firefox의 SpiderMonkey 등)에 의해 실행된다. 이 엔진은 인터프리터와 JIT(Just-In-Time) 컴파일러를 결합하여, 코드를 실행하면서 자주 사용되는 부분을 기계어로 컴파일해 성능을 높인다.

**핵심 프로그래밍 개념:**

- **변수(Variable)**: 데이터를 저장하는 이름 붙은 공간. `let count = 0;`
- **조건문(Conditional)**: 조건에 따라 다른 코드를 실행. `if/else`
- **반복문(Loop)**: 코드를 반복 실행. `for`, `while`
- **함수(Function)**: 재사용 가능한 코드 블록
- **이벤트(Event)**: 사용자의 클릭, 키 입력 등에 반응하는 메커니즘

**Node.js와 서버 측 JavaScript:**
2009년 Node.js의 등장으로 브라우저 밖에서도 JavaScript가 실행 가능해졌다. 이로써 하나의 언어로 프론트엔드와 백엔드를 모두 개발할 수 있게 되었다.

**보안 고려사항:**
브라우저에서 실행되는 JavaScript는 샌드박스(sandbox) 환경에서 동작하여 파일 시스템에 직접 접근하거나 다른 탭의 데이터를 읽을 수 없도록 제한된다.

## 예시

```javascript
// 변수와 함수
let name = "World";
let count = 0;

function greet(who) {
    return "Hello, " + who + "!";
}

// 조건문
if (count > 10) {
    console.log("많이 셌습니다");
} else {
    console.log("아직 더 세세요");
}

// 반복문
for (let i = 1; i <= 5; i++) {
    console.log(i + "번째 반복");
}

console.log(greet(name));  // "Hello, World!"
```

```html
<!-- 웹 페이지에서의 동적 기능 -->
<button id="btn">클릭하세요</button>
<p id="output"></p>

<script>
let count = 0;
document.getElementById("btn").addEventListener("click", function() {
    count++;
    document.getElementById("output").textContent =
        count + "번 클릭했습니다";
});
</script>
```

```
HTML (구조):       "여기에 버튼이 있다"
CSS (스타일):      "버튼은 파란색이고 둥글다"
JavaScript (동작): "버튼을 클릭하면 카운터가 증가한다"
```

## 관련 개념

- [인터프리터 (Interpreter)](/knowledge/language/interpreter-basics/) - JavaScript는 인터프리터/JIT 방식으로 실행된다
- [API](/knowledge/software-engineering/api-basics/) - 브라우저 API와 웹 API를 JavaScript로 호출한다
- [오픈 소스 소프트웨어 (Open Source Software)](/knowledge/software-engineering/open-source-software/) - V8, SpiderMonkey 등 JavaScript 엔진은 오픈 소스이다
