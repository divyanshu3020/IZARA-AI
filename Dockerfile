FROM node:18

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

# Expose the correct Vite port
ENV PORT=5173
EXPOSE 5173

# Start Vite dev server and bind to all interfaces
CMD ["npm", "run", "dev"]
