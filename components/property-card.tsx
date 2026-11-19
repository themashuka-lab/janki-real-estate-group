'use client';
import Link from 'next/link';
import { ArrowUpRight, BedDouble, MapPin, MoveUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from '@/lib/properties';
export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
 return <motion.article className="property-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .1 }}><Link href={`/properties/${property.id}`} className="property-photo" style={{ backgroundImage: `url('${property.image}')` }}><span className="property-tag">{property.tag}</span><span className="property-arrow"><ArrowUpRight size={17}/></span></Link><div className="property-info"><span className="property-type">{property.category}</span><h3><Link href={`/properties/${property.id}`}>{property.title}</Link></h3><div className="property-location"><MapPin size={14}/>{property.location}</div><div className="property-meta">{property.beds > 0 && <span><BedDouble size={15}/> {property.beds} beds</span>}<span>{property.area}</span><strong>{property.price}</strong></div></div></motion.article>;
}
