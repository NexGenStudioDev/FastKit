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


### Using npm

```bash
pnpm add @nexgenstudiodev/fastkit
```

### Using yarn

```bash
yarn add @nexgenstudiodev/fastkit
```


# 🔧 Development Scripts

The following scripts are available via `npm run <script>` or `pnpm run <script>`:

| Script          | Description                                            |
|-----------------|--------------------------------------------------------|
| `build`         | Compile TypeScript to JavaScript using `tsc`          |
| `clean`         | Delete the `dist` directory using `rimraf`             |
| `rebuild`       | Clean and then build (npm version)                      |
| `rebuild:pnpm`  | Clean and then build (pnpm version)                     |
| `lint`          | Run ESLint on all `.ts` and `.tsx` files in `src/`     |
| `lint:fix`      | Automatically fix linting issues                         |
| `test`          | Run tests with Jest                                     |
| `test:watch`    | Watch files and re-run tests on change                   |
| `test:coverage` | Run tests and generate coverage report                   |
| `start:dev`     | Start development mode using `ts-node-dev`              |
| `format`        | Format all supported files in `src/` using Prettier     |
| `prepublishOnly`| Format, lint, and build before publishing (npm lifecycle hook) |
| `publish:npm`   | Publish the package to npm (with public access)          |
| `publish:pnpm`  | Publish the package using pnpm (skip git checks)         |
| `version:patch` | Bump patch version using npm                              |
| `version:minor` | Bump minor version using npm                              |
| `version:major` | Bump major version using npm                              |

---

# 🚀 Publishing Workflow

### Using npm
1. Make your changes  
2. Run tests: `npm test`  
3. Build the project: `npm run build`  
4. Bump version:  
   - `npm run version:patch` (or use `version:minor` / `version:major`)  
5. Publish: `npm run publish:npm`  

### Using pnpm
1. Make your changes  
2. Run tests: `pnpm test`  
3. Build the project: `pnpm run build`  
4. Bump version:  
   - `npm run version:patch` (or use `version:minor` / `version:major`)  
5. Publish: `pnpm run publish:pnpm`  

---

# ⚙️ Configuration Files

| File             | Description                     |
|------------------|---------------------------------|
| `package.json`   | Project configuration (shared)  |
| `.pnpmrc`        | pnpm-specific config            |
| `.npmignore`     | Exclude files from npm package  |
| `pnpm-lock.yaml` | pnpm lockfile (auto-generated) |
| `package-lock.json` | npm lockfile (auto-generated) |

---

# ✅ Best Practices

- Use a single package manager throughout your project  
- Commit lockfiles to ensure consistent builds  
- Use correct CLI scripts based on your manager  
- Use npm for version management  
- Use either npm or pnpm to publish, **not both**

---

# 📊 Package Manager Comparison

| Feature         | npm        | pnpm         |
|-----------------|------------|--------------|
| Speed           | Moderate   | Fast         |
| Disk Usage      | High       | Low          |
| Node Modules    | Full copy  | Symlinked    |
| Lockfile        | package-lock.json | pnpm-lock.yaml |
| Workspace Support | ✅        | ✅           |
| Compatibility   | Universal  | Growing      |


# 🛠️ Troubleshooting

## Common Issues

### Mixed lockfiles
Delete both `pnpm-lock.yaml` and `package-lock.json`, then reinstall dependencies.

### Permission errors
Use `npm login` or configure your npm registry properly.

### Version conflicts
Bump the version before attempting to publish.

### Build errors
Try:
- Checking for syntax errors or missing dependencies
- Deleting `node_modules` and reinstalling packages
- Ensuring your TypeScript configuration is correct
- Running `npm run clean` before building again


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