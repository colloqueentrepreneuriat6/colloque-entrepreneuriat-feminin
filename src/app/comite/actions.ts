// @ts-nocheck

export async function submitEvaluation(formData: FormData) {
  try {
    const response = await fetch('/api/evaluations', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Erreur lors de la soumission." };
    }

    const result = await response.json();
    
    // Forcer le rechargement de la page pour voir les mises à jour
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
    
    return result;
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    return { error: "Erreur réseau" };
  }
}

export async function updateEvaluation(formData: FormData) {
  try {
    const response = await fetch('/api/evaluations', {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || "Erreur lors de la mise à jour." };
    }

    const result = await response.json();
    
    // Forcer le rechargement de la page pour voir les mises à jour
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
    
    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return { error: "Erreur réseau" };
  }
}
