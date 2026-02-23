'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Map, Trophy, PlusCircle } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil', icon: BookOpen },
    { href: '/create', label: 'Créer', icon: PlusCircle },
    { href: '/map', label: 'Carte', icon: Map },
    { href: '/leaderboard', label: 'Classement', icon: Trophy },
  ];

  return (
    <nav className="bg-eco-dark text-green shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            EcoStoryBuilder
          </Link>
          <div className="flex gap-6">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  pathname === href
                    ? 'bg-eco-green text-green'
                    : 'hover:bg-eco-green/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}