FROM node:16

WORKDIR /app
ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .
ONBUILD RUN npx prisma generate
ONBUILD RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
