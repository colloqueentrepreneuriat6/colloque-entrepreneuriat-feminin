// @ts-nocheck
"use server";

import { readFileSync } from "fs";
import { join } from "path";
import { sendEmail } from "@/lib/email";

export async function sendDecisionEmail(formData: FormData) {
  const propositionId = formData.get("proposition_id") as string;
  const auteurEmail = formData.get("auteur_email") as string;
  const titre = formData.get("titre") as string;
  const decision = formData.get("decision") as string;
  const remarques = formData.getAll("remarques") as string[];

  if (!auteurEmail || !titre || !decision) {
    return { error: "Informations manquantes pour l'envoi de l'email" };
  }

  // Charger le template HTML
  const templatePath = join(process.cwd(), "templates", "email-participant.html");
  let htmlTemplate = readFileSync(templatePath, "utf-8");

  // Personnaliser le template
  const decisionLabel = decision === "accepte" ? "Acceptée" : "Refusée";
  const remarquesHtml = remarques.map(r => r ? `<p>${r}</p>` : "").join("");

  htmlTemplate = htmlTemplate
    .replace(/{{titre}}/g, titre)
    .replace(/{{decision}}/g, decisionLabel)
    .replace(/{{remarques}}/g, remarquesHtml)
    .replace(/{{date}}/g, new Date().toLocaleDateString("fr-FR"));

  // Envoyer l'email
  const result = await sendEmail({
    to: auteurEmail,
    subject: `Colloque - Décision sur votre proposition : ${titre}`,
    html: htmlTemplate,
  });

  if (result.error) {
    return { error: `Erreur envoi email: ${result.error}` };
  }

  return { success: true, message: "Email envoyé avec succès" };
}
