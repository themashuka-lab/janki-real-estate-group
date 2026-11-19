import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/config';
import { PropertyManager } from '@/components/property-manager';
import { Building2, ClipboardList } from 'lucide-react';
export default async function AdminPropertiesPage(){if(!isSupabaseConfigured()) redirect('/admin');const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect('/admin/login');const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();if(profile?.role!=='admin')redirect('/admin');const {data:properties}=await supabase.from('properties').select('id,title,category,location,price,status,created_at').order('created_at',{ascending:false});return <main className="admin-shell"><div className="admin-top"><div><div className="eyebrow"><span/> INVENTORY</div><h1>Your properties.</h1><p>Add and publish the homes you’re helping people discover.</p></div></div><div className="admin-nav"><Link href="/admin"><ClipboardList/> Overview</Link><Link className="selected" href="/admin/properties"><Building2/> Properties</Link></div><PropertyManager initialProperties={properties??[]}/></main>}
