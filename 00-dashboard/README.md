# Kubernetes Dashboard
Some times have a visual representation of what is happening helps a lot, so this is how we can get the kubernetes dashboard.

*For more information you can visit the official site*:[https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) 
## Install
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml

## Configure administrator user
kubectl apply -f dashboard-admin-user-role.yaml

## Get the token
kubectl -n kubernetes-dashboard describe secret admin-user-token | grep ^token

## Do the proxy tunnel
kubectl proxy

## Open in the browser
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
