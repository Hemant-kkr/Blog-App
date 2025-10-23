# Blog-App
# 🚀 Blogify API – Full-Stack Blog Platform Backend


[![Node.js](https://img.shields.io/badge/Node.js-18.15.0-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.18.2-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


**Blogify API** is a production-ready **RESTful backend** for a modern blogging platform.  
Supports **CRUD posts, comments, likes, search, analytics, pagination, and role-based access**.

---

## 🌟 Key Features

- ✅ **Role-based Access Control**: Guest, User, Author, Admin  
- ✅ **JWT Authentication** (Access + Refresh Tokens)  
- ✅ **CRUD Operations** for posts and comments  
- ✅ **Pagination & Filtering** for posts and comments  
- ✅ **Search & Tag/Category Filtering**  
- ✅ **Likes / Views / Trending Posts Analytics**  
- ✅ **Admin Dashboard Endpoints**  
- ✅ **Scalable Architecture** (controllers, services, middleware separation)  

---

## 🧩 Architecture & Flow

```mermaid
sequenceDiagram
    participant Guest
    participant User
    participant Author
    participant Admin
    participant API
    participant DB

    Guest->>API: GET /posts
    API->>DB: Fetch published posts
    DB-->>API: Return posts
    API-->>Guest: JSON posts

    User->>API: POST /posts/:id/like
    API->>DB: Update likes
    DB-->>API: Updated post
    API-->>User: Like success

    Author->>API: POST /posts
    API->>DB: Save new post
    DB-->>API: Post created
    API-->>Author: Success

    Admin->>API: DELETE /posts/:id
    API->>DB: Delete post
    DB-->>API: Success
    API-->>Admin: Post deleted


**Blogify API** is a **RESTful backend API** for a modern blogging platform.  
It provides **CRUD operations for posts, user authentication, comments, likes, analytics, pagination, and search**, built with **Node.js, Express, and MongoDB (Mongoose)**.  

This API is **scalable, secure, and production-ready**, suitable for **portfolio projects, freelancing, or company-grade applications**.

---

## 🔧 Project Overview

Blogify API allows:

- Users to **register/login**, manage profiles, like and comment on posts.  
- Authors to **create, edit, publish, and delete posts**, view analytics.  
- Admins to **manage users, posts, and site-wide analytics**.  
- Public visitors to **read and search blog posts** with pagination, filtering, and sorting.  

This backend is designed to serve a **modern frontend** (React, Vue, Angular, or mobile apps) and is ready for **cloud deployment**.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime / Server | Node.js (LTS) |
| Web Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access & Refresh Tokens) |
| Security | Helmet, CORS, Rate-Limiting, XSS Clean, HPP |
| File Uploads | Multer / Optional S3 Integration |
| Validation | Joi / Express-Validator |
| Logging | Morgan + Winston |
| Testing | Jest + Supertest |
| Deployment | Render / Railway / Heroku |

---

## 🗂️ Folder Structure

```text
src/
├─ config/           # Environment & DB configuration
├─ controllers/      # HTTP request handlers
├─ models/           # Mongoose models
├─ routes/           # API routes
├─ services/         # Business logic
├─ middlewares/      # Auth, validation, rate-limiting, error handling
├─ utils/            # Helpers (pagination, slug, errors)
├─ validators/       # Request body validation schemas
├─ tests/            # Unit & integration tests
└─ server.js         # Entry point

Absolutely! Let’s create a **professional, attractive, and industry-ready README.md** for your Blog API project. This README will make it look **portfolio-ready for companies, recruiters, or clients**, and easy to read for developers.

---

````markdown
# 🚀 Blogify API – Full-Stack Blog Platform Backend

![Blogify Banner](https://i.imgur.com/8bGQmJx.png)

**Blogify API** is a **RESTful backend API** for a modern blogging platform.  
It provides **CRUD operations for posts, user authentication, comments, likes, analytics, pagination, and search**, built with **Node.js, Express, and MongoDB (Mongoose)**.  

This API is **scalable, secure, and production-ready**, suitable for **portfolio projects, freelancing, or company-grade applications**.

---

## 🔧 Project Overview

Blogify API allows:

- Users to **register/login**, manage profiles, like and comment on posts.  
- Authors to **create, edit, publish, and delete posts**, view analytics.  
- Admins to **manage users, posts, and site-wide analytics**.  
- Public visitors to **read and search blog posts** with pagination, filtering, and sorting.  

This backend is designed to serve a **modern frontend** (React, Vue, Angular, or mobile apps) and is ready for **cloud deployment**.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime / Server | Node.js (LTS) |
| Web Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access & Refresh Tokens) |
| Security | Helmet, CORS, Rate-Limiting, XSS Clean, HPP |
| File Uploads | Multer / Optional S3 Integration |
| Validation | Joi / Express-Validator |
| Logging | Morgan + Winston |
| Testing | Jest + Supertest |
| Deployment | Render / Railway / Heroku |

---

## 🗂️ Folder Structure

```text
src/
├─ config/           # Environment & DB configuration
├─ controllers/      # HTTP request handlers
├─ models/           # Mongoose models
├─ routes/           # API routes
├─ services/         # Business logic
├─ middlewares/      # Auth, validation, rate-limiting, error handling
├─ utils/            # Helpers (pagination, slug, errors)
├─ validators/       # Request body validation schemas
├─ tests/            # Unit & integration tests
└─ server.js         # Entry point
````

---

## 🧩 Database Schema Overview

### User

* `name`, `email`, `password` (hashed), `role` (`user|author|admin`), `bio`, `avatar`, `createdAt`

### Post

* `title`, `slug`, `body`, `excerpt`, `author`, `tags`, `status` (`draft|published`), `likes[]`, `views`, `commentsCount`, `featuredImage`, timestamps

### Comment

* `post`, `author`, `body`, `createdAt`

---

## 🔄 API Endpoints Overview

### Authentication

| Endpoint                    | Method | Auth | Description              |
| --------------------------- | ------ | ---- | ------------------------ |
| `/api/auth/register`        | POST   | ❌    | User registration        |
| `/api/auth/login`           | POST   | ❌    | Login and JWT token      |
| `/api/auth/logout`          | POST   | ✅    | Logout and revoke token  |
| `/api/auth/refresh`         | POST   | ❌    | Refresh access token     |
| `/api/auth/forgot-password` | POST   | ❌    | Send password reset link |
| `/api/auth/reset-password`  | POST   | ❌    | Reset password           |

### Posts

| Endpoint              | Method | Auth             | Description                                |
| --------------------- | ------ | ---------------- | ------------------------------------------ |
| `/api/posts`          | GET    | ❌                | List published posts (pagination & filter) |
| `/api/posts/:slug`    | GET    | ❌                | Get single post                            |
| `/api/posts`          | POST   | ✅ (author/admin) | Create post                                |
| `/api/posts/:id`      | PUT    | ✅ (author/admin) | Edit post                                  |
| `/api/posts/:id`      | DELETE | ✅ (author/admin) | Delete post                                |
| `/api/posts/:id/like` | POST   | ✅                | Like/unlike post                           |

### Comments

| Endpoint                  | Method | Auth | Description    |
| ------------------------- | ------ | ---- | -------------- |
| `/api/posts/:id/comments` | GET    | ❌    | List comments  |
| `/api/posts/:id/comments` | POST   | ✅    | Add comment    |
| `/api/comments/:id`       | DELETE | ✅    | Delete comment |
| `/api/comments/:id`       | PUT    | ✅    | Edit comment   |

*(Complete endpoints list available in `/docs/API.md` for reference)*

---

## 🔐 Authentication & Roles

| Role   | Permissions                                  |
| ------ | -------------------------------------------- |
| Guest  | Read posts, search                           |
| User   | Like, comment, profile management            |
| Author | CRUD own posts, analytics of own posts       |
| Admin  | Manage all users, posts, comments, analytics |

JWT-based **access tokens** for authentication, **role-based middleware** for authorization, and **refresh tokens** for session management.

---

## 🧪 Testing

* Use **Postman** or **Insomnia** to test API endpoints.
* Automated tests written with **Jest + Supertest** (unit & integration).
* Run tests:

```bash
npm install
npm run test
```

---

## 🚀 Deployment

1. Clone repository:

```bash
git clone https://github.com/yourusername/blogify-api.git
cd blogify-api
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

```
MONGO_URI=
ACCESS_SECRET=
REFRESH_SECRET=
PORT=5000
```

4. Start server (dev):

```bash
npm run dev
```

5. Deploy on **Render/Railway/Heroku**, set environment variables in platform dashboard.

---

## 💡 Bonus Features

* **Redis caching** for top posts & session management
* **Full-text search** with MongoDB indexes
* **Trending & Analytics** endpoints
* **File uploads** for post images (local/Cloud S3)
* **Role-based dashboards** for authors & admins

---

## 🧑‍💻 Teaching / Portfolio Angle

* Industry-standard **architecture** with controllers/services/middleware separation
* Clean **folder structure** scalable for large apps
* JWT + role-based auth → teaches security best practices
* Pagination, search, analytics → teaches real-world features

---

## 📝 Future Improvements

* GraphQL endpoint for flexible queries
* Microservice architecture for comments/posts
* Email notifications on new posts/comments
* Advanced analytics dashboard (charts, top authors, trending posts)

---

## 🌟 License

MIT License – free for personal & commercial use

---

**Made with ❤️ Node.js, Express & MongoDB**



