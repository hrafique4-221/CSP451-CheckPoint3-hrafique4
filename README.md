# CSP451 Checkpoint 3

![CI Pipeline](https://github.com/hrafique4-221/CSP451-CheckPoint3-hrafique4/actions/workflows/ci.yml/badge.svg)
![Deploy Pages](https://github.com/hrafique4-221/CSP451-CheckPoint3-hrafique4/actions/workflows/pages-deploy.yml/badge.svg)

## 📄 Project Overview

This repository contains the required workflows and configuration for **CSP451 Checkpoint 3**.

- Continuous Integration (Lint, Test, Build)
- Daily Dependency / Security Audit
- GitHub Pages Deployment
- Custom Composite Action for Node setup + install

---

## Live Site

[**View Live Site on GitHub Pages**](https://hrafique4-221.github.io/CSP451-CheckPoint3-hrafique4/)

---

## Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)

- Runs on pushes to `main` and `develop`, and on PRs to `main`.
- Jobs:
  - **Linting** → ESLint + Prettier checks.
  - **Testing** → Runs Jest unit tests with coverage (fails if <80%).
  - **Build** → Runs build step and uploads artifacts.

### 2. Dependency Audit (`.github/workflows/dependency-audit.yml`)

- Scheduled daily with `cron`.
- Runs `npm audit` to detect vulnerabilities.
- Creates a GitHub Issue if issues are found.

### 3. Pages Deployment (`.github/workflows/pages-deploy.yml`)

- Triggers on pushes to `main`.
- Builds and deploys `site/` directory to GitHub Pages.
- Status badge appears above in this README.

### 4. Custom Composite Action (`.github/actions/setup-node-install`)

- Reusable action for:
  - Setting up Node.js (default v18).
  - Installing dependencies with caching.
- Used in CI jobs for consistency.

---

## 📂 Repository Structure
