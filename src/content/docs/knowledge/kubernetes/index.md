---
title: "Kubernetes"
description: "쿠버네티스 컨테이너 오케스트레이션 개념 정리"
tags: ["Kubernetes", "MOC"]
created: 2026-02-12
updated: 2026-03-11
draft: false
slug: knowledge/kubernetes
sidebar:
  order: 0
---

## Cluster Architecture (클러스터 아키텍처)

- [쿠버네티스 (Kubernetes)](/knowledge/kubernetes/kubernetes/) - 쿠버네티스는 컨테이너화된 애플리케이션의 배포와 관리를 자동화하는 오픈소스 소프트웨어 시스템이다
- [마이크로서비스 아키텍처 (Microservices Architecture)](/knowledge/kubernetes/microservices/) - 마이크로서비스 아키텍처는 하나의 대규모 모놀리식 애플리케이션을 수십에서 수백 개의 독립적인 소규모 서비스로 분리하여 개발, 배포, 운영하는 소프트웨어 아키텍처 패턴이다
- [선언적 모델 (Declarative Model)](/knowledge/kubernetes/declarative-model/) - 쿠버네티스의 선언적 모델(Declarative Model)은 사용자가 시스템의 원하는 상태(desired state)를 기술하면 쿠버네티스가 현재 상태를 원하는 상태에 맞추어 자동으로 조정하는 방식이다
- [컨트롤 플레인 (Control Plane)](/knowledge/kubernetes/control-plane/) - Control Plane은 Kubernetes 클러스터 전체를 제어하는 두뇌 역할을 하는 컴포넌트들의 집합이다
- [쿠버네티스 API 서버 (Kubernetes API Server)](/knowledge/kubernetes/api-server/) - Kubernetes API Server는 RESTful Kubernetes API를 외부에 노출하는 Control Plane의 핵심 컴포넌트이다
- [etcd](/knowledge/kubernetes/etcd/) - etcd는 Kubernetes 클러스터의 모든 API 객체를 영구적으로 저장하는 분산 키-값 데이터스토어이다
- [쿠버네티스 스케줄러 (Kubernetes Scheduler)](/knowledge/kubernetes/scheduler/) - Kubernetes Scheduler는 새로 생성된 Pod를 어떤 워커 노드에서 실행할지 결정하는 Control Plane의 특수한 컨트롤러이다
- [워크로드 플레인 (Workload Plane)](/knowledge/kubernetes/workload-plane/) - Workload Plane(워크로드 플레인)은 사용자의 애플리케이션(워크로드)이 실제로 실행되는 워커 노드들의 집합이다
- [Kubelet](/knowledge/kubernetes/kubelet/) - Kubelet은 각 워커 노드에서 실행되는 Kubernetes 에이전트로, API Server와 통신하며 해당 노드에 할당된 애플리케이션의 실행과 상태 보고를 담당한다
- [Kube Proxy](/knowledge/kubernetes/kube-proxy/) - Kube Proxy(Kubernetes Service Proxy)는 각 워커 노드에서 실행되는 컴포넌트로, 애플리케이션 인스턴스 간의 네트워크 트래픽을 로드 밸런싱하는 역할을 담당한다
- [수평 확장 (Horizontal Scaling)](/knowledge/kubernetes/horizontal-scaling/) - 수평 확장(Horizontal Scaling)은 애플리케이션의 인스턴스(복제본) 수를 늘리거나 줄여 시스템의 처리 용량을 조절하는 방식이다

## Containers (컨테이너)

- [컨테이너 (Container)](/knowledge/kubernetes/container/) - 컨테이너는 호스트 운영체제 내에서 실행되는 격리된 프로세스이다
- [컨테이너 이미지 (Container Image)](/knowledge/kubernetes/container-image/) - 컨테이너 이미지는 애플리케이션과 그 환경(라이브러리, 의존성, OS 파일시스템 전체)을 하나의 휴대 가능한 패키지로 묶은 것이다
- [이미지 레이어 (Image Layer)](/knowledge/kubernetes/image-layer/) - 이미지 레이어(Image Layer)는 컨테이너 이미지를 구성하는 읽기 전용(read-only)의 파일시스템 변경분이다
- [컨테이너 레지스트리 (Container Registry)](/knowledge/kubernetes/container-registry/) - 컨테이너 레지스트리는 컨테이너 이미지를 저장하고 배포하기 위한 저장소(repository)이다
- [Dockerfile](/knowledge/kubernetes/dockerfile/) - Dockerfile은 Docker가 컨테이너 이미지를 빌드할 때 실행할 명령어(directive) 목록을 담은 텍스트 파일이다
- [리눅스 네임스페이스 (Linux Namespaces)](/knowledge/kubernetes/linux-namespaces/) - Linux Namespaces는 각 프로세스가 시스템의 독립적인 뷰(view)를 갖도록 보장하는 Linux 커널 기능이다
- [Cgroups (컨트롤 그룹)](/knowledge/kubernetes/cgroups/) - Linux Control Groups(cgroups)는 프로세스 또는 프로세스 그룹의 CPU, 메모리, 디스크, 네트워크 대역폭과 같은 시스템 리소스 사용량을 제한, 계측, 격리하는 Linux 커널 기능이다
- [Copy-on-Write](/knowledge/kubernetes/copy-on-write/) - Copy-on-Write(CoW)는 컨테이너 파일시스템에서 사용되는 메커니즘으로, 여러 컨테이너가 동일한 이미지 레이어(읽기 전용)를 공유하면서도 각자 독립적인 파일시스템 뷰를 제공한다
- [컨테이너 런타임 인터페이스 (Container Runtime Interface)](/knowledge/kubernetes/container-runtime-interface/) - Container Runtime Interface(CRI)는 Kubernetes가 다양한 컨테이너 런타임을 지원할 수 있도록 정의된 표준 인터페이스이다
- [Seccomp (보안 컴퓨팅 모드)](/knowledge/kubernetes/seccomp/) - Seccomp(Secure Computing Mode)는 프로그램이 수행할 수 있는 시스템 콜(sys-calls)을 개별적으로 필터링할 수 있게 하는 Linux 커널 보안 기능이다

