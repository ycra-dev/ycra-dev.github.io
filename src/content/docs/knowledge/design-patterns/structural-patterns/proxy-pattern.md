---
title: "Proxy Pattern"
description: "Proxy 패턴은 다른 객체에 대한 대리자(surrogate) 또는 자리표시자(placeholder)를 제공하여 그 객체에 대한 접근을 제어한다"
tags: ['Proxy', 'Structural Pattern', 'Surrogate', 'Access Control']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/language/design-patterns/proxy-pattern
sidebar:
  order: 6
---

## 핵심 개념

### 의도와 동기

객체에 대한 접근을 제어해야 하는 이유 중 하나는 실제로 필요할 때까지 생성과 초기화의 전체 비용을 미루기 위함이다. 예를 들어, 문서 편집기에서 큰 래스터 이미지 같은 그래픽 객체는 생성 비용이 크다. 문서를 여는 것은 빨라야 하므로 모든 비싼 객체를 한꺼번에 생성하는 것을 피해야 한다. 이미지가 보이지 않을 수도 있으므로 이는 불필요한 낭비이다. 해결책은 실제 이미지 대신 **이미지 프록시(image proxy)**를 문서에 배치하는 것이다. 프록시는 이미지처럼 행동하며 필요할 때 실제 이미지를 생성한다. Draw 연산이 호출되면 프록시가 실제 이미지를 생성하고, 이후 요청은 이미지에 직접 전달한다. 프록시는 크기 정보(extent)도 캐시하여 포매터가 이미지를 실체화하지 않고도 크기를 알 수 있게 한다.

### 프록시의 종류

Proxy 패턴은 객체에 대한 단순한 포인터보다 더 다양하고 정교한 참조가 필요할 때 적용된다:

1. **원격 프록시(Remote Proxy)**: 다른 주소 공간에 있는 객체의 로컬 대리자를 제공한다. NEXTSTEP의 NXProxy가 이 용도로 사용된다. Coplien은 이를 "Ambassador"라고 부른다.
2. **가상 프록시(Virtual Proxy)**: 비용이 큰 객체를 필요할 때 생성한다. 동기 부분의 ImageProxy가 이 예이다.
3. **보호 프록시(Protection Proxy)**: 원래 객체에 대한 접근을 제어한다. 객체마다 다른 접근 권한이 있어야 할 때 유용하며, Choices 운영체제의 KernelProxy가 운영체제 객체에 대한 보호된 접근을 제공한다.
4. **스마트 참조(Smart Reference)**: 객체에 접근할 때 추가적인 동작을 수행하는 단순 포인터의 대체물이다. 참조 카운팅(자동 메모리 해제), 영구 객체의 최초 참조 시 메모리 로딩, 접근 전 잠금 확인 등이 있다.

### 참여자

- **Proxy** (ImageProxy): RealSubject에 접근할 수 있는 참조를 유지한다. Subject의 인터페이스와 동일한 인터페이스를 제공하여 RealSubject를 대체할 수 있다. RealSubject에 대한 접근을 제어하며, 생성과 삭제의 책임을 질 수 있다. 프록시 종류에 따라 추가 책임이 다르다: 원격 프록시는 요청을 인코딩하여 전송하고, 가상 프록시는 실제 Subject의 추가 정보를 캐시하며, 보호 프록시는 접근 권한을 검사한다.
- **Subject** (Graphic): RealSubject와 Proxy의 공통 인터페이스를 정의하여, RealSubject가 기대되는 어디서든 Proxy를 사용할 수 있게 한다.
- **RealSubject** (Image): 프록시가 대리하는 실제 객체를 정의한다.

### 결과

Proxy 패턴은 객체에 접근할 때 간접 참조 수준(level of indirection)을 도입한다. 원격 프록시는 객체가 다른 주소 공간에 있다는 사실을 숨길 수 있고, 가상 프록시는 필요할 때 객체를 생성하는 최적화를 수행할 수 있으며, 보호 프록시와 스마트 참조는 객체 접근 시 추가적인 관리 작업을 수행한다. 또한 **기록 시 복사(copy-on-write)** 최적화를 숨길 수 있다. 큰 객체를 복사하는 것은 비싸므로, 프록시를 사용하여 실제 수정이 일어날 때까지 복사를 미루고, 참조 카운팅으로 공유 상태를 관리한다.

## 예시

### 가상 프록시: ImageProxy (C++)

