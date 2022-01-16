# Small deployment of Whole Kubernetes for development tests
This is a small tutorial/demo of how to deploy a whole K3S cluster in a single computer.

### What is K3S
[k3s](https://k3s.io/) is a Lightweight Kubernetes, it supports all the API calls/operators/etc that Kubernetes(k8s) support.

*BTW: k3s = k(8/2)s *

### Why k3s
Is a single binary deployment, run on every machine (linux required), it supports boards with ARMV7+ (like raspberry pi), easy to install and easy to deploy.

### Requirements
Windows x64 with WSL2 enable or a recent Linux OS, I'm using Ubuntu 20.04
Last version of (Docker)[] installed, I'm using 4.4.0 at this moment.

# Installation
We are going to use [k3d](https://k3d.io/), it is a helpful tool that help us to deploy the cluster in docker with a single command line command.

*BTW: k3d = k3s in Docker*

## Linux
You can check the script before run the commands at: [https://github.com/rancher/k3d/blob/main/install.sh](https://github.com/rancher/k3d/blob/main/install.sh)
#### With wget
  `wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash`
#### With curl
  `curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash`

## Windows
Make sure that you have WSL2 enable and Docker with WSL2 components.
#### With Chocolatey
  1. Install Chocolatey [https://chocolatey.org/install](https://chocolatey.org/install)
  2. run `choco install k3d -y`
  3. run `choco install kubernetes-cli`

#### Manual Installation
  1. Download k3d from the github [https://github.com/rancher/k3d/releases/](https://github.com/rancher/k3d/releases/)
  2. Download kubectl from official site [https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)
  2. Put those files on a folder
  3. Add that folder to the system path



# Starting the cluster
This command will simulate 3 computers, 2 as master nodes and 3 working nodes, additionally will forward any request to the ports `8888` and `8889` on the host system to the cluster.

## Deploy the server
```
k3d cluster create localk8s --servers 1 --agents 3 --port "8888:80@loadbalancer" --port "8889:443@loadbalancer"
```

## Check if it is running
`kubectl get nodes --output wide`

You should see something similar to:
```
kubectl get nodes --output wide
NAME                    STATUS   ROLES                       AGE   VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE   KERNEL-VERSION                      CONTAINER-RUNTIME
k3d-localk8s-agent-0    Ready    <none>                      68m   v1.21.7+k3s1   172.18.0.7    <none>        Unknown    5.10.16.3-microsoft-standard-WSL2   containerd://1.4.12-k3s1
k3d-localk8s-agent-1    Ready    <none>                      68m   v1.21.7+k3s1   172.18.0.9    <none>        Unknown    5.10.16.3-microsoft-standard-WSL2   containerd://1.4.12-k3s1
k3d-localk8s-agent-2    Ready    <none>                      68m   v1.21.7+k3s1   172.18.0.5    <none>        Unknown    5.10.16.3-microsoft-standard-WSL2   containerd://1.4.12-k3s1
k3d-localk8s-server-0   Ready    control-plane,etcd,master   68m   v1.21.7+k3s1   172.18.0.3    <none>        Unknown    5.10.16.3-microsoft-standard-WSL2   containerd://1.4.12-k3s1
```

## How to delete the cluster
`k3d cluster delete localk8s`

# Ready for play
If something goes wrong just delete the cluster and deploy it again.