## API & Tools (API 및 도구)

- [쿠버네티스 API (Kubernetes API)](/knowledge/kubernetes/kubernetes-api/) - Kubernetes API는 클러스터와 상호작용하기 위한 HTTP 기반 RESTful API이다
- [오브젝트 매니페스트 (Object Manifest)](/knowledge/kubernetes/object-manifest/) - Object Manifest(객체 매니페스트)는 Kubernetes API 객체의 구조화된 텍스트 표현으로, YAML 또는 JSON 형식으로 작성된다
- [스펙과 상태 (Spec and Status)](/knowledge/kubernetes/spec-and-status/) - Spec과 Status는 대부분의 Kubernetes API 객체가 가진 두 핵심 섹션이다
- [컨트롤러 (Controller)](/knowledge/kubernetes/controller/) - Controller(컨트롤러)는 Kubernetes Control Plane에서 실행되며 API 객체를 관찰하고, 객체의 Spec에 기술된 원하는 상태를 실현하기 위한 작업을 수행하고, 실제 상태를 Status에 보고하는 컴포넌트이다
- [이벤트 객체 (Event Object)](/knowledge/kubernetes/event-object/) - Event Object는 Kubernetes 클러스터에서 발생하는 사건을 기록하는 API 객체이다
- [상태 조건 (Status Conditions)](/knowledge/kubernetes/status-conditions/) - Status Conditions는 Kubernetes 객체의 상태(status) 섹션에 포함된 조건 목록으로, 객체가 현재 처해 있는 여러 상태를 독립적으로(직교적으로, orthogonally) 표현한다
- [필드 셀렉터 (Field Selector)](/knowledge/kubernetes/field-selector/) - Field Selector(필드 선택기)는 Kubernetes API에서 특정 필드 값을 기준으로 객체를 필터링하는 메커니즘이다
- [kubectl](/knowledge/kubernetes/kubectl/) - kubectl(kube-control)은 Kubernetes 클러스터와 상호작용하기 위한 공식 커맨드라인 도구(CLI)이다
- [kubectl apply](/knowledge/kubernetes/kubectl-apply/) - `kubectl apply`는 YAML 또는 JSON 매니페스트 파일을 Kubernetes API에 제출하여 오브젝트를 생성하거나 기존 오브젝트를 업데이트하는 선언적(declarative) 명령어이다
- [kubectl exec](/knowledge/kubernetes/kubectl-exec/) - `kubectl exec`는 실행 중인 컨테이너 내부에서 임의의 명령을 원격으로 실행할 수 있게 해주는 kubectl 명령어로, 디버깅과 컨테이너 환경 탐색에 주로 사용된다
- [kubectl port-forward](/knowledge/kubernetes/kubectl-port-forward/) - `kubectl port-forward`는 로컬 컴퓨터의 네트워크 포트를 특정 Pod의 포트로 프록시 연결하여, 개발 및 디버깅 시 Pod 내 애플리케이션과 직접 통신할 수 있게 해주는 명령어이다

## Pods (파드)

