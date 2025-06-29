# 🚀 FastKit – Comprehensive Full-Stack Development Toolkit

FastKit is a **developer-first**, **modular**, and **type-safe** toolkit for building modern applications with authentication, database management, and configuration handling out of the box.

✅ **Authentication Module** – Complete auth system with controllers and services  
✅ **Database Config** – Multi-database support with type-safe configurations  
✅ **Environment Management** – Automated environment setup and configuration  
✅ **TypeScript First** – Full type safety across all modules  
✅ **Framework Agnostic** – Use with Express, Fastify, or any Node.js framework  
✅ **Tree-shakable** – Import only what you need for optimal bundle size

---

## 📦 Installation

### Quick Start
```bash
npm install @nexgenstudiodev/fastkit
```

### Requirements
- Node.js 16+ 
- TypeScript 4.5+ (for TypeScript projects)

---

## 🎯 Why Choose FastKit?

- 🔐 **Complete Auth System** – Login, register, JWT handling, password reset
- �️ **Multi-Database Support** – MongoDB, PostgreSQL, MySQL, SQLite, Redis
- ⚙️ **Smart Configuration** – Environment-based config with auto-generation
- 🧩 **Modular Architecture** – Use individual modules or the complete package
- 🌍 **Universal Compatibility** – Works with CommonJS, ES Modules, and TypeScript
- 📝 **Type Safety** – Full TypeScript support with comprehensive type definitions




## 🗂️ Folder Structure

```text
FastKit/
├── package.json (root)
├── pnpm-workspace.yaml
└── src/
     └── packages/
            ├── fastkit
            ├── fastkit-config
            ├── fastkit-db-config
            └── fastkit-auth
    
```


## 📦 Installation

```bash
# Using npm
npm install @nexgenstudiodev/fastkit

# Using pnpm
pnpm add @nexgenstudiodev/fastkit

# Using yarn
yarn add @nexgenstudiodev/fastkit
```

---

## 🚀 Quick Start Examples

### JavaScript (CommonJS)
```javascript
const express = require('express');
const { 
  auth, 
  config, 
  db, 
  AuthController, 
  setup_FastKit_EnvFiles 
} = require('@nexgenstudiodev/fastkit');

const app = express();

// Setup environment files
setup_FastKit_EnvFiles();

// Use auth controller
app.post('/api/auth/login', auth.AuthController.login);
app.post('/api/auth/register', auth.AuthController.register);

// Database configuration
const dbConfig = {
  type: 'mongodb',
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp'
};

app.listen(3000, () => {
  console.log('FastKit app running on port 3000');
});
```

### JavaScript (ES Modules)
```javascript
import express from 'express';
import { 
  auth, 
  config, 
  db, 
  AuthController, 
  setup_FastKit_EnvFiles,
  FastKit 
} from '@nexgenstudiodev/fastkit';

const app = express();

// Setup environment and configuration
setup_FastKit_EnvFiles();
const appConfig = new FastKit();

// Authentication routes
app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/register', AuthController.register);
app.post('/api/auth/logout', AuthController.logout);

// Database setup
const dbConfig = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  databaseName: 'myapp'
};

app.listen(3000, () => {
  console.log('FastKit app running on port 3000');
});
```

### TypeScript
```typescript
import express, { Request, Response } from 'express';
import { 
  auth, 
  config, 
  db,
  AuthController, 
  AuthService,
  setup_FastKit_EnvFiles,
  FastKit,
  DatabaseConfig,
  DatabaseType,
  Config_Type 
} from '@nexgenstudiodev/fastkit';

const app = express();

// Type-safe configuration
setup_FastKit_EnvFiles();
const appConfig: Config_Type = new FastKit({
  database: {
    type: 'mongodb',
    url: process.env.DATABASE_URL
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: '7d'
  }
});

// Type-safe database configuration
const dbConfig: DatabaseConfig = {
  type: 'postgresql' as DatabaseType,
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  databaseName: 'myapp',
  ssl: true
};

// Authentication with full type support
app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/register', AuthController.register);

app.listen(3000, () => {
  console.log('TypeScript FastKit app running on port 3000');
});
```

---

## 📚 Module Documentation

### 🔐 Authentication Module
Complete authentication system with controllers, services, and utilities.

**Key Features:**
- Login/Register endpoints
- JWT token management  
- Password reset functionality
- Authentication middleware

**Quick Usage:**
```javascript
import { AuthController, AuthService } from '@nexgenstudiodev/fastkit';

// Use pre-built controllers
app.post('/login', AuthController.login);
```

**[📖 Full Auth Documentation](src/packages/fastkit-auth/README.md)**

### ⚙️ Configuration Module
Smart configuration management with environment handling.

**Key Features:**
- Automatic environment file generation
- Type-safe configuration objects
- Environment-specific settings
- Configuration validation

**Quick Usage:**
```javascript
import { setup_FastKit_EnvFiles, FastKit } from '@nexgenstudiodev/fastkit';

// Auto-generate .env files
setup_FastKit_EnvFiles();

// Type-safe configuration
const config = new FastKit();
```

**[📖 Full Config Documentation](src/packages/fastkit-config/README.md)**

### 🗄️ Database Configuration Module
Multi-database support with type-safe configurations.

