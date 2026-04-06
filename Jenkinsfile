pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "test-vue-auth"
        REGISTRY = "local-registry:5000" // Replace with your actual registry
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

        /* 
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        */

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
                }
            }
        }

        /*
        stage('Docker Push') {
            steps {
                script {
                    // Requires docker.withRegistry or similar for authentication
                    // docker.withRegistry('https://' + env.REGISTRY, 'docker-credentials-id') {
                    //     sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    //     sh "docker push ${REGISTRY}/${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    // }
                }
            }
        }
        */
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'CI Pipeline completed successfully!'
        }
        failure {
            echo 'CI Pipeline failed.'
        }
    }
}
