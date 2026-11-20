# Glass Clinic React Template

A blank glassmorphism React app: login page, collapsible glass sidebar with animated tabs, top bar with account menu and logout, and an empty dashboard. No modules included.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints. Demo login: any valid email and a password of 4+ characters.

## Where things live

| File | What to change |
|---|---|
| `src/config/nav.js` | Sidebar items, page titles, which role sees each item |
| `src/context/AuthContext.jsx` | Replace the demo `login()` with your Django API call |
| `src/pages/Dashboard.jsx` | Replace each `<Slot />` with your own component |
| `src/pages/ModulePage.jsx` | The blank page shown for every other sidebar item |
| `src/styles.css` | Colors, fonts and glass look: edit the tokens at the top |

## Adding a module

1. Create `src/modules/Appointments.jsx` (any component).
2. In `src/App.jsx`, render it when `item.id === 'appointments'` instead of `<ModulePage />`.

## Connecting your Django backend

- Uncomment the proxy line in `vite.config.js` so `/api/...` calls reach Django on port 8000.
- Store the token returned by `/api/auth/login/` in `AuthContext.jsx` and send it with each request.
- Live updates (Django Channels) can be added later with a WebSocket hook; the "Live" pill in the top bar is ready for it.
