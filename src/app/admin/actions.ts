// @ts-nocheck
"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function addProposition(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const titre = formData.get("titre") as string;
  const auteur_nom = (formData.get("auteur_nom") as string) || null;
  const auteur_email = (formData.get("auteur_email") as string) || null;
  const document_url = (formData.get("document_url") as string) || null;

  if (!titre?.trim()) return { error: "L'intitulé est obligatoire." };

  const { error } = await supabase
    .from("propositions")
    .insert({
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
  const reviewerIds = formData.getAll("reviewer_ids") as string[];

  if (!propositionId || reviewerIds.length === 0) {
    return { error: "Veuillez sélectionner une proposition et au moins un reviewer." };
  }

  // Supprimer les anciennes attributions
  await supabase
    .from("attributions")
    .delete()
    .eq("proposition_id", propositionId);

  // Insérer les nouvelles attributions
  const attributions = reviewerIds.map((reviewerId) => ({
    proposition_id: propositionId,
    rapporteur_id: reviewerId,
  }));

  const { error } = await supabase
    .from("attributions")
    .insert(attributions);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function updatePropositionStatus(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const propositionId = formData.get("proposition_id") as string;
  const newStatus = formData.get("statut") as string;

  if (!propositionId || !newStatus) {
    return { error: "Paramètres manquants." };
  }

  const { error } = await supabase
    .from("propositions")
    .update({ statut: newStatus })
    .eq("id", propositionId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProposition(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const propositionId = formData.get("proposition_id") as string;

  if (!propositionId) {
    return { error: "ID de proposition manquant." };
  }

  // Supprimer d'abord les attributions et évaluations liées
  await supabase.from("attributions").delete().eq("proposition_id", propositionId);
  await supabase.from("evaluations").delete().eq("proposition_id", propositionId);

  // Supprimer la proposition
  const { error } = await supabase
    .from("propositions")
    .delete()
    .eq("id", propositionId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
