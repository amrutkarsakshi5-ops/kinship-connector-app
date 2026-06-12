
-- 1) Hide sensitive contact columns from anonymous users
REVOKE SELECT ON public.gyms FROM anon;
GRANT SELECT (
  id, name, description, address, city, state, website, category,
  membership_price, opening_hours, facilities, image_url, gallery_urls,
  map_location, featured, status, created_by, created_at, updated_at
) ON public.gyms TO anon;

-- 2) Lock down user_roles - deny self-service writes via restrictive policies
CREATE POLICY "Deny role inserts to clients"
  ON public.user_roles AS RESTRICTIVE FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Deny role updates to clients"
  ON public.user_roles AS RESTRICTIVE FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

CREATE POLICY "Deny role deletes to clients"
  ON public.user_roles AS RESTRICTIVE FOR DELETE
  TO anon, authenticated
  USING (false);

-- 3) has_role is only meant to be called from RLS policies (which run as definer).
-- Revoke direct EXECUTE from PostgREST-exposed roles.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
