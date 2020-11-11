FROM node:13 AS builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS "--max-old-space-size=8192"
COPY package.json .

RUN npm install
RUN npm install react-scripts -g
COPY public/ ./public/
COPY src/ ./src/
USER root

ARG BUILD_NUMBER
ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV REACT_APP_BUILD_NUM=${BUILD_NUMBER}

ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN}

ARG REACT_APP_FIREBASE_URL
ENV REACT_APP_FIREBASE_URL=${REACT_APP_FIREBASE_URL}

ARG REACT_APP_FIREBASE_PROJECT_ID
ENV REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID}

ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=${REACT_APP_FIREBASE_STORAGE_BUCKET}

ARG REACT_APP_FIREBASE_MESSENGING_SENDER_ID
ENV REACT_APP_FIREBASE_MESSENGING_SENDER_ID=${REACT_APP_FIREBASE_MESSENGING_SENDER_ID}

ARG REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}

ARG REACT_APP_FIREBASE_APP_ID
ENV REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID}

RUN npm run build


FROM node:15-slim
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g serve
EXPOSE 5000
WORKDIR /app
COPY --from=builder /app/build ./build
ARG BUILD_NUMBER
ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV REACT_APP_BUILD_NUM=${BUILD_NUMBER}

CMD ["serve", "-s","build"]
