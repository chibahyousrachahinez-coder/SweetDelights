# 🚀 Vercel Deployment Guide - SweetDelights Bakery

## Quick Deploy Steps

### 1. Push to GitHub (if not done yet)

```bash
# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment"

# Create GitHub repo and push (if needed)
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin master
```

---

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. **Go to:** https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** your repository
4. **Click "Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

### 3. Set Environment Variables in Vercel

Go to: **Project Settings → Environment Variables**

Add these variables:

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres.hjtcqrgjtrqfvscbuseh:Chibah*yousra07@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.hjtcqrgjtrqfvscbuseh:Chibah*yousra07@aws-1-eu-north-1.pooler.supabase.com:5432/postgres

# NextAuth (UPDATE THESE!)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-a-new-strong-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important:**
- ✅ For each variable, select all environments: **Production, Preview, Development**
- ✅ Click "Save" after adding each one

---

### 4. Update Google OAuth Redirect URI

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth Client ID
3. Add **Authorized redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
4. Click "Save"

---

### 5. Generate Strong NEXTAUTH_SECRET

Run this in your terminal:
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

---

## 🎯 After Deployment

### Test Your Site

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test Google sign-in
3. Test admin login
4. Test shopping cart
5. Test checkout

---

## 🔧 Troubleshooting

### Build Fails?

**Check these:**
- ✅ All environment variables are set
- ✅ DATABASE_URL is accessible from Vercel's servers
- ✅ No TypeScript errors (`npm run build` locally)
- ✅ All dependencies are in `package.json`

### Google OAuth Fails?

- ✅ Verify redirect URI in Google Console
- ✅ Check NEXTAUTH_URL matches your domain
- ✅ Ensure GOOGLE_CLIENT_ID and SECRET are correct

### Database Connection Issues?

- ✅ Verify Supabase allows connections from Vercel IPs
- ✅ Check DATABASE_URL has correct credentials
- ✅ Try using DIRECT_URL instead of pooler URL

---

## 🌐 Custom Domain (Optional)

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain
5. Update Google OAuth redirect URIs

---

## 📊 Monitoring

Vercel provides:
- ✅ Real-time logs
- ✅ Performance analytics
- ✅ Error tracking
- ✅ Deployment history

Access at: https://vercel.com/dashboard

---

## 🚀 Quick Commands

```bash
# Redeploy
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Alias to custom domain
vercel alias set deployment-url.vercel.app custom-domain.com
```

---

## ✅ Deployment Checklist

- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Vercel project created
- [ ] All environment variables set
- [ ] Google OAuth redirect URI updated
- [ ] Site accessible and loading
- [ ] Google sign-in working
- [ ] Admin dashboard accessible
- [ ] Shopping cart functional
- [ ] Checkout working
- [ ] Database queries successful

---

**Your bakery is ready for the world! 🎂✨**
