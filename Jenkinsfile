pipeline {
    agent any

    environment {
        SAUCEDEMO_CREDS = credentials('saucedemo-creds')
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.44.0-jammy'
    }

    stages {
        // HAPUS STAGE 'Checkout Code' DARI SINI

        stage('Install & Run E2E Tests inside Docker') {
            steps {
                echo 'Running tests inside Docker container...'
                sh """
                    docker run --rm --ipc=host \\
                        -v "${env.WORKSPACE}:/work" \\
                        -w /work \\
                        -e BASE_URL=https://www.saucedemo.com \\
                        -e STANDARD_USERNAME=${SAUCEDEMO_CREDS_USR} \\
                        -e PASSWORD=${SAUCEDEMO_CREDS_PSW} \\
                        ${DOCKER_IMAGE} \\
                        sh -c 'ls -la && npm install && npx playwright test'
                """
            }
        }
    }

    post {
        always {
            echo 'Archiving test report...'
            archiveArtifacts artifacts: 'playwright-report/', allowEmptyArchive: true
        }
    }
}