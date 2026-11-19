# JANKI REAL ESTATE GROUP

A responsive Next.js residential real-estate website and private Supabase CRM starter.

## Production setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create the first owner account through Supabase Authentication.
4. Promote the account:

```sql
update public.profiles set role = 'admin' where id = '<auth-user-uuid>';
```

5. Set these Vercel environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL=<project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

6. Import this repository into Vercel and deploy.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The public demo renders without Supabase, while enquiries and `/admin` require the configured environment variables.

## Public routes

- `/` — brand and featured homes
- `/properties` — residential listings
- `/properties/[slug]` — property detail
- `/buy` — listings and EMI estimate
- `/about` — company story
- `/contact` — enquiry form

## Private routes

- `/admin/login` — administrator sign-in
- `/admin` — lead and inventory overview
- `/admin/properties` — property management

## Security checklist

- Never expose the Supabase service-role key.
- Disable public Supabase signups after creating authorized accounts.
- Enable email confirmation and a strong password policy.
- Replace placeholder property inventory and business contact details.
- Configure HTTPS and a custom domain before launch.
