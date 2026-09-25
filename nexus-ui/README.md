# Nexus Platform — Full-Stack Platform

Платформа верификации навыков человека и ИИ для стажировок и найма инженеров (Nexus Human + AI Proof-of-Skill).

Архитектура проекта:
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas & SVG
- **Backend**: Express 4 (`server.ts`) с REST API и поддержкой Vite Middlewares
- **Хранилище данных**: JSON-файлы в директории `/data` (`internships.json`, `tasks.json`, `workEvents.json`, `passports.json`)

---

## 🚀 Быстрый старт (Local Setup)

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск Full-Stack сервера (Фронтенд + Бэкенд)
```bash
npm run dev
```
После запуска откройте в браузере:
👉 **http://localhost:3000**

Сервер Express автоматически:
1. Запустит REST API на `/api/*`
2. Подключит Vite в режиме middleware для мгновенной сборки фронтенда
3. Обеспечит запись и чтение файлов данных из `/data/*.json`

---

## 📁 Структура файлов данных (`/data`)

Бэкенд сохраняет и отдаёт данные из следующих JSON файлов:

| Файл | Описание | REST Эндпоинты |
| :--- | :--- | :--- |
| `data/internships.json` | Каталог программ стажировок от компаний | `GET /api/internships`, `POST /api/internships` |
| `data/tasks.json` | Задачи стажировок, рубрики и требования к навыкам | `GET /api/tasks`, `POST /api/tasks` |
| `data/workEvents.json` | Журнал телеметрии действий студента и ИИ | `GET /api/work-events`, `POST /api/work-events` |
| `data/passports.json` | Выпущенные цифровые паспорта Nexus Passport | `GET /api/passports`, `POST /api/passports` |

---

## 🛠️ Скрипты проекта (`package.json`)

- `npm run dev` — Запуск Full-Stack сервера (Express + Vite) на порту 3000
- `npm run build` — Сборка фронтенда и упаковка `public/nexus-platform-source.zip`
- `npm run export:zip` — Сборка актуального ZIP архива со всеми исходниками проекта
- `npm run lint` — Проверка TypeScript типов (`tsc --noEmit`)

---

## 🌐 REST API Спецификация

- `GET /api/health` — Проверка статуса сервера и файловой системы
- `GET /api/internships` — Получить список всех стажировок
- `POST /api/internships` — Добавить новую стажировку (сохраняет в `data/internships.json`)
- `GET /api/tasks` — Получить список задач
- `POST /api/tasks` — Добавить задачу (сохраняет в `data/tasks.json`)
- `GET /api/work-events` — Получить события работы и телеметрию
- `POST /api/work-events` — Записать новое действие в журнал
- `GET /api/passports` — Получить выданные паспорта
- `POST /api/passports` — Выпустить и сохранить паспорт (сохраняет в `data/passports.json`)
- `GET /api/download-zip` — Скачать полный архив проекта (.zip)
