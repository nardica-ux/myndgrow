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
        -t harbor.basicon.net/myndgrow/myndgrow-$APP_ENV:latest \
        -t harbor.basicon.net/myndgrow/myndgrow-$APP_ENV:b_${BUILD_NUMBER} \
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