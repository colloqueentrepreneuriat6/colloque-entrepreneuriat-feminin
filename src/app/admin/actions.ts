"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function createProposition(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const titre = formData.get("titre") as string;
  const auteur_nom = (formData.get("auteur_nom") as string) || null;
  const auteur_email = (formData.get("auteur_email") as string) || null;
  const document_url = (formData.get("document_url") as string) || null;

  if (!titre?.trim()) return { error: "L'intitulé est obligatoire." };

  const { error } = await supabase.from("propositions").insert({
    titre: titre.trim(),
    auteur_nom: auteur_nom?.trim() || null,
    auteur_email: auteur_email?.trim() || null,
    document_url: document_url?.trim() || null,
    statut: "nouvelle",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function assignReviewers(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const propositionId = formData.get("proposition_id") as string;
  const rapporteur1Id = formData.get("rapporteur1_id") as string;
  const rapporteur2Id = formData.get("rapporteur2_id") as string;

  if (!propositionId || !rapporteur1Id || !rapporteur2Id)
    return { error: "Veuillez sélectionner deux rapporteurs différents." };
  if (rapporteur1Id === rapporteur2Id)
    return { error: "Les deux rapporteurs doivent être différents." };

  const { error: errAtt1 } = await supabase.from("attributions").insert({
    proposition_id: propositionId,
    rapporteur_id: rapporteur1Id,
  });
  if (errAtt1) return { error: errAtt1.message };

  const { error: errAtt2 } = await supabase.from("attributions").insert({
    proposition_id: propositionId,
    rapporteur_id: rapporteur2Id,
  });
  if (errAtt2) return { error: errAtt2.message };

  const { error: errUpdate } = await supabase
    .from("propositions")
    .update({ statut: "attribuee" })
    .eq("id", propositionId);
  if (errUpdate) return { error: errUpdate.message };

  revalidatePath("/admin");
  return { success: true };
}

export async function markAsNotified(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const propositionId = formData.get("proposition_id") as string;
  if (!propositionId) return { error: "Proposition manquante." };

  const { error } = await supabase
    .from("propositions")
    .update({ statut: "notifiee" })
    .eq("id", propositionId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
