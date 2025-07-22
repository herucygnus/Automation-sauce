

pipeline {
    // 1. Agent: Di mana pipeline ini akan berjalan?
    // Kita menggunakan Docker agent dengan image resmi dari Playwright.
    // Ini memastikan semua browser dan Node.js sudah terinstal dengan benar.
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
            args '-u root' // Menjalankan sebagai root untuk menghindari masalah perizinan
        }
    }

    // 2. Environment: Variabel yang akan kita gunakan di pipeline
    // Jenkins akan otomatis membaca kredensial dari "Credentials Manager"
    // dan menyuntikkannya sebagai environment variable.
    environment {
        // 'saucedemo-creds' adalah ID dari kredensial yang kamu simpan di Jenkins.
        // Ini adalah cara yang aman untuk menangani data rahasia.
        SAUCEDEMO_CREDS = credentials('saucedemo-creds')
    }

    // 3. Stages: Kumpulan tahapan yang akan dijalankan
    stages {
        // Tahap 1: Mengunduh kode dari repositori Git
        stage('Checkout Code') {
            steps {
                // 'git url' akan otomatis diisi oleh Jenkins saat dikonfigurasi
                git url: 'https://github.com/herucygnus/automation-sauce.git', branch: 'main'
            }
        }

        // Tahap 2: Menginstal semua package dari package.json
        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                // 'sh' adalah singkatan dari "shell", untuk menjalankan perintah terminal
                sh 'npm install'
            }
        }

        // Tahap 3: Menjalankan tes Playwright
        stage('Run E2E Tests') {
            steps {
                echo 'Running Playwright tests...'
                // Kita menggunakan 'withEnv' untuk menyuntikkan variabel dari Jenkins Credentials
                // ke dalam proses tes. Variabelnya akan menjadi process.env.STANDARD_USERNAME, dll.
                withEnv([
                    "BASE_URL=https://www.saucedemo.com",
                    "STANDARD_USERNAME=${SAUCEDEMO_CREDS_USR}",
                    "PASSWORD=${SAUCEDEMO_CREDS_PSW}"
                    // Kamu bisa tambahkan user lain jika perlu
                ]) {
                    sh 'npx playwright test'
                }
            }
        }
    }

    // 4. Post-Actions: Apa yang dilakukan setelah semua tahapan selesai?
    // Blok 'always' akan selalu berjalan, baik tesnya lulus maupun gagal.
    post {
        always {
            echo 'Archiving test report...'
            // Perintah ini akan menyimpan laporan HTML Playwright sebagai "artifact"
            // sehingga bisa dilihat langsung dari halaman build di Jenkins.
            archiveArtifacts artifacts: 'playwright-report/', allowEmptyArchive: true
        }
    }
}
