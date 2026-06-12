# Google OAuth Setup Guide 🔐

This guide will help you set up Google OAuth authentication for your SweetDelights Bakery store.

---

## ✅ What's Already Configured

Your application is now configured with:
- ✅ **NextAuth.js v5** with Google OAuth Provider
- ✅ **Prisma Schema** updated with Account, Session, and VerificationToken models
- ✅ **Beautiful Sign-in UI** with functional Google button
- ✅ **Automatic user creation** for OAuth sign-ins
- ✅ **Session management** with JWT strategy
- ✅ **Profile picture sync** from Google account

---

## 🚀 Setup Steps

### Step 1: Update Database Schema

Run these commands to apply the new OAuth schema to your Supabase database:

```bash
# Generate Prisma client with new models
npm run db:generate

# Push schema changes to database
npm run db:push
```

**What this does:**
- Adds `Account` model for linking OAuth providers
- Adds `Session` model for session management
- Adds `VerificationToken` model for email verification
- Updates `User` model with `image`, `emailVerified`, and optional `passwordHash`

---

### Step 2: Create Google OAuth Credentials

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/apis/credentials

2. **Create a Project** (if you don't have one):
   - Click "Select a project" → "New Project"
   - Name it "SweetDelights Bakery"
   - Click "Create"

3. **Configure OAuth Consent Screen:**
   - Go to "OAuth consent screen" in the left sidebar
   - Select "External" (for testing) or "Internal" (for organization)
   - Fill in:
     - **App name:** SweetDelights Bakery
     - **User support email:** your-email@example.com
     - **Developer contact:** your-email@example.com
   - Click "Save and Continue"
   - Add scopes (optional for now): `userinfo.email`, `userinfo.profile`
   - Click "Save and Continue"
   - Add test users (yourself) if using External
   - Click "Save and Continue"

4. **Create OAuth 2.0 Client ID:**
   - Go to "Credentials" in the left sidebar
   - Click "Create Credentials" → "OAuth client ID"
   - Select **Application type:** Web application
   - **Name:** SweetDelights Web Client
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3002
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3002/api/auth/callback/google
     ```
   - Click "Create"

5. **Copy Your Credentials:**
   - You'll see a popup with:
     - **Client ID** (starts with something like `1234567890-abc.apps.googleusercontent.com`)
     - **Client Secret** (a long random string)
   - Keep this window open for the next step!

---

### Step 3: Add Credentials to .env

Open your `.env` file and replace the placeholder values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET_HERE
```

**Example:**
```env
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-actual-secret-here
```

⚠️ **Important:** Never commit your `.env` file to Git! It's already in `.gitignore`.

---

### Step 4: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

---

### Step 5: Test Google Sign-In

1. **Go to your login page:**
   ```
   http://localhost:3002/login
   ```

2. **Click the "Google" button**
   - You should be redirected to Google's sign-in page
   - Select or enter your Google account
   - Grant permissions
   - You'll be redirected back to your homepage, signed in!

3. **Verify it worked:**
   - Check the navbar - you should see your name/email
   - Click your profile to see the dropdown
   - Your Google profile picture should appear

---

## 🔧 How It Works

### OAuth Flow

```
User clicks "Sign in with Google"
         ↓
NextAuth redirects to Google
         ↓
User authorizes on Google
         ↓
Google redirects back with code
         ↓
NextAuth exchanges code for tokens
         ↓
NextAuth creates/updates user in database
         ↓
User is signed in with session
```

### Database Structure

**When a user signs in with Google:**

1. **User Table:**
   ```typescript
   {
     id: "cuid...",
     email: "user@gmail.com",
     name: "John Doe",
     image: "https://lh3.googleusercontent.com/...",
     role: "CUSTOMER",
     passwordHash: null,  // No password for OAuth users
   }
   ```

2. **Account Table:** (Links user to Google)
   ```typescript
   {
     userId: "cuid...",
     provider: "google",
     providerAccountId: "1234567890",
     access_token: "ya29.a0...",
     refresh_token: "1//0g...",
     expires_at: 1234567890,
   }
   ```

3. **Session Table:** (Active sessions)
   ```typescript
   {
     sessionToken: "abc123...",
     userId: "cuid...",
     expires: "2024-07-12T00:00:00.000Z",
   }
   ```

---

## 🎨 UI Features

Your Google sign-in button includes:

- ✅ **Official Google colors** (multi-color G logo)
- ✅ **Loading spinner** while processing
- ✅ **Disabled state** during sign-in
- ✅ **Smooth animations** (scale on hover/click)
- ✅ **Error handling** with user-friendly messages
- ✅ **Consistent theme** matching your bakery design

---

## 🔒 Security Features

### Implemented:
- ✅ **CSRF Protection** (built into NextAuth)
- ✅ **Secure HTTP-only cookies** for sessions
- ✅ **JWT tokens** with encryption
- ✅ **OAuth 2.0 authorization code flow**
- ✅ **State parameter** for CSRF protection
- ✅ **Email verification support** (schema ready)

### Environment Security:
- ✅ **NEXTAUTH_SECRET** for token encryption
- ✅ **NEXTAUTH_URL** for callback URL validation
- ✅ Credentials stored in `.env` (never committed)

---

## 🧪 Testing Checklist

- [ ] Google button appears on login page
- [ ] Clicking Google button shows loading spinner
- [ ] Redirects to Google sign-in page
- [ ] After authorization, redirects back to homepage
- [ ] User appears in navbar (signed in)
- [ ] Profile picture from Google appears
- [ ] User role is set to "CUSTOMER"
- [ ] User can sign out
- [ ] User can sign in again (existing account)

---

## 🚨 Troubleshooting

### Error: "Redirect URI mismatch"
**Problem:** The callback URL doesn't match what's in Google Console.

**Solution:**
1. Check your `NEXTAUTH_URL` in `.env` matches your dev server
2. Go to Google Console → Credentials
3. Edit your OAuth client
4. Add the exact callback URL:
   ```
   http://localhost:3002/api/auth/callback/google
   ```

---

### Error: "Access blocked: This app's request is invalid"
**Problem:** OAuth consent screen not configured.

**Solution:**
1. Go to Google Console → OAuth consent screen
2. Complete all required fields
3. Add your email as a test user
4. Save and try again

---

### Error: "Missing GOOGLE_CLIENT_ID"
**Problem:** Environment variables not loaded.

**Solution:**
1. Check `.env` file has the correct values
2. Restart your dev server (`npm run dev`)
3. Make sure `.env` is in the root directory

---

### User created but no profile picture
**Problem:** Google didn't provide the image.

**Solution:**
- Normal! Some Google accounts don't have profile pictures
- The app handles this gracefully with a fallback initial

---

### Sign in works but user role is wrong
**Problem:** Default role is CUSTOMER, but you need ADMIN.

**Solution:**
Manually update the user's role in the database:

```bash
# Open Prisma Studio
npm run db:studio

# Or use SQL
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'your-google-email@gmail.com';
```

---

## 🌐 Production Deployment

When deploying to production (Vercel, etc.):

1. **Update environment variables:**
   ```env
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=generate-a-new-strong-secret-key
   ```

2. **Add production URL to Google Console:**
   - Authorized JavaScript origins:
     ```
     https://your-domain.com
     ```
   - Authorized redirect URIs:
     ```
     https://your-domain.com/api/auth/callback/google
     ```

3. **Publish OAuth consent screen:**
   - Go to OAuth consent screen
   - Click "Publish app"
   - Submit for verification if needed

---

## 📊 Database Schema Reference

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?   // Optional for OAuth
  name          String?
  image         String?   // Profile picture URL
  emailVerified DateTime? // For email verification
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
}
```

### Account Model (OAuth Linking)
```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String  // "google"
  providerAccountId String  // Google's user ID
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}
```

---

## 🎯 Next Steps

Now that Google OAuth is set up, you can:

1. **Add more OAuth providers:**
   - GitHub, Facebook, Twitter, etc.
   - Follow similar pattern in `auth.ts`

2. **Add email verification:**
   - Send verification emails
   - Use `VerificationToken` model

3. **Implement password reset:**
   - For users who signed up with email/password

4. **Add 2FA (Two-Factor Authentication):**
   - Enhanced security for admin accounts

---

## 📚 Resources

- **NextAuth.js v5 Docs:** https://authjs.dev/
- **Google OAuth 2.0:** https://developers.google.com/identity/protocols/oauth2
- **Prisma Adapter:** https://authjs.dev/reference/adapter/prisma
- **NextAuth GitHub:** https://github.com/nextauthjs/next-auth

---

**Last Updated:** June 12, 2026
**Version:** 1.0.0
**Status:** ✅ Ready for Production
