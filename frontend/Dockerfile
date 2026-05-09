# Estágio de Build
FROM node:20-alpine AS build
WORKDIR /app

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código e gera o build de produção
COPY . .
RUN npm run build

# Estágio de Produção (Nginx)
FROM nginx:stable-alpine

# Copia os arquivos estáticos do estágio de build para o diretório do Nginx
# Nota: Se estiver usando Vite, a pasta de saída é 'dist'. Se for CRA, é 'build'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração básica de Nginx (opcional, mas recomendado para SPA)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]