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

## 🔧 Development Scripts

The following scripts are available via `npm run <script>` or `pnpm run <script>`:

### 📦 SETUP.md – NPM Token Authentication with .env and CLI

| Script             | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| **build**          | Compile TypeScript using `tsc` and fix paths using `tsc-alias` |
| **clean**          | Delete the `dist` directory using `rimraf`                     |
| **rebuild**        | Clean and then build the project                               |
| **lint**           | Run ESLint on all `.ts` and `.tsx` files in `src/`             |
| **lint:fix**       | Automatically fix lint issues                                  |
| **format**         | Format source files using Prettier                             |
| **test**           | Run all tests using Jest                                       |
| **test:watch**     | Watch and re-run tests on file changes                         |
| **test:coverage**  | Generate code coverage report                                  |
| **start:dev**      | Start dev server using `ts-node-dev`                           |
| **prepublishOnly** | Hook to format, lint, and build before publishing              |
| **publish:npm**    | Publish package to npm using npm CLI                           |
| **publish:pnpm**   | Publish package to npm using pnpm (skip git checks)            |
| **version:patch**  | Bump patch version                                             |
| **version:minor**  | Bump minor version                                             |
| **version:major**  | Bump major version                                             |
| **add**            | _(Your custom script — specify its function if needed)_        |

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

# 📦 Publishing and Installing npm Packages with Custom Tags

When you publish a package to npm, each version **must have a version number higher than all previously published versions**. This helps npm identify the newest version.

If you try to publish a version that is **lower or the same** as a previously published version using the default `latest` tag, npm will throw an error.

---

## Using Custom Tags to Avoid Errors

To avoid this error, you can publish your package using a **different tag** instead of `latest`. Tags let you label versions differently, such as `beta`, `next`, or `dev`.

---

## Example: Publishing a Beta Version

If you're working on a new feature or a major update and want users to test it **without affecting the stable release**, you can publish it under a `beta` tag.

### Steps:

1. **Update the Version**  
   Increment your package’s version number to indicate it’s a beta release.  
   For example, if your current version is `1.0.0`, you might update it to `1.1.0-beta.0`.

2. **Publish with a Custom Tag**  
   Run the following command to publish your package under the `beta` tag:

   ```bash
   npm publish --tag beta
   ```

   Or if you use an npm script like publish:npm:

   ```bash
   npm run publish:npm -- --tag beta
   ```

   This way, your beta version is available for testing, but users installing your package normally will still get the stable latest version.

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

```bash
npm run version:patch  # Small bugfixes, no new features
npm run version:minor  # New features, no breaking changes
npm run version:major  # 	Breaking changes, major updates
```

5. Publish:

```bash
pnpm run publish:pnpm
```

## ⚙️ Configuration Files

| File                | Description                       |
| ------------------- | --------------------------------- |
| `package.json`      | Project configuration (shared)    |
| `.pnpmrc`           | pnpm-specific configuration       |
| `.npmignore`        | Files to exclude from npm package |
| `pnpm-lock.yaml`    | pnpm lockfile (auto-generated)    |
| `package-lock.json` | npm lockfile (auto-generated)     |

---

# Version & Tag Management for `@nexgenstudiodev/fastkit`

| Topic                        | Command / Info                                           | Description                                |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------ |
| **View all tags**            | `npm dist-tag ls @nexgenstudiodev/fastkit`               | List all tags and their versions           |
| **Set latest tag version**   | `npm dist-tag add @nexgenstudiodev/fastkit@1.1.3 latest` | Point `latest` tag to version `1.1.3`      |
| **Tag a version as beta**    | `npm dist-tag add @nexgenstudiodev/fastkit@2.0.0 beta`   | Mark version `2.0.0` as `beta`             |
| **Install latest version**   | `npm install @nexgenstudiodev/fastkit`                   | Install version tagged `latest`            |
| **Install specific version** | `npm install @nexgenstudiodev/fastkit@1.1.3`             | Install exact version `1.1.3`              |
| **Install tagged version**   | `npm install @nexgenstudiodev/fastkit@beta`              | Install version tagged `beta`              |
| **Publish with tag**         | `npm publish --tag latest` or `npm publish --tag beta`   | Publish package with specified tag         |
| **Clear npm cache**          | `npm cache clean --force`                                | Fix cache issues when updates don’t appear |

---

## ✅ Best Practices

- Use a single package manager throughout your project
- Commit lockfiles to ensure consistent builds
- Use the correct CLI scripts based on your package manager
- Use **npm** for version management
- Use either **npm** or **pnpm** to publish — do not mix both

---

## 📊 Package Manager Comparison

| Feature           | npm               | pnpm           |
| ----------------- | ----------------- | -------------- |
| Speed             | Moderate          | Fast           |
| Disk Usage        | High              | Low            |
| Node Modules      | Full copy         | Symlinked      |
| Lockfile          | package-lock.json | pnpm-lock.yaml |
| Workspace Support | ✅                | ✅             |
| Compatibility     | Universal         | Growing        |

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

- Set your NPM_TOKEN as an environment variable in your shell or CI environment:

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
