# FastKit

A modular, class-based toolkit for fast API development using TypeScript and Express.

This library helps you build clean, maintainable APIs by offering ready-to-use, feature-specific classes (like Auth, User, etc.) with built-in versioning support. Define your own routes while leveraging reusable business logic, validators, services, and more — all organized for scalability and long-term maintenance.

## 🚀 Features

- **Modular Architecture**: Build APIs with feature-specific modules
- **Class-based Design**: Clean, object-oriented approach to API development
- **Built-in Versioning**: Support for API versioning out of the box
- **TypeScript First**: Full TypeScript support with type safety
- **Express Integration**: Built on top of the reliable Express.js framework
- **Reusable Components**: Pre-built validators, services, and controllers
- **Scalable Structure**: Organized for long-term maintenance and growth

## 📦 Installation

```bash
# Using npm
npm install @nexgenstudiodev/fastkit

# Using pnpm
pnpm add @nexgenstudiodev/fastkit

# Using yarn
yarn add @nexgenstudiodev/fastkit
```

## 🔧 Quick Start

```typescript
import { FastKit } from '@nexgenstudiodev/fastkit';
import { loadFastKitConfig } from '@nexgenstudiodev/fastkit/config';
import express from 'express';

const app = express();

// Load configuration from .env file
const config = loadFastKitConfig();

// Initialize FastKit with configuration
const fastKit = new FastKit(app, config);

// Initialize your features
fastKit.use('/api/v1/auth', AuthFeature);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});

```



> 📖 **Learn More**: Check out the [Configuration Documentation](CONFIGURATION.md) for detailed usage examples.

## 🏗️ Project Structure

```
src/
├── features/
│   ├── Auth/
│   │   └── v1/
│   │       ├── Auth.controller.ts
│   │       ├── Auth.service.ts
│   │       ├── Auth.validators.ts
│   │       ├── Auth.constant.ts
│   │       └── Auth.ts
│   └── Ecommerce/
│       └── v1/
└── config/
```

## 📚 Core Concepts

### Features
Features are self-contained modules that encapsulate related functionality. Each feature includes:

- **Controller**: Handle HTTP requests and responses
- **Service**: Business logic and data processing
- **Validators**: Input validation and sanitization
- **Constants**: Feature-specific constants and configurations

### Versioning
FastKit supports built-in API versioning, allowing you to maintain multiple versions of your API simultaneously:

```typescript
// v1 implementation
features/Auth/v1/Auth.ts

// v2 implementation (when needed)
features/Auth/v2/Auth.ts
```

## 🛠️ Usage Examples

### Creating a Custom Feature

```typescript
// features/User/v1/User.controller.ts
export class UserController {
  async getUser(req: Request, res: Response) {
    // Controller logic
  }
  
  async createUser(req: Request, res: Response) {
    // Controller logic
  }
}

// features/User/v1/User.service.ts
export class UserService {
  async findUser(id: string) {
    // Service logic
  }
  
  async createUser(userData: any) {
    // Service logic
  }
}

// features/User/v1/User.ts
import { UserController } from './User.controller';
import { UserService } from './User.service';

export class UserFeature {
  private controller: UserController;
  private service: UserService;
  
  constructor() {
    this.service = new UserService();
    this.controller = new UserController();
  }
  
  getRoutes() {
    // Define your routes
  }
}
```

### Authentication Feature

```typescript
import { AuthFeature } from '@abhishek-nexgen-dev/fastkit';

// Use the built-in Auth feature
app.use('/api/v1/auth', AuthFeature.getRoutes());
```

## 🔒 Security Features

- Input validation and sanitization
- Built-in authentication patterns
- Security headers and middleware
- Rate limiting support

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📖 Documentation

For detailed documentation, examples, and API reference, visit our [documentation site](https://github.com/NexGenStudioDev/FastKit#readme).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

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

## 🗺️ Roadmap

- [ ] Plugin system for third-party integrations
- [ ] GraphQL support
- [ ] Database ORM integrations
- [ ] Advanced caching mechanisms
- [ ] Real-time features with WebSockets
- [ ] CLI tool for project scaffolding

---

Made with ❤️ by [NexGen Studio Dev](https://github.com/NexGenStudioDev)
