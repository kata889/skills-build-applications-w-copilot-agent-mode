# OctoFit Tracker presentation tier

The React 19 application uses Vite, React Router, and Bootstrap. From the
repository root, start the development server with:

```sh
npm run dev --prefix octofit-tracker/frontend
```

The frontend requests its API from the backend on port 8000. When running in
GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined in
`octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value from `import.meta.env.VITE_CODESPACE_NAME` and builds the
backend URL as `https://<codespace-name>-8000.app.github.dev`. Restart Vite
after changing environment values. If `VITE_CODESPACE_NAME` is not defined,
the frontend safely uses `http://localhost:8000`, which is suitable for local
development.
