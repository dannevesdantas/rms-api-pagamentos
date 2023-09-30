FROM node:18
WORKDIR /usr/src/RMS-backend-fase01
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install --ignore-scripts
RUN npm run build
USER node
CMD [ "node", "dist/main.js" ]
