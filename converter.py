# converter.py (Exemple d'API Flask)
import yt_dlp
import json
import os
from flask import Flask, request, jsonify

app = Flask(__name__)
# Chemin où les fichiers MP3 seront sauvegardés (doit être accessible)
DOWNLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mp3_downloads")
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

# Configuration FFmpeg est essentielle pour yt-dlp
# Assurez-vous que FFmpeg est installé sur le serveur d'hébergement.

@app.route('/convert', methods=['POST'])
def convert_youtube_to_mp3():
    data = request.get_json()
    youtube_url = data.get('youtube_url')

    if not youtube_url:
        return jsonify({"error": "URL YouTube manquante"}), 400

    # Options de yt-dlp pour extraire l'audio et convertir en MP3
    ydl_opts = {
        # Télécharge la meilleure qualité audio possible
        'format': 'bestaudio/best', 
        # Configure le post-traitement pour extraire l'audio et l'encoder
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192', # Qualité MP3 (192kbps)
        }],
        # Chemin de sortie: le dossier, puis le titre de la vidéo comme nom
        'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'), 
        'noplaylist': True, # N'accepte pas les playlists
        # 'verbose': True, # Décommenter pour le débogage
    }

    try:
        # Exécute le processus de téléchargement et de conversion
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(youtube_url, download=True)
            # Récupère le chemin du fichier MP3 généré
            output_filepath = ydl.prepare_filename(info_dict).replace(info_dict['ext'], 'mp3')
        
        # --- IMPORTANT ---
        # Ici, vous devez retourner un lien accessible par le frontend.
        # Dans un environnement de production, vous pourriez uploader ce fichier
        # sur un service de stockage cloud (S3, Cloudflare R2) et retourner le lien public.
        
        # Pour cet exemple local, on simule le lien:
        simulated_download_link = f"https://votre-serveur.com/downloads/{os.path.basename(output_filepath)}"

        return jsonify({
            "message": "Conversion réussie",
            "mp3_url": simulated_download_link,
            "filename": os.path.basename(output_filepath)
        })

    except Exception as e:
        return jsonify({"error": f"Erreur de conversion: {str(e)}"}), 500

if __name__ == '__main__':
    # Lance le serveur Flask (pour le développement local)
    app.run(debug=True, port=5000)
