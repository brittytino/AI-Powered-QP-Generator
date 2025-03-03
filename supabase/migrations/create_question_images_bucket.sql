
-- Create a new storage bucket for question images
INSERT INTO storage.buckets (id, name, public)
VALUES ('question-images', 'question-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'question-images');

-- Allow public access to view images
CREATE POLICY "Allow public to view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'question-images');
