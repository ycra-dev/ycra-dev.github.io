---
title: "DOM (Document Object Model)"
description: "DOM은 웹 브라우저 내에서 웹 페이지의 구조를 트리 형태로 표현한 것으로, JavaScript를 통해 HTML과 CSS를 동적으로 조작할 수 있게 하는 프로그래밍 인터페이스다."
tags: ["Software Engineering", "DOM", "Web Development", "JavaScript"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/systems-and-services/dom
sidebar:
  order: 16
---

## 핵심 개념

DOM은 HTML 문서를 브라우저가 파싱한 후 생성하는 **트리 구조의 객체 모델**이다. JavaScript는 이 DOM을 통해 웹 페이지의 콘텐츠, 구조, 스타일을 동적으로 추가, 제거, 변경할 수 있다.

직접 새로운 HTML이나 CSS 코드를 생성하지 않아도 DOM을 조작하여 브라우저에 표시되는 UI를 변경할 수 있다. 이것이 **현대 웹 개발의 핵심**이며, SPA(Single Page Application)의 기반이 된다.

Angular, React, Vue 같은 모던 JavaScript 프레임워크들은 모두 DOM 조작을 추상화하여 더 효율적으로 UI를 관리한다.

## 동작 원리

```
HTML 문서
├── <html>
│   ├── <head>
│   │   └── <title>페이지 제목</title>
│   └── <body>
│       ├── <h1 id="main-title">제목</h1>
│       └── <p>본문</p>
```

브라우저가 HTML을 파싱하면 이런 트리 구조가 메모리에 만들어지고, JavaScript가 이 트리를 탐색하고 수정할 수 있다.

## 예시

```javascript
// DOM 조작 예시
// 요소 선택
const title = document.getElementById('main-title');

// 콘텐츠 변경
title.textContent = '새로운 제목';

// 스타일 변경
title.style.color = 'blue';

// 새 요소 추가
const newParagraph = document.createElement('p');
newParagraph.textContent = '동적으로 추가된 단락';
document.body.appendChild(newParagraph);

// 요소 제거
const oldElement = document.getElementById('remove-me');
oldElement.remove();
```

## 관련 개념

- [HTTP Protocol](/knowledge/software-engineering/systems-and-services/http-protocol/)
- [Single Page Application](/knowledge/software-engineering/systems-and-services/single-page-application/)
- [Server-Side vs Client-Side Rendering](/knowledge/software-engineering/systems-and-services/server-side-vs-client-side-rendering/)
