document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('videoFile');
    const convertButton = document.getElementById('convertButton');
    const statusMessage = document.getElementById('statusMessage');
    const downloadLink = document.getElementById('downloadLink');

    // Activer le bouton après la sélection d'un fichier
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            convertButton.disabled = false;
        } else {
            convertButton.disabled = true;
        }
        statusMessage.classList.add('hidden');
        downloadLink.classList.add('hidden');
    });

    // Gérer le clic sur le bouton
    convertButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) {
            alert("Veuillez sélectionner un fichier MP4.");
            return;
        }

        // --- Début de la simulation de l'appel backend ---
        statusMessage.textContent = `Conversion de "${file.name}" en cours...`;
        statusMessage.classList.remove('hidden');
        convertButton.disabled = true;
        downloadLink.classList.add('hidden');

        // En réalité, vous enverriez le fichier à votre API de conversion (backend)
        // en utilisant 'fetch' ou 'XMLHttpRequest'.
        // Exemple (schématique) :
        /*
        const formData = new FormData();
        formData.append('video', file);

        fetch('VOTRE_URL_DE_CONVERSION_API', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // data.mp3_url contiendrait le lien vers le fichier MP3
            statusMessage.textContent = "Conversion terminée avec succès !";
            downloadLink.href = data.mp3_url; // L'URL du MP3 généré
            downloadLink.download = file.name.replace('.mp4', '.mp3');
            downloadLink.classList.remove('hidden');
            convertButton.disabled = false;
        })
        .catch(error => {
            statusMessage.textContent = "Erreur lors de la conversion.";
            convertButton.disabled = false;
            console.error('Erreur:', error);
        });
        */

        // SIMULATION : Affichage du succès après un délai
        setTimeout(() => {
            statusMessage.textContent = "Conversion (simulée) terminée !";
            // L'URL ici devrait pointer vers le fichier généré par le serveur
            downloadLink.href = '#'; // Remplacer par l'URL du fichier MP3
            downloadLink.download = file.name.replace('.mp4', '.mp3');
            downloadLink.classList.remove('hidden');
            convertButton.disabled = false;
        }, 3000); // 3 secondes de simulation
    });
});
