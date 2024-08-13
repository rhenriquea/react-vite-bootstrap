# React Boilerplate 🚀

Welcome to the **React Boilerplate** project! This boilerplate is designed to get you up and running with a modern React setup that includes TypeScript, ESLint, Prettier, Stylelint, and more! Below, you'll find everything you need to know to get started.

## 📦 Project Setup

This project uses Yarn as the package manager. Make sure you have it installed before proceeding. If you don't have Yarn, you can install it globally by running:

```bash
npm install -g yarn
```

### 🚀 Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rhenriquea/react-boilerplate.git
   cd react-boilerplate
   ```

2. **Install Dependencies:**

   To install all the necessary packages, run:

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   Start the development server using Vite:

   ```bash
   yarn dev
   ```

   Your application will be running at `http://localhost:3000`.

### 🔧 Scripts Explained

Here's a detailed explanation of the scripts available in this project:

- **`yarn dev`**: Starts the development server using Vite. It provides fast and efficient development experience with hot module replacement (HMR) and other features.

- **`yarn build`**: Builds the project for production. This script first runs the Vite build to bundle your application and then compiles TypeScript (`tsc`) to check for type errors.

- **`yarn lint:eslint`**: Runs ESLint on all JavaScript, TypeScript, and JSON files in the `src` directory. This helps catch and fix potential issues in your code.

- **`yarn lint:eslint:fix`**: Automatically fixes issues found by ESLint where possible.

- **`yarn lint:stylelint`**: Runs Stylelint on all CSS and SCSS files in the `src` directory to ensure your styles are consistent and error-free.

- **`yarn lint:stylelint:fix`**: Automatically fixes style issues found by Stylelint.

- **`yarn lint`**: Runs both ESLint and Stylelint in parallel to check for any issues in your code and styles.

- **`yarn lint:fix`**: Runs both ESLint and Stylelint in parallel and automatically fixes any fixable issues.

- **`yarn format`**: Formats all files in the project using Prettier. This ensures your code is consistently formatted.

- **`yarn preview`**: Previews the production build of the site locally. This is useful for testing the final output before deployment.

- **`yarn scan`**: Runs three tools in sequence:

  - `depcheck`: Checks for unused dependencies in your project.
  - `ts-prune`: Identifies unused TypeScript exports.
  - `unimported`: Finds unused files in your project.

- **`yarn prepare`**: This script runs automatically when you install dependencies. It sets up Husky, which manages Git hooks for the project.

- **`yarn commit`**: Uses Commitizen to guide you through the process of creating a conventional commit message. This helps maintain a consistent commit history.

### ✨ Additional Features

- **Husky**: Husky is set up to manage Git hooks, ensuring that tasks like linting and tests are run automatically before committing.

- **Commitizen**: Helps enforce a conventional commit format, making it easier to maintain clean and meaningful commit history.

### 👷 How to Contribute

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes.
4. Commit your changes using `yarn commit`.
5. Push your branch: `git push origin my-feature-branch`
6. Submit a pull request.

### 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
