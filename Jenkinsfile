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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'harbor-creds',
                        usernameVariable: 'HARBOR_USER',
                        passwordVariable: 'HARBOR_PWD'),
                    string(credentialsId: "firebase-messenging-sender-id",
                        variable: "REACT_APP_FIREBASE_MESSENGING_SENDER_ID"),
                    string(credentialsId: "firebase-api-key",
                        variable: "REACT_APP_FIREBASE_API_KEY"),
                    string(credentialsId: "firebase-app-id",
                        variable: "REACT_APP_FIREBASE_APP_ID")],
                )
                {
                    sh '''
                    docker build \
                        -t harbor.basicon.net/myndgrow/myndgrow-dev:latest \
                        -t harbor.basicon.net/myndgrow/myndgrow-dev:b_${BUILD_NUMBER} \
                        --build-arg BUILD_NUMBER=$BUILD_NUMBER \
                        --build-arg REACT_APP_FIREBASE_AUTH_DOMAIN=$REACT_APP_FIREBASE_AUTH_DOMAIN \
                        --build-arg REACT_APP_FIREBASE_URL=$REACT_APP_FIREBASE_URL \
                        --build-arg REACT_APP_FIREBASE_PROJECT_ID=$REACT_APP_FIREBASE_PROJECT_ID \
                        --build-arg REACT_APP_FIREBASE_STORAGE_BUCKET=$REACT_APP_FIREBASE_STORAGE_BUCKET \
                        --build-arg REACT_APP_FIREBASE_MESSENGING_SENDER_ID=$REACT_APP_FIREBASE_MESSENGING_SENDER_ID \
                        --build-arg REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY \
                        --build-arg REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID \
                        .
                    echo $HARBOR_PWD | docker login harbor.basicon.net --username $HARBOR_USER --password-stdin
                    docker push harbor.basicon.net/myndgrow/myndgrow-${APP_ENV}:latest
                    docker push harbor.basicon.net/myndgrow/myndgrow-${APP_ENV}:b_${BUILD_NUMBER}

                    '''
                }
            }
        }
        stage('Rolling up Kube:dev'){
            when {
                    branch 'develop'
            }
            steps {
                withKubeConfig([credentialsId: "myndgrow-kube-creds-dev", serverUrl: "https://192.168.86.26:16443"]){
                    // sh '''
                    // envsubst < "deploy/deployment-patch-src-dev.yaml" > "deploy/deployment-patch-out.yaml"
                    // kubectl patch deployment myndgrow \
                    //         --patch "$(cat deploy/deployment-patch-out.yaml)"
                    // kubectl rollout restart deployment/myndgrow
                    // '''
                }
            }
         }
    }
}