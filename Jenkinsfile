// Jenkinsfile dengan pendekatan baru menggunakan docker.image().inside()

pipeline {
    // 1. Agent: Jalankan di node Jenkins mana saja yang tersedia.
    // Controller utama sudah cukup untuk tahap ini.
    agent any

    // 2. Stages: Tahapan pipeline
    stages {
        // Kita gabungkan semua logika ke dalam satu stage utama
        // yang berjalan sepenuhnya di dalam kontainer Docker.
        stage('Run Tests inside Docker') {
            steps {
                // 3. Menjalankan kontainer Playwright
                // Semua yang ada di dalam blok '{...}' ini akan dieksekusi
                // DI DALAM kontainer 'mcr.microsoft.com/playwright:v1.44.0-jammy'.
                // KOREKSI: Menambahkan 'args:' untuk menamai argumen.
                docker.image('mcr.microsoft.com/playwright:v1.44.0-jammy').inside(args: '-u root') {
                    
                    // 4. Kita gunakan 'script' block untuk fleksibilitas
                    script {
                        // Tahap A: Checkout Code (di dalam kontainer)
                        echo 'Checking out code...'
                        checkout scm

                        // Tahap B: Install Dependencies (di dalam kontainer)
                        echo 'Installing NPM packages...'
                        sh 'npm install'

                        // Tahap C: Run E2E Tests (di dalam kontainer)
                        echo 'Running Playwright tests...'
                        
                        // Ini adalah cara yang lebih aman untuk menggunakan credentials
                        // di dalam scripted pipeline.
                        withCredentials([usernamePassword(credentialsId: 'saucedemo-creds', usernameVariable: 'STANDARD_USERNAME', passwordVariable: 'PASSWORD')]) {
                            // Variabel STANDARD_USERNAME dan PASSWORD sekarang tersedia
                            // untuk perintah di bawah ini.
                            sh 'npx playwright test'
                        }
                    }
                }
            }
        }
    }

    // 5. Post-Actions: Tetap sama, ini sudah benar.
    post {
        always {
            echo 'Archiving test reports...'
            
            // Menyimpan laporan HTML untuk dilihat manual
            archiveArtifacts artifacts: 'playwright-report/', allowEmptyArchive: true
            
            // Menyimpan laporan JUnit XML agar Jenkins bisa
            // menampilkan grafik tren hasil tes (lulus/gagal).
            junit 'test-results/**/*.xml'
        }
    }
}
