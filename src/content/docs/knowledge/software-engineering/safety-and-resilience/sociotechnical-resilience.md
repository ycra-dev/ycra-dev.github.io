---
title: "Sociotechnical Resilience"
description: "회복탄력성 공학이 기술적 문제가 아닌 사회기술적 활동이라는 관점으로, 하드웨어, 소프트웨어, 사람을 포함한 시스템과 조직의 문화, 정책, 절차를 고려하여 회복탄력성을 설계하는 것이다"
tags: ['Sociotechnical Resilience', 'Human Factors', 'Organizational', 'Adaptive', 'Learning', 'Resilience Engineering']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/software-engineering/sociotechnical-resilience
sidebar:
  order: 11
---

## 핵심 개념

회복탄력적 시스템을 설계하려면 소프트웨어에만 초점을 맞추는 것이 아니라 사회기술적 시스템 설계를 고려해야 한다. 사람은 예상치 못한 상황에 효과적으로 대응하는 독특한 능력을 가지고 있으므로, 모든 문제를 소프트웨어로 해결하려 하지 말고 일부 문제 해결은 시스템을 운영하고 관리하는 사람에게 맡겨야 한다. Hollnagel은 회복탄력적 조직의 네 가지 특성을 제시한다: 대응 능력(위험에 대한 프로세스와 절차 적응), 모니터링 능력(내부 운영과 외부 환경 감시), 예측 능력(미래 이벤트와 변화 예상), 학습 능력(경험에서 배우기). 프로세스 효율성과 문제 관리 사이의 균형이 중요하며, 프로세스 최적화가 문제 대응 능력을 저하시킬 수 있다. 인적 오류에 대해서는 개인 접근법(개인 책임)보다 시스템 접근법(시스템 설계 개선)이 더 효과적이다.

## 예시

Mentcare 시스템에서 기술적 보호 장치(인증, 암호화)만으로는 정당한 사용자의 자격 증명을 가진 공격자를 막을 수 없다. 복잡한 인증 절차를 추가하면 사용자가 인증 정보를 기록하여 취약점을 유발할 수 있다. 더 나은 전략은 로그인 자격 증명을 공유하지 않는 것의 중요성을 강조하고 강력한 비밀번호를 쉽게 만들고 유지하는 방법을 알려주는 조직 정책과 절차를 도입하는 것이다.

## 관련 개념

- [Resilience](/knowledge/software-engineering/resilience/)
- [Sociotechnical Systems](/knowledge/software-engineering/sociotechnical-systems/)
- [Swiss Cheese Model](/knowledge/software-engineering/swiss-cheese-model/)
- [Dependable Processes](/knowledge/software-engineering/dependable-processes/)
- [Resilient Systems Design](/knowledge/software-engineering/resilient-systems-design/)