- [파드 (Pod)](/knowledge/kubernetes/pod/) - Pod는 Kubernetes에서 배포의 가장 작은 단위로, 하나 이상의 밀접하게 관련된 컨테이너의 그룹이다
- [사이드카 컨테이너 (Sidecar Container)](/knowledge/kubernetes/sidecar-container/) - Sidecar Container는 Pod 내에서 주 컨테이너(primary container)의 기능을 보완하는 보조 컨테이너로, 오토바이의 사이드카처럼 주 프로세스와 함께 동작하면서 추가적인 기능을 제공한다
- [초기화 컨테이너 (Init Container)](/knowledge/kubernetes/init-container/) - Init Container는 Pod의 주 컨테이너(main container)가 시작되기 전에 순차적으로 실행되는 특수한 컨테이너로, Pod의 초기화 작업을 수행한다
- [파드 네트워킹 (Pod Networking)](/knowledge/kubernetes/pod-networking/) - Pod Networking은 Pod 내부 컨테이너 간 및 Pod 간의 네트워크 통신 구조를 말하며, 같은 Pod의 컨테이너들은 Network namespace를 공유하여 동일한 IP 주소와 포트 공간을 사용한다
- [컨테이너 포트 (Container Port)](/knowledge/kubernetes/container-port/) - Container Port는 Pod 매니페스트에서 컨테이너가 수신 대기하는 네트워크 포트를 선언하는 필드로, 순전히 정보 제공 목적이지만 서비스를 통한 노출 시 포트 이름 참조에 활용된다
- [컨테이너 로깅 (Container Logging)](/knowledge/kubernetes/container-logging/) - Container Logging은 컨테이너화된 애플리케이션이 표준 출력(stdout)과 표준 에러(stderr)에 쓰는 로그를 컨테이너 런타임이 캡처하여 저장하고, `kubectl logs` 명령으로 조회할 수 있게 하는 메커니즘이다
- [이미지 풀 정책 (Image Pull Policy)](/knowledge/kubernetes/image-pull-policy/) - Image Pull Policy는 컨테이너 이미지를 워커 노드로 다운로드하는 시기와 조건을 결정하는 정책으로, 컨테이너가 생성(또는 재시작)될 때마다 적용된다
- [파드 페이즈 (Pod Phase)](/knowledge/kubernetes/pod-phase/) - Pod Phase는 Pod의 생명 주기에서 현재 위치를 나타내는 상위 수준의 상태 정보로, Pending, Running, Succeeded, Failed, Unknown 중 하나의 값을 가진다
- [파드 컨디션 (Pod Conditions)](/knowledge/kubernetes/pod-conditions/) - Pod Conditions는 Pod가 특정 상태에 도달했는지 여부와 그 이유를 나타내는 조건 목록으로, Pod phase보다 더 세밀한 상태 정보를 제공한다
- [라이브니스 프로브 (Liveness Probe)](/knowledge/kubernetes/liveness-probe/) - Liveness Probe는 컨테이너 내 애플리케이션이 정상적으로 동작하고 있는지 주기적으로 확인하는 메커니즘으로, 프로브가 실패하면 컨테이너를 비정상으로 판단하여 재시작한다
- [레디니스 프로브 (Readiness Probe)](/knowledge/kubernetes/readiness-probe/) - Readiness Probe는 컨테이너가 트래픽을 수신할 준비가 되었는지 주기적으로 확인하는 메커니즘으로, 실패 시 해당 파드를 서비스 엔드포인트에서 제거하여 준비되지 않은 파드로의 트래픽 전달을 방지한다
- [스타트업 프로브 (Startup Probe)](/knowledge/kubernetes/startup-probe/) - Startup Probe는 컨테이너 내 애플리케이션이 완전히 시작되었는지 확인하는 프로브로, 시작에 오랜 시간이 걸리는 애플리케이션이 Liveness Probe에 의해 조기 재시작되는 것을 방지한다
- [재시작 정책 (Restart Policy)](/knowledge/kubernetes/restart-policy/) - Restart Policy는 Pod 수준에서 설정되는 컨테이너 재시작 정책으로, 컨테이너가 종료될 때 자동으로 재시작할지 여부와 조건을 결정한다
- [Post-Start 훅 (Post-Start Hook)](/knowledge/kubernetes/post-start-hook/) - Post-Start Hook은 컨테이너가 생성된 직후 실행되는 생명 주기 훅(lifecycle hook)으로, 메인 프로세스와 비동기적으로 실행되어 추가적인 초기화 작업이나 알림 기능을 수행한다
- [Pre-Stop 훅 (Pre-Stop Hook)](/knowledge/kubernetes/pre-stop-hook/) - Pre-Stop Hook은 컨테이너가 종료되기 직전에 실행되는 생명 주기 훅으로, 애플리케이션의 정상적인(graceful) 종료 절차를 수행하거나 추가적인 정리 작업을 실행한다
- [종료 유예 기간 (Termination Grace Period)](/knowledge/kubernetes/termination-grace-period/) - Termination Grace Period는 컨테이너가 자발적으로 종료할 수 있도록 주어지는 유예 시간으로, 이 시간이 경과하면 프로세스가 KILL 시그널로 강제 종료된다

## Workload Controllers (워크로드 컨트롤러)

