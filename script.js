// script.js
document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('youtubeUrl');
    const convertButton = document.getElementById('convertButton');
    const statusMessage = document.getElementById('statusMessage');
    const downloadLink = document.getElementById('downloadLink');

    // Le bouton est toujours actif si l'input n'est pas vide
    urlInput.addEventListener('input', () => {
        convertButton.disabled = urlInput.value.trim() === '';
        statusMessage.classList.add('hidden');
        downloadLink.classList.add('hidden');
    });

    convertButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) {
            alert("Veuillez entrer une URL YouTube.");
            return;
        }

        // --- Début de l'appel backend RÉEL (ou simulation) ---
        statusMessage.textContent = `Envoi de l'URL pour conversion...`;
        statusMessage.classList.remove('hidden');
        convertButton.disabled = true;

        // **Étape 1: Appel à votre API de conversion (Backend Python)**
        fetch('VOTRE_URL_API_DE_CONVERSION', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // On envoie l'URL YouTube au serveur
            body: JSON.stringify({ youtube_url: url })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau ou du serveur.');
            }
            return response.json();
        })
        .then(data => {
            // Le serveur doit retourner l'URL où le MP3 est stocké
            if (data.mp3_url) {
                statusMessage.textContent = "✅ Conversion terminée !";
                downloadLink.href = data.mp3_url; 
                // Suggestion de nom de fichier (à récupérer du serveur pour être précis)
                downloadLink.download = 'youtube_audio.mp3'; 
                downloadLink.classList.remove('hidden');
            } else {
                statusMessage.textContent = "Erreur: Le serveur n'a pas retourné de lien de téléchargement.";
            }
        })
        .catch(error => {
            statusMessage.textContent = `❌ Erreur: ${error.message}. Vérifiez l'URL du serveur.`;
            console.error('Erreur:', error);
        })
        .finally(() => {
            convertButton.disabled = false;
        });
    });
});
