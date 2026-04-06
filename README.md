# test-vue-auth

[![Vue 3](https://img.shields.io/badge/Vue-3.4.0-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-blue.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive dashboard application built with **Vue 3 (Composition API)** and **TypeScript**. Designed as a management interface for "Browser MCP," it features a secure authentication flow and real-time data visualization.

## 🚀 Features

- **Secure Authentication:** Complete login flow with JWT persistence and route protection.
- **Dynamic Dashboard:** Real-time data visualization using custom chart components (Bar and Line charts).
- **Responsive Design:** Fully mobile-responsive UI built with TailwindCSS.
- **State Management:** Centralized auth and application state using Pinia.
- **Modern Architecture:** Built with Vue 3's `<script setup>` and TypeScript for type safety.
- **Enterprise-Ready DevOps:** Ready for containerized deployment with Docker and Kubernetes, including a Jenkins-based CI/CD pipeline.

## 🛠 Tech Stack

- **Frontend:** Vue 3, TypeScript, Pinia, Vue Router 4, Axios
- **Styling:** TailwindCSS, PostCSS, Autoprefixer
- **Build Tool:** Vite
- **Deployment:** Docker, Nginx (Alpine), Kubernetes (K8s)
- **CI/CD:** Jenkins

## 📂 Project Structure

```text
src/
├── assets/          # Global styles and assets
├── components/      # Reusable UI and dashboard components
│   ├── dashboard/   # Charts and statistics cards
│   └── ui/          # Basic UI elements
├── composables/     # Shared reactive logic
├── router/          # Vue Router configuration & navigation guards
├── services/        # API and external service integrations
├── store/           # Pinia state stores (e.g., auth.ts)
├── views/           # Page-level components
│   └── auth/        # Authentication views (Login, etc.)
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## 🚥 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd test-vue-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build for Production

Build the project and preview the production build:
```bash
npm run build
npm run preview
```

## 🐳 Deployment

### Docker

Build the Docker image:
```bash
docker build -t test-vue-auth .
```

Run the container:
```bash
docker run -d -p 8080:80 test-vue-auth
```

### Kubernetes

Deploy the application to a Kubernetes cluster:
```bash
kubectl apply -f deployment.yaml
```

## ⚙️ CI/CD

The project includes a `Jenkinsfile` that automates:
1. **Versioning:** Automatically bumps the patch version in `package.json`.
2. **Dockerization:** Builds and tags Docker images with the version and build number.
3. **Registry:** Pushes images to Docker Hub.
4. **Git Sync:** Pushes version updates back to the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
