import { AdminSidebar } from '@/components/admin/sidebar';
import { getCurrentUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Redirect if not logged in or not admin
  if (!user || user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-white to-rose-50/30">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        <div className="container py-8 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
