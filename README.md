# JANKI REAL ESTATE GROUP

Premium residential property discovery and business CRM for Jaipur.

## Run locally

1. Install Node.js 20+ and run `npm install`.
2. Copy `.env.example` to `.env.local` and add your Supabase project URL and anon key.
3. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
4. Create an administrator using Supabase Authentication, then promote their profile with:
   `UPDATE public.profiles SET role = 'admin' WHERE id = '<auth-user-uuid>';`
5. Run `npm run dev` and open `http://localhost:3000`.

The public website renders without Supabase credentials, but lead capture and the private dashboard need a configured project. Admin registration is intentionally not exposed publicly. Set authentication email confirmation and disable public signups in Supabase before launch. Configure production environment variables and a custom domain at your host (e.g. Vercel).

## Included

- Responsive, motion-enhanced public home and residential listings.
- Listing details and enquiry forms that write to Supabase.
- `/admin/login` sign-in and `/admin` CRM dashboard, protected by Supabase Auth and an administrator role.
- Initial schema with RLS policies for properties, leads, visits, follow-ups, reviews, content and activity records.

Do not put a Supabase service-role key in the browser or commit credentials. Review free-tier quotas and commercial terms before launch.
