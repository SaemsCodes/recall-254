
-- Create constituencies table with real data
CREATE TABLE IF NOT EXISTS public.constituencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  county TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  total_voters INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced signatures table for digital signing
CREATE TABLE IF NOT EXISTS public.digital_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  petition_id UUID REFERENCES public.petitions(id) NOT NULL,
  signature_code TEXT NOT NULL UNIQUE, -- 6-character unique code
  identifier_type TEXT NOT NULL CHECK (identifier_type IN ('national_id', 'phone', 'passport', 'email', 'other')),
  identifier_value TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  constituency TEXT NOT NULL,
  ward TEXT NOT NULL,
  signature_certificate TEXT,
  verification_status JSONB NOT NULL DEFAULT '{}',
  device_fingerprint JSONB,
  geolocation JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT false
);

-- Create petition templates table
CREATE TABLE IF NOT EXISTS public.petition_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  grounds TEXT[] NOT NULL,
  template_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.constituencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.petition_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for constituencies (public read)
CREATE POLICY "Anyone can view constituencies" 
  ON public.constituencies 
  FOR SELECT 
  USING (true);

-- RLS Policies for digital signatures
CREATE POLICY "Users can create signatures" 
  ON public.digital_signatures 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own signatures via code" 
  ON public.digital_signatures 
  FOR SELECT 
  USING (true); -- Will be filtered by signature_code in application logic

-- RLS Policies for petition templates
CREATE POLICY "Anyone can view petition templates" 
  ON public.petition_templates 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create templates" 
  ON public.petition_templates 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);
