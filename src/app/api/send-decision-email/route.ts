import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from "fs";
import { join } from "path";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const auteurEmail = formData.get("auteur_email") as string;
    const titre = formData.get("titre") as string;
    const decision = formData.get("decision") as string;

    if (!auteurEmail || !titre || !decision) {
      return NextResponse.json({ error: "Informations manquantes pour l'envoi de l'email" }, { status: 400 });
    }

    // Charger le template HTML professionnel
    const templatePath = join(process.cwd(), "templates", "email-decision-professionnel.html");
    let htmlTemplate = readFileSync(templatePath, "utf-8");

    // Personnaliser le template
    const decisionLabel = decision === "accepte" ? "Acceptée" : decision === "refuse" ? "Refusée" : "En attente de décision finale";
    const decisionClass = decision === "accepte" ? "accepted" : decision === "refuse" ? "rejected" : "pending";

    htmlTemplate = htmlTemplate
      .replace(/{{titre}}/g, titre)
      .replace(/{{decision}}/g, decisionLabel)
      .replace(/{{decision_class}}/g, decisionClass)
      .replace(/{{date}}/g, new Date().toLocaleDateString("fr-FR"));

    // Envoyer l'email
    const result = await sendEmail({
      to: auteurEmail,
      subject: `Colloque - Décision sur votre proposition : ${titre}`,
      html: htmlTemplate,
    });

    if (result.error) {
      return NextResponse.json({ error: `Erreur envoi email: ${result.error}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Mail de notification envoyé avec succès" });
  } catch (error) {
    console.error("Erreur API send-decision-email:", error);
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi de l'email" }, { status: 500 });
  }
}