- [레플리카셋 (ReplicaSet)](/knowledge/kubernetes/replicaset/) - ReplicaSet은 동일한 Pod 복제본(replica) 그룹을 나타내는 Kubernetes API 오브젝트로, Pod 템플릿과 원하는 복제본 수, 레이블 셀렉터를 지정하여 Pod를 자동으로 생성하고 관리한다
- [조정 제어 루프 (Reconciliation Control Loop)](/knowledge/kubernetes/reconciliation-control-loop/) - Reconciliation Control Loop(조정 제어 루프)는 Kubernetes 컨트롤러가 원하는 상태와 실제 상태를 지속적으로 비교하고, 차이가 있으면 실제 상태를 원하는 상태로 맞추는 제어 패턴이다
- [레플리카 (Replica)](/knowledge/kubernetes/replica/) - Replica(복제본)는 동일한 Pod 템플릿에서 생성된 Pod의 각 인스턴스를 의미한다
- [파드 소유권과 가비지 컬렉션 (Pod Ownership and Garbage Collection)](/knowledge/kubernetes/pod-ownership-and-garbage-collection/) - Kubernetes에서 소유권(ownership)은 오브젝트 간의 종속 관계를 나타내며, 소유자(owner) 오브젝트가 삭제되면 가비지 컬렉터(garbage collector)가 종속(dependent) 오브젝트를 자동으로 삭제하는 메커니즘이다
- [레플리카셋 스케일링 (ReplicaSet Scaling)](/knowledge/kubernetes/replicaset-scaling/) - ReplicaSet 스케일링은 ReplicaSet의 `replicas` 필드 값을 변경하여 Pod 복제본 수를 늘리거나(scale up) 줄이는(scale down) 작업이다
- [레플리카셋 파드 템플릿 업데이트 (ReplicaSet Pod Template Update)](/knowledge/kubernetes/replicaset-pod-template-update/) - ReplicaSet의 Pod 템플릿을 변경하면 이후 새로 생성되는 Pod에만 적용되며, 기존 실행 중인 Pod에는 영향을 주지 않는 특성으로, 이것이 ReplicaSet 대신 Deployment를 사용하는 주된 이유이다
- [레플리카셋 파드 제거를 통한 디버깅 (ReplicaSet Pod Removal for Debugging)](/knowledge/kubernetes/replicaset-pod-removal-for-debugging/) - ReplicaSet에서 문제가 있는 Pod의 레이블을 변경하여 ReplicaSet의 관리 범위에서 분리하는 기법으로, 컨트롤러가 새 Pod를 자동 생성하면서 기존 문제 Pod를 디버깅용으로 보존할 수 있다
- [레플리카셋 노드 장애 처리 (ReplicaSet Node Failure Handling)](/knowledge/kubernetes/replicaset-node-failure-handling/) - ReplicaSet의 노드 장애 처리는 클러스터 노드가 응답하지 않을 때 해당 노드의 Pod를 다른 정상 노드에 자동으로 재생성하여 서비스 가용성을 유지하는 메커니즘이다
- [디플로이먼트 (Deployment)](/knowledge/kubernetes/deployment/) - Deployment는 Kubernetes에서 애플리케이션 배포를 나타내는 API 객체이다
- [Recreate 전략 (Recreate Strategy)](/knowledge/kubernetes/recreate-strategy/) - Recreate 전략은 Deployment의 업데이트 전략 중 하나로, 모든 기존 Pod를 동시에 삭제한 후 새 버전의 Pod를 동시에 생성하는 방식이며, 업데이트 중 서비스가 일시적으로 중단된다
- [롤링 업데이트 전략 (RollingUpdate Strategy)](/knowledge/kubernetes/rolling-update-strategy/) - RollingUpdate 전략은 Deployment의 기본 업데이트 전략으로, 기존 Pod를 점진적으로 제거하면서 동시에 새 Pod를 생성하여 서비스 중단 없이 업데이트를 수행하는 방식이다
- [디플로이먼트 롤백 (Deployment Rollback)](/knowledge/kubernetes/deployment-rollback/) - Deployment 롤백은 결함이 있는 버전의 배포를 이전 버전으로 되돌리는 기능으로, Deployment의 리비전 히스토리(이전 ReplicaSet들)를 활용하여 특정 리비전으로 복원할 수 있다
- [minReadySeconds](/knowledge/kubernetes/minreadyseconds/) - `minReadySeconds`는 새로 생성된 Pod가 사용 가능(available)으로 간주되기 위해 ready 상태를 유지해야 하는 최소 시간(초)을 지정하는 필드로, 결함 있는 버전의 전파를 방지한다
- [파드 템플릿 해시 (Pod Template Hash)](/knowledge/kubernetes/pod-template-hash/) - `pod-template-hash`는 Deployment가 생성하는 ReplicaSet과 Pod에 자동으로 추가되는 레이블로, Pod 템플릿의 내용에서 계산된 해시 값이며, 서로 다른 리비전의 ReplicaSet과 Pod를 구분하는 데 사용된다
- [디플로이먼트 스케일링 함정 (Deployment Scaling Pitfall)](/knowledge/kubernetes/deployment-scaling-pitfall/) - Deployment 매니페스트를 재적용할 때 `replicas` 필드가 포함되어 있으면 현재 스케일 설정을 의도치 않게 덮어쓸 수 있는 문제로, 프로덕션 환경에서 서비스 장애를 유발할 수 있다
- [카나리 디플로이먼트 (Canary Deployment)](/knowledge/kubernetes/canary-deployment/) - Canary Deployment는 새 버전의 애플리케이션을 안정 버전과 함께 배포하되, 트래픽의 일부만 새 버전으로 전달하여 전체 사용자에게 영향을 주기 전에 문제를 발견하는 배포 패턴이다
- [스테이트풀셋 (StatefulSet)](/knowledge/kubernetes/statefulset/) - StatefulSet은 상태를 유지해야 하는(stateful) 워크로드를 위한 Kubernetes API 오브젝트로, 각 Pod에 고유한 정체성(이름, 네트워크 ID, 스토리지)을 부여하고, Pod가 재생성되어도 동일한 정체성과 영구 스토리지를 유지한다
- [스테이트풀셋을 위한 헤드리스 서비스 (Headless Service for StatefulSet)](/knowledge/kubernetes/headless-service-for-statefulset/) - StatefulSet과 연결된 Headless Service는 각 Pod에 개별 DNS 레코드를 생성하여 안정적인 네트워크 정체성을 부여하는 서비스로, ClusterIP가 None으로 설정되며 개별 Pod의 IP 주소를 직접 해석(resolve)할 수 있게 한다
- [스테이트풀셋 최대 하나 시맨틱스 (StatefulSet At-Most-One Semantics)](/knowledge/kubernetes/statefulset-at-most-one-semantics/) - StatefulSet의 at-most-one 보장은 동일한 정체성(이름, 스토리지)을 가진 두 개의 Pod가 동시에 실행되지 않도록 보장하는 메커니즘으로, 노드 장애 시 ReplicaSet과 다른 보수적인 대응 방식을 채택한다
- [스테이트풀셋 스케일링과 PVC 보존 (StatefulSet Scaling and PVC Retention)](/knowledge/kubernetes/statefulset-scaling-and-pvc/) - StatefulSet의 스케일링은 Deployment와 달리 각 Pod에 고유한 PersistentVolumeClaim이 연결되며, 스케일 다운 시 Pod는 삭제되지만 PVC는 기본적으로 보존되어 나중에 스케일 업 시 재사용할 수 있다
- [스테이트풀셋 업데이트 전략 (StatefulSet Update Strategies)](/knowledge/kubernetes/statefulset-update-strategies/) - StatefulSet은 RollingUpdate와 OnDelete 두 가지 업데이트 전략을 지원하며, RollingUpdate에서는 Partition 기능을 통해 특정 ordinal 이상의 Pod만 선택적으로 업데이트할 수 있는 독특한 기능을 제공한다
- [스테이트풀 워크로드 요구사항 (Stateful Workload Requirements)](/knowledge/kubernetes/stateful-workload-requirements/) - 상태 유지 워크로드(stateful workload)는 재시작이나 재배치 시에도 상태를 보존해야 하는 소프트웨어로, 각 복제본에 전용 스토리지와 안정적인 네트워크 주소가 필요하며, Deployment로는 이러한 요구사항을 충족할 수 없다
- [쿠버네티스 오퍼레이터 패턴 (Kubernetes Operator Pattern)](/knowledge/kubernetes/kubernetes-operator-pattern/) - Kubernetes Operator는 특정 애플리케이션의 운영 지식을 코드로 구현한 커스텀 컨트롤러로, CustomResourceDefinition(CRD)을 통해 Kubernetes API를 확장하고 복잡한 상태 유지 워크로드의 생명주기를 자동으로 관리한다
- [데몬셋 (DaemonSet)](/knowledge/kubernetes/daemonset/) - DaemonSet은 클러스터의 각 노드(또는 선택된 노드 집합)에 정확히 하나의 Pod 복제본을 실행하도록 보장하는 Kubernetes API 오브젝트로, 로그 수집, 모니터링, 네트워크 관리 등 노드 수준 시스템 서비스를 배포하는 데 사용된다
- [데몬셋 노드 셀렉터 (DaemonSet Node Selector)](/knowledge/kubernetes/daemonset-node-selector/) - DaemonSet의 Node Selector는 Pod 템플릿의 `nodeSelector` 필드를 사용하여 특정 레이블을 가진 노드에만 daemon Pod를 배포하도록 제한하는 기능으로, 특수 하드웨어를 가진 노드나 특정 역할의 노드에만 에이전트를 배포할 때 사용한다
- [데몬셋 업데이트 전략 (DaemonSet Update Strategies)](/knowledge/kubernetes/daemonset-update-strategies/) - DaemonSet은 RollingUpdate와 OnDelete 두 가지 업데이트 전략을 지원하며, RollingUpdate의 기본 설정은 maxSurge=0, maxUnavailable=1로 한 번에 한 노드씩 기존 Pod를 삭제 후 새 Pod를 생성하는 방식이다
- [호스트 네트워크와 특권 컨테이너 (Host Network and Privileged Containers)](/knowledge/kubernetes/host-network-and-privileged-containers/) - DaemonSet Pod는 노드의 리소스에 대한 특별한 접근이 필요할 수 있으며, `hostNetwork`, `hostPort`, `privileged` 설정, 그리고 capabilities를 통해 노드의 네트워크, 파일시스템, 커널에 대한 접근 수준을 제어할 수 있다
- [프라이어리티 클래스 (Priority Class)](/knowledge/kubernetes/priority-class/) - PriorityClass는 Pod의 중요도를 나타내는 Kubernetes 오브젝트로, 높은 우선순위의 Pod가 리소스 부족 시 낮은 우선순위의 Pod를 축출(preempt)할 수 있게 하며, 특히 DaemonSet의 시스템 중요 Pod에 사용된다
- [로컬 데몬 통신 (Local Daemon Communication)](/knowledge/kubernetes/local-daemon-communication/) - 로컬 데몬 통신은 클라이언트 Pod가 동일한 노드에서 실행 중인 데몬 Pod에만 연결하도록 보장하는 패턴으로, hostPort, hostNetwork, 또는 internalTrafficPolicy가 Local인 Service를 통해 구현할 수 있다
- [잡 (Job)](/knowledge/kubernetes/job/) - Job은 유한(finite) 작업을 실행하기 위한 Kubernetes API 오브젝트로, 하나 이상의 Pod를 생성하여 작업을 완료까지 실행하며, Pod가 성공적으로 종료되면 Job이 완료된 것으로 간주한다
- [잡 완료 횟수와 병렬성 (Job Completions and Parallelism)](/knowledge/kubernetes/job-completions-and-parallelism/) - Job의 `completions`와 `parallelism` 필드는 작업이 몇 번 완료되어야 하는지, 그리고 동시에 몇 개의 Pod를 실행할 수 있는지를 제어하며, 이 두 필드의 조합으로 순차 실행, 병렬 실행, 워크 큐 처리 등 다양한 패턴을 구현할 수 있다
- [잡 실패 처리 (Job Failure Handling)](/knowledge/kubernetes/job-failure-handling/) - Job의 실패 처리는 Pod 수준(restartPolicy에 의한 컨테이너 재시작)과 Job 수준(Job 컨트롤러에 의한 새 Pod 생성)의 두 단계로 이루어지며, `backoffLimit`과 `activeDeadlineSeconds`로 무한 실패를 방지한다
- [인덱스드 잡 완료 모드 (Indexed Job Completion Mode)](/knowledge/kubernetes/indexed-job-completion-mode/) - Indexed completion mode는 Job의 각 Pod에 고유한 완료 인덱스(0부터 시작)를 부여하여 각 Pod가 서로 다른 작업을 수행할 수 있게 하는 Job 모드이다
- [잡 워크 큐 패턴 (Job Work Queue Pattern)](/knowledge/kubernetes/job-work-queue-pattern/) - Job Work Queue 패턴은 외부 큐에서 작업 항목을 가져와 처리하는 방식으로, 정적으로 할당된 작업 대신 동적으로 작업을 분배하며, Coarse(각 Pod가 하나의 항목 처리)와 Fine(각 Pod가 여러 항목 처리) 두 가지 접근 방식이 있다
- [잡 파드 통신 (Job Pod Communication)](/knowledge/kubernetes/job-pod-communication/) - Job Pod 간 통신은 Indexed completion mode, Headless Service, 그리고 Pod 템플릿의 `subdomain` 설정을 결합하여 구현하며, 각 Pod가 예측 가능한 DNS 이름으로 다른 Pod에 접근할 수 있게 한다
- [크론잡 (CronJob)](/knowledge/kubernetes/cronjob/) - CronJob은 crontab 형식의 스케줄에 따라 Job을 주기적으로 생성하는 Kubernetes API 오브젝트로, 특정 시간이나 정기적인 간격으로 유한 작업을 자동 실행할 수 있게 한다

