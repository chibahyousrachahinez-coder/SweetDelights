# Google OAuth - Quick Start 🚀

## ⚡ Immediate Next Steps

### 1. Update Your Database (Required)
```bash
npm run db:generate
npm run db:push
```

### 2. Get Google OAuth Credentials

**Quick Link:** https://console.cloud.google.com/apis/credentials

1. Create a new project (or select existing)
2. Configure OAuth consent screen
3. Create OAuth 2.0 Client ID (Web application)
4. Add authorized redirect URI:
   ```
   http://localhost:3002/api/auth/callback/google
   ```
5. Copy Client ID and Client Secret

### 3. Update .env File

Replace these placeholders in your `.env`:
```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

### 4. Restart Dev Server
```bash
# Press Ctrl+C to stop
npm run dev
```

### 5. Test It!
Visit: http://localhost:3002/login and click the Google button!

---

## ✅ What Was Implemented

### Files Modified:

1. **`prisma/schema.prisma`**
   - ✅ Added `Account` model for OAuth linking
   - ✅ Added `Session` model for session management
   - ✅ Added `VerificationToken` model
   - ✅ Updated `User` model with `image`, `emailVerified`

2. **`src/lib/auth.ts`**
   - ✅ Added `GoogleProvider` configuration
   - ✅ Added `PrismaAdapter` for database integration
   - ✅ Enhanced callbacks for OAuth sign-in
   - ✅ Automatic user creation for new Google users
   - ✅ Profile picture synchronization

3. **`src/components/ui/sign-in-card.tsx`**
   - ✅ Wired up Google button to `signIn('google')`
   - ✅ Added loading state for Google sign-in
   - ✅ Beautiful spinner animation
   - ✅ Error handling

4. **`.env`**
   - ✅ Added `GOOGLE_CLIENT_ID` placeholder
   - ✅ Added `GOOGLE_CLIENT_SECRET` placeholder

5. **`package.json`**
   - ✅ Installed `@auth/prisma-adapter` dependency

---

## 🎨 UI Features

Your Google sign-in button includes:

- ✨ Official Google colorful G icon
- ✨ Loading spinner during authentication
- ✨ Smooth hover and click animations
- ✨ Disabled state during processing
- ✨ Error messages if sign-in fails
- ✨ Matches your bakery theme (pink/rose colors)

---

## 🔒 Security Features

- ✅ OAuth 2.0 authorization code flow
- ✅ CSRF protection via NextAuth
- ✅ Secure HTTP-only cookies
- ✅ JWT token encryption
- ✅ Automatic account linking
- ✅ Session management

---

## 📊 How It Works

### Sign-In Flow:

```
1. User clicks "Google" button
        ↓
2. signIn('google') is called
        ↓
3. Redirects to Google OAuth page
        ↓
4. User authorizes app
        ↓
5. Google redirects back with code
        ↓
6. NextAuth exchanges code for tokens
        ↓
7. Creates/finds user in database
        ↓
8. Creates session and signs user in
        ↓
9. Redirects to homepage (/)
```

### Database Structure:

When a user signs in with Google, three things happen:

1. **User record created/updated** (in `User` table)
2. **Account record created** (links user to Google in `Account` table)
3. **Session created** (in `Session` table)

---

## 🧪 Testing Checklist

After setup, verify these:

- [ ] Login page loads at `/login`
- [ ] Google button is visible and styled correctly
- [ ] Clicking Google button shows spinner
- [ ] Redirects to Google sign-in page
- [ ] Can authorize with Google account
- [ ] Redirects back to homepage after auth
- [ ] User appears as signed in (navbar shows name/email)
- [ ] Profile picture from Google appears
- [ ] Can navigate to protected routes
- [ ] Can sign out
- [ ] Can sign in again (existing account)

---

## 🚨 Common Issues

### "Missing GOOGLE_CLIENT_ID"
- **Fix:** Add credentials to `.env` and restart dev server

### "Redirect URI mismatch"
- **Fix:** Add exact callback URL in Google Console:
  ```
  http://localhost:3002/api/auth/callback/google
  ```

### "This app isn't verified"
- **Fix:** Click "Advanced" → "Go to [Your App] (unsafe)" (for development)

### Database errors after sign-in
- **Fix:** Run `npm run db:push` to apply schema changes

---

## 📚 Full Documentation

For detailed setup instructions, troubleshooting, and production deployment:

📖 See: `GOOGLE_OAUTH_SETUP.md`

---

## 🎯 What's Next?

### Optional Enhancements:

1. **Add More OAuth Providers:**
   - GitHub
   - Facebook
   - Twitter/X
   - Apple

2. **Email Verification:**
   - Send confirmation emails
   - Verify email before full access

3. **Two-Factor Authentication (2FA):**
   - TOTP codes
   - SMS verification

4. **Account Linking:**
   - Link multiple OAuth providers to one account
   - Link OAuth to existing email/password account

---

## 📞 Need Help?

- Check `GOOGLE_OAUTH_SETUP.md` for detailed guide
- NextAuth v5 Docs: https://authjs.dev/
- Google OAuth Setup: https://developers.google.com/identity/protocols/oauth2

---

**Status:** ✅ Ready to Test
**Time to Setup:** ~10 minutes
**Last Updated:** June 12, 2026
