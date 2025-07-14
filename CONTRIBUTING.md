# Contributing to FastKit

First off, thank you for considering contributing to FastKit! It's people like you that make FastKit such a great tool for the community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check [this list](https://github.com/NexGenStudioDev/FastKit/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://github.com/NexGenStudioDev/FastKit/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/NexGenStudioDev/FastKit/issues). Create an issue and provide the following information:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most FastKit users.

### Pull Requests

The process described here has several goals:

- Maintain FastKit's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible FastKit
- Enable a sustainable system for FastKit's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 🚱 `:non-potable_water:` when plugging memory leaks
  - 📝 `:memo:` when writing docs
  - 🐧 `:penguin:` when fixing something on Linux
  - 🍎 `:apple:` when fixing something on macOS
  - 🏁 `:checkered_flag:` when fixing something on Windows
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies
  - 👕 `:shirt:` when removing linter warnings

### TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing code style in the project
- Use meaningful variable and function names
- Add type annotations where helpful
- Use interfaces for object shapes
- Prefer `const` over `let` where possible
- Use arrow functions for short functions
- Use async/await over Promises where possible

### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown/) for documentation
- Reference functions, classes, and variables using backticks: `functionName()`
- Include code examples where helpful
- Keep line length to 80 characters where possible

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Create a branch for your changes: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `pnpm test`
6. Run linting: `pnpm lint`
7. Run formatting: `pnpm format`
8. Commit your changes: `git commit -m "Add your feature"`
9. Push to your fork: `git push origin feature/your-feature-name`
10. Create a pull request

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage
- Use descriptive test names
- Group related tests using `describe` blocks

## Project Structure

```
src/
├── features/           # Feature modules
│   ├── Auth/          # Authentication feature
│   └── Ecommerce/     # E-commerce feature
├── config/            # Configuration files
└── FastKit.ts         # Main entry point
```

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a pull request with the changes
4. After approval and merge, create a release tag
5. The CI/CD pipeline will handle publishing to npm

## Questions?

Don't hesitate to ask questions! You can:

- Create an issue with the "question" label
- Start a discussion in [GitHub Discussions](https://github.com/NexGenStudioDev/FastKit/discussions)
- Contact the maintainers directly

Thank you for contributing! 🎉
