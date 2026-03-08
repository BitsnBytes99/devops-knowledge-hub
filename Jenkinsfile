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
        withCredentials([string(
            credentialsId: 'notification-email',
            variable: 'NOTIFY_EMAIL'
        )]) {
            emailext(
                to: NOTIFY_EMAIL,          
                subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>✅ Pipeline Successful!</h2>
                    <p><b>Project:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> SUCCESS</p>
                    <p><b>Duration:</b> ${currentBuild.durationString}</p>
                    <br>
                    <p>✅ Docker image pushed to Docker Hub</p>
                    <p>✅ Deployed to Kubernetes successfully</p>
                    <br>
                    <a href="${env.BUILD_URL}">View Build Details</a>
                """,
                mimeType: 'text/html'
            )
        }
    }

    failure {
        echo '❌ Pipeline failed!'
        withCredentials([string(
            credentialsId: 'notification-email',
            variable: 'NOTIFY_EMAIL'
        )]) {
            emailext(
                to: NOTIFY_EMAIL,          
                subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2>❌ Pipeline Failed!</h2>
                    <p><b>Project:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> FAILED</p>
                    <p><b>Duration:</b> ${currentBuild.durationString}</p>
                    <br>
                    <p>❌ Something went wrong in the pipeline</p>
                    <p>Please check the logs for details</p>
                    <br>
                    <a href="${env.BUILD_URL}console">View Console Logs</a>
                """,
                mimeType: 'text/html'
            )
        }
    }

    always {
        echo '📧 Pipeline finished!'
    }
}

}