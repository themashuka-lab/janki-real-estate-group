# JANKI REAL ESTATE GROUP

Premium residential real-estate platform and private CRM.

## Public routes

- `/` — animated brand experience
- `/properties` — residential listings
- `/properties/[slug]` — property details and enquiry
- `/buy` — buy overview and EMI calculator
- `/about` — company story
- `/contact` — enquiry form

## Private routes

- `/admin/login` — administrator sign-in
- `/admin` — overview and recent enquiries
- `/admin/properties` — add, publish, unpublish and delete listings

## Setup

```bash
npm install
cp .env.example .env.local
```

Create a Supabase project, run `supabase/schema.sql`, then set:

```text
NEXT_PUBLIC_SUPABASE_URL=<project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Create the first owner account in Supabase Authentication. The schema automatically creates a staff profile, then promote the owner once:

```sql
update public.profiles set role = 'admin' where id = '<auth-user-uuid>';
```

Run `npm run dev` and open `http://localhost:3000`.

## Production

Import the repository into Vercel, add the three environment variables, and deploy. Never expose the Supabase service-role key. Disable public signups after creating authorized staff accounts. Replace placeholder inventory and contact details before launch.
