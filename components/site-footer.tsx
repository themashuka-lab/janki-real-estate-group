import Link from 'next/link';
import { ArrowUpRight, Instagram, Facebook, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><div><Link className="brand footer-brand" href="/"><span className="brand-mark">J</span><span>JANKI<small>REAL ESTATE GROUP</small></span></Link><p>Thoughtful guidance. Places to call home.</p></div><div><h4>Explore</h4><Link href="/properties">Properties</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link></div><div><h4>Get in touch</h4><a href="tel:+919876543210"><Phone size={15}/> +91 98765 43210</a><span><MapPin size={15}/> Jaipur, Rajasthan</span><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JANKI Real Estate Group</span><span>Find your place. Build your future.</span><div><a aria-label="Instagram" href="#"><Instagram size={16}/></a><a aria-label="Facebook" href="#"><Facebook size={16}/></a></div></div></footer>;
}
