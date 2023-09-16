    pipeline {
        agent {
            label 'dind-node' 
        }

        stages {


            stage('Checkout') {
                steps {
                    git branch: 'master', url: 'https://github.com/PSzymon1/blocchi-puzzle.git'
                }
            }

            stage('Build') {
                
                steps {
                    script {
                        try {
                            sh 'ls'
                            sh 'npm install'
                            sh 'npm run game:build:prod'
                        } catch (Exception e) {
                            currentBuild.result = 'FAILURE'
                            error("Build failed: ${e.message}")
                        }
                    }
                }
                post {
                    success {
                        archiveArtifacts artifacts: 'build/game/*', fingerprint: true
                        echo "Build succeeded; archiving artifacts."
                    }
                    failure {
                        echo "Pipeline failed"
                    }
                    unstable {
                        echo "Pipeline unstable"
                    }
                    changed {
                        echo "Pipeline changed"
                    }
                    aborted {
                        echo "Pipeline aborted"
                    }
                }
            }

            stage('Test') {
                steps {
                    sh 'npm run check'
                }
                post {
                    always {
                        echo "Test finished"
                    }
                    success {
                        echo "Testing succeeded"
                    }
                    failure {
                        echo "Test failed"
                    }
                    aborted {
                        echo "Pipeline aborted"
                    }
                }
            }

            stage('Deploy') {
                steps {
                    script {
                        def deploymentImage = docker.build("pszymon123/blocchi:1d", "-f Deploy.dockerfile .")                 
                        withDockerRegistry([credentialsId: 'dockerhub']) {
                            deploymentImage.push()
                        }
                    }
                }
                post {
                    always {
                        echo "Pipeline finished"
                    }
                    success {
                        echo "Pipeline succeeded"
                    }
                    failure {
                        echo "Pipeline failed"
                    }
                    unstable {
                        echo "Pipeline unstable"
                    }
                    changed {
                        echo "Pipeline changed"
                    }
                    aborted {
                        echo "Pipeline aborted"
                    }
                }
            }  
        }
    }