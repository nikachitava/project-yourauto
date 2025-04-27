import { createClient } from "@/utils/supabase/client";

export const uploadImage = async (file: File, bucket: string, pathPrefix: string) => {
    const supabase = createClient()

    const fileExt = file.name.split('.').pop();
    const fileName = `${pathPrefix}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;
  
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
  
    if (error) throw error;
  
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
  
    return publicUrl;
  };