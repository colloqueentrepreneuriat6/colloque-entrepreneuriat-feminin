// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    
    if (!session || !userId) {
      return NextResponse.json({ error: "Non connecté." }, { status: 401 });
    }

    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json({ error: "Service indisponible." }, { status: 500 });
    }

    const formData = await request.formData();
    const propositionId = formData.get("proposition_id") as string;
    const decision = formData.get("decision") as any;
    const remarques = (formData.get("remarques") as string)?.trim() || null;

    if (!propositionId || !decision || !["accepte", "refuse"].includes(decision)) {
      return NextResponse.json({ error: "Veuillez choisir une décision (accepter ou refuser)." }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("evaluations").insert({
      proposition_id: propositionId,
      rapporteur_id: userId,
      decision,
      remarques,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "Vous avez déjà soumis votre évaluation pour cette proposition." }, { status: 400 });
      }
      return NextResponse.json({ error: insertError.message }, { status: 500 });
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

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erreur lors de la soumission de l'évaluation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    
    if (!session || !userId) {
      return NextResponse.json({ error: "Non connecté." }, { status: 401 });
    }

    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json({ error: "Service indisponible." }, { status: 500 });
    }

    const formData = await request.formData();
    const propositionId = formData.get("proposition_id") as string;
    const decision = formData.get("decision") as any;
    const remarques = (formData.get("remarques") as string)?.trim() || null;

    if (!propositionId || !decision || !["accepte", "refuse"].includes(decision)) {
      return NextResponse.json({ error: "Veuillez choisir une décision (accepter ou refuser)." }, { status: 400 });
    }

    const { error: updateError } = await supabase
      .from("evaluations")
      .update({
        decision,
        remarques,
        updated_at: new Date().toISOString(),
      })
      .eq("proposition_id", propositionId)
      .eq("rapporteur_id", userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Évaluation mise à jour avec succès" });

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'évaluation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
