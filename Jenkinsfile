pipeline {
    agent any

    // Use the NodeJS tool defined in Jenkins Global Tool Configuration
    tools {
        nodejs 'node' 
    }

    environment {
        // 1. Docker Hub Configuration
        DOCKER_HUB_USER = "prakasitnan"
        DOCKER_IMAGE = "${DOCKER_HUB_USER}/test-vue-auth"
        
        // 2. Credentials (IDs must match Jenkins settings)
        DOCKER_CREDS = credentials('docker-hub-creds')
        GIT_CREDS = credentials('git-repo-creds')
        
        APP_VERSION = ""
    }

    stages {
        stage('Initial Setup') {
            steps {
                script {
                    echo "Starting build for ${DOCKER_IMAGE}..."
                    sh 'git config user.email "jenkins@example.com"'
                    sh 'git config user.name "Jenkins CI"'
                }
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Update Version') {
            steps {
                script {
                    // Increment version (e.g. 1.0.0 -> 1.0.1)
                    sh 'npm version patch -m "chore: bump version to %s [skip ci]"'
                    
                    // Capture new version for tagging
                    APP_VERSION = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                    echo "New Version: ${APP_VERSION}"
                }
            }
        }

        stage('Docker Operations') {
            steps {
                script {
                    def tag = "${APP_VERSION}-${BUILD_NUMBER}"
                    
                    // Build and Tag
                    sh "docker build -t ${DOCKER_IMAGE}:${tag} ."
                    sh "docker tag ${DOCKER_IMAGE}:${tag} ${DOCKER_IMAGE}:latest"
                    
                    // Login and Push - Fixed with single quotes for security
                    sh 'echo ${DOCKER_CREDS_PSW} | docker login -u ${DOCKER_CREDS_USR} --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:${tag}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Sync Git') {
            steps {
                script {
                    // Extract repo URL (e.g., github.com/prakasitnan/test-vue-auth.git)
                    def remote = sh(script: "git remote get-url origin", returnStdout: true).trim().replace("https://", "")
                    
                    // Use double quotes for the command to include the 'remote' variable
                    // Use \$ to escape environment variables so they are handled by the shell securely
                    withCredentials([usernamePassword(credentialsId: 'git-repo-creds', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                        sh "git push https://\$GIT_USER:\$GIT_PASS@${remote} HEAD:main --tags"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Ensure docker logout doesn't break the build if docker isn't installed/working
                sh 'which docker && docker logout || echo "Docker not found or not logged in"'
                cleanWs()
            }
        }
        success {
            echo "Successfully deployed version ${APP_VERSION}"
        }
        failure {
            echo "Pipeline failed. Please check the logs above."
        }
    }
}
