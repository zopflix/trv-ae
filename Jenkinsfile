pipeline {
    
    agent any
    
    stages {
      
      stage('build') {
         steps {
                sh "docker build -t trvae-prod ."
         }
      }
    }
    post {
        always {
            
            emailext (
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                to: '$DEFAULT_RECIPIENTS',
                recipientProviders: [ requestor() ],
                subject: "${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            )
        }
    }
    
}