## Services & Networking (서비스/네트워킹)

- [서비스 (Service)](/knowledge/kubernetes/service/) - Kubernetes Service는 하나 이상의 Pod에 대한 단일 통신 진입점을 제공하는 API 객체이다
- [클러스터IP 서비스 (ClusterIP Service)](/knowledge/kubernetes/clusterip-service/) - ClusterIP Service는 Kubernetes의 기본 서비스 타입으로, 클러스터 내부에서만 접근 가능한 안정적인 가상 IP 주소를 제공하여 여러 파드에 대한 로드 밸런싱과 서비스 디스커버리를 수행한다
- [서비스 DNS 디스커버리 (Service DNS Discovery)](/knowledge/kubernetes/service-dns-discovery/) - Service DNS Discovery는 클러스터 내부 DNS(보통 CoreDNS)를 통해 서비스 이름을 IP 주소로 해석하는 메커니즘으로, 파드가 서비스의 클러스터 IP를 직접 알 필요 없이 이름만으로 접근할 수 있게 한다
- [노드포트 서비스 (NodePort Service)](/knowledge/kubernetes/nodeport-service/) - NodePort Service는 ClusterIP의 확장으로, 클러스터의 모든 노드에서 특정 포트(30000-32767)를 통해 서비스에 접근할 수 있게 하여 외부 클라이언트가 노드 IP와 포트로 서비스에 도달할 수 있게 하는 서비스 타입이다
- [노드포트 (NodePort)](/knowledge/kubernetes/node-port/) - NodePort는 Kubernetes Service의 한 유형이자 메커니즘으로, 클러스터의 모든 워커 노드에서 특정 포트를 열어 외부 트래픽이 Service에 접근할 수 있게 한다
- [로드밸런서 서비스 (LoadBalancer Service)](/knowledge/kubernetes/loadbalancer-service/) - LoadBalancer Service는 Kubernetes Service의 한 유형으로, 클라우드 인프라에 외부 로드 밸런서를 프로비저닝하여 애플리케이션을 공개 IP 주소를 통해 외부에 노출하는 방식이다
- [헤드리스 서비스 (Headless Service)](/knowledge/kubernetes/headless-service/) - Headless Service는 `clusterIP: None`으로 설정하여 클러스터 IP를 할당받지 않고, DNS 조회 시 서비스 IP 대신 백엔드 파드들의 개별 IP를 직접 반환하는 특수한 서비스 타입이다
- [익스터널네임 서비스 (ExternalName Service)](/knowledge/kubernetes/externalname-service/) - ExternalName Service는 DNS CNAME 레코드를 생성하여, 클러스터 내부의 서비스 이름을 외부 도메인 이름으로 매핑하는 서비스 타입으로, 클러스터 IP 없이 DNS 수준에서만 동작한다
- [엔드포인트 오브젝트 (Endpoints Object)](/knowledge/kubernetes/endpoints-object/) - Endpoints 오브젝트는 서비스의 백엔드 파드 IP와 포트 목록을 저장하는 Kubernetes API 오브젝트로, 서비스와 동일한 이름을 가지며 레이블 셀렉터에 매칭되는 파드가 변경될 때 자동으로 업데이트된다
- [외부 트래픽 정책 (External Traffic Policy)](/knowledge/kubernetes/external-traffic-policy/) - External Traffic Policy는 NodePort나 LoadBalancer 서비스에서 외부 트래픽이 도착했을 때 해당 노드의 로컬 파드로만 전달할지(Local), 클러스터 전체의 파드로 전달할지(Cluster)를 결정하는 서비스 설정이다
- [세션 어피니티 (Session Affinity)](/knowledge/kubernetes/session-affinity/) - Session Affinity는 Kubernetes 서비스에서 동일한 클라이언트의 연속적인 연결을 동일한 백엔드 파드로 전달하는 메커니즘으로, 서비스 수준에서는 `ClientIP` 기반만 지원하고, Ingress 수준에서는 쿠키 기반도 지원한다
- [인그레스 (Ingress)](/knowledge/kubernetes/ingress/) - Ingress는 클러스터 외부에서 내부 서비스로의 HTTP/HTTPS 트래픽을 관리하는 Kubernetes API 오브젝트로, 호스트 이름과 URL 경로 기반의 라우팅 규칙을 정의하여 단일 IP로 여러 서비스를 노출할 수 있다
- [인그레스 컨트롤러 (Ingress Controller)](/knowledge/kubernetes/ingress-controller/) - Ingress Controller는 Kubernetes API를 감시하여 Ingress, Service, Endpoints 오브젝트의 변경을 감지하고, 이를 기반으로 L7 로드 밸런서(리버스 프록시)를 프로비저닝하고 설정하는 클러스터 애드온 컴포넌트이다
- [인그레스클래스 (IngressClass)](/knowledge/kubernetes/ingressclass/) - IngressClass는 Ingress 오브젝트가 어떤 Ingress Controller에 의해 처리되어야 하는지를 지정하는 Kubernetes API 오브젝트로, 클러스터에 여러 Ingress Controller가 설치된 경우 라우팅을 분류하는 데 사용된다
- [인그레스 경로 라우팅 (Ingress Path Routing)](/knowledge/kubernetes/ingress-path-routing/) - Ingress Path Routing은 HTTP 요청의 URL 경로를 기준으로 서로 다른 백엔드 서비스로 트래픽을 라우팅하는 Ingress 규칙으로, `Exact`, `Prefix`, `ImplementationSpecific` 세 가지 경로 매칭 타입을 지원한다
- [인그레스 가상 호스팅 (Ingress Virtual Hosting)](/knowledge/kubernetes/ingress-virtual-hosting/) - Ingress Virtual Hosting은 HTTP 요청의 `Host` 헤더를 기반으로 단일 IP 주소에서 여러 도메인의 트래픽을 서로 다른 백엔드 서비스로 라우팅하는 Ingress의 핵심 기능이다
- [인그레스 TLS (Ingress TLS)](/knowledge/kubernetes/ingress-tls/) - Ingress TLS는 Kubernetes Secret에 저장된 TLS 인증서와 키를 Ingress 오브젝트에 연결하여, 클라이언트와 프록시 간의 HTTPS 통신을 지원하는 설정이다
- [인그레스 기본 백엔드 (Ingress Default Backend)](/knowledge/kubernetes/ingress-default-backend/) - Ingress Default Backend은 Ingress의 어떤 규칙에도 매칭되지 않는 요청을 처리하는 폴백(fallback) 서비스로, 매칭되지 않는 요청을 별도의 서비스로 전달할 수 있다
- [인그레스 어노테이션 설정 (Ingress Annotations Configuration)](/knowledge/kubernetes/ingress-annotations/) - Ingress Annotations Configuration은 Ingress 오브젝트의 표준 스펙으로 표현할 수 없는 컨트롤러별 고급 설정(세션 어피니티, URL 재작성, CORS, HTTP 인증 등)을 어노테이션을 통해 전달하는 방법이다

