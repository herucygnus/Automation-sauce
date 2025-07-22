

pipeline {
    // Agent tetap sama, ini sudah benar.
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root' // Menjalankan sebagai root untuk menghindari masalah izin file di dalam kontainer
        }
    }

    // KITA PERBAIKI BAGIAN INI
    // Semua variabel yang dibutuhkan kita definisikan di sini.
    environment {
        // Ini adalah cara yang benar untuk mem-binding username dan password
        // dari sebuah credential dengan ID 'saucedemo-creds'.
        // Jenkins akan otomatis mengisi variabel USERNAME dan PASSWORD.
        SAUCEDEMO_CREDS = credentials('saucedemo-creds')
        
        // Langsung definisikan BASE_URL di sini agar konsisten
        BASE_URL        = "https://www.saucedemo.com"

        // Kita juga bisa langsung mengekstrak username dan password ke variabel baru
        // agar bisa digunakan di dalam script.
        STANDARD_USERNAME = SAUCEDEMO_CREDS.split(':')[0]
        PASSWORD          = SAUCEDEMO_CREDS.split(':')[1]
    }

    stages {
        // Tahap 1: Checkout Code
        // Dibuat lebih sederhana. Jenkins biasanya sudah otomatis checkout
        // jika kamu mengkonfigurasi repo di pengaturan Job.
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        // Tahap 2: Install Dependencies
        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                sh 'npm install'
            }
        }

        // Tahap 3: Run E2E Tests
        // Tidak perlu 'withEnv' lagi karena semua sudah diatur di blok 'environment' di atas.
        stage('Run E2E Tests') {
            steps {
                echo "Running Playwright tests for user: ${STANDARD_USERNAME}"
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
            
            // MENAMBAHKAN INI: Menyimpan laporan JUnit XML agar Jenkins bisa
            // menampilkan grafik tren hasil tes (lulus/gagal).
            junit 'test-results/**/*.xml'
        }
    }
}
