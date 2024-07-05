# Deployment


### Namespace
Create a namespace

```sh
kubectl --kubeconfig=./kubeconfig.yml create namespace prbox-api`
```

<!-- alias kk="kubectl --kubeconfig=./kubeconfig.yml " -->


### JWT Secrets
```sh
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
kubectl --kubeconfig=./kubeconfig.yml --namespace=prbox-api create secret generic prbox-api-jwt-secret \
    --from-file=./private.pem \
    --from-file=./public.pem
rm ./private.pem ./public.pem 
```


### Env Secrets
Make a new secrets config file and add your secrets

```sh
cp secrets.example.yml secrets.yml
```

```sh
kubectl --kubeconfig=./kubeconfig.yml apply -f ./k8s/secrets.yml
```


### Build & Push Container Image
```sh
docker buildx build --platform linux/amd64 --push -t registry.digitalocean.com/ab-registry/prbox-api:latest .
```

### Create Deployment
```sh
kubectl --kubeconfig=./kubeconfig.yml apply -f ./k8s/api.deployment.yml

kubectl --kubeconfig=./kubeconfig.yml apply -f ./k8s/api.service.yml
```

### Compile & Deploy One-liner
```sh
docker buildx build --platform linux/amd64 --push -t registry.digitalocean.com/ab-registry/prbox-api:latest . && 
kubectl --kubeconfig=./kubeconfig.yml -n prbox-api rollout restart deployment prbox-api && \
kubectl --kubeconfig=./kubeconfig.yml -n prbox-api get pods -w
```


### Migrate
Migrate the DB

```sh
export POD="$(kubectl --kubeconfig=kubeconfig.yml --namespace=prbox-api get pods --field-selector=status.phase==Running --no-headers -o custom-columns=":metadata.name")"

kubectl --kubeconfig=./kubeconfig.yml --namespace=prbox-api exec -ti $POD -- /bin/bash -c 'sequelize db:migrate && sequelize db:seed:all'
```

### SSL
DigitalOcean tutorial: [https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes)

```sh
kubectl --kubeconfig=./kubeconfig.yml apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/do/deploy.yaml

kubectl --kubeconfig=./kubeconfig.yml apply -f https://github.com/jetstack/cert-manager/releases/download/v1.15.1/cert-manager.yaml

kubectl --kubeconfig=./kubeconfig.yml get pods -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --watch

kubectl --kubeconfig=./kubeconfig.yml apply -f ./k8s/api.ingress.yml

kubectl --kubeconfig=./kubeconfig.yml get pods --namespace cert-manager

kubectl --kubeconfig=./kubeconfig.yml create -f ./k8s/prod-issuer.yml

kubectl --kubeconfig=./kubeconfig.yml get Issuers,ClusterIssuers,Certificates,CertificateRequests,Orders,Challenges --all-namespaces

```

### Useful K8S commands
##### Set $POD as the name of the pod in K8s
```sh
export POD="$(kubectl --kubeconfig=kubeconfig.yml --namespace=prbox-api get pods --field-selector=status.phase==Running --no-headers -o custom-columns=":metadata.name")"
```

##### Execute bash script inside running container
```sh
kubectl --kubeconfig=kubeconfig.yml exec -ti $POD -- /bin/bash -c "sequelize db:migrate"
```

##### Get logs for $POD
```sh
kubectl --kubeconfig=kubeconfig.yml logs $POD
```

##### Create a cron job
```sh
kubectl --kubeconfig=kubeconfig.yml create job --from=cronjob/prbox-api-cron-job prbox-api-cron-job
```

##### Delete all faild cron jobs
```sh
kubectl --kubeconfig=kubeconfig.yml delete jobs --field-selector status.successful=0
```
