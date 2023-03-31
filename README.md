# DevSecOps tutorial : Kubernetes' good practices

- [DevSecOps tutorial : Kubernetes' good practices](#devsecops-tutorial--kubernetes-good-practices)
  - [Introduction](#introduction)
  - [Get Started](#get-started)
    - [Installation](#installation)
      - [**Docker**](#docker)
      - [**Go**](#go)
      - [**KinD (Kubernetes in Docker)**](#kind-kubernetes-in-docker)
      - [**K9s**](#k9s)
      - [**Helm**](#helm)
    - [First kubernetes cluster](#first-kubernetes-cluster)
      - [Content of manifest.yaml](#content-of-manifestyaml)
  - [Security in container](#security-in-container)
    - [Clair](#Clair)
    
## Introduction

If you use a Debian-based Linux distribution write the commands in your terminal. If not, check the links and follow the insrtructions for the installation of each tools.

## Get Started

### Installation

#### **Docker**

 Make sure you have Docker already installed or install it : <https://www.docker.com/get-started/>

#### **Go**

Go is an open-source programming language supported by Google but also a large ecosystem of partners, communities, and tools.

We will need some tools from Go's ecosystem.

Install Go : <https://go.dev/doc/install>

**or**

```bash
wget https://go.dev/dl/go1.20.2.linux-amd64.tar.gz

tar -C /usr/local -xzf go1.20.2.linux-amd64.tar.gz && rm  go1.20.2.linux-amd64.tar.gz

export PATH=$PATH:/usr/local/go/bin
```

#### **KinD (Kubernetes in Docker)**

kind is a tool for running local Kubernetes clusters using Docker container “nodes”.
kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI.

Install KinD : <https://kind.sigs.k8s.io/docs/user/quick-start/#installation>

**or**

```bash
go install sigs.k8s.io/kind@latest
cd /usr/local/bin
sudo ln -s /home/<user>/go/bin/kind
```

***warning** : change **<user\>** by your linux username*

#### **K9s**

K9s is a terminal based UI to interact with your Kubernetes clusters that make their managing a lot easier and more intuitive.

Install k9s : <https://k9scli.io/topics/install/>

**or**

```bash
cd /usr/bin

wget https://github.com/derailed/k9s/releases/download/v0.27.2/k9s_Linux_amd64.tar.gz

sudo tar -xzf k9s_Linux_amd64.tar.gz && rm k9s_Linux_amd64.tar.gz
```

Execute the command below to lanch k9s for manage your kind cluster:

```bash
k9s --kubeconfig ~/.kube/config
```

#### **Helm**

Helm is a package manager for Kubernetes that simplifies the deployment and management of applications by encapsulating them into easily installable and upgradeable packages called charts.

Install Helm : <https://helm.sh/docs/intro/install/>

**or**

```bash
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

### First kubernetes cluster

We can now deploy our cluster with de config file **cluster-config.yaml**.

Let's see what is in it :

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes: # Create a one node cluster
- role: control-plane
   extraPortMappings: # Port mapping to access the service from outside the cluster
   - containerPort: 30080
      hostPort: 30080
```

To deploy the cluster run the command below in the terminal from the directory of cluster-config.yaml .

```bash
kind create cluster --name cluster --config=./cluster-config.yaml
```

Then add two repositories in the *cluster-controle-plane* node to use them has persistant volumes for the next steps.

```bash
docker exec -it cluster-control-plane /bin/bash
```

when in, execute :

```bash
mkdir /mnt/data
exit
```

Then we will use this cluster to run a simple web service in node.js that ask creditentials (username, password) to connect/create an account with a database. The app is in a docker image on the docker hub **t0ndre/web_app_devops:v1**.

To deploy the app run the command below.

```bash
kubectl apply -f manifest.yaml
```

#### Content of manifest.yaml

Handle the data perpetuity in the node with a persistant volume and a persistant volume claim :

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-volume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 4Gi
  accessModes:
    - ReadWriteOnce
  claimRef:
    name: app-volume
    namespace: default
  hostPath:
    path: "/mnt/data"

---

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-volume
  namespace: default
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

And create et deploy the service :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: service-web
  labels:
    app: service-web
spec:
  selector:
    app: service-web
  ports:
  - name: http
    port: 80
    targetPort: 8080
    nodePort: 30080
  type: NodePort

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-web
  labels:
    app: service-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: service-web
  template:
    metadata:
      labels:
        app: service-web
    spec:
      containers:
      - name: service-web
        image: t0ndre/web_app_devops:v1
        ports:
        - containerPort: 8080
          name: http
        resources:
          limits:
            memory: 512Mi
            cpu: "0.5"
        volumeMounts:
        - mountPath: /app/database
          name: data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: app-volume
```

So we have an web service which stores unencrypted authentication data in an unprotected persistent volume.

In fact if you try to run the web app on your browther and create an account by entering a username and a password (link : <http://localhost:30080>).

And then you run :

```bash
docker exec -it cluster-control-plane /bin/bash
```

and

```bash
cat /mnt/data/database.db
```

You will see your creditentials.

**How can we make this persistent volume protected and confidential ?**

We were inspired by this site to use Vault : https://iceburn.medium.com/kubernetes-store-sensitive-information-in-vault-as-persistent-storage-45e3866b11be

However, we have failed to implement this.

## Security in container

#### Clair

Clair is an open source project for the static analysis of vulnerabilities in application containers (currently including OCI and docker).

Clients use the Clair API to index their container images and can then match it against known vulnerabilities.

**How it works ?**

First, we import clair config files : 

```bash
wget https://raw.githubusercontent.com/jgsqware/clairctl/master/docker-compose.yml --directory-prefix=clair/docker-compose-data/
wget https://raw.github.com/jgsqware/clairctl/master/docker-compose-data/clair-config/config.yml --directory-prefix=clair/clair-config/
```
Then, we go in clair/docker-compose-data directory. Clair-config folder is the Clair server configuration.

After, we have to create and start containers. So you need to execute this : 

```bash
 docker-compose up
 ```
 
Once, the clair, clairctl, postgres services are up you are ready to scan an image. You can verify the state of services using **docker-compose ps**

**Run Clair Scan**

Now, Clair is running, with the vulnerability database which can help us to determine if our images have known vulnerabilites. So to run the Clair scan we execute the following command : 

```bash
docker-compose exec clairctl clairctl analyze -l [name_of_your_image]
```

In our case, the name of image is "t0ndre/web_app_devops:v1".

So, in the shell you will see the vulnerabilities that have been detected. Also, in the subdirectory docker-compose-statistics/clairctl-reports/html, there is a web page that show you the number of vulnerabilities found with the degree of vulnerability : Negligible, Low, Medium and High.
 
