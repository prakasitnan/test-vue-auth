pipeline {
    agent any

    environment {
        // Docker Hub Configuration
        DOCKER_HUB_USER = credentials('dockerhub-username') // REPLACE WITH YOUR ACTUAL DOCKER HUB USERNAME
        DOCKER_IMAGE = "${DOCKER_HUB_USER}/test-vue-auth"
        REGISTRY = "docker.io"

        // Securely bind Jenkins credentials
        // Ensure this ID matches the credential you created in Jenkins for Docker Hub
        DOCKER_AUTH = credentials('docker-hub-credentials-id')

        GIT_AUTH = credentials('git-credentials-id')
        APP_VERSION = ""
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Update Version') {
            steps {
                script {
                    sh 'git config user.email "jenkins@example.com"'
                    sh 'git config user.name "Jenkins CI"'

                    // Increment patch version
                    sh 'npm version patch -m "chore: bump version to %s [skip ci]"'

                    APP_VERSION = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                }
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    def fullTag = "${APP_VERSION}-${BUILD_NUMBER}"
                    // Build using the Docker Hub format: username/repository:tag
                    sh "docker build -t ${DOCKER_IMAGE}:${fullTag} ."
                    sh "docker tag ${DOCKER_IMAGE}:${fullTag} ${DOCKER_IMAGE}:${APP_VERSION}"
                    sh "docker tag ${DOCKER_IMAGE}:${fullTag} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Push to Git') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'git-credentials-id', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        // Replace the URL with your actual Git repository URL
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/your-repo-path.git HEAD:${GIT_BRANCH} --tags"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    def fullTag = "${APP_VERSION}-${BUILD_NUMBER}"

                    // Login to Docker Hub
                    sh "echo ${DOCKER_AUTH_PSW} | docker login -u ${DOCKER_AUTH_USR} --password-stdin"

                    // Push all tags to Docker Hub
                    sh "docker push ${DOCKER_IMAGE}:${fullTag}"
                    sh "docker push ${DOCKER_IMAGE}:${APP_VERSION}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            sh "docker logout"
        }
    }
}
