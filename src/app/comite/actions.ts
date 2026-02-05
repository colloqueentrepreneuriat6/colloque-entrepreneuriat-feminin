"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Decision } from "@/types/database";

export async function submitEvaluation(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;
  if (!session || !userId) return { error: "Non connecté." };

  const supabase = supabaseAdmin;
  if (!supabase) return { error: "Service indisponible." };

  const propositionId = formData.get("proposition_id") as string;
  const decision = formData.get("decision") as Decision;
  const remarques = (formData.get("remarques") as string)?.trim() || null;

  if (!propositionId || !decision || !["accepte", "refuse"].includes(decision))
    return { error: "Veuillez choisir une décision (accepter ou refuser)." };

  const { error: insertError } = await supabase.from("evaluations").insert({
    proposition_id: propositionId,
    rapporteur_id: userId,
    decision,
    remarques,
  });

  if (insertError) {
    if (insertError.code === "23505") return { error: "Vous avez déjà soumis votre évaluation pour cette proposition." };
    return { error: insertError.message };
  }

  const { count } = await supabase
    .from("evaluations")
    .select("id", { count: "exact", head: true })
    .eq("proposition_id", propositionId);

  if (count === 2) {
    await supabase
      .from("propositions")
      .update({ statut: "evaluee" })
      .eq("id", propositionId);
  }

  revalidatePath("/comite");
  revalidatePath("/admin");
  return { success: true };
}
