import { HeaderClient } from './header-client';
import { getCurrentUser } from '@/app/actions/auth';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/showcase', label: 'SHOWCASE' },
  { href: '/cakes', label: 'CAKES' },
  { href: '/cupcakes', label: 'CUPCAKES' },
  { href: '/menu', label: 'MENU' },
  { href: '/contact', label: 'CONTACT' },
];

export async function Header() {
  const user = await getCurrentUser();

  return <HeaderClient navLinks={navLinks} user={user} />;
}
