-- Storage Policies

CREATE POLICY "Public Upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'item-images');

CREATE POLICY "Public Read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'item-images');