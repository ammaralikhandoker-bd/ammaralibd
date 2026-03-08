INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for product images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product-images');

CREATE POLICY "Auth users can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');