## Storage (스토리지)

- [볼륨 (Volume)](/knowledge/kubernetes/volume/) - Volume은 Pod에 정의되어 컨테이너의 파일 시스템에 마운트되는 스토리지 단위로, 컨테이너 재시작 시 데이터를 보존하거나 Pod 내 여러 컨테이너 간에 파일을 공유하는 데 사용된다
- [emptyDir 볼륨 (emptyDir Volume)](/knowledge/kubernetes/emptydir-volume/) - emptyDir Volume은 Pod가 시작될 때 빈 디렉터리로 생성되어 Pod의 수명 동안 데이터를 저장하는 가장 기본적인 볼륨 유형으로, Pod가 삭제되면 데이터도 함께 삭제된다
- [볼륨 마운트 (Volume Mount)](/knowledge/kubernetes/volume-mount/) - Volume Mount는 Pod에 정의된 볼륨을 컨테이너의 파일 시스템 내 특정 경로에 연결하는 설정으로, 컨테이너 정의의 `volumeMounts` 배열에서 구성된다
- [hostPath 볼륨 (hostPath Volume)](/knowledge/kubernetes/hostpath-volume/) - hostPath Volume은 워커 노드의 파일 시스템에 있는 특정 파일이나 디렉터리를 Pod의 컨테이너에 마운트하는 볼륨 유형으로, 노드의 로컬 파일에 직접 접근할 수 있게 한다
- [네트워크 스토리지 볼륨 (Network Storage Volume)](/knowledge/kubernetes/network-storage-volume/) - Network Storage Volume은 네트워크를 통해 연결된 외부 스토리지를 Pod에 마운트하는 볼륨 유형으로, Pod가 삭제되거나 다른 노드로 재스케줄링되어도 데이터가 유지된다
- [컨테이너 파일시스템 (Container Filesystem)](/knowledge/kubernetes/container-filesystem/) - Container Filesystem은 컨테이너 이미지에서 제공되는 격리된 파일 시스템으로, 각 컨테이너가 독립적으로 가지며, 컨테이너가 종료되고 재생성될 때 초기 상태(이미지 빌드 시점)로 리셋된다
- [볼륨 라이프사이클 (Volume Lifecycle)](/knowledge/kubernetes/volume-lifecycle/) - Volume Lifecycle은 Kubernetes에서 볼륨이 생성, 마운트, 언마운트, 삭제되는 전체 수명 주기를 말하며, 볼륨 유형에 따라 Pod 수준에서 관리되거나 Pod의 수명을 넘어 독립적으로 존재할 수 있다
- [컨테이너 간 파일 공유 (Sharing Files Between Containers)](/knowledge/kubernetes/sharing-files-between-containers/) - Sharing Files Between Containers는 같은 Pod 내의 여러 컨테이너가 공유 볼륨을 통해 파일을 읽고 쓸 수 있는 패턴으로, 사이드카 컨테이너 패턴의 핵심 활용 사례 중 하나이다
- [퍼시스턴트볼륨 (PersistentVolume)](/knowledge/kubernetes/persistent-volume/) - PersistentVolume(PV)은 클러스터 관리자가 프로비저닝한 스토리지를 나타내는 Kubernetes 오브젝트로, 인프라별 스토리지 세부사항을 Pod 매니페스트에서 분리하여 이식성을 제공한다
- [퍼시스턴트볼륨클레임 (PersistentVolumeClaim)](/knowledge/kubernetes/persistent-volume-claim/) - PersistentVolumeClaim(PVC)은 사용자가 영구 스토리지를 요청하는 오브젝트로, 필요한 용량, 접근 모드, 스토리지 클래스 등의 요구사항을 명시하여 PersistentVolume에 바인딩된다
- [스토리지클래스 (StorageClass)](/knowledge/kubernetes/storage-class/) - StorageClass는 클러스터에서 사용 가능한 스토리지의 "클래스"를 정의하는 Kubernetes 오브젝트로, 동적 프로비저닝 시 어떤 프로비저너와 파라미터를 사용하여 PersistentVolume을 생성할지 지정한다
- [동적 프로비저닝 (Dynamic Provisioning)](/knowledge/kubernetes/dynamic-provisioning/) - Dynamic Provisioning은 PersistentVolumeClaim이 생성되면 StorageClass에 정의된 프로비저너가 자동으로 기반 스토리지와 PersistentVolume 오브젝트를 생성하는 메커니즘으로, 관리자가 PV를 수동으로 사전 프로비저닝할 필요가 없다
- [접근 모드 (Access Modes)](/knowledge/kubernetes/access-modes/) - Access Modes는 PersistentVolume이 워커 노드에 연결(attach)될 수 있는 방식을 정의하며, 동시에 몇 개의 노드에서 읽기/쓰기가 가능한지를 제어한다
- [반환 정책 (Reclaim Policy)](/knowledge/kubernetes/reclaim-policy/) - Reclaim Policy는 PersistentVolume이 릴리즈(PVC 삭제)될 때 PV 오브젝트와 기반 스토리지를 어떻게 처리할지 결정하는 정책으로, Retain, Delete, Recycle 세 가지가 있다
- [로컬 퍼시스턴트볼륨 (Local Persistent Volume)](/knowledge/kubernetes/local-persistent-volume/) - Local Persistent Volume은 워커 노드에 직접 연결된 디스크(SSD 등)를 PersistentVolume으로 노출하는 방식으로, hostPath 볼륨보다 안전하며 스케줄러가 Pod를 해당 볼륨이 있는 노드에 자동으로 배치한다
- [볼륨 바인딩 모드 (Volume Binding Mode)](/knowledge/kubernetes/volume-binding-mode/) - Volume Binding Mode는 StorageClass에서 설정하는 필드로, PersistentVolumeClaim이 PersistentVolume에 바인딩되는 시점을 결정한다

