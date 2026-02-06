"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export async function addProposition(formData: FormData) {
  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Supabase non configuré." };

  const titre = formData.get("titre") as string;
  const auteur_nom = (formData.get("auteur_nom") as string) || null;
  const auteur_email = (formData.get("auteur_email") as string) || null;
  const document_url = (formData.get("document_url") as string) || null;

  if (!titre?.trim()) return { error: "L'intitulé est obligatoire." };

  const { error } = await (supabase as any)
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

  if (!propositionId) {
    return { error: "Veuillez sélectionner une proposition." };
  }
  
  if (reviewerIds.length === 0) {
    return { error: "Veuillez sélectionner au moins un reviewer." };
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

  const { error: attrError } = await (supabase as any)
    .from("attributions")
    .insert(attributions);

  if (attrError) return { error: attrError.message };

  // Mettre à jour le statut de la proposition si 2 reviewers sont assignés
  if (reviewerIds.length >= 2) {
    const { error: statusError } = await (supabase as any)
      .from("propositions")
      .update({ statut: "attribuee" })
      .eq("id", propositionId);

    if (statusError) return { error: statusError.message };
  }

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

  const { error } = await (supabase as any)
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
