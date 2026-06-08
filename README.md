# Playwright E2E Automation Framework

A senior-grade End-to-End (E2E) automation testing framework designed for scalability, maintainability, and enterprise-level resilience. This framework is built using **Playwright** and **TypeScript**, utilizing **pnpm** as its package manager.

This document outlines the architectural decisions, structural patterns, installation requirements, and execution steps for reviewers to evaluate the solution.

---

## Table of Contents
1. [Architectural Overview & Design Patterns](#1-architectural-overview--design-patterns)
2. [Why pnpm?](#2-why-pnpm)
3. [Locator Strategy & Strict Mode Resolution](#3-locator-strategy--strict-mode-resolution)
4. [Test Data Strategy & Idempotency (Faker)](#4-test-data-strategy--idempotency-faker)
5. [Reporting & Diagnostic Artifacts](#5-reporting--diagnostic-artifacts)
6. [AI-Assisted Development & CLI Tooling](#6-ai-assisted-development--cli-tooling)
7. [Project Structure](#7-project-structure)
8. [Prerequisites & Installation](#8-prerequisites--installation)
9. [Execution Guide](#9-execution-guide)

---

## 1. Architectural Overview & Design Patterns

The framework strictly follows modern test automation engineering principles, separating business logic from DOM interaction layers.

### Page Object Model (POM)
Adhering to clean code standards, this framework applies a strict **Page Object Model** pattern. 
* **Separation of Concerns:** Page Objects act exclusively as a clean interface/API for interacting with the DOM. They contain query definitions (Getters/Methods) and user actions but are entirely **agnostic of test assertions**.
* **Test Specifications as Source of Truth:** All assertions (`expect`) reside exclusively within the test specification files (`*.spec.ts`). This ensures that test specs define *what* the business expectation is, while Page Objects define *how* to perform actions or locate elements.

### Centralized Configuration (baseURL)
To maintain environment flexibility and security, the application's base URL is abstracted from the individual test files and Page Objects. It is defined centrally within the `playwright.config.ts` file under the `use: { baseURL: '...' }` object. This allows the suite to seamlessly point to different environments (e.g., dev, staging, QA) without modifying the test codebase.

---

## 2. Why pnpm?

This project explicitly uses **pnpm** (Performant npm) rather than standard npm or Yarn due to critical architectural advantages:

* **Efficient Dependency Storage:** `pnpm` utilizes a content-addressable storage mechanism. It hard-links files from a single global store on the host machine, saving significant disk space and avoiding redundant downloads.
* **Deterministic, Frozen Builds:** Inside production environments and CI/CD pipelines, dependencies are installed using `pnpm install --frozen-lockfile`. This guarantees that the exact dependency tree recorded in `pnpm-lock.yaml` is reproduced without changes, eliminating unexpected breaks caused by transitive dependency updates.
* **Native Corepack Integration:** Modern Node.js environments support **Corepack** to manage package manager versions natively. This project leverages Corepack to activate and pin the exact `pnpm` binary dynamically, ensuring absolute consistency across cross-functional engineering machines.

---

## 3. Locator Strategy & Strict Mode Resolution

### Resilient Locators (Anti-Brittle Patterns)
To avoid the architectural trap of **Brittle Locators** caused by tight structural coupling (e.g., nesting deep CSS chains like `.product-card-header .product-info .product-name`), the framework applies a deep-search, element-scoping rule:
1. Locate the **Contextual Container Parent** (e.g., the specific product card).
2. Locate the **Target Leaf Element** using its semantic purpose or standard accessibility markers.
3. Completely ignore structural layout divs, grids, or stylistic wrappers in between. This shields the automation suite from layout restyling or frontend framework migrations (e.g., shifting to Tailwind utility classes).

### Web-First Accessibility Roles
Leveraging Playwright's native `getByRole` APIs, the framework targets elements using W3C Accessibility standards rather than unstable class names:
* **Headings:** Parametrized using semantic levels (`getByRole('heading', { name: productName, level: 3 })`).
* **Interactive Controls:** Checkboxes and delete buttons are resolved dynamically using their accessible labels (e.g., `aria-label="Select Cotton T-Shirt"` or `aria-label="Delete Cotton T-Shirt"`), allowing high-fidelity user-flow emulation.

### Mitigating Playwright Strict Mode Violations
When testing fast-paced real-time UIs, multiple notification elements (such as success toasts or alerts) can temporarily coexist in the DOM tree, triggering Playwright's `Strict Mode Violation` (where a locator resolves to more than one element).
* **The Fragile Approach (Avoided):** Using `.first()` or `.last()` shortcuts. This creates hidden race conditions and potential false positives by asserting against stale elements.
* **The Architectural Solution:** Utilizing explicit sub-string construction paired with dynamic filtering via `.filter({ hasText: expectedMessage })`. This ensures Playwright validates the unique, contextual message bound to the exact business action executed (e.g., verifying a separate toast for a product being `created` vs. `deleted`).

---

## 4. Test Data Strategy & Idempotency (Faker)

To ensure tests can run in parallel, be repeated endlessly without state pollution, and avoid data collisions in shared environments, the framework implements a strict **Idempotency Strategy** utilizing the `@faker-js/faker` library.

* **Dynamic Generation:** Instead of relying on static hardcoded values, the framework generates unique payloads in runtime (e.g., creating products with dynamic names like `Cotton T-Shirt - 168432...` and randomized SKUs). 
* **State Clean-up:** This dynamic data allows the test to securely locate its specific artifact, assert against it, and finally clean it up (Delete) without affecting other tests running concurrently.

---

## 5. Reporting & Diagnostic Artifacts

The framework leverages Playwright's native reporters to provide immediate visual feedback and zero-overhead debug information, without requiring heavy third-party plugins.

* **Interactive HTML Reporter:** A complete, standalone HTML report is compiled natively into the `playwright-report/` directory. It provides a visual dashboard of the execution.
  * **Smart Launch:** It is configured to launch automatically in the default web browser *only on execution failures* (`open: 'on-failure'`), preventing interruptions during successful local runs.
* **Visual Screenshots on Failure:** Screenshots are captured automatically at the exact millisecond of an assertion failure (`screenshot: 'only-on-failure'`), attached directly to the HTML report for quick UI debugging.
* **Trace Viewer Retention:** Playwright's industry-standard **Traces** are retained upon failures (`trace: 'retain-on-failure'`). Reviewers can click within the HTML report to explore an interactive, post-mortem timeline containing complete DOM snapshots, console logs, network payloads, and execution timings at every step.
* **Lean Git Footprint:** To protect repository sizing, all artifact folders (`playwright-report/`, `test-results/`) are explicitly isolated inside the `.gitignore` matrix.

---

## 6. AI-Assisted Development & CLI Tooling

This project is optimized for modern AI-assisted workflows and advanced CLI integrations to accelerate development while maintaining strict architectural consistency.

### GitHub Copilot & Claude Custom Skills
To ensure any code generated by AI assistants adheres strictly to the framework's design patterns, custom instructions have been embedded directly into the repository:
* **`.github/copilot-instructions.md`**: Provides explicit context to GitHub Copilot to strictly follow the Page Object Model, utilize `pnpm`, and enforce Playwright Web-First accessibility locators.
* **`.claude/skills/playwright-cli/`**: Contains specific capability definitions for Claude-based agents, allowing them to understand the project's structure and maintain structural integrity during code generation or automated refactoring.

### Playwright CLI & Codegen Agents
The framework integrates custom CLI tooling for enhanced test generation and interactive debugging, defined via `package.json` scripts:
* `pnpm run inspect <TARGET_URL>`: Launches the Playwright Codegen tool (`playwright codegen`). **Note:** For security reasons, the target URL is not hardcoded in the script. You must append the URL you wish to inspect when running the command (e.g., `pnpm run inspect https://example.com`).
* `pnpm run agent:open`: Launches the `@playwright/cli` agent interface.
* `pnpm run agent:show`: Displays current agent traces and CLI execution logs for advanced troubleshooting.

---

## 7. Project Structure

```text
PW_ASSESMENT_2606/
├── .claude/
│   └── skills/                 # Custom AI Agent capabilities
├── .github/
│   └── copilot-instructions.md # Architecture rules for GitHub Copilot
├── src/
│   ├── constants/              # Centralized application constants & routes
│   │   ├── categories.constants.ts
│   │   ├── messages.constants.ts
│   │   ├── routes.constants.ts
│   │   └── selectors.constants.ts
│   ├── data/
│   │   └── user-data.json      # Structured test data fixtures
│   ├── fixtures/
│   │   └── base.fixture.ts     # Playwright Custom Fixture Extenders
│   ├── pages/                  # Page Object Model Layer (Pure Interactors)
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductManagerPage.ts
│   │   └── RegisterPage.ts
│   ├── types/                  # TypeScript strict interface contracts
│   │   ├── product.type.ts
│   │   └── userData.type.ts
│   └── utils/
│       └── data-helpers.ts     # Dynamic mock data generators (Faker)
├── tests/
│   └── e2e/                    # Execution Test Specifications
│       ├── public/             # Authentication-free verification tests
│       │   └── login.spec.ts
│       └── secure/             # Protected area verification tests
│           └── product-crud.spec.ts
├── .env.example                # Blank environment variable blueprint
├── .gitignore                  # Prevents artifacts and sessions leaks
├── package.json                # Project configurations & scripts manifest
├── playwright.config.ts        # Core Playwright framework configurations
└── tsconfig.json               # Type-safety compiler specifications
```

---

## 8. Prerequisites & Installation

### Local Setup
To run the project directly on your physical machine, ensure you have the following requirements installed:
* **Node.js:** v18 or higher (LTS recommended)
* **Package Manager:** `pnpm` (Enabled globally via Corepack)

1. Clone the repository and navigate to the project root:
   ```bash
   cd PW_Assesment_2606
   ```

2. Enable Corepack and prepare the package manager environment:
   ```bash
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

3. Install project dependencies securely without changing the structural lockfile:
   ```bash
   pnpm install --frozen-lockfile
   ```

4. Populate your runtime secrets environment file. Create a `.env` file in the root directory matching the keys defined in `.env.example`:
   ```text
   TEST_APP_USERNAME="your_username"
   TEST_APP_PASSWORD="your_password"
   BASE_URL="your_url"
   ```

---

## 9. Execution Guide

### Standard Execution (Local Engine)
Run the script wrappers defined inside your `package.json` file depending on the test scope:

* **Execute Authenticated / Secure Tests (Headed Mode):**
  ```bash
  pnpm run e2e:secure
  ```
* **Execute Non-Authenticated / Public Tests:**
  ```bash
  pnpm run e2e:public
  ```
* **Launch Native Playwright UI Interactive Mode:**
  ```bash
  pnpm run e2e:ui
  ```
* **Launch Playwright Inspector/Codegen:**
  ```bash
  pnpm run inspect <TARGET_URL>
