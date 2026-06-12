# Stripe Setup Guide for SweetDelights Bakery

## Getting Your Stripe API Keys

Follow these steps to get your Stripe API keys and enable payment processing:

### 1. Create a Stripe Account
1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign up" (or "Sign in" if you already have an account)
3. Complete the registration process

### 2. Access Your API Keys
1. Log in to your Stripe Dashboard: [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode) - Keep this private!

### 3. Update Your `.env` File
Replace the placeholder values in your `.env` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

**Example:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjK1234567890lMnOpQrStUvWxYz
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjK1234567890lMnOpQrStUvWxYz
```

### 4. Test Mode vs Live Mode
- **Test Mode** (recommended for development):
  - Keys start with `pk_test_` and `sk_test_`
  - No real charges are made
  - Use test card numbers (see below)

- **Live Mode** (for production):
  - Keys start with `pk_live_` and `sk_live_`
  - Real charges will be processed
  - Requires business verification

### 5. Test Card Numbers (Test Mode Only)
When testing your checkout in test mode, use these card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**More test cards:** [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

### 6. Webhook Setup (Optional - For Production)
For handling post-payment events (like order confirmation):

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "+ Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Add it to your `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### 7. Restart Your Development Server
After updating the `.env` file:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## Testing the Checkout Flow

1. Add items to your cart
2. Click "Proceed to Checkout"
3. Fill in the shipping form
4. Click "Proceed to Payment"
5. Enter test card details (see above)
6. Complete the payment

## Troubleshooting

**Issue: "Invalid API Key"**
- Make sure you copied the full key including the prefix
- Check that there are no extra spaces before or after the key
- Verify you're using test keys (starting with `sk_test_` and `pk_test_`)

**Issue: "No such checkout session"**
- Restart your development server after adding the keys
- Clear your browser cache

**Issue: Redirect to checkout doesn't work**
- Check browser console for errors
- Verify `NEXTAUTH_URL` in `.env` matches your local URL (e.g., `http://localhost:3002`)

## Production Checklist

Before going live:
- [ ] Switch to live API keys (`pk_live_` and `sk_live_`)
- [ ] Set up webhooks with production URL
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Enable Stripe account for live payments (requires business verification)
- [ ] Test with small real transactions
- [ ] Set up proper error logging and monitoring

## Need Help?

- Stripe Documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Stripe Support: [https://support.stripe.com](https://support.stripe.com)
- Next.js + Stripe Guide: [https://stripe.com/docs/payments/checkout/how-checkout-works](https://stripe.com/docs/payments/checkout/how-checkout-works)
