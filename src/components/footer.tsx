import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'All Cakes', href: '/cakes' },
    { label: 'Cupcakes', href: '/cupcakes' },
    { label: 'Custom Orders', href: '/custom' },
    { label: 'Gift Cards', href: '/gift-cards' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Delivery Info', href: '/delivery' },
    { label: 'Returns', href: '/returns' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif font-semibold tracking-wide">
                Sweet<span className="text-primary">Delights</span>
              </span>
            </Link>
            <p className="text-white/70 max-w-sm leading-relaxed">
              Crafting moments of sweetness since 2010. Every cake tells a story, and we're here to make yours unforgettable.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Bakery Lane, Sweet City, SC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@sweetdelights.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="w-5 h-5 text-primary" />
                <span>Mon - Sat: 8AM - 8PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} SweetDelights. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/50 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Sweet City
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
