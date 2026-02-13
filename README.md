# OJT Tracer

This workspace contains a small MERN-style frontend + Express backend that uses Sherlock.js to search usernames across sites.

Structure:
- `server/` — Express backend that calls the Sherlock.js CLI.
- `client/` — React front-end (MUI).
- `python/` — legacy Python runner (no longer used).

Quick start (Windows):

1. Clone Sherlock.js into the server vendor folder:

```powershell
cd server
mkdir vendor
git clone https://github.com/GitSquared/sherlock-js .\vendor\sherlock-js
```

2. Install server deps (includes Sherlock.js runtime deps):

```powershell
npm install
```

3. Install client deps:

```powershell
cd ..\client
npm install
```

4. Start server and client in separate terminals:

```powershell
# from server/
npm run dev

# from client/
npm start
```

Notes:
- The backend runs the Sherlock.js CLI with `--json --only-found` and returns structured JSON.
- If you want the Python version again, we can switch the server back to the Python runner.
