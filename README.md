# 🚀 FastKit – Modular, Scalable API Toolkit with TypeScript + Express

FastKit is a **developer-first**, **class-based**, and **plug-and-play** toolkit built on top of Express and TypeScript to help you build APIs faster — with clean structure, reusable logic, and zero boilerplate.

✅ You can use `fastKit.get()`, `post()`, `put()`, `delete()` for defining routes  
✅ All services, controllers, middlewares, and utilities are modular and importable  
✅ No framework lock-in — write your own logic, inject nothing

---

## 🎯 Why Use FastKit?

- 🧱 **Clean Architecture** – Organize your features like `Auth`, `Todo`, `Email`, etc.
- 🔁 **Reusable Everything** – Use any controller, validator, service, or utility anywhere
- 🧩 **Modular Setup** – Easily extend with your own modules
- 🧠 **Zero Magic** – No decorators, no complex DI, no auto-binding
- ⚡ **TypeScript First** – Type-safe from top to bottom
- 🌍 **Plug-and-Play** – Use just the parts you need




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




## 🛠️ Getting Started

###  1. Create FastKit App

````ts
// server.ts
import express from 'express';
import { FastKit } from './fastkit';
import { loadFastKitConfig } from './config/fastkit.config';

const app = express();
const config = loadFastKitConfig();

const fastKit = new FastKit(app, config);

// Your routes
import './apiRoutes';

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
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
