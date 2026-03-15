---
title: "루트킷 (Rootkit)"
description: "루트킷은 프로세스, 디스크, 네트워크 활동 등 중요한 시스템 정보를 숨기는 프로그램과 패치의 모음으로, 공격자가 침해된 시스템에서 탐지를 회피하기 위해 사용한다"
tags: ['Security', 'Malware', 'Stealth', 'Intrusion', 'Detection Evasion']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/rootkit
sidebar:
  order: 5
---

## 핵심 개념

가장 교활한 해커들은 자신의 흔적을 감추고 탐지를 피하려 한다. 그들은 종종 침해된 시스템을 불법 소프트웨어 배포, 다른 네트워크 탐색, 다른 시스템 공격 등의 목적으로 계속 사용하길 원한다.

**루트킷의 유형:**
- **애플리케이션 수준**: ls, ps 같은 시스템 명령의 변조된 버전을 설치하여 특정 프로세스나 파일을 숨김
- **커널 모듈 수준**: 커널에 모듈을 삽입하여 탐지가 거의 불가능한 방식으로 시스템 정보를 조작

**탐지 방법:**
- OSSEC 같은 호스트 기반 침입 탐지 소프트웨어
- AIDE 같은 파일 무결성 모니터링(FIM) 도구로 예기치 않은 파일 변경 탐지
- chkrootkit 같은 루트킷 탐지 스크립트

**대응 원칙:**
- 루트킷 제거를 시도하기보다는 데이터를 백업하고 시스템을 완전히 재설치하는 것이 더 효과적
- 가장 진보된 루트킷은 일반적인 제거 프로그램을 인식하고 이를 우회하려 시도
- /etc/passwd에 UID 0인 새로운 로그인을 추가하는 것이 일반적인 백도어 수법

## 예시

```bash
# chkrootkit으로 루트킷 탐지
sudo chkrootkit

# rkhunter로 루트킷 스캔
sudo rkhunter --check

# UID 0인 계정 검사 (백도어 탐지)
awk -F: '$3 == 0 {print $1}' /etc/passwd
# 정상: root만 출력되어야 함

# 파일 무결성 검사 (mtree 사용)
# 베이스라인 생성
mtree -c -p /sbin > /root/sbin_baseline.mtree
# 현재 상태 검증
mtree -p /sbin < /root/sbin_baseline.mtree
```

## 관련 개념

- [침입 탐지 시스템 (Intrusion Detection System)](/knowledge/linux/intrusion-detection-system/) - 루트킷 탐지에 사용되는 IDS 시스템
- [암호화 해시 함수 (Cryptographic Hash Function)](/knowledge/linux/cryptographic-hash/) - 파일 무결성 검증 기술
- [커널 모듈 (Kernel Module)](/knowledge/linux/kernel-module/) - 커널 수준 루트킷의 작동 메커니즘
- [파일 권한 (File Permissions)](/knowledge/linux/file-permissions/) - 시스템 실행 파일 보호
