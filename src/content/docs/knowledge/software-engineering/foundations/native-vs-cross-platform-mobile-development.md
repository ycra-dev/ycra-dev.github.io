---
title: "네이티브 vs 크로스 플랫폼 모바일 개발"
description: "네이티브 개발은 특정 모바일 플랫폼의 공식 도구와 언어를 사용하고, 크로스 플랫폼 개발은 하나의 코드베이스로 여러 플랫폼에서 동작하는 앱을 만든다."
tags: ["Software Engineering", "Mobile Development", "Native", "Cross-Platform"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/native-vs-cross-platform-mobile-development
sidebar:
  order: 39
---

## 핵심 개념

| 방식 | 예시 | 장점 | 단점 |
|------|------|------|------|
| 네이티브 | Swift(iOS), Java(Android) | 최고 성능, 완전한 API 접근 | 플랫폼별 별도 개발 |
| 크로스플랫폼(네이티브) | Xamarin, React Native | 코드 공유 + 네이티브 성능 | 학습 곡선 |
| 하이브리드 | Cordova, Ionic | 웹 기술 활용, 높은 코드 재사용 | 성능 제한 |
| 모바일 웹 | PWA | 설치 불필요, 완전한 크로스플랫폼 | 기능 제한 |

네이티브 방식에서 iOS는 Swift(또는 Objective-C)와 Xcode를, Android는 Java(또는 Kotlin)와 Android Studio를 사용한다.

## 동작 원리

크로스 플랫폼 프레임워크의 동작 방식도 다양하다:
- **Xamarin**: C# 코드를 각 플랫폼의 네이티브 코드로 컴파일
- **React Native**: JavaScript를 네이티브 컴포넌트로 브릿지
- **Cordova/Ionic**: 웹 기술(HTML/CSS/JS)을 WebView로 래핑
- **Flutter**: 자체 렌더링 엔진 사용

선택 시 고려 사항: 프로그래밍 언어, 네이티브 vs 하이브리드 방식, 플랫폼 지원 범위, 코드 재사용 비율, 팀의 기술 스택

## 예시

앱 유형별 추천 접근법:
- **성능이 중요한 앱** (게임, AR/VR): 네이티브
- **빠른 출시 + 양 플랫폼**: React Native 또는 Flutter
- **기존 웹팀이 있는 경우**: Ionic/Cordova
- **단순한 앱**: PWA (Progressive Web App)

## 관련 개념

- [Development Platform](/knowledge/software-engineering/foundations/development-platform/)
- [Game Engine](/knowledge/software-engineering/foundations/game-engine/)
- [Web API](/knowledge/software-engineering/systems-and-services/web-api/)
