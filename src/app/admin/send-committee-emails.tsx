"use client";

import { useState } from "react";

interface CommitteeMember {
  id: string;
  name: string;
  username: string;
  password: string;
  email?: string;
}

export function SendCommitteeEmails() {
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailOverrides, setEmailOverrides] = useState<Record<string, string>>({});

  // Membres du comité depuis users.json (rôle "reviewer")
  const committeeMembers: CommitteeMember[] = [
    {
      id: "reviewer-ahouari-zahir",
      name: "Pr. AHOUARI Zahir (Université de Bejaia)",
      username: "ahouarizahir",
      password: "zahir2024",
      email: ""
    },
    {
      id: "reviewer-bessai-rachid",
      name: "Pr. BESSAI Rachid (Université de Bejaia)",
      username: "bessairachid",
      password: "rachid2024",
      email: ""
    },
    {
      id: "reviewer-djadda-mahmoud",
      name: "Pr. DJADDA Mahmoud (Université de Bejaia)",
      username: "djaddamahmoud",
      password: "mahmoud2024",
      email: ""
    },
    {
      id: "reviewer-benkkerou-fiadh",
      name: "Pr. BENKKEROU Fiadh (Université de Bejaia)",
      username: "benkkeroufiadh",
      password: "fiadh2024",
      email: ""
    },
    {
      id: "reviewer-djeffal-mokrane",
      name: "Dr. DJEFFAL Mokrane (Université de Bejaia)",
      username: "djeffalmokrane",
      password: "mokrane2024",
      email: ""
    },
    {
      id: "reviewer-faradj-akli",
      name: "Pr. FARADJ MOHAMED AKLI (Université de Bejaia)",
      username: "faradjakli",
      password: "akli2024",
      email: ""
    },
    {
      id: "reviewer-djouab-mustapha",
      name: "Dr. DJOUAB Mustapha (Université de Bejaia)",
      username: "djouabmustapha",
      password: "mustapha2024",
      email: ""
    },
    {
      id: "reviewer-hider-fouzia-member",
      name: "Dr. HIDER FOUZIA (Université de Bejaia)",
      username: "hiderfouziamember",
      password: "fouzia2024",
      email: ""
    },
    {
      id: "reviewer-djelouli-nesrine",
      name: "Dr. DJELOULI Nesrine (Université de Bejaia)",
      username: "djeloulinesrine",
      password: "nesrine2024",
      email: ""
    },
    {
      id: "reviewer-halis-samir",
      name: "Dr. HALIS Samir (Université de Bejaia)",
      username: "halissamir",
      password: "samir2024",
      email: ""
    },
    {
      id: "reviewer-noui-rabah",
      name: "Dr. NOUI RABAH (Université de Bejaia)",
      username: "nouirabah",
      password: "rabah2024",
      email: ""
    },
    {
      id: "reviewer-idir-smail",
      name: "Dr. IDIR SMAIL (Université de Bejaia)",
      username: "idirsmail",
      password: "smail2024",
      email: ""
    },
    {
      id: "reviewer-hamoudi-souhila",
      name: "Dr. HAMOUDI SOUHILA (Université de Bejaia)",
      username: "hamoudisouhila",
      password: "souhila2024",
      email: ""
    },
    {
      id: "reviewer-aissat-mohand",
      name: "Dr. AISSATMOHAND TAHAR (Université de Bejaia)",
      username: "aissatmohand",
      password: "mohand2024",
      email: ""
    },
    {
      id: "reviewer-ait-hatrite-kahina",
      name: "Dr. AIT HATRITE KAHINA (Université de Bejaia)",
      username: "aithatritekahina",
      password: "kahina2024",
      email: ""
    },
    {
      id: "reviewer-ousaidene-yassine",
      name: "Dr. OUSAIDENE Yassine (Université d'Alger 2)",
      username: "ousaideneyassine",
      password: "yassine2024",
      email: ""
    },
    {
      id: "reviewer-abedou-abderrahmane",
      name: "Pr. ABEDOU Abderrahmane, Directeur de recherche au CREAD/Alger",
      username: "abedouabderrahmane",
      password: "abderrahmane2024",
      email: ""
    },
    {
      id: "reviewer-melloud-sidali",
      name: "Dr. MELLOUD Sidali (Ecole de management de Koléa)",
      username: "melloudsidali",
      password: "sidali2024",
      email: ""
    },
    {
      id: "reviewer-tobal-rachid",
      name: "Pr. TOBAL Rachid (Université de Skikda)",
      username: "tobalrachid",
      password: "rachid2024",
      email: ""
    },
    {
      id: "reviewer-kafi-farida",
      name: "Pr. kafi Farida (université de Taref)",
      username: "kafifarida",
      password: "farida2024",
      email: ""
    },
    {
      id: "reviewer-boudjerda-yacine",
      name: "Dr.Boudjerda yacine (université de jijel)",
      username: "boudjerdayacine",
      password: "yacine2024",
      email: ""
    },
    {
      id: "reviewer-test1-mohamed",
      username: "testmohamed",
      password: "test1234",
      name: "Dr. Mohamed Test (Université de Test)",
      email: ""
    },
    {
      id: "reviewer-test2-fatima",
      username: "testfatima",
      password: "test5678",
      name: "Dr. Fatima Test (Université de Test)",
      email: ""
    }
  ];

  async function handleSendIndividualEmail(member: CommitteeMember) {
    setIsSending(true);
    setMessage(null);

    try {
      const memberWithEmail = {
        ...member,
        email: emailOverrides[member.id] || member.email || `${member.username}@example.com`
      };

      if (!memberWithEmail.email) {
        setMessage({ type: "error", text: `Email requis pour ${member.name}` });
        return;
      }

      const response = await fetch('/api/send-committee-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: [memberWithEmail] }),
      });

      const result = await response.json();

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ 
          type: "success", 
          text: `Email envoyé avec succès à ${member.name} !` 
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de l'envoi de l'email" });
    } finally {
      setIsSending(false);
    }
  }

  async function handleSendEmails() {
    setIsSending(true);
    setMessage(null);

    try {
      // Préparer les données pour l'API
      const membersWithEmails = committeeMembers.map(member => ({
        ...member,
        email: emailOverrides[member.id] || member.email || `${member.username}@example.com`
      }));

      const response = await fetch('/api/send-committee-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: membersWithEmails }),
      });

      const result = await response.json();

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ 
          type: "success", 
          text: `Emails envoyés avec succès à ${result.sentCount} membre(s) du comité !` 
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de l'envoi des emails" });
    } finally {
      setIsSending(false);
    }
  }

  function handleEmailChange(memberId: string, email: string) {
    setEmailOverrides(prev => ({
      ...prev,
      [memberId]: email
    }));
  }

  return (
    <div className="card-luxury p-6">
      <div className="mb-6">
        <h2 className="text-display text-xl font-bold text-secondary-900 mb-2">
          📧 Envoyer les identifiants aux membres du comité
        </h2>
        <p className="text-body text-sm text-secondary-600">
          Utilisez cette interface pour envoyer les identifiants de connexion à tous les membres du comité scientifique.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-heading text-lg font-semibold text-secondary-800 mb-4">
          Liste des membres du comité
        </h3>
        
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Options d'envoi :</strong> 
            📧 = Envoyer uniquement à ce membre | 
            📧 Envoyer tous les emails = Envoyer à tous les membres d'un coup
          </p>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {committeeMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-4 p-3 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200">
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900">{member.name}</p>
                <p className="text-xs text-secondary-600">
                  Identifiant: <span className="font-mono bg-accent-100 px-1 rounded">{member.username}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email du membre"
                  value={emailOverrides[member.id] || member.email || ""}
                  onChange={(e) => handleEmailChange(member.id, e.target.value)}
                  className="px-3 py-1 text-sm border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  style={{ width: '200px' }}
                />
                <button
                  onClick={() => handleSendIndividualEmail(member)}
                  disabled={isSending || (!emailOverrides[member.id] && !member.email)}
                  className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Envoyer uniquement à ce membre"
                >
                  {isSending ? "..." : "📧"}
                </button>
                {!emailOverrides[member.id] && !member.email && (
                  <span className="text-xs text-warning-600 bg-warning-50 px-2 py-1 rounded">
                    ⚠️ Email requis
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === "error" 
            ? "bg-red-50 text-red-700 border border-red-200" 
            : "bg-green-50 text-green-700 border border-green-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSendEmails}
          disabled={isSending || committeeMembers.some(m => !emailOverrides[m.id] && !m.email)}
          className="btn-primary bg-gradient-to-r from-accent-600 to-primary-600 hover:from-accent-700 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? "📧 Envoi en cours..." : "📧 Envoyer tous les emails"}
        </button>
        
        <button
          onClick={() => {
            const emptyOverrides: Record<string, string> = {};
            committeeMembers.forEach(member => {
              emptyOverrides[member.id] = `${member.username}@univ-bejaia.dz`;
            });
            setEmailOverrides(emptyOverrides);
          }}
          className="btn-secondary"
        >
          🔄 Générer emails universitaires
        </button>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-800">
          <strong>Note :</strong> Chaque membre recevra un email personnalisé avec ses identifiants de connexion. 
          Le template utilise le design professionnel du colloque avec toutes les informations nécessaires.
        </p>
      </div>
    </div>
  );
}
