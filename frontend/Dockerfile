# Шаг 1: Используем образ Node.js для сборки фронтенда
FROM node:22.12-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Шаг 2: Используем образ Nginx для запуска приложения
FROM nginx:1.23

# Копируем сгенерированные файлы из предыдущего шага
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный Nginx конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Указываем порт, который будет использоваться
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]