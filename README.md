# OrangeHRM Automation Framework

## Overview

A production-ready, enterprise-grade Playwright TypeScript automation framework for testing the OrangeHRM demo application. This framework follows the Page Object Model (POM) design pattern, implements data-driven testing, and supports multiple environments with comprehensive CI/CD integration.

### Key Features

- **Page Object Model**: Clean, maintainable, and scalable architecture
- **Data-Driven Testing**: JSON-based external test data with strong typing
- **Multi-Environment Support**: DEV, TST, UAT, PRD configurations
- **Cross-Platform Testing**: Desktop (Windows-Chrome, Mac-Safari) and Mobile (Android-Chrome, iPhone-Safari)
- **Test Classification**: `@sanity`, `@smoke`, and `@regression` tags for intelligent test execution
- **CI/CD Ready**: GitHub Actions workflows for automated PR validation
- **Comprehensive Reporting**: HTML, JSON, and optional Allure reports with traces, videos, and screenshots
- **Strict TypeScript**: Full type safety with `strict: true` mode
- **Environment Security**: Environment variables for configuration and secrets management

## Getting Started (New Machine Setup)

Follow this step-by-step guide to set up the framework from scratch on a new/teammate's machine.

### Prerequisites

Make sure the following are installed before you begin:

| Tool    | Minimum Version      | Check Command    |
| ------- | -------------------- | ---------------- |
| Node.js | 18.x (LTS) or higher | `node --version` |
| npm     | 9.x or higher        | `npm --version`  |
| Git     | Any recent version   | `git --version`  |

> 💡 If Node.js isn't installed, download it from [nodejs.org](https://nodejs.org/) or use a version manager like `nvm`.

### Step 1: Clone the Repository

```bash
git clone https://github.com/tirupathirao127/Playwright_TS_OrangeHRM_AI.git
cd Playwright_TS_OrangeHRM_AI
```

### Step 2: Install Project Dependencies

```bash
npm install
```

This installs Playwright, TypeScript, ESLint, Prettier, and all other dependencies listed in `package.json`.

### Step 3: Install Playwright Browsers

```bash
npm run install-browsers
```

This downloads the Chromium, WebKit (Safari), and Firefox browser binaries required to run tests across all configured projects (windows-chrome, mac-safari, android-chrome, iphone-safari).

### Step 4: Configure Environment Variables

Copy the environment template and create the environment file(s) you need. The framework supports four environments: `DEV`, `TST`, `UAT`, `PRD`.

```bash
cp .env.example .env.dev
```

Open `.env.dev` and confirm/update the values:

```dotenv
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
API_BASE_URL=https://opensource-demo.orangehrmlive.com/api/v1
HEADLESS=true
```

> 🔒 **Security note:** `.env.*` files are excluded via `.gitignore` and should never be committed. Repeat this step (`cp .env.example .env.tst`, `.env.uat`, `.env.prd`) for any additional environments you plan to test against.

### Step 5: Verify the Setup

Run a type-check to confirm TypeScript compiles correctly:

```bash
npm run type-check
```

Run lint to confirm code quality checks pass:

```bash
npm run lint
```

### Step 6: Run Your First Test

Run the fast sanity suite against the DEV environment on a single browser project to confirm everything works end-to-end:

```bash
TEST_ENV=DEV npx playwright test --grep @sanity --project=windows-chrome
```

If all tests pass, view the HTML report:

```bash
npm run report
```

### Step 7 (Optional): Run the Full Suite

```bash
npm test              # Run all tests across all projects
npm run test:sanity   # Sanity tests only
npm run test:smoke    # Smoke tests only
```

✅ **You're all set!** Continue with the sections below for day-to-day usage, project structure, and CI/CD details.

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npm run install-browsers

# Copy environment template
cp .env.example .env.dev

