'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><Link className="brand" href="/" onClick={() => setOpen(false)}><span className="brand-mark">J</span><span>JANKI<small>REAL ESTATE GROUP</small></span></Link><nav className={open ? 'nav-links nav-open' : 'nav-links'}><Link href="/properties" onClick={() => setOpen(false)}>Properties</Link><Link href="/about" onClick={() => setOpen(false)}>Our story</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link><Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Let's talk <ArrowUpRight size={15}/></Link></nav><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>;
}
