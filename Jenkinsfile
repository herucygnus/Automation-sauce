// File: Jenkinsfile (simpan di folder utama proyekmu)

pipeline {
    // 1. Agent: Gunakan 'agent any'.
    // Ini memberitahu Jenkins untuk berjalan di environment utamanya,
    // dan kita akan memanggil Docker secara manual dari sana.
    // Ini adalah cara yang paling andal untuk setup lokal.
    agent any

    // 2. Environment: Variabel yang akan kita gunakan di pipeline
    environment {
        SAUCEDEMO_CREDS = credentials('saucedemo-creds')
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.44.0-jammy'
    }

    // 3. Stages: Kumpulan tahapan yang akan dijalankan
    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/herucygnus/Automation-sauce.git', branch: 'main'
            }
        }

        stage('Install & Run E2E Tests inside Docker') {
            steps {
                echo 'Running tests inside Docker container...'
                // Perintah 'sh' ini memanggil Docker dari host machine
                // untuk menjalankan tes di dalam kontainer Playwright yang bersih.
                sh """
                    docker run --rm --ipc=host \\
                        -v "${pwd()}:/work" \\
                        -w /work \\
                        -e BASE_URL=https://www.saucedemo.com \\
                        -e STANDARD_USERNAME=${SAUCEDEMO_CREDS_USR} \\
                        -e PASSWORD=${SAUCEDEMO_CREDS_PSW} \\
                        ${DOCKER_IMAGE} \\
                        sh -c 'npm install && npx playwright test'
                """
            }
        }
    }

    // 4. Post-Actions: Aksi setelah semua tahapan selesai
    post {
        always {
            echo 'Archiving test report...'
            archiveArtifacts artifacts: 'playwright-report/', allowEmptyArchive: true
        }
    }
}
