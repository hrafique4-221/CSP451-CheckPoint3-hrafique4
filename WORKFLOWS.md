# WORKFLOWS.md

## Overview

This repository contains several GitHub Actions workflows designed for **CSP451 Checkpoint 3**.  
They automate code quality checks, testing, security auditing, and deployment of a GitHub Pages site.

---

## 1. CI Pipeline (`.github/workflows/ci.yml`)

### Purpose

- Ensure code quality and consistency through linting and formatting checks.
- Run automated unit tests and collect coverage.
- Fail the build if coverage falls below 80%.
- Build the project and upload artifacts.

### Trigger Conditions

- Runs on **push** to `main` or `develop`.
- Runs on **pull requests** into `main`.

### Job Dependencies

- **lint** → must pass before **test** runs.
- **test** → must pass before **build** runs.

### Secrets Required

- `CODECOV_TOKEN` (only required if repository is private and uploading coverage to Codecov; optional if public).

### Troubleshooting

- **“Missing script: lint”** → ensure `package.json` has `"lint": "eslint . --max-warnings=0"`.
- **Coverage step fails** → confirm Jest config includes `json-summary` reporter and at least one test exists.
- **Build fails** → check `"build"` script exists in `package.json` (placeholder is acceptable if no build step required).
- **Codecov errors** → add `CODECOV_TOKEN` secret or set `fail_ci_if_error: false`.

---

## 2. Dependency & Security Audit (`.github/workflows/dependency-audit.yml`)

### Purpose

- Runs a daily dependency audit using `npm audit`.
- Creates a GitHub issue if vulnerabilities are found.

### Trigger Conditions

- Runs daily at midnight UTC via a cron schedule.
- Can also be run manually from the Actions tab.

# Job Dependencies

- Single job (`audit`) → no dependencies.

# Secrets Required

- None.

### Troubleshooting

- **“npm audit not found”** → ensure `npm` is installed in the runner environment.
- **Issue not created** → confirm workflow includes correct GitHub token (`secrets.GITHUB_TOKEN` is automatically provided).

---

# 3. Pages Deployment (`.github/workflows/pages-deploy.yml`)

### Purpose

- Build and deploy static site from the `site/` directory to GitHub Pages.
- Publishes live content to the repository’s Pages environment.

# Trigger Conditions

- Runs on **push** to `main`.
- Can also be triggered manually.

# Job Dependencies

- **build** job (upload site artifact) → must succeed before **deploy** job runs.

# Secrets Required

- Uses default `secrets.GITHUB_TOKEN` (granted automatically by GitHub Actions).

# Troubleshooting

- **404 Not Found after deploy**:
  - Ensure repo **Settings → Pages → Source = GitHub Actions**.
  - Confirm `site/index.html` exists in repo.
- **UI shows “failing” but Actions shows “passing”**:
  - Go to **Settings → Environments → github-pages** and make sure latest deployment is marked **Active**.
- **Permissions error**:
  - Ensure workflow includes:
    ```yaml
    permissions:
      contents: read
      pages: write
      id-token: write
    ```

---

# 4. Custom Composite Action (`.github/actions/setup-node-install/action.yml`)

# Purpose

- Reusable action for setting up Node.js and installing dependencies.
- Reduces duplication across workflows (lint, test, build).

# Trigger Conditions

- Called from other workflows (`ci.yml` etc.) via:
  ```yaml
  - uses: ./.github/actions/setup-node-install
  ```
