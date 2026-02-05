import Link from "next/link";
import { Header } from "@/components/Header";

export default function PresentationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-luxe-cream">
      <Header />
      <main className="flex-1">
        {/* Bloc institutionnel */}
        <section className="border-b border-stone-200/80 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              Ministère de l’enseignement supérieur et de la recherche scientifique
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-stone-800">
              Université Abderrahmane MIRA de Bejaïa
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Faculté des sciences humaines et sociales
            </p>
            <div className="mt-6 pt-6 border-t border-stone-200/80">
              <p className="text-sm text-stone-600">
                Laboratoire des études sociologiques : Travail, éducation, réseaux et espace (ESTERE)
              </p>
              <p className="mt-1 text-sm font-medium text-brand-800">
                Équipe de recherche PRFU : C0773600
              </p>
              <p className="mt-3 text-sm text-stone-600 italic">
                L’entrepreneuriat féminin dans le secteur de l’artisanat. Entre obstacles et le désir d’émancipation
              </p>
            </div>
          </div>
        </section>

        {/* Bandeau : Colloque national • Hybride • Date */}
        <section className="bg-brand-900 text-white py-3">
          <div className="mx-auto max-w-3xl px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-medium">
            <span>Colloque national</span>
            <span className="text-brand-200">•</span>
            <span>Mode hybride</span>
            <span className="text-brand-200">•</span>
            <span>Le 29 avril 2026</span>
          </div>
        </section>

        {/* Titre principal */}
        <section className="mx-auto max-w-3xl px-6 py-12 text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl leading-tight">
            « Entrepreneuriat féminin en Algérie, tendances, défis et opportunités »
          </h1>
          <p className="mt-4 text-sm text-stone-500">
            En collaboration avec la faculté des sciences humaines et sociales
          </p>
        </section>

        {/* Contenu */}
        <div className="mx-auto max-w-3xl px-6 pb-20 space-y-16">
          {/* Contexte */}
          <section>
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-6">
              Contexte
            </h2>
            <div className="prose prose-stone prose-sm max-w-none text-stone-700 leading-relaxed space-y-4">
              <p>
                L’entrepreneuriat joue aujourd’hui un rôle clé dans les dynamiques économiques et sociales partout dans le monde. On lui reconnaît non seulement sa capacité à générer de la croissance, mais aussi à créer des emplois, à favoriser l’innovation et à renforcer la résilience des économies en période de crise (Fayolle, 2004). Dans ce mouvement global, l’implication croissante des femmes dans la création d’entreprise attire de plus en plus l’attention, tant pour son potentiel économique que pour son impact sur l’égalité entre les sexes.
              </p>
              <p>
                Dans les pays en développement ou émergents, l’entrepreneuriat féminin est souvent perçu comme une réponse concrète à la précarité, au chômage ou encore à l’exclusion sociale. Le rapport du Global Entrepreneurship Monitor (GEM, 2021) souligne que même si les femmes représentent près de 40 % de la population active mondiale (Banque mondiale, 2022), elles font encore face à de nombreux freins : discriminations culturelles, accès restreint au financement, manque de reconnaissance, ou encore formation insuffisante.
              </p>
              <p>
                En Afrique du Nord, et particulièrement en Algérie, l’élan entrepreneurial s’est nettement renforcé depuis les années 2000. Cette évolution s’ancre dans les réformes économiques entamées à la fin des années 1980, période marquant le passage d’une économie administrée à un système de marché plus libéral (Madoui, 2012). Ces réformes ont été accompagnées d’un cadre juridique encourageant la création d’entreprise et l’initiative personnelle.
              </p>
              <p>
                L’État algérien a ainsi multiplié les dispositifs de soutien à l’entrepreneuriat, en particulier pour les jeunes et les femmes. À partir des années 2000, le nombre de PME a fortement augmenté, avec plus de 193 000 entreprises créées à la fin 2019, d’après la CASNOS (Ministère de l’Industrie et des Mines, 2020). Cette dynamique a contribué à élargir le tissu entrepreneurial, dans lequel les femmes prennent une place croissante, même si elles restent minoritaires.
              </p>
              <p>
                Aujourd’hui, l’entrepreneuriat féminin en Algérie s’impose comme un enjeu à la fois économique, social et culturel. En 2023, plus de 200 000 entreprises sont dirigées par des femmes, soit près de 14 % du total national (Ministère de l’Industrie et du Commerce, 2023). Ce taux, inférieur à la moyenne mondiale, met en lumière à la fois les progrès réalisés et les défis encore à relever, en particulier les écarts entre régions et secteurs.
              </p>
              <p>
                Plusieurs facteurs expliquent cette évolution. L’accès grandissant des femmes à l’enseignement supérieur, grâce à une politique éducative inclusive, a renforcé leurs compétences entrepreneuriales (Boufeldja, 2015). De plus, les formations proposées par les chambres de commerce, les facilités de financement, et le soutien d’organisations comme MEDA ou ONU Femmes ont permis à un plus grand nombre de femmes, notamment en milieu rural, de se lancer. Fin 2019, le Centre National du Registre du Commerce recensait environ 147 000 entreprises féminines (CNRC, 2019).
              </p>
              <p>
                L’Algérie a aussi mis en place des incitations fiscales à travers la loi de finances 2020, en soutien aux PME innovantes fondées par des femmes. Ces mesures visent à mieux intégrer les femmes dans l’économie nationale et à valoriser leur potentiel.
              </p>
              <p>
                Au-delà des chiffres, les parcours de ces entrepreneures algériennes reflètent une quête d’autonomie, de reconnaissance et une volonté de bousculer les rôles traditionnels. Leurs motivations ne se limitent pas à l’aspect financier : entreprendre, c’est aussi pour elles synonyme de liberté, d’épanouissement, de souplesse au travail et d’une meilleure qualité de vie (Slamani et al., 2017). Cela dit, beaucoup d’entreprises dirigées par des femmes restent de petite taille (TPE), souvent gérées de façon autonome, avec peu de financements extérieurs et des réseaux encore peu développés (Cornet & Constantinidis, 2004).
              </p>
              <p>
                Même si les sciences économiques et de gestion ont bien étudié le phénomène entrepreneurial, l’angle sociologique reste peu exploré lorsqu’il s’agit des femmes. Une lecture sociologique apporterait pourtant un éclairage précieux sur les mécanismes d’émancipation, les rapports de genre, les identités en construction, ou encore les stratégies adoptées face aux résistances culturelles ou institutionnelles.
              </p>
            </div>
          </section>

          {/* Pistes de réflexion */}
          <section>
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-6">
              Pistes de réflexion
            </h2>
            <p className="text-stone-600 text-sm mb-4">Dans cette optique, plusieurs pistes s’ouvrent :</p>
            <ul className="space-y-3 text-stone-700 text-sm leading-relaxed list-none pl-0">
              <li className="flex gap-3">
                <span className="text-luxe-gold shrink-0">—</span>
                Quels sont les facteurs qui favorisent ou freinent l’entrepreneuriat féminin en Algérie aujourd’hui ?
              </li>
              <li className="flex gap-3">
                <span className="text-luxe-gold shrink-0">—</span>
                Comment les politiques publiques algériennes influencent-elles la création d’entreprises par les femmes ?
              </li>
              <li className="flex gap-3">
                <span className="text-luxe-gold shrink-0">—</span>
                Et comment l’entrepreneuriat contribue-t-il à redéfinir la place des femmes dans la société algérienne actuelle ?
              </li>
            </ul>
            <p className="mt-4 text-stone-600 text-sm italic">
              Autant de questions qui méritent d’être analysées sous différents angles, croisant sociologie, économie, études de genre et politiques publiques.
            </p>
          </section>

          {/* Objectifs */}
          <section>
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-6">
              Objectifs du colloque
            </h2>
            <ol className="space-y-2 text-stone-700 text-sm leading-relaxed list-decimal list-inside">
              <li>Analyser l’impact de l’entrepreneuriat féminin sur l’économie algérienne.</li>
              <li>Identifier les principaux freins rencontrés par les femmes entrepreneures.</li>
              <li>Encourager la mise en place de politiques publiques en faveur de l’entrepreneuriat féminin.</li>
              <li>Mettre en avant des parcours inspirants de femmes entrepreneures algériennes.</li>
              <li>Mesurer l’impact de l’entrepreneuriat féminin sur le développement économique et social.</li>
            </ol>
          </section>

          {/* Axes */}
          <section>
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-6">
              Principaux axes du colloque
            </h2>
            <ul className="space-y-8">
              <li className="border-l-2 border-luxe-gold/40 pl-5">
                <h3 className="font-display font-semibold text-stone-800 mb-1">
                  1. Impact des trajectoires socioprofessionnelles sur l’entrepreneuriat féminin
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Il s’agit d’analyser comment les expériences personnelles et professionnelles vécues par les femmes influencent leur choix de se lancer dans l’entrepreneuriat, en identifiant ce qui déclenche cette décision et les motivations qui les animent en profondeur.
                </p>
              </li>
              <li className="border-l-2 border-luxe-gold/40 pl-5">
                <h3 className="font-display font-semibold text-stone-800 mb-1">
                  2. Obstacles et motivations liés à l’entrepreneuriat féminin
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Cette partie vise à comprendre les freins spécifiques rencontrés par les femmes entrepreneures, comme les normes culturelles, les difficultés d’accès au financement ou l’absence de réseaux, tout en mettant en valeur les éléments moteurs tels que le besoin d’autonomie ou l’envie d’innover.
                </p>
              </li>
              <li className="border-l-2 border-luxe-gold/40 pl-5">
                <h3 className="font-display font-semibold text-stone-800 mb-1">
                  3. Perception et utilisation des dispositifs de soutien à la création d’entreprise par les femmes
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  L’objectif ici est d’explorer pourquoi certaines femmes entrepreneures restent réticentes à solliciter les aides existantes ou les prêts bancaires, en mettant en évidence les barrières — réelles ou perçues — qui freinent le développement de leurs entreprises.
                </p>
              </li>
              <li className="border-l-2 border-luxe-gold/40 pl-5">
                <h3 className="font-display font-semibold text-stone-800 mb-1">
                  4. L’entrepreneuriat féminin à l’ère du numérique
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Ce volet cherche à montrer comment les technologies digitales peuvent représenter un levier de croissance pour les femmes entrepreneures, tout en abordant les défis liés à leur adoption, notamment dans le contexte algérien.
                </p>
              </li>
              <li className="border-l-2 border-luxe-gold/40 pl-5">
                <h3 className="font-display font-semibold text-stone-800 mb-1">
                  5. L’entrepreneuriat féminin dans différents secteurs d’activité, notamment l’artisanat
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Il s’agit d’analyser les réalités du terrain dans des domaines variés, avec une attention particulière portée à l’artisanat, afin de mieux comprendre les opportunités, les contraintes et les dynamiques propres à chaque secteur.
                </p>
              </li>
            </ul>
          </section>

          {/* Références */}
          <section>
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-6">
              Références bibliographiques
            </h2>
            <ul className="space-y-2 text-stone-600 text-xs leading-relaxed list-none pl-0 font-sans">
              <li>Banque mondiale. (2022). <em>Women, Business and the Law 2022.</em> Washington, DC: World Bank.</li>
              <li>Boufeldja, S. (2015). L’entrepreneuriat féminin et la formation universitaire en Algérie. <em>Revue Algérienne d’Économie et de Management</em>, 11(2), 55–70.</li>
              <li>CNRC (Centre National du Registre du Commerce). (2019). Statistiques officielles sur les entreprises dirigées par des femmes. Alger : CNRC.</li>
              <li>Cornet, A., & Constantinidis, C. (2004). Femmes et entrepreneuriat : une autre vision de la réussite. <em>Revue Internationale PME</em>, 17(2), 97–121.</li>
              <li>Fayolle, A. (2004). <em>Entrepreneuriat : apprendre à entreprendre.</em> Paris : Dunod.</li>
              <li>Global Entrepreneurship Monitor (GEM). (2021). <em>Global Entrepreneurship Monitor 2020/2021 Global Report.</em></li>
              <li>Madoui, M. (2012). Les réformes économiques et l’évolution du secteur privé en Algérie. <em>Revue des Sciences Commerciales</em>, 9(1), 14–29.</li>
              <li>Ministère de l’Industrie et des Mines. (2020). Rapport sur le développement des PME en Algérie. Alger : Direction générale de la PME.</li>
              <li>Ministère de l’Industrie et du Commerce. (2023). Statistiques des entreprises dirigées par des femmes en Algérie. Alger.</li>
              <li>Slamani, Y., Amrane, D., & Benmira, S. (2017). L’entrepreneuriat féminin en Algérie : motivations, contraintes et perspectives. <em>Revue des Sciences Humaines</em>, 28(2), 95–108.</li>
            </ul>
          </section>

          {/* Comité scientifique */}
          <section className="card p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-4">
              Comité scientifique
            </h2>
            <p className="text-stone-700 font-medium mb-6">
              Président du Comité scientifique PR : <strong>Hadrbache Bachir</strong>
            </p>
            <ul className="grid gap-1 text-stone-600 text-sm">
              {[
                "Pr. AHOUARI Zahir (Université de Bejaia)",
                "Pr. BESSAI Rachid (Université de Bejaia)",
                "Pr. DJADDA Mahmoud (Université de Bejaia)",
                "Pr. BENKKEROU Fiadh (Université de Bejaia)",
                "Dr. DJEFFAL Mokrane (Université de Bejaia)",
                "Pr. FARADJ MOHAMED AKLI (Université de Bejaia)",
                "Dr. DJOUAB Mustapha (Université de Bejaia)",
                "Dr. HIDER FOUZIA (Université de Bejaia)",
                "Dr. DJELOULI Nesrine (Université de Bejaia)",
                "Dr. HALIS Samir (Université de Bejaia)",
                "Dr. NOUI RABAH (Université de Bejaia)",
                "Dr. IDIR SMAIL (Université de Bejaia)",
                "Dr. HAMOUDI SOUHILA (Université de Bejaia)",
                "Dr. AISSATMOHAND TAHAR (Université de Bejaia)",
                "Dr. AIT HATRITE KAHINA (Université de Bejaia)",
                "Dr. OUSAIDENE Yassine (Université d'Alger 2)",
                "Pr. ABEDOU Abderrahmane, Directeur de recherche au CREAD/Alger",
                "Dr. MELLOUD Sidali (Ecole de management de Koléa)",
                "Pr. TOBAL Rachid (Université de Skikda)",
                "Pr. kafi Farida (université de Taref)",
                "Dr. Boudjerda yacine (université de jijel)",
              ].map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </section>

          {/* Comité d'organisation */}
          <section className="card p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-luxe-gold uppercase tracking-widest mb-4">
              Comité d’organisation
            </h2>
            <p className="text-stone-700 font-medium mb-6">
              Président du Comité d’organisation : <strong>Dr. DJOUAB Mustapha</strong>
            </p>
            <ul className="grid gap-1 text-stone-600 text-sm">
              {[
                "Pr. AHOUARI Zahir (Université de Bejaia)",
                "Pr. BESSAI Rachid (Université de Bejaia)",
                "PR. HADRBACH BACHIR (Université de Bejaia)",
                "Dr. HIDER FOUZIA (Université de Bejaia)",
                "Dr. DJELOULI Nesrine (Université de Bejaia)",
                "Dr. HALIS Samir (Université de Bejaia)",
                "Dr. BAHLOUL FAROUK (Université de Bejaia)",
                "Dr. NOUI RABAH (Université de Bejaia)",
                "Dr. IDIR SMAIL (Université de Bejaia)",
                "Dr. AIT HATRITE KAHINA (Université de Bejaia)",
                "Dr. HAMOUDI SOUHILA (Université de Bejaia)",
                "Dr. ARAIBIA MOHAMEDKARIM (Université de Bejaia)",
                "IDES Célina (doctorante) (Université de Bejaia)",
                "ABEDLOUAHAB Souad (doctorante) (Université de Bejaia)",
                "BENMAMMAR Kahina (doctorante) (Université de Bejaia)",
                "IDIRI Massinissa (doctorant) (Université de Bejaia)",
                "BOULILA Farid (doctorante) (Université de Bejaia)",
                "KARA Feriel (docteur) (Université de Bejaia)",
                "MANSER Nassa (doctorante) (Université de Bejaia)",
                "SAIDANI Sabrina (doctorante) (Université de Bejaia)",
              ].map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Retour */}
        <div className="border-t border-stone-200/80 bg-white py-8">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-brand-800 hover:text-brand-900 transition"
            >
              ← Retour à l’accueil
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200/80 bg-white py-6">
        <div className="mx-auto max-w-3xl px-6 text-center text-xs text-stone-500 space-y-1">
          <p>Ministère de l’enseignement supérieur et de la recherche scientifique</p>
          <p>Université Abderrahmane MIRA de Bejaïa — Faculté des sciences humaines et sociales</p>
          <p>Colloque national — Le 29 avril 2026 — Mode hybride</p>
        </div>
      </footer>
    </div>
  );
}
