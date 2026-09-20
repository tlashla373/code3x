# Tuga Login Page — Internship Assessment

A responsive login page built with **React + Vite + TypeScript** and **Material UI (MUI)**,
matching the provided design. Includes client-side form validation and **Google Sign-In
via Firebase Authentication**, redirecting to a page that displays the signed-in user's
OAuth access token.

## Tech stack

- React 19 + TypeScript
- Vite
- Material UI (MUI) v7
- React Router
- Firebase Authentication (Google provider)
- Firebase Hosting

## Project structure

```
src/
├── components/
│   ├── IllustrationPanel.tsx   # Right-side illustration on the login screen
│   └── ProtectedRoute.tsx      # Route guard for the /profile page
├── firebase/
│   ├── config.ts                # Firebase app + auth initialization
│   └── AuthContext.tsx          # Auth state, Google sign-in, access token
├── pages/
│   ├── LoginPage.tsx            # Main login screen (matches the design)
│   └── TokenPage.tsx            # Post-login page showing the access token
├── theme.ts                     # MUI theme (colors, typography, shape)
├── App.tsx                      # Routes
└── main.tsx                     # Entry point
```

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new
   project (or use an existing one).
2. Add a **Web app** to the project (Project settings → General → Your apps → `</>`).
3. Copy the resulting config values into a `.env` file at the project root
   (there's a `.env.example` you can copy):

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. In the Firebase Console, go to **Authentication → Sign-in method** and enable the
   **Google** provider.
5. Under **Authentication → Settings → Authorized domains**, make sure `localhost` is
   listed (it is by default) and later add your Firebase Hosting domain
   (e.g. `your-project.web.app`) once you deploy.

## 3. Run locally

```bash
npm run dev
```

Visit the printed local URL. Click one of the "continue with" circular icons
(the Google one is wired up) to sign in — you'll be redirected to `/profile`,
which shows your Google OAuth access token.

## 4. Form validation

The login form validates on submit:

- **Username/email** — required; if it looks like an email (contains `@`) it must
  match a standard email pattern.
- **Password** — required, minimum 6 characters.

Errors are shown inline under each field using MUI's `TextField` `error`/`helperText`
props. No backend call is made — per the assessment, actual authentication against a
backend is not required for the username/password form.

## 5. Build for production

```bash
npm run build
```

Output is generated in `dist/`.

## 6. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # if not already installed
firebase login
firebase init hosting           # select your project, public dir = dist,
                                 # configure as single-page app = Yes
npm run build
firebase deploy
```

`firebase.json` is already included and configured with:
- `public: "dist"`
- SPA rewrite so all routes fall back to `index.html` (required for React Router)

After deploying, add the printed hosting URL (e.g. `https://your-project.web.app`) to
**Authentication → Settings → Authorized domains** in the Firebase Console, or Google
sign-in will fail with an `auth/unauthorized-domain` error.

## 7. Notes on the access token page

`/profile` is a protected route (`ProtectedRoute.tsx`) — if there's no signed-in user it
redirects back to `/`. It displays:

- The signed-in user's name, email, and avatar (from the Google profile)
- The Google OAuth **access token**, obtained via
  `GoogleAuthProvider.credentialFromResult()` after `signInWithPopup`

## 8. Design notes

- Layout: split-screen with the form on the left and an illustration panel on the right,
  matching the reference design's proportions and spacing.
- The illustration is an original, simplified composition (avatars, a meditating figure,
  and a floating task card) rather than a copy of the reference artwork, per the
  assessment's instructions.
- Responsive: the illustration panel collapses on small screens (`xs`/`sm`) so the form
  is full-width and usable on mobile.
