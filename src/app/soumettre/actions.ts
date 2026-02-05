"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

const STORAGE_BUCKET = "documents";

export async function submitProposition(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Service temporairement indisponible." };

  const titre = (formData.get("titre") as string)?.trim();
  const auteur_nom = (formData.get("auteur_nom") as string)?.trim() || null;
  const auteur_email = (formData.get("auteur_email") as string)?.trim() || null;
  const file = formData.get("document") as File | null;

  if (!titre) return { error: "L'intitulé de la communication est obligatoire." };

  let document_url: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "docx";
    if (!["doc", "docx"].includes(ext)) {
      return { error: "Le document doit être au format Word (.doc ou .docx)." };
    }
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type || (ext === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword"),
        upsert: false,
      });

    if (uploadError) {
      return {
        error:
          "Impossible d’enregistrer le document. Vérifiez que le bucket « documents » existe dans Supabase Storage, ou envoyez votre proposition à colloque.entrepreneuriat6@gmail.com.",
      };
    }

    const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(uploadData.path);
    document_url = urlData.publicUrl;
  }

  const { error } = await supabase.from("propositions").insert({
    titre,
    auteur_nom,
    auteur_email,
    document_url,
    statut: "nouvelle",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