```cpp
// Subject: 그래픽 객체의 추상 인터페이스
class Graphic {
public:
    virtual ~Graphic();

    virtual void Draw(const Point& at) = 0;
    virtual void HandleMouse(Event& event) = 0;

    virtual const Point& GetExtent() = 0;

    virtual void Load(istream& from) = 0;
    virtual void Save(ostream& to) = 0;
protected:
    Graphic();
};

// RealSubject: 실제 이미지 객체
class Image : public Graphic {
public:
    Image(const char* file);
    virtual ~Image();

    virtual void Draw(const Point& at);
    virtual void HandleMouse(Event& event);

    virtual const Point& GetExtent();

    virtual void Load(istream& from);
    virtual void Save(ostream& to);
private:
    // ...
};

// Proxy: 이미지의 대리자
class ImageProxy : public Graphic {
public:
    ImageProxy(const char* imageFile);
    virtual ~ImageProxy();

    virtual void Draw(const Point& at);
    virtual void HandleMouse(Event& event);

    virtual const Point& GetExtent();

    virtual void Load(istream& from);
    virtual void Save(ostream& to);
protected:
    Image* GetImage();  // 실제 이미지를 필요할 때 로드
private:
    Image* _image;          // 실제 이미지에 대한 참조
    Point _extent;          // 캐시된 크기 정보
    const char* _fileName;  // 파일 참조
};

ImageProxy::ImageProxy(const char* fileName) {
    _fileName = fileName;
    _extent = Point::Zero;  // 크기를 아직 모름
    _image = 0;             // 아직 로드하지 않음
}

// 실제 이미지가 필요할 때 로드 (지연 로딩)
Image* ImageProxy::GetImage() {
    if (_image == 0) {
        _image = new Image(_fileName);
    }
    return _image;
}

// 크기는 캐시 값을 먼저 확인
const Point& ImageProxy::GetExtent() {
    if (_extent == Point::Zero) {
        _extent = GetImage()->GetExtent();
    }
    return _extent;
}

// Draw에서 실제 이미지 로드를 트리거
void ImageProxy::Draw(const Point& at) {
    GetImage()->Draw(at);
}

// 이벤트 처리도 실제 이미지에 위임
void ImageProxy::HandleMouse(Event& event) {
    GetImage()->HandleMouse(event);
}
```

### 프록시 사용

```cpp
// 문서에 이미지 프록시 삽입
class TextDocument {
public:
    TextDocument();

    void Insert(Graphic*);
    // ...
};

// 클라이언트 코드: 프록시를 통해 지연 로딩
TextDocument* text = new TextDocument;

// 실제 이미지가 아닌 프록시를 삽입
// 이미지는 실제로 표시될 때까지 로드되지 않음
text->Insert(new ImageProxy("anImageFileName"));
```

### Smalltalk의 doesNotUnderstand를 이용한 범용 프록시

```smalltalk
"보호 프록시 예시: 허용된 메시지만 전달"
doesNotUnderstand: aMessage
    (legalMessages includes: aMessage selector)
        ifTrue: [^self realSubject
                    perform: aMessage selector
                    withArguments: aMessage arguments]
        ifFalse: [self error: 'Illegal operator']
```

Smalltalk에서는 doesNotUnderstand: 메커니즘을 활용하여 슈퍼클래스 없이(superclass가 nil) 프록시를 정의하면, 프록시가 이해하지 못하는 모든 메시지를 자동으로 실제 주체에 전달할 수 있다. 보호 프록시는 허용된 메시지 집합을 검사하여 접근 제어를 구현한다.

## 관련 개념

- [Adapter Pattern](/knowledge/language/design-patterns/adapter-pattern/) - Adapter는 적용 대상 객체에 다른 인터페이스를 제공하지만, Proxy는 Subject와 동일한 인터페이스를 제공한다. 다만 보호 프록시는 Subject가 수행할 연산을 거부할 수 있어 인터페이스가 실질적으로 Subject의 부분 집합이 될 수 있다.
- [Decorator Pattern](/knowledge/language/design-patterns/decorator-pattern/) - Decorator와 Proxy는 구현이 유사할 수 있지만 목적이 다르다. Decorator는 객체에 책임을 추가하고, Proxy는 객체에 대한 접근을 제어한다. 보호 프록시는 Decorator처럼 구현될 수 있고, 원격 프록시는 Subject에 대한 간접 참조만 가지며, 가상 프록시는 처음에 간접 참조로 시작하여 나중에 직접 참조를 획득한다.
- [Delegation](/knowledge/language/design-patterns/delegation/) - Proxy의 핵심 메커니즘으로, 프록시가 요청을 RealSubject에 위임(delegation)하여 처리한다.