## Configuration (설정)

- [컨피그맵 (ConfigMap)](/knowledge/kubernetes/configmap/) - ConfigMap은 키-값 쌍으로 구성된 Kubernetes API 오브젝트로, 컨테이너 이미지에서 설정 데이터를 분리하여 애플리케이션 구성을 외부화하는 데 사용된다
- [시크릿 (Secret)](/knowledge/kubernetes/secret/) - Secret은 비밀번호, TLS 인증서, 암호화 키 등 민감한 데이터를 저장하기 위한 Kubernetes API 오브젝트로, ConfigMap과 유사하지만 보안에 특화된 처리 방식을 갖는다
- [쿠버네티스 환경 변수 (Environment Variables in Kubernetes)](/knowledge/kubernetes/environment-variables/) - Kubernetes에서 환경 변수는 파드 매니페스트의 `env` 또는 `envFrom` 필드를 통해 컨테이너에 설정되며, 리터럴 값, ConfigMap, Secret, Downward API 등 다양한 소스에서 값을 가져올 수 있다
- [컨테이너 커맨드와 인자 (Container Command and Args)](/knowledge/kubernetes/container-command-args/) - Kubernetes에서 `command`와 `args` 필드는 Dockerfile의 `ENTRYPOINT`와 `CMD`에 대응하며, 컨테이너 이미지를 재빌드하지 않고도 파드 매니페스트에서 실행 명령어와 인자를 오버라이드할 수 있다
- [컨피그맵 볼륨 (ConfigMap Volume)](/knowledge/kubernetes/configmap-volume/) - ConfigMap Volume은 ConfigMap의 키-값 쌍을 컨테이너의 파일 시스템에 파일로 마운트하는 Kubernetes 볼륨 타입으로, 대용량 설정 파일을 컨테이너에 주입하는 데 주로 사용된다
- [Downward API](/knowledge/kubernetes/downward-api/) - Downward API는 파드의 메타데이터(이름, 네임스페이스, IP, 레이블, 리소스 제한 등)를 환경 변수나 파일을 통해 컨테이너 내부 애플리케이션에 전달하는 메커니즘이다
- [프로젝티드 볼륨 (Projected Volume)](/knowledge/kubernetes/projected-volume/) - Projected Volume은 여러 소스(ConfigMap, Secret, Downward API, ServiceAccountToken)의 데이터를 하나의 볼륨으로 결합하여 단일 디렉터리에 마운트할 수 있게 하는 Kubernetes 볼륨 타입이다
- [불변 컨피그맵과 시크릿 (Immutable ConfigMap and Secret)](/knowledge/kubernetes/immutable-configmap/) - Immutable ConfigMap과 Secret은 `immutable: true`로 설정되어 생성 후 데이터 변경이 불가능한 구성 오브젝트로, 설정의 일관성 보장과 클러스터 성능 향상을 위해 사용된다

