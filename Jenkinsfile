pipeline {
    
    agent any

    environment {
        IMAGE_NAME = 'trvae-prod'
    }

    stages {
        stage('Remove Previous Image') {
            steps {
                script {
                    // Remove the previous image if it exists
                    sh "docker images -q $IMAGE_NAME:previous && docker rmi $IMAGE_NAME:previous || true"
                }
            }
        }

        stage('Tag Current Image') {
            steps {
                sh "docker images -q $IMAGE_NAME:latest && docker tag $IMAGE_NAME:latest $IMAGE_NAME:previous || true"
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t $IMAGE_NAME:latest ."
            }
        }
    }
    post {
        always {
            emailext(
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                to: '$DEFAULT_RECIPIENTS',
                recipientProviders: [ requestor() ],
                subject: "${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            )
        }
    }
}
