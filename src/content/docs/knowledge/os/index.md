---
title: Operating System
description: 운영체제 관련 개념 정리 (MOC)
tags: ["OS", "MOC"]
created: 2026-01-24
updated: 2026-01-28
draft: false
slug: knowledge/os
sidebar:
  order: 0
---

## 기본 개념

- [폰 노이만 아키텍처 (Von Neumann Architecture)](/knowledge/os/von-neumann-architecture/) - 메모리에서 명령어를 가져와 실행하는 명령어 실행 사이클
- [운영체제 (Operating System)](/knowledge/os/operating-system/) - 하드웨어 관리와 응용 프로그램 실행 기반 제공
- [기능 이동 (Feature Migration)](/knowledge/os/feature-migration/) - OS 기능이 대형에서 소형 컴퓨터로 점진적 이동
- [커널 (Kernel)](/knowledge/os/kernel/) - 컴퓨터에서 항상 실행되는 OS의 핵심 프로그램
- [부트스트랩 프로그램 (Bootstrap Program)](/knowledge/os/bootstrap-program/) - 컴퓨터 전원이 켜질 때 운영체제를 로드하는 초기 프로그램
- [시스템 부팅 (System Boot)](/knowledge/os/system-boot/) - 커널을 로드하여 컴퓨터를 시작하는 과정
- [인터럽트 (Interrupt)](/knowledge/os/interrupt/) - 하드웨어가 CPU에게 이벤트 발생을 알리는 메커니즘
- [인터럽트 벡터 (Interrupt Vector)](/knowledge/os/interrupt-vector/) - 인터럽트 서비스 루틴 주소를 저장하는 배열
- [트랩 (Trap)](/knowledge/os/trap/) - 오류 또는 시스템 콜에 의해 발생하는 소프트웨어 생성 인터럽트
- [시스템 콜 (System Call)](/knowledge/os/system-call/) - 프로세스가 운영체제에게 동작을 요청하는 방법
- [시스템 콜 유형 (System Call Types)](/knowledge/os/system-call-types/) - 프로세스 제어, 파일, 장치, 정보, 통신, 보호 6가지 분류
- [이중 모드 연산 (Dual-Mode Operation)](/knowledge/os/dual-mode-operation/) - 운영체제와 사용자 코드 실행을 구분하는 하드웨어 메커니즘
- [특권 명령어 (Privileged Instructions)](/knowledge/os/privileged-instructions/) - 커널 모드에서만 실행 가능한 명령어
- [타이머 (Timer)](/knowledge/os/timer/) - 운영체제가 CPU 제어를 유지하도록 보장하는 장치

## 프로세스와 스레드

