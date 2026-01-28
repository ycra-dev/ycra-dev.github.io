---
title: "시스템 콜 유형 (System Call Types)"
description: "시스템 콜의 6가지 주요 범주: 프로세스 제어, 파일 관리, 장치 관리, 정보 유지, 통신, 보호"
tags: ["OS", "System-Call"]
created: 2026-01-22
updated: 2026-01-27
slug: knowledge/os/system-call-types
sidebar:
  order: 10
---

## 핵심 개념

시스템 콜은 응용 프로그램이 운영체제 서비스에 접근하기 위한 인터페이스로, 각 범주는 특정 유형의 운영체제 서비스를 제공한다. 크게 6가지 주요 범주로 분류된다.

## 6가지 시스템 콜

### 프로세스 제어 (Process Control)

| 기능 | 설명 |
|------|------|
| create process, terminate process | 프로세스 생성/종료 |
| load, execute | 프로그램 로드/실행 |
| get/set process attributes | 프로세스 속성 조회/설정 |
| wait event, signal event | 이벤트 대기/시그널 |
| allocate and free memory | 메모리 할당/해제 |

- 정상 종료: `end()`
- 비정상 종료: `abort()` → 메모리 덤프, 에러 메시지
- 예: `fork()`, `exec()`, `wait()`, `exit()`

### 파일 관리 (File Management)

| 기능 | 설명 |
|------|------|
| create file, delete file | 파일 생성/삭제 |
| open, close | 파일 열기/닫기 |
| read, write, reposition | 읽기/쓰기/위치 변경 |
| get/set file attributes | 파일 속성(이름, 타입, 보호코드 등) 조회/설정 |

예: `open()`, `read()`, `write()`, `close()`

### 장치 관리 (Device Management)

| 기능 | 설명 |
|------|------|
| request device, release device | 장치 요청/해제 |
| read, write, reposition | 읽기/쓰기/위치 변경 |
| get/set device attributes | 장치 속성 조회/설정 |
| logically attach or detach | 논리적 연결/분리 |

- 파일과 장치의 유사성: UNIX는 파일과 장치를 유사하게 취급
- 예: `ioctl()`, `read()`, `write()`

### 정보 유지 (Information Maintenance)

| 기능 | 설명 |
|------|------|
| get/set time or date | 시간/날짜 조회/설정 |
| get/set system data | 시스템 데이터 조회/설정 |
| get/set process/file/device attributes | 속성 조회/설정 |

- 디버깅 지원: `dump()`, `strace`
- 예: `getpid()`, `alarm()`, `sleep()`

### 통신 (Communications)

| 기능 | 설명 |
|------|------|
| create/delete communication connection | 통신 연결 생성/삭제 |
| send, receive messages | 메시지 송수신 |
| transfer status information | 상태 정보 전송 |
| attach or detach remote devices | 원격 장치 연결/분리 |

- 두 가지 모델: 메시지 패싱, 공유 메모리
- 예: `pipe()`, `shm_open()`, `mmap()`

### 보호 (Protection)

| 기능 | 설명 |
|------|------|
| get file permissions | 파일 권한 조회 |
| set file permissions | 파일 권한 설정 |

- 리소스 접근 제어 메커니즘 제공
- 예: `chmod()`, `umask()`, `chown()`

## Windows vs UNIX 시스템 콜 비교

| 범주 | Windows | UNIX |
|------|---------|------|
| 프로세스 제어 | `CreateProcess()`, `ExitProcess()`, `WaitForSingleObject()` | `fork()`, `exit()`, `wait()` |
| 파일 관리 | `CreateFile()`, `ReadFile()`, `WriteFile()`, `CloseHandle()` | `open()`, `read()`, `write()`, `close()` |
| 장치 관리 | `SetConsoleMode()`, `ReadConsole()`, `WriteConsole()` | `ioctl()`, `read()`, `write()` |
| 정보 유지 | `GetCurrentProcessID()`, `SetTimer()`, `Sleep()` | `getpid()`, `alarm()`, `sleep()` |
| 통신 | `CreatePipe()`, `CreateFileMapping()`, `MapViewOfFile()` | `pipe()`, `shm_open()`, `mmap()` |
| 보호 | `SetFileSecurity()`, `InitializeSecurityDescriptor()` | `chmod()`, `umask()`, `chown()` |

## 표준 C 라이브러리

UNIX/Linux에서 시스템 콜 인터페이스의 일부를 제공합니다.
- 예: `printf()` → 내부적으로 `write()` 시스템 콜 호출

## 예시

### 파일 복사 프로그램

1. 파일 이름 입력 (시스템 콜로 프롬프트 출력, 키보드 읽기)
2. 입력 파일 열기, 출력 파일 생성 (open, create)
3. 읽기/쓰기 루프 (read, write)
4. 파일 닫기 (close)
5. 정상 종료 (end)

### Arduino vs FreeBSD

- **Arduino** (싱글태스킹): 한 번에 하나의 스케치만 메모리에 존재
- **FreeBSD** (멀티태스킹): 셸이 fork()로 새 프로세스 생성, exec()로 프로그램 로드