# Run tests
npm test
```

## Environment Configuration

Each environment has a corresponding `.env` file:

```
BASE_URL=https://opensource-demo.orangehrmlive.com
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
API_BASE_URL=https://opensource-demo.orangehrmlive.com/api/v1
HEADLESS=true
```

Run tests for specific environment:

```bash
TEST_ENV=DEV npm test      # Development
TEST_ENV=TST npm test      # Testing
TEST_ENV=UAT npm test      # UAT
TEST_ENV=PRD npm test      # Production
```

## Running Tests

```bash
npm test                    # All tests
npm run test:sanity         # Sanity tests only
npm run test:smoke          # Smoke tests only
npm run test:regression     # Regression tests only
npm run test:windows-chrome # Windows Chrome desktop
npm run test:mac-safari     # Mac Safari (WebKit)
npm run test:android        # Android Chrome mobile
npm run test:iphone         # iPhone Safari (WebKit)
npm run test:debug          # Debug mode with Inspector
npm run report              # View HTML report
```

## Project Structure

```
├── config/                 # Environment and test configuration
├── data/                   # Test data (JSON files and schemas)
├── fixtures/               # Playwright fixtures
├── pages/                  # Page Object Model classes
├── tests/
│   ├── e2e/               # End-to-end tests
│   └── components/        # Component tests
├── utils/                  # Utilities (data-reader, logger, etc.)
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json          # TypeScript configuration
```

## Test Tags

Every test must include at least one tag:

- **`@sanity`**: Critical health-check tests
- **`@smoke`**: High-priority critical-path tests
- **`@regression`**: Detailed feature tests
- **`@e2e`**: Complete user journeys
- **`@component`**: Focused component tests
- **`@desktop`**: Desktop-only tests
- **`@mobile`**: Mobile-only tests

Example:

```typescript
test('TC001 - Verify admin can log in @sanity @e2e @desktop', async ({ page }) => {
  // Test implementation
});
```

## Browser Coverage

| Project        | Browser  | Device     | Viewport |
| -------------- | -------- | ---------- | -------- |
| windows-chrome | Chromium | Windows 10 | 1280x720 |
| mac-safari     | WebKit   | macOS      | 1280x800 |
| android-chrome | Chromium | Pixel 5    | 393x851  |
| iphone-safari  | WebKit   | iPhone 14  | 390x844  |

## Page Object Model

All page objects extend `BasePage` which provides:

```typescript
await page.navigateTo(path); // Navigate to page
await page.waitForPageReady(); // Wait for page load
await page.assertUrlContains(value); // Assert URL
await page.getPageTitle(); // Get page title
```

## Data-Driven Testing

Test data stored in JSON files with schema validation:

```json
[
  {
    "id": "TC001",
    "description": "Verify admin can log in with valid credentials",
    "tags": ["@sanity", "@e2e", "@desktop"],
    "input": { "username": "Admin", "password": "admin123" },
    "expected": { "success": true, "redirectTo": "/dashboard" }
  }
]
```

## CI/CD Integration

GitHub Actions workflow (`.github/workflows/sanity-pr.yml`):

- Triggers on PR to `develop` or `main`
- Runs `@sanity` and `@smoke` tests
- Uploads reports on failure
- Blocks merge on test failure

Set GitHub secrets:

- `ORANGEHRM_USERNAME`
- `ORANGEHRM_PASSWORD`

## Best Practices

1. **Use semantic locators**: `getByRole()`, `getByLabel()`, `getByPlaceholder()`
2. **Avoid brittle selectors**: No XPath, no arbitrary waits
3. **Test independence**: Tests run in any order, no interdependencies
4. **Single responsibility**: Each test validates one feature
5. **Parallel execution**: Tests run in parallel by default
6. **Meaningful assertions**: Use `.toBeVisible()`, `.toContainText()`, etc.

## Troubleshooting

### Environment errors

```bash
npm run type-check  # Validate TypeScript
```

### Run in debug mode

```bash
npm run test:debug  # Opens Playwright Inspector
```

### View test artifacts

```bash
npm run report      # Opens HTML report with screenshots and videos
```

## License

MIT

---

For detailed documentation, see repository documentation.
