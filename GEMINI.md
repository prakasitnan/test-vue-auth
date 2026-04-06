# Project Overview: test-vue-auth

`test-vue-auth` is a modern web application built with **Vue 3 (Composition API)** and **TypeScript**. It serves as a dashboard for "Browser MCP," featuring a secure authentication flow and real-time data visualization.

### Main Technologies
*   **Frontend Framework:** Vue 3 (Composition API with `<script setup>`)
*   **State Management:** Pinia
*   **Routing:** Vue Router 4
*   **Styling:** TailwindCSS, PostCSS, Autoprefixer
*   **Build Tool:** Vite
*   **DevOps/CI/CD:** Docker, Jenkins, Kubernetes
*   **Production Server:** Nginx (Alpine-based)

### Architecture
The project follows a standard Vue.js directory structure:
*   `src/components/`: Reusable UI components (e.g., dashboard stats and charts).
*   `src/store/`: Global state management using Pinia (e.g., `auth.ts`).
*   `src/router/`: Application routing logic and navigation guards.
*   `src/views/`: Main page components (e.g., `DashboardView.vue`, `LoginView.vue`).
*   `src/composables/`: Reusable logic extracted for components.

---

## Building and Running

### Local Development
1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start development server:**
    ```bash
    npm run dev
    ```
3.  **Build for production:**
    ```bash
    npm run build
    ```
4.  **Preview production build:**
    ```bash
    npm run preview
    ```

### Docker
*   **Build Image:**
    ```bash
    docker build -t test-vue-auth .
    ```
*   **Run Container:**
    ```bash
    docker run -d -p 8080:80 test-vue-auth
    ```

### Kubernetes
*   **Deploy to Cluster:**
    ```bash
    kubectl apply -f deployment.yaml
    ```

---

## Development Conventions

### Coding Style
*   **Composition API:** Always use `<script setup>` in `.vue` files.
*   **TypeScript:** Use strict type checking and interface definitions for state and components.
*   **Styling:** Use Tailwind utility classes directly in templates for consistency.

### CI/CD Pipeline (Jenkins)
The project includes a `Jenkinsfile` that automates:
1.  **Versioning:** Automatically bumps the patch version in `package.json` using `npm version patch`.
2.  **Dockerization:** Builds and tags Docker images with the version and build number.
3.  **Deployment:** Pushes images to Docker Hub (`prakasitnan/test-vue-auth`).
4.  **Git Sync:** Pushes the version update back to the GitHub repository.

### Authentication Flow
*   Handled by `src/store/auth.ts`.
*   Uses `localStorage` to persist JWT tokens.
*   Navigation guards in `src/router/index.ts` protect the `/dashboard` route.
