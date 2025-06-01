
# Contributing to Analytics Dashboard

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Add JSDoc comments to all functions
- Use functional components with hooks
- Follow the existing folder structure

### Folder Structure Guidelines

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (shadcn/ui)
│   └── dashboard/      # Dashboard-specific components
├── hooks/              # Custom React hooks
├── services/           # API calls and business logic
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── pages/              # Page components
```

## Component Guidelines

- Keep components under 100 lines
- Use single responsibility principle
- Create custom hooks for reusable logic
- Implement proper error boundaries
- Add loading states and accessibility features

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/username/analytics-dashboard/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Feature Requests

We're always looking for suggestions to improve this project. Feature requests are tracked as [GitHub issues](https://github.com/username/analytics-dashboard/issues).

When filing a feature request, please include:

- A clear description of the feature
- Any relevant mockups or examples
- The problem it solves
- How it fits into the existing codebase

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
