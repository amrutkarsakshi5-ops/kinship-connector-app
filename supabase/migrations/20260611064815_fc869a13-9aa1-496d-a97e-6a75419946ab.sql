
CREATE POLICY "Public read gym images" ON storage.objects FOR SELECT USING (bucket_id = 'gym-images');
CREATE POLICY "Admins upload gym images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gym-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update gym images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gym-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete gym images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gym-images' AND public.has_role(auth.uid(), 'admin'));
