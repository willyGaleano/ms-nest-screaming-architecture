# 🤝 Contributing to NestJS Screaming Architecture

Thank you for your interest in contributing to this educational project! We welcome contributions from the community while maintaining the quality and educational value of the template.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How to Contribute](#-how-to-contribute)
- [Development Setup](#-development-setup)
- [Pull Request Process](#-pull-request-process)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Issue Reporting](#-issue-reporting)

## 📜 Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment:

- Be respectful and professional in all interactions
- Focus on constructive feedback and learning
- Help others learn and grow
- Maintain the educational purpose of the project

## 🚀 How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug fixes** - Fix issues in the existing code
- 📚 **Documentation improvements** - Enhance README, comments, or guides
- ✨ **Feature enhancements** - Improve existing functionality
- 🧪 **Test improvements** - Add or improve test coverage
- 🎨 **Code quality** - Refactoring for better practices
- 🌐 **Translations** - Help translate documentation

### What We Don't Accept

- ❌ Breaking changes without discussion
- ❌ Features that deviate from Screaming Architecture principles
- ❌ Commercial or proprietary integrations
- ❌ Changes that break the educational focus

## 🛠️ Development Setup

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/ms-nest-screaming-architecture.git
   cd ms-nest-screaming-architecture
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Copy environment variables**

   ```bash
   cp .env.template .env
   ```

4. **Start development environment**

   ```bash
   # Option 1: Using Docker (Recommended)
   docker-compose up -d

   # Option 2: Local development
   docker-compose up postgres redis kafka -d
   npm run start:dev
   ```

5. **Run tests to ensure everything works**
   ```bash
   npm run test
   npm run test:e2e
   ```

## 📥 Pull Request Process

### Before Creating a PR

1. **Create an issue first** (for non-trivial changes)
2. **Fork the repository** and create a feature branch
3. **Follow coding standards** and write tests
4. **Ensure all tests pass** locally

### PR Requirements

1. **Branch naming**: Use descriptive names
   - `feature/add-new-endpoint`
   - `fix/health-check-issue`
   - `docs/update-readme`

2. **Commits**: Follow conventional commits

   ```bash
   npm run commit  # Use this for guided commits
   ```

3. **Tests**: Include tests for new features

   ```bash
   npm run test:cov  # Ensure good coverage
   ```

4. **Documentation**: Update relevant documentation

### PR Template

When creating a PR, our template will automatically include these sections:

```markdown
## 📝 Description

Brief description of what this PR does.

## 🔧 Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that causes existing functionality to not work)
- [ ] 📚 Documentation update
- [ ] 🧪 Test improvement
- [ ] 🎨 Code refactoring (no functional changes)
- [ ] 🔧 Chore (maintenance, dependencies, etc.)

## 🔗 Related Issues

Closes #(issue_number)

## 🧪 Testing

- [ ] Unit tests pass (`npm run test`)
- [ ] Integration tests pass (`npm run test:e2e`)
- [ ] Test coverage is maintained or improved
- [ ] Manual testing completed
- [ ] All existing tests still pass

## � Checklist

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works

## 🔍 Code Quality

- [ ] Code follows TypeScript best practices
- [ ] No eslint errors or warnings
- [ ] Code is properly formatted (prettier)
- [ ] Follows Screaming Architecture principles

## � Educational Impact

How does this change enhance the educational value of the template?
```

## 📏 Coding Standards

### TypeScript Guidelines

- **Use strict TypeScript** - no `any` types unless absolutely necessary
- **Explicit return types** for public methods
- **Interface over type** for object definitions
- **Descriptive names** for variables and functions

### Architecture Principles

- **Follow Screaming Architecture** - domain-focused structure
- **SOLID principles** - especially Single Responsibility
- **Dependency injection** - use NestJS DI container
- **Separation of concerns** - keep layers distinct

### Code Style

```typescript
// ✅ Good
export class UserService {
  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Implementation
  }
}

// ❌ Avoid
export class UserService {
  async createUser(request: any): Promise<any> {
    // Implementation
  }
}
```

### Testing Standards

- **Unit tests** for all services and utilities
- **Integration tests** for controllers
- **E2E tests** for critical user flows
- **Descriptive test names** that explain the scenario

```typescript
// ✅ Good test name
it('should throw NotFoundException when user does not exist', () => {});

// ❌ Poor test name
it('should fail', () => {});
```

## 📝 Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Use the interactive commit tool
npm run commit

# Or follow this format manually
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (no logic change)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Examples

```bash
feat(user): add user profile caching
fix(health): resolve memory leak in health check
docs(readme): update installation instructions
test(user): add integration tests for user creation
```

## 🐛 Issue Reporting

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** to see if it's already fixed
3. **Check documentation** for common solutions

### Issue Types

We have specific templates for different types of issues:

#### 🐛 **Bug Report**

Use the [Bug Report template](../.github/ISSUE_TEMPLATE/bug_report.md) for:

- Something that isn't working correctly
- Unexpected behavior or errors
- Performance issues

#### ✨ **Feature Request**

Use the [Feature Request template](../.github/ISSUE_TEMPLATE/feature_request.md) for:

- New functionality suggestions
- Enhancements to existing features
- Educational improvements

#### ❓ **Question**

Use the [Question template](../.github/ISSUE_TEMPLATE/question.md) for:

- How-to questions
- Clarification on documentation
- General project inquiries

### Quick Issue Checklist

Before submitting any issue, make sure you:

- [ ] Checked the README.md and documentation
- [ ] Searched existing issues
- [ ] Used the appropriate template
- [ ] Included relevant environment information
- [ ] Provided clear reproduction steps (for bugs)

## 🏷️ Labels y Templates

### Labels Automáticos por Template

Nuestros templates automáticamente asignan estas labels:

- **🐛 `bug`** - Para reportes de bugs (template Bug Report)
- **✨ `enhancement`** - Para solicitudes de funcionalidades (template Feature Request)
- **❓ `question`** - Para preguntas generales (template Question)

### Labels Adicionales para Mantenimiento

- `good first issue` - Bueno para principiantes
- `help wanted` - Necesita atención extra
- `documentation` - Relacionado con documentación
- `wontfix` - No se implementará
- `duplicate` - Issue duplicado

## 🎯 Development Workflow

1. **Issues** - Discuss before implementing
2. **Fork** - Create your own copy
3. **Branch** - Work on feature branches
4. **Code** - Follow standards and write tests
5. **Test** - Ensure everything works
6. **PR** - Submit for review
7. **Review** - Address feedback
8. **Merge** - Maintainer merges approved PRs

## 🙏 Recognition

Contributors will be:

- Added to the README contributors section
- Mentioned in release notes for significant contributions
- Given credit in relevant documentation

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and community chat
- **Email** - [willyrhcp96@gmail.com](mailto:willyrhcp96@gmail.com) for private matters

---

**Remember**: This is an educational project. Every contribution helps others learn! 🎓

Thank you for contributing to the NestJS Screaming Architecture template! 🚀
