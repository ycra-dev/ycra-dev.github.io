---
title: "sysctl (커널 파라미터 설정)"
description: "sysctl은 실행 중인 커널의 파라미터를 동적으로 조회·수정하는 명령어이자 인터페이스로, 재부팅 없이 네트워크, 메모리, 파일시스템 등 커널 동작을 조정할 수 있다"
tags: ['Kernel', 'Tuning', 'Parameters', 'Proc', 'Configuration', 'Performance']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/sysctl
sidebar:
  order: 11
---

## 핵심 개념

Linux에서는 /proc/sys 디렉토리의 특수 파일로 접근하며, sysctl 명령의 변수명은 슬래시를 점으로 대체한다 (예: /proc/sys/net/ipv4/ip_forward → net.ipv4.ip_forward). /etc/sysctl.conf는 부팅 시 읽혀 초기값을 설정한다.

**주요 파라미터**: net.ipv4.ip_forward(패킷 포워딩), net.ipv4.tcp_syncookies(SYN flood 방어), vm.swappiness(스왑 사용 적극성), vm.dirty_ratio(쓰기 버퍼), fs.file-max(최대 파일 디스크립터 수).

**네트워크 보안 관련 파라미터** (Ch.13): /proc/sys/net/ipv4 및 /proc/sys/net/ipv6 디렉토리에 네트워킹 변수가 위치한다. conf 서브디렉토리에는 인터페이스별 설정이 가능하며, all/default 및 각 인터페이스 이름의 디렉토리가 있다. 주요 보안 설정:
- net.ipv4.icmp_echo_ignore_broadcasts: 브로드캐스트 ping 무시 (Smurf 공격 방지)
- net.ipv4.conf.all.accept_redirects: ICMP 리디렉트 거부
- net.ipv4.conf.all.accept_source_route: 소스 라우팅 거부
- net.ipv4.conf.all.rp_filter: uRPF(unicast Reverse Path Forwarding) 활성화

FreeBSD에서도 sysctl로 kern.maxfiles, net.inet.ip.forwarding, net.inet.tcp.blackhole, net.inet.icmp.drop_redirect 등을 조정한다. `sysctl -ad`로 모든 파라미터와 설명을 볼 수 있다. 프로덕션 적용 전 테스트 환경에서 검증해야 하며, 원격 로그인 중 네트워크 변수를 변경할 때는 특히 주의가 필요하다.

## 예시

```bash
# 모든 파라미터 확인
sysctl -a

# 특정 값 확인
sysctl net.ipv4.ip_forward

# 일시적 변경
sudo sysctl -w net.ipv4.ip_forward=1

# 영구 설정 (/etc/sysctl.conf)
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf

# 설정 파일 다시 로드
sudo sysctl -p

# 보안 강화 예시
sudo sysctl -w net.ipv4.tcp_syncookies=1
sudo sysctl -w net.ipv4.conf.all.rp_filter=1
sudo sysctl -w vm.swappiness=10
```

## 관련 개념

- [커널 모듈 (Kernel Module)](/knowledge/linux/kernel-module/)
- [Proc 파일 시스템 (Proc Filesystem)](/knowledge/linux/proc-filesystem/)
- [부트 프로세스 (Boot Process)](/knowledge/linux/boot-process/)
- [IP 포워딩 (IP Forwarding)](/knowledge/linux/ip-forwarding/) - sysctl로 제어하는 IP 포워딩
- [ICMP (인터넷 제어 메시지 프로토콜)](/knowledge/linux/icmp/) - sysctl로 제어하는 ICMP 보안 설정
- [iptables (방화벽 규칙)](/knowledge/linux/iptables/) - sysctl과 함께 사용하는 보안 설정
- [네트워크 인터페이스 (Network Interface)](/knowledge/linux/network-interface/) - 인터페이스별 커널 파라미터
