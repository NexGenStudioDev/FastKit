# FastKit - Package Manager Usage Guide

**FastKit** is a development toolkit that supports both `npm` and `pnpm` for installation, development, and publishing workflows.

📦 Available on npm:  
[@nexgenstudiodev/fastkit](https://www.npmjs.com/package/@nexgenstudiodev/fastkit)

---

## 📥 Installation

### Using npm
```bash
npm install @nexgenstudiodev/fastkit
```

### Using pnpm
```bash
pnpm add @nexgenstudiodev/fastkit
```
### Using yarn

```bash
yarn add @nexgenstudiodev/fastkit
```


## 🔧 Development Scripts

The following scripts are available via `npm run <script>` or `pnpm run <script>`:

| Script           | Description                                        |
|------------------|--------------------------------------------------|
| `build`          | Compile TypeScript to JavaScript using `tsc`    |
| `clean`          | Delete the `dist` directory using `rimraf`      |
| `rebuild`        | Clean and then build (npm version)                |
| `rebuild:pnpm`   | Clean and then build (pnpm version)               |
| `lint`           | Run ESLint on all `.ts` and `.tsx` files in `src/` |
| `lint:fix`       | Automatically fix linting issues                   |
| `test`           | Run tests with Jest                                |
| `test:watch`     | Watch files and re-run tests on change             |
| `test:coverage`  | Run tests and generate coverage report             |
| `start:dev`      | Start development mode using `ts-node-dev`         |
| `format`         | Format all supported files in `src/` using Prettier |
| `prepublishOnly` | Format, lint, and build before publishing (npm lifecycle hook) |
| `publish:npm`    | Publish the package to npm (with public access)     |
| `publish:pnpm`   | Publish the package using pnpm (skip git checks)    |
| `version:patch`  | Bump patch version using npm                         |
| `version:minor`  | Bump minor version using npm                         |
| `version:major`  | Bump major version using npm                         |




### 🚀 Publishing Workflow


#### Using npm

1. Make your changes
2. Run tests:

 ```bash
 npm test
 ```
3. Build the project: 

```bash
npm run build
```

4. Bump version (choose one):

```bash
npm run version:patch
npm run version:minor
npm run version:major
```

5. Publish package:

```bash
npm run publish:npm
```

### Using pnpm
1. Make your changes
2. Run tests:

```bash
 pnpm test
```

3. Build the project:

```bash
 pnpm run build
```

4. Bump version (choose one):

````bash
npm run version:patch
npm run version:minor
npm run version:major
````

5. Publish:

````bash
pnpm run publish:pnpm
````

## ⚙️ Configuration Files

| File               | Description                      |
|--------------------|---------------------------------|
| `package.json`      | Project configuration (shared)  |
| `.pnpmrc`           | pnpm-specific configuration     |
| `.npmignore`        | Files to exclude from npm package|
| `pnpm-lock.yaml`    | pnpm lockfile (auto-generated)  |
| `package-lock.json` | npm lockfile (auto-generated)   |

---

## ✅ Best Practices

- Use a single package manager throughout your project  
- Commit lockfiles to ensure consistent builds  
- Use the correct CLI scripts based on your package manager  
- Use **npm** for version management  
- Use either **npm** or **pnpm** to publish — do not mix both  

---

## 📊 Package Manager Comparison

| Feature           | npm          | pnpm           |
|-------------------|--------------|----------------|
| Speed             | Moderate     | Fast           |
| Disk Usage        | High         | Low            |
| Node Modules      | Full copy    | Symlinked      |
| Lockfile          | package-lock.json | pnpm-lock.yaml  |
| Workspace Support | ✅           | ✅             |
| Compatibility     | Universal    | Growing        |

---

## 🛠️ Troubleshooting

### Common Issues

- **Mixed lockfiles**  
  Delete both `pnpm-lock.yaml` and `package-lock.json`, then reinstall dependencies.

- **Permission errors**  
  Use `npm login` or configure your npm registry properly.

- **Version conflicts**  
  Bump the version before attempting to publish.

- **Build errors**  
  Try the following:  
  - Check for syntax errors or missing dependencies  
  - Delete `node_modules` and reinstall packages  
  - Ensure your TypeScript configuration is correct  
  - Run `npm run clean` before building again

```bash
npm run clean
npm run build
```


### Environment Setup

```bash
# Check versions
node --version
npm --version
pnpm --version

# Configure registries
npm config set registry https://registry.npmjs.org/
pnpm config set registry https://registry.npmjs.org/

```

## 🔑 Authentication and Token Management

### Using Git Credential Manager

Git Credential Manager securely stores your GitHub and npm tokens, so you don’t have to enter them repeatedly.

- **Windows:**  
  It comes bundled with [Git for Windows](https://git-scm.com/download/win).

- **macOS / Linux:**  
  Install Git Credential Manager via your package manager or from the official releases:  
  - For macOS (using Homebrew):  
    ```bash
    brew install --cask git-credential-manager-core
    ```  
  - For Linux, follow instructions here:  
    [https://aka.ms/gcm/linux](https://aka.ms/gcm/linux)

### Configuration

Once installed, you can enable Git Credential Manager by running:  
```bash
git-credential-manager-core configure
```


### Setting NPM Token in .npmrc

```bash
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
save-prefix=^

```

-  Set your NPM_TOKEN as an environment variable in your shell or CI environment:

```bash
export NPM_TOKEN=your_actual_token_here
```

## 📦 Downloading and Using the Package

After installation, import FastKit modules in your code:

```typescript
import { fastKitConfig } from '@nexgenstudiodev/fastkit/config';
```

Or simply require if using CommonJS:

```ts
const { fastKitConfig } = require('@nexgenstudiodev/fastkit/config');
```

## 🤝 Contribution and Support

We welcome contributions! Feel free to submit pull requests or open issues on the [GitHub repository]().

For support or questions, please open an issue or reach out to the maintainers directly.

Happy coding with FastKit! 🚀
