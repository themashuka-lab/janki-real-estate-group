'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

type Item = { id: string; title: string; category: string; location: string; price: string; status: 'draft' | 'published' | 'sold' };

export function PropertyManager({ initialProperties }: { initialProperties: Item[] }) {
  const [items, setItems] = useState(initialProperties);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const row = {
      title: String(form.get('title')),
      category: String(form.get('category')),
      location: String(form.get('location')),
      price: String(form.get('price')),
      description: String(form.get('description') || ''),
      status: 'draft',
    };
    const { data, error } = await createClient().from('properties').insert(row).select('id,title,category,location,price,status').single();
    setBusy(false);
    if (error) { setError(error.message); return; }
    setItems([data, ...items]);
    event.currentTarget.reset();
  }

  async function setStatus(id: string, status: 'draft' | 'published' | 'sold') {
    setError('');
    const { data, error } = await createClient().from('properties').update({ status, updated_at: new Date().toISOString() }).eq('id', id).select('id,title,category,location,price,status').single();
    if (error) { setError(error.message); return; }
    setItems(items.map((item) => item.id === id ? data : item));
  }

  async function remove(id: string) {
    setError('');
    const { error } = await createClient().from('properties').delete().eq('id', id);
    if (error) { setError(error.message); return; }
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="property-manager">
      <section className="add-property">
        <div><span className="property-type">NEW LISTING</span><h2>Add a property</h2></div>
        <form className="property-admin-form" onSubmit={add}>
          <label>Property title<input name="title" required placeholder="e.g. Garden View Apartment" /></label>
          <label>Category<select name="category"><option>Apartments</option><option>Villas & Houses</option><option>Plots</option></select></label>
          <label>Location<input name="location" required placeholder="Neighbourhood, city" /></label>
          <label>Price<input name="price" required placeholder="e.g. ₹ 85 Lakh" /></label>
          <label className="full-field">Description<textarea name="description" rows={3} /></label>
          <button className="button button-dark" disabled={busy}>{busy ? 'Saving…' : 'Save as draft'} <Plus size={16} /></button>
          {error && <span className="admin-error">{error}</span>}
        </form>
      </section>

      <section className="inventory-list">
        <div className="leads-heading"><div><span className="property-type">YOUR INVENTORY</span><h2>Listed properties</h2></div><span>{items.length} total</span></div>
        {items.length ? items.map((item) => (
          <div className="inventory-item" key={item.id}>
            <div><b>{item.title}</b><span>{item.category} · {item.location}</span></div>
            <strong>{item.price}</strong>
            <span className={`inventory-status ${item.status}`}>{item.status}</span>
            <div className="inventory-actions">
              {item.status === 'published'
                ? <button type="button" title="Move to draft" onClick={() => setStatus(item.id, 'draft')}><EyeOff size={16} /></button>
                : <button type="button" title="Publish" onClick={() => setStatus(item.id, 'published')}><Eye size={16} /></button>}
              <button type="button" title="Delete" aria-label={`Delete ${item.title}`} onClick={() => remove(item.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        )) : <div className="empty-state"><span>No listings yet. Add your first property above.</span></div>}
      </section>
    </div>
  );
}
