---
title: "SMART Monitoring"
description: "SMART(Self-Monitoring, Analysis, and Reporting Technology)는 SATA 디스크에 구현된 자기 진단 및 상태 보고 표준으로, 50개 이상의 운영 매개변수를 호스트 컴퓨터에 노출하여 디스크 장애를 사전에 예측할 수 있게 한다"
tags: ['Smart', 'Disk Monitoring', 'Smartmontools', 'Smartctl', 'Reliability']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/smart-monitoring
sidebar:
  order: 6
---

## 핵심 개념

Google 디스크 드라이브 연구에서 4가지 SMART 매개변수가 장애 예측에 높은 상관관계를 보였다:
1. **Scan Error Count** - 0이 아닌 값이면 60일 내 장애 가능성 39배 증가
2. **Reallocation Count** - 14배 증가
3. **Off-line Reallocation Count** - 21배 증가
4. **Sectors on Probation** - 16배 증가

이 4가지 지표를 모두 고려하면 전체 장애의 약 64%를 예측할 수 있다. 다만 장애 드라이브의 56%는 이 지표에 변화가 없었으므로, SMART만으로 완벽한 예측은 불가능하다.

**smartmontools 패키지:** smartd 데몬이 드라이브를 지속적으로 모니터링하고, smartctl 명령으로 대화형 쿼리 수행. 설정 파일은 /etc/smartd.conf. 기준값을 수집한 뒤 "나쁜" 방향의 급격한 변화를 감지하는 방식으로 동작한다.

**HDD 연간 장애율(AFR):** Google Labs 연구에 따르면 2년 이상 사용된 드라이브의 평균 AFR은 6% 이상. 5년 내 생존 확률 75% 미만. 제조사의 MTBF(평균 고장 간 시간)는 최적 기간의 값만 반영하므로 실제 장애율의 상한선으로 간주해야 한다.

## 예시

```bash
# SMART 지원 여부 및 상태 확인
sudo smartctl -a /dev/sda

# SMART 자가 테스트 실행
sudo smartctl -t short /dev/sda

# 테스트 결과 확인
sudo smartctl -l selftest /dev/sda

# smartd 데몬 설정 (/etc/smartd.conf)
# DEVICESCAN -m admin@example.com -M exec /usr/local/bin/alert

# smartd 서비스 활성화
sudo systemctl enable smartd
sudo systemctl start smartd
```

## 관련 개념

- [Solid State Drive](/knowledge/linux/solid-state-drive/)
- [RAID](/knowledge/linux/raid/)
- [Device File](/knowledge/linux/device-file/)
