# Ticket Management Dashboard

Простое SPA-приложение для управления заявками (tickets).  
Проект демонстрирует современный стек **React + TypeScript** и типичные паттерны разработки интерфейсов: формы, таблицы, фильтрацию, загрузку файлов и валидацию.

## ✨ Возможности

### Работа с тикетами
- Просмотр списка заявок в таблице
- Создание новой заявки через модальное окно
- Отображение статуса, клиента, исполнителя и даты создания

### Фильтрация таблицы
- Фильтры для каждого столбца
- Всплывающее окно фильтра при клике на иконку в заголовке
- Debounce для текстовых фильтров
- Select-фильтр для статуса
- Подсветка активных фильтров

### Форма создания тикета
- Валидация через **Zod**
- Управление формой через **React Hook Form**
- Очистка формы после отправки
- Типизированные данные формы

### Загрузка файлов
- Drag & Drop
- Предпросмотр изображений
- Удаление файлов
- Ограничение количества файлов
- Ограничение размера файлов
- Проверка типов файлов
- Очистка `objectURL` для предотвращения утечек памяти

## 🧱 Технологии

- **React**
- **TypeScript**
- **Chakra UI**
- **React Hook Form**
- **Zod**
- **Vite**

## 📁 Структура проекта

```
src
│
├── components
│   ├── TicketTable
│   │   └── TicketTable.tsx
│   │
│   ├── TicketToolbar
│   │   └── TicketToolbar.tsx
│   │
│   ├── FileUpload
│   │   └── FileUpload.tsx
│   │
│   └── features
│       └── tickets
│           ├── CreateTicketModal.tsx
│           └── mockData.ts
│
├── schemas
│   └── createTicketSchema.ts
│
├── hooks
│   └── useDebounce.ts
│
├── constants
│   └── ticketStatuses.ts
│
├── types
│   └── ticket.ts
│
└── App.tsx

```



## 🧩 Основные типы

### Ticket

```ts
export interface Ticket {
  id: string;
  title: string;
  client: string;
  status: TicketStatus;
  assignee: string;
  createdAt: string;
}
````

### TicketStatus

```ts
export type TicketStatus =
  | "new"
  | "in_progress"
  | "ready";
```

## 🚀 Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Запуск dev-сервера

```bash
npm run dev
```

Приложение будет доступно по адресу:

```
http://localhost:5173
```

### Проверка TypeScript

```bash
tsc --noEmit
```

## 🧪 Демонстрационные данные

Для демонстрации используется mock-данные:

```
src/components/features/tickets/mockData.ts
```
