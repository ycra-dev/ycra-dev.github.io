---
title: "Bridge Pattern"
description: "Bridge 패턴은 추상화(abstraction)를 구현(implementation)으로부터 분리하여 두 가지가 독립적으로 변할 수 있도록 한다"
tags: ['Bridge', 'Structural Pattern', 'Abstraction Implementation', 'Handle Body']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/bridge-pattern
sidebar:
  order: 5
---

## 핵심 개념

### 의도와 동기

추상화가 여러 가지 구현을 가질 수 있을 때, 일반적으로 상속을 사용하여 이를 수용한다. 하지만 이 접근법은 구현을 추상화에 영구적으로 바인딩하여, 추상화와 구현을 독립적으로 수정하고 확장하기 어렵게 만든다. 예를 들어, 플랫폼 독립적인 Window 추상화를 구현할 때 XWindow와 PMWindow로 서브클래싱하면 두 가지 문제가 생긴다: (1) IconWindow 같은 새로운 종류의 윈도우를 추가하려면 각 플랫폼마다 XIconWindow, PMIconWindow를 만들어야 하여 클래스가 기하급수적으로 증가하고, (2) 클라이언트 코드가 특정 플랫폼에 종속된다.

### 구조와 핵심 원리

Bridge 패턴은 Window 추상화와 그 구현을 별도의 클래스 계층으로 분리하여 이 문제를 해결한다. 하나의 계층은 윈도우 인터페이스(Window, IconWindow, TransientWindow)이고, 다른 하나는 플랫폼별 윈도우 구현(WindowImp, XWindowImp, PMWindowImp)이다. Window의 모든 연산은 WindowImp 인터페이스의 추상 연산으로 구현되며, 이것이 추상화와 구현 사이의 "다리(bridge)" 역할을 한다. 이를 통해 추상화와 구현이 독립적으로 변할 수 있다.

### 적용 가능성

다음과 같은 상황에서 Bridge 패턴을 사용한다: (1) 추상화와 구현 사이의 영구적 바인딩을 피하고 싶을 때(런타임에 구현을 선택하거나 전환해야 할 때), (2) 추상화와 구현 모두 서브클래싱으로 확장 가능해야 할 때, (3) 구현의 변경이 클라이언트에 영향을 미치지 않아야 할 때, (4) 클래스의 수가 폭발적으로 증가하는 것을 방지하고 싶을 때(Rumbaugh가 말하는 "중첩된 일반화"), (5) 여러 객체 간에 구현을 공유하되 이를 클라이언트에게 숨기고 싶을 때.

### 참여자

- **Abstraction** (Window): 추상화의 인터페이스를 정의하고 Implementor 타입 객체에 대한 참조를 유지한다.
- **RefinedAbstraction** (IconWindow): Abstraction이 정의한 인터페이스를 확장한다.
- **Implementor** (WindowImp): 구현 클래스들의 인터페이스를 정의한다. Abstraction의 인터페이스와 정확히 대응할 필요는 없으며, Implementor는 원시적(primitive) 연산만 제공하고 Abstraction은 이를 기반으로 상위 수준 연산을 정의한다.
- **ConcreteImplementor** (XWindowImp, PMWindowImp): Implementor 인터페이스를 구현하고 구체적인 구현을 정의한다.

### 결과

Bridge 패턴의 주요 결과는 다음과 같다: (1) 인터페이스와 구현의 분리로 런타임에 구현을 변경할 수 있고 컴파일 타임 의존성을 제거한다. (2) 추상화와 구현 계층을 독립적으로 확장할 수 있다. (3) 구현 세부 사항(구현자 객체의 공유, 참조 카운팅 메커니즘 등)을 클라이언트로부터 숨길 수 있다. Implementor 객체의 생성은 Abstract Factory에 위임하여 플랫폼 종속성을 캡슐화할 수 있다.

## 예시

### Window/WindowImp Bridge 구현 (C++)

