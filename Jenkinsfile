pipeline {
    agent any
    environment {
        APP_TARGET="kube"
    }
    stages {
        stage('Build for Kube:dev') {
            when {
                    branch 'develop'
            }
            environment {
                APP_ENV="dev"
                REACT_APP_FIREBASE_AUTH_DOMAIN="myndgrow.firebaseapp.com"
                REACT_APP_FIREBASE_URL="https://myndgrow.firebaseio.com"
                REACT_APP_FIREBASE_PROJECT_ID="myndgrow"
                REACT_APP_FIREBASE_STORAGE_BUCKET="myndgrow.appspot.com"
            }
            steps('Build docker image'){
                load "build.Jenkinsfile"
            }
        stage('Rolling up Kube:dev'){
            when {
                    branch 'develop'
            }
            steps {
                withKubeConfig([credentialsId: "myndgrow-kube-creds-dev", serverUrl: "https://192.168.86.26:16443"]){
                    sh '''
                    envsubst < "deploy/deployment-patch-src-dev.yaml" > "deploy/deployment-patch-out.yaml"
                    kubectl patch deployment myndgrow \
                            --patch "$(cat deploy/deployment-patch-out.yaml)"
                    kubectl rollout restart deployment/myndgrow
                    '''
                }
            }
        }

        stage('Build for Kube:uat') {
            when {
                    branch 'uat'
            }
            environment {
                APP_ENV="uat"
                REACT_APP_FIREBASE_AUTH_DOMAIN="myndgrow.firebaseapp.com"
                REACT_APP_FIREBASE_URL="https://myndgrow.firebaseio.com"
                REACT_APP_FIREBASE_PROJECT_ID="myndgrow"
                REACT_APP_FIREBASE_STORAGE_BUCKET="myndgrow.appspot.com"
            }
            steps('Build docker image'){
                load "build.Jenkinsfile"
            }
        stage('Rolling up Kube:uat'){
            when {
                    branch 'uat'
            }
            steps {
                withKubeConfig([credentialsId: "myndgrow-kube-creds-uat", serverUrl: "https://192.168.86.26:16443"]){
                    sh '''
                    envsubst < "deploy/deployment-patch-src-uat.yaml" > "deploy/deployment-patch-out.yaml"
                    kubectl patch deployment myndgrow \
                            --patch "$(cat deploy/deployment-patch-out.yaml)"
                    kubectl rollout restart deployment/myndgrow
                    '''
                }
            }
        }
        }
    }
}
}