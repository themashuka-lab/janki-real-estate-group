'use client';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
export function SignOutButton(){return <button className="signout-button" onClick={async()=>{await createClient().auth.signOut();window.location.href='/admin/login';}}><LogOut size={15}/> Sign out</button>}
