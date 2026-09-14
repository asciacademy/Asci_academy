# Google Authentication & One Tap Setup Guide

This guide explains how to configure Google Identity Services (GIS) and Supabase OAuth for genuine Google Sign-In and Canva-style One Tap Account Chooser on ASCI.

---

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown in the top bar and click **New Project**.
3. Name your project (e.g., `ASCI Academy`) and select your organization (if applicable).
4. Click **Create**.

---

## 2. Configure OAuth Consent Screen

1. In the left navigation menu, navigate to **APIs & Services** > **OAuth consent screen**.
2. Select User Type:
   - **External** (accessible to all Google users with `@gmail.com` or Google Workspace accounts).
3. Click **Create**.
4. Fill in the **App Information**:
   - **App name**: `ASCI Academy`
   - **User support email**: Select your email.
   - **App logo** (optional): Upload ASCI logo.
   - **Application home page**: `https://yourdomain.com` (or `http://localhost:3000` for development).
   - **Authorized domains**:
     - `supabase.co`
     - `yourdomain.com`
   - **Developer contact information**: Your email address.
5. Click **Save and Continue**.
6. **Scopes**:
   - Click **Add or Remove Scopes**.
   - Select:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`
   - Click **Update** > **Save and Continue**.
7. If your app status is **Testing**, add your test Gmail accounts under **Test users**. When ready for public launch, click **Publish App**.

---

## 3. Create OAuth 2.0 Credentials (Web Client)

1. In the left menu, go to **APIs & Services** > **Credentials**.
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
3. Select Application type: **Web application**.
4. Name: `ASCI Web Client`.
5. **Authorized JavaScript origins**:
   Add the origins from which your app issues requests:
   - Development: `http://localhost:3000`
   - Local alternative: `http://127.0.0.1:3000`
   - Production: `https://yourdomain.com` (and any preview domains)
6. **Authorized redirect URIs**:
   Add the following redirect endpoints:
   - Local Next.js callback: `http://localhost:3000/auth/callback`
   - Production Next.js callback: `https://yourdomain.com/auth/callback`
   - **Supabase OAuth Callback URL**:
     `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`
     *(Find this in your Supabase Dashboard -> Authentication -> Providers -> Google)*
7. Click **Create**.
8. Copy your:
   - **Client ID** (e.g., `123456789-abcdef.apps.googleusercontent.com`)
   - **Client Secret** (e.g., `GOCSPX-xxxxxxxxxxxxx`)

---

## 4. Configure Supabase Dashboard

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project.
3. In the sidebar, navigate to **Authentication** > **Providers**.
4. Find **Google** and toggle it **Enabled**.
5. Paste your:
   - **Client ID**
   - **Client Secret**
6. Copy the **Callback URL (for OAuth)** shown in Supabase and ensure it matches the authorized redirect URI in Google Cloud Console.
7. Click **Save**.

---

## 5. Configure Local Environment Variables

In your project root, copy `.env.example` to `.env.local` (or update `.env.local`):

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID="123456789-abcdef.apps.googleusercontent.com"
NEXT_PUBLIC_SUPABASE_URL="https://<your-project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

> **Note on Google One Tap**:
> When `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is defined and user visits unauthenticated, Google Identity Services automatically displays the top-right Canva-style Google account chooser prompt!

---

## 6. How the Authentication Architecture Works

```
1. Unauthenticated Visitor
   ├── Header renders top-right "Sign in" button (Google branded)
   └── GIS One Tap prompt renders at top-right of browser window

2. User Interaction
   ├── Click "Sign in" → Calls Supabase OAuth with prompt: 'select_account'
   │   └── Opens Google's genuine account chooser
   └── Click One Tap card → Returns signed Google ID token
       └── Verified securely via Supabase signInWithIdToken

3. Post-Authentication
   ├── Session stored securely in HTTP-only cookies
   ├── Profiles table created/updated with Google name & profile avatar
   ├── Header updates top-right to user avatar & dropdown menu
   └── User gains full access to /dashboard, /profile, courses, and DSA practice
```
