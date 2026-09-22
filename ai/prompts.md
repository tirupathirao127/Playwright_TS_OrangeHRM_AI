# AI Prompts Log

This file tracks the key prompts used with AI assistance to build and maintain this framework.

## Initial Framework Creation Prompt

The following prompt was the very first prompt used to scaffold the entire Playwright TypeScript automation framework from scratch:

```
Create a production-ready Playwright TypeScript automation framework for the OrangeHRM demo application.

Requirements:
- Uses the Page Object Model (POM) design pattern
- Follows a data-driven testing approach
- Supports four environments: DEV, TST, UAT, PRD
- Supports Chrome and Safari-equivalent browser coverage through Playwright Chromium and WebKit
- Supports desktop and mobile projects: Windows-Chrome, Mac-Safari, Android-Chrome, iPhone-Safari
- Uses @sanity, @smoke, and @regression tags to control test execution
- Runs sanity and smoke tests automatically for every new pull request targeting develop or main
- Produces useful HTML reports, traces, screenshots, videos, and CI artifacts
- Keep the application URL configurable through environment variables; do not hardcode URLs, credentials, tokens
- Strict TypeScript mode with type safety
```

## Notes

- This prompt was the starting point for the entire framework: project scaffolding, environment configuration system, utilities, page objects, fixtures, data-driven test data, E2E and component test suites, GitHub Actions CI/CD workflow, and documentation.
- Subsequent prompts in the conversation iterated on this foundation to fix bugs, remove hardcoded credentials, update the OrangeHRM demo URL, and add a "Getting Started" setup guide to the README.
