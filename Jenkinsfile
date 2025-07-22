// Jenkinsfile yang sudah diperbaiki dan disederhanakan

pipeline {
    // Agent tetap sama, ini sudah benar.
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root' // Menjalankan sebagai root untuk menghindari masalah izin file di dalam kontainer
        }
    }

    // Di environment, kita hanya definisikan nilai-nilai sederhana.
    environment {
        SAUCEDEMO_CREDS = credentials('saucedemo-creds')
        BASE_URL        = "https://www.saucedemo.com"
    }

    stages {
        // Tahap 1: Checkout Code
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        // Tahap 2: Menyiapkan Variabel
        // KITA PINDAHKAN LOGIKA .split() KE DALAM SCRIPT BLOCK DI SINI
        stage('Prepare Variables') {
            steps {
                script {
                    echo "Preparing credentials..."
                    // Memisahkan username dan password dari variabel SAUCEDEMO_CREDS
                    // dan menyimpannya ke environment variable baru untuk pipeline ini.
                    def parts = SAUCEDEMO_CREDS.split(':')
                    env.STANDARD_USERNAME = parts[0]
                    env.PASSWORD          = parts[1]
                }
            }
        }

        // Tahap 3: Install Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                sh 'npm install'
            }
        }

        // Tahap 4: Run E2E Tests
        // Variabel yang kita buat di script block sekarang bisa diakses di sini.
        stage('Run E2E Tests') {
            steps {
                echo "Running Playwright tests for user: ${env.STANDARD_USERNAME}"
                // Perintah ini akan menggunakan variabel env.STANDARD_USERNAME dan env.PASSWORD
                // yang sudah diekspor oleh kode Playwright-mu.
                sh 'npx playwright test'
            }
        }
    }

    // Post-Actions: Tetap sama, ini sudah benar.
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
