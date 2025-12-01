# Contributing to Legend Player

Thank you for your interest in contributing to Legend Player! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and constructive in all interactions with other contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/anacondy/Legend-Player/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - System information (OS, browser version, etc.)

### Suggesting Features

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages: `git commit -m "Add: feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Legend-Player.git
cd Legend-Player

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Style Guidelines

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns
- Keep functions small and focused
- Use ES6+ features where appropriate

## Testing

Before submitting a PR:
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on different screen sizes
- Test all modified features thoroughly
- Ensure no console errors

## Commit Message Format

Use clear and descriptive commit messages:
- `Add: new feature`
- `Fix: bug description`
- `Update: component/feature name`
- `Refactor: code improvement`
- `Docs: documentation changes`

## Questions?

Feel free to ask questions by creating an issue with the "question" label.

---

Thank you for contributing! 🎉
