# ⚙️ DevOps Knowledge Hub

> Full-stack DevOps article manager — containerized, orchestrated and auto-deployed using industry-standard tools.

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/satyab2005/devops-knowledge-hub)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Jenkins](https://img.shields.io/badge/Jenkins-D33833?style=for-the-badge&logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📺 Demo

[![Watch Demo](screenshots/youtube-thumbnail.png)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

---

## 🏗️ Architecture


![Architecture](screenshots/architecture.png)

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/satyab2005/devops-knowledge-hub.git
cd devops-knowledge-hub

# Run with Docker Compose
docker compose up -d
```
Open: **http://localhost:3000**

---

## ☸️ Kubernetes Deploy

```bash
minikube start --driver=docker

kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mongo-pvc.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml

minikube service app-service -n devops-hub
```

---

## 🔁 CI/CD Pipeline

Every `git push` automatically:

```
Clone → Docker Build → Push to Hub → Deploy to K8s → Email Notification
```

![Jenkins Pipeline](screenshots/jenkins-pipeline.png)

---

## 📸 Screenshots

| App | Kubernetes | Email |
|---|---|---|
| ![App](screenshots/app.png) | ![K8s](screenshots/k8s-pods.png) | ![Email](screenshots/email.png) |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js + MongoDB | Full stack application |
| Docker + Docker Hub | Containerize and store image |
| Kubernetes (Minikube) | Run with 2 replicas + PVC |
| Jenkins + GitHub | CI/CD automation |
| Ngrok | GitHub webhook tunnel |
| Gmail SMTP | Pipeline notifications |

---

## 📁 Structure

```
devops-knowledge-hub/
├── src/                    # Next.js app
├── k8s/                    # Kubernetes manifests
├── Dockerfile
├── docker-compose.yml
└── Jenkinsfile
```

---

## 👨‍💻 Author

**Satyajit**
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BitsnBytes99)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/satyajit-borade-a7294b278/)
[![DockerHub](https://img.shields.io/badge/Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/satyab2005)

> ⭐ Star this repo if it helped you!