**Key Features:**
- Support for MongoDB, PostgreSQL, MySQL, SQLite, Redis
- Type-safe database configurations
- Connection string generation
- Environment-based setup

**Quick Usage:**
```javascript
import { DatabaseConfig, DatabaseType } from '@nexgenstudiodev/fastkit';

const dbConfig: DatabaseConfig = {
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  options: { useNewUrlParser: true }
};
```

**[📖 Full Database Config Documentation](src/packages/fastkit-db-config/README.md)**

---

## 🎯 Import Flexibility

FastKit supports multiple import patterns for maximum flexibility:

### Main Package Imports
```javascript
// Everything from main package
import { auth, config, db, AuthController, FastKit } from '@nexgenstudiodev/fastkit';
```

### Sub-module Imports (Tree-shaking)
```javascript
// Import only what you need
import { AuthController } from '@nexgenstudiodev/fastkit/auth';
import { FastKit } from '@nexgenstudiodev/fastkit/config';
import { DatabaseConfig } from '@nexgenstudiodev/fastkit/db';
```

### Namespace Imports
```javascript
// Organized by module
import { auth, config, db } from '@nexgenstudiodev/fastkit';

const controller = auth.AuthController;
const dbConfig = db.DatabaseConfig;
```




## 🛠️ Getting Started

###  1. Create FastKit App

````ts
// server.js

import express from 'express';
const app = express();
import { FastKit , setup_FastKit_EnvFiles , Config_Type } from '@nexgenstudiodev/fastkit/config';


setup_FastKit_EnvFiles()
const fastKit = new FastKit(app);

fastKit.get('/', (req, res) => {
  res.send('Hello World!');
}

);

fastKit.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

````


### 2. Define Routes Anywhere Using `fastKit.get()` / `post()` / `use()`
````ts

// apiRoutes.ts
import { fastKit } from './fastkit';
import { authController } from './features/Auth/v1/Auth.controller';
import { verifyToken } from './middlewares/verifyToken';
import { SendResponse } from './utils/SendResponse';

fastKit.get('/ping', (req, res) => {
  SendResponse.success(res, 'Pong!');
});

fastKit.post('/auth/signup', authController.signup);
fastKit.get('/auth/me', verifyToken, authController.getProfile);



````


### 🧱 Usage Examples

#### ✅ Use Controller Directly

````ts
fastKit.post('/auth/login', authController.login);
````

#### ✅ Use Service Independently


````ts
import { EmailService } from './services/email/v1/Email.service';

await EmailService.sendOtp(email);

````

#### ✅ Use Middleware Anywhere

````ts
fastKit.get('/user', verifyToken, userController.getUserById);
````

#### ✅ Use Utils Like SendResponse

````ts
SendResponse.success(res, 'Your API works!');
SendResponse.error(res, 'Something went wrong', 400);
````

## 🧩 What You Can Build

- Auth systems (JWT, OTP, social logins)  
- Todo, Notes, Blog, Folder/File systems  
- File Uploads & Content Management  
- Payment integration (Stripe, Razorpay)  
- Reminder & Notification system (NodeMailer, Cron)  
- AI assistants via OpenAI API  
- WebSocket / Realtime apps with Socket.io  
- Admin panels with RBAC (roles/permissions)

#### 🔌 Plugin-Friendly

You can export every module individually and use them in any project:

````ts
import { AuthController } from 'fastkit-auth';
import { TodoController } from 'fastkit-todo';

````

#### 🔐 Middleware Examples

- `verifyToken` – Protect routes using JWT  
- `validateBody(schema)` – Validate input with Zod or Joi  
- `allowRoles('admin', 'user')` – Role-based access control

#### 📬 Email Service Examples

````ts
EmailService.sendOtp(email, template);
EmailService.sendCustom(subject, message, to);
EmailService.sendReminder(userId, date, content);

````




## 📁 Folder Module Examples

- Create Folder  
- Create File Inside Folder (supports custom extensions)  
- Delete Folder (with restriction middleware)  
- Nested Folders support  
- Folder Flags: `isLocked`, `isShared`, etc.

## 📡 WebSocket Support (Optional)

- Works with both HTTP and Socket.io  
- Real-time APIs using FastKit + Socket.io events supported

## 🧪 Troubleshooting

#### 1. Missing TypeScript Config

- ✅ Ensure all packages extend the root tsconfig.base.json:
````json
{
  "extends": "../../tsconfig.base.json"
}
````
#### 2. Publish Errors

````bash
npm version patch # Bump version first using:
pnpm publish --tag beta # publish with a tag:

````

#### 3. Mixed Lockfiles

````bash
rm -rf node_modules pnpm-lock.yaml package-lock.json
pnpm install
````


## 👥 Authors

- **Abhishek Kumar** - *Initial work* - [@abhishek-nexgen-dev](https://github.com/abhishek-nexgen-dev)

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
- Inspired by modern API development practices

## 📞 Support

- 📧 Email: abhishek.nexgen.dev@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/NexGenStudioDev/FastKit/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/NexGenStudioDev/FastKit/discussions)


## ❤️ Contributions Welcome

Want to add more features or modules like:

- Blog/Post  
- Cart  
- Analytics  
- AI Tools  
- Chat  

Create a PR or open an issue!

## 🔖 License

MIT © Abhishek Gupta
