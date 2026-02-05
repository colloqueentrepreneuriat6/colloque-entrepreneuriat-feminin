// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log('API GET proposition - ID:', id);
    const supabase = supabaseAdmin;

    if (!supabase) {
      console.log('API GET proposition - Supabase non configuré');
      return NextResponse.json(
        { error: 'Base de données non configurée' },
        { status: 500 }
      );
    }

    // Récupérer la proposition de base
    const { data: proposition, error } = await supabase
      .from('propositions')
      .select('*')
      .eq('id', id)
      .single();

    console.log('API GET proposition - Error:', error);
    console.log('API GET proposition - Data:', proposition);

    if (error) {
      return NextResponse.json(
        { error: `Proposition non trouvée: ${error.message}` },
        { status: 404 }
      );
    }

    return NextResponse.json(proposition, { status: 200 });

  } catch (error) {
    console.error('Erreur API GET proposition:', error);
    return NextResponse.json(
      { error: `Erreur serveur: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = supabaseAdmin;
    const body = await request.json();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Base de données non configurée' },
        { status: 500 }
      );
    }

    const { error } = await supabase
      .from('propositions')
      .update(body)
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la proposition' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Proposition mise à jour avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur API PUT proposition:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = supabaseAdmin;

    if (!supabase) {
      return NextResponse.json(
        { error: 'Base de données non configurée' },
        { status: 500 }
      );
    }

    // Supprimer d'abord les évaluations associées
    await supabase
      .from('evaluations')
      .delete()
      .eq('proposition_id', id);

    // Supprimer les attributions associées
    await supabase
      .from('attributions')
      .delete()
      .eq('proposition_id', id);

    // Supprimer la proposition
    const { error } = await supabase
      .from('propositions')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la proposition' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Proposition supprimée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur API DELETE proposition:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
