---
title: "컨피그맵 볼륨 (ConfigMap Volume)"
description: "ConfigMap Volume은 ConfigMap의 키-값 쌍을 컨테이너의 파일 시스템에 파일로 마운트하는 Kubernetes 볼륨 타입으로, 대용량 설정 파일을 컨테이너에 주입하는 데 주로 사용된다"
tags: ['Kubernetes', 'Volume', 'Configmap', 'Configuration', 'Filesystem']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/kubernetes/configmap-volume
sidebar:
  order: 5
---

## 핵심 개념

ConfigMap Volume은 ConfigMap의 각 항목을 개별 파일로 변환하여 지정된 디렉터리에 마운트한다. 키가 파일 이름이 되고 값이 파일 내용이 된다. `items` 필드를 사용하면 특정 항목만 선택적으로 투영할 수 있고, `path` 필드로 파일 이름을 변경할 수 있다.

중요한 동작 방식으로, ConfigMap이 업데이트되면 볼륨의 파일도 자동으로 업데이트된다(최대 약 1분 소요). Kubernetes는 심볼릭 링크를 사용하여 모든 파일을 원자적(atomically)으로 업데이트한다. 타임스탬프가 포함된 새 디렉터리를 생성하고, `..data` 심볼릭 링크를 새 디렉터리로 변경하여 모든 파일을 동시에 교체한다.

주의사항: 볼륨을 디렉터리에 마운트하면 기존 파일이 숨겨진다. `subPath`를 사용하면 개별 파일만 마운트할 수 있지만, 이 경우 ConfigMap 변경 시 파일이 자동 업데이트되지 않는다. 파일 권한은 `defaultMode`와 `mode` 필드로 설정할 수 있다.

## 예시

ConfigMap Volume 정의 및 마운트:

```yaml
spec:
  volumes:
  - name: envoy-config
    configMap:
      name: kiada-envoy-config
      items:
      - key: envoy.yaml
        path: envoy.yaml
  containers:
  - name: envoy
    image: luksa/kiada-ssl-proxy:0.1
    volumeMounts:
    - name: envoy-config
      mountPath: /etc/envoy
```

`subPath`로 개별 파일 마운트 (기존 파일 보존):

```yaml
volumeMounts:
- name: my-volume
  subPath: my-app.conf
  mountPath: /etc/my-app.conf
```

심볼릭 링크 구조 확인:

```bash
$ kubectl exec kiada-ssl -c envoy -- ls -lA /etc/envoy
drwxr-xr-x  ..2020_11_14_11_47_45.728287366
lrwxrwxrwx  ..data -> ..2020_11_14_11_47_45.728287366
lrwxrwxrwx  envoy.yaml -> ..data/envoy.yaml
```

## 관련 개념

- [컨피그맵 (ConfigMap)](/knowledge/kubernetes/configmap/) - 이 볼륨의 데이터 소스
- [볼륨 (Volume)](/knowledge/kubernetes/volume/) - 볼륨의 기본 개념
- [프로젝티드 볼륨 (Projected Volume)](/knowledge/kubernetes/projected-volume/) - 여러 소스를 결합하는 볼륨
- [시크릿 (Secret)](/knowledge/kubernetes/secret/) - 유사한 Secret Volume 타입 존재