## Organization (리소스 구성)

- [네임스페이스 (Namespace)](/knowledge/kubernetes/namespace/) - Kubernetes Namespace는 하나의 물리적 클러스터를 여러 가상 클러스터로 분할하여, 서로 다른 팀이나 프로젝트의 오브젝트를 이름 충돌 없이 격리하여 관리할 수 있게 하는 메커니즘이다
- [네임스페이스 격리 (Namespace Isolation)](/knowledge/kubernetes/namespace-isolation/) - Kubernetes에서 Namespace는 이름 범위 격리만 제공하며, 기본적으로 런타임 격리나 네트워크 격리를 제공하지 않는다
- [레이블 (Label)](/knowledge/kubernetes/label/) - Label은 Kubernetes 오브젝트에 부착하는 키-값 쌍으로, 오브젝트를 식별하고 그룹화하여 시스템의 역할과 구조를 명확하게 표현하는 데 사용된다
- [레이블 셀렉터 (Label Selector)](/knowledge/kubernetes/label-selector/) - Label Selector는 레이블의 키-값 쌍을 기준으로 Kubernetes 오브젝트를 필터링하는 메커니즘으로, kubectl 명령어와 Kubernetes 내부 오브젝트(Service, Deployment 등) 모두에서 사용된다
- [어노테이션 (Annotation)](/knowledge/kubernetes/annotation/) - Annotation은 Kubernetes 오브젝트에 부착하는 키-값 쌍으로, 레이블과 달리 비식별 메타데이터를 저장하며 오브젝트 필터링에는 사용할 수 없지만 최대 256KB의 임의 문자열을 저장할 수 있다
- [노드 셀렉터 (Node Selector)](/knowledge/kubernetes/node-selector/) - Node Selector는 파드의 nodeSelector 필드를 사용하여 특정 레이블을 가진 노드에만 파드를 스케줄링하도록 제한하는 메커니즘이다
