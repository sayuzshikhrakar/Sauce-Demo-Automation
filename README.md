# SauceDemo & API Automation Framework

![Playwright](https://img.shields.io/badge/-Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/-Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![k6](https://img.shields.io/badge/-k6-7D64FF?style=flat-square&logo=k6&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)

A comprehensive, production-ready test automation framework demonstrating modern testing practices. It features end-to-end (E2E) UI testing using Playwright, robust API test strategies using both Playwright and Postman/Newman, and performance testing using k6. 

All targets are public demo applications (`saucedemo.com`, `reqres.in`, `dummyjson.com`), ensuring a clean environment with no proprietary data.

## 🚀 Key Features

*   **Page Object Model (POM)**: UI tests follow a strict Page Object Model architecture, separating test logic from locators and ensuring maintainability. Uses modern `getByRole` and robust selectors.
*   **Data-Driven Testing (DDT)**: Iterates over fixtures (e.g., `users.json`, `invalidCheckoutData.json`) instead of hardcoding test data, demonstrating scalable test design.
*   **Dual API Testing Strategy**:
    *   **Playwright API Tests**: Full integration testing against `reqres.in` and `dummyjson.com`, including token extraction flows (login → extract token → authenticated context) and CRUD operations (GET/PUT/DELETE).
    *   **Postman/Newman Collection**: Designed for rapid regression and monitoring against `JSONPlaceholder`, managed as a distinct collection executable via CLI.
*   **Performance/Load Testing**: Includes a functional `k6` load testing script to validate endpoint performance under concurrency and stress.
*   **Continuous Integration (CI/CD)**: Contains three distinct GitHub Actions workflows synced with npm scripts:
    *   Playwright Tests (UI & API) on `push`, `pull_request`, and schedule.
    *   Newman/Postman API Regression suite on `push`, `pull_request`, and dispatch.
    *   k6 Load Testing suite on a weekly schedule and dispatch.
*   **Test Organization**: Utilizes tagging (`@regression`, `@building`) for intelligent suite execution.

## 📁 Repository Structure

```
├── .github/workflows/       # GitHub Actions CI pipelines
├── fixtures/                # Test data for Data-Driven Testing (JSON)
├── pages/                   # Page Object Model (POM) classes
├── tests/
│   ├── api/                 # Playwright API tests & Postman collections
│   ├── load/                # k6 load testing scripts
│   └── ui/                  # Playwright E2E UI tests
├── utils/                   # Shared utilities and helpers
├── playwright.config.ts     # Playwright configuration
└── package.json             # Project dependencies and scripts
```

## 🛠️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sayuzshikhrakar/Sauce-Demo-Automation.git
    cd Sauce-Demo-Automation
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## 🏃 Running Tests

### E2E & API (Playwright)

Run all Playwright tests (UI & API) in headless mode:
```bash
npm test
```

Run tests in UI mode for debugging:
```bash
npm run test:ui
```

Run both Playwright & Postman API tests sequentially:
```bash
npm run test:api
```

### Postman/Newman (API Regression)
To run *only* the Postman API collection locally and generate an HTML report:
```bash
npm run test:api:newman
```

### Load Testing (k6)
Ensure [k6 is installed](https://k6.io/docs/get-started/installation/) on your machine. Run the script and generate an HTML report in `load-test-reports/`:
```bash
npm run test:load
```

## 👤 Author
Sayuz Shikhrakar
