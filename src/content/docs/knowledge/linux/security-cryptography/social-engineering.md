---
title: "사회 공학 (Social Engineering)"
description: "소셜 엔지니어링은 기술적 취약점이 아닌 인간의 심리적 약점을 이용하여 민감한 정보를 획득하거나 보안을 우회하는 공격 기법이다"
tags: ['Security', 'Phishing', 'Human Factor', 'Attack Vector']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/social-engineering
sidebar:
  order: 2
---

## 핵심 개념

컴퓨터 시스템에서 인간 사용자(그리고 관리자)는 보안 체인에서 가장 약한 고리이다. 아무리 강력한 기술적 보안 조치도 사용자 요소를 완벽히 보호할 수 없다.

소셜 엔지니어링의 주요 형태:
- **피싱(Phishing)**: 기만적인 이메일, 인스턴트 메시지, 문자 메시지 등을 통해 사용자로부터 정보를 수집하거나 악성 소프트웨어를 설치하도록 유도하는 행위
- **스피어 피싱(Spear Phishing)**: 피해자 특정 정보를 포함하여 진정성을 부여하는 표적 공격으로, 일반 피싱보다 방어가 훨씬 어렵다
- **물리적 침투**: 합법적인 유지보수 인력으로 가장하여 네트워크 클로짓에 접근하는 등의 공격

대응 방안:
- 신입 사원 보안 교육 의무화
- 정기적인 조직 전체 보안 커뮤니케이션
- 관리자가 절대 비밀번호를 요청하지 않는다는 정책 수립
- 경영진 승인하에 자체 소셜 엔지니어링 모의 테스트 실시

## 예시

```
# SSH 배너를 통한 보안 경고 설정 (/etc/ssh/sshd_config)
Banner /etc/ssh/banner.txt

# /etc/ssh/banner.txt 내용 예시:
# ============================================
# WARNING: Unauthorized access prohibited.
# All activities may be monitored and recorded.
# Administrators will NEVER ask for your password.
# Report suspicious requests to security@company.com
# ============================================
```

## 관련 개념

- [다중 인증 (Multifactor Authentication)](/knowledge/linux/multifactor-authentication/) - 소셜 엔지니어링에 대한 기술적 방어 수단
- [SSH (보안 셸)](/knowledge/linux/ssh/) - 안전한 원격 접근 프로토콜
- [PAM (장착형 인증 모듈)](/knowledge/linux/pam/) - 인증 모듈을 통한 보안 강화