```cpp
// Abstraction: 클라이언트용 윈도우 추상화
class Window {
public:
    Window(View* contents);

    // Window가 클라이언트에 제공하는 연산들
    virtual void DrawContents();
    virtual void Open();
    virtual void Close();
    virtual void Iconify();
    virtual void Deiconify();

    // 구현에 위임하는 연산들
    virtual void SetOrigin(const Point& at);
    virtual void SetExtent(const Point& extent);
    virtual void Raise();
    virtual void Lower();

    virtual void DrawLine(const Point&, const Point&);
    virtual void DrawRect(const Point&, const Point&);
    virtual void DrawPolygon(const Point[], int n);
    virtual void DrawText(const char*, const Point&);

protected:
    WindowImp* GetWindowImp();
    View* GetView();

private:
    WindowImp* _imp;  // 구현에 대한 참조 (Bridge)
    View* _contents;
};

// Implementor: 플랫폼별 구현의 추상 인터페이스
class WindowImp {
public:
    virtual void ImpTop() = 0;
    virtual void ImpBottom() = 0;
    virtual void ImpSetExtent(const Point&) = 0;
    virtual void ImpSetOrigin(const Point&) = 0;

    // 원시적(primitive) 그리기 연산
    virtual void DeviceRect(Coord, Coord, Coord, Coord) = 0;
    virtual void DeviceText(const char*, Coord, Coord) = 0;
    virtual void DeviceBitmap(const char*, Coord, Coord) = 0;
    // ...
protected:
    WindowImp();
};
```

### RefinedAbstraction: 다양한 윈도우 타입

```cpp
// ApplicationWindow는 View를 그리는 윈도우
class ApplicationWindow : public Window {
public:
    // ...
    virtual void DrawContents();
};

void ApplicationWindow::DrawContents() {
    GetView()->DrawOn(this);
}

// IconWindow는 아이콘 비트맵을 그리는 윈도우
class IconWindow : public Window {
public:
    // ...
    virtual void DrawContents();
private:
    const char* _bitmapName;
};

void IconWindow::DrawContents() {
    WindowImp* imp = GetWindowImp();
    if (imp != 0) {
        imp->DeviceBitmap(_bitmapName, 0.0, 0.0);
    }
}
```

### ConcreteImplementor: 플랫폼별 구현

```cpp
// X Window System 구현
class XWindowImp : public WindowImp {
public:
    XWindowImp();
    virtual void DeviceRect(Coord, Coord, Coord, Coord);
    // ...
private:
    Display* _dpy;
    Drawable _winid;
    GC _gc;
};

// Presentation Manager 구현
class PMWindowImp : public WindowImp {
public:
    PMWindowImp();
    virtual void DeviceRect(Coord, Coord, Coord, Coord);
    // ...
private:
    HPS _hps;
};

// Abstraction이 구현 위임하는 방식
void Window::DrawRect(const Point& p1, const Point& p2) {
    WindowImp* imp = GetWindowImp();
    imp->DeviceRect(p1.X(), p1.Y(), p2.X(), p2.Y());
}

// Abstract Factory를 통해 올바른 Implementor 획득
WindowImp* Window::GetWindowImp() {
    if (_imp == 0) {
        _imp = WindowSystemFactory::Instance()->MakeWindowImp();
    }
    return _imp;
}
```

추상화(Window 계층)와 구현(WindowImp 계층)이 완전히 분리되어, 새로운 윈도우 종류나 새로운 플랫폼을 독립적으로 추가할 수 있다.

## 관련 개념

- [Abstract Factory](/knowledge/language/design-patterns/abstract-factory/) - Bridge의 ConcreteImplementor 생성을 위해 Abstract Factory를 사용하여 플랫폼 종속성을 캡슐화할 수 있다.
- [Adapter Pattern](/knowledge/language/design-patterns/adapter-pattern/) - Adapter는 설계 후 호환되지 않는 클래스를 연결하는 반면, Bridge는 설계 초기에 추상화와 구현을 분리하여 독립적 변화를 가능하게 한다.
- [Strategy Pattern](/knowledge/language/design-patterns/strategy-pattern/) - Strategy는 알고리즘을 캡슐화하여 교체 가능하게 하며, Bridge와 유사하게 구현의 독립적 변화를 지원한다.
