---
title: "Storage Area Network"
description: "SAN(Storage Area Network)은 네트워크를 통해 블록 수준의 디스크 접근을 제공하는 고성능 저장소 시스템으로, NFS/SMB와 달리 파일시스템이 아닌 원시 디스크 블록을 전송한다"
tags: ['San', 'Block Storage', 'Iscsi', 'Fibre Channel', 'Network Storage']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/storage-area-network
sidebar:
  order: 25
---

## 핵심 개념

**NFS/SMB와의 차이:** SAN 서버는 파일시스템을 이해할 필요가 없으며, 단지 디스크 블록만 서비스한다. 빠른 읽기/쓰기 접근이 가능하지만, 클러스터 파일시스템 없이는 여러 클라이언트의 동시 접근을 관리할 수 없다.

**블록 vs 파일 수준:** SAN은 블록 디바이스를 제공하므로 클라이언트가 자체 파일시스템을 생성. NFS/SMB는 파일시스템 수준에서 동작하므로 서버가 동시성과 권한을 관리. 클라우드의 블록 스토리지(예: AWS EBS)도 개념적으로 SAN과 유사하다.

**분산 파일시스템 대안:** 빅데이터 프로젝트를 위해 GlusterFS, Ceph 등의 오픈소스 분산 파일시스템이 사용된다. POSIX 호환 파일시스템과 RESTful 객체 스토리지를 노드 클러스터에 분산하여 내결함성을 제공. 둘 다 Red Hat이 상용 버전을 판매한다.

## 예시

```bash
# iSCSI 이니시에이터 설정 (Linux)
sudo apt install open-iscsi
sudo iscsiadm -m discovery -t sendtargets -p san-server
sudo iscsiadm -m node --login

# iSCSI 타겟 확인
sudo iscsiadm -m session

# 연결된 iSCSI 디바이스에 파일시스템 생성
sudo mkfs.ext4 /dev/sdc
sudo mount /dev/sdc /mnt/san-storage
```

## 관련 개념

- [NFS](/knowledge/linux/nfs/)
- [SMB Protocol](/knowledge/linux/smb-protocol/)
- [RAID](/knowledge/linux/raid/)
- [Object Storage](/knowledge/linux/object-storage/)
- [Filesystem](/knowledge/linux/filesystem/)
