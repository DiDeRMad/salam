# Салам Крестьянский — сайт ресторана

Веб-приложение для ресторана восточной и европейской кухни в г. Бийск.  
Электронное меню, онлайн-бронирование столов и панель администратора.

## Стек

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **PostgreSQL** (локально или [Neon](https://neon.tech) в облаке)
- **Tailwind CSS 4**

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Создать .env.local (см. .env.example)
# DATABASE_URL=postgresql://...
# ADMIN_PASSWORD_HASH=...

# 3. Запустить
npm run dev
```

Открыть: http://localhost:3000

## Переменные окружения

| Переменная | Описание |
|---|---|
| `DATABASE_URL` | Строка подключения к PostgreSQL |
| `ADMIN_PASSWORD_HASH` | bcrypt-хэш пароля администратора |

Сгенерировать хэш:
```bash
node -e "console.log(require('bcryptjs').hashSync('ВАШ_ПАРОЛЬ', 12))"
```

> ⚠️ В `.env.local` символы `$` в хэше нужно экранировать: `\$2b\$12\$...`  
> На Vercel экранирование не нужно — вставляй хэш как есть.

## Страницы

| Страница | URL |
|---|---|
| Главная | `/` |
| Меню | `/menu` |
| Бронирование | `/booking` |
| Панель администратора | `/admin` |

## Деплой на Vercel + Neon

1. Создать БД на [neon.tech](https://neon.tech), скопировать строку подключения
2. Импортировать репозиторий на [vercel.com](https://vercel.com)
3. Добавить `DATABASE_URL` и `ADMIN_PASSWORD_HASH` в Environment Variables
4. Deploy

## Скрипты

```bash
npm run dev      # режим разработки
npm run build    # production-сборка
npm start        # запуск собранной версии
```
