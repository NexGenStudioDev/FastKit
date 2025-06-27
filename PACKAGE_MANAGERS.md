# FastKit - Package Manager Usage Guide

This document explains how to use FastKit with both npm and pnpm package managers.

## Installation

### Using npm
```bash
npm install @abhishek-nexgen-dev/fastkit
```

### Using pnpm
```bash
pnpm add @abhishek-nexgen-dev/fastkit
```

### Using yarn
```bash
yarn add @abhishek-nexgen-dev/fastkit
```

## Development Scripts

### For npm users
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Clean build artifacts
npm run clean

# Rebuild (clean + build)
npm run rebuild

# Start development server
npm run start:dev

# Format code
npm run format

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Publish to npm
npm run publish:npm

# Version bumping
npm run version:patch
npm run version:minor
npm run version:major
```

### For pnpm users
```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Clean build artifacts
pnpm run clean

# Rebuild (clean + build) - pnpm optimized
pnpm run rebuild:pnpm

# Start development server
pnpm run start:dev

# Format code
pnpm run format

# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Publish to npm
pnpm run publish:pnpm

# Version bumping (still uses npm for version management)
npm run version:patch
npm run version:minor
npm run version:major
```

## Publishing Workflow

### Using npm
1. Make your changes
2. Run tests: `npm test`
3. Build: `npm run build`
4. Bump version: `npm run version:patch` (or minor/major)
5. Publish: `npm run publish:npm`

### Using pnpm
1. Make your changes
2. Run tests: `pnpm test`
3. Build: `pnpm run build`
4. Bump version: `npm run version:patch` (or minor/major)
5. Publish: `pnpm run publish:pnpm`

## Configuration Files

- **package.json**: Main package configuration (works with both)
- **.pnpmrc**: pnpm-specific configuration
- **.npmignore**: Files to exclude from npm package
- **pnpm-lock.yaml**: pnpm lockfile (auto-generated)
- **package-lock.json**: npm lockfile (auto-generated)

## Best Practices

1. **Choose one package manager** for your project and stick with it
2. **Commit lockfiles** to ensure reproducible builds
3. **Use the correct scripts** for your chosen package manager
4. **Version management** should use npm commands regardless of package manager
5. **Publishing** can use either npm or pnpm commands

## Package Manager Comparison

| Feature | npm | pnpm |
|---------|-----|------|
| Speed | Moderate | Fast |
| Disk Usage | High | Low (symlinks) |
| Node Modules | Full copy | Symlinked |
| Lockfile | package-lock.json | pnpm-lock.yaml |
| Workspace Support | ✅ | ✅ |
| Compatibility | Universal | Growing |

## Troubleshooting

### Common Issues

1. **Mixed lockfiles**: Delete both lockfiles and reinstall with your chosen package manager
2. **Permission errors**: Use `npm login` or configure registry authentication
3. **Version conflicts**: Ensure version is bumped before publishing
4. **Build errors**: Run `npm run clean` then `npm run build`

### Environment Setup

```bash
# Check versions
node --version
npm --version
pnpm --version

# Configure npm registry (if needed)
npm config set registry https://registry.npmjs.org/

# Configure pnpm registry (if needed)
pnpm config set registry https://registry.npmjs.org/
```

## Links

- [npm Documentation](https://docs.npmjs.com/)
- [pnpm Documentation](https://pnpm.io/)
- [Package on npm](https://www.npmjs.com/package/@abhishek-nexgen-dev/fastkit)
- [GitHub Repository](https://github.com/NexGenStudioDev/FastKit)
