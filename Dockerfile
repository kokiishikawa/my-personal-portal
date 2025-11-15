FROM node:20-bullseye

WORKDIR /app

# 必要なビルドツールをインストール
RUN apt-get update && apt-get install -y bash git build-essential curl python3 make g++ && rm -rf /var/lib/apt/lists/*

# package.json と package-lock.json を先にコピーして依存関係インストール
COPY package*.json ./

# node_modules を削除してクリーンインストール
RUN rm -rf node_modules package-lock.json
RUN npm install

# アプリケーションをコピー
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]