export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Store Settings */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
        <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
          Store Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Store Name
            </label>
            <input
              type="text"
              defaultValue="SweetDelights"
              className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Store Description
            </label>
            <textarea
              rows={4}
              defaultValue="Your favorite online bakery for custom cakes and cupcakes"
              className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
        <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
          Email Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              defaultValue="contact@sweetdelights.com"
              className="w-full px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all shadow-md shadow-pink-200/50">
          Save Changes
        </button>
      </div>
    </div>
  );
}
