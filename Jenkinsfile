pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "satyab2005/devops-knowledge-hub"
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Clone') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🔨 Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '📤 Pushing to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '🚀 Deploying to Kubernetes...'
                sh "kubectl apply -f k8s/"
                sh "kubectl rollout restart deployment/app-deployment -n devops-hub"
                sh "kubectl rollout status deployment/app-deployment -n devops-hub"
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline successful!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}