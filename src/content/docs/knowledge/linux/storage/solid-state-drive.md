---
title: "솔리드 스테이트 드라이브 (Solid State Drive)"
description: "SSD(Solid State Drive)는 플래시 메모리 셀 뱅크에 데이터를 분산하여 읽고 쓰는 저장 장치로, 기계적 움직임이 없어 랜덤 접근 성능이 뛰어나다"
tags: ['Ssd', 'Flash Memory', 'Storage', 'Trim', 'Wear Leveling']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/solid-state-drive
sidebar:
  order: 1
---

## 핵심 개념

SSD는 병렬 처리를 통해 개별적으로 느린 플래시 메모리 셀의 한계를 극복하여 전통적인 HDD의 대역폭을 충족하거나 초과한다. HDD가 순차 전송률은 높지만 랜덤 I/O 성능이 급격히 떨어지는 것과 달리, SSD는 랜덤 읽기/쓰기에서도 일관된 성능을 보인다.

**재기록 제한:** 각 플래시 페이지(일반적으로 4KiB)는 약 100,000회만 재기록 가능하다. SSD 펌웨어의 wear-leveling 알고리즘이 쓰기를 모든 페이지에 분산시켜 특정 페이지의 마모를 방지한다.

**TRIM 명령:** 파일시스템이 SSD에 더 이상 사용하지 않는 블록을 알리는 연산. 이를 통해 SSD가 사전 소거(pre-erased) 페이지 풀을 유지하여 쓰기 성능을 유지한다. TRIM 미지원 시 사전 소거 풀이 고갈되면 쓰기 성능이 크게 저하된다.

**플래시 메모리 유형:** SLC(Single-Level Cell, 가장 빠르고 비쌈), MLC(Multi-Level Cell), TLC(Triple-Level Cell). 실제 신뢰성은 메모리 유형보다 컨트롤러 및 펌웨어 품질에 더 의존한다.

**신뢰성:** Google 데이터센터 연구(2016)에 따르면 가장 신뢰적인 모델에서도 20%의 드라이브가 수정 불가 읽기 오류를 경험했다. SSD 오류는 HDD와 달리 단일 블록에서 고립적으로 발생하며, 체계적 모니터링이 필수적이다.

## 예시

```bash
# SSD에서 TRIM 지원 확인 (Linux)
lsblk --discard

# 수동 TRIM 실행 (fstrim)
sudo fstrim -v /

# ATA Secure Erase로 SSD 초기화
sudo hdparm --user-master u --security-set-pass p /dev/sda
sudo hdparm --user-master u --security-erase p /dev/sda

# SMART 정보 확인
sudo smartctl -a /dev/sda
```

## 관련 개념

- [SMART 모니터링 (SMART Monitoring)](/knowledge/linux/smart-monitoring/)
- [RAID (독립 디스크의 중복 배열)](/knowledge/linux/raid/)
- [파일 시스템 (Filesystem)](/knowledge/linux/filesystem/)
- [SATA 인터페이스 (SATA Interface)](/knowledge/linux/sata-interface/)
