import {PropertyCard} from '@/components/property-card';
import {EmiCalculator} from '@/components/emi-calculator';
import {properties} from '@/lib/properties';
import {ArrowRight} from 'lucide-react';
import Link from 'next/link';
export default function BuyPage(){return <main className="listing-page"><section className="listing-hero"><div className="eyebrow light"><span/> BUY A HOME IN JAIPUR</div><h1>Make room for<br/><em>what’s next.</em></h1><p>Come home to a place that fits the way you want to live.</p></section><section className="section-pad"><div className="section-heading"><div><div className="eyebrow"><span/> FIND YOUR FIT</div><h2>Homes for buying</h2></div><Link className="under-link" href="/properties">All properties <ArrowRight size={15}/></Link></div><div className="property-grid">{properties.map((p,i)=><PropertyCard key={p.id} property={p} index={i}/>)}</div></section><section className="emi-section"><EmiCalculator/></section></main>}
