import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { sendEmail } from "@/lib/email";

interface CommitteeMember {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { members } = await request.json() as { members: CommitteeMember[] };

    if (!members || !Array.isArray(members)) {
      return NextResponse.json({ error: "Liste des membres invalide" }, { status: 400 });
    }

    // Charger le template HTML
    const templatePath = join(process.cwd(), "templates", "email-membre-comite.html");
    let htmlTemplate = readFileSync(templatePath, "utf-8");

    // URL de la plateforme (à adapter selon votre environnement)
    const platformUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    let sentCount = 0;
    const errors: string[] = [];

    // Envoyer les emails un par un
    for (const member of members) {
      if (!member.email) {
        errors.push(`Email manquant pour ${member.name}`);
        continue;
      }

      try {
        // Personnaliser le template pour ce membre
        let personalizedTemplate = htmlTemplate
          .replace(/{{MEMBRE_NOM}}/g, member.name)
          .replace(/{{USERNAME}}/g, member.username)
          .replace(/{{PASSWORD}}/g, member.password)
          .replace(/{{PLATFORM_URL}}/g, platformUrl);

        // Envoyer l'email
        const result = await sendEmail({
          to: member.email,
          subject: "Vos identifiants - Colloque National sur l'Entrepreneuriat Féminin",
          html: personalizedTemplate,
        });

        if (result.error) {
          errors.push(`Erreur pour ${member.name}: ${result.error}`);
        } else {
          sentCount++;
          console.log(`Email envoyé à ${member.name} (${member.email})`);
        }
      } catch (error) {
        errors.push(`Erreur lors de l'envoi à ${member.name}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalCount: members.length,
      errors: errors.length > 0 ? errors : undefined,
      message: `${sentCount} email(s) envoyé(s) avec succès sur ${members.length} membre(s)`
    });

  } catch (error) {
    console.error("Erreur lors de l'envoi des emails du comité:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi des emails" },
      { status: 500 }
    );
  }
}