- [프로세스 (Process)](/knowledge/os/process/) - 실행 중인 프로그램
- [프로세스 상태 (Process State)](/knowledge/os/process-state/) - 프로세스의 5가지 상태와 전이
- [프로세스 제어 블록 (PCB)](/knowledge/os/pcb/) - 프로세스 관리 정보를 저장하는 커널 자료구조
- [프로세스 메모리 구조 (Process Memory Layout)](/knowledge/os/process-memory/) - Text/Data/Heap/Stack 4영역 구조
- [프로세스 종료와 Zombie-Orphan](/knowledge/os/process-termination/) - 프로세스 종료 시 좀비와 고아 프로세스 처리
- [컨텍스트 스위치 (Context Switch)](/knowledge/os/context-switch/) - CPU를 다른 프로세스로 전환하는 과정
- [멀티프로그래밍 (Multiprogramming)](/knowledge/os/multiprogramming/) - CPU가 항상 실행할 작업을 갖도록 여러 프로그램을 조직
- [멀티태스킹 (Multitasking)](/knowledge/os/multitasking/) - CPU가 여러 프로세스 간에 빠르게 전환하여 빠른 응답 제공
- [UNIX 프로세스 모델](/knowledge/os/unix-process-model/) - fork()로 복제하고 execve()로 새 프로그램을 적재하는 모델
- [스레드 (Thread)](/knowledge/os/thread/) - CPU 이용의 기본 단위, 프로세스 내 독립적 제어 흐름
- [멀티스레딩 모델](/knowledge/os/multithreading-models/) - 사용자-커널 스레드 매핑 관계 정의
- [사용자 스레드 vs 커널 스레드](/knowledge/os/user-kernel-thread/) - 사용자 공간 라이브러리 관리 vs 커널 직접 관리
- [스레드 풀 (Thread Pool)](/knowledge/os/thread-pool/) - 미리 생성된 스레드에 작업을 할당하는 패턴
- [스레드 취소 (Thread Cancellation)](/knowledge/os/thread-cancellation/) - 비동기 취소와 지연 취소 방식
- [스레드 로컬 저장소 (Thread-Local Storage)](/knowledge/os/thread-local-storage/) - 각 스레드가 고유한 데이터 복사본을 갖는 저장 메커니즘
- [Windows 스레드 상태](/knowledge/os/windows-thread-state/) - 8가지 스레드 상태와 전이
- [동시성 vs 병렬성](/knowledge/os/concurrency-vs-parallelism/) - 논리적 동시 진행과 물리적 동시 실행의 차이
- [데이터 병렬성 vs 태스크 병렬성](/knowledge/os/data-vs-task-parallelism/) - 데이터 분할 vs 연산 분산 병렬화 전략
- [Fork-Join 모델](/knowledge/os/fork-join/) - 자식 스레드를 생성(fork)하고 완료를 기다려(join) 결과를 합치는 병렬 실행 패턴
- [암달의 법칙 (Amdahl's Law)](/knowledge/os/amdahls-law/) - 병렬화 가능 비율이 전체 성능 향상의 상한을 결정
- [IPC 모델 (Interprocess Communication)](/knowledge/os/ipc-models/) - 공유 메모리와 메시지 전달 방식의 프로세스 간 통신
- [UNIX 파이프 (Pipe)](/knowledge/os/unix-pipe/) - 두 프로세스 간 단방향 바이트 스트림 IPC
- [UNIX 소켓 (Socket)](/knowledge/os/unix-socket/) - 로컬 및 네트워크 프로세스 간 통신을 위한 범용 인터페이스
- [UNIX 시그널 (Signal)](/knowledge/os/unix-signal/) - 프로세스에게 비동기적으로 이벤트 발생을 알리는 소프트웨어 인터럽트
- [Linux IPC](/knowledge/os/linux-ipc/) - Linux의 시그널, 파이프, 공유 메모리 등 IPC 메커니즘

## CPU 스케줄링

- [CPU 스케줄링 (CPU Scheduling)](/knowledge/os/cpu-scheduling/) - Ready 상태의 프로세스 중 어떤 것에 CPU를 할당할지 결정하는 메커니즘
- [스케줄링 평가 기준](/knowledge/os/scheduling-criteria/) - CPU 스케줄링 알고리즘의 정량적 평가 지표
- [선점형 vs 비선점형 스케줄링](/knowledge/os/preemptive-scheduling/) - CPU 강제 회수 가능 여부에 따른 분류
- [FCFS 스케줄링 (First-Come, First-Served)](/knowledge/os/fcfs-scheduling/) - 먼저 도착한 프로세스에게 먼저 CPU를 할당하는 비선점형 스케줄링
- [SJF 스케줄링 (Shortest-Job-First)](/knowledge/os/sjf-scheduling/) - 다음 CPU 버스트가 가장 짧은 프로세스에게 먼저 CPU를 할당하는 최적 스케줄링
- [우선순위 스케줄링 (Priority Scheduling)](/knowledge/os/priority-scheduling/) - 가장 높은 우선순위에 CPU를 할당하는 스케줄링
- [라운드 로빈 스케줄링 (Round-Robin)](/knowledge/os/round-robin/) - 타임 퀀텀만큼 CPU를 순환 할당하는 선점형 스케줄링
- [다단계 큐 스케줄링 (Multilevel Queue)](/knowledge/os/multilevel-queue/) - 프로세스를 여러 큐로 분류하고 각 큐에 다른 스케줄링 적용
- [다단계 피드백 큐 스케줄링](/knowledge/os/multilevel-feedback-queue/) - CPU 버스트 특성에 따라 큐 간 이동 가능한 유연한 스케줄링
- [멀티프로세서 스케줄링](/knowledge/os/multiprocessor-scheduling/) - 여러 CPU에 프로세스/스레드 할당 결정
- [프로세서 친화성 (Processor Affinity)](/knowledge/os/processor-affinity/) - 프로세스를 특정 CPU에 바인딩하여 캐시 효율 유지
- [실시간 스케줄링](/knowledge/os/realtime-scheduling/) - 데드라인 내 완료를 보장하는 스케줄링
- [CFS 스케줄러 (Completely Fair Scheduler)](/knowledge/os/cfs-scheduler/) - 고정 타임 슬라이스 대신 CPU 시간의 비율을 공정하게 할당하는 Linux 기본 스케줄러
- [UNIX CPU 스케줄링](/knowledge/os/unix-cpu-scheduling/) - 동적 우선순위 기반으로 대화형 프로세스를 우대하는 스케줄링
- [Windows 스레드 스케줄링](/knowledge/os/windows-thread-scheduling/) - 32단계 우선순위 기반 선점형 스케줄링

## 동기화와 교착 상태

- [임계구역 문제 (Critical Section Problem)](/knowledge/os/critical-section/) - 여러 프로세스가 공유 데이터에 접근하는 코드 영역을 안전하게 실행하기 위한 프로토콜 설계 문제
- [경쟁 조건 (Race Condition)](/knowledge/os/race-condition/) - 공유 데이터 동시 접근 시 실행 순서에 따라 결과가 달라지는 상황
- [Peterson's Solution](/knowledge/os/petersons-solution/) - 두 프로세스 간 상호배제를 보장하는 고전적 소프트웨어 알고리즘
- [하드웨어 동기화 명령어 (Hardware Instructions)](/knowledge/os/hardware-instructions/) - 원자적으로 실행되는 특수 하드웨어 명령어로 상호배제 구현
- [메모리 배리어 (Memory Barrier)](/knowledge/os/memory-barrier/) - 메모리 연산 순서를 강제하여 명령어 재정렬을 방지하는 하드웨어 명령어
- [원자적 변수 (Atomic Variable)](/knowledge/os/atomic-variable/) - CAS 기반으로 단일 변수에 대해 원자적 연산을 제공하는 lock-free 동기화 도구
- [뮤텍스 락 (Mutex Lock)](/knowledge/os/mutex-lock/) - acquire/release 연산으로 임계구역을 보호하는 상호배제 도구
- [세마포어 (Semaphore)](/knowledge/os/semaphore/) - 정수 값과 wait/signal 원자적 연산으로 접근하는 동기화 도구
- [모니터 (Monitor)](/knowledge/os/monitor/) - 공유 데이터와 연산을 캡슐화하여 자동 상호배제를 보장하는 고수준 ADT
- [조건 변수 (Condition Variable)](/knowledge/os/condition-variable/) - 모니터 내에서 특정 조건이 만족될 때까지 프로세스를 대기시키는 동기화 메커니즘
- [트랜잭셔널 메모리 (Transactional Memory)](/knowledge/os/transactional-memory/) - 락 없이 원자적 메모리 접근을 보장하는 동기화 기법
- [POSIX Synchronization](/knowledge/os/posix-synchronization/) - Pthreads의 mutex, 세마포어, 조건 변수 동기화 표준
- [Java Synchronization](/knowledge/os/java-synchronization/) - Java의 언어 수준 모니터와 API 수준 Lock/Condition 동기화
- [Linux 커널 동기화](/knowledge/os/linux-kernel-synchronization/) - Linux의 atomic, spinlock, mutex 및 top/bottom-half 인터럽트 분리
- [유한 버퍼 문제 (Bounded-Buffer Problem)](/knowledge/os/bounded-buffer/) - 고정 크기 버퍼를 공유하는 생산자와 소비자 프로세스 간의 동기화 문제
- [읽기-쓰기 문제 (Readers-Writers Problem)](/knowledge/os/readers-writers/) - 동시 읽기 허용과 쓰기 배타적 접근의 동기화 문제
- [식사하는 철학자 문제 (Dining-Philosophers Problem)](/knowledge/os/dining-philosophers/) - 다중 자원 동시 요청 시 교착 상태와 기아를 모델링한 동기화 문제
- [우선순위 역전 (Priority Inversion)](/knowledge/os/priority-inversion/) - 고우선순위가 저우선순위의 자원 대기 중 중간 우선순위에 블록되는 현상
- [교착 상태 (Deadlock)](/knowledge/os/deadlock/) - 스레드들이 서로의 자원을 무한히 기다리는 상태
- [교착 상태 필요조건 (Necessary Conditions)](/knowledge/os/deadlock-conditions/) - 교착 상태 발생에 필요한 4가지 조건
- [자원 할당 그래프 (Resource-Allocation Graph)](/knowledge/os/resource-allocation-graph/) - 스레드와 자원 간의 요청/할당 관계를 시각화한 방향 그래프
- [안전 상태 (Safe State)](/knowledge/os/safe-state/) - 교착 상태를 피할 수 있는 자원 할당 순서가 존재하는 상태
- [은행원 알고리즘 (Banker's Algorithm)](/knowledge/os/bankers-algorithm/) - 안전 상태 유지 여부를 검사하는 교착 상태 회피 알고리즘
- [교착 상태 탐지 (Deadlock Detection)](/knowledge/os/deadlock-detection/) - 주기적으로 시스템 상태를 검사하여 교착 여부를 판별하는 알고리즘
- [교착 상태 복구 (Deadlock Recovery)](/knowledge/os/deadlock-recovery/) - 프로세스 종료 또는 자원 선점으로 교착 상태를 해소하는 기법
- [라이브락 (Livelock)](/knowledge/os/livelock/) - 스레드들이 활성 상태이지만 진전 없이 동작을 반복하는 상태

## 메모리 관리

- [요구 페이징 (Demand Paging)](/knowledge/os/demand-paging/) - 필요할 때만 페이지를 자동으로 전송하는 기법
- [가상 메모리 (Virtual Memory)](/knowledge/os/virtual-memory/) - 논리적 메모리를 물리적 메모리와 분리하여 큰 프로그램도 실행 가능
- [논리 주소와 물리 주소](/knowledge/os/logical-physical-address/) - CPU가 생성하는 논리 주소와 메모리 유닛의 물리 주소
- [계층적 페이징 (Hierarchical Paging)](/knowledge/os/hierarchical-paging/) - 페이지 테이블 자체를 페이징하여 여러 단계로 나누는 기법
- [메모리 단편화 (Memory Fragmentation)](/knowledge/os/fragmentation/) - 메모리 공간이 조각나 효율적으로 사용되지 못하는 현상
- [메모리 압축 (Memory Compression)](/knowledge/os/memory-compression/) - 페이지를 압축하여 프레임에 저장하는 기법
- [스래싱 (Thrashing)](/knowledge/os/thrashing/) - 프로세스가 작업보다 페이징에 더 많은 시간을 소비하는 현상
- [스와핑 (Swapping)](/knowledge/os/swapping/) - 프로세스/페이지를 메모리와 디스크 사이에서 이동
- [스왑 공간 관리](/knowledge/os/swap-space/) - 페이지를 임시 저장하는 이차 저장장치 영역 관리
- [버디 시스템 (Buddy System)](/knowledge/os/buddy-system/) - 2의 거듭제곱 크기로 분할하는 커널 메모리 할당
- [슬랩 할당 (Slab Allocation)](/knowledge/os/slab-allocation/) - 객체 유형별 캐시를 통한 커널 메모리 할당
- [연속 메모리 할당 (Contiguous Allocation)](/knowledge/os/contiguous-allocation/) - 프로세스를 연속된 메모리 공간에 배치하는 기법
- [페이징 (Paging)](/knowledge/os/paging/) - 메모리를 고정 크기 페이지/프레임으로 나누어 관리
- [페이지 테이블 (Page Table)](/knowledge/os/page-table/) - 가상 페이지를 물리 프레임으로 변환하는 매핑 테이블
- [페이지 교체 (Page Replacement)](/knowledge/os/page-replacement/) - 메모리 프레임 부족 시 교체 대상을 선택하는 알고리즘
- [프레임 할당 (Frame Allocation)](/knowledge/os/frame-allocation/) - 프로세스에게 물리 프레임을 배분하는 정책
- [워킹셋 모델 (Working-Set Model)](/knowledge/os/working-set/) - 일정 시간 창 내 참조된 페이지 집합으로 스래싱 방지
- [Copy-on-Write (COW)](/knowledge/os/copy-on-write/) - 부모와 자식 프로세스가 동일한 페이지를 공유하다가 쓰기 시에만 복사하는 최적화 기법
- [FIFO 페이지 교체](/knowledge/os/fifo-page-replacement/) - 가장 먼저 메모리에 들어온 페이지를 가장 먼저 교체하는 알고리즘
- [LRU 페이지 교체](/knowledge/os/lru-page-replacement/) - 가장 오랫동안 사용되지 않은 페이지를 교체하는 알고리즘
- [Linux 가상 메모리 관리](/knowledge/os/linux-virtual-memory/) - vm_area_struct 기반 Linux 가상 메모리 관리 체계
- [Linux 물리 메모리 관리](/knowledge/os/linux-physical-memory/) - Zone, Buddy System, Slab Allocator 통합 관리
- [MMU (Memory Management Unit)](/knowledge/os/mmu/) - 논리 주소를 물리 주소로 변환하는 하드웨어 장치
- [Optimal 페이지 교체 (OPT)](/knowledge/os/optimal-page-replacement/) - 가장 오랫동안 사용되지 않을 페이지를 교체하는 이론적 최적 알고리즘
- [세컨드 찬스 알고리즘 (Second-Chance / Clock)](/knowledge/os/second-chance-algorithm/) - 참조 비트를 활용한 LRU 근사 페이지 교체 알고리즘
- [TLB (Translation Look-Aside Buffer)](/knowledge/os/tlb/) - 페이지 테이블 엔트리를 캐싱하는 고속 연관 메모리
- [Windows 가상 메모리 관리자 (VMM)](/knowledge/os/windows-vmm/) - 예약-커밋 2단계 할당 모델의 Windows 메모리 관리

## I/O 시스템

- [Polling](/knowledge/os/polling/) - CPU가 장치의 상태 레지스터를 반복적으로 읽어 준비 여부를 확인하는 I/O 방식
- [Interrupt-Driven I/O](/knowledge/os/interrupt-driven-io/) - 장치가 준비되면 CPU에 인터럽트 신호를 보내 I/O 완료를 알리는 방식
- [DMA (Direct Memory Access)](/knowledge/os/dma/) - CPU 개입 없이 장치와 메모리 간 직접 데이터 전송
- [Memory-Mapped I/O](/knowledge/os/memory-mapped-io/) - 장치 레지스터를 메모리 주소 공간에 매핑하여 일반 명령어로 I/O 수행
- [블로킹 vs 논블로킹 I/O](/knowledge/os/blocking-nonblocking-io/) - I/O 완료 시까지 대기하는 블로킹과 즉시 반환하는 논블로킹의 차이
- [버퍼링 (Buffering)](/knowledge/os/buffering/) - 장치와 애플리케이션 간 속도/크기 차이를 해소하는 임시 메모리 영역
- [스풀링 (Spooling)](/knowledge/os/spooling/) - 디스크를 버퍼로 사용하여 I/O 장치와 CPU 간 속도 차이 해소
- [디바이스 드라이버](/knowledge/os/device-driver/) - 장치 컨트롤러의 차이를 추상화하여 커널에 표준 인터페이스를 제공하는 모듈
- [I/O 스케줄링 (I/O Scheduling)](/knowledge/os/io-scheduling/) - I/O 요청 순서를 재배치하여 효율성과 응답 시간 개선
- [UNIX 파일 디스크립터 (File Descriptor)](/knowledge/os/unix-file-descriptor/) - 열린 파일을 참조하는 정수 핸들
- [UNIX 블록 버퍼 캐시 (Block Buffer Cache)](/knowledge/os/unix-block-buffer-cache/) - 디스크 블록을 메모리에 캐싱하는 커널 메커니즘
- [VFS (Virtual File System)](/knowledge/os/vfs/) - 다양한 파일 시스템을 단일 인터페이스로 추상화하는 계층
- [I/O Manager와 IRP (Windows)](/knowledge/os/windows-io-manager/) - Windows의 IRP 기반 드라이버 스택 I/O 처리 구조

## 저장장치

- [저장장치 계층구조 (Storage Hierarchy)](/knowledge/os/storage-hierarchy/) - 속도와 용량에 따른 저장 시스템 계층 구조
- [캐시 (Cache)](/knowledge/os/cache/) - 자주 사용되는 정보를 빠른 저장 장치에 임시로 복사
- [캐시 일관성 (Cache Coherency)](/knowledge/os/cache-coherency/) - 멀티프로세서 환경에서 캐시 간 데이터 일관성 보장
- [논리 블록 주소 (LBA)](/knowledge/os/lba/) - 저장장치를 연속된 블록 배열로 추상화한 주소 체계
- [HDD (Hard Disk Drive)](/knowledge/os/hdd/) - 자기 물질이 코팅된 회전하는 플래터에 데이터를 기록하는 기계식 저장장치
- [SSD (Solid-State Drive)](/knowledge/os/ssd/) - NAND 플래시 메모리 기반 비휘발성 저장장치
- [NAND 플래시 관리 알고리즘](/knowledge/os/nand-flash-management/) - FTL, GC, 웨어 레벨링 등 SSD 내부 관리 기법
- [오류 검출과 정정 (ECC)](/knowledge/os/ecc/) - 저장장치와 통신에서 데이터 오류를 감지하고 복구하는 기술
- [RAID](/knowledge/os/raid/) - 여러 디스크를 조합하여 신뢰성과 성능을 달성하는 저장장치 구성 기술
- [RAID 레벨](/knowledge/os/raid-levels/) - RAID 0, 1, 5, 6, 1+0 등 디스크 조합 방식별 트레이드오프
- [저장장치 연결 방식 (Storage Connectivity)](/knowledge/os/storage-connectivity/) - DAS/NAS/SAN 등 저장장치를 호스트에 연결하는 방식
- [저장장치 초기화 (Storage Initialization)](/knowledge/os/storage-initialization/) - 물리 포맷부터 파일 시스템 생성까지의 과정
- [객체 스토리지 (Object Storage)](/knowledge/os/object-storage/) - 고유 ID로 식별되는 객체 단위 저장 방식
- [UNIX 아이노드 (Inode)](/knowledge/os/unix-inode/) - 파일의 메타데이터와 블록 위치를 저장하는 자료구조
- [BSD 실린더 그룹 (Cylinder Group)](/knowledge/os/bsd-cylinder-group/) - FFS에서 관련 데이터를 인접 배치하여 seek 최소화
- [저널링 파일 시스템 (Journaling)](/knowledge/os/journaling/) - 트랜잭션 로그로 파일 시스템 일관성을 보장하는 기법
- [NTFS 구조](/knowledge/os/ntfs-structure/) - MFT 기반 구조, 다중 데이터 스트림, B+ 트리 디렉토리
- [NTFS 복구 메커니즘](/knowledge/os/ntfs-recovery/) - 트랜잭션 로깅으로 메타데이터 일관성을 빠르게 복구
- [ZFS (Zettabyte File System)](/knowledge/os/zfs/) - 볼륨 관리와 파일 시스템을 통합한 체크섬 기반 현대적 파일 시스템

## 컴퓨터 시스템 구조

- [멀티프로세서 시스템 (Multiprocessor System)](/knowledge/os/multiprocessor-system/) - 두 개 이상의 프로세서가 자원을 공유하는 시스템
- [가상화 (Virtualization)](/knowledge/os/virtualization/) - 하드웨어를 여러 실행 환경으로 추상화하는 기술
- [분산 시스템 (Distributed System)](/knowledge/os/distributed-system/) - 메모리를 공유하지 않는 프로세서들이 네트워크를 통해 통신하는 시스템
- [하드웨어 가상화 지원 (VT-x/AMD-V)](/knowledge/os/hw-virtualization/) - CPU가 하드웨어 수준에서 가상화를 직접 지원하는 확장 기능
- [바이너리 변환 (Binary Translation)](/knowledge/os/binary-translation/) - 게스트 OS의 문제되는 명령어를 동등한 다른 명령어로 변환하여 가상화를 구현하는 기법
- [컨테이너 (Container)](/knowledge/os/container/) - 단일 커널 위에서 애플리케이션들을 격리하여 가상화와 유사한 효과를 제공하는 OS 수준 격리 기술
- [JVM (Java Virtual Machine)](/knowledge/os/jvm/) - Java 바이트코드를 실행하는 프로그래밍 환경 가상화의 대표적 사례
- [라이브 마이그레이션 (Live Migration)](/knowledge/os/live-migration/) - 실행 중인 게스트 VM을 서비스 중단 없이 다른 서버로 이동
- [준가상화 (Paravirtualization)](/knowledge/os/paravirtualization/) - 게스트 OS를 수정하여 VMM과 협력하는 효율적 가상화 기법
- [트랩 앤 에뮬레이트 (Trap-and-Emulate)](/knowledge/os/trap-and-emulate/) - 특권 명령어 트랩으로 VMM이 에뮬레이션하는 가상화 기법
- [하이퍼바이저 유형 (Type 0/1/2)](/knowledge/os/hypervisor-types/) - 펌웨어/Bare-metal/Hosted 하이퍼바이저 분류
- [VMM 메모리 관리](/knowledge/os/vmm-memory-management/) - Balloon, Page Sharing, Double Paging 기법으로 게스트 메모리 관리
- [VMM CPU 스케줄링](/knowledge/os/vmm-cpu-scheduling/) - VCPU 할당과 오버커밋, 시간 왜곡 문제

## 분산 시스템

- [네트워크 운영체제 vs 분산 운영체제 (NOS vs DOS)](/knowledge/os/nos-vs-dos/) - NOS는 명시적 접근, DOS는 투명한 접근 제공
- [분산 시스템의 투명성 (Transparency)](/knowledge/os/distributed-transparency/) - 분산을 숨겨 단일 시스템처럼 보이게 하는 특성
- [분산 시스템의 견고성 (Robustness)](/knowledge/os/distributed-robustness/) - 장애에도 불구하고 계속 동작할 수 있는 능력
- [분산 시스템의 확장성 (Scalability)](/knowledge/os/distributed-scalability/) - 증가하는 부하에 적응하여 성능을 유지하는 능력
- [분산 파일 시스템 (DFS)](/knowledge/os/dfs/) - 여러 머신에 분산된 파일을 단일 시스템처럼 제공
- [클라이언트-서버 DFS (NFS, OpenAFS)](/knowledge/os/client-server-dfs/) - 서버가 파일을 저장하고 클라이언트가 투명하게 접근
- [클러스터 기반 DFS (GFS, HDFS)](/knowledge/os/cluster-dfs/) - 파일을 청크로 분할하여 복제 저장하는 대규모 시스템
- [DFS 캐싱과 일관성](/knowledge/os/dfs-caching/) - 클라이언트 캐싱과 서버 마스터 간 일관성 유지

## 운영체제 서비스

- [운영체제 서비스 (OS Services)](/knowledge/os/os-services/) - 프로그램과 사용자에게 제공하는 서비스
- [사용자 인터페이스 (User Interface)](/knowledge/os/user-interface/) - 사용자가 운영체제와 상호작용하는 방법
- [명령 인터프리터 (Command Interpreter)](/knowledge/os/command-interpreter/) - 사용자가 명령을 직접 입력하는 CLI
- [GUI (Graphical User Interface)](/knowledge/os/gui/) - 마우스 기반 그래픽 인터페이스
- [터치스크린 인터페이스 (Touch-Screen Interface)](/knowledge/os/touch-screen-interface/) - 제스처 기반 모바일 인터페이스
- [API (Application Programming Interface)](/knowledge/os/api/) - 프로그래머에게 제공되는 함수 집합
- [시스템 콜 인터페이스 (System-call Interface)](/knowledge/os/system-call-interface/) - API와 시스템 콜을 연결하는 인터페이스
- [시스템 프로그램 (System Programs)](/knowledge/os/system-programs/) - 프로그램 개발과 실행을 위한 유틸리티
- [링커와 로더 (Linkers and Loaders)](/knowledge/os/linker-loader/) - 객체 파일 결합과 메모리 적재
- [OS 디버깅 (OS Debugging)](/knowledge/os/os-debugging/) - 시스템/프로세스 오류 진단과 성능 분석

## 보호

- [보안 vs 보호 (Security vs Protection)](/knowledge/os/security-vs-protection/) - 내부 보호 메커니즘과 외부 보안의 차이
- [보호의 목표와 원칙](/knowledge/os/protection-goals/) - 최소 권한, 격리, 심층 방어 등 보호 핵심 원칙
- [보호 도메인 (Protection Domain)](/knowledge/os/protection-domain/) - 프로세스의 접근 가능 객체와 허용 연산의 집합
- [보호 링 (Protection Ring)](/knowledge/os/protection-ring/) - 동심원 계층의 하드웨어 기반 권한 분리 모델
- [접근 행렬 (Access Matrix)](/knowledge/os/access-matrix/) - 도메인×객체 행렬로 접근 권한을 정의하는 보호 모델
- [접근 행렬 구현 (Access Matrix Implementation)](/knowledge/os/access-matrix-impl/) - 전역 테이블, ACL, 능력 리스트, 잠금-키 방식
- [능력 기반 시스템 (Capability-Based System)](/knowledge/os/capability-based-system/) - root 권한을 세분화된 능력들로 분해하는 보호 모델
- [역할 기반 접근 제어 (RBAC)](/knowledge/os/rbac/) - 역할에 권한을 부여하고 사용자를 역할에 할당하는 접근 제어
- [강제적 접근 제어 (MAC)](/knowledge/os/mac/) - 시스템 정책에 의한 접근 제어, root도 우회 불가
- [Linux 보안 모델](/knowledge/os/linux-security-model/) - UID/GID 기반 접근 제어, PAM 인증, setuid 메커니즘
- [샌드박싱 (Sandboxing)](/knowledge/os/sandboxing/) - 프로세스를 격리된 환경에서 실행하는 보호 기법

## 보안

- [대칭 암호화 (Symmetric Encryption)](/knowledge/os/symmetric-encryption/) - 동일한 비밀 키로 암호화/복호화하는 방식
- [비대칭 암호화 (Asymmetric Encryption)](/knowledge/os/asymmetric-encryption/) - 암호화와 복호화에 서로 다른 키(공개 키/개인 키)를 사용하는 암호화 방식
- [인증 (Authentication)](/knowledge/os/authentication/) - 메시지의 송신자를 검증하고 메시지가 변조되지 않았음을 증명하는 암호학적 기법
- [패스워드 보안 (Password Security)](/knowledge/os/password-security/) - Hash+Salt 저장, OTP, 다중 인증(MFA) 기법
- [TLS 프로토콜 (TLS Protocol)](/knowledge/os/tls-protocol/) - 비대칭 키 교환 + 대칭 암호 통신의 보안 프로토콜
- [보안 위반 (Security Violations)](/knowledge/os/security-violations/) - 기밀성/무결성/가용성 침해와 서비스 도용/거부 유형
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/) - 공격자가 보안을 침해하기 위해 사용하는 주요 공격 기법의 분류와 방어 전략
- [코드 인젝션 (Code Injection)](/knowledge/os/code-injection/) - 실행 코드를 주입하여 프로그램의 코드 흐름을 탈취하는 공격의 원리와 방어 기법
- [악성코드 (Malware)](/knowledge/os/malware/) - 시스템을 악용, 무력화, 손상시키도록 설계된 소프트웨어
- [서비스 거부 공격 (Denial of Service)](/knowledge/os/denial-of-service/) - 시스템이나 네트워크의 정당한 사용을 방해하여 서비스를 이용 불가능하게 만드는 공격
- [방화벽 (Firewall)](/knowledge/os/firewall/) - 신뢰할 수 있는 네트워크와 신뢰할 수 없는 네트워크 사이에서 트래픽을 필터링하는 보안 장치
- [침입 방지 시스템 (IPS)](/knowledge/os/intrusion-prevention-system/) - 침입 시도를 탐지하고 차단하는 보안 시스템

## 운영체제 구조

- [모놀리식 구조 (Monolithic Structure)](/knowledge/os/monolithic-structure/) - 단일 주소 공간에서 모든 기능 실행
- [계층적 접근 (Layered Approach)](/knowledge/os/layered-approach/) - 각 계층이 하위 계층만 사용하는 구조
- [마이크로커널 (Microkernel)](/knowledge/os/microkernel/) - 최소 기능만 커널에, 나머지는 사용자 공간에
- [적재 가능 커널 모듈 (Loadable Kernel Modules)](/knowledge/os/loadable-kernel-modules/) - 런타임에 커널 기능 동적 추가
- [하이브리드 시스템 (Hybrid Systems)](/knowledge/os/hybrid-systems/) - 여러 구조의 장점을 결합
- [Darwin](/knowledge/os/darwin/) - macOS/iOS의 Mach + BSD 하이브리드 커널
- [Android 구조 (Android Architecture)](/knowledge/os/android/) - Linux 커널 기반 모바일 OS 스택
- [정책과 메커니즘 (Policy and Mechanism)](/knowledge/os/policy-mechanism/) - '어떻게'와 '무엇을' 분리하는 설계 원칙
- [상주 모니터 (Resident Monitor)](/knowledge/os/resident-monitor/) - 최초의 운영체제 형태, 작업 간 자동 제어 전환
- [THE 시스템 (THE System)](/knowledge/os/the-system/) - 계층 분리와 세마포어 동기화를 사용한 최초의 계층적 시스템
- [객체 관리자 (Object Manager)](/knowledge/os/object-manager/) - Windows 커널의 시스템 자원 통합 관리 컴포넌트
- [ALPC (Advanced Local Procedure Call)](/knowledge/os/alpc/) - Windows에서 동일 머신 내 프로세스 간 고성능 메시지 전달을 위한 IPC 메커니즘
- [APC와 DPC (Asynchronous/Deferred Procedure Call)](/knowledge/os/apc-dpc/) - Windows에서 인터럽트 지연 처리와 스레드별 비동기 작업을 위한 소프트웨어 인터럽트 메커니즘
- [디스패처 객체 (Dispatcher Objects)](/knowledge/os/dispatcher-objects/) - Windows 커널에서 디스패칭과 동기화를 제어하는 커널 객체들의 집합
- [HAL (Hardware Abstraction Layer)](/knowledge/os/hal/) - 하드웨어 칩셋의 차이를 상위 계층으로부터 숨기는 Windows DLL
- [IRQL (Interrupt Request Levels)](/knowledge/os/windows-irql/) - Windows 인터럽트 우선순위 관리 체계
- [Linux 시스템 구조](/knowledge/os/linux-system-architecture/) - 커널, 시스템 라이브러리, 유틸리티의 3계층 모놀리식 구조
- [Mach 운영체제](/knowledge/os/mach-overview/) - 메시지 전달 기반 마이크로커널 운영체제
- [Mach Port](/knowledge/os/mach-port/) - Mach에서 IPC와 객체 참조의 기본 단위인 커널 관리 메시지 큐
- [Mach 메시지와 IPC](/knowledge/os/mach-message-ipc/) - Copy-on-Write 기반 효율적 메시지 전달
- [Mach Task와 Thread](/knowledge/os/mach-task-thread/) - 자원 컨테이너(Task)와 실행 단위(Thread) 분리
- [Mach 메모리 객체](/knowledge/os/mach-memory-object/) - 사용자 수준 외부 메모리 관리자가 페이징을 수행하는 메모리 관리 구조
- [Windows 계층 구조](/knowledge/os/windows-layered-architecture/) - HAL, Kernel, Executive 3계층 모듈형 아키텍처
- [Windows 10 계층 아키텍처](/knowledge/os/windows10-architecture/) - VSM 이중 격리를 제공하는 현대 Windows 아키텍처
- [Windows 커널 디스패처](/knowledge/os/windows-kernel-dispatcher/) - 스레드 스케줄링과 컨텍스트 스위칭을 담당하는 커널 컴포넌트
